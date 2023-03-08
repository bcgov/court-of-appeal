<template>
    <b-card class="bg-white border-white w-90">
        
        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Factum and Appeal Book
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showFactum(!showFactumInfo)"                                                            
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showFactumInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showFactumInfo" class="mt-0" >
            <p style="padding: 0;">
                A factum is required to be filed and served by a respondent.
            </p>       
        </b-row> 

        <b-row v-if="showFactumInfo" class="mt-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="padding-top: 1.05rem;" class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You must file and serve a Respondent's Factum (or Respondent's Cross 
                Appeal Factum, if you have filed a cross appeal) 
                <span class="text-danger font-weight-bold">
                    within 30 days
                </span> 
                of being served with an appellant’s factum.
            </b-col>           
        </b-row>

        <h5 class="mt-4" v-if="showFactumInfo" style="display: block;">Respondent’s Factum</h5>

        <b-row v-if="showFactumInfo" class="mt-4 mx-0" >

            <ol>
                <li>
                    Prepare your factum in accordance with the Completion Instructions for factums.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9" style="font-weight: 700;">
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
                            <b-row class="my-1 w-110">
                                <b-col cols="9" style="font-weight: 700;">
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
                <li>
                     File with the registry.
                </li>
                <li>
                    Serve one copy on each party.
                </li>
            </ol>
            
        </b-row> 

        <h5 class="mt-4" v-if="showFactumInfo" style="display: block;">
            Respondent’s Cross Appeal Factum
        </h5>

        <b-row v-if="showFactumInfo" class="mt-4  mx-0" >

            <ol>
                <li>
                    Prepare your cross appeal factum in accordance with the Completion Instructions for factums.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="7" style="font-weight: 700;">
                                    E-Completion Instructions                                           
                                </b-col>
                                <b-col cols="2"></b-col>                                
                                <b-col class="pr-0" cols="1">
                                    <b-button
                                        @click="downloadInstructions('e-factum')"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                    </b-button>                                     
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="8" style="font-weight: 700;">
                                    Paper Completion Instructions                                                                       
                                </b-col>
                                <b-col cols="1"></b-col>                               
                                <b-col class="pr-0" cols="1">
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
                <li>
                     File with the registry.
                </li>
                <li>
                    Serve one copy on each appellant.
                </li>
            </ol>
            
        </b-row>

        <b-row :class="showFactumInfo?'mt-2': 'mt-4'" :style="showFactumInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Were you served with an appellant’s cross appeal response?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showServedResponse(!showServedResponseInfo)"
                    class="p-1 bg-white border-white expand-steps-button">
                    <expand-icon v-bind:showExpanded="showServedResponseInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showServedResponseInfo" class="mt-2" >
            <p style="padding: 0;">
                If you were served with an appellant’s cross appeal response, you may reply by completing the following steps.
            </p>       
        </b-row> 

        <b-row v-if="showServedResponseInfo" class="mt-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You may file and serve a respondent’s cross appeal reply 
                <span class="text-danger font-weight-bold">
                    not more than 7 days after
                </span> 
                being served the appellant’s cross appeal response factum.
            </b-col>           
        </b-row>       

        <b-row v-if="showServedResponseInfo" class="mt-4">
            <ol>
                <li>
                    Prepare your cross appeal reply in accordance with the Completion Instructions for factums.
                    <ul>
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    E-Completion Instructions                                           
                                </b-col>
                                <b-col cols="3"></b-col>                                
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
                                <b-col cols="3"></b-col>                               
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
                <li>
                     File with the registry.
                </li>
                <li>
                    Serve one copy on each appellant.
                </li>
            </ol>
            
        </b-row> 

        <b-row :class="showServedResponseInfo?'mt-4': 'mt-4'" :style="showServedResponseInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Appeal Book 
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealBook(!showAppealBookInfo)"                                      
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppealBookInfo"></expand-icon>                    
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAppealBookInfo" class="mt-0" >
            <p style="padding: 0;">
                An appeal book contains the evidence referred to in a factum.  
                If you have filed a factum or a cross appeal factum, and it 
                refers to evidence which is not included in the appellant’s 
                appeal book or a joint appeal book, you must file and serve 
                an appeal book when you file and serve your factum.
            </p>       
        </b-row>

        <b-row v-if="showAppealBookInfo" class="mt-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You must file your appeal book when you file and serve your 
                factum. 
            </b-col>           
        </b-row> 

        <b-row v-if="showAppealBookInfo" class="mt-2" >
            <p style="padding: 0;">
                If you agree with the appellant(s) that you will file a 
                joint appeal book not more than 30 days after filing the 
                respondent’s factum or the respondent’s cross appeal factum. 
                If a joint appeal book is filed, this satisfies the 
                requirement of a party to file and serve an appeal book.
            </p>       
        </b-row>

        <b-row v-if="showAppealBookInfo" class="mt-2 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                Joint Appeal books must be filed not more than 
                <span class="text-danger font-weight-bold">
                    30 days
                </span> 
                after filing the respondent’s factum or cross appeal factum is filed.
            </b-col>           
        </b-row> 

        <b-row v-if="showAppealBookInfo" class="mt-2" >

            <ol class="mt-1">
                <li>
                    Prepare your appeal book in accordance with the 
                    Completion Instructions for appeal books.                                                        
                    <ul>
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    E-Completion Instructions                                           
                                </b-col>
                                <b-col cols="3"></b-col>                                
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
                                <b-col cols="3"></b-col>                               
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
                <li>
                    File with the registry.
                </li>
                <li>
                    Serve one copy to each appellant.
                </li>
            </ol>
                   
        </b-row>  

        <b-row :class="showAppealBookInfo?'mt-1 pt-0': 'mt-4 pt-3'" :style="showAppealBookInfo?'':'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                What if there is disagreement about the contents of a book?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showDisagreement(!showDisagreementInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showDisagreementInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showDisagreementInfo" class="mt-2" >
            <p style="padding: 0;">
                You may apply to the registrar to settle the contents of one or more of the following:
                <ul>
                    <li>an appeal record</li>
                    <li>a transcript</li>
                    <li>an appeal book</li>
                </ul>
                On application, the registrar may do one or more of the following:
                <ul>
                    <li>settle or limit the content</li>
                    <li>direct that a party add or remove materials</li>
                    <li>direct that a document not be used in the appeal</li>
                    <li>provide any other direction arising from settling the contents that may be required.</li>
                </ul>
            </p>       
        </b-row>         
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon
    }
})
export default class FactumAppealBookRspToAppealPg extends Vue {

    showFactumInfo = true;
    showServedResponseInfo = false;    
    showAppealBookInfo = false;
    showDisagreementInfo = false;
    
    public showFactum(show: boolean){
        if (show) {
            this.showFactumInfo = true;
            this.$emit('adjustHeights', 0, "36rem");
        } else {
            this.showFactumInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showServedResponse(show: boolean){
        if (show) {
            this.showServedResponseInfo = true;
            this.$emit('adjustHeights', 1, "20rem");
        } else {
            this.showServedResponseInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showAppealBook(show: boolean){
        if (show) {
            this.showAppealBookInfo = true;
            this.$emit('adjustHeights', 2, "31rem");
        } else {
            this.showAppealBookInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showDisagreement(show: boolean){
        if (show) {
            this.showDisagreementInfo = true;
            this.$emit('adjustHeights', 3, "16rem");
        } else {
            this.showDisagreementInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public downloadInstructions(pdf_name){
        GetInstructionFile(pdf_name);        
    }

}
</script>

<style scoped lang="scss">



</style>