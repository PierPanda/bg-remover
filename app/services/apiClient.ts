import type {
  ApiResponse,
  RemoveBackgroundResponse,
  RemoveBackgroundApiResponse,
} from "~/types";
import { errorMessages, type ErrorCode } from "~/constants";

function translateErrorMessage(
  errorMessage: string,
  errorCode?: string
): string {
  if (errorCode && errorCode in errorMessages) {
    return errorMessages[errorCode as ErrorCode];
  }

  return errorMessage || errorMessages.GENERIC;
}

export async function removeBackground(
  imageFile: File
): Promise<RemoveBackgroundResponse> {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/remove-background", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      try {
        const errorData: ApiResponse = await response.json();
        const translatedMessage = translateErrorMessage(
          errorData.error?.message || "",
          errorData.error?.code
        );
        throw new Error(translatedMessage);
      } catch {
        throw new Error(errorMessages.GENERIC);
      }
    }

    const data: ApiResponse<RemoveBackgroundApiResponse> =
      await response.json();

    if (!data.success || !data.data) {
      const translatedMessage = translateErrorMessage(
        data.error?.message || "Failed to process image",
        data.error?.code
      );
      throw new Error(translatedMessage);
    }

    return {
      imageUrl: data.data.imageUrl,
      format: data.data.format,
      size: data.data.size,
      processingTime: data.data.processingTime,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(errorMessages.GENERIC);
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/health");
    const data: ApiResponse = await response.json();
    return data.success;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

export async function getStatus() {
  try {
    const response = await fetch("/api/status");
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Status check failed:", error);
    return null;
  }
}
