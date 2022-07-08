import { form9DataInfoType } from "@/types/Information/Form9";

export function GetForm9PdfType(result: form9DataInfoType){
    if(result.requisitionType=="Adjourn a hearing")
        return "REQ"
    else if(result.requisitionType=="Reset a hearing")
        return "REQ"
    else
        return "REQ"
}