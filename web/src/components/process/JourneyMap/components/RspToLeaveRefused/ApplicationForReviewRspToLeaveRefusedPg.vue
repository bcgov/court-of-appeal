<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3 ml-0">            
            <div style="text-align: left; font-weight: bold;">
                Were you served with a Notice of Motion for Leave to Appeal and a Motion Book?
            </div>            
        </b-row>     

        <b-row class="mt-4 ml-0 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2" scale="2"/>
            </b-col>
            <b-col cols="11" class="warning-message-column pl-0">
                File and then serve a Reply Book <span class="text-danger font-weight-bold">at least 5 days </span> 
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
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)"
                                        target="_blank">Reply Book
                                    </a>                                    
                                </b-col>
                                <b-col cols="2">
                                    4 copies
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%205.doc"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%205.pdf"
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


        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ApplicationForReviewRspToLeaveRefusedPg extends Vue {


}
</script>

<style scoped lang="scss">


</style>