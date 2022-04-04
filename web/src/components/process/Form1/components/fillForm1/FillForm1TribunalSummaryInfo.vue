<template>
    
    <b-card v-if="dataReady" no-body class="mb-4 border-white bg-white">

        <p class="ml-4 mt-2" style="font-size: 1.25rem;">Lower Court Case Information</p>             

        <b-card class="mb-4 bg-white border-white text-dark">

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Type of Tribunal:                                
                </b-col>
                <b-col>
                    <b-form-select                
                        style="width:100%"              
                        v-model="tribunalType" 
                        @change="update"                   
                        :options="tribunalTypes">
                    </b-form-select>
                    <b-form-input
                        v-if="tribunalType == 'Other' || !tribunalTypes.includes(tribunalSummaryInfo.tribunalType)"
                        style="width:100%" 
                        placeholder="Tribunal Type"
                        class="mt-2"
                        @change="update"                                    
                        v-model="otherTribunalType">
                    </b-form-input>
                    <span
                        v-if="(form1InfoStates.tribunalType != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Type of Tribunal.
                    </span>                   
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name of Decision Maker                                
                </b-col>
                <b-col class="mt-2">
                    <b-form-input
                        :state="form1InfoStates.tribunalOriginalDecisionMaker"
                        @change="update"
                        style="max-width:100%" 
                        v-model="tribunalSummaryInfo.tribunalOriginalDecisionMaker">
                    </b-form-input> 
                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                    Date the Order was Pronounced:                                
                </b-col>
                <b-col class="ml-3" style="padding: 0;">  
                    <b-card 
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="form1InfoStates.tribunalDateOfOrder == false?'danger': 'dark'">
                        <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                            <v-date-picker
                                v-model="tribunalSummaryInfo.tribunalDateOfOrder"                           
                                color="warning"             
                                :allowed-dates="allowedDates"                            
                                header-color="red"
                                @change="update"
                            ></v-date-picker>                            
                        </v-app>    
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    City where the Order was Pronounced                                
                </b-col>
                <b-col class="mt-2">
                    <b-form-input
                        :state="form1InfoStates.tribunalLocationOfOrder"
                        @change="update"
                        style="max-width:100%" 
                        v-model="tribunalSummaryInfo.tribunalLocationOfOrder">
                    </b-form-input> 
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    City where the Order was Pronounced                                
                </b-col>
                <b-col class="mt-2">
                    <b-form-input
                        :state="form1InfoStates.tribunalLocationOfOrder"
                        @change="update"
                        style="max-width:100%" 
                        v-model="tribunalSummaryInfo.tribunalLocationOfOrder">
                    </b-form-input> 
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Length of the Lower Court hearing:                                
                </b-col>
                <b-col class="mt-2">
                    <b-form-input    
                        style="width: 6rem; display: inline-block;"                    
                        :state="form1InfoStates.appearanceDays"
                        @change="update"
                        v-model="trialDurationDays"                            
                        size="md"
                        type="text"
                        autocomplete="off"
                        @paste.prevent
                    ></b-form-input>
                    <span class="ml-2 my-auto" style="display: inline-block;">Days</span>
                    <span
                        v-if="(form1InfoStates.appearanceDays != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        The duration should be at least 1 day in length.
                    </span>                    
                </b-col>
            </b-row>         
          
        </b-card>
       
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import FillForm1HeaderInfo from "@/components/process/Form1/components/fillForm1/FillForm1HeaderInfo.vue";
import { form1StatesInfoType, form1DataInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        FillForm1HeaderInfo
    }
})
export default class FillForm1SummaryInfo extends Vue {    

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.State
    public form1Info: form1DataInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    tribunalSummaryInfo = {} as form1DataInfoType;
    
    dataReady = false;
    tribunalTypes = ["type 1", "type 2", "Other"];
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

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
           
        return (date <= day);           
    }

}
</script>