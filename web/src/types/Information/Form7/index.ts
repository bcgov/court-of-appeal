import { hearingLocationsInfoType, locationsInfoType } from "@/types/Common";
import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form7FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form7DataInfoType;
    description: string;
}

export interface form7StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form7SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form7DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    firstAppellant: string;
    firstRespondent: string;       
    authorizedName: string;
    filingParties: string[];
    hearingLocation: hearingLocationsInfoType;
    hearingDate: string;
    hearingTime: string;    
    affidavits: string;
    filedMaterial: boolean;
    materialList: string;   
    completionDate?: string;
    version?: string;
}
