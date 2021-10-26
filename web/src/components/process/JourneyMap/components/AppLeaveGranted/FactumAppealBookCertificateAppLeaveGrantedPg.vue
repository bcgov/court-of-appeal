<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-0">            
            <b-col cols="11" style="text-align: left; font-weight: bold;">
                Complete the Factum, Appeal Book and Certificate of Readiness
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showFactum(!showFactumInfo)"
                    style="border-radius: 0.5rem; float: right; border: none;"                                        
                    class="p-1 bg-white">
                    <img v-if="showFactumInfo" class="bg-white"
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

        <b-row v-if="showFactumInfo" class="mt-4 ml-1 mr-5 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger" style="font-weight: bold;">30 days</span> 
                to file and serve your documents after filing your Appeal Record.
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOCs or .PDFs below. Click on the document names for more information.
                    <ul>
                        <li>
                            <b-row style="width: 110%;" class="my-1">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.7-write-your-factum?ct=t(step-index-link)"
                                        target="_blank">Factum
                                    </a>                                    
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_Final.dotx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_respondent_Final.pdf"
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
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.9-preparing-the-transcript-extract-book?ct=t(step-index-link)"
                                        target="_blank">Optional - Transcript Extract Book
                                    </a>
                                    <b-icon-question-circle-fill 
                                        class="text-primary"
                                        v-b-tooltip.hover.noninteractive
                                        title="If a witness spoke at your original trial or hearing, 
                                                and you mentioned this oral testimony in your Factum, 
                                                you will need to complete a Transcript Extract Book."/>                                    
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form13.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2013.pdf"
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
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.6-put-together-your-appeal-book?ct=t(step-index-link)"
                                        target="_blank">Appeal Book
                                    </a>                                                                     
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.pdf"
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
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.11-prepare-and-file-a-certificate-of-readiness?ct=t(sidebar-link)"
                                        target="_blank">Certificate of Readiness
                                    </a>                                                                     
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.pdf"
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


        <b-row :class="showFactumInfo?'mt-2 ml-0':'mt-4 ml-0'" style="padding-top: 0.85rem;">            
            <b-col cols="11" style="text-align: left; font-weight: bold;">
                Were you served with a respondent's Factum?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespondentFactum(!showRespondentFactumInfo)"
                    style="border-radius: 0.5rem; float: right;"                                        
                    class="p-1 bg-white border-white">
                    <img v-if="showRespondentFactumInfo" class="bg-white"
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

        <b-row v-if="showRespondentFactumInfo" class="mt-4 ml-1 mr-5 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger" style="font-weight: bold;">7 days</span> 
                to file and serve your documents.
            </b-col>           
        </b-row>

        <b-row v-if="showRespondentFactumInfo" class="mt-2 ml-3" >            

            <ol class="mt-1 ml-0 p-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 110%;" class="my-1">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.8-replies?ct=t(sidebar-link)"
                                        target="_blank">Reply
                                    </a>                                    
                                </b-col>
                                <b-col class="pl-0" cols="2">
                                    4 copies
                                </b-col>
                                <b-col class="pl-0" cols="1" >
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2011.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col class="pl-0" cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2011.pdf"
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

        <b-row :class="showRespondentFactumInfo?'mt-2 ml-0': 'mt-4 ml-0'" :style="showRespondentFactumInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" style="text-align: left; font-weight: bold;">
                Were you served with a respondent's Transcript Extract Book or Appeal Book?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespondentTranscript(!showRespondentTranscriptInfo)"
                    style="float: right;"                                        
                    class="p-1 bg-white border-white">
                    <img v-if="showRespondentTranscriptInfo" class="bg-white"
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

        <b-row v-if="showRespondentTranscriptInfo" class="mt-2 ml-3" >
            <p style="padding: 0;">
                If you are served with a copy of the respondent's Transcript Extract Book or Appeal Book, you do not have to respond.
            </p>       
        </b-row>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class FactumAppealBookCertificateAppLeaveGrantedPg extends Vue {

    showFactumInfo = true;
    showRespondentFactumInfo = false;    
    showRespondentTranscriptInfo = false;

    public showFactum(show: boolean){
        if (show) {
            this.showFactumInfo = true;
            this.$emit('adjustHeights', 0, "20rem");
        } else {
            this.showFactumInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showRespondentFactum(show: boolean){
        if (show) {
            this.showRespondentFactumInfo = true;
            this.$emit('adjustHeights', 1, "14rem");
        } else {
            this.showRespondentFactumInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

     public showRespondentTranscript(show: boolean){
        if (show) {
            this.showRespondentTranscriptInfo = true;
            this.$emit('adjustHeights', 2, "3rem");
        } else {
            this.showRespondentTranscriptInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

}
</script>

<style scoped lang="scss">



</style>