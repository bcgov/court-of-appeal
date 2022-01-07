<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3 ml-1">            
            <div style="text-align: left; font-weight: bold;">
                Notice of Motion and Motion Book
            </div>            
        </b-row>

        <b-row class="mt-4 ml-1 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">30 days
                    </span> 
                to file the documents below after filing your Notice of Application for Leave 
                to Appeal. Next, serve each respondent with a copy
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">at least 10 business days
                    </span>
                before the hearing.
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
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
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class HearingDocumentsMotionAppApplyLeavePg extends Vue {

}
</script>

<style scoped lang="scss">



</style>