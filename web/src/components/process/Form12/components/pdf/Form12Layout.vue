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

<!-- <BEFORE> -->
        <div class="mb-2 mt-4 mx-0 row" style="font-weight: 600;">
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
        <div class="my-2 mx-0 row">
            <div class="mb-2">
                The application of the {{applyingParties}} to vary the order of {{varyingOrderJudgeName}}
                dated {{result.varyingOrderDate | beautify-date-full-no-weekday}}, coming on
                for hearing on {{result.hearingDate | beautify-date-full-no-weekday}};
            </div>
            <div class="my-2">    
                <b>AND ON HEARING</b> {{appearingParties}}; 
            </div>
            <div class="my-2">
                <b>AND ON READING</b> the materials filed herein; <b>AND ON JUDGMENT BEING PRONOUNCED ON THIS DATE</b>;
            </div>
        </div>

<!-- <DISMISS> -->
        <div class="my-2 mx-0 row">
            <div>
                <b>THIS COURT ORDERS</b> that the application to vary the order of {{varyingOrderJudgeName}} 
                is <span v-if="result.orderAllowed"> allowed. </span> <span v-else> dismissed.</span>
            </div>
        </div>

<!-- <FURTHER ORDERS> -->
        <div v-if="result.otherOrders" class="my-3 mx-0 row">
            <div>
                <b>THIS COURT FURTHER ORDERS</b> that {{result.furtherOrders}}.
            </div>
        </div>

<!-- <APPROVED> -->
        <div class="mb-3 mt-4 mx-0 row">
            <div  style="width:50%;">APPROVED AS TO FORM:</div>
            <div  style="width:50%;"></div>
        </div>

<!-- <Parties Signature> -->
        <div  style="display:inline;" class="my-5 mx-0" v-for="party,inx in signingPartyList" :key="'party-sign-'+inx">
            <div  style="width:50%; display:inline-block; ">                
                <div style="border-top:1px dashed grey; width:94%; margin:3rem 0 0 0;" > 
                    {{party.name}}
                </div>                               
            </div>
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

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import { form12DataInfoType, form12PartiesInfoType } from '@/types/Information/Form12';
import {getPartyTitles, getFullName} from '../PartyTitlesForm12'


@Component
export default class Form12Layout extends Vue {

    @Prop({required:true})
    result!: form12DataInfoType; 

    @form12State.Action
    public UpdateForm12Info!: (newForm12Info: form12DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';
    varyingOrderJudgeName=''
    appearingParties='';
    applyingParties=''

    signingPartyList =[]    

    mounted(){
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
        this.extractApplyingParties();
    }

    public extractAppearingParties(){
        let appellantnames = ''
        let respondentnames = ''
        const appearingAppellants = this.result.appearingParties.filter(party=> !party.responding)
        const appearingRespondents = this.result.appearingParties.filter(party=> party.responding)

        for(const appInx in appearingAppellants){                        
            appellantnames = this.combineNames(appInx, appearingAppellants[appInx].name, appellantnames, appearingAppellants.length)
        }

        for(const resInx in appearingRespondents){            
            respondentnames = this.combineNames(resInx, appearingRespondents[resInx].name, respondentnames, appearingRespondents.length)
        }

        this.extractSigningPartyList(appearingAppellants, appearingRespondents)

        this.appearingParties += appellantnames
        this.appearingParties += (appellantnames && respondentnames)?' and ':''
        this.appearingParties += respondentnames 
    }

    public extractSigningPartyList(appearingAppellants, appearingRespondents){
        const registrar = {} as form12PartiesInfoType;
        registrar.name = 'Deputy Registrar (BY THE COURTS)';

        if(appearingAppellants.length>1)
            this.signingPartyList =[appearingAppellants[0], registrar, ...appearingAppellants.slice(1), ...appearingRespondents]
        else if(appearingAppellants.length==1)
            this.signingPartyList =[appearingAppellants[0], registrar, ...appearingRespondents]
        else if(appearingAppellants.length==0 && appearingRespondents.length>1)
            this.signingPartyList =[appearingRespondents[0], registrar, ...appearingRespondents.slice(1)]
        else
            this.signingPartyList =[appearingRespondents[0], registrar]
    }

    public extractApplyingParties(){
        let appellantnames = ''
        let respondentnames = ''
        const applyingAppellants = this.result.applyingParties.filter(party=> !party.responding)
        const applyingRespondents = this.result.applyingParties.filter(party=> party.responding)

        for(const appInx in applyingAppellants){                        
            appellantnames = this.combineNames(appInx, applyingAppellants[appInx].name, appellantnames, applyingAppellants.length)
        }

        for(const resInx in applyingRespondents){            
            respondentnames = this.combineNames(resInx, applyingRespondents[resInx].name, respondentnames, applyingRespondents.length)
        }

        this.applyingParties += appellantnames
        this.applyingParties += (appellantnames && respondentnames)?' and ':''
        this.applyingParties += respondentnames
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