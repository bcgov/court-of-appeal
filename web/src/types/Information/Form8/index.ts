import { applicantJsonDataType, chambersHearingJsonInfoType, respondentsJsonDataType } from "../json";

export interface form8FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form8DataInfoType;
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

export interface form8StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form8SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form8DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    order?: chambersHearingJsonInfoType;
    respondentNames: string;
    appellantNames: string;
    judgeName: string;
    judgeNameOther?: string;
    judgeNameValidated: Boolean;
    judgeNameExists: Boolean;
    orderDate: string;   
    orderDateValidated: Boolean; 
    orderDateExists: Boolean;
    filingParties: string[];  
    authorizedName: string; 
    completionDate?: string;
    version?: string;
}
