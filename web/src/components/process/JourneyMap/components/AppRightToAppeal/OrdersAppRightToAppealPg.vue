<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                How do I prepare an order?
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
            <div style="text-align: left;">
                An order needs to be prepared when the Court of Appeal has given its decision after 
                an application or an appeal hearing. A consent order may also need to be prepared 
                when extending the time to file a document or when removing an appeal from the 
                inactive list. The parties, not the court, are responsible for preparing the order. 
                Any party can prepare the order, but usually the successful party does so.
            </div>            
        </b-row>   

        <b-row v-if="showOrderInfo" class="mt-4" >
            <ol>
                <li>
                    Prepare the order using the Online form or .PDF.
                    <ul>
                        <li>
                            <b-row class="my-1 w-145">
                                <b-col cols="9" style="font-weight: 700;">
                                   Orders                                   
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="navigateToDraftOrders"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>
                <li>
                    Have all respondents present at the hearing sign the order.
                </li>
                <li>
                    Submit the order to the registry.
                </li>                
            </ol>
        </b-row> 

        <b-row v-if="showOrderInfo" class="mt-3">
            <p>
                For additional information about drafting orders, please 
                review the following information:
            </p>
        </b-row> 

        <b-row v-if="showOrderInfo" class="mt-0">
            <p class="ml-3" >            
                <a 
                    href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/court-orders"
                    target="_blank">Drafting Orders
                </a>                               
            </p>
        </b-row>

        <b-row 
            :class="showOrderInfo?'mt-0': 'mt-4'"
            :style="showOrderInfo?'padding-top: 0;': 'padding-top: 0.75rem;'" >            
            <b-col cols="11" class="pl-0" style="text-align: left; font-weight: bold;">
                What happens if a respondent(s) refuses to sign the order?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showSign(!showSignInfo)"   
                    class="p-1 bg-white border-white expand-steps-button">                   
                    <expand-icon v-bind:showExpanded="showSignInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showSignInfo" class="mt-3">           
             
            <p class="mt-2" style="display: inline-block;">
                If there is disagreement on the form or content of an order, 
                the parties must apply to the registrar to settle the order.
            </p>       

            <p class="mt-1" >            
                On application, the registrar may settle the form or content 
                of an order with or without a hearing.                              
            </p>
        </b-row>

        <b-row v-if="showSignInfo" class="mt-4" >
            <ol class="w-90">
                <li>Obtain application date</li>
                <li>
                    <b-row class="my-1 w-110">
                        <b-col cols="6" style="font-weight: 700;">
                            Prepare Notice of Application (Form 4)                                
                        </b-col>                                
                        <b-col cols="3" class="p-0" >
                            <b-button                                    
                                @click="startNewForm4Document"
                                target="_blank"                                                                                
                                class="p-1 bg-white text-primary border-primary online-form-button">Online form
                            </b-button>
                        </b-col>
                    </b-row>
                </li>          
            </ol>            
        </b-row>
        <b-row v-if="showSignInfo">
            <i>Note: You must attach a copy of the draft order</i>
        </b-row>

        <b-row v-if="showSignInfo" class="mt-3">
            <p>
                For additional information about finding out about your judgement, please 
                review the following information:
            </p>
        </b-row> 
         <b-row v-if="showSignInfo" class="mt-0">
            <p class="ml-3" >            
                <a 
                    href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                    target="_blank">How will I find out about my judgment?
                </a>                              
            </p>
        </b-row>

        <b-row :class="showSignInfo?'mt-0': 'mt-4'" :style="showSignInfo?'padding-top: 0;':'padding-top: 0.85rem;'" >
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
       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

@Component({
    components:{
        ExpandIcon
    }
})
export default class OrdersAppRightToAppealPg extends Vue { 

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void
    
    @form17State.Action
    public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void
    
    showOrderInfo = true;
    showSignInfo = false;
    showCostsInfo = false;

    public navigateToDraftOrders() {       
        this.$router.push({name: "checklist-orders"})
    }

    public showOrder(show: boolean){
        if (show) {
            this.showOrderInfo = true;
            this.$emit('adjustHeights', 0, "21rem")
        } else {
            this.showOrderInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showSign(show: boolean){
        if (show) {
            this.showSignInfo = true;
            this.$emit('adjustHeights', 1, "21rem");
        } else {
            this.showSignInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }        
    }

    public showCosts(show: boolean){
        if (show) {
            this.showCostsInfo = true;
            this.$emit('adjustHeights', 2, "43rem")
        } else {
            this.showCostsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" })
    }

    public startNewForm16Document(){
        this.UpdateCurrentOfferToSettleCostsId(null);
        this.$router.push({name: "start-form16" });
    }

    public startNewForm17Document(){
        this.UpdateCurrentCertificateOfCostsId(null);
        this.$router.push({name: "start-form17" });
    }

    public downloadInstructions(pdf_name){

        GetInstructionFile(pdf_name);
        
    }


}
</script>

<style scoped lang="scss">

</style>