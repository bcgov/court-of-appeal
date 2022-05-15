import { form1PartiesInfoType, lookupsInfoType } from "@/types/Information/Form1";
import store from "@/store";

export function getPartyTitles(partyInfo: form1PartiesInfoType, divider:string, roleAtEnd:boolean){
    
    const lookups: lookupsInfoType = store.state.Common.lookups;    
        
    let title  = (!roleAtEnd? partyInfo.lowerCourtRole + divider :'') + partyInfo.fullName;
    
    if (partyInfo.legalReps.length > 0 || partyInfo.aliases.length > 0){

        const repTitle = [];
        for (const legalRep of partyInfo.legalReps){                
            const repFormat = lookups.legalRepFormatters[legalRep.repType].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
            repTitle.push(repFormat);
        }
        
        const aliasTitle = [];
        for (const alias of partyInfo.aliases){                    
            aliasTitle.push(alias.nameType + ' ' + alias.name);
        }
       
        const repText = repTitle.length?repTitle.join(divider+' or '): '';
        const aliasText = aliasTitle.length?aliasTitle.join(divider): '';            
        title += divider + (repText?(repText + divider):'') + aliasText;
    }
    if(roleAtEnd) title += divider+ '('+ partyInfo.lowerCourtRole+')'

    return title;
}  


export function getFullName(partyInfo: form1PartiesInfoType){
    
    let fullName =''
    if (partyInfo.isOrganization){                
        fullName = partyInfo.organizationName;
    } 
    else {                
        fullName =                    
            partyInfo.firstGivenName + 
            (partyInfo.secondGivenName? ' ' + partyInfo.secondGivenName:'') +
            (partyInfo.thirdGivenName? ' ' + partyInfo.thirdGivenName:'')+
            ' ' +partyInfo.surname 
    }
    return fullName
}