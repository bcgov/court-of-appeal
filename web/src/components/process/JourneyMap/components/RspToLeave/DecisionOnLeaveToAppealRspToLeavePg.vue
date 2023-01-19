<template>
    <b-card class="bg-white border-white w-90">        

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Was the appellant's leave to appeal granted or refused?
            </div>            
        </b-row>   

        <b-row class="mt-5" >            
            <b-col>              
                <b-button 
                    block
                    @click="resToLeaveGrantedPath" 
                    variant="outline-primary bg-success text-white" 
                    >
                    Granted
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
            <b-col>
                <b-button 
                    block
                    @click="resToLeaveRefusedPath" 
                    variant="outline-primary bg-success text-white" 
                >Refused
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>     
        </b-row>            
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");
import "@/store/modules/application";
const applicationState = namespace("Application");

import { pathwayTypeInfoType } from '@/types/Information';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

@Component
export default class DecisionOnLeaveToAppealAppApplyLeavePg extends Vue {  

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @informationState.Action
    public UpdatePathType!:(newPathType: pathwayTypeInfoType) => void

    public resToLeaveGrantedPath() {
        
        const pathType = {} as pathwayTypeInfoType;
        pathType.rspToLeaveGranted = true;
        this.UpdatePathType(pathType);                
        this.$emit('closeWindow');

    }

    public resToLeaveRefusedPath() {

        const pathType = {} as pathwayTypeInfoType;
        pathType.rspToLeaveRefused = true;
        this.UpdatePathType(pathType);
        this.$emit('closeWindow');
    }
}
</script>

<style scoped lang="scss">



</style>