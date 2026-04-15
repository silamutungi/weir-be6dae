import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 capitalize',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-white',
        secondary: 'bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
        destructive: 'bg-[var(--color-error)] text-white',
        outline: 'border border-[var(--color-border)] text-[var(--color-text-secondary)]'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
