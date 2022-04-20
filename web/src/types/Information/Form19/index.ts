import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "../json";

export interface form19FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form19DataInfoType;
    description: string;
}

export interface form19StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form19SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form19DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;        
    authorizedName: string;    
    withdrawingLawyerName: string;
    withdrawingLawyerNameOther?: string;
    representingParties: string[];   
    phoneNumbers: string;
    emailAdresses: string;
    addresses: string;   
    completionDate?: string;
    version?: string;
}