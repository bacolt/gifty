import { forwardRef, useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
}

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: (number | null)[] = [];
  const startDay = first.getDay();
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  return days;
}

function formatYMD(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function formatDisplay(value: string | undefined): string {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return value;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      error,
      value = '',
      onChange,
      placeholder = 'Select date',
      className = '',
      disabled,
      name,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [y, m, d] = value
      ? value.split('-').map(Number)
      : [undefined, undefined, undefined];
    const hasValue =
      Boolean(value) &&
      typeof y === 'number' &&
      typeof m === 'number' &&
      typeof d === 'number' &&
      !Number.isNaN(y) &&
      !Number.isNaN(m) &&
      !Number.isNaN(d);
    const displayYear = hasValue && y !== undefined ? y : new Date().getFullYear();
    const displayMonth =
      hasValue && m !== undefined ? m - 1 : new Date().getMonth();

    const [viewYear, setViewYear] = useState(displayYear);
    const [viewMonth, setViewMonth] = useState(displayMonth);
    type ViewMode = 'days' | 'months' | 'years';
    const [viewMode, setViewMode] = useState<ViewMode>('days');

    useEffect(() => {
      if (hasValue && y !== undefined && m !== undefined) {
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }, [value, hasValue, y, m]);

    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    // Reset to days view when opening
    useEffect(() => {
      if (open) setViewMode('days');
    }, [open]);

    const days = getDaysInMonth(viewYear, viewMonth);
    const monthName = new Date(viewYear, viewMonth).toLocaleDateString(
      'en-US',
      { month: 'long', year: 'numeric' }
    );
    const yearRangeSize = 12;
    const yearRangeStart =
      Math.floor(viewYear / yearRangeSize) * yearRangeSize;

    const handlePrev = () => {
      if (viewMode === 'years') {
        setViewYear((y) => y - yearRangeSize);
      } else if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNext = () => {
      if (viewMode === 'years') {
        setViewYear((y) => y + yearRangeSize);
      } else if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    const handleHeaderClick = () => {
      if (viewMode === 'days') setViewMode('months');
      else if (viewMode === 'months') setViewMode('years');
      else if (viewMode === 'years') setViewMode('months');
    };

    const handleSelectYear = (year: number) => {
      setViewYear(year);
      setViewMode('months');
    };

    const handleSelectMonth = (month: number) => {
      setViewMonth(month);
      setViewMode('days');
    };

    const handleSelect = (day: number) => {
      const newValue = formatYMD(viewYear, viewMonth, day);
      onChange?.({ target: { value: newValue } });
      setOpen(false);
    };

    const today = new Date();
    const todayYMD = formatYMD(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    return (
      <div className={`w-full ${className}`} ref={containerRef}>
        {label && (
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-2 px-4 py-3 pr-10 rounded-xl border text-left ${
              error
                ? 'border-red-300 bg-red-50'
                : 'border-border bg-surface focus:border-primary hover:border-primary/80'
            } focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span className={value ? 'text-foreground' : 'text-muted'}>
              {value ? formatDisplay(value) : placeholder}
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              <Icon name="calendar-date" className="text-xl" />
            </span>
          </button>
          {name && (
            <input type="hidden" name={name} value={value} readOnly />
          )}

          {open && (
            <div
              className="absolute z-50 mt-1 left-0 right-0 bg-surface border border-border rounded-xl shadow-lg p-4 min-w-[280px]"
              role="dialog"
              aria-label="Choose date"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg text-muted hover:bg-surface-muted hover:text-foreground transition-colors"
                  aria-label={
                    viewMode === 'years'
                      ? 'Previous years'
                      : viewMode === 'months'
                        ? 'Previous year'
                        : 'Previous month'
                  }
                >
                  <Icon name="chevron-left" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={handleHeaderClick}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors min-w-[8rem]"
                  aria-label={
                    viewMode === 'days'
                      ? 'Choose month and year'
                      : viewMode === 'months'
                        ? 'Choose year'
                        : 'Year range'
                  }
                >
                  {viewMode === 'days' && monthName}
                  {viewMode === 'months' && String(viewYear)}
                  {viewMode === 'years' &&
                    `${yearRangeStart} – ${yearRangeStart + yearRangeSize - 1}`}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg text-muted hover:bg-surface-muted hover:text-foreground transition-colors"
                  aria-label={
                    viewMode === 'years'
                      ? 'Next years'
                      : viewMode === 'months'
                        ? 'Next year'
                        : 'Next month'
                  }
                >
                  <Icon name="chevron-right" className="text-lg" />
                </button>
              </div>

              {viewMode === 'days' && (
                <>
                  <div className="grid grid-cols-7 gap-0.5 text-center text-xs text-muted mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
                      <div key={wd}>{wd}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {days.map((day, i) => {
                      if (day === null) {
                        return <div key={`e-${i}`} />;
                      }
                      const cellValue = formatYMD(viewYear, viewMonth, day);
                      const isSelected = value === cellValue;
                      const isToday = cellValue === todayYMD;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleSelect(day)}
                          className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                            isSelected
                              ? 'bg-primary text-white font-semibold'
                              : isToday
                                ? 'bg-primary/20 text-primary font-semibold'
                                : 'text-foreground hover:bg-surface-muted'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {viewMode === 'months' && (
                <div className="grid grid-cols-3 gap-1.5">
                  {monthNames.map((name, month) => {
                    const isSelected =
                      hasValue && y === viewYear && m === month + 1;
                    return (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleSelectMonth(month)}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'text-foreground hover:bg-surface-muted'
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              )}

              {viewMode === 'years' && (
                <div className="grid grid-cols-4 gap-1.5 max-h-[240px] overflow-y-auto">
                  {Array.from(
                    { length: yearRangeSize },
                    (_, i) => yearRangeStart + i
                  ).map((year) => {
                    const isSelected = hasValue && y === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleSelectYear(year)}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'text-foreground hover:bg-surface-muted'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
