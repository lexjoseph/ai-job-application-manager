export interface JobApplication { //interface describes the object
    id: number;
    company: string;
    role: string;
    status: string;
}


//union type "|"" ApplicationStatus can only be one of these
export type ApplicationStatus = "Applied" | "Interviewing" | "Offer" | "Rejected"
