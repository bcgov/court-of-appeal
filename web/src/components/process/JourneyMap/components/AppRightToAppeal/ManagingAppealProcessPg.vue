<template>
    <b-card class="bg-white border-white w-90"> 
<!--Make an Application  -->
        <b-row class="mt-1" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Make an Application:
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showAppIntro(!showAppIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppIntroInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showAppIntroInfo" class="mt-4" >

            <p>
                If you need to make an application, please select the items 
                below that you will be applying for to see the instructions 
                of what will be required.
            </p>
            <p class="step-title-column ml-5">I am applying for:</p>
            <p class="ml-5 mt-2">
                <b-form-checkbox-group
                    style="font-size: 1rem; font-weight:500; display: block;"        
                    v-model="applications"                
                    @change="updateApps"                                     
                    stacked                
                >                        
                    <b-form-checkbox
                        v-for="application in applicationsList" 
                        @change="updateApps"
                        :key="application.value"
                        :value="application.value">
                            {{application.text}}
                    </b-form-checkbox> 
                </b-form-checkbox-group>
            </p>

            <p 
                v-if="applications.length > 0" 
                class="step-title-column ml-5">Applications Requirements or Steps</p>

            <div v-if="applications.includes('54')">            
                
                <rule-54-application-instructions/>
            </div>

            <div v-if="applications.includes('59')">
                <rule-59-application-instructions/>
            </div>

            <div v-if="applications.includes('58')">
                <rule-58-application-instructions/>
            </div>            

            <div v-if="applications.includes('60')">
                <rule-60-application-instructions/>
            </div>

            <div v-if="applications.includes('61')">
                <rule-61-application-instructions/>
            </div>

            <div v-if="applications.includes('62')">
                <rule-62-application-instructions/>
            </div>

            <div v-if="applications.includes('63')">
                <rule-63-application-instructions/>
            </div>


        </b-row>
<!-- urgent applications -->
        <b-row 
            :class="showAppIntroInfo?'mt-4':'mt-4'" 
            :style="showAppIntroInfo?'padding-top: 0.15rem;':'padding-top: 0.75rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Urgent Applications
            </b-col>   
           
            <b-col cols="1">
                <b-button
                    @click="showUrgent(!showUrgentInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showUrgentInfo"></expand-icon>
                </b-button>
            </b-col>         
            
        </b-row>

        <b-row v-if="showUrgentInfo" class="mt-4">


            <div>
                <b>Urgent application:</b>
                <p>
                    In case of urgency, you may apply for permission to bring an 
                    application on shorter notice than otherwise required under the rules.
                </p>
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar (need link for this).
                    </li>
                    <li>
                        Complete and file a short notice application in Form 7
                    </li>
                    <li>
                        A justice or registrar may at the hearing do the following:
                        <ul>
                            <li>
                                Order that an application be heard on shorter notice than otherwise required
                            </li>
                            <li>
                                Impose conditions or give directions
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>

            

        </b-row>        

<!-- stay applications -->
        <b-row :class="showUrgentInfo?'mt-3':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Stay Applications
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showStayApplications(!showStayApplicationsInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showStayApplicationsInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showStayApplicationsInfo" class="mt-4" >
            <p>
                If you are seeking leave to appeal, you may bring an application to 
                stay the enforcement of the order being appealed from with the 
                application for leave.  
            </p>
            <p>
                If you are joining a stay application with an application for 
                leave, you must do the following instead of bringing an application 
                for leave to appeal under rule 9.
            </p>
            <ol class="mt-3">
                <li>
                    File an application book for leave to appeal and stay in Form X
                   
                </li>                
                <li>
                    Serve each party a copy of the application book for leave to 
                    appeal and stay by earlier of the following dates:
                   <ul>
                        <li>
                            Date that is 30 days after the related notice of appeal 
                            or notice of cross appeal was filed and
                        </li>
                        <li>
                            The date that is 10 business days before the application hearing date.
                        </li>
                    </ul>
                </li>                
            </ol>

            If you are not applying for leave to appeal but still want to make an 
            application for a stay, you will need to complete the steps outlined in the

            <ol class="mt-3">
                <li>
                    Obtain an application hearing date from the registrar
                   
                </li>                
                <li>
                    You must do the following at least 5 business days before 
                    the application hearing date file and serve the following 
                    materials:
                   <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="7">
                                    Notice of Application
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm4Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            Application book in Form 4;
                        </li>
                    </ul>
                </li>                
            </ol>
 
        </b-row> 

<!--Respond to an Application  -->
        <b-row class="mt-1" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Respond to an Application:
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showRespIntro(!showRespIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespIntroInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showRespIntroInfo" class="mt-4" >
            <b-form-checkbox-group
                style="font-size: 1rem; font-weight:500;"        
                v-model="responses"                
                @change="updateResp"                                     
                stacked                
            >                        
                <b-form-checkbox
                    v-for="application in applicationsList" 
                    @change="updateResp"
                    :key="application.value"
                    :value="application.value">
                        {{application.text}}
                </b-form-checkbox> 
            </b-form-checkbox-group>

            
            <b>Applications Requirements or Steps</b>
            <!-- rule 54 -->

            <div v-if="responses.includes('newEvidence')">
                <!-- rule 59 -->
            </div>

            <div v-if="responses.includes('securityPayment')">
                <!-- rule 58 -->
            </div>

            

            <div v-if="responses.includes('objection')">
            <!-- rule 60 -->  
            </div>

            <div v-if="responses.includes('intervener')">
                <!-- rule 61 -->
            </div>

            <div v-if="responses.includes('varyingJusticeOrder')">
                <!-- rule 62 -->
            
            </div>

            <div v-if="responses.includes('varyingRegistrarOrder')">
                <!-- rule 63  -->
            </div>


        </b-row>

<!-- Vary an Order of a Justice -->
        <b-row :class="showRespIntroInfo?'mt-0':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Vary an Order of a Justice
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm8(!showForm8Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm8Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm8Info" class="mt-4" >
            If you wish to submit a request:
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    Requisition
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm8Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

<!-- I need to Request -->
        <b-row :class="showForm8Info?'mt-0':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                I would like to submit a request
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm9(!showForm9Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm9Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm9Info" class="mt-4" >
            If you wish to submit a request:
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    Requisition
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm9Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import Rule54ApplicationInstructions from "./components/Rule54ApplicationInstructions.vue";
import Rule58ApplicationInstructions from "./components/Rule58ApplicationInstructions.vue";
import Rule59ApplicationInstructions from "./components/Rule59ApplicationInstructions.vue";
import Rule60ApplicationInstructions from "./components/Rule60ApplicationInstructions.vue";
import Rule61ApplicationInstructions from "./components/Rule61ApplicationInstructions.vue";
import Rule62ApplicationInstructions from "./components/Rule62ApplicationInstructions.vue";
import Rule63ApplicationInstructions from "./components/Rule63ApplicationInstructions.vue";

@Component({
    components:{
        ExpandIcon,
        Rule54ApplicationInstructions,
        Rule58ApplicationInstructions,
        Rule59ApplicationInstructions,
        Rule60ApplicationInstructions,
        Rule61ApplicationInstructions,
        Rule62ApplicationInstructions,
        Rule63ApplicationInstructions
    }
})
export default class ManagingAppealProcessPg extends Vue {  

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    applicationsList = [
        {text: 'adjournment', value:'54'},
        {text: 'adducing fresh or new evidence', value:'59'},
        {text: 'to consolidate or have appeals heard together', value:'54'},
        {text: 'directions', value:'54'},
        {text: 'dismissal of appeal in chambers', value:'54'},
        {text: 'dismissal (other)', value:'54'},
        {text: 'extend time to file books or documents', value:'54'},
        {text: 'extend time to appeal or cross-appeal', value:'54'},
        {text: 'intervener status', value:'61'},
        {text: 'to pay no fees', value:'00'},
        {text: 'payment of security', value:'58'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'60'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'54'},
        {text: 'remove appeal from the inactive list', value:'54'},
        {text: 'varying an order of a justice ', value:'01'},
        {text: 'varying or cancelling an order of the registrar', value:'63'},
        {text: 'other', value:'other'}
    ]
    showAppIntroInfo = true;
    showUrgentInfo = false;     
    showStayApplicationsInfo = false;
    showRespIntroInfo = false;
    showForm8Info = false; 
    showForm9Info = false;     
    applications = [];
    responses = [];
    updatedApps = 0;
    updatedResps = 0;
    appStepsLength = 34;
    respStepsLength = 16;

    mounted(){
        this.appStepsLength = 34;
        this.respStepsLength = 16;
    }

    public updateApps(){          
        this.appStepsLength = 16;
        // if (this.applications.includes('urgent')){
        //     this.appStepsLength = this.appStepsLength + 14;
        // }

        if (this.applications.includes('54')){
            this.appStepsLength = this.appStepsLength + 16;
        }

        if (this.applications.includes('58')){
            this.appStepsLength = this.appStepsLength + 20;
        }

        if (this.applications.includes('59')){
            this.appStepsLength = this.appStepsLength + 21;
        }

        if (this.applications.includes('60')){
            this.appStepsLength = this.appStepsLength + 16;
        }

        if (this.applications.includes('61')){
            this.appStepsLength = this.appStepsLength + 22;
        }

        if (this.applications.includes('62')){
            this.appStepsLength = this.appStepsLength + 15;
        }

        if (this.applications.includes('63')){
            this.appStepsLength = this.appStepsLength + 15;
        }

        if (this.showAppIntroInfo){
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        }            
        
        this.updatedApps ++; 
    }

    public updateResp(){          
        this.appStepsLength = 16;
        // if (this.responses.includes('urgent')){
        //     this.appStepsLength = this.appStepsLength + 14;
        // }

        if (this.responses.includes('securityPayment')){
            this.appStepsLength = this.appStepsLength + 16;
        }

        if (this.applications.includes('newEvidence')){
            this.appStepsLength = this.appStepsLength + 20;
        }

        if (this.responses.includes('objection')){
            this.appStepsLength = this.appStepsLength + 21;
        }

        if (this.applications.includes('intervener')){
            this.appStepsLength = this.appStepsLength + 16;
        }

        if (this.responses.includes('varyingJusticeOrder')){
            this.appStepsLength = this.appStepsLength + 22;
        }

        if (this.responses.includes('varyingRegistrarOrder')){
            this.appStepsLength = this.appStepsLength + 15;
        }

        if (this.showAppIntroInfo){
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        }            
        
        this.updatedResps ++; 
    }
    
    public showAppIntro(show: boolean){
        if (show) {
            this.showAppIntroInfo = true;
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        } else {
            this.showAppIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    } 
    
    public showUrgent(show: boolean){
        if (show) {
            this.showUrgentInfo = true;
            this.$emit('adjustHeights', 1, "30rem");
        } else {
            this.showUrgentInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    } 

    public showStayApplications(show: boolean){
        if (show) {
            this.showStayApplicationsInfo = true;
            this.$emit('adjustHeights', 2, "30rem");
        } else {
            this.showStayApplicationsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    } 

    public showRespIntro(show: boolean){
        if (show) {
            this.showRespIntroInfo = true;
            this.$emit('adjustHeights', 3, this.respStepsLength + "rem");
        } else {
            this.showRespIntroInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    } 
    
    public showForm8(show: boolean){
        if (show) {
            this.showForm8Info = true;
            this.$emit('adjustHeights', 4, "12rem");
        } else {
            this.showForm8Info = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }   

    public showForm9(show: boolean){
        if (show) {
            this.showForm9Info = true;
            this.$emit('adjustHeights', 5, "12rem");
        } else {
            this.showForm9Info = false;
            this.$emit('adjustHeights', 5, "0");
        }
    }
    
    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
    }

    public startNewForm9Document(){
        this.UpdateCurrentRequisitionId(null);
        this.$router.push({name: "start-form9" })
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" })
    }
    
}
</script>

<style scoped lang="scss">

</style>