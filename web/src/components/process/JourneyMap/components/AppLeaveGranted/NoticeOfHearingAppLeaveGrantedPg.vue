<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Once the Appeal is ready for hearing?
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
            <ol class="mt-2" type="a">
                <li>
                    Appellant has filed their factum, and
                </li>
                <li>
                    A copy of each order being appealed was entered in the court appealed from
                </li>
            </ol>
            Or a date specified by a justice or the registrar as the date when the hearing ready.
        </b-row>

        <b-row v-if="showReadyInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="margin: 2.25rem 0;" class="ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                Within <span class="text-danger font-weight-bold">10 days</span> 
                after an appeal is ready for hearing, an Appellant must:
                <ol type="a">
                    <li>Obtain a hearing date for the appeal from the registrar, and</li>
                    <li>Inform the registrar if the parties disagree on the length of time for the hearing.</li>
                </ol>
            </b-col>           
        </b-row> 

         <b-row v-if="showReadyInfo" class="mt-4 mr-5 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                Within <span class="text-danger font-weight-bold">5 days</span> 
                of obtaining a hearing date from the registrar, the appellant 
                must file a notice of hearing in Form 34 that has attached a copy order being appealed.
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
                    The appellant has not complied with Rule 30 (1) or (2) in obtaining a hearing date.
                </li>
            </ol>
            If the Respondent obtains a hearing date, they must file and serve a notice of hearing 
            within 5 days of obtaining the hearing date.
        </b-row>        
        
        <b-row :class="showReadyInfo?'mt-2':'mt-4'" style="padding-top: 0.85rem;">            
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
                You have <span class="text-danger font-weight-bold">2 months</span> to file and serve your document after submitting the Certificate of Readiness.
            </b-col>           
        </b-row>

        <b-row v-if="showHearingInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
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
                    Attach a copy of the entered order being appealed.
                </li>
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row>    
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

@Component({
    components:{
        ExpandIcon
    }
})
export default class NoticeOfHearingAppLeaveGrantedPg extends Vue {  

    showReadyInfo = true;
    showHearingInfo = false;

    public showReady(show: boolean){
        if (show) {
            this.showReadyInfo = true;
            this.$emit('adjustHeights', 0, "34rem");
        } else {
            this.showReadyInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showHearing(show: boolean){
        if (show) {
            this.showHearingInfo = true;
            this.$emit('adjustHeights', 1, "14rem");
        } else {
            this.showHearingInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public startNewForm5Document(){
        this.$router.push({name: "start-form5" })
    }
    
}
</script>

<style scoped lang="scss">

</style>