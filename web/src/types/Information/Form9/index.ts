import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form9StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form9SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form9DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;
    judgeName: string;
    orderDate: string;
    initiatingDocumentDate: string;        
    authorizedName: string;
    abandoningParties: string[];
    abandoningAgainstParties: string[];
    abandonType: string;
    selfRepresented?: boolean;    
    completionDate?: string;
    version?: string;
}
