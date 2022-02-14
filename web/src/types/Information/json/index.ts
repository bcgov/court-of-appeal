import { aliasInfoType, representativeInfoType } from "../Form7";

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
    packageNumber?: string;
    pdf_types: string;
    data: caseDataJsonDataType;
    description: string;
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
    firstName?: string;
    lastName?: string;
    organization?: string;
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
    firstName?: string;
    lastName?: string;
    organization?: string;
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

export interface supremeCourtCaseJsonDataInfoType {    
    fileId: number;
    fileNumber: string;
    styleOfCause: string;
    courtClassCd: string;
    courtClass: string;
    accessType: string;
    orders?: supremeCourtOrdersJsonInfoType[];
    parties: supremeCourtPartiesJsonInfoType[];    
}

export interface supremeCourtOrdersJsonInfoType {
    documentId: number;
    documentTypeCode: string;
    documentType: string;
    orderDate: string;
    honorificTitle: string;
    judgeFirstName: string;
    judgeSurname: string;
    judgeDisplayName?: string;
    appearanceDays: number;
    canAccess: boolean;
    appealSubmissionDeadline: string;
    isPastDeadline: boolean;
}

export interface supremeCourtPartiesJsonInfoType {
    ceisPartyId: number;
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
}

export interface initiatingDocumentJsonInfoType {
    DateFiled?: string;
    Name?: string;
}

export interface previousCourtJsonInfoType {
    AppealFrom?: string;
    BoardTribunalName?: string;
    Charge?: string;
    ConvictionAcquittalDate?: string;
    FileNumber?: string;
    JudgeFirstName?: string;
    JudgeLastName?: string;
    JudgeSalutation?: string;
    JudgmentDate?: string;
    Jury?: boolean;
    Level?: string;
    Location?: string;
    LocationID?: number;
    Sentence?: string;
    SentenceDate?: string;
}

