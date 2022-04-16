import { form3DataInfoType } from "@/types/Information/Form3";


export function GetForm3PdfType(result: form3DataInfoType){

    let pdfType = "NCA";
    if(result.amending)
        pdfType = "NCAA";
    if(result.crossAppealRequired)
        pdfType = "NCAL";
    
    return pdfType;
}