<template>
    <b-card no-body border-variant="white">
       
        <b style="font-size: 0.95rem;">Adducing fresh or new evidence:</b>

        <p class="mt-2">
            If you were served an application for leave to adduce evidence and 
            you want to respond, you must complete the following:   
        </p>
        <b-row class="mt-2 mx-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 7 business days
                    </span> 
                before the application hearing date, file and serve on each 
                party, the application materials listed below. 
            </b-col>              
        </b-row>

        <ol class="mt-3">
            <li>If you want the application heard before the hearing of the appeal, obtain 
                an application hearing date from the registrar.</li>
            <li class="mt-2">
                Complete the .PDF form. Click the document name for more information.  
                <ul class="mt-2">
                    
                    
                    <li class="my-2">
                        Supporting affidavits (if any)
                    </li>
                    <li>
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
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class Rule59ApplicationInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
