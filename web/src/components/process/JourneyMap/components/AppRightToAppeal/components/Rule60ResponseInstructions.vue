<template>
    <b-card no-body border-variant="white">

        <p style="font-size: 0.95rem; font-weight: 700;">Quashing an appeal or raising a preliminary objection</p>
        
        <p>
            If you are served with an application to quash an appeal or raise a preliminary 
            objection and you want to respond, you must complete the following:   
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
                before the application hearing date, file and serve on each 
                party, the application materials listed below.
            </b-col>              
        </b-row>
       
        <ol class="mt-3">            
            
            <li class="mt-2">
                Complete in a .PDF format. Click the document name for more information.  
                <ul class="mt-2">                    
                    <li class="my-2">
                        Supporting Affidavits (if any)
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

        <p>
            <b>Note:</b><i> These applications are normally heard at 
            the time of the hearing of the appeal unless otherwise ordered.</i>
        </p>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';
const form4State = namespace("Form4");

@Component
export default class Rule60ApplicationInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
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
