<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Complete the Appeal Record and Transcript
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealRecordTranscript(!showAppealRecordTranscriptInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppealRecordTranscriptInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordTranscriptInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger font-weight-bold">60 days</span> 
                to file and serve your appeal record and transcript 
                after filing the Notice of Appeal. If leave is required, 
                you have <span class="text-danger font-weight-bold">60 days</span>
                after leave to appeal is granted.
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordTranscriptInfo" class="mt-4" >
            <ol>
                <li>
                    An appeal record must be completed in accordance with the Completion Instructions.
                    <ul>
                        <li>
                            Appeal Record
                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-appeal-record')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                     
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8">
                                            Paper Completion Instructions                                                                       
                                        </b-col>
                                        <b-col cols="2"></b-col>                               
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('paper-appeal-record')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                    
                                        </b-col>
                                    </b-row>
                                </li>
                                
                            </ul>
                        </li>                        
                    </ul>
                </li>
                <li>
                    Unless a justice or registrar otherwise orders, a book of transcripts must 
                    contain the following:
                    <ul>
                        <li>
                            transcripts of all oral testimony, if any was given                            
                        </li>
                        <li>
                            transcripts other than testimony if they necessary 
                            to resolve the issues under appeal                            
                        </li>                       
                    </ul>
                    <p class="mt-2">
                        Transcripts that are filed in the court must be prepared by an official 
                        reporter from the official record of the court appealed from and in 
                        accordance with the British Columbia Transcription Manual.
                    </p>
                    <p>
                        If an appellant has the agreement of the other parties, they 
                        may exclude any portion of a transcript from a book of transcripts.
                    </p>
                </li>
                <li>
                    File with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showAppealRecordTranscriptInfo?'mt-2': 'mt-5'" >            
            <b-col cols="11" class="pl-0" style="text-align: left; font-weight: bold;">
                Were you served with a Notice of Appearance or Cross Appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoaCa(!showNoaCaInfo)"   
                    class="p-1 bg-white border-white expand-steps-button">                   
                    <expand-icon v-bind:showExpanded="showNoaCaInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaCaInfo" class="mt-3 ml-1" >

            <p style="padding: 0;">
                If you are served with a copy of the respondent's Notice of Appearance or 
                Cross Appeal, you do not have to respond to these documents.
            </p>
       
        </b-row> 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon
    }
})
export default class AppealRecordTranscriptAppRightToAppealPg extends Vue {

    
    showAppealRecordTranscriptInfo = true;
    showNoaCaInfo = false;
    transcriptExtractBookHelpText = '<div>If a witness spoke at your original trial, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.</div>';

    public showAppealRecordTranscript(show: boolean){
        if (show) {
            this.showAppealRecordTranscriptInfo = true;
            this.$emit('adjustHeights', 0, "33rem")
        } else {
            this.showAppealRecordTranscriptInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showNoaCa(show: boolean){
        if (show) {
            this.showNoaCaInfo = true;
            this.$emit('adjustHeights', 1, "4rem");
        } else {
            this.showNoaCaInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }        
    }

    public downloadInstructions(pdf_name){

        GetInstructionFile(pdf_name);
        
    }

}
</script>

<style scoped lang="scss">



</style>