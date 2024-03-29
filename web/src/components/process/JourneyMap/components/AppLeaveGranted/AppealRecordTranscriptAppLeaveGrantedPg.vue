<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3" >            
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
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger font-weight-bold">60 days</span> 
                to file and serve your documents after submitting the Notice of Appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordTranscriptInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOCs or .PDFs below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(sidebar-link)"
                                        target="_blank">Appeal Record
                                    </a>                                   
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%209.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%209.pdf"
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
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.5-obtain-and-file-a-transcript-if-necessary?ct=t(sidebar-link)"
                                        target="_blank">Optional - Transcript
                                    </a>
                                    <b-icon-question-circle-fill 
                                        class="text-primary"
                                        v-b-tooltip.hover.noninteractive
                                        title="If a witness spoke at your original trial, and you mentioned 
                                        this oral testimony in your Factum, you will need to complete 
                                        a Transcript Extract Book."/>                                    
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form13.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2013.pdf"
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

        <b-row :class="showAppealRecordTranscriptInfo?'mt-1': 'mt-4'" :style="!showAppealRecordTranscriptInfo?'padding-top: 0.85rem;':''">            
            <b-col cols="11" class="step-title-column pl-0">
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

        <b-row v-if="showNoaCaInfo" class="mt-3">

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

@Component({
    components:{
        ExpandIcon
    }
})
export default class AppealRecordTranscriptAppLeaveGrantedPg extends Vue {
    
    showAppealRecordTranscriptInfo = true;
    showNoaCaInfo = false;

    public showAppealRecordTranscript(show: boolean){
        if (show) {
            this.showAppealRecordTranscriptInfo = true;
            this.$emit('adjustHeights', 0, "15rem")
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

}
</script>

<style scoped lang="scss">



</style>