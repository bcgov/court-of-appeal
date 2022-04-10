import { form4DataInfoType } from "@/types/Information/Form4";


export function GetForm4PdfType(result: form4DataInfoType){
    if(result.abandonType=="Appeal")
        return "ABA"
    else if(result.abandonType=="Cross Appeal")
        return "ABCA"
    else
        return "ABA"
}