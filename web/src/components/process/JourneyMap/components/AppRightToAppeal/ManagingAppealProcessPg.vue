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

        <b-row v-if="showAppIntroInfo" class="mt-2" >

            <p>
                If you need to make an application, please select the items 
                below that you will be applying for to see the instructions 
                of what will be required.<br>            
                If you select more than one option from the list below, you 
                only need to complete one Notice of Application form (Form 4); 
                however, you will need to complete the application requirements 
                and steps outlined in the instructions for all items selected.
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

            <p v-if="applications.length > 0"                
                class="step-title-column">Application Requirements or Steps</p>

            <div v-if="getAppRules().includes('54')">
                <rule-54-application-instructions :displayButton='form4Button == 54'/>
            </div>            

            <div v-if="getAppRules().includes('58')">
                <rule-58-application-instructions :displayButton='form4Button == 58'/>
            </div>    

            <div v-if="getAppRules().includes('59')">
                <rule-59-application-instructions :displayButton='form4Button == 59'/>
            </div>        

            <div v-if="getAppRules().includes('60')">
                <rule-60-application-instructions :displayButton='form4Button == 60'/>
            </div>

            <div v-if="getAppRules().includes('61')">
                <rule-61-application-instructions :displayButton='form4Button == 61'/>
            </div>

            <div v-if="getAppRules().includes('63')">
                <rule-63-application-instructions :displayButton='form4Button == 63'/>
            </div>

        </b-row>
<!-- urgent applications -->
        <b-row 
            :class="showAppIntroInfo?'':'mt-4'" 
            :style="showAppIntroInfo?'padding-top: 0.5rem;':'padding-top: 0.75rem;'">            
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
            <rule-57-application-instructions/>
        </b-row>        

<!-- stay applications -->
        <b-row 
            :class="showUrgentInfo?'mt-2':'mt-3'"
            :style="showUrgentInfo?'padding-top: 0.5rem;':'padding-top: 1.25rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Stay Applications when not joined with an application for leave to appeal
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
            <rule-20-application-instructions/> 
        </b-row> 

<!--Respond to an Application  -->
        <b-row 
            :class="showStayApplicationsInfo?'mt-0':'mt-4'" 
            :style="showStayApplicationsInfo?'padding-top: 0.05rem;':'padding-top: 0.65rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Respond to an Application
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

            <p>
                If you need to respond to an application, please select the items 
                below that you will be applying for to see the instructions 
                of what will be required.
            </p>
            <p class="step-title-column ml-5">I am applying for:</p>
            <p class="ml-5 mt-2">
                <b-form-checkbox-group
                    style="font-size: 1rem; font-weight:500; display: block;"        
                    v-model="responses"                
                    @change="updateResp"                                     
                    stacked                
                >                        
                    <b-form-checkbox
                        v-for="response in responsesList" 
                        @change="updateResp"
                        :key="response.value"
                        :value="response.value">
                            {{response.text}}
                    </b-form-checkbox> 
                </b-form-checkbox-group>
            </p>

            <p v-if="responses.length > 0"                
                class="step-title-column">Application Requirements or Steps</p>

            <div v-if="getRespRules().includes('54')">
                <rule-54-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('59')">
                <rule-59-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('58')">
                <rule-58-response-instructions/>
            </div>            

            <div v-if="getRespRules().includes('60')">
                <rule-60-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('61')">
                <rule-61-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('63')">
                <rule-63-response-instructions/>
            </div>

        </b-row>

<!-- Vary an Order of a Justice -->
        <b-row 
            :class="showRespIntroInfo && responses.length > 0?'mt-1':'mt-4'" 
            :style="showRespIntroInfo && responses.length > 0?'padding-top: 0.5rem;':'padding-top: 0.65rem;'">            
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

        <rule-62-application-instructions v-if="showForm8Info"/>        

