<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                For more information about the court order process, click the topics below:
            </div>            
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
export default class CourtOrderAppLeaveGrantedPg extends Vue { 


}
</script>

<style scoped lang="scss">

</style>