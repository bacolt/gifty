import { forwardRef, useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      error,
      value = '',
      onChange,
      disabled,
      className = '',
      name,
      id,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [open]);

    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption ? selectedOption.label : null;

    const triggerChange = (newValue: string) => {
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
      setOpen(false);
    };

    const triggerClasses = `w-full px-4 py-3 pr-10 rounded-[10px] border text-left flex items-center justify-between gap-2 ${
      error
        ? 'border-red-300 bg-red-50'
        : 'border-[#e5e7eb] bg-[#f0f4f4] focus:border-primary'
    } focus:outline-none focus:ring-2 focus:ring-primary/20 text-[#111817] cursor-pointer transition-colors ${className}`;

    return (
      <div className="w-full" ref={containerRef} id={id}>
        {label && (
          <label className="block text-xs font-bold text-[#638885] uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {name && (
            <input type="hidden" name={name} value={value} readOnly />
          )}
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setOpen((o) => !o)}
            className={triggerClasses}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={label}
          >
            <span
              className={
                displayLabel
                  ? 'text-[#111817] truncate'
                  : 'text-[#638885] truncate'
              }
            >
              {displayLabel ?? placeholder ?? ''}
            </span>
            <Icon
              name="chevron-down"
              className={`text-xl text-[#638885] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
          {open && (
            <ul
              className="absolute z-50 w-full mt-1 py-1 bg-white border border-[#e5e7eb] rounded-[10px] shadow-lg max-h-60 overflow-auto [&>li:first-child]:rounded-t-[9px] [&>li:last-child]:rounded-b-[9px]"
              role="listbox"
            >
              {placeholder && (
                <li
                  role="option"
                  aria-selected={!value}
                  onClick={() => triggerChange('')}
                  className="px-4 py-2.5 text-[#638885] hover:bg-[#f0f4f4] cursor-pointer transition-colors"
                >
                  {placeholder}
                </li>
              )}
              {options.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => triggerChange(opt.value)}
                  className={`px-4 py-2.5 text-[#111817] hover:bg-[#f0f4f4] cursor-pointer transition-colors ${
                    value === opt.value
                      ? 'bg-primary/10 text-primary font-medium'
                      : ''
                  }`}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
