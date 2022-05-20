import { lookupsInfoType } from "@/types/Information/Form1";
import store from "@/store";
import { form12PartiesInfoType } from "@/types/Information/Form12";

export function getPartyTitles(partyInfo: form12PartiesInfoType, divider:string){
    
    const lookups: lookupsInfoType = store.state.Common.lookups;    
        
    let title  = '';
    
    if (partyInfo.legalReps?.length > 0){

        const repTitle = [];
        for (const legalRep of partyInfo.legalReps){                
            const repFormat = lookups.legalRepFormatters[legalRep.repType].replace('{0}', legalRep.name).replace('{1}', partyInfo.name);
            repTitle.push(repFormat);
        }
        const repText = repTitle.length?repTitle.join(divider+' or '): '';
        title += (repText?(divider+repText):'');
    }
    else
        title = partyInfo.name;


    if(partyInfo.aliases?.length > 0){

        const aliasTitle = [];
        for (const alias of partyInfo.aliases){                    
            aliasTitle.push(alias.nameType + ' ' + alias.name);
        }
        const aliasText = aliasTitle.length?aliasTitle.join(divider): '';            
        title += divider + aliasText;
    }

    return title;
}  


export function getFullName(partyInfo: form12PartiesInfoType){
    
    let fullName =''
    if (partyInfo.isOrganization){                
        fullName = partyInfo.organization;
    } 
    else {                
        fullName = partyInfo.firstName +' ' +partyInfo.lastName 
    }
    return fullName
}