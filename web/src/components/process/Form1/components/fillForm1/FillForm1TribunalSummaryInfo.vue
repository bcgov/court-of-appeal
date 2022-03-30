<template>
    
    <b-card v-if="dataReady" no-body class="mb-4 border-white bg-white">

        <p class="ml-4 mt-2" style="font-size: 1.25rem;">Lower Court Case Information</p>             

        <b-card class="mb-4 bg-white border-white text-dark">

            <b-form-group
                class="mt-2 ml-4 labels"                 
                label="Type of Tribunal" 
                label-for="type-of-tribunal">
                <b-form-select 
                    id="type-of-tribunal"
                    :options="tribunalTypes"
                    @change="update"
                    style="max-width:75%" 
                    v-model="tribunalType">
                </b-form-select>
                <b-form-input
                    class="mt-2"
                    id="type-of-tribunal"
                    v-if="!tribunalTypes.includes(tribunalSummaryInfo.tribunalType)"
                    @change="update"
                    style="max-width:75%" 
                    v-model="otherTribunalType">
                </b-form-input>
                <span
                    v-if="(form1InfoStates.tribunalType != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Type of Tribunal.
                </span>
            </b-form-group>

            <b-form-group
                class="ml-4 mt-5 labels"
                label="Name of Decision Maker" 
                label-for="decision-maker-name">
                <b-form-input 
                    id="decision-maker-name"
                    :state="form1InfoStates.tribunalOriginalDecisionMaker"
                    @change="update"
                    style="max-width:75%" 
                    v-model="tribunalSummaryInfo.tribunalOriginalDecisionMaker">
                </b-form-input>            
            </b-form-group>     

            <b-form-group
                class="ml-4 mt-5 labels"                
                label="Date the Order was Pronounced" 
                label-for="order-date">
                <b-form-input 
                    type="date"
                    id="order-date"
                    :state="form1InfoStates.tribunalDateOfOrder"
                    @change="update"
                    style="max-width:75%" 
                    v-model="tribunalSummaryInfo.tribunalDateOfOrder">
                </b-form-input>            
            </b-form-group>  

            <b-form-group
                class="ml-4 mt-5 labels"                 
                label="City where the Order was Pronounced" 
                label-for="location">
                <b-form-input
                    style="max-width:75%"
                    id="location" 
                    :state="form1InfoStates.tribunalLocationOfOrder"
                    @change="update"                                                                                                          
                    v-model="tribunalSummaryInfo.tribunalLocationOfOrder">                       
                </b-form-input>                
            </b-form-group> 

            <b-form-group
                class="mt-2 ml-4 labels"                 
                label="Length of the Lower Court hearing" 
                label-for="length-of-hearing">
                <b-form-input 
                    id="length-of-hearing"                   
                    style="max-width:25%" 
                    :state="form1InfoStates.appearanceDays"
                    @change="update"
                    v-model="trialDurationDays">
                </b-form-input>
                <span class="ml-2 my-auto">Days</span>
                <span
                    v-if="(form1InfoStates.appearanceDays != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    The duration should be at least 1 day in length.
                </span>
               
            </b-form-group>
          
        </b-card>
       
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import FillForm1HeaderInfo from "@/components/process/Form1/components/fillForm1/FillForm1HeaderInfo.vue";
import { form1StatesInfoType, form1SubmissionDataInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        FillForm1HeaderInfo
    }
})
export default class FillForm1SummaryInfo extends Vue {    

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.State
    public form1Info: form1SubmissionDataInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1SubmissionDataInfoType) => void

    tribunalSummaryInfo = {} as form1SubmissionDataInfoType;

    
    dataReady = false;
    tribunalTypes = ["type 1", "type 2", "other"];
    otherTribunalType = "";
    tribunalType = "";
    trialDurationDays = 0;

    mounted() { 
        this.dataReady = false; 
        this.tribunalSummaryInfo = this.form1Info;
        this.extractInfo();
        this.dataReady = true;            
    }

    public extractInfo(){

        this.trialDurationDays = this.form1Info.trialDurationDays?Number(this.form1Info.trialDurationDays):0;

        if (this.tribunalTypes.includes(this.tribunalSummaryInfo.tribunalType)){
            this.tribunalType = 'other';
            this.otherTribunalType = this.tribunalSummaryInfo.tribunalType;
        } else {
            this.tribunalType = this.tribunalSummaryInfo.tribunalType;
            this.otherTribunalType = '';
        }

    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){ 
              
        const form1 = this.tribunalSummaryInfo;
        form1.trialDurationDays = this.trialDurationDays.toString(); 
        if (this.tribunalType == 'other'){
            form1.tribunalType = this.otherTribunalType;
        } else {
            form1.tribunalType = this.tribunalType;
        }
          
        this.UpdateForm1Info(form1);
    }

}
</script>