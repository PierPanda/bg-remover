import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropZoneProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export default function DragDropZone({
  onImageSelect,
  disabled = false,
}: DragDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxSize: 15 * 1024 * 1024, // 15MB
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed bg-white p-12 text-center shadow-lg transition-all dark:bg-gray-950 ${
        isDragActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : isDragReject
            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
            : "border-gray-300 hover:border-blue-400 dark:border-gray-700"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input {...getInputProps()} />

      <div className="pointer-events-none space-y-4">
        {/* Upload Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
          <svg
            className="h-12 w-12 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div>
          {isDragActive ? (
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              Drop your image here...
            </p>
          ) : isDragReject ? (
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
              Invalid file type or size
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Drag & drop your image here
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                or click to browse
              </p>
            </>
          )}
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500">
          <p>Supported formats: PNG, JPG, JPEG, WebP</p>
          <p>Maximum size: 10MB</p>
        </div>

        {fileRejections.length > 0 && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/20 dark:text-red-400">
            {fileRejections[0].errors.map((error) => (
              <p key={error.code}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
