import { useNavigate } from 'react-router-dom';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { StepNavigation } from '@/components/AddPersonFlow/StepNavigation';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAddPerson } from '@/context/AddPersonContext';
import { relationshipOptions } from '@/constants/relationships';

export function Step1MainData() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useAddPerson();

  const handleContinue = () => {
    if (!formData.name.trim() || !formData.relationship) {
      return;
    }
    navigate('/add-person/step-2');
  };

  return (
    <FlowLayout stepNumber={1} stepTitle="Basic Information" pageHeading={
      <>
      Who are we <span className="text-primary italic">celebrating?</span>
      </>
    }>
      <div className="space-y-6">
        <Input
          label="FULL NAME"
          placeholder="e.g. Sarah Jenkins"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
        <Select
          label="RELATIONSHIP"
          placeholder="How do you know them?"
          options={relationshipOptions}
          value={formData.relationship}
          onChange={(e) => updateFormData({ relationship: e.target.value })}
        />
        <div className="flex items-center justify-center gap-2 text-sm text-muted mt-4 text-center">
          <Icon name="check-circle" className="text-sm" />
          <p>You can always tweak these details later.</p>
        </div>
      </div>
      <StepNavigation
        stepNumber={1}
        onContinue={handleContinue}
        continueLabel="Continue"
        canSkip={false}
      />
    </FlowLayout>
  );
}
