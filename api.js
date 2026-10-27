const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchEmployees(signal) {
  const res = await fetch(USERS_URL, { signal });
  if (!res.ok) throw new Error("Could not load employees. Please try again.");
  const data = await res.json();
  // keep only the fields the dashboard needs
  return data.map(({ id, name, email }) => ({ id, name, email }));
}
