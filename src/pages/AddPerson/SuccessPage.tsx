import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { useAddPerson } from '@/context/AddPersonContext';

export function SuccessPage() {
  const navigate = useNavigate();
  const { resetForm } = useAddPerson();
 
  useEffect(() => {
    try {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // If canvas-confetti fails for any reason, just skip the effect
    }
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/people');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <>
      <FlowLayout stepNumber={4} stepTitle="Success">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-scale-in">
              <span className="material-symbols-outlined text-5xl text-primary animate-checkmark">
                check_circle
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#111817] mb-4 text-center">
            Profile Created Successfully!
          </h1>
          <p className="text-[#638885] text-lg mb-8 text-center max-w-md">
            Your new connection has been added. We'll help you plan thoughtful
            gifts for them.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => navigate('/people')}
              icon="person"
              iconPosition="left"
            >
              View All People
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                resetForm();
                navigate('/add-person/step-1');
              }}
              icon="add"
              iconPosition="left"
            >
              Add Another Person
            </Button>
          </div>
        </div>
      </FlowLayout>
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes checkmark {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-checkmark {
          animation: checkmark 0.6s ease-out;
        }
      `}</style>
    </>
  );
}
