import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function ErrorMessage({ message, onRetry, children, className }: ErrorMessageProps) {
  return (
    <div className={clsx("bg-red-50 border border-red-200 rounded-lg p-4", className)}>
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-800 font-medium">{message}</p>
          {children && <div className="mt-2 text-sm text-red-700">{children}</div>}
          {onRetry && (
            <Button onClick={onRetry} variant="secondary" size="sm" className="mt-3">
              Tekrar Dene
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
