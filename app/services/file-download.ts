import type { ExportFormatValue } from "~/constants";

type ExportFormat = ExportFormatValue;

async function convertImageFormat(
  imageUrl: string,
  format: ExportFormat,
  quality: number = 90
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

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

    img.src = imageUrl;
  });
}

export async function downloadImage(
  imageUrl: string,
  format: ExportFormat = "png",
  quality: number = 90
): Promise<void> {
  try {
    const timestamp = Date.now();
    const filename = `bg-removed-${timestamp}.${format}`;

    if (imageUrl.startsWith("https://") && format === "png") {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
      return;
    }

    if (imageUrl.startsWith("blob:") && format === "png") {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const convertedDataUrl = await convertImageFormat(
      imageUrl,
      format,
      quality
    );

    const link = document.createElement("a");
    link.href = convertedDataUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    throw new Error("Failed to download image");
  }
}
