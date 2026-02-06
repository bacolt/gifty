import { Link } from 'react-router-dom';
import {
  dashboardEvents,
  dashboardPeople,
} from '@/data/dashboardMockData';

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
                to="/people"
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
              <div
                key={person.id}
                className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-14 rounded-full bg-center bg-cover border-2 border-white shadow-sm flex-shrink-0"
                      style={{
                        backgroundImage: `url("${person.avatarUrl}")`,
                      }}
                      role="img"
                      aria-label={`${person.name}`}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#111817]">
                        {person.name}
                      </h3>
                      <p className="text-[#638885] text-sm">
                        {person.relationship}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[#638885] hover:text-primary transition-colors p-1"
                    aria-label="More options"
                  >
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </button>
                </div>
                <div
                  className={`bg-[#f8fafa] rounded-lg p-4 mb-6 ${
                    person.status === 'gift_ordered'
                      ? 'border-l-4 border-green-400'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-[#638885] uppercase tracking-wider">
                      {person.status === 'gift_ordered' ? 'Status' : 'Next Event'}
                    </p>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        person.status === 'coming_soon'
                          ? 'text-primary bg-primary/10'
                          : person.status === 'gift_ordered'
                            ? 'text-green-600 bg-green-100'
                            : 'text-[#638885] bg-gray-100'
                      }`}
                    >
                      {person.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#111817]">
                    {person.nextEventLabel}
                  </p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {person.likes.map((like) => (
                      <span
                        key={like}
                        className="text-[10px] bg-white px-2 py-1 rounded border border-[#e5e7eb] text-[#638885]"
                      >
                        Likes: {like}
                      </span>
                    ))}
                  </div>
                </div>
                {person.buttonType === 'plan' ? (
                  <Link
                    to="/suggestions"
                    className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 block text-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      edit_calendar
                    </span>
                    {person.buttonLabel}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-[#f0f4f4] text-[#111817] py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      local_shipping
                    </span>
                    {person.buttonLabel}
                  </button>
                )}
              </div>
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
