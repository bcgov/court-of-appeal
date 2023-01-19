import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form9FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form9DataInfoType;
    description: string;
}

export interface form9StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form9SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form9DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;
    filingRequisitionParties: string[];
    requisitionType: string;
    reliefSought: string;     
    authorizedName: string;    
    selfRepresented?: boolean;    
    completionDate?: string;
    version?: string;
}
