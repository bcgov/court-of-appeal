import { partyInfoType } from "../Form3";
import { partyJsonDataType } from "../json";

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

export interface document_typeInfoType{
    fileName: string[];
    type: string;
    typeName: string;
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
    appellants: partyJsonDataType[];
    respondents: partyJsonDataType[];
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
    doc_type: document_typeInfoType [];
}


export interface partiesFormInfoType {
    appellants: partyJsonDataType[], 
    respondents: partyJsonDataType[], 
    interveners: partyJsonDataType[]
} 
    
export interface partiesStateInfoType {
    appellants:boolean|null, 
    respondents:boolean|null, 
    interveners: boolean|null
}