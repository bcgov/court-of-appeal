
export interface journeyJsonDataType {
    id: number;
    type: string;
    state: string;
    userid: number;
    ca_number?: string;
    steps: string;
            
}

export interface caseJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    pdf_types: string;
    data: caseDataJsonDataType;
}

export interface caseDataJsonDataType {
    formSevenNumber: string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    useServiceEmail:boolean;
    sendNotifications:boolean;
    serviceInformation: serviceInformationJsonDataType;
    selfRepresented:boolean;
    version: string;
}

export interface applicantJsonDataType {
    name: string;
    firstName: string;
    lastName: string;
    solicitor: solicitorJsonDataType;
    partyId: number;
    id?: number;
}

export interface solicitorJsonDataType {
    name: string;
    counselFirstName: string;
    counselLastName: string;
    firmName: string;
    firmPhone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    province: string;    
}

export interface respondentsJsonDataType {
    name: string;
    firstName: string;
    lastName: string;
    solicitor: solicitorJsonDataType;
    partyId: number;
    id?: number;
    responding?: boolean;
}

export interface serviceInformationJsonDataType {
    province: string;
    country: string;
    selectedContactId: number;
    name?: string;
    counselFirstName?: string;
    counselLastName?: string;
    firmName?: string;
    firmPhone?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    phone?: string;
    email?: string;
}

export interface partiesDataJsonDataType {
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
}