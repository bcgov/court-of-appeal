import { applicantJsonDataType} from "../json"

export interface form15FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form15DataInfoType;
    description: string;
}

export interface form15StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form15SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form15DataInfoType {
    formSevenNumber:string;
    appellants: form15PartiesInfoType[];
    respondents: form15PartiesInfoType[];   
    appellantNames: string;
    respondentNames: string;
    orderDate: string;
    seekingRemoved: string[];   
    signingParties: form15PartiesInfoType[];
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

export interface form15PartiesInfoType extends applicantJsonDataType{    
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

export interface form15PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
