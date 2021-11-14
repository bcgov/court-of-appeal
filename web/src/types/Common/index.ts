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

export interface supremeCourtLocationsInfoType {
    key: number;
    value: string;   
}