import { form6DataInfoType } from "@/types/Information/Form6";


export function GetForm6PdfType(result: form6DataInfoType){
    if(result.abandonType=="Appeal")
        return "ABA"
    else if(result.abandonType=="Cross Appeal")
        return "ABCA"
    else
        return "ABA"
}