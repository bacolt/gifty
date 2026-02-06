import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FlowLayout } from '@/components/AddPersonFlow/FlowLayout';
import { useAddPerson } from '@/context/AddPersonContext';

// Dynamic import for react-confetti (will fail gracefully if not installed)
let Confetti: any = null;
try {
  Confetti = require('react-confetti').default;
} catch {
  // Library not installed, will use CSS-only animation
}

export function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetForm } = useAddPerson();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/people');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  const personId = location.state?.personId;

  return (
    <>
      {showConfetti && Confetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
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
