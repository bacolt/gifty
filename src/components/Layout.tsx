import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <DashboardHeader />
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
