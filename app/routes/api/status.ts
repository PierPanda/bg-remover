import type { Route } from "./+types/status";
import type { StatusResponse } from "~/types";
import { successResponse, handleApiError, logRequest } from "~/services/utils";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    logRequest(request);

    const memoryUsage = process.memoryUsage();
    const totalMemory = memoryUsage.heapTotal;
    const usedMemory = memoryUsage.heapUsed;

    const statusData: StatusResponse = {
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      serverTime: new Date().toISOString(),
      memory: {
        used: Math.round(usedMemory / 1024 / 1024), // MB
        total: Math.round(totalMemory / 1024 / 1024), // MB
        percentage: Math.round((usedMemory / totalMemory) * 100),
      },
    };

    return successResponse(statusData);
  } catch (error) {
    return handleApiError(error);
  }
}
