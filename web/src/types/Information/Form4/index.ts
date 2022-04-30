import { hearingLocationsInfoType, locationsInfoType } from "@/types/Common";
import { applicantJsonDataType, respondentsJsonDataType } from "../json";

export interface form4FormsJsonDataType {
    id: number;
    personId: number;
    type: string;
    status: string;
    modified: string;
    archive: boolean;
    packageUrl?: string;
    packageNumber?: string;
    pdf_types: string;
    data: form4DataInfoType;
    description: string;
}

export interface form4StatusInfoType {
    first?: boolean;
    second?: boolean;
    third?: boolean;
    thirdError?: boolean;
}

export interface form4SearchInfoType {
    file: string;
    lastName: string;
    firstName: string;
    organizationName?: string;
    searchBy: string;
}

export interface form4DataInfoType {
    formSevenNumber:string;
    appellants: applicantJsonDataType[];
    respondents: respondentsJsonDataType[];
    appellantNames: string;
    respondentNames: string;
    jurisdictionType: string;
    applicantParties: string[];
    respondentParties: string[];
    hearingLocation: hearingLocationsInfoType;
    hearingDate: string;
    estimatedDuration: string;
    relyingSectionRule: string[];
    otherRelyingSectionRule: string;
    lawyerRelyingSectionRule: string;
    seekingOrder: string;    
    bookRequired: boolean;
    affidavitList: affidavitInfoType[];
    applicationContested: boolean;
    acknowledgeEmailService: boolean;
    emailAddresses?: string;    
    selfRepresented?: boolean;    
    authorizedName: string;
    completionDate?: string;
    version?: string;
}

export interface affidavitInfoType {
    name: string;
    date: string;
}