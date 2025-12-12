import type {
  ApiResponse,
  ApiError,
  FileValidationConfig,
  ValidationResult,
  ErrorCode,
  ApiErrorObject,
} from "~/types";

export function successResponse<T>(data: T): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function errorResponse(
  code: ErrorCode | string,
  message: string,
  statusCode: number = 400,
  details?: unknown
): Response {
  const error: ApiError = {
    code,
    message,
    details,
  };

  const response: ApiResponse = {
    success: false,
    error,
  };

  return new Response(JSON.stringify(response), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createApiError(
  code: ErrorCode | string,
  message: string,
  statusCode: number = 500,
  details?: unknown
): ApiErrorObject {
  const error = new Error(message) as ApiErrorObject;
  error.name = "ApiError";
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  error.isApiError = true;
  return error;
}

export function isApiError(error: unknown): error is ApiErrorObject {
  return (
    typeof error === "object" &&
    error !== null &&
    "isApiError" in error &&
    error.isApiError === true
  );
}

export function handleApiError(error: unknown): Response {
  console.error("API Error:", error);

  if (isApiError(error)) {
    return errorResponse(
      error.code,
      error.message,
      error.statusCode,
      error.details
    );
  }

  if (error instanceof Error) {
    return errorResponse("INTERNAL_ERROR", error.message, 500);
  }

  return errorResponse("INTERNAL_ERROR", "An unknown error occurred", 500);
}

const DEFAULT_VALIDATION_CONFIG: FileValidationConfig = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  allowedExtensions: [".png", ".jpg", ".jpeg", ".webp"],
};

export function validateImageFile(
  file: File,
  config: Partial<FileValidationConfig> = {}
): ValidationResult {
  const validationConfig = { ...DEFAULT_VALIDATION_CONFIG, ...config };

  if (!file) {
    return {
      isValid: false,
      error: {
        code: "MISSING_FILE" as ErrorCode,
        message: "No file provided",
      },
    };
  }

  if (file.size > validationConfig.maxSizeBytes) {
    const maxSizeMB = (validationConfig.maxSizeBytes / (1024 * 1024)).toFixed(
      2
    );
    return {
      isValid: false,
      error: {
        code: "INVALID_FILE_SIZE" as ErrorCode,
        message: `File size exceeds maximum limit of ${maxSizeMB}MB`,
      },
    };
  }

  if (!validationConfig.allowedMimeTypes.includes(file.type)) {
    return {
      isValid: false,
      error: {
        code: "INVALID_FILE_TYPE" as ErrorCode,
        message: `Invalid file type. Allowed types: ${validationConfig.allowedMimeTypes.join(", ")}`,
      },
    };
  }

  const fileName = file.name.toLowerCase();
  const hasValidExtension = validationConfig.allowedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      isValid: false,
      error: {
        code: "INVALID_FILE_TYPE" as ErrorCode,
        message: `Invalid file extension. Allowed extensions: ${validationConfig.allowedExtensions.join(", ")}`,
      },
    };
  }

  return { isValid: true };
}

export async function extractFileFromFormData(
  request: Request,
  fieldName: string = "image"
): Promise<File> {
  const contentType = request.headers.get("content-type");

  if (!contentType?.includes("multipart/form-data")) {
    throw createApiError(
      "INVALID_REQUEST",
      "Request must be multipart/form-data",
      400
    );
  }

  const formData = await request.formData();
  const file = formData.get(fieldName);

  if (!file || !(file instanceof File)) {
    throw createApiError(
      "MISSING_FILE",
      `No file found in field '${fieldName}'`,
      400
    );
  }

  return file;
}

export async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:${file.type};base64,${base64}`;
}

export function base64ToBuffer(base64: string): Buffer {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, "base64");
}

export function logRequest(
  request: Request,
  additionalInfo?: Record<string, unknown>
) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${request.url}`,
      additionalInfo
    );
  }
}

export function addCorsHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  // Determine allowed origins from environment variable
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  let originToSet = "*";
  if (allowedOrigins) {
    // Support comma-separated list of origins
    originToSet = allowedOrigins;
  } else if (process.env.NODE_ENV === "production") {
    // In production, do not allow all origins by default
    originToSet = ""; // Or optionally, throw an error or log a warning
  }
  if (originToSet) {
    headers.set("Access-Control-Allow-Origin", originToSet);
  }
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
