import React from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronRightIcon } from './Icons';

interface ActionItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface ActionListProps {
  items: ActionItem[];
  className?: string;
}

/**
 * ActionList - Linear style
 * Cleaner action-list style, generous padding, subtle separators
 */
export function ActionList({ items, className }: ActionListProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-4 text-left rounded-xl',
            'text-body font-medium text-text-primary',
            'hover:bg-bg-raised hover:border-border-hover border border-transparent',
            'transition-all duration-200 hover-scale',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2'
          )}
        >
          {item.icon && (
            <div className="text-text-tertiary opacity-60 flex-shrink-0">
              {item.icon}
            </div>
          )}
          <span className="flex-1">{item.label}</span>
          <ChevronRightIcon className="w-4 h-4 text-text-tertiary opacity-40" />
        </button>
      ))}
    </div>
  );
}
