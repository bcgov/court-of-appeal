<template>
    <b-card class="bg-white border-white">

        <b-row class="bg-white border-white">
            <b-col cols="4" >

                <div v-if="stepsCompleted.first">
                    <b-icon-check-circle-fill class="ml-5 mt-3" variant="success" style="width: 57px;height: 57px;"/>
                    <span class="text-success ml-3 mb-5" style="font-size: 18px; font-weight: 600px; display: inline-block;">Form 2</span>                
                </div>
                <div v-else>
                    <step-number class="ml-5 mt-3" v-bind:stepNumber="1" v-bind:active="true"/>
                    <span class="text-dark" style="font-size: 18px; display: inline;">Form 2</span>
                </div>               

            </b-col>
            <b-col cols="4" >
                <div v-if="stepsCompleted.second">
                    <b-icon-check-circle-fill class="ml-5 mt-3" variant="success" style="width: 57px;height: 57px;"/>
                    <span class="text-success ml-3 mb-5" style="font-size: 18px; font-weight: 600px; display: inline;">Preview</span>                
                </div>
                <div v-else>
                    <step-number class="ml-5 mt-3"  v-bind:stepNumber="2" v-bind:active="stepsCompleted.first"/>
                    <span :class="stepsCompleted.first?'text-dark':'text-secondary'" style="font-size: 18px; display: inline;">Preview</span>
                </div>               
                
            </b-col>
            <b-col cols="4">

                <div v-if="stepsCompleted.third">
                    <b-icon-check-circle-fill class="ml-5 mt-3" variant="success" style="width: 57px;height: 57px;"/>
                    <span class="text-success ml-2 mb-5" style="font-size: 18px; display: font-weight: 600px; inline-block;">Submit</span>                
                </div>
                <div v-else>
                    <step-number class="ml-5 mt-3"  v-bind:stepNumber="3" v-bind:active="stepsCompleted.first && stepsCompleted.second"/>
                    <span :class="(stepsCompleted.first && stepsCompleted.second)?'text-dark':'text-secondary'" style="font-size: 18px; display: inline;">Submit</span>
                </div>                 
            </b-col>
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { form2StatusInfoType } from '@/types/Information';
import { Component, Prop, Vue } from 'vue-property-decorator';

import StepNumber from "@/components/utils/StepNumber.vue";

@Component({
    components:{
        StepNumber
    }
})
export default class Form2ProcessHeader extends Vue {  
    
    @Prop({required: true})
    stepsCompleted!: form2StatusInfoType;

}
</script>

<style scoped lang="scss">

    .step-number {
        border-radius: 50%;
        padding: 20px;
    }

</style>