<!-- Order that no fees are payable -->
        <b-row 
            :class="showForm8Info?'mt-0':'mt-4'" 
            :style="showForm8Info?'padding-top: 1.15rem;':'padding-top: 0.75rem;'">             
            <b-col cols="11" class="step-title-column pl-0">
                Order that no fees are payable
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm22(!showForm22Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm22Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm22Info" class="mt-4" >
            <p>
                If you wish to apply for an order that no fees are payable 
                under 
                <a  href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section84"
                    target="_blank">rule 84
                </a>
                of the Court of Appeal Rules, you will need to:  
            </p>            
           
            <ol class="mt-3">
                <li>
                    Complete either the Online form or the .PDF.  Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col class="font-weight-bold" cols="9">
                                    Application For Order that No Fees are Payable (Form 22)                                    
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm22Document"
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
            </ol>

            <p style="font-style: italic;">
                Note: If the registrar determines that a hearing is required, they 
                will set the date and notify yourself.  The other parties will not 
                need to receive notice of the application.  
            </p>

        </b-row> 


<!-- I need to Request -->
        <b-row 
            :class="showForm22Info?'mt-0':'mt-4'" 
            :style="showForm22Info?'padding-top: 1rem;':'padding-top: 1rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Request to adjourn or reset a matter
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
            <p>
                This form is used for general requests, including but not 
                limited to requests to adjourn matters by consent, or 
                requests to reset matters.  
            </p>
            <p class="step-title-column ml-1">Adjourning an application</p>
            <p>
                If you are <b>making an application</b> and you want to 
                adjourn an application before the hearing date. 
            </p>
            <p>
                If you are <b>responding</b> to an application, with the consent 
                of the party making the application, you may seek to 
                adjourn the hearing by filing a Requisition.  
            </p>
            <b-row class="mt-2 mx-2 bg-warning warning-message-row">
                <b-col cols="1">
                    <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
                </b-col>
                <b-col cols="11" style="padding-left: 0;">
                    If you are filing the requisition to adjourn an 
                        application, it must be filed 
                        <span 
                            class="text-danger font-weight-bold">
                             before 2:00 p.m. of 
                            the business day 
                        </span> before the application hearing date.
                </b-col>              
            </b-row>

            <p class="step-title-column mt-4 ml-1">Resetting an application</p>
            <p>
                If an application was adjourned without a new date being set, 
                the party making the application may set a new hearing date 
                by filing and serving a requisition.
            </p>

            <b-row class="mt-2 mx-2 bg-warning warning-message-row">
                <b-col cols="1">
                    <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
                </b-col>
                <b-col cols="11" style="padding-left: 0;">
                    
                    The requisition must be filed and served 
                        <span 
                            class="text-danger font-weight-bold">
                            at least 5 business days
                        </span>
                    before the new application hearing date.   
                </b-col>              
            </b-row> 
                       
           
            <ol class="mt-3">
                <li>
                    Complete either the Online form or the .PDF. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col class="font-weight-bold" cols="9">
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

        <b-row :class="showForm9Info?'mt-4':'mt-2'" :style="showForm9Info?'padding-top: 0.25rem;':'padding-top: 2rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Respond to an Application for Leave to Appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespNoaLeave(!showRespNoaLeaveInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespNoaLeaveInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showRespNoaLeaveInfo" class="mt-4">
            <p>
                If you have been served with a Notice of Application for Leave to Appeal, 
                you will need to follow one of the steps below to respond to the Notice 
                of Application for Leave to Appeal.
            </p>
            <p>
                Every appeal process is unique. If you have any questions, please visit the 
                <a 
                    href="http://www.courtofappealbc.ca/civil-family-law/guidebook-for-appellants/deciding-to-appeal" 
                    target="_blank">Online Guidebook
                </a>, the  
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a" 
                    target="_blank">Court of Appeal Rules
                </a> or 
                <a 
                    href="mailto:courts.cso@gov.bc.ca"> contact the registry
                </a>.
            </p>              
        </b-row>

        <b-row v-if="showRespNoaLeaveInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">                
                You must file and serve the documents below 
                    <span 
                        class="text-danger font-weight-bold">at least 5 business days
                    </span>
                before the application hearing date.
            </b-col>              
        </b-row>

        <b-row v-if="showRespNoaLeaveInfo" class="mt-4" >            

           <ol>
                <li>
                    Complete the following using the Completion Instructions. 
                    Please note that you must submit the book in a pdf format. 
                    Click the document name for more information.
                    <ul>                        
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="4" style="font-weight: 700;">
                                    Response Book                                   
                                </b-col>
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="downloadInstructions('e-application-leave-stay')"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">E-Completion Instructions
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    <b-button
                                        @click="downloadInstructions('paper-application-leave-stay')"
                                        target="_blank"
                                        class="w-95 form-download-button p-1 bg-white text-primary border-primary">Paper – Completion Instructions
                                    </b-button>                                    
                                </b-col>
                            </b-row>                            
                        </li>
                    </ul>                
                </li>
                <li>
                    File the Response Book with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>      
        </b-row> 

        <b-row :class="showRespNoaLeaveInfo?'mt-0':'mt-4'" style="padding-top: 0.75rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Respond to an Application for Leave to Apply and Stay
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespNoaLeaveStay(!showRespNoaLeaveStayInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespNoaLeaveStayInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showRespNoaLeaveStayInfo" class="mt-4" >            
            <p>
                If you have been served with a Notice of Application for Leave to 
                Appeal and Stay, and you wish to respond. Follow the steps below 
                to complete the process.
            </p>
            <p>
                Every appeal process is unique. If you have any questions, please visit the 
                <a 
                    href="http://www.courtofappealbc.ca/civil-family-law/guidebook-for-appellants/deciding-to-appeal" 
                    target="_blank">Online Guidebook
                </a>, the  
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a" 
                    target="_blank">Court of Appeal Rules
                </a> or 
                <a 
                    href="mailto:courts.cso@gov.bc.ca"> contact the registry
                </a>.
            </p>    
               
        </b-row>

        <b-row v-if="showRespNoaLeaveStayInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must file and serve the documents below 
                    <span class="text-danger font-weight-bold">
                        at least 5 business days
                    </span>
                    before the application hearing date.                                    
            </b-col>              
        </b-row>

        <b-row v-if="showRespNoaLeaveStayInfo" class="mt-4" > 
           <ol class="mt-2">
                <li>
                    Complete the following using the Completion Instructions. 
                    Please note that you must submit the book in a pdf format. 
                    Click the document name for more information.
                    <ul>
                        <li>                            
                            <b-row class="my-1 w-110">
                                <b-col cols="4" style="font-weight: 700;">
                                    Response Book for Leave to Appeal and Stay                                  
                                </b-col>
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="downloadInstructions('e-application-leave-stay')"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">E-Completion Instructions
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    <b-button
                                        @click="downloadInstructions('paper-application-leave-stay')"
                                        target="_blank"
                                        class="w-95 form-download-button p-1 bg-white text-primary border-primary">Paper – Completion Instructions
                                    </b-button>                                    
                                </b-col>
                            </b-row>  
                        </li>
                        
                    </ul>                
                </li>
                <li>
                    File the Response Book with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>      
        </b-row>     
        
        <b-row :class="showRespNoaLeaveStayInfo?'mt-0':'mt-4'" style="padding-top: 0.75rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Responding to Application to Vary An Order of a Justice
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespVaryOrder(!showRespVaryOrderInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespVaryOrderInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showRespVaryOrderInfo" class="mt-4" >            
            <p>
                If you were served with an application to vary an order of a justice 
                and an application book, you can complete the steps below to respond:
            </p>               
        </b-row>

        <b-row v-if="showRespVaryOrderInfo" class="mt-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                File and serve the documents below 
                    <span class="text-danger font-weight-bold">
                        within 7 days
                    </span>
                    after being served the application book.                                    
            </b-col>              
        </b-row>

        <b-row v-if="showRespVaryOrderInfo" class="mt-4" > 
           <ol class="mt-2">
                <li class="mb-3">
                    Complete the following using the Completion Instructions. 
                    Please note that you must submit the book in a pdf format.  
                    Click the document name for more information.
                    <ul>
                        <li>                            
                            <b-row class="my-1 w-110">
                                <b-col cols="4" style="font-weight: 700;">
                                    Response book to vary an order of a justice                                  
                                </b-col>
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="downloadInstructions('e-vary')"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">E-Completion Instructions
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    <b-button
                                        @click="downloadInstructions('paper-vary')"
                                        target="_blank"
                                        class="w-95 form-download-button p-1 bg-white text-primary border-primary">Paper – Completion Instructions
                                    </b-button>                                    
                                </b-col>
                            </b-row>  
                        </li>
                        <li class="link-button mb-2" 
                            @click="affidavit = true;"
                            target="_blank">
                            Supporting Affidavit (if any),                
                        </li> 
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">                                
                                    <a 
                                        href="downloadInstructions('written-argument')"
                                        target="_blank">Written argument (if any)
                                    </a>                                
                                </b-col>
                            </b-row>
                        </li>                        
                    </ul>                
                </li>
                <li>
                    File the documents with the registry.
                </li>
                <li class="mt-2">
                    Serve copy of the Response book and document(s) on each party.
                </li>
            </ol>      
        </b-row>

        <b-modal size="xl" v-model="affidavit" header-class="bg-info">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Access Affidavit</h1>
            </template>
            <div class="m-3">                
                <p>
                    <b>Warning:</b> Some browsers or PDF readers do not 
                    support "PDF Fillable" forms. These forms may need 
                    to be downloaded, saved locally and then opened directly 
                    in an appropriate PDF reader in order to fill in the content.
                </p>
                <p>
                    Please see the bottom of this page for additional forms not 
                    officially numbered by the Court.
                </p>
                <p>                
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/completion_instructions/templates/general_affidavit.dotx"
                        target="_blank">Affidavit
                    </a> 
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="affidavit = false">Close</b-button>
            </template>
            <template v-slot:modal-header-close>
                <b-button
                    variant="outline-dark"
                    class="closeButton"
                    @click="affidavit = false"
                    >&times;
                </b-button>
            </template>
        </b-modal>  

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import Rule20ApplicationInstructions from "./components/Rule20ApplicationInstructions.vue";
import Rule54ApplicationInstructions from "./components/Rule54ApplicationInstructions.vue";
import Rule57ApplicationInstructions from "./components/Rule57ApplicationInstructions.vue";
import Rule58ApplicationInstructions from "./components/Rule58ApplicationInstructions.vue";
import Rule59ApplicationInstructions from "./components/Rule59ApplicationInstructions.vue";
import Rule60ApplicationInstructions from "./components/Rule60ApplicationInstructions.vue";
import Rule61ApplicationInstructions from "./components/Rule61ApplicationInstructions.vue";
import Rule62ApplicationInstructions from "./components/Rule62ApplicationInstructions.vue";
import Rule63ApplicationInstructions from "./components/Rule63ApplicationInstructions.vue";
import Rule54ResponseInstructions from "./components/Rule54ResponseInstructions.vue";
import Rule58ResponseInstructions from "./components/Rule58ResponseInstructions.vue";
import Rule59ResponseInstructions from "./components/Rule59ResponseInstructions.vue";
import Rule60ResponseInstructions from "./components/Rule60ResponseInstructions.vue";
import Rule61ResponseInstructions from "./components/Rule61ResponseInstructions.vue";
import Rule63ResponseInstructions from "./components/Rule63ResponseInstructions.vue";

import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon,
        Rule20ApplicationInstructions,
        Rule54ApplicationInstructions,
        Rule57ApplicationInstructions,
        Rule58ApplicationInstructions,
        Rule59ApplicationInstructions,
        Rule60ApplicationInstructions,
        Rule61ApplicationInstructions,
        Rule62ApplicationInstructions,
        Rule63ApplicationInstructions,
        Rule54ResponseInstructions,
        Rule58ResponseInstructions,
        Rule59ResponseInstructions,
        Rule60ResponseInstructions,
        Rule61ResponseInstructions,
        Rule63ResponseInstructions
    }
})
export default class ManagingAppealProcessPg extends Vue {  

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    @form22State.Action
    public UpdateCurrentNoFeesPayableId!: (newCurrentNoFeesPayableId: string) => void

