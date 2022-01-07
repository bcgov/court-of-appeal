<template>
    <b-card class="bg-white border-white w-90">        

        <b-row class="mt-3 ml-1">            
            <div style="text-align: left; font-weight: bold;">
                Notice of Application for Leave to Appeal
            </div>            
        </b-row>

        <b-row class="mt-4 ml-1 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" class="warning-message-column pl-0">
                File the document below 
                <span class="text-danger font-weight-bold">within 30 days
                </span> 
                of the decision you want to appeal.
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Complete the online form below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-125">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)"
                                        target="_blank">Notice of Application for Leave to Appeal
                                    </a>                                    
                                </b-col>
                                <b-col cols="2" >
                                    4 copies
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%201.docx"
                                        target="_blank"                                                                                
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form1.pdf"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary form-download-button">PDF
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

        <b-row class="mt-4 ml-1 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" class="warning-message-column pl-0">
                File Affidavit of Service <span class="text-danger font-weight-bold">within 10 days</span> 
                of serving all respondents.
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 113%;" class="my-1">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Affidavit of Service
                                    </a>
                                    <b-icon-question-circle-fill 
                                        class="text-primary"
                                        v-b-tooltip.hover.noninteractive
                                        title="To prove that you served the Notice of Application for Leave to Appeal, file an affidavit of service."/>
                                </b-col>
                                <b-col cols="2">
                                    1 copy
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
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
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row>                
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class InitialDocumentsAppApplyLeavePg extends Vue {  
    


}
</script>

<style scoped lang="scss">



</style>