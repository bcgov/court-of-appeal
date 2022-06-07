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
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
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
                    href=""
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

        <b-row v-if="showSignInfo" class="mt-3">
            <p>
                For additional information about finding out about your judgement, please 
                review the following information:
            </p>
        </b-row> 
         <b-row v-if="showSignInfo" class="mt-0">
            <p class="ml-3" >            
                <a 
                    href="https://www.courtofappealbc.ca/appellant-guidebook/4.1-getting-judgment?ct=t(step-index-link)"
                    target="_blank">How will I find out about my judgment?
                </a>                              
            </p>
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
export default class OrdersAppRightToAppealPg extends Vue { 

    showOrderInfo = true;
    showSignInfo = false;

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
            this.$emit('adjustHeights', 1, "14rem");
        } else {
            this.showSignInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }        
    }



}
</script>

<style scoped lang="scss">

</style>