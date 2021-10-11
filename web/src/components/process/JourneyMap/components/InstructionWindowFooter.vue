<template>
    <b-card style="width: 100%;" class="bg-white border-white">

        <b-row class="text-danger">            
            <div style="text-align: left; font-weight: bold;">
                Need help?
            </div>            
        </b-row>

        <b-row class="mt-2">
            <b-col style="padding-left: 0;" cols="4" >
                <a 
                    href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal"
                    target="_blank">
                    Visit: Online Guidebook
                </a>
            </b-col>
            <b-col cols="4" >
                <a
                    href="mailto:courts.cso@gov.bc.ca"
                    target="_blank">Email: Courts.cso@gov.bc.ca                                    
                </a>
            </b-col>
            <b-col cols="4">
                <div 
                    style="text-align: right;">
                    Call: 1-800-663-6102
                </div> 
            </b-col>
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class InstructionWindowFooter extends Vue {  
    


}
</script>

<style scoped lang="scss">



</style>