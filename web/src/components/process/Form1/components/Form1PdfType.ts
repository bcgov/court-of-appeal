import { form1DataInfoType } from "@/types/Information/Form1";


export function GetForm1PdfType(result: form1DataInfoType){

    let pdfType = "NAA";    
    if (result.applyLeave)
        pdfType = "NAID";
    if(result.amending)
        pdfType = "NAAM";
    
    return pdfType;
}