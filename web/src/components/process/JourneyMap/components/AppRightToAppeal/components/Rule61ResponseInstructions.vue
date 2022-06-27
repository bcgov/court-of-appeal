<template>
    <b-card no-body border-variant="white">
       
        <p style="font-size: 0.95rem; font-weight: 700;">Intervener status</p>
        <p>
            If you have been served with a notice of application and 
            you want to respond, you must complete the following:  
        </p>

        <b-row class="ml-2 mt-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 2 business days
                    </span> 
                before the application hearing date, file filed and serve 
                on each party, the application materials listed below.
            </b-col>              
        </b-row>
       
        <ol class="mt-3">
           
            
            <li class="mt-2">
                Complete the following:  
                <ul class="mt-2">
                                        
                    <li class="link-button my-2" 
                        @click="affidavit = true;"
                        target="_blank">
                        Supporting Affidavits (if any),                
                    </li>
                    <li class="link-button" 
                        @click="downloadInstructions('written-argument')"
                        target="_blank">
                        Written argument (if any)               
                    </li>
                </ul>
            </li>
            <li class="my-2">
                File the documents with the registry.
            </li>
            <li>
                Serve a copy of the document(s) to each party. 
            </li>
        </ol>  

        <b-modal size="xl" v-model="affidavit" header-class="bg-info">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Access Affidavit</h1>
            </template>
            <div class="m-3">                
                <p>
                    <b>Warning:</b> Some browsers or PDF readers do not 
                    support "PDF Fillable" forms. These forms may need 
                    to be downloaded, saved locally and then opened directly 
                    in an appropriate PDF reader in order to fill in the content.
                </p>
                <p>
                    Please see the bottom of this page for additional forms not 
                    officially numbered by the Court.
                </p>
                <p>                
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
                        target="_blank">Affidavit
                    </a> 
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="affidavit = false">Close</b-button>
            </template>
            <template v-slot:modal-header-close>
                <b-button
                    variant="outline-dark"
                    class="closeButton"
                    @click="affidavit = false"
                    >&times;
                </b-button>
            </template>
        </b-modal>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component
export default class Rule61ApplicationInstructions extends Vue {   

    affidavit = false;

    mounted(){
        this.affidavit = false;
    }

    public downloadInstructions(pdf_name){
        GetInstructionFile(pdf_name);        
    }

}

</script>

<style scoped lang="scss">

    @import "src/styles/common";

    .link-button {
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
        color: $text-color-link;
        &:hover, &:focus {
            color: $text-color-link-hover;
        }
    }

</style>