    applicationsList = [
        {text: 'adjournment', value:'adjournment'},
        {text: 'adducing fresh or new evidence', value:'adducing'},
        {text: 'to consolidate or have appeals heard together', value:'consolidate'},
        {text: 'directions', value:'directions'},
        {text: 'dismissal of appeal in chambers', value:'dismissalChambers'},
        {text: 'dismissal (other)', value:'dismissalOther'},
        {text: 'extend time to file books or documents', value:'extendOther'},
        {text: 'extend time to appeal or cross-appeal', value:'extendCrossAppeal'},
        {text: 'intervener status', value:'intervener'},       
        {text: 'payment of security', value:'security'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'objection'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'reinstate'},
        {text: 'remove appeal from the inactive list', value:'remove'},       
        {text: 'varying or cancelling an order of the registrar', value:'varying'},
        {text: 'other', value:'other'}
    ]

    responsesList = [
        {text: 'adjournment', value:'adjournment'},
        {text: 'adducing fresh or new evidence', value:'adducing'},
        {text: 'to consolidate or have appeals heard together', value:'consolidate'},
        {text: 'directions', value:'directions'},
        {text: 'dismissal of appeal in chambers', value:'dismissalChambers'},
        {text: 'dismissal (other)', value:'dismissalOther'},
        {text: 'extend time to file books or documents', value:'extendOther'},
        {text: 'extend time to appeal or cross-appeal', value:'extendCrossAppeal'},
        {text: 'intervener status', value:'intervener'},       
        {text: 'payment of security', value:'security'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'objection'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'reinstate'},
        {text: 'remove appeal from the inactive list', value:'remove'},       
        {text: 'varying or cancelling an order of the registrar', value:'varying'},
        {text: 'other', value:'other'}
    ]

