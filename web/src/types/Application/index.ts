
//This is what our database saves.
export interface applicationStepOnlyInfoType {
  steps: stepInfoType[];
  types_version?: "1.2.2";
}

export interface applicationInfoType extends applicationStepOnlyInfoType {   
    id?: string;
    types: string[];
    lastUpdate?: Date | null;
    currentStep?: number | string;
    allCompleted: boolean;
    lastPrinted: Date;
    applicantName: string;
    respondentName: string;
    applicationLocation: string;
    version: string;
}

export interface stepInfoType {
  id?: string;
  name?: string;
  label: string;
  type: string;
  result?: resultInfoType;    
  pages?: pageInfoType[];
  currentPage?: number | string;
  active: boolean;
}

export interface pageInfoType {
  key: string;
  name?: string;
  label: string;
  progress: number;
  active: boolean;
  clickable?: boolean;
}

export interface stepResultInfoType {
  step: stepInfoType;
  data: any;
}

export interface resultInfoType{
  //______Step 0
  selectedForms?: string[];    
}





