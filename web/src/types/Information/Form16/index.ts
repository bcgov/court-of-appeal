import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form16FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form16DataInfoType;
    description: string;
}

export interface form16StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form16SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form16DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;         
    authorizedName: string;
    offeringParties: string[];
    receivingParties: string[];
    amount: string;      
    completionDate?: string;
    version?: string;
}