    showAppIntroInfo = true;
    showUrgentInfo = false;     
    showStayApplicationsInfo = false;
    showRespIntroInfo = false;
    showForm8Info = false; 
    showForm22Info = false;
    showForm9Info = false;  
    showRespNoaLeaveInfo = false;    
    showRespNoaLeaveStayInfo = false;
    showRespVaryOrderInfo = false;
    affidavit = false;
    applications = [];
    responses = [];
    updatedApps = 0;
    updatedResps = 0;
    appStepsLength = 33;
    respStepsLength = 16;
    appUrgentSectionClass = '';
    appUrgentSectionStyle = '';
    Rule54 = [
        'adjournment', 'consolidate', 'directions', 'dismissalChambers', 
        'dismissalOther', 'extendOther', 'extendCrossAppeal', 
        'reinstate', 'remove', 'other'];
    Rule58 = ['security'];
    Rule59 = ['adducing'];
    Rule60 = ['objection'];
    Rule61 = ['intervener'];
    Rule63 = ['varying'];

    form4Button = 0;

    mounted(){
        this.affidavit = false;
        this.appStepsLength = 33;
        this.respStepsLength = 31;
    }

    public updateApps(){          
        this.appStepsLength = 33;
        this.form4Button = 0;

        if (this.getAppRules().includes('54')){
            this.appStepsLength = this.appStepsLength + 28.5;
            if (this.form4Button == 0){
                this.form4Button = 54;
            }
        }

        if (this.getAppRules().includes('58')){
            this.appStepsLength = this.appStepsLength + 37;
            if (this.form4Button == 0){
                this.form4Button = 58;
            }
        }

        if (this.getAppRules().includes('59')){
            this.appStepsLength = this.appStepsLength + 30;
            if (this.form4Button == 0){
                this.form4Button = 59;
            }
        }

        if (this.getAppRules().includes('60')){
            this.appStepsLength = this.appStepsLength + 40.75;
            if (this.form4Button == 0){
                this.form4Button = 60;
            }
        }

        if (this.getAppRules().includes('61')){
            this.appStepsLength = this.appStepsLength + 29.5;
            if (this.form4Button == 0){
                this.form4Button = 61;
            }
        }      

        if (this.getAppRules().includes('63')){
            this.appStepsLength = this.appStepsLength + 29.5;
            if (this.form4Button == 0){
                this.form4Button = 63;
            }
        }

        if (this.getAppRules().length == 2){
            this.appStepsLength = this.appStepsLength - 4;            
        }

        if (this.getAppRules().length == 3){
            this.appStepsLength = this.appStepsLength - 7;            
        }

        if (this.getAppRules().length == 4){
            this.appStepsLength = this.appStepsLength - 10;            
        }

        if (this.getAppRules().length == 5){
            this.appStepsLength = this.appStepsLength - 15;            
        }

        if (this.getAppRules().length == 6){
            this.appStepsLength = this.appStepsLength - 18;            
        }

        if (this.showAppIntroInfo){
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        }            
        
        this.updatedApps ++; 
    }

