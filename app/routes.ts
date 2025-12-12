import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
  ]),

  // API Routes
  route("api/health", "routes/api/health.ts"),
  route("api/status", "routes/api/status.ts"),
  route("api/remove-background", "routes/api/remove-background.ts"),
] satisfies RouteConfig;
