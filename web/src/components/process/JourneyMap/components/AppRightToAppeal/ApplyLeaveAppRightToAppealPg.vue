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
            <app-apply-leave-instructions/>
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

        <b-row :class="showIntroInfo?'mt-0':'mt-4'" style="padding-top: 0.65rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Notice of Motion and Motion Book
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showMotion(!showMotionBookInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showMotionBookInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showMotionBookInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have 
                    <span 
                        class="text-danger font-weight-bold">30 days
                    </span> 
                to file the documents below after filing your Notice of Application for Leave 
                to Appeal. Next, serve each respondent with a copy
                    <span 
                        class="text-danger font-weight-bold">at least 10 business days
                    </span>
                before the hearing.
            </b-col>              
        </b-row>

        <b-row v-if="showMotionBookInfo" class="mt-4" >            

           <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)"
                                        target="_blank">Notice of Motion
                                    </a>
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/form%203.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form3.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)"
                                        target="_blank">Motion Book
                                    </a>
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%204.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%204.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>
                <li>
                    File the indicated number of copies with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>      
        </b-row> 

        <b-row :class="showMotionBookInfo?'mt-3': 'mt-4'" :style="showMotionBookInfo?'':'padding-top: 0.85rem;'">            
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
                File the document below 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">within 7 days
                    </span> 
                of the decision denying leave to appeal.
            </b-col>     
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-4">
             <ol>
                <li>
                    Complete either the .DOCs or .PDFs below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">                                    
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Notice of Application to Vary
                                    </a>                                    
                                </b-col>
                                <b-col cols="2" >
                                    6 copies
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2015.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form15.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    Affidavit                                                                        
                                </b-col>
                                <b-col cols="2" >
                                    6 copies
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>
                <li>
                    File the indicated number of copies with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Prepare a Motion Book
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
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 113%;" class="my-1">
                                <b-col cols="8">                                    
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Motion Book to Vary
                                    </a>
                                </b-col>
                                <b-col cols="2">
                                    6 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2016.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2016.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>                        
                    </ul>
                </li>
                <li>
                    File the indicated number of copies with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row>  

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Next, Ask the court registrar to set a date for hearing your application and advise 
                the respondent(s) of the scheduled date.
            </div>            
        </b-row>

        <b-row v-if="showDecisionOnLeaveInfo" class="mt-3">
            <app-leave-refused-final-instructions/>
        </b-row>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import appApplyLeaveInstructions from "@/components/process/AppealProcess/pathwayInstructions/appApplyLeaveInstructions.vue";
import appLeaveRefusedFinalInstructions from "@/components/process/AppealProcess/pathwayInstructions/appLeaveRefusedFinalInstructions.vue";

@Component({
    components:{
        ExpandIcon,
        appApplyLeaveInstructions,
        appLeaveRefusedFinalInstructions
    }
})
export default class ApplyLeaveAppRightToAppealPg extends Vue {

    showIntroInfo = true;  
    showMotionBookInfo = false;    
    showDecisionOnLeaveInfo = false;
    transcriptExtractBookHelpText = '<div>If a witness spoke at your original trial or hearing, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.</div>';

    public showIntro(show: boolean){
        if (show) {
            this.showIntroInfo = true;
            this.$emit('adjustHeights', 0, "10rem");
        } else {
            this.showIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showMotion(show: boolean){
        if (show) {
            this.showMotionBookInfo = true;
            this.$emit('adjustHeights', 1, "17rem");
        } else {
            this.showMotionBookInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

     public showDecisionOnLeave(show: boolean){
        if (show) {
            this.showDecisionOnLeaveInfo = true;
            this.$emit('adjustHeights', 2, "50rem");
        } else {
            this.showDecisionOnLeaveInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

}
</script>

<style scoped lang="scss">



</style>