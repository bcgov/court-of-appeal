<template>
    <div v-if="dataReady">

        <div>
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="display: block; text-align: center;">
                <div style="font-size:12pt;"><b>FORM 2</b></div>
                <div style="font-size:11pt;"><b>(RULES 5 (A), 13 (A) AND 17 (A))</b></div>
            </div>            
        </div> 

        <div class="my-3 row" style="float:right;">Court of Appeal File No. {{result.formSevenNumber}}</div>       

        <div class="my-5" style="display: block; text-align: center; font-weight: 700; font-size:12pt;">COURT OF APPEAL</div>

        <div class="my-3 row" style="font-weight: 700;">
            <div class="col-md-10">
                BETWEEN: <span style="font-weight: 200; margin-left: 5rem;">{{applicantNames.join(", ")}}</span>
            </div>
            <div class="col-md-2">Appellant</div>
        </div>
        <div class="my-3 row" style="font-weight: 700;">
            <div class="col-md-10">
                AND: <span style="font-weight: 200; margin-left: 7rem;">{{respondentNames.join(", ")}}</span>
            </div>
            <div class="col-md-2">Respondent</div>
        </div>

        <div class="mt-3" style="display: block; text-align: center; font-weight: 700; font-size:12pt;">NOTICE OF APPEARANCE</div>

        <div class="mt-4">
            <div  style="font-weight: 700;">Enter an appearance on behalf of:</div>
            <div class="mt-2" >{{respondentNames.join(", ")}}</div> 
        </div>

        <div class="mt-4">
            <div style="font-weight: 700;">Address for service:</div>
            <div class="mt-2" v-if="!result.selfRepresented" >{{result.serviceInformation.firmName}}</div>
            <div>{{result.serviceInformation.addressLine1}}</div>
            <div v-if="result.serviceInformation.addressLine2">{{result.serviceInformation.addressLine2}}</div> 
            <div>{{result.serviceInformation.city}}, {{result.serviceInformation.province}}, {{result.serviceInformation.postalCode}}</div>
            <div>{{result.serviceInformation.country}}</div>
        </div>

        <div v-if="result.useServiceEmail" class="mt-4">
            <div style="font-weight: 700;">I agree to accept documents served to the following email address:</div>
            <div class="mt-2">{{result.serviceInformation.email}}</div>
        </div>

        <div class="my-3" style="float:right;">
            <div style="text-align: center;">"Electronically Filed"</div>
            <div>............................................................................................................</div>
            <div 
                v-if="result.selfRepresented" 
                style="text-align: right;" 
                class="mt-2">{{result.serviceInformation.name}} Respondent for the Respondents, {{respondentNames.toString()}}
            </div>
            <div 
                v-else 
                style="text-align: right;" 
                class="mt-2">Solicitor for the Respondents, {{respondentNames.toString()}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { form2DataInfoType } from '@/types/Information';
import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from '@/types/Information/json';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

@Component
export default class Form2Layout extends Vue {

    @Prop({required:true})
    result!: form2DataInfoType; 

    @informationState.Action
    public UpdateForm2Info!: (newForm2Info: form2DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    applicants: applicantJsonDataType[] = [];
    respondents: respondentsJsonDataType[] = [];
  

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
        
        this.applicants = this.result.appellants;
        this.respondents = this.result.respondents;
        this.applicantNames = [];
        this.respondentNames = [];

        for (const respondent of this.respondents){
            this.respondentNames.push(respondent.name);  
        }

        for (const applicant of this.applicants){
            this.applicantNames.push(applicant.name);  
        }
        
        if(!this.result.serviceInformation){
            const result = this.result
            result.serviceInformation = {} as serviceInformationJsonDataType
            this.UpdateForm2Info(result);
        }
    } 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>