import { hearingLocationsInfoType } from "@/types/Common";
import { applicantJsonDataType, previousCourtJsonInfoType} from "../json"


export interface form11FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form11DataInfoType;
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

export interface form11StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form11SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form11DataInfoType {
    formSevenNumber:string;
    appellants: form11PartiesInfoType[];
    respondents: form11PartiesInfoType[];
    requiresManualEntry: boolean;
    appellantNames: string;
    respondentNames: string;
    judgeNames: judgeInfoType[]; 
    hearingLocation: hearingLocationsInfoType;   
    dateOfJudgement: string;
    varyingOrderJudgeName: string;    
    varyingOrderDate: string;
    varyingOrderLocation: string;
    filingParties: form11PartiesInfoType[];
    appearingParties: form11PartiesInfoType[];
    orderAllowed: boolean;
    otherOrders: boolean;
    furtherOrders?: string;
    judgmentReserved: boolean;
    judgmentReservedDate: string;
    laterDateDecided: boolean;
    laterDate: string;
    supplementaryReasons: boolean;
    supplementaryReasonsDate: string;  
    completionDate?: string;
    version?: string;
    hearingDate: string;
    previousCourts?: previousCourtJsonInfoType;
    ordersCourtMade: string;
    orderedAwardingCosts: boolean;
    successfulParties: form11PartiesInfoType[];
    unsuccessfulParties: form11PartiesInfoType[];
}

export interface judgeInfoType {   
    name: string;
    other: string;
    text: string;
}

export interface form11PartiesInfoType extends applicantJsonDataType{    
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

export interface form11PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
