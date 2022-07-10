import { form4DataInfoType } from "@/types/Information/Form4";

export function GetForm4PdfType(result: form4DataInfoType){
    if(result.orderList.includes("leave to appeal"))
        return "MCH"
    else 
        return "MCT"
    

    
        
}