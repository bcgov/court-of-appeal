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

export interface supportingDocumentInfoType {
    fileName: string;
    file: File;
    documentType: string;
}