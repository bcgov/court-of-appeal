<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3 ml-0">            
            <div style="text-align: left; font-weight: bold;">
                Complete the Notice of Hearing
            </div>            
        </b-row>

        <b-row class="mt-4 ml-0 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger font-weight-bold">2 months</span> to file and serve your document after submitting the Certificate of Readiness.
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
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.13-prepare-and-file-a-notice-of-hearing?ct=t(step-index-link)"
                                        target="_blank">Notice of Hearing
                                    </a>
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2034.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form34.pdf"
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
export default class NoticeOfHearingAppRightToAppealPg extends Vue {

}
</script>

<style scoped lang="scss">



</style>