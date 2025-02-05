import { partyInfoType } from "../Form3";
import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form22FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form22DataInfoType;
    description: string;
}

export interface form22StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form22SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form22DataInfoType {
    formSevenNumber?:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    appellantNames: string;
    respondentNames: string;
    requiresManualEntry: boolean;
    manualAppellants: partyInfoType[];
    manualRespondents: partyInfoType[];
    firstAppellant: string;
    firstRespondent: string;        
    authorizedName: string;
    applyingParties: string[];   
    orders: string;
    grounds: string;
    income: number;
    incomeValue1?:string;
    incomeValue2?:string;
    assetsValue?:string;
    assets: boolean;
    finances?: string;
    completionDate?: string;
    version?: string;
}