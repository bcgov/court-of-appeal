
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