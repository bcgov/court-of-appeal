import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "./json"

export interface pathwayTypeInfoType {
    appApplyLeave?: boolean;
    appLeaveGranted?: boolean;
    appLeaveRefused?: boolean;
    appLeaveRefusedFinal?: boolean;
    appLeaveGrantedFinal?: boolean;
    appRightToAppeal?: boolean;
    rspToAppeal?: boolean;
    rspToLeaveGranted?: boolean;
    rspToLeave?: boolean;
    rspToLeaveRefusedFinal?: boolean;
    rspToLeaveRefused?: boolean;
}

export interface form2StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
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

export interface form7StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    fourth?: boolean;
    fourthError?: boolean;
}

export interface form7SearchInfoType {
    file: string;
    location: string;    
}

export interface form7DataInfoType {
    appearanceDays: number;
    orderType: string;
    appealedInSupremeCourt: string;
    appealNature: string;
    partOfJudgement: string;
    orderSought: string;
    parties: form7PartiesInfoType[];
    respondents: form7PartiesInfoType[];
    appellants: form7PartiesInfoType[];
    serviceAddress: string;
    referenceNumber: string; 
} 

export interface form7PartiesInfoType {
    ceisPartyId: number;
    isOrganization: boolean;
    firstGivenName: string;
    secondGivenName?: string;
    thirdGivenName?: string;
    surname?: string;
    organizationName?: string;
    fullName: string;
    counselName?: string;
    lowerCourtRole: string;
    aliases?: aliasInfoType[];
    legalReps?: representativeInfoType[];
    appealCourtRole?: string;   
    title?: string; 
}  

export interface aliasInfoType {
    type: string;
    name: string;
}

export interface representativeInfoType {
    type: string;
    name: string;
}

export interface packageInfoType {
    packageNumber: string;
    fileNumber: string;
    eFilingUrl: string;
}

export interface lookupsInfoType {
    involvesFamilyList: string[];
    involvesOtherList: string[]; 
    involvesOtherHelp: string[];
    appealFromOptionsList: string[];
    appealFromOptionsHelp: string[];
    lowerCourtRoles: string[];
    aliasTypes: string[]; 
    individualLegalReps: string[];
    organizationLegalReps: string[];
    legalRepFormatters: {};
    holidays: {};
}

export interface journeyStepType {


    appRighttoAppeal? 

    noticeOfHearingHasRight?: boolean;
    bookAppealDateHasRight?: boolean;
    initialDocumentsNoticeOfAppealHasRight?: boolean;
    appealProcessCompleteHasRight?: boolean;
    theHearingStartAppeal?: boolean;



    initialDocumentsNoticeOfApplicationForLeaveToAppeal?: boolean;
    appealRecordAndTranscript?: boolean;
    factumAppealBookAndCertificateOfReadiness?: boolean;
    
    courtOrder?: boolean;
    
    hearingDocumentsMotion?: boolean;
    decisionOnLeaveToAppeal?: boolean;
    noticeOfAppearance?: boolean;
    theHearingRespondToAppeal?: boolean;
    hearingDocumentsReplyBook?: boolean;
    crossAppeal?: boolean;
    factumAndAppealBook?: boolean;    
}