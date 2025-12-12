export const nav = {
  brandName: "BG Remover",
};

export const homeContent = {
  title: "Remove Backgrounds Instantly",
  description:
    "Transform your images in seconds with our powerful AI-powered background remover. No signup required, completely free to use.",
};

export const footerContent = {
  githubUrl: "https://github.com/PierPanda",
  linkedinUrl: "https://www.linkedin.com/in/pierre-bermudez-b6247891/",
  copyright: "BG Remover. All rights reserved.",
};

export const dropzoneContent = {
  prompt: "Drag & drop an image here, or click to select a file",
  dropMessage: "Drop your image here...",
  howTo: ["Drag & drop your image here", "or click to browse"],
  invalidFileTypeError:
    "Invalid file type. Please upload a JPG, PNG, or WEBP image.",
  supportedFormats: "Supported formats: PNG, JPG, JPEG, WebP",
  maxFileSize: "Maximum file size is 10MB.",
};

export const previewBtnText = {
  download: {
    text: "Download Image",
    icon: "lucide:download",
  },
  removeAnother: {
    text: "Process Another Image",
    icon: "lucide:refresh-cw",
  },
};

export const toastConfig = {
  maxToasts: 3,
  defaultDuration: 5000,
};

export const toastIcons = {
  success: "lucide:check-circle",
  error: "lucide:x-circle",
  warning: "lucide:alert-triangle",
  info: "lucide:info",
} as const;

export const toastColors = {
  success: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-500",
    text: "text-green-800 dark:text-green-200",
    icon: "text-green-600 dark:text-green-400",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-500",
    text: "text-red-800 dark:text-red-200",
    icon: "text-red-600 dark:text-red-400",
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-500",
    text: "text-yellow-800 dark:text-yellow-200",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-500",
    text: "text-blue-800 dark:text-blue-200",
    icon: "text-blue-600 dark:text-blue-400",
  },
} as const;

export const toastContent = {
  closeLabel: "Close toast",
  closeIcon: "lucide:x",
};

export const exportFormats = [
  { value: "png" as const, label: "PNG (Transparent)", icon: "lucide:image" },
  { value: "jpg" as const, label: "JPG (Compressed)", icon: "lucide:image" },
  { value: "webp" as const, label: "WebP (Modern)", icon: "lucide:image" },
] as const;

export type ExportFormatValue = (typeof exportFormats)[number]["value"];

export const exportOptionsContent = {
  title: "Options d'export",
  formatLabel: "Format de fichier",
  qualityLabel: "Qualité",
  estimatedSizeLabel: "Taille estimée:",
  downloadButton: "Télécharger",
  qualityRange: {
    min: "Petite taille",
    max: "Meilleure qualité",
  },
  formatDescriptions: {
    png: "Format sans perte avec transparence",
    jpg: "Format compressé sans transparence (fond blanc)",
    webp: "Format moderne avec compression optimale",
  },
  infoIcon: "lucide:info",
  downloadIcon: "lucide:download",
};

export const exportQualityConfig = {
  defaultQuality: 90,
  minQuality: 50,
  maxQuality: 100,
  step: 5,
};

export const loadingSpinnerContent = {
  defaultMessage: "Processing your image...",
  subMessage: "This may take a few seconds...",
};

export const imagePreviewContent = {
  labels: {
    original: "Original",
    processed: "Processed",
    processing: "Processing...",
  },
  buttons: {
    showExportOptions: "Options d'export",
    hideExportOptions: "Masquer options",
  },
  icons: {
    settings: "lucide:settings",
  },
};
