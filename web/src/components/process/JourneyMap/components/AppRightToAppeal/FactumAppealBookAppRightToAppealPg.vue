<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Complete Factums and Appeal Book
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showFactum(!showFactumInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showFactumInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger font-weight-bold">30 days</span> 
                to file and serve your factum and appeal book after filing your Appeal Record.
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4" >
            <ol>
                <li>
                    Prepare your factum in accordance with the Completion Instructions for factums.
                    <ul>
                        <li>
                            Appellant’s Factum                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-factum')"
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
                                                @click="downloadInstructions('paper-factum')"
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
                    File with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row> 

        <b-row v-if="showFactumInfo" class="mt-4" >            
            <p style="font-weight: 700; display: block;" class="mt-0">Appeal Book</p> 
            <p>
                An appeal book contains the evidence referred to in a factum.  If your factum refers 
                to evidence, you must file and serve an appeal book when you file and serve your 
                appellant’s factum.
            </p>
            <p>
                If the respondent is referring to evidence in their factum and if both parties 
                agree, you may file a joint appeal book.  If a joint appeal book is filed, 
                this satisfies the requirement of a party to file and serve an appeal book.
            </p>
            <!-- <p>
                If the respondent is referring to evidence in their factum and if both parties 
                agree, you may file a joint appeal book not more than 30 days after the 
                respondent files the respondent’s factum.  If a joint appeal book is filed, 
                this satisfies the requirement of a party to file and serve an appeal book.
            </p> -->

        </b-row> 

        <b-row v-if="showFactumInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-5 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                <p>
                    You have <span class="text-danger font-weight-bold">30 days</span> 
                    to file and serve your Appeal Book after filing your Appeal Record.  
                    The Appeal Book must be filed and served along with your factum.
                </p>
                <p style="margin-bottom: 0rem;">
                    If you agree with the other party to file a joint appeal book, you 
                    must file the joint appeal book not more than 
                    <span class="text-danger font-weight-bold">30 days</span>
                    after the respondent files the respondent’s factum.
                 </p>
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-4">            

            <ol class="mt-1">
                <li>
                    Prepare your reply factum in accordance with the Completion Instructions for appeal books.
                    <ul>                       
                        <li>
                            Appeal Book                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-appeal-book')"
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
                                                @click="downloadInstructions('paper-appeal-book')"
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
                    File with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>

        </b-row>

        <b-row :class="showFactumInfo?'mt-0':'mt-4'" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Were you served with a respondent's Factum?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespondentFactum(!showRespondentFactumInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespondentFactumInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showRespondentFactumInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger font-weight-bold">7 days</span> 
                to file and serve your reply factum.
            </b-col>           
        </b-row>

        <b-row v-if="showRespondentFactumInfo" class="mt-4" >            

            <ol class="mt-1">
                <li>
                    Prepare your reply factum in accordance with the Completion Instructions for factums.
                    <ul>
                         <li>
                            Reply Factum                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-factum')"
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
                                                @click="downloadInstructions('paper-factum')"
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
                    File with the registry.
                </li>
                <li>
                    Serve one copy to each respondent.
                </li>
            </ol>

        </b-row>

        <!-- <b-row class="mt-4" :style="showRespondentFactumInfo?'padding-top: 0.75rem;':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Were you served with a respondent’s Appeal Book or Appeal Book on cross appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespondentAppealBookCrossAppeal(!showRespondentAppealBookCrossAppealInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                   
                    <expand-icon v-bind:showExpanded="showRespondentAppealBookCrossAppealInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showRespondentAppealBookCrossAppealInfo" class="mt-2" >
            <p style="padding: 0;">
                If you are served with a copy of the respondent’s Appeal book or Appeal Book 
                on cross appeal, you do not have to respond if the evidence referred to in 
                the respondent’s cross appeal factum was included in your appeal book.
            </p>       
        </b-row>    -->

        <b-row :class="showRespondentFactumInfo?'mt-3': 'mt-4'" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                What if there is disagreement about the contents of a book?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showDisagreementOnContents(!showDisagreementOnContentsInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                   
                    <expand-icon v-bind:showExpanded="showDisagreementOnContentsInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>     

        <b-row v-if="showDisagreementOnContentsInfo" class="mt-2" >
            <p>
                You may apply to the registrar to settle the contents of one or more of the following:
                <ul>
                    <li>an appeal record</li>
                    <li>a transcript</li>
                    <li>An appeal book</li>
                </ul>                
            </p>
            <p>
                On application, the registrar may do one or more of the following:
                <ul>
                    <li>settle or limit the content</li>
                    <li>direct that a party add or remove materials</li>
                    <li>direct that a document not be used in the appeal</li>
                    <li>
                        provide any other direction arising from settling 
                        the contents that may be required.
                    </li>
                </ul>                
            </p> 
        </b-row>

        <b-row v-if="showDisagreementOnContentsInfo" class="mt-4" >            
            <p style="font-weight: 700; display: block;" class="mt-0">Application Requirements or Steps</p> 
            <p>
                Before filing a notice of application or any other document for commencing 
                an application, you must first obtain an application hearing date from the registrar.
            </p>
        </b-row> 

        <b-row v-if="showDisagreementOnContentsInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-5 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                <p>
                    You have at least<span class="text-danger font-weight-bold">5 business days</span> 
                    before the application hearing date file and serve on each party, the 
                    application materials listed below.
                </p>                
            </b-col>           
        </b-row>

        <b-row v-if="showDisagreementOnContentsInfo" class="mt-4" >            

            <ol>
                <li>
                    Obtain an application hearing date from the  
                    <a 
                        href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                        target="_blank"> registrar
                    </a>.
                    It is a good idea to communicate with the other parties first 
                    to find a date that works for everyone.
                </li>
                <li class="my-2">
                    Complete either the Online form or the .PDF. Click the document 
                    name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-125">
                                <b-col cols="4" style="font-weight: 700;">
                                    Notice of Application – Form 4                                    
                                </b-col>                                
                                <b-col cols="4" class="p-0" >
                                    <b-button
                                        @click="startNewForm4Document"
                                        target="_blank"                                                                                
                                        class="w-90 p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                                <b-col cols="4">
                                    
                                </b-col>
                            </b-row>
                        </li>
                        <li class="mt-2">
                            Affidavits (if any),                            
                        </li>
                        <li class="mt-2">
                            Written argument (if any)                            
                        </li>
                    </ul>                
                </li>
                <li class="mt-3">
                    File the documents with the registry.
                </li>
                <li class="mt-2">
                    Serve a copy of the document(s) to each party.
                </li>
            </ol>      
        </b-row> 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon
    }
})
export default class FactumAppealBookAppRightToAppealPg extends Vue {

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
    

    showFactumInfo = true;
    showRespondentFactumInfo = false;    
    showRespondentAppealBookCrossAppealInfo = false;
    showDisagreementOnContentsInfo = false;
    transcriptExtractBookHelpText = '<div>If a witness spoke at your original trial or hearing, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.</div>';

    public showFactum(show: boolean){
        if (show) {
            this.showFactumInfo = true;
            this.$emit('adjustHeights', 0, "54.75rem");
        } else {
            this.showFactumInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showRespondentFactum(show: boolean){
        if (show) {
            this.showRespondentFactumInfo = true;
            this.$emit('adjustHeights', 1, "19rem");
        } else {
            this.showRespondentFactumInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showRespondentAppealBookCrossAppeal(show: boolean){
        if (show) {
            this.showRespondentAppealBookCrossAppealInfo = true;
            this.$emit('adjustHeights', 2, "4rem");
        } else {
            this.showRespondentAppealBookCrossAppealInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showDisagreementOnContents(show: boolean){
        if (show) {
            this.showDisagreementOnContentsInfo = true;
            this.$emit('adjustHeights', 2, "52rem");
        } else {
            this.showDisagreementOnContentsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
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



</style>