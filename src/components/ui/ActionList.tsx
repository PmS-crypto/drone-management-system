import React from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronRightIcon } from './Icons';
import { Button } from './Button';

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
 * ActionList - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function ActionList({ items, className }: ActionListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item, index) => (
        <Button
          key={index}
          onClick={item.onClick}
          variant="outline"
          size="sm"
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
