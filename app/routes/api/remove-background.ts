import type { Route } from "./+types/remove-background";
import type { RemoveBackgroundResponse } from "~/types";
import { BgRemoverAPIKey } from "~/server/utils/env";
import * as RemoveBg from "~/server/utils/utils";

export async function action({ request }: Route.ActionArgs) {
  const apiUrl = "https://api.remove.bg/v1.0/removebg";

  const startTime = Date.now();

  try {
    if (request.method !== "POST") {
      throw RemoveBg.createApiError(
        "METHOD_NOT_ALLOWED",
        "Only POST method is allowed",
        405
      );
    }

    RemoveBg.logRequest(request, { action: "remove-background" });

    const file = await RemoveBg.extractFileFromFormData(request, "image");

    const validation = RemoveBg.validateImageFile(file);
    if (!validation.isValid && validation.error) {
      throw RemoveBg.createApiError(
        validation.error.code,
        validation.error.message,
        400
      );
    }

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

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    const removeBgResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "X-Api-Key": BgRemoverAPIKey,
      },
      body: formData,
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error("Remove.bg API error:", errorText);

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

      throw RemoveBg.createApiError(
        "PROCESSING_FAILED",
        "Failed to remove background from image",
        500
      );
    }

    // Convert response to base64
    const imageBuffer = await removeBgResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const imageBase64 = `data:image/png;base64,${base64}`;

    const processingTime = Date.now() - startTime;

    const response: RemoveBackgroundResponse = {
      imageBase64,
      format: "png",
      size: imageBuffer.byteLength,
      processingTime,
    };

    RemoveBg.logRequest(request, {
      success: true,
      processingTime: `${processingTime}ms`,
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
