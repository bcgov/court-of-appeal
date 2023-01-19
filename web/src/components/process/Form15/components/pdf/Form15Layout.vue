<template>
    <div>

        <div>
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        </div> 

        <div class="my-0">
            <div class="text-right" >Court of Appeal File No. <b class="ml-3" style="text-transform: uppercase">{{result.formSevenNumber}}</b></div>       
        </div>

<!-- <BETWEEN> -->
        <div class="mb-3 mx-0 row" style="font-weight: 700;">
            <div style="width:11%;">
                BETWEEN: 
            </div>
        </div>
        <div class="my-3 mx-0 row" style="font-weight: 700;">
            <div style="width:11%;"/>
            <div style="width:78%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{applicantNamesFull}}</div>
            </div>
            <div style="width:11%;" class="text-center">Appellant<span v-if="applicantNames.length>1" >s</span></div>
        </div>

<!-- <AND> -->
        <div class="my-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;">
                AND: 
            </div>
        </div>
        <div class="mt-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;" />                
            <div style="width:76%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{respondentNamesFull}}</div>
            </div>
            <div style="width:13%;" class="text-center"> Respondent<span v-if="respondentNames.length>1" >s</span></div>
        </div>  

<!-- <BEFORE THE HONOURABLE> -->
        <div class="my-4 mx-0 row">
            <div>
                <b>BEFORE THE HONOURABLE</b>
            </div>
        </div>

<!-- <IN CHAMBERS:> -->
        <div class="mb-2 mt-4 mx-0 row" style="font-weight: 600;">
            <div>
                IN CHAMBERS: 
            </div>
        </div>

<!-- <ON APPLICATION> -->
        <div class="my-2 ml-5 row">
            <div>
                ON application of {{applyingParties}} 
                 herein; AND BY CONSENT; 
            </div>
        </div>

<!-- <ORDERS> -->
        <div class="my-2 ml-5 row">
            <div>
                IT IS ORDERED that {{result.orders}}
            </div>
        </div>


<!-- <FURTHER ORDERS> -->
        <div v-if="result.otherOrders" class="my-2 ml-5 row">
            <div>
                IT IS FURTHER ORDERED that {{result.additionalOrders}}
            </div>
        </div>

<!-- <APPROVED> -->
        <div class="mb-3 mt-5 mx-0 row">
            <div  style="width:50%;">APPROVED AS TO FORM:</div>           
        </div>

<!-- <Parties Signature> -->
        <div  class="m-0 row print-block" v-for="party,inx in signingPartyList" :key="'party-sign-'+inx">
            <div style="width:50%;">
                <div style="height:3rem;" />                               
                <div style="border-top:1px dashed grey; width:94%; " > 
                    {{party.name}} 
                    <span v-if="party.responding">, Respondent</span>
                    <span v-else>, Appellant</span>
                </div>                               
            </div>
                        
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form15";
const form15State = namespace("Form15");

import { form15DataInfoType, form15PartiesInfoType } from '@/types/Information/Form15';
import {getPartyTitles} from '../PartyTitlesForm15'


@Component
export default class Form15Layout extends Vue {

    @Prop({required:true})
    result!: form15DataInfoType; 

    @form15State.Action
    public UpdateForm15Info!: (newForm15Info: form15DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';    
    applyingParties = '';
    signingParties='';

    signingPartyList =[]    

    mounted(){
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){        
       
        this.applicantNames = [];
        this.respondentNames = [];        

        for (const resInx in this.result.respondents){
            const fullTitle = getPartyTitles(this.result.respondents[resInx],' ')
            this.respondentNames.push(fullTitle);
        }
        this.respondentNamesFull = this.combineNames(this.result.respondents, '', this.respondentNames)
      

        for (const appInx in this.result.appellants){
            const fullTitle = getPartyTitles(this.result.appellants[appInx],' ')
            this.applicantNames.push(fullTitle);            
        }
        this.applicantNamesFull = this.combineNames(this.result.appellants, '', this.applicantNames)

        this.extractFilingParties();
        this.extractSigningParties();        
    }  

    public extractSigningParties(){
        
        const signingAppellants = this.result.signingParties.filter(party=> !party.responding)
        const signingRespondents = this.result.signingParties.filter(party=> party.responding)       

        this.extractSigningPartyList(signingAppellants, signingRespondents)
       
    }

    public extractFilingParties(){
        
        const applyingAppellants = this.result.filingParties.filter(party=> !party.responding)
        const applyingRespondents = this.result.filingParties.filter(party=> party.responding)
                     
        const appellantnames = this.combineNames(applyingAppellants, 'name', null, ', the appellant')            
        const respondentnames = this.combineNames(applyingRespondents, 'name', null, ', the respondent')         

        this.applyingParties += appellantnames
        this.applyingParties += (appellantnames && respondentnames)?' and ':''
        this.applyingParties += respondentnames 
    }

    public extractSigningPartyList(appearingAppellants, appearingRespondents){
        const allParties: form15PartiesInfoType[] = [...appearingAppellants, ...appearingRespondents]        
        this.signingPartyList =[]
        for(const party of allParties){
            if(!party.isCounsel){
                const sameParty = allParties.filter(par => {
                    return(
                        (par.organization && par.isOrganization && par.organization==party.organization) ||
                        (par.firstName && par.lastName && par.firstName == party.firstName && par.lastName == party.lastName)
                    )
                })
                if(sameParty.length==1) this.signingPartyList.push(party)
            }else{
                this.signingPartyList.push(party)
            }
        }
    }
    
    public combineNames(names, nameField?, addingNameArray?, role?){
        let namesString = ''
        
        const numberOfNames = names.length       
        for(const index in names){
            
            let addingName = ''
            const partyRole = role?role: ''            

            if(addingNameArray?.length>0){
                addingName = addingNameArray[index] + partyRole
            }
            else if(nameField)
                addingName = names[index][nameField] + partyRole
            else
                addingName = names[index] + partyRole

            if(Number(index)>0 && Number(index)+1 == numberOfNames)
                namesString += ' and '+addingName
            else if(Number(index)==0)
                namesString += addingName
            else
                namesString += ', '+addingName
        }
        return namesString
    }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>