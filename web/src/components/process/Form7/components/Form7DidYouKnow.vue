<template>
    <b-card class="bg-white border-white">

        <b-row class="mb-4 ml-1 bg-white border-white" style="font-size: 2rem; font-weight: 700;">            
            Did you know?
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1">               
                <div>
                    <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content">
                    While some appeals are brought without a need to seek the Court’s permission, some 
                    appeals do require the Court’s permission. This is called seeking leave to appeal.
                </p>
                <p class="content">
                    Always consult 
                    <a  target="_blank"
                        href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/297_2001a#part2">
                    Rule 2.1</a> 
                    of the Court of Appeal Rules to determine whether you need the Court’s permission. 
                    If you do, you cannot use this process and must, instead, file 
                    <a  target="_blank"
                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Civil_Rules_Forms.aspx">
                        Form 1</a> 
                    in person or using the regular e-filing process. More information 
                    for self-represented litigants is available at 
                    <a  target="_blank"
                        href="http://www.courtofappealbc.ca/">
                        Court of Appeal Information</a>
                </p>                            
                
            </b-col>            
        </b-row> 

        <b-row >
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content">
                    If you want to stop the enforcement of a Supreme Court order, you seek a stay of 
                    proceedings. You do not do that here. To seek a stay, you must file a separate 
                    Notice of Motion and a Motion Book: see 
                    <a  target="_blank"
                        href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/297_2001a#section7">
                    Rule 7</a> of the Court of Appeal Rules.
                </p>
                <p class="content">
                    Do not seek a stay or an order “stopping” the Supreme Court order from being 
                    enforced in the “order sought” field of the notice of appeal form.
                </p>         
                
            </b-col>
            
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import StepNumber from "@/components/utils/StepNumber.vue";

@Component({
    components:{
        StepNumber
    }
})
export default class Form7DidYouKnow extends Vue {

    stepStyle = "font-size: 2rem;"
    
}
</script>

<style scoped lang="scss">

    .step-number {
        border-radius: 50%;
        padding: 20px;
    }

    .content {        
        margin-bottom: 8px !important;        
    }

</style>