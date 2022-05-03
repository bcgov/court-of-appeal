<template>
    <b-card v-if="dataReady" class="bg-white border-white" :key="update">

        <b-row class="mb-4 ml-1 bg-white border-white" style="font-size: 2rem; font-weight: 700;">            
            Do these apply to your appeal?
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you representing yourself?
                </p>               

                <b-form-radio-group                     
                    v-model="qualificationInfo.selfRepresenting"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.selfRepresenting != null">    

                    <p>
                        If you are representing yourself in the Court of Appeal, you will need to learn 
                        about the court system and specific procedures in the Court of Appeal. The 
                        following link will provide you access to information on the Court of Appeal 
                        processes and how you can prepare case:
                    </p>           

                    <p>                        
                        <a  href="http://www.courtofappealbc.ca/?ct=t(primary-menu)"
                            target="_blank"
                            class= "text-white">Court of Appeal information
                        </a>                                          
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row> 

        <b-row class="mb-4">
            <b-col cols="1">               
                <div>
                    <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Do you seek to appeal a Provincial Court Order?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingProvincialCourtOrder"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingProvincialCourtOrder">    

                    <p>
                        The appeal would typically be brought in the Supreme Court by filing a Notice of Appeal if 
                        Direction Required and a Notice of Appeal - Standard Directions with the Supreme Court.
                    </p>           

                    <p>
                        Supreme Court Civil 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/17_168_2009%20-%20Supreme%20Court%20Civil%20Rules/168_2009_02.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form73"
                            target="_blank"
                            class= "text-white">Form 73</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form74"
                            target="_blank"
                            class= "text-white">Form 74</a><br/>
                        Supreme Court Family 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/18_169_2009%20-%20Supreme%20Court%20Family%20Rules/169_2009_03.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F79"
                            target="_blank"
                            class= "text-white">Form F79</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F80"
                            target="_blank"
                            class= "text-white">Form F80</a><br/>                        
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
          </b-row> 

        <b-row class="mb-4">
            <b-col cols="1">               
                <div>
                    <step-number v-bind:stepNumber="3" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            
            <b-col cols="11">
                <p class="content pb-0">
                    Are you seeking to file your Notice of Appeal outside the time limit?
                </p>
                <p class="content pt-0">
                    Most Supreme Court orders: <b>within 30 days of order being pronounced</b><br/>
                    Bankruptcy cases: <b>within 10 days of order being pronounced</b><br/>
                    Pronounced means the date the order was given by the lower court and not the date it 
                    was entered by the registry.
                </p>

                <b-form-radio-group 
                    v-model="qualificationInfo.insideTimeLimit"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.insideTimeLimit">
                    The time limit for <i>filing and serving</i> an appeal is usually 30 days commencing on the 
                    day after the order is pronounced (the date the order was spoken by the lower court judge). 
                    An appeal relating to bankruptcy needs to be filed and served within 10 days. If it is past 
                    the deadline, you need to file the Notice of Appeal along with the Notice of Motion and 
                    supporting affidavit seeking an extension of time.<br/>
                    You cannot do that using this process. At this time, this process does not support filing 
                    of these documents together.
                </b-card>                           
                
            </b-col>
        </b-row> 

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="4" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you appealing an order made under the Bankruptcy and Insolvency Act or the Companies' 
                    Creditors Arrangement Act?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingBankruptcy"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingBankruptcy">
                    <p>
                        The appeal period for filing and serving an appeal is usually 30 days commencing on 
                        the day after the order is pronounced (the date the order was spoken by the lower 
                        court judge); however if another enactment specifies a different period, that 
                        different period applies.
                    </p>

                    <p>
                        Bankruptcy and Insolvency Act - 
                        <a  href="http://laws.justice.gc.ca/eng/regulations/C.R.C.,_c._368/page-2.html#h-10"
                            target="_blank"
                            class= "text-white">Section 31(1) and (2) Bankruptcy and Insolvency General Rules 
                            prescribes a 10 day appeal period</a>.
                    </p>

                    <p>
                        Companies’ Creditors Arrangement Act – 
                        <a  href="http://laws.justice.gc.ca/eng/acts/C-36/page-7.html#docCont"
                            target="_blank"
                            class= "text-white">Section 14(2) prescribes a 21 day appeal period</a>.
                    </p>

                    <p>
                        If you are appealing an order under the Bankruptcy and Insolvency Act or the Companies’ 
                        Creditors Arrangement Act, you cannot do so using this process at this time.
                    </p>
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="5" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you applying for an order to have the fees waived (not be paid)?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingFeesWaived"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingFeesWaived">                    

                    <p>
                        If you are applying for an order to have the fees waived, you need to file the 
                        Notice of Appeal along with the Notice of Motion and supporting affidavit  
                        <a  href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form19.pdf"
                            target="_blank"
                            class= "text-white">(Form 19 - Affidavit: No Fees Payable (Indigent Status))
                        </a>.
                    </p>                    

                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="6" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Do you seek to appeal an order of a Supreme Court Master?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingSupremeCourtMaster"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingSupremeCourtMaster">    

                    <p>
                        Appeals of a Supreme Court Master's decision are typically brought 
                        to a Supreme Court Judge.
                    </p> 

                    <p>
                        Complete and file with the Supreme Court, a Notice of Appeal 
                        from Master, Registrar or Special Referee form.                        
                    </p>               

                    <p>
                        Supreme Court Civil 
                        <a  href="https://www.bclaws.ca/civix/document/id/complete/statreg/168_2009_03#subrule_d2e32458"
                            target="_blank"
                            class= "text-white">Rule 23-6 (8)</a>:
                        <a  href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/supreme-civil/121.pdf?forcedownload=true"
                            target="_blank"
                            class= "text-white">Form 121</a><br/>
                        Supreme Court Family 
                        <a  href="https://www.bclaws.ca/civix/document/id/complete/statreg/169_2009_03#subrule_d1e29526"
                            target="_blank"
                            class= "text-white">Rule 22-7 (8)</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F98"
                            target="_blank"
                            class= "text-white"> Form F98</a>                        
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="7" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you seeking to stop the enforcement of a Supreme Court Order?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingSupremeCourtOrder"
                    @change="qualificationResponse()"
                    :options="responseOptions">        
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingSupremeCourtOrder">    

                    <p>
                        TBD
                    </p>           

                    <!-- <p>
                        Supreme Court Civil 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/17_168_2009%20-%20Supreme%20Court%20Civil%20Rules/168_2009_02.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form73"
                            target="_blank"
                            class= "text-white">Form 73</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form74"
                            target="_blank"
                            class= "text-white">Form 74</a><br/>
                        Supreme Court Family 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/18_169_2009%20-%20Supreme%20Court%20Family%20Rules/169_2009_03.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F79"
                            target="_blank"
                            class= "text-white">Form F79</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F80"
                            target="_blank"
                            class= "text-white">Form F80</a><br/>                        
                    </p>                     -->
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="8" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you appealing an order from a SC Family Law Act Matter or Divorce?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingScFlaDivorce"
                    @change="qualificationResponse()"
                    :options="responseOptions">            
                </b-form-radio-group>                                      
                
            </b-col> 
            
        </b-row >   

        <b-row class="mb-4">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="9" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Does this appeal involve the rights or interests of a child?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealInvolvesChild"
                    @change="qualificationResponse()"
                    :options="responseOptions">               
                </b-form-radio-group>
                
            </b-col> 
            
        </b-row>   

        <b-row>
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="10" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Was the order pronounced by a tribunal court?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealTribunal"
                    @change="qualificationResponse()"
                    :options="responseOptions">               
                </b-form-radio-group>
                
            </b-col> 
            
        </b-row>          
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import StepNumber from "@/components/utils/StepNumber.vue";
import { form3DataInfoType, form3QualificationInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        StepNumber
    }
})
export default class Form1QualifyQuestions extends Vue {

    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    dataReady = false;
    stepStyle = "font-size: 2rem;";
    qualificationInfo = {} as form3QualificationInfoType;
    update = 0;

