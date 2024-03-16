import React from 'react';

import { cn } from '@/lib/utils';

export const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full rounded-lg flex flex-col items-start justify-start gap-5 my-4',
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
FieldGroup.displayName = 'FieldGroup';
