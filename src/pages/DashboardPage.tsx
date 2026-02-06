import { Link } from 'react-router-dom';
import {
  dashboardEvents,
  dashboardPeople,
} from '@/data/dashboardMockData';
import { PersonCard } from '@/components/PersonCard';

export function DashboardPage() {
  return (
    <>
      {/* Hero */}
      <div className="max-w-[800px] mb-12">
          <h1 className="text-[#111817] tracking-tight text-4xl lg:text-5xl font-bold leading-tight pb-3">
            You've got time — let's plan this.
          </h1>
          <p className="text-[#638885] text-lg">
            Thoughtful gifts take time. Here's what's coming up on your
            horizon.
          </p>
        </div>

        {/* Upcoming Horizon */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[#111817] text-2xl font-bold tracking-tight">
              Upcoming Horizon
            </h2>
            <Link
              to="/calendar"
              className="text-sm font-bold text-primary flex items-center gap-1 hover:opacity-90"
            >
              View full calendar
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {dashboardEvents.map((event, index) => (
              <div key={event.id} className="flex-none w-64 snap-start">
                <div
                  className={`bg-white p-5 rounded-xl border border-[#e5e7eb] relative ${
                    index === 0 ? '' : 'opacity-70 hover:opacity-100 transition-opacity'
                  }`}
                >
                  {event.inDaysLabel && (
                    <div className="absolute -top-3 left-6 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {event.inDaysLabel}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3 pt-2">
                    <span
                      className={`material-symbols-outlined ${
                        index === 0 ? 'text-primary' : 'text-[#638885]'
                      }`}
                    >
                      {event.icon}
                    </span>
                    <p className="text-sm font-bold text-[#111817]">
                      {event.title}
                    </p>
                  </div>
                  <p className="text-[#638885] text-xs font-medium uppercase tracking-widest">
                    {event.dateLabel}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex-none w-48 snap-start flex items-center justify-center border-2 border-dashed border-[#dce5e4] rounded-xl cursor-pointer hover:bg-white/50 transition-colors min-h-[120px]">
              <div className="flex flex-col items-center gap-1 text-[#638885]">
                <span className="material-symbols-outlined">add</span>
                <span className="text-xs font-bold uppercase">Add Event</span>
              </div>
            </div>
          </div>
        </section>

        {/* Your People */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[#111817] text-2xl font-bold tracking-tight">
              Your People
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-white border border-[#e5e7eb] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-[#111817]"
              >
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Filter
              </button>
              <Link
                to="/add-person/step-1"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90"
              >
                <span className="material-symbols-outlined text-sm">
                  person_add
                </span>
                Add Person
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardPeople.map((person) => (
              <PersonCard
                key={person.id}
                to="/suggestions"
                name={person.name}
                relationship={person.relationship}
                avatarUrl={person.avatarUrl}
                nextEventLabel={person.nextEventLabel}
                status={person.status}
                statusLabel={person.statusLabel}
                likes={person.likes}
                buttonLabel={person.buttonLabel}
                buttonIcon={person.buttonType === 'plan' ? 'edit_calendar' : 'local_shipping'}
              />
            ))}
          </div>
        </section>

      {/* Floating Get AI Ideas */}
      <div className="fixed bottom-8 right-8">
        <button
          type="button"
          className="bg-background-dark text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-sm font-bold pr-2">Get AI Ideas</span>
        </button>
      </div>
    </>
  );
}
