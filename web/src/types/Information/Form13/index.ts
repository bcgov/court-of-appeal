import { applicantJsonDataType} from "../json"


export interface form13FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form13DataInfoType;
    description: string;
}

export interface form13StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form13SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form13DataInfoType {
    formSevenNumber:string;
    appellants: form13PartiesInfoType[];
    respondents: form13PartiesInfoType[];   
    appellantNames: string;
    respondentNames: string;
    orderDate: string;
    filingParties: form13PartiesInfoType[];
    seekingExtension: string[]; 
    seekingExtensionOther: string; 
    extensionDate: string;  
    completionDate?: string;
    version?: string;
}

export interface applicationForInfoType{
    name: string;
    other: string;
}

export interface judgeInfoType {   
    name: string;
    other: string;
    text: string;
}

export interface form13PartiesInfoType extends applicantJsonDataType{    
    isOrganization?: boolean;
    responding?: boolean;
    title?: string;
    counselName?: string;
    aliases?: aliasInfoType[];
    legalReps?: representativeInfoType[]; 
    isCounsel?: boolean;      
} 

export interface aliasInfoType {
    nameType: string;
    name: string;
}

export interface representativeInfoType {
    repType: string;
    name: string;
}

export interface form13PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
