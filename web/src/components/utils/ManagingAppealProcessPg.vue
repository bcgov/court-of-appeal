<template>
    <b-card class="bg-white border-white w-90"> 

        <b-row class="mt-1" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                I am applying for:
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showIntro(!showIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showIntroInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showIntroInfo" class="mt-4" >
            <b-form-checkbox-group
                style="font-size: 1rem; font-weight:500;"        
                v-model="applications"                
                @change="update"                                     
                stacked                
            >                        
                <b-form-checkbox
                    v-for="application in applicationsList" 
                    @change="update"
                    :key="application.value"
                    :value="application.value">
                        {{application.text}}
                </b-form-checkbox> 
            </b-form-checkbox-group>
        </b-row>              
        
        <b-row :class="showIntroInfo?'mt-3':'mt-4'" style="padding-top: 1rem;">            
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

        <b-row :class="showStayApplicationsInfo?'mt-0':'mt-4'" :style="showStayApplicationsInfo?'padding-top: 0.15rem;':'padding-top: 0.75rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Applications Requirements or Steps
            </b-col>   
           
            <b-col cols="1">
                <b-button
                    @click="showSteps(!showStepsInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showStepsInfo"></expand-icon>
                </b-button>
            </b-col>         
            
        </b-row>       
             

        <b-row v-if="showStepsInfo" class="mt-4">

            <p>
                Before filing a notice of application or any other document for 
                commencing an application, you must first obtain an application 
                hearing date from the registrar.  
            </p>
            <p>
                If you wish to bring an application, you must at least 5 business 
                days before the application hearing date file and serve on each 
                party, the application materials listed below.
            </p>
            <ol class="mt-3">
                <li>
                    <b-row class="my-1" style="width: 310%;">
                        <b-col cols="10">
                            Notice of Application
                            <!-- <a 
                                href=""
                                target="_blank">Requisition
                            </a> -->
                        </b-col>                                
                        <b-col cols="2" class="p-0" >
                            <b-button
                                @click="startNewForm4Document"
                                target="_blank"                                                                                
                                class="p-1 bg-white text-primary border-primary online-form-button">Online form
                            </b-button>
                        </b-col>
                    </b-row>
                </li> 
                <li>
                    Affidavits (if any),
                </li>
                <li>
                    Written argument (if any)
                </li>
            </ol>

            <div v-if="applications.includes('urgent')">
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

            <div v-if="applications.includes('securityPayment')">
                <b>Payment of security:</b>
                <p>
                    Obtain an application hearing date from the registrar
                </p>
                <p>
                    If you wish to bring an application, you must at 
                    least 5 business days before the application hearing 
                    date file and serve on each party, the application 
                    materials listed below.
                </p>
                <ol>
                    <li>
                        <b-row class="my-1" style="width: 100%;">
                            <b-col cols="9">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        Application Book
                    </li>
                    <li>
                        Affidavits (if any), 
                    </li>
                    <li>
                        Written argument (if any)
                    </li>
                </ol>
            </div>

            <div v-if="applications.includes('newEvidence')">
                <b>Adducing fresh or new evidence:</b>
                <p>
                    If you wish to apply for leave to adduce evidence that was 
                    not before the lower court, you must do the following:
                </p>
                <p>
                    At least 30 days before the appeal hearing date, the 
                    following must be completed, filed and served:
                </p>
                <p>
                    If application is to be heard before the time of 
                    the hearing of the appeal:
                </p>
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 95%;">
                            <b-col cols="10">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        Supporting Affidavit in Form X, that includes the evidence 
                        that the party is seeking to adduce
                    </li>
                    <li>
                        Affidavits (if any), 
                    </li>
                    <li>
                        Written argument (if any)
                    </li>
                </ol>
            </div>

            <div v-if="applications.includes('objection')">
                <b>Quashing an appeal or raising a preliminary objection:</b>
                <p>
                    This would be used when trying to do one or more of the following:
                </p>
                <ul>
                    <li>
                        strike part of a factum
                    </li>
                    <li>
                        raise a preliminary objection to an appeal
                    </li>
                    <li>
                        quash an appeal before it is heard
                    </li>                    
                </ul>
                <p>
                    At least 7 days before the application hearing 
                    date you must complete and serve the following:
                </p>
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 115%;">
                            <b-col cols="10">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        the party’s supporting affidavits, if any, in Form X;
                    </li>
                    <li>
                        the party’s written argument, if any, and 
                    </li>                    
                </ol>
            </div>

            <div v-if="applications.includes('intervener')">
                <b>Intervener status:</b>
                <p>
                    A person, other than a party, interested in an 
                    appeal may apply to a judge for leave to intervene 
                    in the appeal.
                </p>
                <p>
                    You must complete the following documents and, file 
                    and serve no later than 14 days after the appellant 
                    has filed their factum.
                </p>                
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 100%;">
                            <b-col cols="8">
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
                        Memorandum of argument in Form 10, not exceeding 10 pages
                    </li>                    
                </ol>
            </div>

            <div v-if="applications.includes('varyingJusticeOrder')">
                <b>Varying an order of a justice:</b>
                <p>
                    If you wish to apply to the have the court vary an 
                    order of a justice.
                </p>
                <p>
                    You must complete and serve the following with 7 
                    days after the order was made by a justice that 
                    you are seeking to vary.
                </p>                
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        Notice of Application to vary an order of a justice – Form 15                        
                    </li>
                    <li>
                        Supporting affidavit (if any)
                    </li>   
                    <li>
                        Written argument  (if any)                                                
                    </li>                 
                </ol>
                <p>
                    Within 14 days after filing your notice of application, you must:
                </p>                
                <ol>
                    <li>
                        File an application book in Form 16
                    </li>
                    <li>
                        Service on each party a copy of the filed application book.                        
                    </li>
                </ol>
            </div>

            <div v-if="applications.includes('varyingRegistrarOrder')">
                <b>Varying or cancelling an order of the registrar:</b>
                <p>
                    If you wish to apply to a justice to vary or cancel 
                    an order or direction of the registrar.
                </p>
                <p>
                    You must within 7 days after the order was made or 
                    direction given by the registrar file and serve 
                    the following:
                </p>                
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 95%;">
                            <b-col cols="10">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        Supporting affidavit (if any)
                    </li>   
                    <li>
                        Written argument  (if any)                                                
                    </li>                 
                </ol>
            </div>

        </b-row>

        <b-row :class="showStepsInfo?'mt-0':'mt-4'" style="padding-top: 1rem;">            
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

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

@Component({
    components:{
        ExpandIcon
    }
})
export default class ManagingAppealProcessPg extends Vue {  

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form6State.Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    applicationsList = [
        {text: 'an application for leave to appeal', value:'leaveToAppeal'},
        {text: 'an application for a stay of proceedings or stay of execution', value:'stay'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'dismissed'},
        {text: 'an urgent application', value:'urgent'},
        {text: 'payment of security', value:'securityPayment'},
        {text: 'adducing fresh or new evidence', value:'newEvidence'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'objection'},
        {text: 'intervener status', value:'intervener'},
        {text: 'varying an order of a justice', value:'varyingJusticeOrder'},
        {text: 'varying or cancelling an order of the registrar', value:'varyingRegistrarOrder'},
        {text: 'other', value:'other'}
    ]
    showIntroInfo = true;
    // showForm6Info = false; 
    showStayApplicationsInfo = false;
    showStepsInfo = false; 
    showForm9Info = false;     
    applications = [];
    updated = 0;
    stepsLength = 16;

    mounted(){
        this.stepsLength = 16;
    }

    public update(){          
        this.stepsLength = 16;
        if (this.applications.includes('urgent')){
            this.stepsLength = this.stepsLength + 14;
        }

        if (this.applications.includes('securityPayment')){
            this.stepsLength = this.stepsLength + 16;
        }

        if (this.applications.includes('newEvidence')){
            this.stepsLength = this.stepsLength + 20;
        }

        if (this.applications.includes('objection')){
            this.stepsLength = this.stepsLength + 21;
        }

        if (this.applications.includes('intervener')){
            this.stepsLength = this.stepsLength + 16;
        }

        if (this.applications.includes('varyingJusticeOrder')){
            this.stepsLength = this.stepsLength + 22;
        }

        if (this.applications.includes('varyingRegistrarOrder')){
            this.stepsLength = this.stepsLength + 15;
        }

        if (this.showStepsInfo){
            this.$emit('adjustHeights', 2, this.stepsLength + "rem");
        }            
        
        this.updated ++; 
    }
    
    public showIntro(show: boolean){
        if (show) {
            this.showIntroInfo = true;
            this.$emit('adjustHeights', 0, "19rem");
        } else {
            this.showIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }  

    public showStayApplications(show: boolean){
        if (show) {
            this.showStayApplicationsInfo = true;
            this.$emit('adjustHeights', 1, "30rem");
        } else {
            this.showStayApplicationsInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    } 
    
    public showSteps(show: boolean){
        if (show) {
            this.showStepsInfo = true;
            this.$emit('adjustHeights', 2, this.stepsLength + "rem");
        } else {
            this.showStepsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }   

    public showForm9(show: boolean){
        if (show) {
            this.showForm9Info = true;
            this.$emit('adjustHeights', 3, "12rem");
        } else {
            this.showForm9Info = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }
    

    public startNewForm6Document(){
        this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
        this.$router.push({name: "start-form6" })
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