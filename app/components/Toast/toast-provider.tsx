import * as React from "react";
import { Icon } from "@iconify/react";
import {
  toastConfig,
  toastIcons,
  toastColors,
  toastContent,
} from "~/constants";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = React.useCallback(
    (
      type: ToastType,
      message: string,
      duration = toastConfig.defaultDuration
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, type, message, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-toastConfig.maxToasts);
      });

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        {toasts.map((toast) => {
          const colors = toastColors[toast.type];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto animate-slide-in-right flex min-w-80 max-w-md items-start gap-3 rounded-lg border-l-4 ${colors.border} ${colors.bg} p-4 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl`}
              role="alert"
            >
              <Icon
                icon={toastIcons[toast.type]}
                className={`h-5 w-5 shrink-0 ${colors.icon}`}
              />
              <p className={`flex-1 text-sm font-medium ${colors.text}`}>
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className={`shrink-0 ${colors.text} hover:opacity-70 transition-opacity`}
                aria-label={toastContent.closeLabel}
              >
                <Icon icon={toastContent.closeIcon} className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
