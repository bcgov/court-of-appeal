<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3 h3">            
            <div style="text-align: left; font-weight: bold;">
                How do I prepare an order?
            </div>            
        </b-row>  

        <b-row class="mt-3">            
            <div style="text-align: left;">
                An order needs to be prepared when the Court of Appeal has given its decision after 
                an application or an appeal hearing. A consent order may also need to be prepared 
                when extending the time to file a document or when removing an appeal from the 
                inactive list. The parties, not the court, are responsible for preparing the order. 
                Any party can prepare the order, but usually the successful party does so.
            </div>            
        </b-row>   

        <b-row class="mt-4" >
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

        <b-row class="mt-3">
            <p>
                For additional information about drafting orders, please 
                review the following information:
            </p>
        </b-row> 
         <b-row class="mt-0">
            <p class="ml-3" >            
                <a 
                    href=""
                    target="_blank">Drafting Orders
                </a>                               
            </p>
        </b-row>

        <b-row class="mt-3">            
            <div class="mb-2" style="text-align: left; font-weight: bold;">
                What happens if a respondent(s) refuses to sign the order?
            </div>  
            <p class="mt-2" style="display: inline-block;">
                If there is disagreement on the form or content of an order, 
                the parties must apply to the registrar to settle the order.
            </p>       

            <p class="mt-1" >            
                On application, the registrar may settle the form or content 
                of an order with or without a hearing.                              
            </p>
        </b-row>

        <b-row class="mt-3">
            <p>
                For additional information about finding out about your judgement, please 
                review the following information:
            </p>
        </b-row> 
         <b-row class="mt-0">
            <p class="ml-3" >            
                <a 
                    href="https://www.courtofappealbc.ca/appellant-guidebook/4.1-getting-judgment?ct=t(step-index-link)"
                    target="_blank">How will I find out about my judgment?
                </a>                              
            </p>
        </b-row>
        
        
        <!-- <b-row class="mt-2 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/4.3-court-orders?ct=t(sidebar-link)"
                target="_blank">Who is responsible for preparing the Court Order?
            </a>                               
        </b-row>
        <b-row class="mt-2 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/4.2-costs?ct=t(sidebar-link)"
                target="_blank">Who is responsible for paying for the hearing?
            </a>                               
        </b-row>         -->
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OrdersAppRightToAppealPg extends Vue { 

    public navigateToDraftOrders() {       
        this.$router.push({name: "checklist-orders"})
    }


}
</script>

<style scoped lang="scss">

</style>