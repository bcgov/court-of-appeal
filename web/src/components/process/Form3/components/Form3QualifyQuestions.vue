<template>
    <b-card v-if="dataReady" class="bg-white border-white" :key="update">

        <b-row class="mb-4 ml-1 bg-white border-white" style="font-size: 1.5rem; font-weight: 700;">            
            To assist you in completing the Notice of Cross Appeal form, you will 
            need to answer the questions in the section below.
        </b-row>

        <!-- self rep -->

        <b-row class="mb-5">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="question pb-0 mt-3">
                    Are you representing yourself?
                </p>               

                <b-form-radio-group                     
                    v-model="qualificationInfo.selfRepresenting"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card 
                    class="border-primary bg-primary text-white mt-2 mr-5" 
                    v-if="qualificationInfo.selfRepresenting != null">    

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

        <!-- NOA filed -->
        <b-row class="mb-5">
            <b-col cols="1" >
                <div>
                    <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div> 
            </b-col>

            <b-col cols="11">
                <p class="question pb-0 mt-3">
                    Have you filed a Notice of Appearance?
                </p>
                <b-form-radio-group 
                    v-model="qualificationInfo.filedNoA"
                    @change="qualificationResponse()"
                    :options="responseOptions">            
                </b-form-radio-group>
                <b-card 
                    class="border-primary bg-primary text-white mt-2 mr-5" 
                    v-if="qualificationInfo.filedNoA != null && !qualificationInfo.filedNoA"> 
                    <p>
                        Pursuant to Court of Appeal Rule 8, a respondent may only file a 
                        cross appeal if they have filed a notice of appearance in
                        <a style="color: yellow; cursor:pointer; margin-left: 0.25rem; text-decoration: underline; display: inline;"
                            @click="startNewForm2Document"
                            target="_blank"                                                                                
                            > Form 2
                        </a>.
                    </p>                     
                </b-card>                                       
                
            </b-col>           
            
        </b-row>

        <!-- seeking vary -->
        <b-row class="mb-5">
            <b-col cols="1" >
                <div>
                    <step-number v-bind:stepNumber="3" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div> 
            </b-col>

            <b-col cols="11">

                <p class="question pb-0 mt-3">
                    Are you seeking to vary the order being appealed?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.vary"
                    @change="qualificationResponse()"
                    :options="responseOptions">            
                </b-form-radio-group>    

                <b-card 
                    class="border-primary bg-primary text-white mt-2 mr-5" 
                    v-if="qualificationInfo.vary != null && !qualificationInfo.vary"> 
                    <p>
                        Pursuant to Court of Appeal Rule 8, a respondent may only 
                        file a cross appeal if they are seeking to vary the order 
                        being appealed and seeking relief that is different from 
                        what is being asked for by the appellant. 
                    </p>                     
                </b-card>                                       
                
            </b-col>           
            
        </b-row>

       <!-- fla and divorce act -->
        <b-row class="mb-5">
            <b-col cols="1" >
                <div>
                    <step-number v-bind:stepNumber="4" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div> 
            </b-col>

            <b-col cols="11">

                <p class="question pb-0 mt-3">
                    Does the appeal involve an order from a Supreme Court Family 
                    Law or Divorce Act matter?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingScFlaDivorce"
                    @change="qualificationResponse()"
                    :options="responseOptions">            
                </b-form-radio-group>    

                <b-card 
                    class="border-primary bg-primary text-white mt-2 mr-5" 
                    v-if="qualificationInfo.appealingScFlaDivorce"> 
                    <p>
                        Supreme Court Family Law and Divorce Act matters are subject to access 
                        restrictions, you will need to complete the required fields including 
                        the party names and party roles as shown on the order that you are appealing.
                    </p>                     
                </b-card>                                       
                
            </b-col>           
            
        </b-row>      
           
        <!-- outside time limit -->
        <b-row class="mb-5">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="5" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">
                <p class="question pb-0 mt-3">
                    Are you seeking file your Notice of Cross Appeal outside the time limit?
                </p>
                <!-- <p class="content pt-0">
                    Most Supreme Court orders: <b>within 30 days of order being pronounced</b><br/>
                    Bankruptcy cases: <b>within 10 days of order being pronounced</b><br/>
                    Pronounced means the date the order was given by the lower court and not the date it 
                    was entered by the registry.
                </p> -->

                <b-form-radio-group 
                    v-model="qualificationInfo.insideTimeLimit"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card 
                    class="border-primary bg-primary text-white mt-2 mr-5" 
                    v-if="qualificationInfo.insideTimeLimit">
                    <p>
                        The time limit for filing and serving a cross appeal is 
                        <b style="font-weight: 400;" class="bg-warning text-danger">
                        not more than 15 days </b> after being served with a notice of appeal.
                    </p>
                    <p>
                        If you have missed the deadline to file the Notice of Cross Appeal, 
                        you may apply for an extension of time by completing a  
                        <a style="color: blue; margin-left: 0.25rem; text-decoration: underline; display: inline;"
                            @click="startNewForm4Document"
                            target="_blank"                                                                                
                            > Notice of Application
                        </a> and supporting affidavit(s). 
                    </p> 
                    <p>
                        You will need to submit to the registry, the Notice of Application 
                        and supporting affidavit(s) at the same time as your Notice of Cross
                        Appeal.                        
                    </p>                 
                </b-card>                           
                
            </b-col> 
        </b-row>   

        <!-- enforce sc order -->
        <b-row class="mb-5">
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="6" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>

            <b-col cols="11">

                <p class="question pb-0 mt-3">
                    Are you seeking to stop the enforcement of a Supreme Court Order?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingSupremeCourtOrder"
                    @change="qualificationResponse()"
                    :options="responseOptions">        
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingSupremeCourtOrder">
                    <p>
                        You may apply for an order for a stay or proceedings (put the proceedings on hold) or execution 
                        (stop enforcement) of the order pending the outcome of the appeal.                        
                    </p> 
                    <p>
                        To complete a stay application, please proceed to applications for details on how to apply.                        
                    </p> 
                </b-card>                           
                
            </b-col>
        </b-row >

       <!-- fees waived -->
        <b-row>
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="7" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="question pb-0 mt-3">
                    Are you applying for an order to have the fees waived (not be paid)?
                </p>               

                <b-form-radio-group 
                    v-model="qualificationInfo.appealingFeesWaived"
                    @change="qualificationResponse()"
                    :options="responseOptions">                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="qualificationInfo.appealingFeesWaived">                    

                    <p>
                        If you are unable to pay the fees associated with the appeal, you may apply 
                        for an order that no fees are payable under  
                        <a  href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form19.pdf"
                            target="_blank"
                            class= "text-white">Rule 84 of the Court of Appeal Rules
                        </a>.
                    </p>   
                    <p>
                        To make an application for an order that no fees are payable, you must complete  
                        <a style="color: blue; margin-left: 0.25rem; text-decoration: underline; display: inline;"
                            @click="startNewForm22Document"
                            target="_blank"                                                                                
                            > Form 22
                        </a> and submit with your Notice of Cross Appeal.
                    </p>                 

                </b-card>                           
                
            </b-col>            
        </b-row>               
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import StepNumber from "@/components/utils/StepNumber.vue";
import { form3DataInfoType, form3QualificationInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        StepNumber
    }
})
export default class Form1QualifyQuestions extends Vue {

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void        
        
    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void


