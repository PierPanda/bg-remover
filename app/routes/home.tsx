import * as React from "react";
import { homeContent } from "~/constants";
import DragDropZone from "~/components/drag-drop-zone";
import LoadingSpinner from "~/components/loading-spinner";
import { removeBackground } from "~/services/api-client";
import { downloadImage } from "~/services/file-download";
import { useToast } from "~/hooks/use-toast";
import type { ProcessingState } from "~/types";

const ImagePreview = React.lazy(() => import("~/components/image-preview"));

export function meta() {
  return [
    { title: "BG Remover - Remove Image Backgrounds Instantly" },
    {
      name: "description",
      content:
        "Remove backgrounds from your images in seconds. Fast, easy, and free online background remover tool.",
    },
  ];
}

export default function Home() {
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);
  const [processedImage, setProcessedImage] = React.useState<string | null>(
    null
  );
  const [processingState, setProcessingState] =
    React.useState<ProcessingState>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const { addToast } = useToast();

  // Nettoyer les blob URLs quand le composant est démonté
  React.useEffect(() => {
    return () => {
      if (currentImage && currentImage.startsWith("blob:")) {
        window.URL.revokeObjectURL(currentImage);
      }
    };
  }, [currentImage]);

  const handleImageSelect = async (file: File) => {
    try {
      setError(null);
      setProcessingState("uploading");

      const objectUrl = window.URL.createObjectURL(file);
      setCurrentImage(objectUrl);

      setProcessingState("processing");

      const result = await removeBackground(file);
      setProcessedImage(result.imageUrl);
      setProcessingState("done");
      addToast("success", "Background removed successfully! 🎉");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to process image";
      setError(errorMessage);
      setProcessingState("error");
      addToast("error", errorMessage);
    }
  };

  const handleDownload = async (
    format: "png" | "jpg" | "webp" = "png",
    quality?: number
  ) => {
    if (processedImage) {
      try {
        await downloadImage(processedImage, format, quality ?? 90);
        addToast(
          "success",
          `Image downloaded as ${format.toUpperCase()} successfully!`
        );
      } catch {
        addToast("error", "Failed to download image. Please try again.");
      }
    }
  };

  const handleReset = () => {
    // Libérer la blob URL avant de réinitialiser
    if (currentImage && currentImage.startsWith("blob:")) {
      window.URL.revokeObjectURL(currentImage);
    }
    setCurrentImage(null);
    setProcessedImage(null);
    setProcessingState("idle");
    setError(null);
  };

  return (
    <div className="flex flex-col">
      <section className="min-h-screen overflow-hidden pt-32 pb-20">
        <div className="mx-auto px-4">
          <div className="mx-auto">
            <div className="text-center mb-12">
              <h1 className="mb-6 animate-fade-in-up bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl leading-tight">
                {homeContent.title}
              </h1>

              <p className="animate-fade-in-up text-lg text-gray-700/50 dark:text-gray-300 md:text-xl [animation-delay:100ms] max-w-3xl mx-auto">
                {homeContent.description}
              </p>
            </div>

            <div className="mx-auto mt-12 w-full max-w-4xl px-4">
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-950/20">
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    ⚠️ {error}
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-2 text-sm text-red-600 underline hover:text-red-700 dark:text-red-400"
                  >
                    Try again
                  </button>
                </div>
              )}

              {processingState === "idle" && (
                <div className="animate-fade-in-up [animation-delay:200ms]">
                  <DragDropZone onImageSelect={handleImageSelect} />
                </div>
              )}

              {processingState === "uploading" && (
                <LoadingSpinner message="Uploading your image..." />
              )}

              {processingState === "processing" && currentImage && (
                <div className="space-y-6">
                  <LoadingSpinner message="Processing your image..." />
                  <React.Suspense
                    fallback={<LoadingSpinner message="Loading preview..." />}
                  >
                    <ImagePreview
                      originalImage={currentImage}
                      processedImage={null}
                      onDownload={handleDownload}
                      onReset={handleReset}
                    />
                  </React.Suspense>
                </div>
              )}

              {processingState === "done" && currentImage && processedImage && (
                <React.Suspense
                  fallback={<LoadingSpinner message="Loading preview..." />}
                >
                  <ImagePreview
                    originalImage={currentImage}
                    processedImage={processedImage}
                    onDownload={handleDownload}
                    onReset={handleReset}
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