    public updateResp(){   

        this.respStepsLength = 31;

        if (this.getRespRules().includes('54')){
            this.respStepsLength = this.respStepsLength + 22;
        }

        if (this.getRespRules().includes('58')){
            this.respStepsLength = this.respStepsLength + 28;
        }

        if (this.getRespRules().includes('59')){
            this.respStepsLength = this.respStepsLength + 29;
        }

        if (this.getRespRules().includes('60')){
            this.respStepsLength = this.respStepsLength + 29;
        }
        
        if (this.getRespRules().includes('61')){
            this.respStepsLength = this.respStepsLength + 25;            
        }  

        if (this.getRespRules().includes('63')){
            this.respStepsLength = this.respStepsLength + 26;
        }

        if (this.getRespRules().length == 2){
            this.respStepsLength = this.respStepsLength - 1;            
        }

        if (this.getRespRules().length == 3){
            this.respStepsLength = this.respStepsLength - 2;            
        }

        if (this.getRespRules().length == 4){
            this.respStepsLength = this.respStepsLength - 3;            
        }

        if (this.getRespRules().length == 5){
            this.respStepsLength = this.respStepsLength - 5;            
        }

        if (this.getRespRules().length == 6){
            this.respStepsLength = this.respStepsLength - 6;            
        }


        if (this.showRespIntroInfo){
            this.$emit('adjustHeights', 3, this.respStepsLength + "rem");
        }            
        
        this.updatedResps ++; 
    }

