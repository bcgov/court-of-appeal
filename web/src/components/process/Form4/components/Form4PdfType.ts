import { form4DataInfoType } from "@/types/Information/Form4";


export function GetForm4PdfType(result: form4DataInfoType){
    if(result.jurisdictionType=="A Chambers Judge")
        return "MCH"
    else if(result.jurisdictionType=="The Court (3 Judges)")
        return "MCT"
    else
        return "MCH"
}