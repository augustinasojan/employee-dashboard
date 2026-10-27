# Employee Dashboard (React)

A React app with a navbar (Home and Employee Form), a dashboard that lists users from an external API, and an employee form.

## Features
- Navbar with **Home** and **Employee Form** links (React Router, active link highlighted)
- Home / Dashboard (`/`): fetches `https://jsonplaceholder.typicode.com/users` and shows **id, name and email** in a table, with loading, error (with retry) and empty states
- Employee Form (`/employee-form`): **Name, Designation, Location, Salary** with validation and an on-screen confirmation (no data is posted, as required)
- Bootstrap 5 for styling; responsive layout
- Unknown URLs show a "Page not found" screen

## Tech stack
React 18 (Vite), React Router v6, Bootstrap 5

## Routes
| Path | Page |
|---|---|
| `/` | Employee Dashboard (Home) |
| `/employee-form` | Employee Form |

## Setup
```
npm install
npm run dev
```
Open the address shown in the terminal (usually http://localhost:5173).

Production build: `npm run build` (output in `dist/`).

## Project structure
```
src/
  components/Navbar.jsx
  pages/Dashboard.jsx
  pages/EmployeeForm.jsx
  services/api.js        (all HTTP calls)
  App.jsx, main.jsx
```

## Known limitations
- The form does not save or send data (per the assignment)
- No automated tests
- If deployed, the host needs an SPA fallback so refreshing `/employee-form` serves `index.html` (e.g. a `vercel.json` rewrite or Netlify `_redirects`)
