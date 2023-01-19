<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                The Notice of Cross Appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoa(!showNoaInfo)"                                      
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoaInfo"></expand-icon>                    
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaInfo" class="mt-3" >

            <p style="padding: 0;">
                As a respondent, you may only file a notice of cross appeal if you are 
                seeking to vary the order being appealed, and you are seeking relief 
                from the court that is different from what the appellant is asking 
                the court for in the notice of appeal.
            </p>
       
        </b-row>

        <b-row :class="showNoaInfo?'mt-1': 'mt-4'" :style="showNoaInfo?'padding-top: 0.5rem;': 'padding-top: 0.85rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                How do I bring a cross appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showBringCrossAppeal(!showBringCrossAppealInfo)"                                    
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showBringCrossAppealInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showBringCrossAppealInfo" class="mt-1" >
            <p style="padding: 0;">
                If you want to bring a cross appeal, you must complete the steps below.
            </p>       
        </b-row>

        <b-row v-if="showBringCrossAppealInfo" class="mt-1 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger font-weight-bold">15 days</span> 
                to file and serve your notice of cross appeal being served a notice of appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showBringCrossAppealInfo" class="mt-4" >
            <ol>
                <li>
                    Complete the online form or the .PDF. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="9">
                                    <a 
                                        href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/297_2001a#part4"
                                        target="_blank">Notice of Cross Appeal
                                    </a>                                    
                                </b-col>
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNoticeOfCrossAppeal"
                                        target="_blank"                                        
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
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
                    Serve one copy on each party and on any other respondent named in the notice of cross appeal.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showBringCrossAppealInfo?'mt-1': 'mt-4'" :style="!showBringCrossAppealInfo?'padding-top: 0.85rem;': ''">            
            <b-col cols="11" class="step-title-column pl-0">
                Are there any additional documents that I need to file for a cross appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAddDocs(!showAddDocsInfo)"                                    
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAddDocsInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAddDocsInfo" class="mt-3" >

            <p style="padding: 0;">
                Yes.  You will need to prepare and file a factum on cross appeal and an appeal book on cross appeal.
            </p>
            <p style="padding: 0;">               
                Please go to the <a class="link-button" 
                                    @click="showFactumSection()"
                                    target="_blank">
                                    Factum and Appeal Book icon                
                                </a> 
                 on the journey map for details.
            </p>
       
        </b-row> 

        <b-row :class="showAddDocsInfo?'mt-3': 'mt-4'" :style="!showAddDocsInfo?'padding-top: 0.85rem;': ''">            
            <b-col cols="11" class="step-title-column pl-0">
                The Appeal Record and Transcript
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealRecord(!showAppealRecordInfo)"                                    
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppealRecordInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordInfo" class="mt-3" >

            <p style="padding: 0;">
                If you are served with a copy of the Appeal Record and Transcript, you do not have to respond to these documents.
            </p>
       
        </b-row>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

@Component({
    components:{
        ExpandIcon
    }
})
export default class NoticeOfCrossAppealRspToAppealPg extends Vue {

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void

    
    showNoaInfo = true;
    showBringCrossAppealInfo = false;
    showAddDocsInfo = false;
    showAppealRecordInfo = false;

    public startNoticeOfCrossAppeal(){
        this.UpdateCurrentNoticeOfCrossAppealId(null);
        this.$router.push({name: "checklist-form3" })
    }

    public showNoa(show: boolean){
        if (show) {
            this.showNoaInfo = true;
            this.$emit('adjustHeights', 0, "5rem");
        } else {
            this.showNoaInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }        
    }

    public showBringCrossAppeal(show: boolean){
        if (show) {
            this.showBringCrossAppealInfo = true;
            this.$emit('adjustHeights', 1, "15rem")
        } else {
            this.showBringCrossAppealInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showAddDocs(show: boolean){
        if (show) {
            this.showAddDocsInfo = true;
            this.$emit('adjustHeights', 2, "5rem")
        } else {
            this.showAddDocsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showAppealRecord(show: boolean){
        if (show) {
            this.showAppealRecordInfo = true;
            this.$emit('adjustHeights', 3, "3rem")
        } else {
            this.showAppealRecordInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public showFactumSection(){
        
        this.$emit('showFactums');
    }
}
</script>

<style scoped lang="scss">

</style>