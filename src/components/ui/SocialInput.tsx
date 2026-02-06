import { Icon } from './Icon';
import { Input } from './Input';

interface SocialInputProps {
  network: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const networkIcons: Record<string, string> = {
  instagram: 'camera',
  tiktok: 'camera-video',
  linkedin: 'briefcase',
  facebook: 'person',
};

const networkLabels: Record<string, string> = {
  instagram: 'INSTAGRAM',
  tiktok: 'TIKTOK',
  linkedin: 'LINKEDIN',
  facebook: 'FACEBOOK',
};

export function SocialInput({
  network,
  value,
  onChange,
  placeholder,
  error,
}: SocialInputProps) {
  const icon = networkIcons[network.toLowerCase()] || 'link';
  const label = networkLabels[network.toLowerCase()] || network.toUpperCase();

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-[#638885] uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#638885] pointer-events-none">
          <Icon name={icon} className="text-xl" />
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          error={error}
          className="pl-12"
        />
      </div>
    </div>
  );
}
