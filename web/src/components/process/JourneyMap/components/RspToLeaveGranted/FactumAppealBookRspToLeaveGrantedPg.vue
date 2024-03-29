<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                The Factum and Appeal Book
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showFactum(!showFactumInfo)"                                      
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showFactumInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger font-weight-bold">30 days</span> 
                to file and serve your documents.
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.9-write-your-argument?ct=t(step-index-link)"
                                        target="_blank">Factum
                                    </a>                                    
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_respondent_Final.dotx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_respondent_Final.pdf"
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
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.10-the-appellant-may-serve-a-transcript-extract-book?ct=t(step-index-link)"
                                        target="_blank">Optional - Transcript Extract Book
                                    </a>
                                    <b-icon-question-circle-fill 
                                        class="text-primary"
                                        v-b-tooltip.hover.noninteractive
                                        v-b-tooltip.hover.html="transcriptExtractBookHelpText"/>                                   
                                                                   
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
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.8-the-appellant-serves-an-appeal-book?ct=t(step-index-link)"
                                        target="_blank">Optional - Appeal Book
                                    </a> 
                                    <b-icon-question-circle-fill 
                                        class="text-primary"
                                        v-b-tooltip.hover.noninteractive
                                        v-b-tooltip.hover.html="appealBookHelpText"/>
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.pdf"
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
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showFactumInfo?'mt-2': 'mt-4'" :style="showFactumInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                The Transcript Extract Book
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showTranscript(!showTranscriptInfo)"                
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showTranscriptInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showTranscriptInfo" class="mt-2" >
            <p style="padding: 0;">
                If you are served with the appellant's Transcript Extract Book, you do not have to respond to this document.
            </p>       
        </b-row> 

        <b-row class="mt-4" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                The Certificate of Readiness
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showCertificate(!showCertificateInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showCertificateInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showCertificateInfo" class="mt-2" >

            <p style="padding: 0;">
                You should have received the appellant's Certificate of Readiness immediately after receiving the Factum. 
                If you have not received the Certificate of Readiness, contact the appellant or the registry to see if 
                one has been filed. If a Certificate of Readiness has not been filed, and you would like the appeal to 
                proceed, you are responsible for completing the Certificate of Readiness and submitting it immediately 
                after your Factum.
            </p>

            <ol class="mt-1 p-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row style="width: 112%;" class="my-1">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.12-if-the-appellant-does-not-prepare-a-certificate-of-readiness?ct=t(sidebar-link)"
                                        target="_blank">The Certificate of Readiness
                                    </a>                                    
                                </b-col>
                                <b-col class="pl-0" cols="2">
                                    4 copies
                                </b-col>
                                <b-col class="pl-0" cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col class="pl-0" cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form14.pdf"
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
                    Serve one copy to each party.
                </li>
            </ol>       
        </b-row>  

        <b-row :class="showCertificateInfo?'': 'mt-4'" :style="showCertificateInfo?'padding-top: 0;':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                A Reply to your Factum
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showReply(!showReplyInfo)"                                        
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showReplyInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showReplyInfo" class="mt-2" >
            <p style="padding: 0;">
                If you are served with the appellant's Reply to your Factum, you do not have to respond to this document.
            </p>       
        </b-row> 

        <b-row class="mt-3" :style="showReplyInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                A Notice of Hearing
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNotice(!showNoticeInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoticeInfo"></expand-icon>
                </b-button>                
            </b-col>           
        </b-row>

        <b-row v-if="showNoticeInfo" class="mt-1">
            <p style="padding: 0;">
                You should be served a Notice of Hearing from the appellant, 
                which will tell you the date and length of your hearing. However, 
                if you were the one who submitted the Certificate of Readiness, 
                please click the link for more information:
            </p>
            <p class="ml-1">
                <a 
                    href="https://www.courtofappealbc.ca/respondent-guidebook/2.3-schedule-the-appeal-for-hearing?ct=t(step-index-link)"
                    target="_blank">Schedule the appeal for hearing
                </a> 
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
export default class FactumAppealBookRspToLeaveGrantedPg extends Vue {

    showFactumInfo = true;
    showTranscriptInfo = false;    
    showCertificateInfo = false;
    showReplyInfo = false;
    showNoticeInfo = false;   
    
    appealBookHelpText = '<div>If you would like to provide information that is not included in the appellant’s Appeal Book, please complete your own Appeal Book.</div>';
    transcriptExtractBookHelpText = '<div>If a witness spoke at your original trial or hearing, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.</div>';

    public showFactum(show: boolean){
        if (show) {
            this.showFactumInfo = true;
            this.$emit('adjustHeights', 0, "17rem");
        } else {
            this.showFactumInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showTranscript(show: boolean){
        if (show) {
            this.showTranscriptInfo = true;
            this.$emit('adjustHeights', 1, "3rem");
        } else {
            this.showTranscriptInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

     public showCertificate(show: boolean){
        if (show) {
            this.showCertificateInfo = true;
            this.$emit('adjustHeights', 2, "16rem");
        } else {
            this.showCertificateInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showReply(show: boolean){
        if (show) {
            this.showReplyInfo = true;
            this.$emit('adjustHeights', 3, "2rem");
        } else {
            this.showReplyInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public showNotice(show: boolean){
        if (show) {
            this.showNoticeInfo = true;
            this.$emit('adjustHeights', 4, "8rem");
        } else {
            this.showNoticeInfo = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }  

}
</script>

<style scoped lang="scss">

</style>