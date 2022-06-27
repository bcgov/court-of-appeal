<template>
    <b-card no-body border-variant="white">
       
        <p style="font-size: 0.95rem; font-weight: 700;">Payment of security</p>
        <p>
            If you wish to apply to have a party pursuant to Section 34 
            of the Court of Appeal Act pay monies or security into court, 
            you must complete the following:  
        </p>
       
        <ol class="mt-1">
            <li>Obtain an application hearing date from the registrar.</li>
            <b-row class="mt-2 ml-1 mr-4 bg-warning warning-message-row">
                <b-col cols="1">
                    <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
                </b-col>
                <b-col cols="11" style="padding-left: 0;">
                    You must 
                        <span 
                            class="text-danger font-weight-bold">at least 5 business days
                        </span> 
                    before the application hearing date, file and serve on each party, 
                    the application materials listed below.
                </b-col>              
            </b-row>
            <li class="mt-2">
                Complete either the Online form or the .PDF. Click the document name for more information.  
                <ul class="mt-2">
                    <li>
                        <b-row style="width: 90%;">
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
                        <b>Application Book</b>                                
                        <ul>
                            <li>
                                <b-row class="my-1 w-100">
                                    <b-col cols="8" style="font-weight: 700;">
                                        E-Completion Instructions                                           
                                    </b-col>
                                    <b-col cols="2"></b-col>                                
                                    <b-col cols="1">
                                        <b-button
                                            @click="downloadInstructions('e-security-costs')"
                                            target="_blank"                                                                                
                                            class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                        </b-button>                                     
                                    </b-col>
                                </b-row>
                            </li>
                            <li>
                                <b-row class="my-1 w-100">
                                    <b-col cols="8" style="font-weight: 700;">
                                        Paper Completion Instructions                                                                       
                                    </b-col>
                                    <b-col cols="2"></b-col>                               
                                    <b-col cols="1">
                                        <b-button
                                            @click="downloadInstructions('paper-security-costs')"
                                            target="_blank"                                                                                
                                            class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                        </b-button>                                    
                                    </b-col>
                                </b-row>
                            </li>
                            
                        </ul>
                    </li> 
                    <li class="link-button" 
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
            <li>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component
export default class Rule58ApplicationInstructions extends Vue {   

    @Prop({required: true})
    displayButton!: boolean;
    
    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    affidavit = false;

    mounted(){
        this.affidavit = false;
    }
    
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
