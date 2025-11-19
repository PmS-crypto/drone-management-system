import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 bg-bg-surface border border-border-default rounded-md',
          'text-body text-text-primary placeholder:text-text-tertiary',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent',
          'transition-all duration-140',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-alert',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-body text-alert">{error}</p>
      )}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-3 py-2 bg-bg-surface border border-border-default rounded-md',
          'text-body text-text-primary placeholder:text-text-tertiary',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent',
          'transition-all duration-140 resize-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-alert',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-body text-alert">{error}</p>
      )}
    </div>
  );
}
