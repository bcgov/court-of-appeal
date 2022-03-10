import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form3FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form3DataInfoType;
    description: string;
}

export interface form3StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form3SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form3DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    appellantNames: string;
    respondentNames: string;
    crossAppealRequired: boolean;
    judgeName: string;
    orderDate: string;        
    authorizedName: string;
    crossAppealingParties: string[];
    partOfOrderCrossAppealed?:string;
    seekingOrder?:string;
    partOfOrderLeaveCrossAppealed?: string;
    groundsLeaveCrossAppeal?: string;
    selfRepresented?: boolean;  
    phoneNumbers: string;
    emailAdresses: string;
    addresses: string;   
    completionDate?: string;
    version?: string;
}
