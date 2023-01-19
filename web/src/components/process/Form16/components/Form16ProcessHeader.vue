<template>
    <b-card no-body class="bg-white border-white">

        <b-row class="bg-white border-white">
            <b-col cols="4" >

                <div v-if="stepsCompleted.first">
                    <b-icon-check-circle-fill class="icon-complete ml-1 mt-2" variant="success" />
                    <span class="step-complete text-success ml-4 mb-2">Form 16</span>                
                </div>
                <div v-else>
                    <step-number class="ml-1 mt-2" v-bind:stepNumber="1" v-bind:active="true"/>
                    <span class="text-dark step-incomplete">Form 16</span>
                </div>               

            </b-col>
            <b-col cols="4" >

                <div v-if="stepsCompleted.second" style="text-align: center;">
                    <b-icon-check-circle-fill class="icon-complete mt-2" variant="success" />
                    <span class="step-complete text-success ml-4 mb-2" >Preview</span>                
                </div>
                <div v-else style="text-align: center;">
                    <step-number class="mt-2"  v-bind:stepNumber="2" v-bind:active="stepsCompleted.first"/>
                    <span :class="stepsCompleted.first?'text-dark step-incomplete':'text-inactive step-incomplete'">Preview</span>
                </div>               
                
            </b-col>
            <b-col cols="4">

                <div v-if="stepsCompleted.third" style="float: right;">
                    <b-icon-check-circle-fill class="icon-complete mt-2" variant="success"/>
                    <span class="step-complete text-success mr-4 ml-3 mb-2">Submit</span>                
                </div>
                <div v-else-if="stepsCompleted.thirdError" style="float: right;">
                    <b-icon-x-circle-fill class="icon-complete mt-2" variant="danger"/>
                    <span class="step-complete text-danger mr-4 ml-3 mb-2">Submit</span>                
                </div>
                <div v-else style="float: right;">
                    <step-number class="mt-2"  v-bind:stepNumber="3" v-bind:active="stepsCompleted.first && stepsCompleted.second"/>
                    <span :class="(stepsCompleted.first && stepsCompleted.second)?'text-dark step-incomplete mr-4':'text-inactive step-incomplete mr-4'">Submit</span>
                </div>  
                               
            </b-col>
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { form16StatusInfoType } from '@/types/Information/Form16';

import StepNumber from "@/components/utils/StepNumber.vue";

@Component({
    components:{
        StepNumber
    }
})
export default class Form16ProcessHeader extends Vue {  
    
    @Prop({required: true})
    stepsCompleted!: form16StatusInfoType;

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