import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { StepNavigation } from '@/components/AddPersonFlow/StepNavigation';
import { Icon } from '@/components/ui/Icon';
import { DatePicker } from '@/components/ui/DatePicker';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAddPerson } from '@/context/AddPersonContext';
import { eventTypeOptions } from '@/constants/eventTypes';

export function Step3Calendar() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useAddPerson();
  const [newMilestoneType, setNewMilestoneType] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');

  const handleAddMilestone = () => {
    if (newMilestoneType && newMilestoneDate) {
      updateFormData({
        milestones: [
          ...formData.milestones,
          { type: newMilestoneType, date: newMilestoneDate },
        ],
      });
      setNewMilestoneType('');
      setNewMilestoneDate('');
    }
  };

  const handleRemoveMilestone = (index: number) => {
    updateFormData({
      milestones: formData.milestones.filter((_, i) => i !== index),
    });
  };

  const handleContinue = () => {
    navigate('/add-person/step-4');
  };

  const handleSkip = () => {
    navigate('/add-person/step-4');
  };

  return (
    <FlowLayout stepNumber={3} stepTitle="New Connection">
      <h1 className="text-3xl font-bold text-[#111817] mb-2">
        Mark your <span className="text-primary">calendar.</span>
      </h1>
      <p className="text-[#638885] text-lg mb-6">
        We'll give you a gentle nudge before the big day.
      </p>
      <div className="space-y-6 mt-8">
        <DatePicker
          label="BIRTHDAY"
          value={formData.birthday}
          onChange={(e) => updateFormData({ birthday: e.target.value })}
        />
        <div>
          <label className="block text-xs font-bold text-[#638885] uppercase tracking-wider mb-3">
            OTHER MILESTONES
          </label>
          {formData.milestones.length > 0 && (
            <div className="space-y-3 mb-4">
              {formData.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-[#f8fafa] rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="px-3 py-2 bg-white rounded border border-[#e5e7eb] text-sm text-[#111817]">
                      {eventTypeOptions.find((opt) => opt.value === milestone.type)
                        ?.label || milestone.type}
                    </div>
                    <div className="px-3 py-2 bg-white rounded border border-[#e5e7eb] text-sm text-[#111817]">
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(index)}
                    className="text-[#638885] hover:text-red-600 transition-colors"
                    aria-label="Remove milestone"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-2 border-dashed border-[#dce5e4] rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Select
                placeholder="Event Type"
                options={eventTypeOptions}
                value={newMilestoneType}
                onChange={(e) => setNewMilestoneType(e.target.value)}
              />
              <DatePicker
                value={newMilestoneDate}
                onChange={(e) => setNewMilestoneDate(e.target.value)}
                placeholder="Date"
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleAddMilestone}
              disabled={!newMilestoneType || !newMilestoneDate}
              fullWidth
              icon="plus"
              iconPosition="left"
            >
              {formData.milestones.length === 0
                ? 'Add another date'
                : 'Add another'}
            </Button>
          </div>
        </div>
      </div>
      <StepNavigation
        stepNumber={3}
        onBack={() => navigate('/add-person/step-2')}
        onContinue={handleContinue}
        onSkip={handleSkip}
        continueLabel="Continue to Preferences"
        canSkip={true}
      />
    </FlowLayout>
  );
}
