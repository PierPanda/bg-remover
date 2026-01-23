import type { Route } from "./+types/remove-background";
import type { RemoveBackgroundApiResponse } from "~/types";
import { BgRemoverAPIKey, BlobReadWriteToken } from "~/server/utils/env";
import * as RemoveBg from "~/server/utils/utils";
import { put } from "@vercel/blob";

// Vercel function configuration
export const config = {
  maxDuration: 30,
};

export async function action({ request }: Route.ActionArgs) {
  const apiUrl = "https://api.remove.bg/v1.0/removebg";

  const startTime = Date.now();

  console.log(BlobReadWriteToken);

  try {
    if (request.method !== "POST") {
      throw RemoveBg.createApiError(
        "METHOD_NOT_ALLOWED",
        "Only POST method is allowed",
        405
      );
    }

    RemoveBg.logRequest(request, { action: "remove-background" });

    console.log("[Upload] Starting image extraction from form data");
    const file = await RemoveBg.extractFileFromFormData(request, "image");
    console.log("[Upload] Image extracted successfully:", {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type,
    });

    console.log("[Upload] Validating image file");
    const validation = RemoveBg.validateImageFile(file);
    if (!validation.isValid && validation.error) {
      console.error("[Upload] Validation failed:", validation.error);
      throw RemoveBg.createApiError(
        validation.error.code,
        validation.error.message,
        400
      );
    }
    console.log("[Upload] Image validation passed");

    RemoveBg.logRequest(request, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    if (!BgRemoverAPIKey) {
      throw RemoveBg.createApiError(
        "CONFIGURATION_ERROR",
        "Remove.bg API key not configured",
        500
      );
    }

    console.log("[Upload] Preparing image for API submission");
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    console.log("[Upload] Payload prepared for API:", {
      endpoint: apiUrl,
      method: "POST",
      imageFile: {
        name: file.name,
        size: file.size,
        type: file.type,
      },
      parameters: {
        size: "auto",
      },
      hasApiKey: !!BgRemoverAPIKey,
    });
    console.log("[Upload] Sending request to Remove.bg API...");

    const removeBgResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "X-Api-Key": BgRemoverAPIKey,
      },
      body: formData,
    });
    console.log(
      "[Upload] API response received with status:",
      removeBgResponse.status
    );

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error("Remove.bg API error:", errorText);

      let errorMessage = "Failed to remove background from image";
      let errorCode = "PROCESSING_FAILED";

      try {
        const errorData = JSON.parse(errorText);
        if (errorData.errors && errorData.errors.length > 0) {
          const firstError = errorData.errors[0];
          errorMessage = firstError.title || errorMessage;
          errorCode = firstError.code?.toUpperCase() || errorCode;

          console.error(
            "[API Error] Code:",
            errorCode,
            "Message:",
            errorMessage
          );
        }
      } catch (parseError) {
        console.error(
          "[API Error] Could not parse error response:",
          parseError
        );
      }

      if (removeBgResponse.status === 402) {
        throw RemoveBg.createApiError(
          "QUOTA_EXCEEDED",
          "API quota exceeded. Please try again later.",
          429
        );
      }

      if (removeBgResponse.status === 403) {
        throw RemoveBg.createApiError(
          "INVALID_API_KEY",
          "Invalid API key configuration",
          500
        );
      }

      const statusCode = errorCode === "UNKNOWN_FOREGROUND" ? 422 : 500;

      throw RemoveBg.createApiError(errorCode, errorMessage, statusCode);
    }

    const imageBuffer = await removeBgResponse.arrayBuffer();

    console.log("[Upload] Uploading processed image to Vercel Blob...");

    if (!BlobReadWriteToken) {
      console.error("[Upload] BLOB_READ_WRITE_TOKEN not configured");
      throw RemoveBg.createApiError(
        "CONFIGURATION_ERROR",
        "Vercel Blob token not configured",
        500
      );
    }

    const filename = `processed-${Date.now()}.png`;
    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/png",
      token: BlobReadWriteToken,
    });

    console.log("[Upload] Image uploaded to Vercel Blob:", blob.url);

    const processingTime = Date.now() - startTime;

    const response: RemoveBackgroundApiResponse = {
      imageUrl: blob.url,
      format: "png",
      size: imageBuffer.byteLength,
      processingTime,
    };

    RemoveBg.logRequest(request, {
      success: true,
      processingTime: `${processingTime}ms`,
      blobUrl: blob.url,
    });

    return RemoveBg.successResponse(response);
  } catch (error) {
    RemoveBg.logRequest(request, {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return RemoveBg.handleApiError(error);
  }
}

export async function loader() {
  return new Response("Method not allowed. Use POST to upload an image.", {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
