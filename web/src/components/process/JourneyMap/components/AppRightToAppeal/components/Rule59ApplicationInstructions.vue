<template>
    <b-card no-body border-variant="white">
       
        <b>Adducing fresh or new evidence:</b>

        <p>
            If you wish to apply for leave to adduce evidence that 
            was not before the lower court, you must do the following:   
        </p>
        <b-row class="mt-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 30 days
                    </span> 
                before the appeal hearing date, file and serve on each party, 
                the application materials listed below. 
            </b-col>              
        </b-row>

        <ol class="mt-3">
            <li>If you want the application heard before the hearing of the appeal, obtain 
                an application hearing date from the registrar.</li>
            <li class="mt-2">
                Complete either the Online form or the .PDF. Click the document name for more information.  
                <ul class="mt-2">
                    <li>
                        <b-row class="my-1" style="width: 90%;">
                            <b-col cols="10">
                                Notice of Application (Form 4)                                
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li> 
                    <li class="my-2">
                        Support Affidavit(s) that includes the evidence that you are 
                        seeking to adduce. 
                    </li>
                    <li class="my-2">
                        Other supporting affidavits (if any)
                    </li>
                    <li>
                        Written argument (if any) not exceeding 10 pages that sets out 
                        why you should be permitted to adduce the evidence 
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
