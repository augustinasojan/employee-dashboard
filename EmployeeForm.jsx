import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY = { name: "", designation: "", location: "", salary: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.designation.trim()) errors.designation = "Designation is required.";
  if (!values.location.trim()) errors.location = "Location is required.";
  if (values.salary === "") errors.salary = "Salary is required.";
  else if (!Number.isFinite(Number(values.salary)) || Number(values.salary) <= 0) {
    errors.salary = "Salary must be a number greater than 0.";
  }
  return errors;
}

export default function EmployeeForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSubmitted(null);
      return;
    }
    // Per the requirements, nothing is posted anywhere; we only confirm on screen.
    setSubmitted({ ...values, salary: Number(values.salary) });
    setValues(EMPTY);
  }

  const field = (id, label, type = "text", extra = {}) => (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        className={"form-control" + (errors[id] ? " is-invalid" : "")}
        value={values[id]}
        onChange={handleChange}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        {...extra}
      />
      {errors[id] && <div id={`${id}-error`} className="invalid-feedback">{errors[id]}</div>}
    </div>
  );

  return (
    <section className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h1 className="h3 mb-3">Employee Form</h1>

        {submitted && (
          <div className="alert alert-success" role="status">
            <strong>Employee details captured.</strong>
            <ul className="mb-0 mt-2">
              <li>Name: {submitted.name}</li>
              <li>Designation: {submitted.designation}</li>
              <li>Location: {submitted.location}</li>
              <li>Salary: {submitted.salary.toLocaleString("en-IN")}</li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="card card-body shadow-sm">
          {field("name", "Name")}
          {field("designation", "Designation")}
          {field("location", "Location")}
          {field("salary", "Salary", "number", { min: 0, step: "any" })}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/")}>
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
