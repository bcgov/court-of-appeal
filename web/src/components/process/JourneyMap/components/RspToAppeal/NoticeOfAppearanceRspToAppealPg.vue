<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Were you served with a Notice of Appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoaServed(!showNoaServedInfo)"                                      
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNoaServedInfo"></expand-icon>                    
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaServedInfo" class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger font-weight-bold">10 days</span> to file and serve your Notice of Appearance.
            </b-col>           
        </b-row>

        <b-row v-if="showNoaServedInfo" class="mt-4">
            <ol>
                <li>
                    Complete the online form below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-125">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)"
                                        target="_blank">Notice of Appearance
                                    </a>
                                </b-col>
                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewDocument"
                                        target="_blank"                                       
                                        class="p-1 bg-white text-primary border-primary  online-form-button">Online form
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

        <b-row :class="showNoaServedInfo?'mt-3': 'mt-4'" :style="!showNoaServedInfo?'padding-top: 0.85rem;': 'padding-top: 0.65rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                How do I serve a Notice of Appearance?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showServeNoa(!showServeNoaInfo)"                                    
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showServeNoaInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showServeNoaInfo" class="mt-3" >

            <p style="padding: 0;">
                The permitted methods of service under 
                Court of Appeal Rule 4 are as follows:
            </p>
       
        </b-row>

        <b-row v-if="showServeNoaInfo" class="mt-1 ml-2" >
            <p style="padding: 0;">
                Any document, other than a notice of appeal, may be served on a party by
            </p>
            <ol type="a">
                <li>serving the party personally,</li>
                <li>serving the party’s lawyer of record on an appeal,</li>
                <li>
                    if the party has filed a document containing an address for service,
                    <ol type="i">                        
                        <li>
                            delivering the document to the party’s address for service,
                        </li>
                        <li>
                            sending the document to the party’s email address for service, or
                        </li>
                        <li>
                            faxing the document to the fax number included in the party’s 
                            address for service, or
                        </li>
                    </ol>
                </li>
                <li>
                    serving the party in any other manner directed by a justice or the registrar.
                </li>                
            </ol>
        </b-row> 

        <b-row v-if="showServeNoaInfo" class="mt-1 ml-2" >
            <p style="padding: 0;">
                A document transmitted for service by email or fax is deemed to be served as follows:
            </p>
            <ol type="a">                
                <li>
                    if the document is transmitted at or before 4 p.m. on a business 
                    day, the document is deemed to be served on that day;
                </li>
                <li>
                    if the document is transmitted at either of the following times, 
                    the document is deemed to be served on the next business day:
                    <ol type="i">                        
                        <li>
                            after 4 p.m. on a business day;
                        </li>
                        <li>
                            anytime on a day other than a business day.
                        </li>                        
                    </ol>
                </li>                               
            </ol>
        </b-row> 

        <b-row :class="showServeNoaInfo?'mt-1': 'mt-4'" :style="!showServeNoaInfo?'padding-top: 0.85rem;': ''">            
            <b-col cols="11" class="step-title-column pl-0">
                What if I do not file a Notice of Appearance?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNotFileNoa(!showNotFileNoaInfo)"                                    
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showNotFileNoaInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNotFileNoaInfo" class="mt-3" >
            <p style="padding: 0;">
                If you do not file a notice of appearance under this rule, 
                it will be presumed that you take no position on the appeal 
                and that a party is not required to serve any further 
                documents on you related to the appeal, unless the court 
                or a justice orders otherwise.
            </p>
        </b-row> 
                
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

@Component({
    components:{
        ExpandIcon
    }
})
export default class NoticeOfAppearanceRspToLeavePg extends Vue {
    
    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void     
    
    showNoaServedInfo = true;
    showServeNoaInfo = false;
    showNotFileNoaInfo = false;
        
    public startNewDocument(){
        this.UpdateCurrentCaseId(null);
        this.$router.push({name: "start-form2" })
    }

    public showNoaServed(show: boolean){
        if (show) {
            this.showNoaServedInfo = true;
            this.$emit('adjustHeights', 0, "14rem");
        } else {
            this.showNoaServedInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }        
    }

    public showServeNoa(show: boolean){
        if (show) {
            this.showServeNoaInfo = true;
            this.$emit('adjustHeights', 1, "30rem")
        } else {
            this.showServeNoaInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showNotFileNoa(show: boolean){
        if (show) {
            this.showNotFileNoaInfo = true;
            this.$emit('adjustHeights', 2, "5rem")
        } else {
            this.showNotFileNoaInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

}
</script>

<style scoped lang="scss">



</style>