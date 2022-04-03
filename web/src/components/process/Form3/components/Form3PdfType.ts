import { form3DataInfoType } from "@/types/Information/Form3";


export function GetForm3PdfType(result: form3DataInfoType){
    // if(result.abandonType=="Appeal")
    //     return "NCAA"
    // else if(result.abandonType=="Cross Appeal")
    //     return "NCAL"
    // else
        return "NCA"
}