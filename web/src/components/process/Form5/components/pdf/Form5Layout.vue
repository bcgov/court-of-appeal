<template>
    <div v-if="dataReady">

        <div>
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 1rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div class="col-md-3" style="font-size:20pt; background: black; color: white;"><b>FORM 5</b></div>
                <div class="col-md-9" style="font-size:12pt;"><b>NOTICE OF HEARING OF APPEAL: RULE 33(2), 34(2)</b></div>
            </div>         
        </div> 

        <div style="margin: 1rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

            <div class="my-3 row" > 
                <div class="col-md-3">
                    <div style="border: 1px solid #D8D8D8; width: 7rem; height: 10rem; margin: 2rem 2rem; padding-top: 4rem;">
                        [STAMP]
                    </div>
                </div>

                <div class="col-md-5" >
                    <div class="row" style="float:right; margin-right: 0.5rem;">Court of Appeal File No.</div>
                    <div class="row" style="margin-top: 7.75rem; max-width: 100%;">
                        <div class="col-md-11" style="border: 1px solid black;">{{result.appellants[0].name}}</div> 
                        <div class="col-md-1" style="padding: 0; margin-right: 0;">v.</div>
                    </div>
                    <div style="margin: 0 0 -15px -45px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="max-width: 100%; font-style: italic;">
                        <div class="col-md-11" style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8;">
                            Name of the first appellant named on Form 1: Notice of Appeal.
                        </div> 
                        <div class="col-md-1"></div>                        
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="row" style="border: 1px solid black; max-width: 100%;">{{result.formSevenNumber}}</div>
                    <div style="margin: 0 0 -15px -15px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 100%; font-style: italic;">
                        The file number can be found on the upper right corner of the Notice of Appeal.
                    </div>

                    <div class="row" style="margin-top: 0.5rem; border: 1px solid black; max-width: 100%;">{{result.respondents[0].name}}</div>
                    <div style="margin: 0 0 -15px -15px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 100%; font-style: italic;">
                        Name of the first respondent named
                        on Form 1: Notice of Appeal.
                    </div>
                </div>

            </div>

            <div style="border: 1px solid #D8D8D8; background: #D8D8D8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the party(ies) filing the Notice of Hearing of Appeal:
                </div>
                <div>
                    <b>You are required to attach a copy of the orders under appeal 
                    to this form.</b> The court will review any appeal set for one 
                    day or longer and may adjust the length.
                </div>
            </div>

        </div>        

        <div class="my-3 row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin-left: 0; border: 1px solid #D8D8D8; background: #D8D8D8; font-weight: 700; max-width: 90%; padding: 0.5rem;">
                            Address of the courthouse where the appeal will be heard
                    </div>
                    <div style="margin: 7px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-8" style="border: 1px solid black; padding: 0.5rem;">{{result.courtHouse}}</div>
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; font-weight: 700; width: 90%; padding: 0.5rem;">
                            Date the appeal will be heard
                    </div>
                    <div style="margin: -3px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-4">
                <div style="margin: 0 -15px 0 -15px; border: 1px solid black; max-width: 100%; padding: 0.5rem; text-align: center;">{{result.dateOfAppealHearing | beautify-date-dd/mm/yyyy}}</div>
                <div style="margin: 0 0 -15px 75px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                <div style="margin: 0 -15px 0 5px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 80%; font-style: italic; padding: 0.5rem; text-align: center;">
                    DD/MM/YYYY
                </div>
                
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-3" style="margin-top: 0.5rem;">at</div>
                    <div class="col-md-9" style="margin: 0; border: 1px solid black; max-width: 80%; padding: 0.5rem; text-align: center;">{{result.timeOfAppealHearing}}</div>
                </div>
                
            </div>
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.25rem;">
                        <b>Estimated length of appeal in days</b> <br>
                        The default length for an appeal is half a day.
                    </div>
                    <div style="margin: 23px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-3">

                <div 
                    class="row" 
                    style="margin-top: 1.5rem; border: 1px solid black; max-width: 100%; padding: 0.5rem; text-align: center;">
                    {{result.numberOfDaysApp}}
                </div>
                
                <div class="row" style="margin-left: -5px;">Appellant’s estimate</div>
                
            </div>
            <div class="col-md-3">
                    
                <div 
                    class="row" 
                    style="margin-top: 1.5rem; border: 1px solid black; max-width: 100%; padding: 0.5rem; text-align: center;">
                    {{result.numberOfDaysResp}}
                </div>

                <div class="row" style="margin-left: -5px;">Respondent’s estimate</div>
                
            </div>
        </div>

        <div 
            class="row" 
            style="border: 1px solid #D8D8D8; background: #D8D8D8; font-size: 10pt; margin: 15px -15px 15px -15px; text-align: left; padding: 0.5rem;">
            I agree to pay all hearing fees payable under Item 4 of Division 1 of Schedule 2-Court Fees.
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4" >
                <div class="row">
                    <div 
                        style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.75rem;">
                            Date form completed
                    </div>
                    <div style="margin: 0 0 -5px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-3">
                
                <div style="margin: 0 -15px 0 -15px; border: 1px solid black; max-width: 100%; padding: 0.75rem; text-align: center;">{{result.completionDate}}</div>
                <div style="margin: 0 0 -15px 45px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                <div style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 80%; font-style: italic; padding: 0.5rem; text-align: center;">
                    DD/MM/YYYY
                </div>
                
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-6" style="padding: 0;">
                        <div class="row">
                            <div 
                                style="margin: 0 0 0 -10px; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.25rem; font-size: 8pt;">
                                    Name of lawyer or party authorizing filing of this form.
                            </div>
                            <div style="margin: -3px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                        </div> 
                    </div>
                    <div class="col-md-6" style="margin: 0; border: 1px solid black; max-width: 80%; padding: 0.5rem; text-align: center;">{{result.authorizedName}}</div>
                </div>
                
            </div>
        </div>



       
    </div>
</template>

<script lang="ts">
import { form5DataInfoType } from '@/types/Information/Form5';
import { applicantJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from '@/types/Information/json';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

@Component
export default class Form5Layout extends Vue {

    @Prop({required:true})
    result!: form5DataInfoType; 

    @informationState.Action
    public UpdateForm5Info!: (newForm5Info: form5DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    applicants: applicantJsonDataType[] = [];
    respondents: respondentsJsonDataType[] = [];
    courtHouse = '';
  

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
       
    } 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>