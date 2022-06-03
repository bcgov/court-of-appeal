import { partyInfoType } from "../Form3";
import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface manualFormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: manualFormDataInfoType;
    description: string;
}

export interface manualFormStatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface manualFormSearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface manualFormDataInfoType {
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
    assets: boolean;
    finances?: string;
    completionDate?: string;
    version?: string;
}