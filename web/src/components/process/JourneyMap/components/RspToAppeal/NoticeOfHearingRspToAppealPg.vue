<template>
    <b-card class="bg-white border-white w-90">   

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                When is the Appeal ready for hearing?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showReady(!showReadyInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showReadyInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showReadyInfo" class="mt-4">
            Appeal is ready for hearing when:
            <ol>
                <li>
                    Appellant has filed their factum, <b>and</b>
                    a copy of each order being appealed was entered in the court appealed from
                        
                </li>
                <li>
                    <b>Or</b> a date specified by a justice or the registrar as the date when the hearing ready.
                </li>
            </ol>
        </b-row>        

        <b-row v-if="showReadyInfo" class="mt-2">
            Under the Court of Appeal Rules, the Appellant would normally be responsible for 
            booking and completing the Notice of Hearing of Appeal form; however, the 
            Respondent may obtain a hearing date from the registrar if:
            <ol class="mt-2" type="a">
                <li>
                    The respondent has filed their factum or their cross-appeal factum, and
                </li>
                <li>
                    The appellant has not complied with 
                    <a
                        href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section30"
                        target="_blank">Rule 30 (1) or (2)
                    </a>                     
                    in obtaining a hearing date.
                </li>
            </ol>            
        </b-row>            
        
        <b-row :class="showReadyInfo?'mt-3':'mt-4'" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Complete the Notice of Hearing
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showHearing(!showHearingInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showHearingInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showHearingInfo" class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                The Respondent must file and serve a notice of hearing 
                within <span class="text-danger font-weight-bold">5 days</span> 
                of obtaining the hearing date.
            </b-col>           
        </b-row>

        <b-row v-if="showHearingInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.13-prepare-and-file-a-notice-of-hearing?ct=t(step-index-link)"
                                        target="_blank">Notice of Hearing
                                    </a>
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm5Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>
                <li>
                    Attach a copy of the entered order being appealed.
                </li>
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each appellant.
                </li>
            </ol>
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

@Component({
    components:{
        ExpandIcon
    }
})
export default class NoticeOfHearingRspToAppealPg extends Vue {

    @form5State.Action
	public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void        


    showReadyInfo = true;
    showHearingInfo = false;

    public showReady(show: boolean){
        if (show) {
            this.showReadyInfo = true;
            this.$emit('adjustHeights', 0, "17rem");
        } else {
            this.showReadyInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showHearing(show: boolean){
        if (show) {
            this.showHearingInfo = true;
            this.$emit('adjustHeights', 1, "17rem");
        } else {
            this.showHearingInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public startNewForm5Document(){
        this.UpdateCurrentNoticeOfHearingOfAppealId(null);            
        this.$router.push({name: "start-form5" })
    }

}
</script>

<style scoped lang="scss">



</style>