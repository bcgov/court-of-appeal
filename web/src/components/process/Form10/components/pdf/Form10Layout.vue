<template>
    <div>

        <div>
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        </div> 

        <div class="my-0">
            <div class="text-right" >Court of Appeal File No. <b class="ml-3">{{result.formSevenNumber}}</b></div>       
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
        <div class="my-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;" />                
            <div style="width:76%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{respondentNamesFull}}</div>
            </div>
            <div style="width:13%;" class="text-center"> Respondent<span v-if="respondentNames.length>1" >s</span></div>
        </div>


<!-- <BEFORE> -->
        <div class="mt-5 mb-1 mx-0 row">
            <div>
                <b>BEFORE THE HONOURABLE</b> {{result.judgeNames[0].text}} <b>IN CHAMBERS</b>
            </div>
        </div>        

<!-- <HEARING LOCATION-DATE> -->
        <div class="mb-4 mx-0 row">
            <div>
                {{result.hearingLocation.name}}, British Columbia, {{hearingDate | beautify-date-full}} 
            </div>
        </div>

<!-- <Reasons to Follow> -->
        <div class="mb-4 mx-0 row" v-if="result.reasonsIndicated">
            <div>
                Reasons to follow being released on {{result.reasonsDate | beautify-date-full}}.
            </div>
        </div>
        
<!-- <THE APPEAL> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THE APPLICATION OF</b> {{applyingParties}} for {{applicationType}} coming on
                for hearing on {{result.hearingDate | beautify-date-full-no-weekday}}; <b>AND ON HEARING</b> {{appearingParties}}; 
                <b>AND ON READING</b> the materials filed herein; <b>AND ON JUDGMENT BEING PRONOUNCED ON THIS DATE</b>;
            </div>
        </div>

<!-- <ORDER Make> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>IT IS ORDERED</b> that {{result.ordersJusticeMake}}
            </div>
        </div>

<!-- <FURTHER ORDERS> -->
        <div v-if="result.otherOrders" class="my-3 mx-0 row">
            <div>
                <b>IT IS FURTHER ORDERED</b> that {{result.furtherOrders}}.
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
            <div v-if="inx==0" style="width:50%;">
                <div style="height:3rem;" />
                <div style="border-top:1px dashed grey;">
                    A Justice of the Court of Appeal
                </div>
            </div>            
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import { form10DataInfoType, form10PartiesInfoType } from '@/types/Information/Form10';
import {getPartyTitles, getFullName} from '../PartyTitlesForm10'

@Component
export default class Form10Layout extends Vue {

    @Prop({required:true})
    result!: form10DataInfoType; 

    @form10State.Action
    public UpdateForm10Info!: (newForm10Info: form10DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';
    appearingParties='';
    applyingParties=''

    signingPartyList =[]

    hearingDate = ''
    applicationType = ''


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
        this.respondentNamesFull=this.combineNames(this.result.respondents, '', this.respondentNames);

        for (const appInx in this.result.appellants){
            const fullTitle = getPartyTitles(this.result.appellants[appInx],' ')
            this.applicantNames.push(fullTitle);                        
        }
        this.applicantNamesFull = this.combineNames(this.result.appellants, '', this.applicantNames)
        
         
        this.hearingDate = this.result.judgmentReserved? this.result.judgmentReservedDate : this.result.dateOfJudgement;
        this.extractAppearingParties();
        this.extractApplyingParties();
        this.extractApplicationTypes();
    }

    public extractApplicationTypes(){

        const otherTypeIndex = this.result.applicationFor.findIndex(item =>item=='other')
        if(otherTypeIndex>-1){
            const applicationFor = JSON.parse(JSON.stringify(this.result.applicationFor))
            applicationFor.splice(otherTypeIndex,1)
            applicationFor.push(this.result.applicationForOther)

            this.applicationType = this.combineNames(applicationFor)
        }
        else 
            this.applicationType = this.combineNames(this.result.applicationFor)
    }

    public extractAppearingParties(){

        const appearingAppellants = this.result.appearingParties.filter(party=> !party.responding)
        const appearingRespondents = this.result.appearingParties.filter(party=> party.responding)
                               
        const appellantnames = this.combineNames(appearingAppellants, 'name', null, ', appellant')                   
        const respondentnames = this.combineNames(appearingRespondents, 'name', null, ', respondent')        

        this.extractSigningPartyList(appearingAppellants, appearingRespondents)

        this.appearingParties += appellantnames
        this.appearingParties += (appellantnames && respondentnames)?' and ':''
        this.appearingParties += respondentnames 
        this.appearingParties += (!appellantnames)?  ' and no one appearing on behalf of the appellant(s)':''
        this.appearingParties += (!respondentnames)? ' and no one appearing on behalf of the respondent(s)':''
    }

    public extractSigningPartyList(appearingAppellants, appearingRespondents){
        const allParties: form10PartiesInfoType[] = [...appearingAppellants, ...appearingRespondents]        
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

    public extractApplyingParties(){
        
        const applyingAppellants = this.result.filingParties.filter(party=> !party.responding)
        const applyingRespondents = this.result.filingParties.filter(party=> party.responding)
                     
        const appellantnames = this.combineNames(applyingAppellants, 'name')            
        const respondentnames = this.combineNames(applyingRespondents, 'name')        

        this.applyingParties += appellantnames
        this.applyingParties += (appellantnames && respondentnames)?' and ':''
        this.applyingParties += respondentnames
    }
    
    public combineNames(names, nameField?, addingNameArray?, role?){
        let namesString = ''
        
        const numberOfNames = names.length       
        for(const index in names){
            
            let addingName = ''
            const partyRole = role? (role+  
                (!names[index].isCounsel && !names[index].isOrganization?', appearing in person':'')) 
            : ''            

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