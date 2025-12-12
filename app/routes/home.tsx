import { useState } from "react";
import type { Route } from "./+types/home";
import DragDropZone from "~/components/DragDropZone";
import ImagePreview from "~/components/ImagePreview";
import LoadingSpinner from "~/components/LoadingSpinner";
import { removeBackground } from "~/services/apiClient";
import { fileToBase64, downloadImage } from "~/services/fileDownload";
import type { ProcessingState } from "~/types";

export function meta({}: Route.MetaArgs) {
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
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    try {
      setError(null);
      setProcessingState("uploading");

      const base64 = await fileToBase64(file);
      setCurrentImage(base64);

      setProcessingState("processing");

      const result = await removeBackground(file);
      setProcessedImage(result.imageBase64);
      setProcessingState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image");
      setProcessingState("error");
      console.error("Error processing image:", err);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage);
    }
  };

  const handleReset = () => {
    setCurrentImage(null);
    setProcessedImage(null);
    setProcessingState("idle");
    setError(null);
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="mb-6 animate-fade-in-up bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
                Remove Backgrounds Instantly
              </h1>

              <p className="animate-fade-in-up text-lg text-gray-700 dark:text-gray-300 md:text-xl [animation-delay:100ms]">
                Transform your images in seconds with our powerful AI-powered
                background remover. No signup required, completely free to use.
              </p>
            </div>

            <div className="space-y-8">
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
                  <ImagePreview
                    originalImage={currentImage}
                    processedImage={null}
                    onDownload={handleDownload}
                    onReset={handleReset}
                  />
                </div>
              )}

              {processingState === "done" && currentImage && processedImage && (
                <ImagePreview
                  originalImage={currentImage}
                  processedImage={processedImage}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute -left-4 top-1/4 h-72 w-72 animate-blob rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-purple-600"></div>
          <div className="animation-delay-2000 absolute -right-4 top-1/3 h-72 w-72 animate-blob rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-blue-600"></div>
          <div className="animation-delay-4000 absolute left-1/3 top-1/2 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-pink-600"></div>
        </div>
      </section>
    </div>
  );
}
