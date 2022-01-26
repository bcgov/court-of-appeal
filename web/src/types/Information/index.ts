import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from "./json";

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

export interface documentInfoType {
    isChecked: boolean; 
    pdf_types: string;
    fileNumber: number; 
    caseNumber: string;
    parties: string; 
    appNames: string; 
    resNames: string; 
    status: string;
    modifiedDate: string;
    packageNum: string;
    packageUrl: string;
    description: string[];
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

export interface form7SubmissionDataInfoType {
    selfRepresenting: boolean;//
    parties: form7PartiesInfoType[];
    manualSop?: manualSopInfoType[];  //
    readOnlyUsers: number[];
    readWriteUsers: number[];
    lowerCourtLevelCd: string;//
    lowerCourtLevelName: string;//
    lowerCourtClassCd: string;//
    lowerCourtClassName: string;//
    lowerCourtFileNo: string;//
    lowerCourtRegistryId: string;//
    lowerCourtRegistryName: string;//
    lowerCourtStyleOfCause: string;//  
    lowerCourtInitiatingDocument: string;//    
    appealSubmissionDeadline: string;//
    isPastDeadline?: boolean;
    id?: string;    
    ceisFileId: number;//
    nameOfJudge: string; //
    honorificTitle: string;//
    dateOfJudgement: string;//
    trialDurationDays: string; // 
    protectionOrder: boolean;
    handTypedNoSearch: boolean;
    appealingFirm: string;//
    appealingFirmAddress: string;//
    toRespondents: string; //
    respondentSolicitor: string;//
    wasSupremeAppeal: boolean; //
    appealFrom: string; //
    decisionMaker?: string;//    
    refOptional?: string; // 
    involves: string; //
    partOfJudgment?: string;//
    electronicallyFiled: string; //    
    orderSought: string; //
    
    judgeFullName: string;
    respondents: form7PartiesInfoType[];    
    appellants: form7PartiesInfoType[];
    
}

export interface form7StatesInfoType {
    appearanceDays: null | boolean;
    respondents: null | boolean;
    appellants: null | boolean;
    appealFrom: null | boolean;
    wasSupremeAppeal: null | boolean;
    decisionMaker: null | boolean;
    involves: null | boolean;
    partOfJudgment: null | boolean;
    orderSought: null | boolean;
    mainAppellant: null | boolean;
    serviceAddress: null | boolean;
    validServiceAddress: null | boolean;
    referenceNumber: null | boolean;
}

export interface form7PartiesInfoType {
    ceisPartyId?: number;
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
    appealRole?: string;   
    title?: string; 
} 

export interface form7PartiesStatesInfoType {
    firstGivenName: null | boolean;
    surname: null | boolean;
    organizationName: null | boolean;
    counselName: null | boolean;
    lowerCourtRole: null | boolean;
}   

export interface manualSopInfoType {
    conjunction?: string;
    partyName: string;
    lowerCourtRole: string;
    appealRole?: string;   
    plural?: boolean;    
} 

export interface aliasInfoType {
    nameType: string;
    name: string;
}

export interface representativeInfoType {
    repType: string;
    name: string;
}

export interface packageInfoType {
    packageNumber: string;
    fileNumber: string;
    eFilingUrl: string;
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