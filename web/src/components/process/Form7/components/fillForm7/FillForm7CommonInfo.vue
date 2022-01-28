<template>
    <b-card v-if="dataReady" no-body class="mx-auto mb-4 border-light bg-light">

        <b-card class="mb-4 border-white bg-white">                
            <b-form-group
                class="mt-2 ml-4 labels"
                label="Type Of Order" 
                label-for="order-type">
                <b-form-radio-group                
                    v-model="commonInfo.appealFrom"
                    :state="form7InfoStates.appealFrom"
                    @change="update"
                    id="order-type"
                    :options="appealFromOptionsListNames"
                    style="font-size: 1rem; font-weight:400;"                    
                ></b-form-radio-group>
                <span
                    v-if="(form7InfoStates.appealFrom != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Type of Order.
                </span>
            </b-form-group>
                
            <b-form-group
                class="ml-4 mt-5 labels"
                label="Was this matter already appealed in Supreme Court?" 
                label-for="appealed-in-supreme-court">
                <p class="content">
                    From a <b>Provincial Court Judge</b> to a Supreme Court Judge - 
                    <a
                        href=""
                        target="_blank">
                        Supreme Court Civil Rules 18-3
                    </a>
                </p>
                <p class="content mt-1">
                    From a <b>Master, Registrar or Special Referee</b> to a Supreme Court Judge - 
                    <a
                        href=""
                        target="_blank">
                        Supreme Civil Court Rules 23-6(8)
                    </a>
                </p>
                <p class="content mt-1">
                    From a <b>Tribunal</b> to a Supreme Court Judge - 
                    <a
                        href=""
                        target="_blank">
                        Supreme Court Civil Rules 18-3
                    </a>
                </p>
                <b-form-radio-group 
                    class="mt-4"               
                    v-model="commonInfo.wasSupremeAppeal"
                    @change="update"
                    :state="form7InfoStates.wasSupremeAppeal"
                    id="appealed-in-supreme-court"
                    style="font-size: 1rem; font-weight:400;" 
                    :options="appealedInSupremeCourtOptions"
                ></b-form-radio-group> 
                <span
                    v-if="(form7InfoStates.wasSupremeAppeal != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify whether this matter was already appealed in Supreme Court.
                </span>               
            </b-form-group>
            
            <b-form-group
                v-if="commonInfo.wasSupremeAppeal"
                class="ml-4 mt-5 labels"                
                label="What's the name of the maker of the original decision, direction or order?"
                label-for="maker-name">
                <b-form-input 
                    id="maker-name"    
                    :state="form7InfoStates.decisionMaker"  
                    @change="update"              
                    v-model="commonInfo.decisionMaker">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Nature of the Appeal</p>            
            <b-form-group
                class="ml-4 mt-3 labels"               
                label="Which of the following best describes what this appeal involves?" 
                label-for="appeal-nature">
                <div style="margin:0 0 0.25rem 0; font-size: 1rem; font-weight:400;">CIVIL</div>
                <b-form-radio-group  
                    id="appeal-nature"     
                    style="font-size: 1rem; font-weight:500;"        
                    v-model="commonInfo.involves"
                    :state="form7InfoStates.involves"
                    @change="update"
                    :options="involvesOtherListNames"                
                    stacked                
                ></b-form-radio-group>
                <span
                    v-if="(form7InfoStates.involves != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Nature of the Appeal.
                </span>
             </b-form-group>

            <b-form-group
                class="ml-4 mt-3 labels"                
                label="If the appeal is from a part of the judgment only, please specify the part:" 
                label-for="part-of-judgment">
                <b-form-input 
                    id="part-of-judgment"    
                    :state="form7InfoStates.partOfJudgment"  
                    @change="update"              
                    v-model="commonInfo.partOfJudgment">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <fill-form-7-sought-info/>
            <b-form-group
                class="ml-4 mt-3 labels font-italic"                
                label="And further take notice that the Court of Appeal will be moved at the hearing of this appeal for an order that:" 
                label-for="order-sought">
                <b-form-textarea 
                    id="order-sought"
                    rows="4" 
                    :state="form7InfoStates.orderSought"
                    @change="update"                   
                    v-model="commonInfo.orderSought">
                </b-form-textarea>
            </b-form-group>
        </b-card>
        
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import FillForm7SoughtInfo from "@/components/process/Form7/components/fillForm7/FillForm7SoughtInfo.vue";
import { form7StatesInfoType, form7SubmissionDataInfoType, lookupsInfoType } from '@/types/Information';

@Component({
    components:{        
        FillForm7SoughtInfo        
    }
})
export default class FillForm7CommonInfo extends Vue {

    @commonState.State
    public lookups!: lookupsInfoType;
    
    @informationState.State
    public form7SubmissionInfo: form7SubmissionDataInfoType;


    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @informationState.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void


    appealedInSupremeCourtOptions = [
        { text: 'Yes', value: true },
        { text: 'Not Applicable', value: false }
    ]
    
    appealFromOptionsListNames = [];
    involvesOtherListNames = [];

    dataReady = false;
    commonInfo = {} as form7SubmissionDataInfoType;

    mounted() { 
        this.dataReady = false;
        this.commonInfo = this.form7SubmissionInfo;
        this.extractFields();
        this.dataReady = true;
    }

    public extractFields(){
        this.involvesOtherListNames = [];
        this.appealFromOptionsListNames = [];

        for (const option of this.lookups.appealFromOptionsList){            
            this.appealFromOptionsListNames.push(option.name)
        }

        for (const option of this.lookups.involvesOtherList){            
            this.involvesOtherListNames.push(option.name)
        }
    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){        
        this.UpdateForm7SubmissionInfo(this.commonInfo);
    }

}
</script>

<style scoped lang="scss">

    .content {        
        margin-bottom: 0px !important; 
        font-size: 1rem; 
        font-weight:400;       
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>