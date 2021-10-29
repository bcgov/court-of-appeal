export interface stepsAndPagesNumberInfoType {
    APP_RIGHT_TO_APPEAL: APP_RIGHT_TO_APPEAL_stPgTypes;
    APP_APPLY_LEAVE: APP_APPLY_LEAVE_stPgTypes;
    APP_LEAVE_GRANTED: APP_LEAVE_GRANTED_stPgTypes;
    APP_LEAVE_REFUSED: APP_LEAVE_REFUSED_stPgTypes;
    APP_LEAVE_GRANTED_FINAL: APP_LEAVE_GRANTED_FINAL_stPgTypes;
    APP_LEAVE_REFUSED_FINAL: APP_LEAVE_REFUSED_FINAL_stPgTypes;
    RSP_TO_APPEAL: RSP_TO_APPEAL_stPgTypes; 
    RSP_TO_LEAVE: RSP_TO_LEAVE_stPgTypes;
    RSP_TO_LEAVE_GRANTED: RSP_TO_LEAVE_GRANTED_stPgTypes;
    RSP_TO_LEAVE_REFUSED_FINAL: RSP_TO_LEAVE_REFUSED_FINAL_stPgTypes;
    RSP_TO_LEAVE_REFUSED: RSP_TO_LEAVE_REFUSED_stPgTypes;
}
 
export interface APP_RIGHT_TO_APPEAL_stPgTypes {
    _StepNo: number;   
    
    InitialDocuments: number;
    AppealRecordAndTranscript: number;
    FactumAppealBookAndCertificateOfReadiness: number;
    BookAppealDateWithRegistry: number;
    NoticeOfHearing: number;
    TheHearing: number;
    CourtOrder: number;
    AppealProcessComplete: number;
}

export interface APP_APPLY_LEAVE_stPgTypes {
    _StepNo: number;
    
    InitialDocuments: number;
    HearingDocuments: number;
    DecisionOnLeaveToAppeal: number; 
}

export interface APP_LEAVE_GRANTED_stPgTypes{
    _StepNo: number;   
    
    AppealRecordAndTranscript: number;
    FactumAppealBookAndCertificateOfReadiness: number;
    BookAppealDateWithRegistry: number;    
    NoticeOfHearing: number;
    TheHearing: number;
    CourtOrder: number;
    AppealProcessComplete: number;
}

export interface APP_LEAVE_REFUSED_stPgTypes{
    _StepNo: number;
    
    ApplicationForReview: number;
    TheHearing: number;   
    FinalDecisionOnLeaveToAppeal: number;
}

export interface APP_LEAVE_GRANTED_FINAL_stPgTypes{
    _StepNo: number;   
}

export interface APP_LEAVE_REFUSED_FINAL_stPgTypes{
    _StepNo: number;
}
  
export interface RSP_TO_APPEAL_stPgTypes {
    _StepNo: number;
    
    NoticeOfAppearance: number;
    NoticeOfCrossAppeal: number;
    FactumAndAppealBook: number;
    TheHearing: number;
    CourtOrder: number;
    AppealProcessComplete: number;
}

export interface RSP_TO_LEAVE_stPgTypes{
    _StepNo: number;
    
    NoticeOfAppearance: number;    
    ReplyBook: number;    
    TheHearing: number;   
    DecisionOnLeaveToAppeal: number;
}

export interface RSP_TO_LEAVE_GRANTED_stPgTypes{
    _StepNo: number;   
    
    NoticeOfAppearance: number;
    FactumAppealBookAndCertificateOfReadiness: number;    
    TheHearing: number;
    CourtOrder: number;
    AppealProcessComplete: number;
}

export interface RSP_TO_LEAVE_REFUSED_FINAL_stPgTypes{
    _StepNo: number;    
}

export interface RSP_TO_LEAVE_REFUSED_stPgTypes{
    _StepNo: number;
    
    ApplicationForReview: number;
    TheHearing: number;   
    FinalDecisionOnLeaveToAppeal: number;
}