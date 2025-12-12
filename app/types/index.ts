export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
}

export interface StatusResponse {
  version: string;
  environment: string;
  serverTime: string;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

export interface RemoveBackgroundRequest {
  image: File;
}

export interface RemoveBackgroundResponse {
  imageBase64: string;
  format: "png" | "jpg" | "webp";
  size: number;
  processingTime: number;
}

export interface ImageData {
  id: string;
  originalImage: string; // base64
  processedImage: string; // base64
  timestamp: number;
  format: string;
}

export type ProcessingState =
  | "idle"
  | "uploading"
  | "processing"
  | "done"
  | "error";

export interface EditorState {
  currentImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
  processingState: ProcessingState;
}

export enum ErrorCode {
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  INVALID_FILE_SIZE = "INVALID_FILE_SIZE",
  MISSING_FILE = "MISSING_FILE",
  INVALID_IMAGE = "INVALID_IMAGE",

  PROCESSING_FAILED = "PROCESSING_FAILED",
  INTERNAL_ERROR = "INTERNAL_ERROR",

  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR",
}

export interface FileValidationConfig {
  maxSizeBytes: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: {
    code: ErrorCode;
    message: string;
  };
}
