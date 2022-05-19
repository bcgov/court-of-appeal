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
                    <ol class="mt-2" type="a">
                        <li>
                            Appellant has filed their factum, <b>and</b>
                        </li>
                        <li>
                            A copy of each order being appealed was entered in the court appealed from
                        </li>
                    </ol>
                </li>
                <li>
                    Or a date specified by a justice or the registrar as the date when the hearing ready.
                </li>
            </ol>
        </b-row>

        <b-row v-if="showReadyInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="margin: 3rem 0;" class="ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                Within <span class="text-danger font-weight-bold">60 days</span> 
                after an appeal is ready for hearing, an Appellant must:
                <ol type="a">
                    <li>Obtain a hearing date for the appeal from the registrar,</li>
                    <li>Advise the registrar if the parties disagree on the length of time for the hearing</li>
                    <li>And file and serve a Notice of Hearing.</li>
                </ol>
            </b-col>           
        </b-row>          

        <b-row v-if="showReadyInfo" class="mt-4">
            NOTE: The Court of Appeal Rules allow for the Respondent to obtain a hearing 
            date from the registrar if:
            <ol class="mt-2" type="a">
                <li>
                    The respondent has filed their factum or their cross-appeal factum, and
                </li>
                <li>
                    The appellant appellant has not complied with Rule 33(1) or (2).
                </li>
            </ol>
            If the Respondent obtains a hearing date, they must file and serve a notice of hearing 
            within 5 days of obtaining the hearing date.
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
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                After obtaining a hearing date, you must without delay file and serve 
                the notice of hearing along with the attached entered order which is 
                being appealed on each respondent.
            </b-col>           
        </b-row>

        <b-row v-if="showHearingInfo" class="mt-4" >
            <ol>
                <li>
                    Complete the Online Form or .PDF below.  Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
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
                    Attach a copy of the entered order(s) being appealed.
                </li>
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showHearingInfo?'mt-0':'mt-4'" :style="showHearingInfo?'padding-top: 0.5rem;':'padding-top: 0.75rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Book of Authorities
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showAuthorities(!showAuthoritiesInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAuthoritiesInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showAuthoritiesInfo" class="mt-4" >
            You can prepare a book of authorities that includes each authority referred to 
            in your factum and each authority that you intend to refer to in court at the hearing.
        </b-row>
        
        
        <b-row v-if="showAuthoritiesInfo" class="mt-4 bg-warning warning-message-row">
            
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="margin-top: 2.25rem;" class="ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                <p>
                    You must file and serve a book of authorities at least 
                    <span class="text-danger font-weight-bold">30 days</span> 
                    before an appeal hearing date.
                </p>
                <p class="mb-0">
                    If you agree with the other party to file a joint book of 
                    authorities, if must be filed at least <span class="text-danger font-weight-bold">30 days</span>
                     before the appeal hearing date.
                </p>

            </b-col>           
        </b-row>

        <b-row v-if="showAuthoritiesInfo" class="mt-4" >
            <ol>
                <li>
                    Prepare the Book of Authorities in accordance with the Completion Instructions.
                    <ul>                       
                        <li>
                            Book of Authorities                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-auth-book')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                     
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8">
                                            Paper Completion Instructions                                                                       
                                        </b-col>
                                        <b-col cols="2"></b-col>                               
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('paper-auth-book')"
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
                    Serve one copy on each respondent.
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
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';
const form5State = namespace("Form5");

@Component({
    components:{
        ExpandIcon
    }
})
export default class NoticeOfHearingAppRightToAppealPg extends Vue {

    @form5State.Action
	public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void        


    showReadyInfo = true;
    showHearingInfo = false;
    showAuthoritiesInfo = false;

    public showReady(show: boolean){
        if (show) {
            this.showReadyInfo = true;
            this.$emit('adjustHeights', 0, "31rem");
        } else {
            this.showReadyInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showHearing(show: boolean){
        if (show) {
            this.showHearingInfo = true;
            this.$emit('adjustHeights', 1, "16rem");
        } else {
            this.showHearingInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showAuthorities(show: boolean){
        if (show) {
            this.showAuthoritiesInfo = true;
            this.$emit('adjustHeights', 2, "27rem");
        } else {
            this.showAuthoritiesInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public startNewForm5Document(){
        this.UpdateCurrentNoticeOfHearingOfAppealId(null);            
        this.$router.push({name: "start-form5" })
    }

    public downloadInstructions(pdf_name){

        GetInstructionFile(pdf_name);
        
    }

}
</script>

<style scoped lang="scss">



</style>