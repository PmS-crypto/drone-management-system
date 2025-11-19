import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Input - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[var(--font-label)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 border rounded-[var(--radius-input)]',
          'text-[var(--font-body)]',
          'focus:outline-none focus:ring-2',
          'transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={{
          backgroundColor: 'var(--bg-input)',
          borderColor: error ? 'var(--color-alert)' : 'var(--border-subtle)',
          color: 'var(--text-primary)',
          transition: 'var(--motion-normal)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-light)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'var(--color-alert)' : 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        placeholder={props.placeholder}
        {...props}
      />
      {error && (
        <p className="mt-2 text-[var(--font-body)]" style={{ color: 'var(--color-alert)' }}>{error}</p>
      )}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[var(--font-label)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2.5 border rounded-[var(--radius-input)]',
          'text-[var(--font-body)]',
          'focus:outline-none focus:ring-2',
          'transition-all resize-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={{
          backgroundColor: 'var(--bg-input)',
          borderColor: error ? 'var(--color-alert)' : 'var(--border-subtle)',
          color: 'var(--text-primary)',
          transition: 'var(--motion-normal)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-light)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'var(--color-alert)' : 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
      {error && (
        <p className="mt-2 text-[var(--font-body)]" style={{ color: 'var(--color-alert)' }}>{error}</p>
      )}
    </div>
  );
}
