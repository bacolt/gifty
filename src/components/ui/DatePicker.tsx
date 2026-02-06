import { forwardRef } from 'react';

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold text-[#638885] uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={`w-full px-4 py-3 pr-10 rounded-xl border ${
              error
                ? 'border-red-300 bg-red-50'
                : 'border-[#e5e7eb] bg-[#f0f4f4] focus:border-primary'
            } focus:outline-none focus:ring-2 focus:ring-primary/20 text-[#111817] placeholder:text-[#638885] transition-colors ${className}`}
            {...props}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#638885]">
            <span className="material-symbols-outlined text-xl">calendar_today</span>
          </span>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
