import { form7DataInfoType } from "@/types/Information/Form7";


export function GetForm7PdfType(result: form7DataInfoType){
    if(result.materialList=="Appeal")
        return "ABA"
    else if(result.materialList=="Cross Appeal")
        return "ABCA"
    else
        return "ABA"
}