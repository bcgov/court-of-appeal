import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "../json"


export interface form2StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form2SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form2DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;
    filingParties: string[];
    phoneNumbers: string;
    emailAdresses: string;
    addresses: string; 
    authorizedName: string;
    completionDate?: string;   
    version?: string;
}
