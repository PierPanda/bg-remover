import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  previewBtnText,
  imagePreviewContent,
  type ExportFormatValue,
} from "~/constants";
import ExportOptions from "./export-options";
import * as React from "react";

type ExportFormat = ExportFormatValue;
type ViewMode = "side-by-side" | "compare";

interface ImagePreviewProps {
  originalImage: string;
  processedImage: string | null;
  composedImage: string | null;
  onDownload: (format: ExportFormat, quality?: number) => void;
  onReset: () => void;
  onBackgroundSelect: (file: File) => void;
}

export default function ImagePreview({
  originalImage,
  processedImage,
  composedImage,
  onDownload,
  onReset,
  onBackgroundSelect,
}: ImagePreviewProps) {
  const [showExportOptions, setShowExportOptions] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("side-by-side");
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddBackgroundClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      onBackgroundSelect(file);
    }
  };

  const handleQuickDownload = () => {
    onDownload("png");
  };

  const handleExportDownload = (format: ExportFormat, quality?: number) => {
    onDownload(format, quality);
  };

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    }
    if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const renderCompareView = () => {
    if (!processedImage) return null;

    return (
      <div className="flex justify-center">
        <div
          ref={containerRef}
          className="relative max-w-2xl cursor-ew-resize select-none overflow-hidden rounded-xl shadow-md touch-none"
          role="slider"
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <img
            src={processedImage}
            alt={imagePreviewContent.labels.after}
            className="h-auto w-full object-contain bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)_50%/20px_20px]"
            style={{ maxHeight: "500px" }}
            draggable={false}
          />

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={originalImage}
              alt={imagePreviewContent.labels.before}
              className="h-auto w-full object-contain bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)_50%/20px_20px]"
              style={{ maxHeight: "500px" }}
              draggable={false}
            />
          </div>

          <div
            className="pointer-events-none absolute bottom-0 top-0 w-1 -translate-x-1/2"
            style={{ left: `${sliderPosition}%` }}
            role="presentation"
          >
            <div
              className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-white"
              style={{ boxShadow: "0 0 4px rgba(0,0,0,0.3)" }}
            />

            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
              <svg
                className="h-3.5 w-3.5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg
                className="h-3.5 w-3.5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSideBySideView = () => (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardBody className="p-0">
          <div className="relative">
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-black/60 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
              {imagePreviewContent.labels.original}
            </div>
            <img
              src={originalImage}
              alt={imagePreviewContent.labels.original}
              className="h-auto w-full rounded-lg object-contain"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          <div className="relative">
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
              {processedImage
                ? imagePreviewContent.labels.processed
                : imagePreviewContent.labels.processing}
            </div>
            {processedImage ? (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #ccc 25%, transparent 25%),
                      linear-gradient(-45deg, #ccc 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #ccc 75%),
                      linear-gradient(-45deg, transparent 75%, #ccc 75%)
                    `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                />
                <img
                  src={processedImage}
                  alt={imagePreviewContent.labels.processed}
                  className="relative h-auto w-full rounded-lg object-contain"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            ) : (
              <div className="flex h-full min-h-100 items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center text-gray-400">
                  <svg
                    className="mx-auto h-16 w-16 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="mt-8 space-y-8">
      {processedImage && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-default-100 p-1">
            <Button
              size="sm"
              variant={viewMode === "side-by-side" ? "solid" : "light"}
              onPress={() => setViewMode("side-by-side")}
              startContent={<Icon icon="lucide:layout-grid" width={16} />}
            >
              {imagePreviewContent.viewModes.sideBySide}
            </Button>
            <Button
              size="sm"
              variant={viewMode === "compare" ? "solid" : "light"}
              onPress={() => setViewMode("compare")}
              startContent={
                <Icon icon={imagePreviewContent.icons.compare} width={16} />
              }
            >
              {imagePreviewContent.viewModes.compare}
            </Button>
          </div>
        </div>
      )}

      {viewMode === "compare" && processedImage
        ? renderCompareView()
        : renderSideBySideView()}

      {composedImage && (
        <Card className="mx-auto max-w-2xl">
          <CardBody className="p-0">
            <div className="relative">
              <div className="absolute left-4 top-4 z-10 rounded-lg bg-linear-to-r from-green-600 to-teal-600 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                {imagePreviewContent.labels.withBackground}
              </div>
              <img
                src={composedImage}
                alt={imagePreviewContent.labels.withBackground}
                className="h-auto w-full rounded-lg object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </CardBody>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          color="primary"
          size="lg"
          onPress={handleQuickDownload}
          isDisabled={!processedImage}
          startContent={<Icon icon={previewBtnText.download.icon} />}
          className="bg-linear-to-r from-blue-600 to-purple-600 font-semibold"
        >
          {previewBtnText.download.text}
        </Button>

        {processedImage && (
          <Button
            color="success"
            variant="bordered"
            size="lg"
            onPress={handleAddBackgroundClick}
            startContent={<Icon icon={previewBtnText.addBackground.icon} />}
            className="font-semibold"
          >
            {previewBtnText.addBackground.text}
          </Button>
        )}

        <Button
          color="secondary"
          variant="bordered"
          size="lg"
          onPress={() => setShowExportOptions(!showExportOptions)}
          isDisabled={!processedImage}
          startContent={<Icon icon={imagePreviewContent.icons.settings} />}
        >
          {showExportOptions
            ? imagePreviewContent.buttons.hideExportOptions
            : imagePreviewContent.buttons.showExportOptions}
        </Button>

        <Button
          color="default"
          variant="bordered"
          size="lg"
          onPress={onReset}
          startContent={<Icon icon={previewBtnText.removeAnother.icon} />}
        >
          {previewBtnText.removeAnother.text}
        </Button>
      </div>

      {showExportOptions && processedImage && (
        <ExportOptions
          imageUrl={composedImage || processedImage}
          onDownload={handleExportDownload}
        />
      )}
    </div>
  );
}
