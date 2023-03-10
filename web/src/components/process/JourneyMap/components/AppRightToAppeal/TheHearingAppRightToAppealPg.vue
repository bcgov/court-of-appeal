<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                How do I prepare for my hearing?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showPrepareHearing(!showPrepareHearingInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showPrepareHearingInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>        

        <b-row v-if="showPrepareHearingInfo" class="mt-3">
            <p>
                You may wish to review information about preparing for 
                your appeal by clicking on the link below.
            </p> 
            <p class="mt-1 ml-3" >            
                <a 
                    href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/how-to-prepare-for-hearing"
                    target="_blank">How do I prepare for my hearing?
                </a>                               
            </p>
        </b-row> 

        <!-- <b-row :class="showPrepareHearingInfo?'mt-2': 'mt-4'" :style="showPrepareHearingInfo?'padding-top: 0.15rem;':'padding-top: 0.75rem;'" >           
                    
            <b-col cols="11" class="step-title-column pl-0">
                Points of law and authorities not cited in factum
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showPoints(!showPointsInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showPointsInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showPointsInfo" class="mt-4" >             
            <p>
                The court may permit a party to use arguments, raise 
                points of law or cite authorities that were not used, 
                raised or cited in a party’s factum.
            </p>
            <p>
                You may submit a condensed book of authorities or a 
                condensed book of evidence or both to the court at 
                the hearing of an appeal provided a copy is able 
                to be provided to each justice and each other party 
                at the hearing of the appeal.
            </p>            
            <p>
                Prepare a condensed book of authorities and/or a 
                condensed book of evidence in accordance with the 
                Completion Instructions.
            </p>
            <ul class="w-100">
                <li>
                    <b>Condensed Book of Authorities</b>                                    
                    <ul>                        
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    Paper Completion Instructions                                                                       
                                </b-col>
                                <b-col cols="2"></b-col>                               
                                <b-col cols="1">
                                    <b-button
                                        @click="downloadInstructions('paper-condensed-auth-book')"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        
                    </ul>
                </li>
                <li>
                    <b>Condensed Book of Evidence</b>                                    
                    <ul>                        
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    Paper Completion Instructions                                                                       
                                </b-col>
                                <b-col cols="2"></b-col>                               
                                <b-col cols="1">
                                    <b-button
                                        @click="downloadInstructions('paper-condensed-evidence-book')"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        
                    </ul>
                </li>         
            </ul>
        </b-row>

        <b-row v-if="showPointsInfo" class="mt-3">            
                 
            <p>
                You may wish to review information about 
                your hearing and what will happen after your hearing by clicking on the links below.
            </p>       

            <ul class="mt-1 ml-3" >     
                <li>       
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/what-happens-at-hearing"
                        target="_blank">What will happen at my hearing?
                    </a>                               
                </li>
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                        target="_blank">What can I expect after my hearing?
                    </a>   
                </li>    
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                        target="_blank">Getting Judgment
                    </a>   
                </li>                         
            </ul>
        </b-row> -->

        <b-row :class="showPrepareHearingInfo?'mt-2': 'mt-4'"  :style="showPrepareHearingInfo?'padding-top: 0.15rem;':'padding-top: 0.85rem;'">
            <b-col cols="11" class="step-title-column pl-0">
                Court Order
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showOrder(!showOrderInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showOrderInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showOrderInfo" class="mt-3">            
            
            <p class="mt-2" style="display: inline-block;">
                After judgment on an appeal has been given, the order must be 
                drawn up and entered in accordance with Rule 66(3)(b) of the 
                Court of Appeal Rules.
            </p>       

            <p class="mt-1 ml-3" >
                <a class="link-button" 
                    @click="showOrdersSection()"
                    target="_blank">
                    Orders                
                </a>                          
            </p>
        </b-row>

        <!-- <b-row :class="showOrderInfo?'mt-1': 'mt-4'" :style="showOrderInfo?'padding-top: 0.25rem;':'padding-top: 0.65rem;'" >
            <b-col cols="11" class="step-title-column pl-0">
                Directions
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showDirections(!showDirectionsInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showDirectionsInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showDirectionsInfo" class="mt-3" >             
            <p class="mt-2" style="display: inline-block;">
                After a judgment on an appeal has been given, a party may apply to the court for directions 
                under Section 45 of the Court of Appeal Act about costs if the parties disagree.
            </p> 
            <ol>
                <li>
                    Submit a written request to the registrar that includes the following:
                    <ul>
                        <li>
                            Summary of the disagreement and the party’s position 
                            on the disagreement
                            
                        </li>
                        <li>A proposed schedule for submissions by the parties or 
                            request to the registrar to arrange a timetable for 
                            submissions
                        </li>
                    </ul>
                </li>
                <li>
                    Serve a copy of the written request on each party.
                </li>
            </ol>
        </b-row>   -->
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';


@Component({
    components:{
        ExpandIcon
    }
})
export default class TheHearingAppRightToAppealPg extends Vue { 

    @Prop({required: true})
    app!: boolean;
    
    showPrepareHearingInfo = true;
    showPointsInfo = false;
    showOrderInfo = false;
    showDirectionsInfo = false;

    public showPrepareHearing(show: boolean){
        if (show) {
            this.showPrepareHearingInfo = true;
            this.$emit('adjustHeights', 0, "5rem")
        } else {
            this.showPrepareHearingInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showPoints(show: boolean){
        const pointsLength = this.app?'33rem':'35rem';
        if (show) {
            this.showPointsInfo = true;
            this.$emit('adjustHeights', 1, pointsLength)
        } else {
            this.showPointsInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showOrder(show: boolean){
        if (show) {
            this.showOrderInfo = true;
            this.$emit('adjustHeights', 1, "7rem")
        } else {
            this.showOrderInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showDirections(show: boolean){
        if (show) {
            this.showDirectionsInfo = true;
            this.$emit('adjustHeights', 3, "14rem")
        } else {
            this.showDirectionsInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public showOrdersSection(){
        
        this.$emit('showOrders');
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