    dataReady = false;
    stepStyle = "font-size: 2rem;";
    qualificationInfo = {} as form3QualificationInfoType;
    update = 0;

    state = {
        selfRepresenting: null,  
        filedNoA: null,
        vary: null,        
        insideTimeLimit: null,         
        appealingFeesWaived: null,        
        appealingSupremeCourtOrder:null,
        appealingScFlaDivorce:null        
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
        this.qualificationInfo.filedNoA = this.form3Info.filedNoA;
        this.qualificationInfo.vary = this.form3Info.vary;
        this.qualificationInfo.appealingScFlaDivorce = this.form3Info.appealingScFlaDivorce;
        this.qualificationInfo.insideTimeLimit = this.form3Info.insideTimeLimit;
        this.qualificationInfo.appealingSupremeCourtOrder = this.form3Info.appealingSupremeCourtOrder;
        this.qualificationInfo.appealingFeesWaived = this.form3Info.appealingFeesWaived;        

        this.qualificationResponse();
            
        Vue.nextTick(()=> {
            this.dataReady = true;
        });
    }


    public qualificationResponse(){ 
        const qualified = this.checkStates() && this.qualificationInfo.filedNoA;
        this.$emit('disableContinue', !qualified, this.qualificationInfo);          
        this.update++;            
    }
 

    public clearStates(){       
        this.state = {
            selfRepresenting: null,  
            filedNoA: null,
            vary: null,        
            insideTimeLimit: null,         
            appealingFeesWaived: null,        
            appealingSupremeCourtOrder:null,
            appealingScFlaDivorce:null    
        }         
    }
    
    public checkStates(){       
        this.state.selfRepresenting = (this.qualificationInfo.selfRepresenting == null)? false : null;
        this.state.filedNoA = (this.qualificationInfo.filedNoA == null)? false : null;
        this.state.insideTimeLimit = (this.qualificationInfo.insideTimeLimit == null)? false : null; 
        this.state.vary = (this.qualificationInfo.vary == null)? false : null; 
        this.state.appealingFeesWaived = (this.qualificationInfo.appealingFeesWaived == null)? false : null; 
        this.state.appealingSupremeCourtOrder = (this.qualificationInfo.appealingSupremeCourtOrder == null)? false : null; 
        this.state.appealingScFlaDivorce = (this.qualificationInfo.appealingScFlaDivorce == null)? false : null;            
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }  
    
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

    public startNewForm22Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form22" });
    }

    public startNewForm2Document(){
        this.UpdateCurrentCaseId(null);
        this.$router.push({name: "start-form2" });
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