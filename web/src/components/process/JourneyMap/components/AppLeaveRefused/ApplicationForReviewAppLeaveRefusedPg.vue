<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Notice of Application to Vary and Affidavit
            </div>            
        </b-row>
        <b-row class="mt-1">            
            <div style="text-align: left; ">
                If your application for leave to appeal is denied, you may want to bring an application to vary that decision.
            </div>            
        </b-row>  

        <b-row class="mt-3 bg-warning warning-message-row">
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

        <b-row class="mt-4" >
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

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Prepare a Motion Book
            </div>            
        </b-row>

        <b-row class="mt-4 bg-warning warning-message-row">
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

        <b-row class="mt-4" >
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

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Next, Ask the court registrar to set a date for hearing your application and advise 
                the respondent(s) of the scheduled date.
            </div>            
        </b-row>  
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ApplicationForReviewAppLeaveRefusedPg extends Vue {


}
</script>

<style scoped lang="scss">

</style>