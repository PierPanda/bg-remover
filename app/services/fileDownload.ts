type ExportFormat = "png" | "jpg" | "webp";

/**
 * Convert base64 image to different formats with quality control
 */
async function convertImageFormat(
  base64Data: string,
  format: ExportFormat,
  quality: number = 90
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // For JPG, fill with white background (no transparency support)
      if (format === "jpg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType =
        format === "png"
          ? "image/png"
          : format === "jpg"
            ? "image/jpeg"
            : "image/webp";

      const qualityValue = format === "png" ? 1 : quality / 100;

      try {
        const result = canvas.toDataURL(mimeType, qualityValue);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = base64Data;
  });
}

/**
 * Download image with format and quality options
 */
export async function downloadImage(
  base64Data: string,
  format: ExportFormat = "png",
  quality: number = 90
): Promise<void> {
  try {
    // Convert to desired format if not PNG or if quality is specified
    let finalBase64 = base64Data;
    if (format !== "png" || quality < 100) {
      finalBase64 = await convertImageFormat(base64Data, format, quality);
    }

    const timestamp = Date.now();
    const filename = `bg-removed-${timestamp}.${format}`;

    const link = document.createElement("a");
    link.href = finalBase64;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    throw new Error("Failed to download image");
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}
