import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "./json"

export interface pathwayTypeInfoType {
    hasRightToAppeal?: boolean;
    noRightToAppeal?: boolean;
    noticeOfAppealResponse?: boolean;
    noticeOfApplicationResponse?: boolean;
}

export interface form2StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
}

export interface form2SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form2DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    useServiceEmail: boolean;
    sendNotifications: boolean;
    serviceInformation: serviceInformationJsonDataType;
    selfRepresented?: boolean;
    version?: string;
}

export interface journeyStepType {
    noticeOfHearing?: boolean;
    bookAppealDate?: boolean;
    initialDocumentsNoticeOfAppeal?: boolean;
    initialDocumentsNoticeOfApplicationForLeaveToAppeal?: boolean;
    appealRecordAndTranscript?: boolean;
    factumAppealBookAndCertificateOfReadiness?: boolean;
    theHearing?: boolean;
    courtOrder?: boolean;
    appealProcessComplete?: boolean;
    hearingDocumentsMotion?: boolean;
    decisionOnLeaveToAppeal?: boolean;
    noticeOfAppearance?: boolean;
    hearingDocumentsReplyBook?: boolean;
    crossAppeal?: boolean;
    factumAndAppealBook?: boolean;    
}