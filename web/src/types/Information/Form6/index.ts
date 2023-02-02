import { applicantJsonDataType, initiatingDocumentJsonInfoType, previousCourtJsonInfoType, respondentsJsonDataType } from "../json";

export interface form6FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form6DataInfoType;
    description: string;
}

export interface form6StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form6SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form6DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    initiatingDocuments?: initiatingDocumentJsonInfoType[];
    previousCourts?: previousCourtJsonInfoType[];
    firstAppellant: string;
    firstRespondent: string;
    judgeName: string;
    orderDate: string;
    initiatingDocumentDates: string[];
    initiatingDocumentDate: string;  
    dateOfInitiatingDocumentValidated: Boolean;      
    authorizedName: string;
    abandoningParties: string[];
    abandoningAgainstParties: string[];
    abandonType: string;
    selfRepresented?: boolean;    
    completionDate?: string;
    version?: string;
}