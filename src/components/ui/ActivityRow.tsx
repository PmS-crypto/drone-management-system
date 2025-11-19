import React from 'react';
import { cn } from '@/src/lib/utils';

interface ActivityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp: string;
  onClick?: () => void;
}

/**
 * ActivityRow - Linear style
 * Clean spacing, lighter surfaces, subtle timestamp alignment
 */
export function ActivityRow({ icon, title, description, timestamp, onClick, className, ...props }: ActivityRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-200',
        'hover:bg-bg-raised hover:border-border-hover border border-transparent',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-bg-raised border border-border-default flex items-center justify-center flex-shrink-0">
          <div className="text-text-tertiary opacity-60">
            {icon}
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-body font-medium text-text-primary truncate">{title}</div>
        {description && (
          <div className="text-bodySmall text-text-secondary truncate mt-0.5">{description}</div>
        )}
      </div>
      <div className="text-meta text-text-tertiary font-mono ml-4 flex-shrink-0">{timestamp}</div>
    </div>
  );
}
