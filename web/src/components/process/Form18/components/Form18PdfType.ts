import { form18DataInfoType } from "@/types/Information/Form18";


export function GetForm18PdfType(result: form18DataInfoType){

    if(result.changeRepresentation==false)
        return "CNAC"   
    else
        return "CNAT"
}