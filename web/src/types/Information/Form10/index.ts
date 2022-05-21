import { hearingLocationsInfoType } from "@/types/Common";
import { applicantJsonDataType, previousCourtJsonInfoType} from "../json"


export interface form10FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form10DataInfoType;
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

export interface form10StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form10SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form10DataInfoType {
    formSevenNumber:string;
    appellants: form10PartiesInfoType[];
    respondents: form10PartiesInfoType[];
    requiresManualEntry: boolean;
    appellantNames: string;
    respondentNames: string;
    judgeNames: judgeInfoType[]; 
    hearingLocation: hearingLocationsInfoType;   
    dateOfJudgement: string;
    applyingParties: form10PartiesInfoType[]; 
    varyingOrderJudgeName: string;
    varyingOrderJudgeNameOther: string
    varyingOrderDate: string;
    filingParties: form10PartiesInfoType[];
    appearingParties: form10PartiesInfoType[];
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

export interface form10PartiesInfoType extends applicantJsonDataType{    
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

export interface form10PartiesStatesInfoType {
    firstName: null | boolean;
    lastName: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    type: null | boolean;
}
