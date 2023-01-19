<template>
    <div>
        <span class="text-primary" style='font-size:1.4rem;'>Upload Documents:</span>        
        <p>
            Upload your documents and select the document description for 
            the document. You can upload multiple documents, but there is 
            a maximum file size of 10 MB. If you have a larger sized document 
            to upload, you will need to use the 
            <a  href="https://justice.gov.bc.ca/cso/index.do"
                target="_blank">Court Services Online website
            </a>
            to submit the document.
        </p> 
        <p class="font-italic">
            <b>Note:</b> Instructions for submitting larger size files can be found here – 
            <a  href="https://justice.gov.bc.ca/pdfs/cso/InstructionsforLargeDocumentSubmissionviaCSOforCourtofAppeal_apr_2021.pdf"
                target="_blank">Large document upload
            </a>
            .
        </p>
        <ul class="mt-4 ml-n3">            
            <div class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
                <div style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
            </div>
        </ul>
        
        <ul class="mt-5">
            <li>Upload the documents below:</li>
        </ul>

        <b-modal size="xl" v-model="showGetHelpScanning" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Scanning Documents</h1> 
            </template>
            <get-help-scanning/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpScanning=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpScanning=false">&times;</b-button>
            </template>
        </b-modal>
       
    </div> 
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import GetHelpScanning from "./GetHelpScanning.vue";

@Component({
    components:{        
        GetHelpScanning,
    }
}) 
export default class UploadDocumentHeader extends Vue {

    showGetHelpScanning = false;

}
</script>