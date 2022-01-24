import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "../json"



export interface form5StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form5SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form5DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;
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
