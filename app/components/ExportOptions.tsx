import { Button, Slider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  exportFormats,
  exportOptionsContent,
  exportQualityConfig,
  type ExportFormatValue,
} from "~/constants";

type ExportFormat = ExportFormatValue;

interface ExportOptionsProps {
  imageBase64: string;
  onDownload: (format: ExportFormat, quality?: number) => void;
}

export default function ExportOptions({
  imageBase64,
  onDownload,
}: ExportOptionsProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState<number>(
    exportQualityConfig.defaultQuality
  );

  const handleDownload = () => {
    onDownload(selectedFormat, selectedFormat === "png" ? undefined : quality);
  };

  const getFileSize = () => {
    // Estimation approximative de la taille du fichier
    const base64Length = imageBase64.split(",")[1]?.length || 0;
    const sizeInBytes = (base64Length * 3) / 4;

    let estimatedSize = sizeInBytes;
    if (selectedFormat === "jpg" || selectedFormat === "webp") {
      estimatedSize = sizeInBytes * (quality / 100) * 0.7;
    }

    return (estimatedSize / 1024).toFixed(0);
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {exportOptionsContent.title}
      </h3>

      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {exportOptionsContent.formatLabel}
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {exportFormats.map((format) => (
            <button
              key={format.value}
              onClick={() => setSelectedFormat(format.value)}
              className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                selectedFormat === format.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
            >
              <Icon
                icon={format.icon}
                className={`h-5 w-5 ${
                  selectedFormat === format.value
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <div className="text-left">
                <div
                  className={`text-sm font-medium ${
                    selectedFormat === format.value
                      ? "text-blue-900 dark:text-blue-200"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {format.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {(selectedFormat === "jpg" || selectedFormat === "webp") && (
        <div className="mb-6">
          <label className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>{exportOptionsContent.qualityLabel}</span>
            <span className="text-blue-600 dark:text-blue-400">{quality}%</span>
          </label>
          <Slider
            size="sm"
            step={exportQualityConfig.step}
            minValue={exportQualityConfig.minQuality}
            maxValue={exportQualityConfig.maxQuality}
            value={quality}
            onChange={(value) => setQuality(value as number)}
            className="max-w-full"
            color="primary"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{exportOptionsContent.qualityRange.min}</span>
            <span>{exportOptionsContent.qualityRange.max}</span>
          </div>
        </div>
      )}

      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon={exportOptionsContent.infoIcon}
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {exportOptionsContent.estimatedSizeLabel}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            ~{getFileSize()} KB
          </span>
        </div>

        {selectedFormat === "png" && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {exportOptionsContent.formatDescriptions.png}
          </p>
        )}
        {selectedFormat === "jpg" && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {exportOptionsContent.formatDescriptions.jpg}
          </p>
        )}
        {selectedFormat === "webp" && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {exportOptionsContent.formatDescriptions.webp}
          </p>
        )}
      </div>

      <Button
        color="primary"
        className="w-full"
        size="lg"
        onPress={handleDownload}
        startContent={
          <Icon icon={exportOptionsContent.downloadIcon} className="h-5 w-5" />
        }
      >
        {exportOptionsContent.downloadButton} {selectedFormat.toUpperCase()}
      </Button>
    </div>
  );
}
