import { createContext, useCallback, useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";

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

export const ToastContext = createContext<ToastContextType | null>(null);

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 5000;

const toastIcons: Record<ToastType, string> = {
  success: "lucide:check-circle",
  error: "lucide:x-circle",
  warning: "lucide:alert-triangle",
  info: "lucide:info",
};

const toastColors: Record<
  ToastType,
  { bg: string; border: string; text: string; icon: string }
> = {
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
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration = DEFAULT_DURATION) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, type, message, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-MAX_TOASTS);
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
                aria-label="Close toast"
              >
                <Icon icon="lucide:x" className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
