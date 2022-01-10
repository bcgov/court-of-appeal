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

export interface form7DataInfoType {
    fileNumber: string;
    fileId: number;
    courtClass: string;
    judgeFullName: string;
    orderDate: string;
    appealSubmissionDeadline: string;
    appearanceDays: number;
    orderType: string;
    appealedInSupremeCourt: string;
    makerName?: string;
    appealNature: string;
    partOfJudgment: string;
    orderSought: string;
    parties: form7PartiesInfoType[];
    respondents: form7PartiesInfoType[];
    respondentSolicitors?: string[];
    appellants: form7PartiesInfoType[];
    mainAppellant?: string;
    serviceAddress: string;
    referenceNumber: string; 
    manualSop?: manualSopInfoType[];
} 

export interface form7StatesInfoType {
    appearanceDays: null | boolean;
    respondents: null | boolean;
    appellants: null | boolean;
    orderType: null | boolean;
    appealedInSupremeCourt: null | boolean;
    makerName: null | boolean;
    appealNature: null | boolean;
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
    appealCourtRole?: string;   
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
    partyName: string[];
    lowerCourtRole: string;
    appealRole?: string;   
    plural?: boolean;    
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
    involvesOtherList: lookupsGuideInfoType[];
    appealFromOptionsList: lookupsGuideInfoType[];
    lowerCourtRoles: string[];
    aliasTypes: string[];
    individualLegalReps: string[];
    organizationLegalReps: string[];
    legalRepFormatters: legalRepFormattersInfoType;
    holidays: holidayInfoType;
}

export interface lookupsGuideInfoType {
    help: string;
    name: string;
}

export interface legalRepFormattersInfoType {
    administrator: string;
    'administrator (estate)': string;
    administratrix: string;
    'administratrix (estate)': string;
    caveator: string;
    committee: string;
    'committee (estate)': string;
    executor: string;
    executrix: string;
    intervener: string;
    'litigation guardian': string;
    'litigation guardian (child)': string;
    'litigation guardian (disability)': string;
    'litigation guardian (infant)': string;
    'receiver manager': string;
    trustee: string;
}

export interface holidayInfoType {
    'BC Day': string;
    'BC Family Day': string;
    'Boxing Day': string;
    'Canada Day': string;
    'Christmas Day': string;
    'Easter Monday': string;
    'Good Friday': string;
    'Labour Day': string;
    'New Years Day 2022': string;
    'New Years Day 2023': string;
    'Remembrance Day': string;
    'Thanksgiving': string;
    'Truth and Reconciliation Day': string;
    'Victoria Day': string;
}

export interface accountInfoType {
    accountId: number;
    clientId: number;
    firmName: string;
    firmAddress: string;
    accountUsers: accountUserInfoType[];
    extensionData: extensionDataInfoType;
}

export interface accountUserInfoType{
    clientId: number;
    fullName: string;
    isAdmin: boolean;
    displayName?: string;
}

export interface userAccessInfoType{
    user: accountUserInfoType;
    readOnly: boolean;
    update: boolean;
    default: boolean;
}

export interface extensionDataInfoType{
    csoProceedUrl: string;
    logOutUrl: string;
    contactUsUrl: string;
    returnToCsoUrl: string;
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