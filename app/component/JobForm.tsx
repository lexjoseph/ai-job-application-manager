"use client";

import { useState } from "react";
import type { JobApplication, ApplicationStatus } from "../types/jobs";

//jobform expects one prop called addApplication
interface JobFormProps {
  addApplication: (application: JobApplication) => void;
}

const JobForm = ({ addApplication }: JobFormProps) => {
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [dateApplied, setDateApplied] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newApplication: JobApplication = {
      id: Date.now(),
      company,
      role,
      status,
      dateApplied,
    };

    addApplication(newApplication);

    setCompany("");
    setRole("");
    setStatus("Applied");
    setDateApplied("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="company"
        value={company}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCompany(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="role"
        value={role}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRole(e.target.value)
        }
      />
      <select
        value={status}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target.value as ApplicationStatus)
        }
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        value={dateApplied}
        placeholder="date"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDateApplied(e.target.value)
        }
      ></input>

      <button type="submit">Add Application</button>
    </form>
  );
};

export default JobForm;
