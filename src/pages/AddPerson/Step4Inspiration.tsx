import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { StepNavigation } from '@/components/AddPersonFlow/StepNavigation';
import { SocialInput } from '@/components/ui/SocialInput';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAddPerson } from '@/context/AddPersonContext';
import { socialNetworkOptions } from '@/constants/socialNetworks';

function extractUsernameFromUrl(url: string, _platform: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const pathname = urlObj.pathname.replace(/^\//, '').replace(/\/$/, '');
    return pathname.split('/')[0] || '';
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0] || '';
  }
}

export function Step4Inspiration() {
  const navigate = useNavigate();
  const { formData, updateFormData, submitForm } = useAddPerson();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAccountPlatform, setNewAccountPlatform] = useState('');
  const [newAccountUrl, setNewAccountUrl] = useState('');

  const mainNetworks = ['instagram', 'tiktok', 'linkedin', 'facebook'];
  const mainAccounts = formData.socialAccounts.filter((acc) =>
    mainNetworks.includes(acc.platform.toLowerCase())
  );
  const otherAccounts = formData.socialAccounts.filter(
    (acc) => !mainNetworks.includes(acc.platform.toLowerCase())
  );

  const handleMainNetworkChange = (platform: string, url: string) => {
    const existingIndex = formData.socialAccounts.findIndex(
      (acc) => acc.platform.toLowerCase() === platform.toLowerCase()
    );
    
    if (!url.trim()) {
      // Remove account if URL is empty
      if (existingIndex >= 0) {
        handleRemoveAccount(platform);
      }
      return;
    }

    const username = extractUsernameFromUrl(url, platform);
    const profileUrl = url.startsWith('http') ? url : `https://${url}`;

    if (existingIndex >= 0) {
      const updated = [...formData.socialAccounts];
      updated[existingIndex] = { platform, username, profileUrl };
      updateFormData({ socialAccounts: updated });
    } else {
      updateFormData({
        socialAccounts: [
          ...formData.socialAccounts,
          { platform, username, profileUrl },
        ],
      });
    }
  };

  const handleRemoveAccount = (platform: string) => {
    updateFormData({
      socialAccounts: formData.socialAccounts.filter(
        (acc) => acc.platform.toLowerCase() !== platform.toLowerCase()
      ),
    });
  };

  const handleAddOtherAccount = () => {
    if (newAccountPlatform && newAccountUrl) {
      const username = extractUsernameFromUrl(newAccountUrl, newAccountPlatform);
      const profileUrl = newAccountUrl.startsWith('http')
        ? newAccountUrl
        : `https://${newAccountUrl}`;
      updateFormData({
        socialAccounts: [
          ...formData.socialAccounts,
          { platform: newAccountPlatform, username, profileUrl },
        ],
      });
      setNewAccountPlatform('');
      setNewAccountUrl('');
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    const result = await submitForm();
    setIsSubmitting(false);
    if (result.success) {
      navigate('/add-person/success', { state: { personId: result.personId } });
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const getMainAccountValue = (platform: string) => {
    const account = mainAccounts.find(
      (acc) => acc.platform.toLowerCase() === platform.toLowerCase()
    );
    return account?.profileUrl || '';
  };

  return (
    <FlowLayout stepNumber={4} stepTitle="New Connection">
      <h1 className="text-3xl font-bold text-[#111817] mb-2">
        A little extra <span className="text-primary">inspiration.</span>
      </h1>
      <p className="text-[#638885] text-lg mb-6">
        Optional: Paste a social link to help us understand their style.
      </p>
      <div className="space-y-6 mt-8">
        {mainNetworks.map((platform) => (
          <div key={platform}>
            <SocialInput
              network={platform}
              value={getMainAccountValue(platform)}
              onChange={(url) => handleMainNetworkChange(platform, url)}
              placeholder={`${platform}.com/username`}
            />
            {getMainAccountValue(platform) && (
              <button
                type="button"
                onClick={() => handleRemoveAccount(platform)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {otherAccounts.length > 0 && (
          <div className="space-y-3">
            {otherAccounts.map((account, index) => (
              <div key={index} className="p-3 bg-[#f8fafa] rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#111817]">
                      {account.platform}
                    </span>
                    <span className="text-sm text-[#638885] ml-2">
                      {account.profileUrl}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAccount(account.platform)}
                    className="text-[#638885] hover:text-red-600"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-2 border-dashed border-[#dce5e4] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select
              placeholder="Select platform"
              options={socialNetworkOptions}
              value={newAccountPlatform}
              onChange={(e) => setNewAccountPlatform(e.target.value)}
            />
            <Input
              placeholder="Profile URL"
              value={newAccountUrl}
              onChange={(e) => setNewAccountUrl(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            onClick={handleAddOtherAccount}
            disabled={!newAccountPlatform || !newAccountUrl}
            fullWidth
            icon="add"
            iconPosition="left"
          >
            Add another
          </Button>
        </div>
        <div className="flex items-start gap-2 text-sm text-[#638885] mt-4">
          <span className="material-symbols-outlined text-lg">help</span>
          <p>
            This helps our assistant analyze their interests and aesthetic for
            more tailored gift suggestions.
          </p>
        </div>
      </div>
      <StepNavigation
        stepNumber={4}
        onBack={() => navigate('/add-person/step-3')}
        onContinue={handleFinish}
        onSkip={handleFinish}
        continueLabel="Finish Profile"
        canSkip={true}
        isLoading={isSubmitting}
      />
    </FlowLayout>
  );
}
