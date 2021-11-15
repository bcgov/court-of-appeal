<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-1">            
            <div style="text-align: left; font-weight: bold;">
                The appeal process is complete.
            </div>            
        </b-row>        

        <b-row class="mt-4 ml-2" > 
            <p>The Court of Appeal decision is final, unless the Supreme Court of Canada agrees 
            to hear the appellant's case. For more information, please see the
            <a 
                href="https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal"
                target="_blank">Online Guidebook
            </a>, or the 
            <a 
                href="https://www.scc-csc.ca/court-cour/role-eng.aspx#"
                target="_blank"> Supreme Court
            </a>  website.</p>

        </b-row>          
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppealProcessCompleteAppLeaveGrantedPg extends Vue { 


}
</script>

<style scoped lang="scss">

</style>