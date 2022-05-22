<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
            Orders Checklist
            <p style="font-size: 18px; font-weight: 300;">
            </p>
        </b-card-header>      

        <b-card v-if="dataReady" :key="update" border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <b-row class="mb-5">
                <b-col cols="1" >               
                    <div>
                        <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Do you want to prepare a consent order?
                    </p>
                    <b-form-radio-group                     
                        v-model="consentOrder"
                        @change="updateConsentOrder()"
                        :options="responseOptions">                   
                    </b-form-radio-group>                 
                </b-col> 
            </b-row> 

            <b-row v-if="displayConsentOrderType" class="mt-2 question">
                <b-col cols="5" class="labels">
                    Please select one of the following options:                                
                </b-col>
                <b-col class="mt-2">                    
                    <b-form-radio-group                    
                        style="max-width:75%" 
                        @change="updateConsentOrderType()"
                        v-model="consentOrderType"
                        :options="consentOrderTypeOptions"                
                    ></b-form-radio-group>
                </b-col>
            </b-row>

            <b-row v-if="displaySingleJusticeOrder" class="mb-5">
                <b-col cols="1">               
                    <div>
                        <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Do you want to prepare an order that was made by a single justice in chambers?
                    </p>               

                    <b-form-radio-group 
                        v-model="singleJusticeOrder"
                        @change="updateSingleJusticeOrder()"
                        :options="responseOptions">               
                    </b-form-radio-group>                     
                    
                </b-col>
                
            </b-row> 

            <b-row v-if="displayMultipleJusticesOrder" class="mb-5">
                <b-col cols="1">               
                    <div>
                        <step-number v-bind:stepNumber="3" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>

                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Do you want to produce an order made by three or more justices?
                    </p> 
                    <b-form-radio-group 
                        v-model="multipleJusticesOrder"
                        @change="updateMultipleJusticesOrder()"
                        :options="responseOptions">                   
                    </b-form-radio-group>
                </b-col>
            </b-row> 

            <b-row v-if="displayVaryOrder" class="mb-5">
                <b-col cols="1" >               
                    <div>
                        <step-number v-bind:stepNumber="4" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div> 
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Do you want to produce an order which varies an order of a justice?
                    </p>
                    <b-form-radio-group 
                        v-model="varyOrder"
                        @change="updateVaryOrder()"
                        :options="responseOptions">                   
                    </b-form-radio-group>                    
                </b-col>
            </b-row>
        </b-card>

        <div
            style="width: 30%; height: 3rem; padding:0;"
            class="mt-4 p-0"> 
            <b-button 
                v-if="displayForm10"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm10Document()"
                >
                <span style="font-size: 20px;">Continue to Form 10</span>
            </b-button>
            <b-button 
                v-else-if="displayForm11"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm11Document()"
                >
                <span style="font-size: 20px;">Continue to Form 11</span>
            </b-button>  
            <b-button 
                v-else-if="displayForm12"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm12Document()"
                >
                <span style="font-size: 20px;">Continue to Form 12</span>
            </b-button>
            <b-button 
                v-else-if="displayForm13"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm13Document()"
                >
                <span style="font-size: 20px;">Continue to Form 13</span>
            </b-button>
            <b-button 
                v-else-if="displayForm14"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm14Document()"
                >
                <span style="font-size: 20px;">Continue to Form 14</span>
            </b-button>
            <b-button 
                v-else-if="displayForm15"
                class="bg-success text-white ml-4"
                style="opacity:1;"
                @click="startNewForm15Document()"
                >
                <span style="font-size: 20px;">Continue to Form 15</span>
            </b-button>
        </div>     
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import StepNumber from "@/components/utils/StepNumber.vue";

@Component({
    components:{
        StepNumber
    }
})
export default class ChecklistOrders extends Vue {    

    @form10State.Action
    public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void

    @form11State.Action
    public UpdateCurrentOrderMultipleJusticesId!: (newCurrentOrderMultipleJusticesId: string) => void
	 
