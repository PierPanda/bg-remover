import { Spinner } from "@heroui/react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Processing your image...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <Spinner
        size="lg"
        color="primary"
        classNames={{
          circle1: "border-b-blue-600",
          circle2: "border-b-purple-600",
        }}
      />
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {message}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This may take a few seconds...
        </p>
      </div>
    </div>
  );
}
