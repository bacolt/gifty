import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/calendar', label: 'Calendar' },
  { to: '/people', label: 'People' },
  { to: '/suggestions', label: 'Suggestions' },
];

export function Nav() {
  return (
    <nav className="flex gap-4 px-4 py-2 bg-slate-100 border-b border-slate-200">
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-3 py-2 rounded text-slate-700 font-medium transition ${
              isActive
                ? 'bg-slate-200 text-slate-900'
                : 'hover:bg-slate-200/70'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
