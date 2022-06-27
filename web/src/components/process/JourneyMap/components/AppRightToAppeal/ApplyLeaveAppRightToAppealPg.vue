<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Apply for Leave to Appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showIntro(!showIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showIntroInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showIntroInfo" class="mt-4">
            <app-apply-leave-instructions v-bind:app="app"/>
            <p>
                Every appeal process is unique. If you have any questions, please visit the 
                <a 
                    href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal" 
                    target="_blank">Online Guidebook
                </a> or 
                <a 
                    href="mailto:courts.cso@gov.bc.ca">contact the registry
                </a>.
            </p>           
        </b-row> 

        <b-row :class="showIntroInfo?'mt-0':'mt-4'" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Notice of Application and Application Book – Leave to Appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoaLeave(!showNoaLeaveInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoaLeaveInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaLeaveInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have 
                    <span 
                        class="text-danger font-weight-bold">30 days
                    </span> 
                to file and serve the documents below after filing your 
                Notice of Appeal or Notice of Cross Appeal form.<br/>
                You must obtain an application hearing date that is 
                    <span 
                        class="text-danger font-weight-bold">at least 10 business days
                    </span>
                after the application for leave to appeal is filed and served.
            </b-col>              
        </b-row>

        <b-row v-if="showNoaLeaveInfo" class="mt-4" >            

           <ol>
               <li>
                    Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
                </li>
                <li class="my-2">
                    Complete either the Online form or the .PDF. Click the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-125">
                                <b-col cols="4" style="font-weight: 700;">
                                    Notice of Application – Form 4                                    
                                </b-col>                                
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="startNewForm4Document"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    <!-- <b-button
                                        href=""
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                     -->
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-2">
                            <b-row class="my-1 w-125">
                                <b-col cols="4" style="font-weight: 700;">
                                    Application Book for Leave                                    
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
                <li class="mt-3">
                    File the Notice of Application and Application Book with the registry.
                </li>
                <li class="mt-2">
                    Serve one copy to each party.
                </li>
            </ol>      
        </b-row> 

        <b-row :class="showNoaLeaveInfo?'mt-1':'mt-4'" style="padding-top: 0.65rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Notice of Application and Application Book – Leave to Appeal and Stay
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoaLeaveStay(!showNoaLeaveStayInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoaLeaveStayInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaLeaveStayInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have 
                    <span class="text-danger font-weight-bold">
                        at least 10 days before the application hearing date,
                    </span> and 
                    <span class="text-danger font-weight-bold">
                        not more than 30 days after filing the notice of application.
                    </span>                
            </b-col>              
        </b-row>

        <b-row v-if="showNoaLeaveStayInfo" class="mt-4" >            
            File and serve the documents below after filing
           <ol class="mt-2">
                <li>
                    Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
                </li>
                <li class="my-2">
                    Complete either the Online form or the .PDF. Click the document name for more information.
                    <ul>
                         <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="4" style="font-weight: 700;">
                                    Notice of Application – Form 4                                    
                                </b-col>                                
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="startNewForm4Document"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    <!-- <b-button
                                        href=""
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                     -->
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-2">
                            <b-row class="my-1 w-110">
                                <b-col cols="4" style="font-weight: 700;">
                                    Application Book for Leave to Appeal and Stay                                    
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
                <li class="my-3">
                    File the Notice of Application and Application Book with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>      
        </b-row>

        <b-row class="mt-3" :style="showNoaLeaveStayInfo?'padding-top: 0;':'padding-top: 1.2rem;'">            
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
                If you have been served with a Notice of Application 
                for Leave to Appeal, and you wish to respond, you must 
                apply for leave to appeal from the court. Follow the 
                steps below to complete the process.
            </p>
            <p>
                Every appeal process is unique. If you have any questions, please visit the 
                <a 
                    href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal" 
                    target="_blank">Online Guidebook
                </a> or 
                <a 
                    href="mailto:courts.cso@gov.bc.ca">contact the registry
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

        <b-row :class="showRespNoaLeaveInfo?'mt-2':'mt-4'" style="padding-top: 0.5rem;">            
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
                    href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal" 
                    target="_blank">Online Guidebook
                </a> or 
                <a 
                    href="mailto:courts.cso@gov.bc.ca">contact the registry
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

        <b-row :class="showRespNoaLeaveStayInfo?'mt-0': 'mt-4'" :style="showRespNoaLeaveStayInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Was your leave to appeal granted or refused?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showDecisionOnLeave(!showDecisionOnLeaveInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                   
                    <expand-icon v-bind:showExpanded="showDecisionOnLeaveInfo"></expand-icon>
                </b-button>                
            </b-col>           
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-2" >
            <p style="padding: 0;">
                If your leave to appeal was granted, you may continue to the next 
                step (Appeal Record and Transcript)                
            </p> 

            <div style="text-align: left; ">
                If your application for leave to appeal is denied, you may want to bring an application to vary that decision.
            </div>
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3 bg-warning warning-message-row" >
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                File and serve the documents below 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">within 7 days
                    </span> 
                of the decision denying leave to appeal.
            </b-col>     
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-4">
            <ol class="mt-3">
                <li>
                    Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
                </li>
                <li>
                    Complete the documents below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-145">
                                <b-col cols="4">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Notice of Application to Vary
                                    </a>
                                </b-col>                                
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="startNewForm8Document"
                                        target="_blank" 
                                        style="width: 80%;"                                                                               
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                                <b-col class="p-0" cols="3">                                   
                                </b-col>
                            </b-row>
                        </li>
                        <li class="link-button" 
                            @click="affidavit = true;"
                            target="_blank">
                            Supporting Affidavit (if any),                
                        </li> 
                        <li class="link-button" 
                            @click="downloadInstructions('written-argument')"
                            target="_blank">
                            Written argument (if any)               
                        </li>                        
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the document(s) and each attached order to each party.
                </li>
            </ol>
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Prepare Application Book
            </div>            
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">14 days
                    </span> 
                to file the document below after filing a notice of application to vary the order 
                denying you leave to appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-4" >
            <ol>
                <li>
                    Complete the following using the Completion Instructions. Please note that you must submit 
                    the book in a pdf format. Click the document name for more information.
                    <ul>
                        
                        <li>                            
                            <b-row class="my-1 w-110">
                                <b-col cols="4">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Application Book
                                    </a>                                 
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
                    </ul>
                </li>
                <li>
                    File the Application Book with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row>          

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3">
            <app-leave-refused-final-instructions/>
        </b-row>

        <b-row :class="showDecisionOnLeaveInfo?'mt-0':'mt-4'" style="padding-top: 0.75rem;">            
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
                and an application book, and you can complete the steps below to respond:
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
                            Supporting Affidavits (if any),                
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
                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import appApplyLeaveInstructions from "@/components/process/AppealProcess/pathwayInstructions/appApplyLeaveInstructions.vue";
import appLeaveRefusedFinalInstructions from "@/components/process/AppealProcess/pathwayInstructions/appLeaveRefusedFinalInstructions.vue";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon,
        appApplyLeaveInstructions,
        appLeaveRefusedFinalInstructions
    }
})
export default class ApplyLeaveAppRightToAppealPg extends Vue {

