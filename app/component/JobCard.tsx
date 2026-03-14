"use client";

import { JobApplication } from "../types/jobs";

interface JobCardProps {
  application: JobApplication;
}

const JobCard = ({ application }: JobCardProps) => {
  return (
    <li>
      {application.company} - {application.role} - {application.status} -{" "}
      {application.dateApplied}
    </li>
  );
};

export default JobCard;