    state = {
        selfRepresenting: null,
        appealingProvincialCourtOrder: null,        
        insideTimeLimit: null, 
        appealingBankruptcy: null, 
        appealingFeesWaived: null,
        appealingSupremeCourtMaster: null,
        appealingSupremeCourtOrder:null,
        appealingScFlaDivorce:null,
        appealInvolvesChild: null,
        appealTribunal: null
    }   

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    mounted(){
        this.dataReady = false;
        this.qualificationInfo = {} as form3QualificationInfoType;
        if (this.currentNoticeOfCrossAppealId && this.form3Info){         
            this.extractData();            
        } else {            
            this.qualificationInfo.selfRepresenting = this.$store.state.Common.userSelfRepresented;
            this.clearStates();
            this.qualificationResponse();
            Vue.nextTick(()=> {
                this.dataReady = true;
            });
        }
    }
    
    public extractData(){
        this.qualificationInfo.selfRepresenting = this.form3Info.selfRepresenting;
        this.qualificationInfo.appealingProvincialCourtOrder = this.form3Info.appealingProvincialCourtOrder;
        this.qualificationInfo.insideTimeLimit = this.form3Info.insideTimeLimit;
        this.qualificationInfo.appealingBankruptcy = this.form3Info.appealingBankruptcy;
        this.qualificationInfo.appealingFeesWaived = this.form3Info.appealingFeesWaived;
        this.qualificationInfo.appealingSupremeCourtMaster = this.form3Info.appealingSupremeCourtMaster;
        this.qualificationInfo.appealingSupremeCourtOrder = this.form3Info.appealingSupremeCourtOrder;
        this.qualificationInfo.appealingScFlaDivorce = this.form3Info.appealingScFlaDivorce;
        this.qualificationInfo.appealInvolvesChild = this.form3Info.appealInvolvesChild;
        this.qualificationInfo.appealTribunal = this.form3Info.appealTribunal;

        this.qualificationResponse();
            
        Vue.nextTick(()=> {
            this.dataReady = true;
        });
    }