    public getAppRules(){

        const rules = [];

        if (this.applications.some(app => this.Rule54.includes(app))){
            rules.push('54');
        }

        if (this.applications.some(app => this.Rule58.includes(app))){
            rules.push('58');
        }

        if (this.applications.some(app => this.Rule59.includes(app))){
            rules.push('59');
        }

        if (this.applications.some(app => this.Rule60.includes(app))){
            rules.push('60');
        }

        if (this.applications.some(app => this.Rule61.includes(app))){
            rules.push('61');
        }

        if (this.applications.some(app => this.Rule63.includes(app))){
            rules.push('63');
        }

        return rules;

    }

    public getRespRules(){

        const rules = [];

        if (this.responses.some(app => this.Rule54.includes(app))){
            rules.push('54');
        }

        if (this.responses.some(app => this.Rule58.includes(app))){
            rules.push('58');
        }

        if (this.responses.some(app => this.Rule59.includes(app))){
            rules.push('59');
        }

        if (this.responses.some(app => this.Rule60.includes(app))){
            rules.push('60');
        }

        if (this.responses.some(app => this.Rule61.includes(app))){
            rules.push('61');
        }

        if (this.responses.some(app => this.Rule63.includes(app))){
            rules.push('63');
        }

        return rules;

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
            this.$emit('adjustHeights', 1, "23rem");
        } else {
            this.showUrgentInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    } 

    public showStayApplications(show: boolean){
        if (show) {
            this.showStayApplicationsInfo = true;
            this.$emit('adjustHeights', 2, "30.5rem");
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
            this.$emit('adjustHeights', 4, "39.5rem");
        } else {
            this.showForm8Info = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }  
    
    public showForm22(show: boolean){
        if (show) {
            this.showForm22Info = true;
            this.$emit('adjustHeights', 5, "17rem");
        } else {
            this.showForm22Info = false;
            this.$emit('adjustHeights', 5, "0");
        }
    }

    public showForm9(show: boolean){
        if (show) {
            this.showForm9Info = true;
            this.$emit('adjustHeights', 6, "44rem");
        } else {
            this.showForm9Info = false;
            this.$emit('adjustHeights', 6, "0");
        }
    }

    public showRespNoaLeave(show: boolean){
       
       if (show) {
           this.showRespNoaLeaveInfo = true;
           this.$emit('adjustHeights', 7, "27rem");
       } else {
           this.showRespNoaLeaveInfo = false;
           this.$emit('adjustHeights', 7, "0");
       }
    }

    public showRespNoaLeaveStay(show: boolean){
       if (show) {
           this.showRespNoaLeaveStayInfo = true;
           this.$emit('adjustHeights', 8, "29rem");
       } else {
           this.showRespNoaLeaveStayInfo = false;
           this.$emit('adjustHeights', 8, "0");
       }
    }

    public showRespVaryOrder(show: boolean){
        if (show) {
            this.showRespVaryOrderInfo = true;
            this.$emit('adjustHeights', 9, "27.5rem");
        } else {
            this.showRespVaryOrderInfo = false;
            this.$emit('adjustHeights', 9, "0");
        }
    }
    
    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
    }

    public startNewForm22Document(){        
        this.UpdateCurrentNoFeesPayableId(null);
        this.$router.push({name: "start-form22" })
    }

    public startNewForm9Document(){
        this.UpdateCurrentRequisitionId(null);
        this.$router.push({name: "start-form9" })
    }

    public downloadInstructions(file_name: string){
        GetInstructionFile(file_name);
    }
    
}
</script>

<style scoped lang="scss">

</style>