import { Question } from "survey-vue";

export interface AdvancedRadioGroupQuestion extends Question {
    inputNames?: string;
    inputTypes?: string;
    inputWidths?: string;
    otherText?: string;
    radioOutputValues?: string;
    radioTextMargins?: string;
    radioMargins?: string;
    textBeforeInputs?: string;
    textClass?: string;
}

export interface ContactInfoQuestion extends Question {
    descEmail?: string;
    descPhone?: string;
    labelEmail?: string;
    labelPhone?: string;
}

export interface CustomButtonQuestion extends Question {
    buttonText?: string;
    textClass?: string;
}

export interface CustomDateTimeQuestion extends Question {
    choices?: any[]
    dateYearsAhead?: number;
    dateYearsBehind?: number;
}

export interface InfoTextQuestion extends Question {
    
}

export interface MultipleCommentCheckboxQuestion extends Question {
    choices?: any[]
    textClass?: string;
}

export interface MultipleTextInputQuestion extends Question {
    inputNames?: string;
    inputTypes?: string;
    inputWidths?: string;
    textBeforeInputs?: string;
    textClass?: string;
}

export interface TextBeforeInputNumberQuestion extends Question {
    bodyText?: string;
    inputWidth?: string;
    textClass?: string;
}