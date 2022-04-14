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
    originalJudgeNames: string[];
    originalJudgementLocation: string;
    originalJudgementDate: string;
    hearingLocation: string;     
    hearingDate: string;
    filingParties: string[];
    judgeName: string;
    appearingParties: string[];
    orderAllowed: boolean;
    furtherOrders: string;
    completionDate?: string;
    version?: string;
}
