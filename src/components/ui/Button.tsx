import { forwardRef } from 'react';
import { Icon } from '@/components/ui/Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2';
    
    const variantClasses = {
      primary: 'bg-primary text-foreground hover:opacity-90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
      secondary: 'bg-white border border-border text-foreground hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed',
      text: 'text-foreground hover:text-primary bg-transparent disabled:opacity-50 disabled:cursor-not-allowed',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <Icon name={icon} className="text-[18px]" />
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <Icon name={icon} className="text-[18px]" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
