import { useNavigate } from 'react-router-dom';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { StepNavigation } from '@/components/AddPersonFlow/StepNavigation';
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
    <FlowLayout stepNumber={1} stepTitle="Basic Information">
      <h1 className="text-3xl font-bold text-[#111817] mb-2">
        Who are we <span className="text-primary">celebrating?</span>
      </h1>
      <div className="space-y-6 mt-8">
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
        <div className="flex items-start gap-2 text-sm text-[#638885] mt-4">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <p>You can always tweak these details later.</p>
        </div>
      </div>
      <StepNavigation
        stepNumber={1}
        onContinue={handleContinue}
        continueLabel="Continue to Step 2"
        canSkip={false}
      />
    </FlowLayout>
  );
}
