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
        <div class="mb-2 mx-0 mt-5 row" style="font-weight: 600;">
            <div>
                BEFORE: 
            </div>
        </div>

        <div>
            <div v-for="judgeName,inx in result.judgeNames" :key="inx">
                <div style="margin-left:2.25rem;"> The Honourable {{judgeName.text}} </div>
            </div>
        </div>

<!-- <HEARING LOCATION-DATE> -->
        <div class="mt-2 mb-4 mx-0 row">
            <div>
                {{result.hearingLocation.name}}, British Columbia, {{hearingDate | beautify-date-full}} 
            </div>
        </div>

<!-- <Reasons to Follow - Later Date> -->
    <div class="mt-2 mb-4 mx-0 row" v-if="result.laterDateDecided">
        <div>
            Reasons to follow being released on {{ result.laterDate | beautify-date-full}}
        </div>
    </div>

<!-- <Reasons to Follow - Later Date> -->
    <div class="mt-2 mb-4 mx-0 row" v-if="result.supplementaryReasons">
        <div>
            Supplementary reasons being released on {{ result.supplementaryReasonsDate | beautify-date-full}}
        </div>
    </div>

        
<!-- <THE APPEAL> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THE APPEAL</b> from the order of {{varyingOrderJudgeName}} at {{result.varyingOrderLocation}} 
                dated {{result.varyingOrderDate | beautify-date-full-no-weekday}}, coming on for hearing on {{result.hearingDate | beautify-date-full-no-weekday}}; 
                <b>AND ON HEARING</b> {{appearingParties}}; 
                <b>AND ON READING</b> the materials filed herein; <b>AND ON JUDGMENT BEING PRONOUNCED ON THIS DATE</b>;
            </div>
        </div>

<!-- <DISMISS> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THIS COURT ORDERS</b> that the appeal is <span v-if="result.orderAllowed"> allowed. </span> <span v-else> dismissed.</span>
            </div>
        </div>

<!-- <DISMISS> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THIS COURT ORDERS</b> that {{result.ordersCourtMade}}
            </div>
        </div>

<!-- <FURTHER ORDERS> -->
        <div v-if="result.otherOrders" class="my-3 mx-0 row">
            <div>
                <b>AND THIS COURT FURTHER ORDERS</b> that {{result.furtherOrders}}.
            </div>
        </div>

<!-- <COSTs ORDERS> -->
        <div  class="my-3 mx-0 row">
            <div>
                <b>AND THIS COURT FURTHER ORDERS</b> that the {{successfullParties}} 
                do recover the costs of the appeal from {{unsuccessfullParties}} promptly after assessment.
            </div>
        </div>

<!-- <APPROVED> -->
        <div class="mb-3 mt-5 mx-0 row">
            <div  style="width:50%;">APPROVED AS TO FORM:</div>
            <div  style="width:50%;">BY THE COURT</div>
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
                    Deputy Registrar
                </div>
            </div>            
        </div>


    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import { form11DataInfoType, form11PartiesInfoType } from '@/types/Information/Form11';
import {getPartyTitles, getFullName} from '../PartyTitlesForm11'

@Component
export default class Form11Layout extends Vue {

    @Prop({required:true})
    result!: form11DataInfoType; 

    @form11State.Action
    public UpdateForm11Info!: (newForm11Info: form11DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';
    varyingOrderJudgeName=''
    appearingParties='';

    hearingDate = ''
    signingPartyList =[]   
    successfullParties=''
    unsuccessfullParties=''

    mounted(){
        // this.dataReady = false;
        //console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){        
       
        this.applicantNames = [];
        this.respondentNames = [];
        this.applicantNamesFull='';
        this.respondentNamesFull='';

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

        this.varyingOrderJudgeName = this.result.varyingOrderJudgeName;        
        this.hearingDate = this.result.judgmentReserved? this.result.judgmentReservedDate : this.result.dateOfJudgement;
        this.extractAppearingParties();
        this.extractSuccessUnsucessParties()
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
        const allParties: form11PartiesInfoType[] = [...appearingAppellants, ...appearingRespondents]        
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

    public extractSuccessUnsucessParties(){
        this.successfullParties = this.combineNames(this.result.successfulParties, 'name')
        this.unsuccessfullParties = this.combineNames(this.result.unsuccessfulParties, 'name')
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