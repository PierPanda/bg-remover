import type { ApiResponse, RemoveBackgroundResponse } from "~/types";

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
      const errorData: ApiResponse = await response.json();
      throw new Error(
        errorData.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse<RemoveBackgroundResponse> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || "Failed to process image");
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while processing the image");
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
