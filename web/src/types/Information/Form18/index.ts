import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "../json";

export interface form18FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form18DataInfoType;
    description: string;
}

export interface form18StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form18SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form18DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;        
    authorizedName: string;
    changeRepresentation: boolean;
    currentRepresentation?: string;
    currentLawyerName?: string;
    newRepresentation?: string;  
    newLawyerName?: string; 
    useServiceEmail: boolean;
    sendNotifications: boolean;
    serviceInformation: serviceInformationJsonDataType;
    selfRepresented?: boolean;    
    completionDate?: string;
    version?: string;
}
