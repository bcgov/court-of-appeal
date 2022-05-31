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

<!-- <ORDER-DATE> -->
        <div class="mt-4 mb-4 mx-0 row">
            <div>
                {{result.orderDate | beautify-date-full}} 
            </div>
        </div>

<!-- <WHEREAS:> -->
        <div class="mb-2 mt-2 mx-0 row" style="font-weight: 600;">
            <div>
                WHEREAS: 
            </div>
        </div>
        
<!-- <Description> -->
        <div class="my-2 ml-5 mr-0">
            <div class="mb-2 row">
                (a) all parties have consented to this order,
            </div>
            <div class="my-2 row">    
                (b) no person involved is under any legal disability, and 
            </div>
            <div class="my-2 row">    
                (c) all parties have agreed to comply hereafter with the 
                time limits set forth in the Court of Appeal Act and Court of
                Appeal Rules, 
            </div>
        </div>

<!-- <ORDERED> -->
        <div class="my-2 mx-0 row">
            <div>
                <b>IT IS ORDERED</b> that this {{result.seekingRemoved.join(', ')}} 
                be removed from the inactive list and that the time limit for taking 
                the next step required by the Court of Appeal Act or Court 
                of Appeal Rules must begin to run as of the date of this order.
            </div>
        </div>

<!-- <FURTHER ORDERS> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>IT IS FURTHER ORDERED</b> that the notice of hearing be filed 
                within 180 days of the date of this order, failing which the 
                {{result.seekingRemoved.join(', ')}} must be returned to the inactive list.
            </div>
        </div>

<!-- <APPROVED> -->
        <div class="mb-3 mt-5 mx-0 row">
            <div  style="width:50%;">APPROVED AS TO FORM:</div>
            <div  style="width:50%;">BY THE COURTS:</div>
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

<!-- <NOTES> -->
         <div class="my-2 ml-3 mr-0 font-italic">
            <div class="mb-2 row">
                Note: This form of order may not be used to reinstate 
                appeals that have been dismissed as abandoned under Rule 51.
            </div>
            <div class="my-2 row">    
                Note: This form of order may be used only if there is no 
                prior order to remove the appeal or application for leave to
                appeal from the inactive list.
            </div>            
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form14";
const form14State = namespace("Form14");

import { form14DataInfoType, form14PartiesInfoType } from '@/types/Information/Form14';
import {getPartyTitles} from '../PartyTitlesForm14'


@Component
export default class Form14Layout extends Vue {

    @Prop({required:true})
    result!: form14DataInfoType; 

    @form14State.Action
    public UpdateForm14Info!: (newForm14Info: form14DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';    
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

        this.extractSigningParties();        
    }  

    public extractSigningParties(){
        
        const appearingAppellants = this.result.signingParties.filter(party=> !party.responding)
        const appearingRespondents = this.result.signingParties.filter(party=> party.responding)
                               
        const appellantnames = this.combineNames(appearingAppellants, 'name', null, ', appellant')                   
        const respondentnames = this.combineNames(appearingRespondents, 'name', null, ', respondent') 

        this.extractSigningPartyList(appearingAppellants, appearingRespondents)

        this.signingParties += appellantnames
        this.signingParties += (appellantnames && respondentnames)?' and ':''
        this.signingParties += respondentnames 
        this.signingParties += (!appellantnames)?  ' and no one appearing on behalf of the appellant(s)':''
        this.signingParties += (!respondentnames)? ' and no one appearing on behalf of the respondent(s)':''
    }

    public extractSigningPartyList(appearingAppellants, appearingRespondents){
        const allParties: form14PartiesInfoType[] = [...appearingAppellants, ...appearingRespondents]        
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