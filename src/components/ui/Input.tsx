import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold text-[#638885] uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border ${
            error
              ? 'border-red-300 bg-red-50'
              : 'border-[#e5e7eb] bg-[#f0f4f4] focus:border-primary'
          } focus:outline-none focus:ring-2 focus:ring-primary/20 text-[#111817] placeholder:text-[#638885] transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
