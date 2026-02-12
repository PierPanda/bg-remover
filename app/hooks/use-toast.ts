import * as React from "react";
import { ToastContext } from "~/components/Toast/toast-provider";

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
