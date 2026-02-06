import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkSupabaseConnection } from '@/lib/supabase';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { PeoplePage } from '@/pages/PeoplePage';
import { SuggestionPage } from '@/pages/SuggestionPage';

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
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="suggestions" element={<SuggestionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
