<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-0" >            
            <b-col cols="11" style="text-align: left; font-weight: bold; padding:0;">
                Complete the Appeal Record and Transcript
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealRecordTranscript(!showAppealRecordTranscriptInfo)"
                    style="border-radius: 0.5rem; float: right; border: none;"                                        
                    class="p-1 bg-white">
                    <img v-if="showAppealRecordTranscriptInfo" class="bg-white"
                        src="../../../../../../public/icons/icon-minus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                    <img v-else class="bg-white"
                        src="../../../../../../public/icons/icon-plus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordTranscriptInfo" class="mt-4 ml-0 mr-5 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger" style="font-weight: bold;">60 days</span> 
                to file and serve your documents after submitting the Notice of Appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordTranscriptInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOCs or .PDFs below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row style="width: 110%;" class="my-1">
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
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%209.pdf"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                         <li>
                            <b-row style="width: 110%;" class="my-1">
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
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2013.pdf"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">PDF
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

        <b-row :class="showAppealRecordTranscriptInfo?'mt-2 ml-0': 'mt-5 ml-0'" >            
            <b-col cols="11" style="text-align: left; font-weight: bold; padding:0;">
                Were you served with a Notice of Appearance or Cross Appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoaCa(!showNoaCaInfo)"
                    style="border-radius: 0.5rem; float: right;"                                        
                    class="p-1 bg-white border-white">
                    <img v-if="showNoaCaInfo" class="bg-white"
                        src="../../../../../../public/icons/icon-minus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                    <img v-else class="bg-white"
                        src="../../../../../../public/icons/icon-plus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaCaInfo" class="mt-3 ml-2" >

            <p style="padding: 0;">
                If you are served with a copy of the respondent's Notice of Appearance or 
                Cross Appeal, you do not have to respond to these documents.
            </p>
       
        </b-row> 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
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