import * as React from "react";
<<<<<<< HEAD
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { homeContent, landingContent } from "~/constants";
import DragDropZone from "~/components/drag-drop-zone";
import LoadingSpinner from "~/components/loading-spinner";
import { removeBackground } from "~/services/api-client";
import { downloadImage } from "~/services/file-download";
import { useToast } from "~/hooks/use-toast";
=======
import { homeContent } from "~/constants";
import DragDropZone from "~/components/DragDropZone";
import LoadingSpinner from "~/components/LoadingSpinner";
import { removeBackground } from "~/services/apiClient";
import { downloadImage } from "~/services/fileDownload";
import { useToast } from "~/hooks/useToast";
import { composeImageWithBackground } from "~/services/imageComposer";
>>>>>>> c7013c4 (feat: add ImageBackground superposition after removing it)
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
  const [customBackground, setCustomBackground] = React.useState<string | null>(
    null
  );
  const [composedImage, setComposedImage] = React.useState<string | null>(null);
  const [processingState, setProcessingState] =
    React.useState<ProcessingState>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const { addToast } = useToast();
  const toolSectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    return () => {
      if (currentImage && currentImage.startsWith("blob:")) {
        window.URL.revokeObjectURL(currentImage);
      }
      if (customBackground && customBackground.startsWith("blob:")) {
        window.URL.revokeObjectURL(customBackground);
      }
      if (composedImage && composedImage.startsWith("blob:")) {
        window.URL.revokeObjectURL(composedImage);
      }
    };
  }, [currentImage, customBackground, composedImage]);

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
        const imageToDownload = composedImage || processedImage;
        await downloadImage(imageToDownload, format, quality ?? 90);
        addToast(
          "success",
          `Image downloaded as ${format.toUpperCase()} successfully!`
        );
      } catch {
        addToast("error", "Failed to download image. Please try again.");
      }
    }
  };

  const handleBackgroundSelect = async (file: File) => {
    try {
      if (!processedImage) {
        addToast("error", "Please process an image first");
        return;
      }

      const backgroundUrl = window.URL.createObjectURL(file);
      setCustomBackground(backgroundUrl);

      const composed = await composeImageWithBackground(
        processedImage,
        backgroundUrl
      );

      if (composedImage && composedImage.startsWith("blob:")) {
        window.URL.revokeObjectURL(composedImage);
      }

      setComposedImage(composed);
      addToast("success", "Custom background added successfully! 🎨");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add background";
      addToast("error", errorMessage);
    }
  };

  const handleReset = () => {
<<<<<<< HEAD
=======
    // Libérer les blob URLs avant de réinitialiser
>>>>>>> c7013c4 (feat: add ImageBackground superposition after removing it)
    if (currentImage && currentImage.startsWith("blob:")) {
      window.URL.revokeObjectURL(currentImage);
    }
    if (customBackground && customBackground.startsWith("blob:")) {
      window.URL.revokeObjectURL(customBackground);
    }
    if (composedImage && composedImage.startsWith("blob:")) {
      window.URL.revokeObjectURL(composedImage);
    }
    setCurrentImage(null);
    setProcessedImage(null);
    setCustomBackground(null);
    setComposedImage(null);
    setProcessingState("idle");
    setError(null);
  };

  const scrollToTool = () => {
    toolSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="animate-fade-in-up mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl [animation-delay:100ms]">
            <span className="text-gray-900 dark:text-white">
              {landingContent.hero.title}
            </span>
            <br />
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {landingContent.hero.titleHighlight}
            </span>
          </h1>

          <p className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl [animation-delay:200ms]">
            {landingContent.hero.description}
          </p>

          <div className="animate-fade-in-up [animation-delay:300ms]">
            <Button
              size="lg"
              isIconOnly
              onPress={scrollToTool}
              className="bg-linear-to-r rounded-full from-blue-600 to-purple-600 text-white shadow-lg transition-transform hover:scale-105"
            >
              <Icon icon={landingContent.hero.ctaIcon} width={24} />
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={toolSectionRef}
        id="tool-section"
        className="min-h-screen overflow-hidden pt-20 pb-20"
      >
        <div className="mx-auto px-4">
          <div className="mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-6 animate-fade-in-up bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl leading-tight">
                {homeContent.title}
              </h2>

              <p className="animate-fade-in-up text-lg text-gray-600 dark:text-gray-400 md:text-xl [animation-delay:100ms] max-w-3xl mx-auto">
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
                      composedImage={null}
                      onDownload={handleDownload}
                      onReset={handleReset}
                      onBackgroundSelect={handleBackgroundSelect}
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
                    composedImage={composedImage}
                    onDownload={handleDownload}
                    onReset={handleReset}
                    onBackgroundSelect={handleBackgroundSelect}
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
