import * as React from "react";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, type, message, duration };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    error: {
      icon: XCircle,
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    },
    warning: {
      icon: AlertCircle,
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    info: {
      icon: Info,
      className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
  };

  const { icon: Icon, className } = config[toast.type];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300",
        className,
        isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
