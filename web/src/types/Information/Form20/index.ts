import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form20FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form20DataInfoType;
    description: string;
}

export interface form20StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form20SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form20DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;        
    authorizedName: string;    
    withdrawingLawyerName: string;
    withdrawingLawyerNameOther?: string;
    objectingParties: string[];   
    objectingPartiesOther?: string;
    completionDate?: string;
    version?: string;
}