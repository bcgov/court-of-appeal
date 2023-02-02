<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
             
            <b-col cols="11" class="step-title-column pl-0">
                Apply for Leave to Cross Appeal
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
            <resp-apply-cross-appeal-instructions />
            
            <b style="text-decoration: underline; padding: 0 0.5rem 0 0;">NOTE:</b> Every appeal process is unique. If you have any questions, please visit the 
            <a 
                href="http://www.courtofappealbc.ca/civil-family-law/guidebook-for-appellants/deciding-to-appeal" 
                target="_blank"
                style="padding: 0 0.5rem 0 0;">Online Guidebook,
            </a>the  
            <a 
                href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a" 
                target="_blank"
                style="padding: 0 0.5rem 0 0.5rem;">Court of Appeal Rules
            </a> or 
            <a 
                href="mailto:courts.cso@gov.bc.ca"
                style="padding: 0 0.5rem 0 0.5rem;"> contact the registry
            </a>.           
        </b-row> 

        <b-row :class="showIntroInfo?'mt-3':'mt-4'" style="padding-top: 0.5rem;">            
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
                            <b-row class="my-1 w-105">
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
                            <b-row class="my-1 w-105">
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

        <b-row :class="showNoaLeaveInfo?'mt-1':'mt-4'" style="padding-top: 0.5rem;">            
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
                            <b-row class="my-1 w-105">
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
                            <b-row class="my-1 w-105">
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
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import appApplyLeaveInstructions from "@/components/process/AppealProcess/pathwayInstructions/appApplyLeaveInstructions.vue";
import respApplyCrossAppealInstructions from "@/components/process/AppealProcess/pathwayInstructions/respApplyCrossAppealInstructions.vue";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");


import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon,
        appApplyLeaveInstructions,
        respApplyCrossAppealInstructions
    }
})
export default class NeedToApplyLeaveToCrossAppeal extends Vue {    

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void    
    
    showIntroInfo = true;  
    showNoaLeaveInfo = false;    
    showNoaLeaveStayInfo = false;
    
    public showIntro(show: boolean){
        if (show) {
            this.showIntroInfo = true;
            this.$emit('adjustHeights', 0, "19rem");
        } else {
            this.showIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showNoaLeave(show: boolean){
        if (show) {
            this.showNoaLeaveInfo = true;
            this.$emit('adjustHeights', 1, "30rem");
        } else {
            this.showNoaLeaveInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showNoaLeaveStay(show: boolean){
        if (show) {
            this.showNoaLeaveStayInfo = true;
            this.$emit('adjustHeights', 2, "29rem");
        } else {
            this.showNoaLeaveStayInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
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