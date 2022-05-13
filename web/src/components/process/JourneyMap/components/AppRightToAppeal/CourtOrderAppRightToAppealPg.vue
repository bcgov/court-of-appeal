<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left;">
                An order needs to be prepared when the Court of Appeal has given its decision after 
                an application or an appeal hearing. A consent order may also need to be prepared 
                when extending the time to file a document or when removing an appeal from the 
                inactive list. The parties, not the court, are responsible for preparing the order. 
                Any party can prepare the order, but usually the successful party does so.
            </div>            
        </b-row>   
        <b-row class="my-1 w-110">
            <b-col cols="6">
                
            </b-col>                                
            <b-col cols="6" class="p-0" >
                <b-button 
                    class="bg-success mt-2"
                    style="display: block; float: right; height: 50px; opacity:1;"            
                    @click="navigateToDraftOrders()">
                    I need to prepare an order
                </b-button> 
            </b-col>
            
        </b-row>  

        <b-row class="mt-4 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/4.1-getting-judgment?ct=t(step-index-link)"
                target="_blank">How will I find out about my judgment?
            </a>                               
        </b-row>
        <b-row class="mt-2 ml-3" >            
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
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CourtOrderAppRightToAppealPg extends Vue { 

    public navigateToDraftOrders() {       
        this.$router.push({name: "checklist-orders"})
    }


}
</script>

<style scoped lang="scss">

</style>