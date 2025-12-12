import type { Route } from "./+types/remove-background";
import type { RemoveBackgroundResponse } from "~/types";
import {
  successResponse,
  handleApiError,
  logRequest,
  extractFileFromFormData,
  validateImageFile,
  fileToBase64,
  ApiErrorClass,
} from "../../services/utils";

export async function action({ request }: Route.ActionArgs) {
  const startTime = Date.now();

  try {
    // Only accept POST requests
    if (request.method !== "POST") {
      throw new ApiErrorClass(
        "METHOD_NOT_ALLOWED",
        "Only POST method is allowed",
        405
      );
    }

    logRequest(request, { action: "remove-background" });

    // Extract file from FormData
    const file = await extractFileFromFormData(request, "image");

    // Validate the image file
    const validation = validateImageFile(file);
    if (!validation.isValid && validation.error) {
      throw new ApiErrorClass(
        validation.error.code,
        validation.error.message,
        400
      );
    }

    // Log file info
    logRequest(request, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // ========================================
    // STUB: Mock background removal
    // ========================================
    // TODO: In Phase 5, replace this with actual background removal service
    // Option A: Integrate remove.bg API
    // Option B: Integrate local rembg (Python subprocess)

    // For now, we'll simulate processing by returning the original image
    // In production, this would be the processed image with background removed
    const imageBase64 = await fileToBase64(file);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const processingTime = Date.now() - startTime;

    const response: RemoveBackgroundResponse = {
      imageBase64,
      format: "png",
      size: file.size,
      processingTime,
    };

    logRequest(request, {
      success: true,
      processingTime: `${processingTime}ms`,
    });

    return successResponse(response);
  } catch (error) {
    logRequest(request, {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return handleApiError(error);
  }
}

// Prevent GET requests
export async function loader() {
  return new Response("Method not allowed. Use POST to upload an image.", {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
