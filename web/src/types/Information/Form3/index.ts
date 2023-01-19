import { partiesContact } from "..";
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

export interface form3QualificationInfoType {
    selfRepresenting: boolean;
    filedNoA: boolean;
    vary: boolean;
    appealingScFlaDivorce: boolean;
    insideTimeLimit: boolean;
    appealingSupremeCourtOrder: boolean;    
    appealingFeesWaived: boolean;
}

export interface form3DataInfoType {
    selfRepresenting: boolean;
    filedNoA: boolean;
    vary: boolean;
    appealingScFlaDivorce: boolean;
    insideTimeLimit: boolean;
    appealingSupremeCourtOrder: boolean;    
    appealingFeesWaived: boolean;
    requiresManualEntry: boolean;
    manualAppellants: partyInfoType[];
    manualRespondents: partyInfoType[];
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    appellantNames: string;
    respondentNames: string;
    crossAppealRequired: boolean;
    amending: boolean;
    judgeName: string;
    orderDate: string;        
    authorizedName: string;
    crossAppealingParties: string[];
    partOfOrderCrossAppealed?:string;
    seekingOrder?:string;
    partOfOrderLeaveCrossAppealed?: string;
    groundsLeaveCrossAppeal?: string;    
    phoneNumbers: partiesContact[];
    emailAdresses: partiesContact[];
    addresses: partiesContact[]; 
    phones: string;
    emails: string;
    contactAddress: string;   
    completionDate?: string;
    version?: string;
}

export interface partyInfoType {
    name?: string;
    firstName?: string;
    lastName?: string;
    organization?: boolean; 
}