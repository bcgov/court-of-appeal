import { hearingLocationsInfoType } from "@/types/Common";
import { applicantJsonDataType, previousCourtJsonInfoType} from "../json"

export interface form17FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form17DataInfoType;
    description: string;
}

export interface orderInfoDataType {
    AppealFrom?: string;
    BoardTribunalName?: string;
    Charge?: string;
    ConvictionAcquittalDate?: string;
    FileNumber?: string;
    JudgeFirstName?: string;
    JudgeLastName?: string;
    JudgeSalutation?: string;
    JudgmentDate?: string;
    Jury?: boolean;
    Level?: string;
    Location?: string;
    LocationID?: number;
    Sentence?: string;
    SentenceDate?: string;
    JudgeFullName?: string;
}

export interface form17StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form17SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form17DataInfoType {
    formSevenNumber:string;
    appellants: form17PartiesInfoType[];
    respondents: form17PartiesInfoType[];
    appellantNames: string;
    respondentNames: string;
    // judgeNames: judgeInfoType[]; 
    // hearingLocation: hearingLocationsInfoType;   
    // dateOfJudgement: string;
    
    allowedCostsParties: string[];
    payingCostsParties: string[];
    amount: string;
    
    // judgmentReserved: boolean;
    // hearingHeldDate: string;
    
    // reasonsIndicated: boolean;
    // reasonsDate: string;

    // otherOrders: boolean;
    // furtherOrders?: string;

    // applicationFor: applicationForInfoType;
    // ordersJusticeMake: string;

    completionDate?: string;
    version?: string;
    // previousCourts?: previousCourtJsonInfoType;
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

export interface form17PartiesInfoType extends applicantJsonDataType{    
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

export interface form17PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
