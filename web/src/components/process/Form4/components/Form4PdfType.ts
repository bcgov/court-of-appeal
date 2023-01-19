import { form4DataInfoType } from "@/types/Information/Form4";

export function GetForm4PdfType(result: form4DataInfoType){

    let pdfType = "NCA"; 
    if (result.jurisdictionType == "The Court (3 Judges)"){
        pdfType = "APDG";
        if(result.orderList.includes("adducing fresh or new evidence"))
            pdfType = "APDF";
        else if(result.orderList.includes("quashing an appeal or raising a preliminary objection"))
            pdfType = "APDQ";
        if(result.orderList.includes("adducing fresh or new evidence") && result.orderList.includes("quashing an appeal or raising a preliminary objection"))
            pdfType = "APDG";

    } else if (result.jurisdictionType == "A Chambers Judge"){
        pdfType = "APCG";
        if(result.orderList.includes("leave to appeal"))
            pdfType = "APCL";
        else if(result.orderList.includes("stay of proceedings or execution"))
            pdfType = "APCS";        
        if(result.orderList.includes("leave to appeal") && 
            result.orderList.includes("stay of proceedings or execution"))
            pdfType = "APCA";
        else if(result.orderList.includes("payment of security"))
            pdfType = "APCP";
        else if(result.orderList.includes("intervener status"))
            pdfType = "APCI";        
        if(result.orderList.includes("leave to appeal") && 
            result.orderList.includes("stay of proceedings or execution") && 
            result.orderList.includes("payment of security") && 
            result.orderList.includes("intervener status"))
            pdfType = "APCG";

    } else {
        pdfType = "APRG";
        if(result.orderList.includes("assessment"))
            pdfType = "APRA";
        else if(result.orderList.includes("settle order"))
            pdfType = "APRO";
        else if(result.orderList.includes("settle order and assessment"))
            pdfType = "APRS";
        else if(result.orderList.includes("settle contents of books"))
            pdfType = "APSB";        
        if(result.orderList.includes("assessment") && 
            result.orderList.includes("settle order") && 
            result.orderList.includes("settle order and assessment") && 
            result.orderList.includes("settle contents of books"))
            pdfType = "APRG";

    }   
    
    
    
    return pdfType;
    
    

    
        
}