    @form12State.Action
    public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
	    
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 
   

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    consentOrderTypeOptions = [
        {text: 'extend the time to file a document (Form 13)', value: 13},
        {text: 'remove an appeal from the inactive list (Form 14)', value: 14},
        {text: 'in the case of any other consent order (Form 15)', value: 15}
    ];

    dataReady = false;
    stepStyle = "font-size: 2rem;";

    consentOrder = null;
    consentOrderType = 0;
    singleJusticeOrder = null;
    multipleJusticesOrder = null;
    varyOrder = null;

    displayConsentOrderType = false;
    displaySingleJusticeOrder = false;
    displayMultipleJusticesOrder = false;
    displayVaryOrder = false;
    displayForm12 = false;    
    displayForm10 = false;    
    displayForm11 = false;
    displayForm13 = false;
    displayForm14 = false;
    displayForm15 = false;

    update = 0;
    
    mounted(){

        this.dataReady = false;
        this.consentOrder = null;
        this.consentOrderType = 0;
        this.singleJusticeOrder = null;
        this.multipleJusticesOrder = null;
        this.varyOrder = null;
        this.resetValues();
        this.dataReady = true;       

    }

    public resetValues(){
        this.displayConsentOrderType = false;
        this.displaySingleJusticeOrder = false;
        this.displayMultipleJusticesOrder = false;
        this.displayVaryOrder = false;
        this.displayForm12 = false;    
        this.displayForm10 = false;    
        this.displayForm11 = false;
        this.displayForm13 = false;
        this.displayForm14 = false;
        this.displayForm15 = false;
    }

    public updateConsentOrder(){
        this.resetValues();
        this.displayConsentOrderType = this.consentOrder;   
        this.displaySingleJusticeOrder = this.consentOrder == false;     
        this.update++;
    }

    public updateConsentOrderType(){  
        this.resetValues();
        this.displayConsentOrderType = true;     
        this.displayForm13 = this.consentOrderType == 13;
        this.displayForm14 = this.consentOrderType == 14;
        this.displayForm15 = this.consentOrderType == 15;        
        this.update++;
    }

    public updateSingleJusticeOrder(){
        this.resetValues();
        this.displaySingleJusticeOrder = true;
        this.displayForm10 = this.singleJusticeOrder; 
        this.displayMultipleJusticesOrder = this.singleJusticeOrder == false;        
        this.update++;
    }

    public updateMultipleJusticesOrder(){
        this.resetValues();
        this.displaySingleJusticeOrder = true;
        this.displayMultipleJusticesOrder = true;
        this.displayVaryOrder = this.multipleJusticesOrder;        
        this.update++;
    }  

    public updateVaryOrder(){
        this.resetValues();
        this.displaySingleJusticeOrder = true;
        this.displayMultipleJusticesOrder = true;
        this.displayVaryOrder = true; 
        this.displayForm11 = this.varyOrder == false;
        this.displayForm12 = this.varyOrder;         
        this.update++;
    }

    public startNewForm10Document(){
        this.UpdateCurrentOrderSingleJusticeId(null);
        this.$router.push({name: "start-form10" });
    }

    public startNewForm11Document(){
        this.UpdateCurrentOrderToVarySingleJusticeId(null);
        this.$router.push({name: "start-form11" });
    }    

    public startNewForm12Document(){
        this.UpdateCurrentOrderToVarySingleJusticeId(null);
        this.$router.push({name: "start-form12" });
    }

    public startNewForm13Document(){
        // this.UpdateCurrentOrderToVarySingleJusticeId(null);
        // this.$router.push({name: "start-form4" });
    }

    public startNewForm14Document(){
        // this.UpdateCurrentOrderToVarySingleJusticeId(null);
        // this.$router.push({name: "start-form4" });
    }

    public startNewForm15Document(){
        // this.UpdateCurrentOrderToVarySingleJusticeId(null);
        // this.$router.push({name: "start-form4" });
    }

}
</script>