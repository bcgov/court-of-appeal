<template>
    <b-card no-body border-variant="white">
       
        <p style="font-size: 0.95rem; font-weight: 700;">Payment of security</p>
        <p>
            If you have been served with a notice of application for payment 
            into court of security under section 34 of the Court of Appeal Act 
            and you want to respond, you must complete the following:  
        </p>       
        
        <b-row class="mt-2 ml-1 mr-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 2 business days
                    </span> 
                before the application hearing date, file and serve on each party, 
                the application materials listed below.
            </b-col>              
        </b-row>

        <ol class="mt-3">
            <li class="mt-2">
                Complete in a .PDF format. Click the document name for more information.  
                <ul class="mt-2">                    
                    <li class="my-2">
                        Response Book (as per completion instructions)
                    </li>
                    <li>
                        <a 
                            href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
                            target="_blank">Supporting Affidavits (if any),
                        </a>  
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
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component
export default class Rule58ApplicationInstructions extends Vue {      

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
