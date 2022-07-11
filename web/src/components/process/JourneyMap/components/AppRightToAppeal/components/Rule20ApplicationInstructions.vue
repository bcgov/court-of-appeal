<template>
    <b-card no-body border-variant="white">
       
        <p>
            If you are <b>not applying for leave to appeal</b> but still 
            want to make an application for a stay, you must complete 
            the following:
        </p>

        <b-row class="ml-2 mt-2 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You must 
                    <span 
                        class="text-danger font-weight-bold">at least 5 business days
                    </span> 
                before the application hearing date, file and serve on 
                each party, the application materials listed below.
            </b-col>              
        </b-row>
       
        <ol class="mt-3">
            <li>
                Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
            </li>
            
            <li class="mt-2">
                Complete either the Online form or the .PDF. Click the document name for more information.  
                <ul class="mt-2">
                    <li>
                        <b-row class="my-1" style="width: 90%;">
                            <b-col class="font-weight-bold" cols="10">
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
                    <li>
                        <b>Application Book</b>
                        <ul>
                            <li>
                                <b-row class="my-1 w-100">
                                    <b-col cols="8" class="font-weight-bold">
                                        E-Completion Instructions                                           
                                    </b-col>
                                    <b-col cols="2"></b-col>                                
                                    <b-col cols="1">
                                        <b-button
                                            @click="downloadInstructions('e-application-leave-stay')"
                                            target="_blank"                                                                                
                                            class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                        </b-button>                                     
                                    </b-col>
                                </b-row>
                            </li>
                            <li>
                                <b-row class="my-1 w-100">
                                    <b-col cols="8" class="font-weight-bold">
                                        Paper Completion Instructions                                                                       
                                    </b-col>
                                    <b-col cols="2"></b-col>                               
                                    <b-col cols="1">
                                        <b-button
                                            @click="downloadInstructions('paper-application-leave-stay')"
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

import {GetInstructionFile} from '@/components/utils/GetInstructionFile';

@Component
export default class Rule20ApplicationInstructions extends Vue {   

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
