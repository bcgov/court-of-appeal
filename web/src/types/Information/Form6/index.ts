import { applicantJsonDataType, respondentsJsonDataType } from "../json";



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
//TODO: determine exact info
export interface form6DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    numberOfDaysApp?: string;
    numberOfDaysResp?: string;
    dateOfAppealHearing: string;
    timeOfAppealHearing: string;    
    authorizedName: string;
    courtHouse: string;
    selfRepresented?: boolean;
    acknowledge: boolean;
    completionDate?: string;
    version?: string;
}
