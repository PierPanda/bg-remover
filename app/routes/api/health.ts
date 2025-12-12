import type { Route } from "./+types/health";
import type { HealthResponse } from "~/types";
import {
  successResponse,
  handleApiError,
  logRequest,
} from "../../services/utils";

const startTime = Date.now();

export async function loader({ request }: Route.LoaderArgs) {
  try {
    logRequest(request);

    const uptime = Date.now() - startTime;

    const healthData: HealthResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime / 1000),
    };

    return successResponse(healthData);
  } catch (error) {
    return handleApiError(error);
  }
}
