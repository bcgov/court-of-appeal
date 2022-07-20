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
                    href="https://www.courtofappealbc.ca/appellant-guidebook/3.3-how-to-prepare-for-the-hearing?ct=t(step-index-link)"
                    target="_blank">How do I prepare for my hearing?
                </a>                               
            </p>
        </b-row> 

        <b-row :class="showPrepareHearingInfo?'mt-2': 'mt-4'" :style="showPrepareHearingInfo?'padding-top: 0.15rem;':'padding-top: 0.75rem;'" >           
                    
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
                        href="https://www.courtofappealbc.ca/appellant-guidebook/3.4-what-happens-at-the-hearing?ct=t(sidebar-link)"
                        target="_blank">What will happen at my hearing?
                    </a>                               
                </li>
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/appellant-guidebook/3.1-making-chambers-applications?ct=t(step-index-link)"
                        target="_blank">What can I expect after my hearing?
                    </a>   
                </li>    
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/appellant-guidebook/4.1-getting-judgment?ct=t(sidebar-link)"
                        target="_blank">Getting Judgment
                    </a>   
                </li>                         
            </ul>
        </b-row>

        <b-row :class="showPointsInfo?'mt-2': 'mt-4'"  :style="showPointsInfo?'padding-top: 0.15rem;':'padding-top: 0.85rem;'">
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
                After judgment on an appeal has been given, the order of the court must be drawn 
                up and entered in accordance with Rule 66 of the Court of Appeal Rules.
            </p>       

            <p class="mt-1 ml-3" >
                <a class="link-button" 
                    @click="showOrdersSection()"
                    target="_blank">
                    Orders                
                </a>                          
            </p>
        </b-row>

        <b-row :class="showOrderInfo?'mt-1': 'mt-4'" :style="showOrderInfo?'padding-top: 0.65rem;':'padding-top: 0.85rem;'" >
            <b-col cols="11" class="step-title-column pl-0">
                Costs
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showCosts(!showCostsInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showCostsInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showCostsInfo" class="mt-3">
            <p style="display: inline-block; font-weight: 500;">
                Assessment of Costs
            </p>
            <p class="mt-1" style="display: inline-block;">
                If you were awarded costs, you may apply to the registrar for an 
                assessment of costs by bringing an application 
                as outlined in 
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section53"
                    target="_blank">
                    Rule 53          
                </a>
                  and 
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section54"
                    target="_blank">
                    Rule 54          
                </a>                
                  of the Court of Appeal Rules.
            </p>  

            <ol class="mt-1 ml-3 w-100" > 
                <li>Obtain application date</li>
                <li class="my-2">
                    <b-row style="width: 90%;">
                        <b-col cols="10" style="font-weight: 700;">
                            Prepare Notice of Application (Form 4)                                
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
                    <b-row class="my-1 w-100">
                        <b-col cols="8">
                            <a 
                                href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Civil_Rules_Forms.aspx"
                                target="_blank">
                                Complete the Bill of Costs (Form 21)          
                            </a>                                                                       
                        </b-col>
                        <b-col cols="2"></b-col>                               
                        <b-col cols="1">
                            <b-button
                                @click="downloadInstructions('form-21')"
                                target="_blank"                                                                                
                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                            </b-button>                                    
                        </b-col>
                    </b-row>                    
                </li>               
            </ol>

        </b-row>

        <b-row v-if="showCostsInfo" class="mt-3">
            <p style="display: inline-block; font-weight: 500;">
                Offer to Settle Costs
            </p>
            <p class="mt-1" style="display: inline-block;">
                Before the Registrar makes an assessment of costs, a party 
                under Court of Appeal 
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section76"
                    target="_blank">
                    Rule 76          
                </a> 
                may serve another 
                party, in Form 16, an offer to settle the amount of a bill of costs.
            </p>  

            <ul class="mt-1 ml-3 w-100" >                 
                <li class="my-2">
                    <b-row style="width: 90%;">
                        <b-col cols="10" style="font-weight: 700;">
                            Offer to Settle Costs (Form 16)                                
                        </b-col>                                
                        <b-col cols="2" class="p-0" >
                            <b-button                                    
                                @click="startNewForm16Document"
                                target="_blank"                                                                                
                                class="p-1 bg-white text-primary border-primary online-form-button">Online form
                            </b-button>
                        </b-col>
                    </b-row>
                </li>                                      
            </ul>           
        </b-row>

        <b-row v-if="showCostsInfo" class="mt-3">
            <p style="display: inline-block; font-weight: 500;">
                Certificate of Costs
            </p>
            <p class="mt-1" style="display: inline-block;">
                At the conclusion of the assessment before the registrar, 
                you may need to complete a Certificate of Costs for the 
                registrar to issue or if the other party who must pay costs 
                has consented to the assessed amount.
            </p>  

            <ol class="mt-1 ml-3 w-100" >
                <li class="my-2">
                    Prepare the form online or the .pdf version.
                    <ul class="mt-1 ml-3" >                         
                        <li > 
                            <b-row style="width: 90%;">
                                <b-col cols="10" style="font-weight: 700;">
                                    Certificate of Costs (Form 17)                                
                                </b-col>                                
                                <b-col cols="2" class="p-0" >
                                    <b-button                                    
                                        @click="startNewForm17Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>      
                        </li>                         
                    </ul>

                </li>  
                <li class="my-2">
                    Submit to the registrar.
                </li>                                    
            </ol>            
        </b-row>

        <b-row :class="showCostsInfo?'mt-1': 'mt-4'" :style="showCostsInfo?'padding-top: 0.25rem;':'padding-top: 0.65rem;'" >
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
        </b-row>  
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component({
    components:{
        ExpandIcon
    }
})
export default class TheHearingAppRightToAppealPg extends Vue { 

    @Prop({required: true})
    app!: boolean;

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void
    
    @form17State.Action
    public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void
    
    showPrepareHearingInfo = true;
    showPointsInfo = false;
    showOrderInfo = false;
    showCostsInfo = false;
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
            this.$emit('adjustHeights', 2, "7rem")
        } else {
            this.showOrderInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showCosts(show: boolean){
        if (show) {
            this.showCostsInfo = true;
            this.$emit('adjustHeights', 3, "43rem")
        } else {
            this.showCostsInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

    public showDirections(show: boolean){
        if (show) {
            this.showDirectionsInfo = true;
            this.$emit('adjustHeights', 4, "14rem")
        } else {
            this.showDirectionsInfo = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }

    public showOrdersSection(){
        
        this.$emit('showOrders');
    }

    public downloadInstructions(pdf_name){

        GetInstructionFile(pdf_name);
        
    }

    public startNewForm17Document(){
        this.UpdateCurrentCertificateOfCostsId(null);
        this.$router.push({name: "start-form17" });
    }

    public startNewForm16Document(){
        this.UpdateCurrentOfferToSettleCostsId(null);
        this.$router.push({name: "start-form16" });
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" })
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