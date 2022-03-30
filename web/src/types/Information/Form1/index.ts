
export interface form1QualificationInfoType {
    selfRepresenting: boolean;
    appealingProvincialCourtOrder: boolean;
    insideTimeLimit: boolean;
    appealingBankruptcy: boolean;
    appealingFeesWaived: boolean;
    appealingSupremeCourtMaster: boolean;    
    appealingSupremeCourtOrder: boolean;  
    appealingScFlaDivorce: boolean;
    appealInvolvesChild: boolean;
    appealTribunal: boolean;
}

export interface form1StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    fourth?: boolean;
    fourthError?: boolean;
}

export interface form1SearchInfoType {
    file: string;
    location: string;    
}

export interface form1SubmissionDataInfoType {
    selfRepresenting: boolean;
    appealingProvincialCourtOrder: boolean;
    insideTimeLimit: boolean;
    appealingBankruptcy: boolean;
    appealingFeesWaived: boolean;
    appealingSupremeCourtMaster: boolean;    
    appealingSupremeCourtOrder: boolean;  
    appealingScFlaDivorce: boolean;
    appealInvolvesChild: boolean;
    appealTribunal: boolean;
    tribunalType: string;//
    tribunalLocationOfOrder: string;//
    tribunalDateOfOrder: string;//
    tribunalOriginalDecisionMaker: string;//
    parties: form1PartiesInfoType[];
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
    respondents: form1PartiesInfoType[];    
    appellants: form1PartiesInfoType[];
    
}

export interface form1StatesInfoType {
    tribunalType: null | boolean;
    tribunalLocationOfOrder: null | boolean;
    tribunalDateOfOrder: null | boolean;
    tribunalOriginalDecisionMaker: null | boolean;
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

export interface form1PartiesInfoType {
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

export interface form1PartiesStatesInfoType {
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