import { hearingLocationsInfoType } from "@/types/Common";
import { applicantJsonDataType, previousCourtJsonInfoType} from "../json"


export interface form12FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form12DataInfoType;
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

export interface form12StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form12SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form12DataInfoType {
    formSevenNumber:string;
    appellants: form12PartiesInfoType[];
    respondents: form12PartiesInfoType[];
    requiresManualEntry: boolean;
    appellantNames: string;
    respondentNames: string;
    judgeNames: judgeInfoType[]; 
    hearingLocation: hearingLocationsInfoType;   
    dateOfJudgement: string;
    applyingParties: form12PartiesInfoType[]; 
    varyingOrderJudgeName: string;
    varyingOrderJudgeNameOther: string
    varyingOrderDate: string;
    filingParties: form12PartiesInfoType[];
    appearingParties: form12PartiesInfoType[];
    orderAllowed: boolean;
    otherOrders: boolean;
    furtherOrders?: string;
    authorizedName: string;
    completionDate?: string;
    version?: string;
    previousCourts?: previousCourtJsonInfoType;
}

export interface judgeInfoType {   
    name: string;
    other: string;
    text: string;
}

export interface form12PartiesInfoType extends applicantJsonDataType{    
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

export interface form12PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
