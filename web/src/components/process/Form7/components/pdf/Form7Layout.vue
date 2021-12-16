<template>
    <div v-if="dataReady">

        <div>
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="display: block; text-align: center;">
                <div style="font-size:12pt;"><b>FORM 7 (RULES 11 (A))</b></div>               
            </div>            
        </div> 

        <div class="my-3 row" style="padding:0; font-size:9pt;">
            <div class="col-md-6" style="float:right;"></div>
            <div class="col-md-4 p-0" style="margin: 0;">
                Court of Appeal File No.<br>
                <span style="font-size:8pt; font-weight: 700;">(For Registry Use Only)</span>
            </div>
            <div class="col-md-2" style="margin: 0;"></div>
        </div>

        <div class="my-3 row" style="padding:0; font-size:9pt;">
            <div class="col-md-6" style="float:right;"></div>
            <div class="col-md-4 p-0" style="margin: 0;">
                Supreme Court File No.
            </div>
            <div class="col-md-2" style="margin: 0;">{{result.courtClass}}{{result.fileNumber}}</div>
        </div>

        <div class="my-3 row" style="padding:0; font-size:9pt;">
            <div class="col-md-6" style="float:right;"></div>
            <div class="col-md-4 p-0" style="margin: 0;">
                Supreme Court Registry
            </div>
            <div class="col-md-2" style="margin: 0;">{{caseLocation.value}}</div>
        </div>
        

        <div class="my-5" style="display: block; text-align: center; font-weight: 700; font-size:12pt;">COURT OF APPEAL</div>
        <div v-for="sop in caseSop" :key="sop.appealRole + '/' + sop.lowerCourtRole">
            <div class="my-3 row" style="font-weight: 700;">
                <div class="col-md-10">
                    {{sop.conjunction}}: <span style="font-weight: 200; margin-left: 5rem;">{{sop.partyName.join(", ")}}</span>
                </div>
                <div class="col-md-2">{{sop.appealRole}}/<br> {{sop.lowerCourtRole}}</div>
            </div>            
        </div>

        <div class="my-5" style="display: block; text-align: center; font-weight: 700; font-size:12pt;">NOTICE OF APPEAL</div>

       

        <div class="mt-4">
            TAKE NOTICE that <i>{{applicantNames.join(", ")}}</i> hereby appeals to the Court of Appeal 
            for British Columbia from the order of <i>{{result.judgeFullName}}</i> of the Supreme Court 
            of BC pronounced the <i>{{result.orderDate | beautify-date-month-year }}</i>, at 
            <i>{{caseLocation.value}}</i>.
            
        </div>

        <div class="print-block">
            <section>
                <div style="margin:0 0 0 0.25rem;display:inline;  ">The appeal is from a:</div>
   
                <div style="margin:0.25rem 0 0 1rem; " >
                                          
                    <check-box                                                                                      
                        :check="(result.orderType == 'Trial Judgement')?'yes':''" 
                        text="Trial Judgement"/>  
                    <check-box                                                                                      
                    :check="(result.orderType == 'Summary Trial Judgement')?'yes':''" 
                    text="Summary Trial Judgement"/>
                    <check-box                                                                                      
                        :check="(result.orderType == 'Order of a Statutory Body')?'yes':''" 
                        text="Order of a Statutory Body"/>  
                    <check-box                                                                                      
                    :check="(result.orderType == 'Chambers Judgement')?'yes':''" 
                    text="Chambers Judgement"/>                
                   
                </div>                        
            </section>
        </div>

        <!-- <div class="my-3" style="float:right;">
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
        </div> -->
    </div>
</template>

<script lang="ts">
import { form7DataInfoType, form7PartiesInfoType, manualSopInfoType } from '@/types/Information';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { supremeCourtLocationsInfoType } from '@/types/Common';
const informationState = namespace("Information");

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox            
    }
})
export default class Form7Layout extends Vue {

    @Prop({required:true})
    result!: form7DataInfoType; 

    @informationState.State
    public caseLocation: supremeCourtLocationsInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm2Info: form7DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    applicants: form7PartiesInfoType[] = [];
    respondents: form7PartiesInfoType[] = [];
    caseSop :manualSopInfoType[] = [];
  

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

            this.respondentNames.push(respondent.fullName);  

        }

        for (const applicant of this.applicants){

            this.applicantNames.push(applicant.fullName);  

        }

        if (this.result.manualSop?.length > 1){

            this.caseSop = this.result.manualSop;

        } else {

            this.caseSop = [];
            for (const party of this.respondents){
                this.prePopulateSop(party);
            }

            for (const party of this.applicants){
                this.prePopulateSop(party);
            }           

        }
        
        // if(!this.result.serviceInformation){
        //     const result = this.result
        //     result.serviceInformation = {} as serviceInformationJsonDataType
        //     this.UpdateForm2Info(result);
        // }
    }
    
    public prePopulateSop(partyInfo: form7PartiesInfoType){

        let sop = {} as manualSopInfoType;            
        sop.plural = false;
        sop.appealRole = partyInfo.appealCourtRole;
        sop.lowerCourtRole = partyInfo.lowerCourtRole;
        sop.partyName = [];
        sop.partyName.push(partyInfo.fullName)
        if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
                sop.conjunction = 'Between';
                this.caseSop.unshift(sop);
        } else {
            sop.conjunction = 'And';
            this.caseSop.push(sop);
        }

    }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>