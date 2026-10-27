import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EmployeeForm from "./pages/EmployeeForm";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2>Page not found</h2>
                <Link to="/" className="btn btn-primary mt-3">Back to Dashboard</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
