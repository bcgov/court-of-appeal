<template>
    <b-card class="bg-white border-white w-90">        

        <b-row class="mt-3 ml-4">            
            <div style="text-align: left; font-weight: bold;">
                Was the appellant's leave to appeal granted or refused?
            </div>            
        </b-row>   

        <b-row class="mt-5 ml-2" >            
            <b-col>              
                <b-button 
                    block
                    @click="appLeaveGrantedFinalPath" 
                    variant="outline-primary bg-success text-white" 
                    >
                    Granted
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
            <b-col>
                <b-button 
                    block
                    @click="appLeaveRefusedFinalPath" 
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

import { pathwayTypeInfoType } from '@/types/Information';

@Component
export default class FinalDecisionOnLeaveToAppealAppLeaveRefusedPg extends Vue {  

    @informationState.Action
    public UpdatePathType!:(newPathType: pathwayTypeInfoType) => void

    public appLeaveGrantedFinalPath() {
        
        const pathType = {} as pathwayTypeInfoType;
        pathType.appLeaveGrantedFinal = true;
        this.UpdatePathType(pathType);        
        this.$emit('closeWindow');

    }

    public appLeaveRefusedFinalPath() {

        const pathType = {} as pathwayTypeInfoType;
        pathType.appLeaveRefusedFinal = true;
        this.UpdatePathType(pathType);
        this.$emit('closeWindow');
    }
}
</script>

<style scoped lang="scss">



</style>