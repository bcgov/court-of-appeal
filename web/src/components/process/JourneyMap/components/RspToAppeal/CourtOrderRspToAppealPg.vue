<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold; padding:0;">
                For more information about the court order process, click the topics below:
            </div>            
        </b-row>        

        <b-row class="mt-4 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                target="_blank">How will I find out about my judgment?
            </a>                               
        </b-row>
        <b-row class="mt-2 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/4.2-costs?ct=t(sidebar-link)"
                target="_blank">Who is responsible for paying for the hearing?
            </a>                               
        </b-row>
        <b-row class="mt-2 ml-3" >            
            <a 
                href="https://www.courtofappealbc.ca/respondent-guidebook/step-3-after-hearing?ct=t(sidebar-link)"
                target="_blank">How do I prepare my court order?
            </a>                               
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CourtOrderRspToAppealPg extends Vue { 


}
</script>

<style scoped lang="scss">

</style>