"use client";

import { useState } from "react";
import type { JobApplication } from "./types/jobs";
import JobForm from "./component/JobForm";
import JobCard from "./component/JobCard";

export default function Home() {
  const [applications, setApplication] = useState<JobApplication[]>([]);

  const addapplication = (application: JobApplication): void => {
    setApplication((prevApplication) => [application, ...prevApplication]);
  };

  return (
    <div>
      <h1 className="text-center">My Personal AI Job Application Tracker </h1>
      <JobForm addApplication={addapplication} />
      <p>Total Applications: {applications.length} </p>

      <ul>
        {applications.map((application) => (
          <JobCard key={application.id} application={application} />
        ))}
      </ul>
    </div>
  );
}
