<template>
    <b-card no-body border-variant="white">       
        <p>
            Before filing a notice of application or any other document 
            for commencing an application, you must first obtain an 
            application hearing date from the registrar.  
        </p>
        <b-row class="mx-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 5 business days
                    </span> 
                before the application hearing date file filed 
                and serve on each party, the application materials listed below.
            </b-col>              
        </b-row>

        <ol class="mt-3">
            <li>Obtain an application hearing date from the registrar.</li>
            <li class="mt-2">Complete the following: 
                <ul>
                    <li>
                        <b-row style="width: 90%;">
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
                        Affidavits (if any),
                    </li>
                    <li>
                        Written argument (if any)
                    </li>
                </ul>
            </li> 
            <li >
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
export default class Rule54ApplicationInstructions extends Vue {  
    
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
