# Gift Planner App

A React + TypeScript web app for planning gifts: calendar of people/events, people management, and gift suggestions.

## Setup

```bash
npm install
```

## Run

- **Development:** `npm run dev` or `npm start` (dev server at http://localhost:5173)
- **Production build:** `npm run build`
- **Preview build:** `npm run preview`

## Supabase

Set `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. On load, the app checks the connection and logs to the browser console:

- **`[Supabase] Connection OK`** — URL and anon key are valid and the project is reachable.
- **`[Supabase] Connection failed: <message>`** — Wrong URL/key, network issue, or project paused.

You can also call `checkSupabaseConnection()` from `@/lib/supabase` anywhere to run the check manually.

## Tech

- React 19 + TypeScript, functional components only
- Vite, React Router, Tailwind CSS v4, Supabase
- State: `useState` + `useContext` (people, events, selected person)
- ESLint + Prettier

## Structure

- `src/components/` — Header, Nav, Layout
- `src/pages/` — CalendarPage, PeoplePage, SuggestionPage
- `src/context/` — AppContext
- `src/types/` — Person, Event, Profile, GiftSuggestion
- `src/data/` — mock data
- `src/utils/` — helpers (e.g. formatDate)

Routes: `/calendar`, `/people`, `/suggestions`. No backend; data is hardcoded for now.
