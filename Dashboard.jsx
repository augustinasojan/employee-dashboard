import { useCallback, useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      setEmployees(await fetchEmployees(signal));
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message === "Failed to fetch" ? "Network error. Check your connection." : err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return (
    <section>
      <h1 className="h3 mb-3">Employee Dashboard</h1>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={() => load()}>Retry</button>
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <p className="text-muted text-center py-4">No employees found.</p>
      )}

      {!loading && !error && employees.length > 0 && (
        <div className="table-responsive shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <th scope="row">{e.id}</th>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
