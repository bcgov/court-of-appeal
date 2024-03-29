<template>
    <b-card no-body border-variant="white">

        <p style="font-size: 0.95rem; font-weight: 700;">
            Varying or cancelling an order of the registrar
        </p>
        <p>
            If you want to make an application under Section 35 of 
            the Court of Appeal Act to vary or cancel an order or 
            direction of the registrar, you must complete the following:   
        </p>

        <b-row class="ml-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must
                <span class="text-danger font-weight-bold">
                    no later than 7 days
                </span>
                after the order was made or the direction given obtain a hearing date
                for the application; You must
                <span class="text-danger font-weight-bold">
                    at least 5 business days
                </span>
                before the application hearing date, file and serve the following:
            </b-col>              
        </b-row>
       
        <ol class="mt-3">
            <li>
                Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
                    It is a good idea to communicate with the other parties first 
                    to find a date that works for everyone.
            </li>
            
            <li>
                Complete either the Online form or the .PDF. Click the document name for more information.  
                <ul class="mt-2">
                    <li>
                        <b-row class="my-1" style="width: 90%;">
                            <b-col class="font-weight-bold" cols="10">
                                Notice of Application (Form 4)                                
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    v-if="displayButton"
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li> 
                    <li>
                        Supporting Affidavits
                    </li>
                    <li>
                        Memorandum of argument
                    </li>                    
                </ul>
            </li> 
            <li>
                File the documents with the registry.
            </li>
            <li>
                Serve a copy of the document(s) to each party. 
            </li>
        </ol>           
        
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class Rule63ApplicationInstructions extends Vue {   

    @Prop({required: true})
    displayButton!: boolean;
    
    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
