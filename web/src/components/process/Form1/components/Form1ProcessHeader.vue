<template>
    <b-card no-body class="bg-white border-white">

        <b-row v-if="dataReady" class="bg-white border-white">
            <b-col cols="3" >

                <div v-if="stepsCompleted.first">
                    <b-icon-check-circle-fill class="icon-complete ml-1 mt-2" variant="success" />
                    <span v-if="enableAccessPage" @click="navigateToAccessPage" class="step-complete text-success ml-4 mb-2">Access</span> 
                    <span v-else class="step-complete text-success ml-4 mb-2">Access</span>               
                </div>
                <div v-else>
                    <step-number class="ml-1 mt-2" v-bind:stepNumber="1" v-bind:active="true"/>
                    <span :class="textDarkStepIncompleteClass">Access</span>
                </div>               

            </b-col>
             <b-col cols="3">

                <div v-if="stepsCompleted.second" style="text-align: center;">
                    <b-icon-check-circle-fill class="icon-complete mt-2" variant="success" />
                    <span class="step-complete text-success ml-4 mb-2" >Form 1</span>                
                </div>
                <div v-else style="text-align: center;">
                    <step-number class="mt-2"  v-bind:stepNumber="2" v-bind:active="stepsCompleted.first"/>
                    <span 
                        :class="stepsCompleted.first?textDarkStepIncompleteClass:textInactiveStepIncompleteClass">Form 1
                    </span>
                </div>               
                
            </b-col>
            <b-col cols="3" >

                <div v-if="stepsCompleted.third" style="text-align: center;">
                    <b-icon-check-circle-fill class="icon-complete mt-2" variant="success" />
                    <span class="step-complete text-success ml-4 mb-2" >Preview</span>                
                </div>
                <div v-else style="text-align: center;">
                    <step-number class="mt-2"  v-bind:stepNumber="3" v-bind:active="(stepsCompleted.first && stepsCompleted.second)"/>
                    <span 
                        :class="(stepsCompleted.first && stepsCompleted.second)?textDarkStepIncompleteClass:textInactiveStepIncompleteClass">Preview
                    </span>
                </div>               
                
            </b-col>
            <b-col cols="3">

                <div v-if="stepsCompleted.fourth" style="float: right;">
                    <b-icon-check-circle-fill class="icon-complete mt-2" variant="success"/>
                    <span class="step-complete text-success mr-4 ml-3 mb-2">Submit</span>                
                </div>
                <div v-else-if="stepsCompleted.fourthError" style="float: right;">
                    <b-icon-x-circle-fill class="icon-complete mt-2" variant="danger"/>
                    <span class="step-complete text-danger mr-4 ml-3 mb-2">Submit</span>                
                </div>
                <div v-else style="float: right;">
                    <step-number 
                        class="mt-2"  
                        v-bind:stepNumber="4" 
                        v-bind:active="stepsCompleted.first && stepsCompleted.second && stepsCompleted.third"/>
                    <span 
                        :class="((stepsCompleted.first && stepsCompleted.second && stepsCompleted.third)?textDarkStepIncompleteClass:textInactiveStepIncompleteClass) + ' mr-4'">Submit
                    </span>
                </div>  
                               
            </b-col>
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
const commonState = namespace("Common");

import StepNumber from "@/components/utils/StepNumber.vue";
import { form1StatusInfoType, accountInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        StepNumber
    }
})
export default class Form1ProcessHeader extends Vue {  
    
    @Prop({required: true})
    stepsCompleted!: form1StatusInfoType;

    @commonState.State
    public accountInfo!: accountInfoType;

    textInactiveStepIncompleteClass = 'text-inactive step-incomplete';
    textDarkStepIncompleteClass = 'text-dark step-incomplete';

    dataReady = false;
    enableAccessPage = false;

    mounted(){
        this.dataReady = false;
        this.enableAccessPage = this.accountInfo?.accountUsers?.length > 1;
        this.dataReady = true;
    }

    public navigateToAccessPage(){
        if (this.enableAccessPage){
            this.$router.push({name: "access-form1"});
        }
    }

}
</script>

<style scoped lang="scss">

    .step-number {
        border-radius: 50%;
        padding: 20px;
    }

    .step-complete {
        font-size: 20px; 
        font-weight: 700; 
        display: inline-block; 
        transform:translate(10px,-22px);
    }

    .step-incomplete {
        font-size: 20px; 
        font-weight: 700; 
        display: inline-block; 
        transform:translate(15px,10px);
    }

    .icon-complete {
        width: 82px;
        height: 82px;
        transform:translate(15px,7px);
    }

</style>