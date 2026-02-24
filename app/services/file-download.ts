import type { ExportFormatValue } from "~/constants";
import type { BackgroundOption } from "~/types";

type ExportFormat = ExportFormatValue;

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  background: BackgroundOption
): void {
  if (background.type === "transparent") {
    return;
  }

  if (background.type === "solid" && background.color) {
    ctx.fillStyle = background.color;
    ctx.fillRect(0, 0, width, height);
  }

  if (background.type === "gradient" && background.gradient) {
    const { type, colors, angle = 180 } = background.gradient;
    let gradient: CanvasGradient;

    if (type === "linear") {
      const angleRad = ((angle - 90) * Math.PI) / 180;
      const centerX = width / 2;
      const centerY = height / 2;
      const length = Math.sqrt(width * width + height * height) / 2;

      const x1 = centerX - Math.cos(angleRad) * length;
      const y1 = centerY - Math.sin(angleRad) * length;
      const x2 = centerX + Math.cos(angleRad) * length;
      const y2 = centerY + Math.sin(angleRad) * length;

      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) / 2;
      gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
    }

    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}

async function drawBackgroundImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  imageUrl: string
): Promise<void> {
  const bgImg = await loadImage(imageUrl);

  const scale = Math.max(width / bgImg.width, height / bgImg.height);
  const scaledWidth = bgImg.width * scale;
  const scaledHeight = bgImg.height * scale;
  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2;

  ctx.drawImage(bgImg, x, y, scaledWidth, scaledHeight);
}

async function convertImageFormat(
  imageUrl: string,
  format: ExportFormat,
  quality: number = 90,
  background?: BackgroundOption
): Promise<string> {
  const img = await loadImage(imageUrl);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const needsBackground =
    format === "jpg" ||
    (background && background.type !== "transparent");

  if (needsBackground) {
    const bgOption: BackgroundOption = background ?? {
      type: "solid",
      color: "#FFFFFF",
    };

    if (bgOption.type === "image" && bgOption.imageUrl) {
      await drawBackgroundImage(ctx, img.width, img.height, bgOption.imageUrl);
    } else if (bgOption.type !== "transparent") {
      drawBackground(ctx, img.width, img.height, bgOption);
    } else if (format === "jpg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  ctx.drawImage(img, 0, 0);

  const mimeType =
    format === "png"
      ? "image/png"
      : format === "jpg"
        ? "image/jpeg"
        : "image/webp";

  const qualityValue = format === "png" ? 1 : quality / 100;

  return canvas.toDataURL(mimeType, qualityValue);
}

export async function downloadImage(
  imageUrl: string,
  format: ExportFormat = "png",
  quality: number = 90,
  background?: BackgroundOption
): Promise<void> {
  try {
    const timestamp = Date.now();
    const filename = `bg-removed-${timestamp}.${format}`;

    const needsConversion =
      format !== "png" ||
      (background && background.type !== "transparent");

    if (!needsConversion && imageUrl.startsWith("https://")) {
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

    if (!needsConversion && imageUrl.startsWith("blob:")) {
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
      quality,
      background
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
