<template>
    <b-card no-body border-variant="white">

        <p style="font-size: 0.95rem; font-weight: 700;">Quashing an appeal or raising a preliminary objection</p>
        <p>
            This type of application is used to do one or more of the following:  
        </p>

         <ol> 
            <li>
                Strike part of a factum                    
            </li> 
            <li>
                Raise a preliminary objection to an appeal
            </li>
            <li>
                Quash an appeal before it is heard 
            </li>
        </ol>

        <p>
            If you want to apply for one of the above, you must complete the following:  
        </p>

        <b-row class="ml-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 7 days
                    </span> 
                before the application hearing date, file and serve on each 
                party, the application materials listed below.
            </b-col>              
        </b-row>
       
        <ol class="mt-3">
            <li>Obtain an application hearing date from the registrar.</li>
            
            <li>
                Complete either the Online form or the .PDF. Click the document name for more information.  
                <ul>
                    <li>
                        <b-row class="mt-1" style="width: 90%;">
                            <b-col cols="10">
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
                        Supporting Affidavits (if any)
                    </li> 
                    <li>Written argument (if any)</li>                   
                </ul>
            </li> 
            <li>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class Rule60ApplicationInstructions extends Vue {   

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
