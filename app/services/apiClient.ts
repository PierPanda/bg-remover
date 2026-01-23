import type { ApiResponse, RemoveBackgroundResponse } from "~/types";
import { errorMessages, type ErrorCode } from "~/constants";

/**
 * Traduit un message d'erreur de l'API en message utilisateur
 */
function translateErrorMessage(
  errorMessage: string,
  errorCode?: string
): string {
  // Essayer de mapper le code d'erreur aux messages traduits
  if (errorCode && errorCode in errorMessages) {
    return errorMessages[errorCode as ErrorCode];
  }

  // Sinon, retourner le message original ou un message générique
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

    const imageBlob = await response.blob();
    const processingTime = parseInt(
      response.headers.get("X-Processing-Time") || "0"
    );
    const formatHeader = response.headers.get("X-Image-Format") || "png";
    const format = (
      formatHeader === "jpg" || formatHeader === "webp" ? formatHeader : "png"
    ) as "png" | "jpg" | "webp";

    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const imageBase64 = `data:image/${format};base64,${base64}`;

    return {
      imageBase64,
      format,
      size: imageBlob.size,
      processingTime,
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
