export interface locationsInfoType {
    address: string;
    email: string;
    filingLocation: string;
    id: string;
    name: string;
    postalCode: string;
}

export interface  applicationJsonInfoType {
    lastUpdated?: number, 
    lastUpdatedDate?: string, 
    id?: number, 
    app_type?: string, 
    lastFiled?: number, 
    lastFiledDate?: string, 
    packageNum?: string, 
    listOfPdfs?: string[], 
    last_efiling_submission:{
        package_number?: string,
        package_url?: string
    }
};

export interface locationsInfoType {
    id: string;
    name: string; 
    type: string;
    address: string;
    email: string;
    city: string;
    province: string; 
    postalCode: string;
}

export interface hearingLocationsInfoType {    
    name: string;
    address: string;
    postalCode: string;
    other: true;
}

export interface supportingDocumentInfoType {
    fileName: string;
    file: File;
    documentType: string;
}

export interface documentTypesJsonInfoType {
    description: string;
    type: string;
}

export interface dateRangeInfoType {
    startDate: string;
    endDate: string;
}

export interface reportInfoType {
    start_date: string;
    end_date: string;
    users_info: userInfoReportInfoType;
    manual_submission_info: manualSubmissionReportInfoType;
    form1: formReportInfoType;
    form2: formReportInfoType;
    form3: formReportInfoType;
    form4: formReportInfoType;
    form5: formReportInfoType;
    form6: formReportInfoType;
    form7: formReportInfoType;
    form8: formReportInfoType;
    form9: formReportInfoType;
    form10: formReportInfoType;
    form11: formReportInfoType;
    form12: formReportInfoType;
    form13: formReportInfoType;
    form14: formReportInfoType;
    form15: formReportInfoType;
    form16: formReportInfoType;
    form17: formReportInfoType;
    form18: formReportInfoType;
    form19: formReportInfoType;
    form20: formReportInfoType;
    form21: formReportInfoType;
    form22: formReportInfoType;
}

export interface formReportInfoType {
    submitted: number;
    unsuccessful: number;
    completed: number;
    drafted: number;
    started: number;
    total: number;
    users: number;
    top_user: topUserReportInfoType;    
}

export interface topUserReportInfoType {
    submitted: number;
    unsuccessful: number;
    completed: number;
    drafted: number;
    started: number;
    total: number;
    first_name: String;
    last_name: String;
    display_name: String;
}

export interface manualSubmissionTopUserReportInfoType {
    total: number;
    first_name: String;
    last_name: String;
    display_name: String;
    forms: manuallySubmittedFormsReportInfoType[];
}

export interface manualSubmissionReportInfoType {
    total: number;
    users: number;
    top_user: manualSubmissionTopUserReportInfoType;
    forms: manuallySubmittedFormsReportInfoType[];
}

export interface manuallySubmittedFormsReportInfoType {
    form_type: String;
    submitted_count: number;
}

export interface userInfoReportInfoType {
    total: number;
    active_in_period: number;
    joined_in_period: number;
}    