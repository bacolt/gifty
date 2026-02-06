import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { checkSupabaseConnection } from '@/lib/supabase';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AddPersonProvider } from '@/context/AddPersonContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { PeoplePage } from '@/pages/PeoplePage';
import { PersonDetailPage } from '@/pages/PersonDetailPage';
import { SuggestionPage } from '@/pages/SuggestionPage';
import { Step1MainData } from '@/pages/AddPerson/Step1MainData';
import { Step2Interests } from '@/pages/AddPerson/Step2Interests';
import { Step3Calendar } from '@/pages/AddPerson/Step3Calendar';
import { Step4Inspiration } from '@/pages/AddPerson/Step4Inspiration';
import { SuccessPage } from '@/pages/AddPerson/SuccessPage';

function AddPersonLayout() {
  return (
    <AddPersonProvider>
      <Outlet />
    </AddPersonProvider>
  );
}

function App() {
  useEffect(() => {
    checkSupabaseConnection().then(({ ok, error }) => {
      if (ok) {
        console.log('[Supabase] Connection OK');
      } else {
        console.error('[Supabase] Connection failed:', error);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="people/:personId" element={<PersonDetailPage />} />
              <Route path="suggestions" element={<SuggestionPage />} />
            </Route>
            
            <Route
              path="add-person"
              element={
                <ProtectedRoute>
                  <AddPersonLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/add-person/step-1" replace />} />
              <Route path="step-1" element={<Step1MainData />} />
              <Route path="step-2" element={<Step2Interests />} />
              <Route path="step-3" element={<Step3Calendar />} />
              <Route path="step-4" element={<Step4Inspiration />} />
              <Route path="success" element={<SuccessPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
