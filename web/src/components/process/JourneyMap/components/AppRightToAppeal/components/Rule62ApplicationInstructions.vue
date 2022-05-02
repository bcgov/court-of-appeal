<template>
    <b-card no-body border-variant="white">

        <b-row class="mt-3 bg-warning warning-message-row" >
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                File and serve the documents below 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;">within 7 days
                    </span> 
                of the decision denying leave to appeal.
            </b-col>     
        </b-row>

        <b-row class="mt-4">
            <ol class="mt-3">
                <li>
                    Obtain an application hearing date from the registrar
                </li>
                <li>
                    Complete the documents below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)"
                                        target="_blank">Notice of Application to Vary
                                    </a>
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm8Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    <!-- <a 
                                        href=""
                                        target="_blank"> -->
                                        Supporting Affidavit (if any)
                                    <!-- </a> -->
                                </b-col> 
                            </b-row>
                        </li>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    <!-- <a 
                                        href=""
                                        target="_blank"> -->
                                        Written argument (if any)
                                    <!-- </a> -->
                                </b-col>                                
                                
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the document(s) and each attached order to each party.
                </li>
            </ol>
        </b-row>
       
         
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

@Component
export default class Rule62ApplicationInstructions extends Vue {   

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
    }

}

</script>
