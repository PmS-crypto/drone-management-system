import React from 'react';
import { cn } from '@/src/lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * Header - Linear style
 * Larger headings (32-48px), generous spacing, Inter Semibold 600
 */
export function Header({ title, description, actions, className, ...props }: HeaderProps) {
  return (
    <div className={cn('mb-10', className)} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-pageTitle font-semibold text-text-primary mb-3 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