    @Prop({required: true})
    app!: boolean;

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
    
    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    showIntroInfo = true;  
    showNoaLeaveInfo = false;    
    showNoaLeaveStayInfo = false;
    showRespNoaLeaveInfo = false;    
    showRespNoaLeaveStayInfo = false;
    showDecisionOnLeaveInfo = false;
    showRespVaryOrderInfo = false;
    transcriptExtractBookHelpText = '<div>If a witness spoke at your original trial or hearing, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.</div>';
    affidavit = false;

    mounted(){
        this.affidavit = false;
    }
    
    public showIntro(show: boolean){
        if (show) {
            this.showIntroInfo = true;
            this.$emit('adjustHeights', 0, "14rem");
        } else {
            this.showIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showNoaLeave(show: boolean){
        if (show) {
            this.showNoaLeaveInfo = true;
            this.$emit('adjustHeights', 1, "24.5rem");
        } else {
            this.showNoaLeaveInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showNoaLeaveStay(show: boolean){
        if (show) {
            this.showNoaLeaveStayInfo = true;
            this.$emit('adjustHeights', 2, "24.5rem");
        } else {
            this.showNoaLeaveStayInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showRespNoaLeave(show: boolean){
        if (show) {
            this.showRespNoaLeaveInfo = true;
            this.$emit('adjustHeights', 3, "26rem");
        } else {
            this.showRespNoaLeaveInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public showRespNoaLeaveStay(show: boolean){
        if (show) {
            this.showRespNoaLeaveStayInfo = true;
            this.$emit('adjustHeights', 4, "26rem");
        } else {
            this.showRespNoaLeaveStayInfo = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }

    public showDecisionOnLeave(show: boolean){
        if (show) {
            this.showDecisionOnLeaveInfo = true;
            this.$emit('adjustHeights', 5, "52rem");
        } else {
            this.showDecisionOnLeaveInfo = false;
            this.$emit('adjustHeights', 5, "0");
        }
    }

    public showRespVaryOrder(show: boolean){
        if (show) {
            this.showRespVaryOrderInfo = true;
            this.$emit('adjustHeights', 6, "25rem");
        } else {
            this.showRespVaryOrderInfo = false;
            this.$emit('adjustHeights', 6, "0");
        }
    }

    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

    public downloadInstructions(file_name: string){
        GetInstructionFile(file_name);
    }
        

}
</script>

<style scoped lang="scss">

    @import "src/styles/common";

    .link-button {
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
        color: $text-color-link;
        &:hover, &:focus {
            color: $text-color-link-hover;
        }
    }

</style>