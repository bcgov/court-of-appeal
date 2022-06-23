<template>
    <b-card no-body border-variant="white">

        <p>
            If you wish to apply to the have the court vary an order of a justice:
        </p>

        <b-row class="mt-3 bg-warning warning-message-row" >
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must complete and serve the following with 
                    <span 
                        class="text-danger" 
                        style="font-weight: bold;"> 7 days after
                    </span> 
                the order was made by a justice that you are seeking to vary.
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
                                        target="_blank">Notice of Application to vary an order of a justice
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
                                    <a 
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
                                        target="_blank">Supporting Affidavits (if any),
                                    </a> 
                                </b-col> 
                            </b-row>
                        </li>
                        <li class="link-button" 
                            @click="downloadInstructions('written-argument')"
                            target="_blank">
                            Written argument (if any)               
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

        <b-row class="mt-1">
            Within 14 days after filing your notice of application, you must: 
            <ol class="mt-3">              
                <li>
                    File an application book in Form 16 
                    <ul>
                        <li>
                            <b>Application Book</b>
                            <ul>
                                <li>
                                    <b-row class="my-1 w-145">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="3"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-vary')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                     
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row class="my-1 w-145">
                                        <b-col cols="8" style="font-weight: 700;">
                                            Paper Completion Instructions                                                                       
                                        </b-col>
                                        <b-col cols="3"></b-col>                               
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('paper-vary')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                    
                                        </b-col>
                                    </b-row>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    Service on each party a copy of the filed application book.
                </li>
            </ol>
        </b-row>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form8";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';
const form8State = namespace("Form8");

@Component
export default class Rule62ApplicationInstructions extends Vue {   

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
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