    public qualificationResponse(){ 
        const qualified = this.checkStates() && (this.qualificationInfo.appealingSupremeCourtMaster == false)
        this.$emit('disableContinue', !qualified, this.qualificationInfo);          
        this.update++;            
    }
 

    public clearStates(){       
        this.state = {
            selfRepresenting:null,
            appealingProvincialCourtOrder:null,        
            insideTimeLimit:null, 
            appealingBankruptcy:null, 
            appealingFeesWaived:null,
            appealingSupremeCourtMaster:null,
            appealingSupremeCourtOrder:null,
            appealingScFlaDivorce:null,
            appealInvolvesChild:null,
            appealTribunal:null
        }         
    }
    
    public checkStates(){       
        this.state.selfRepresenting = (this.qualificationInfo.selfRepresenting == null)? false : null;
        this.state.appealingProvincialCourtOrder = (this.qualificationInfo.appealingProvincialCourtOrder == null)? false : null;
        this.state.insideTimeLimit = (this.qualificationInfo.insideTimeLimit == null)? false : null; 
        this.state.appealingBankruptcy = (this.qualificationInfo.appealingBankruptcy == null)? false : null; 
        this.state.appealingFeesWaived = (this.qualificationInfo.appealingFeesWaived == null)? false : null; 
        this.state.appealingSupremeCourtMaster = (this.qualificationInfo.appealingSupremeCourtMaster == null)? false : null; 
        this.state.appealingSupremeCourtOrder = (this.qualificationInfo.appealingSupremeCourtOrder == null)? false : null; 
        this.state.appealingScFlaDivorce = (this.qualificationInfo.appealingScFlaDivorce == null)? false : null;            
        this.state.appealInvolvesChild = (this.qualificationInfo.appealInvolvesChild == null)? false : null;  
        this.state.appealTribunal = (this.qualificationInfo.appealTribunal == null)? false : null;     
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

}
</script>

<style scoped lang="scss">

    .step-number {
        border-radius: 50%;
        padding: 20px;
    }

    .content {        
        margin-bottom: 8px !important;        
    }

</style>