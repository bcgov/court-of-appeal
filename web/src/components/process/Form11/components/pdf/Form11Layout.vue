<template>
    <div>

        <div>
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        </div> 

        <div class="my-0">
            <div class="text-right" >Court of Appeal File No. <b class="ml-3">{{result.formSevenNumber}}</b></div>       
        </div>

        <div class="mt-5 mb-4 mx-auto text-center " style="font-weight: 600; font-size:14pt;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>

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

<!-- <ORDER> -->
        <div class="mt-5" style="display: block; text-align: center; font-weight: 600; font-size:14pt;">ORDER</div>

<!-- <BEFORE> -->
        <div class="mb-2 mx-0 row" style="font-weight: 600;">
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
                {{result.hearingLocation.name}}, British Columbia, {{result.dateOfJudgement | beautify-date-full}} 
            </div>
        </div>
        
<!-- <THE APPEAL> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THE APPEAL</b> from the judgment of the Honourable {{varyingOrderJudgeName}} of the <b class="text-danger">UNKOWN</b> Court 
                of British Columbia at <b class="text-danger">UNKOWN</b>, British Columbia, dated {{result.varyingOrderDate | beautify-date-full-no-weekday}}, coming on
                for hearing on <b class="text-danger">UNKOWN</b>; <b>AND ON HEARING</b> {{appearingParties}}; 
                <b>AND ON READING</b> the materials filed herein; <b>AND ON JUDGMENT BEING PRONOUNCED ON THIS DATE</b>;
            </div>
        </div>

<!-- <DISMISS> -->
        <div class="my-3 mx-0 row">
            <div>
                <b>THIS COURT ORDERS</b> that the application to vary the order of {{varyingOrderJudgeName}} 
                Was the application to vary the order of <span v-if="result.orderAllowed"> allowed. </span> <span v-else> dismissed.</span>
            </div>
        </div>

<!-- <FURTHER ORDERS> -->
        <div v-if="result.otherOrders" class="my-3 mx-0 row">
            <div>
                <b>THIS COURT FURTHER ORDERS</b> that {{result.furtherOrders}}.
            </div>
        </div>

<!-- <APPROVED> -->
        <div class="mb-3 mt-5 mx-0 row">
            <div  style="width:50%;">APPROVED AS TO FORM:</div>
            <div  style="width:50%;">BY THE COURTS</div>
        </div>

<!-- <Appellants Signature> -->
        <div class="my-5 mx-0 row">
            <div  style="width:50%;">
                <div>....................................................................</div>
                <div v-for="party,inx in appearingAppellants" :key="'appl'+inx"> 
                    <div v-if="party.isCounsel" > {{party.name}}</div>
                </div> 
                <div v-if="applicantNamesFull">{{applicantNamesFull}}</div>              
            </div>

            <div  style="width:50%;">
                <div>....................................................................</div>
                <div>Deputy Registrar</div>
            </div>
        </div>

<!-- <Respondents Signature> -->
        <div class="mt-5 mx-0 row">
            <div  style="width:50%;">
                <div>....................................................................</div>
                <div v-for="party,inx in appearingRespondents" :key="'appl'+inx"> 
                    <div v-if="party.isCounsel" > {{party.name}}</div>
                </div>
                <div v-if="respondentNamesFull">{{respondentNamesFull}}</div>
            </div>
            <div  style="width:50%;"/>
        </div>

<!-- <Instructions> -->
        <!-- <div class="mt-5 mx-0 row" style="text-align: justify;">
            <div>
                <b>Instructions:</b> <br/>
                Before you can submit the order to the registry for entry, you will need to have the order 
                you prepared signed by all parties.  If someone refuses to sign an order, you may go before 
                the registrar to settle the order pursuant to <b class="text-danger"> Rule 68 (hyperlink) </b> of the Court of Appeal Rules.
            </div>
        </div> -->

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import { form11DataInfoType } from '@/types/Information/Form11';
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

    appearingAppellants =[]
    appearingRespondents =[]

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
            this.respondentNamesFull = this.combineNames(resInx, fullTitle, this.respondentNamesFull, this.result.respondents.length)
        }

        for (const appInx in this.result.appellants){
            const fullTitle = getPartyTitles(this.result.appellants[appInx],' ')
            this.applicantNames.push(fullTitle);            
            this.applicantNamesFull = this.combineNames(appInx, fullTitle, this.applicantNamesFull, this.result.appellants.length)
        }

        this.varyingOrderJudgeName = this.result.varyingOrderJudgeName=='Other'? this.result.varyingOrderJudgeNameOther :this.result.varyingOrderJudgeName;        
        this.extractAppearingParties();
    }

    public extractAppearingParties(){
        let appellantnames = ''
        let respondentnames = ''
        this.appearingAppellants = this.result.appearingParties.filter(party=> !party.responding)
        this.appearingRespondents = this.result.appearingParties.filter(party=> party.responding)

        for(const appInx in this.appearingAppellants){                        
            appellantnames = this.combineNames(appInx, this.appearingAppellants[appInx].name, appellantnames, this.appearingAppellants.length)
        }

        for(const resInx in this.appearingRespondents){            
            respondentnames = this.combineNames(resInx, this.appearingRespondents[resInx].name, respondentnames, this.appearingRespondents.length)
        }

        //console.log(appellantnames)
        //console.log(respondentnames)
        this.appearingParties += appellantnames
        this.appearingParties += (appellantnames && respondentnames)?' and ':''
        this.appearingParties += respondentnames
 
    }
    
    public combineNames(inx, fullTitle, namesFull, length){
        if(Number(inx)>0 && Number(inx)+1 == length)
            namesFull += ' and '+fullTitle
        else if(Number(inx)==0)
            namesFull += fullTitle
        else
            namesFull += ', '+fullTitle

        return namesFull
    }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>