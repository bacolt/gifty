import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { StepNavigation } from '@/components/AddPersonFlow/StepNavigation';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';
import { useAddPerson } from '@/context/AddPersonContext';
import { interestOptions } from '@/constants/interests';

export function Step2Interests() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useAddPerson();
  const [inputValue, setInputValue] = useState('');

  const handleAddInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      updateFormData({ interests: [...formData.interests, interest] });
      setInputValue('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    updateFormData({
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleAddInterest(inputValue.trim());
    }
  };

  const handleSuggestionClick = (value: string) => {
    handleAddInterest(value);
  };

  return (
    <FlowLayout stepNumber={2} stepTitle="Interests & Hobbies" pageHeading={
      <>
      What makes them <span className="text-primary italic">smile?</span>
      </>
    }>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            ADD AN INTEREST
          </label>
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search or type a hobby..."
              className="pl-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <Icon name="search" />
            </span>
          </div>
          {formData.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest.charAt(0).toUpperCase() + interest.slice(1)}
                  onDelete={() => handleRemoveInterest(interest)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-3">
            POPULAR SUGGESTIONS
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                variant="suggestion"
                onClick={() => handleSuggestionClick(option.value)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted mt-4 text-center">
            <Icon name="stars" className="text-lg" />
            <p>The more you add, the better our suggestions.</p>
          </div>
        </div>
      </div>
      <StepNavigation
        stepNumber={2}
        onBack={() => navigate('/add-person/step-1')}
        onContinue={() => navigate('/add-person/step-3')}
        continueLabel="Continue"
        canSkip={false}
      />
    </FlowLayout>
  );
}
