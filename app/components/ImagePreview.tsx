import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  previewBtnText,
  imagePreviewContent,
  type ExportFormatValue,
} from "~/constants";
import ExportOptions from "./ExportOptions";
import * as React from "react";

type ExportFormat = ExportFormatValue;

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
  // eslint-disable-next-line no-undef
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleQuickDownload = () => {
    onDownload("png");
  };

  const handleExportDownload = (format: ExportFormat, quality?: number) => {
    onDownload(format, quality);
  };

  const handleAddBackgroundClick = () => {
    fileInputRef.current?.click();
  };

  // eslint-disable-next-line no-undef
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        // eslint-disable-next-line no-undef
        alert("Please select a valid image file");
        return;
      }
      onBackgroundSelect(file);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <div
        className="flex flex-wrap gap-6 *:flex-1"
      >
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

        {composedImage && (
          <Card>
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
      </div>

      {/* Input file caché pour le background */}
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
