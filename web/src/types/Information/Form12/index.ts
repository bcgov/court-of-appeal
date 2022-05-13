import { partyInfoType } from "../Form3";
import { applicantJsonDataType, respondentsJsonDataType } from "../json"


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
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    requiresManualEntry: boolean;
    manualAppellants: partyInfoType[];
    manualRespondents: partyInfoType[];
    originalJudgeNames: string[]; 
    hearingLocation: string;    //2 
    dateOfJudgement: string;//3
    applyingParties: string[]; //4   
    judgeName: string;//5
    hearingDate: string;//6
    filingParties: string[];//7
    appearingParties: string[];//8
    orderAllowed: boolean;
    furtherOrders: string;
    completionDate?: string;
    version?: string;
}
