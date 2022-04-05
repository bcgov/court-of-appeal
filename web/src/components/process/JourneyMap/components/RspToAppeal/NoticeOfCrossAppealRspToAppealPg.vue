<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                The Notice of Appeal or the order granting leave to appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoa(!showNoaInfo)"                                      
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoaInfo"></expand-icon>                    
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaInfo" class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger font-weight-bold">15 days</span> 
                to file and serve your documents, after receiving the Notice of Appeal or 
                the order granting leave to appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showNoaInfo" class="mt-4" >
            <ol>
                <li>
                    Complete the online form below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
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
                     File the document with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showNoaInfo?'mt-3': 'mt-4'" :style="!showNoaInfo?'padding-top: 0.85rem;': ''">            
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
    showAppealRecordInfo = false;

    public startNoticeOfCrossAppeal(){
        this.UpdateCurrentNoticeOfCrossAppealId(null);
        this.$router.push({name: "start-form3" })
    }

    public showNoa(show: boolean){
        if (show) {
            this.showNoaInfo = true;
            this.$emit('adjustHeights', 0, "15rem");
        } else {
            this.showNoaInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }        
    }

    public showAppealRecord(show: boolean){
        if (show) {
            this.showAppealRecordInfo = true;
            this.$emit('adjustHeights', 1, "3rem")
        } else {
            this.showAppealRecordInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }
}
</script>

<style scoped lang="scss">

</style>