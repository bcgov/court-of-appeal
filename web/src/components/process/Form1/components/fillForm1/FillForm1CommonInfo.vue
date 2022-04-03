<template>
    <b-card v-if="dataReady" no-body class="mb-4 border-light bg-light">

        <b-card class="mb-4 border-white bg-white">  

            <b-form-group
                class="mt-2 ml-4 labels"
                label="Are you seeking leave to appeal? " 
                label-for="apply-leave">
                <b-form-radio-group                
                    v-model="commonInfo.applyLeave"
                    :state="form1InfoStates.applyLeave"
                    @change="update"
                    id="apply-leave"
                    :options="responseOptions"
                    style="font-size: 1rem; font-weight:400;"                    
                ></b-form-radio-group>
                <span
                    v-if="(form1InfoStates.applyLeave != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify whether you are seeking leave to appeal.
                </span>
            </b-form-group>            
            
            
            <b-form-group                
                class="mt-2 ml-4 labels"
                label="What type of proceeding are you appealing from?" 
                label-for="order-type">
                <b-form-radio-group                
                    v-model="commonInfo.appealFrom"
                    :state="form1InfoStates.appealFrom"
                    :disabled="commonInfo.appealTribunal"
                    @change="update"
                    id="order-type"
                    :options="appealFromOptionsListNames"
                    style="font-size: 1rem; font-weight:400;"                    
                ></b-form-radio-group>
                <span
                    v-if="(form1InfoStates.appealFrom != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Type of Order.
                </span>
            </b-form-group>
                
            <b-form-group
                class="ml-4 mt-4 labels"
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
                    :state="form1InfoStates.wasSupremeAppeal"
                    id="appealed-in-supreme-court"
                    style="font-size: 1rem; font-weight:400;" 
                    :options="appealedInSupremeCourtOptions"
                ></b-form-radio-group> 
                <span
                    v-if="(form1InfoStates.wasSupremeAppeal != null)" 
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
                    :state="form1InfoStates.decisionMaker"  
                    @change="update"              
                    v-model="commonInfo.decisionMaker">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-card v-if="commonInfo.applyLeave != null" class="mb-4 border-white bg-white">
            <fill-form-1-sought-info/>           

            <b-row class="my-4" style="padding: 0;">
                <b-col 
                    cols="6" 
                    style="font-weight: 700;" 
                    v-text="commonInfo.applyLeave?'Enter the grounds for leave to appeal:':'Enter the order you are seeking on appeal:'">                                              
                </b-col>
                <b-col class="ml-3 mt-3" style="padding: 0;">  
                    <b-form-textarea
                        rows="4" 
                        :state="form1InfoStates.orderSought"
                        @change="update"                   
                        v-model="commonInfo.orderSought">
                    </b-form-textarea>
                   
                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col 
                    cols="6" 
                    style="font-weight: 700;" 
                    v-text="commonInfo.applyLeave?'If you are only seeking leave to appeal one part of the judgment, enter the part that you are seeking leave to appeal:':'If you only want to appeal one part of a judgment, enter the part that is being appealed:'">
                                              
                </b-col>
                <b-col class="ml-3 mt-3" style="padding: 0;">  
                    <b-form-textarea
                        :state="form1InfoStates.partOfJudgment"  
                        @change="update"              
                        v-model="commonInfo.partOfJudgment">
                    </b-form-textarea>
                   
                </b-col>
            </b-row>

          
        </b-card>

        <b-card v-if="commonInfo.applyLeave != null" class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Additional Information</p>            

            <b-row class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                   Is there an order sealing any part of the trial court or tribunal file?                                
                </b-col>
                <b-col class="ml-3 mt-3" style="padding: 0;">  
                    <b-form-radio-group                
                        v-model="commonInfo.orderSealed"
                        :state="form1InfoStates.orderSealed"
                        @change="update"                        
                        :options="responseOptions"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                    <span
                        v-if="(form1InfoStates.orderSealed != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether there is an order sealing any part of the trial court or tribunal file.
                    </span>
                </b-col>
            </b-row>

            <b-row v-if="commonInfo.orderSealed" class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                    What is the date of this order?                                
                </b-col>
                <b-col class="ml-3" style="padding: 0;">  
                    <b-card 
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="form1InfoStates.dateSealed == false?'danger': 'dark'">
                        <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                            <v-date-picker
                                v-model="commonInfo.dateSealed"                           
                                color="warning"             
                                :allowed-dates="allowedDates"                            
                                header-color="red"
                                @change="update"
                            ></v-date-picker>                            
                        </v-app>    
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                   Are there orders that protect the identity of a party or parties?                                
                </b-col>
                <b-col class="ml-3 mt-3" style="padding: 0;">  
                    <b-form-radio-group                
                        v-model="commonInfo.orderBan"
                        :state="form1InfoStates.orderBan"
                        @change="update"                        
                        :options="responseOptions"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                    <span
                        v-if="(form1InfoStates.orderBan != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether there orders that protect the identity of a party or parties.
                    </span>
                </b-col>
            </b-row>

            <b-row v-if="commonInfo.orderBan" class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                    What is the date of this order?                                
                </b-col>
                <b-col class="ml-3" style="padding: 0;">  
                    <b-card 
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="form1InfoStates.dateBan == false?'danger': 'dark'">
                        <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                            <v-date-picker
                                v-model="commonInfo.dateBan"                           
                                color="warning"             
                                :allowed-dates="allowedDates"                            
                                header-color="red"
                                @change="update"
                            ></v-date-picker>                            
                        </v-app>    
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col cols="6" style="font-weight: 700;">
                   Which of the following best describes what this appeal involves?                                
                </b-col>
                <b-col class="ml-3 mt-3" style="padding: 0;">  
                    <b-form-checkbox-group
                        style="font-size: 1rem; font-weight:500;"        
                        v-model="commonInfo.involves"
                        :state="form1InfoStates.involves"
                        @change="update"
                        :options="involvesOtherListNames"                
                        stacked                
                    ></b-form-checkbox-group>
                    <span
                        v-if="(form1InfoStates.involves != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Nature of the Appeal.
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

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import FillForm1SoughtInfo from "@/components/process/Form1/components/fillForm1/FillForm1SoughtInfo.vue";
import { form1StatesInfoType, form1DataInfoType, lookupsInfoType } from '@/types/Information/Form1';

@Component({
    components:{        
        FillForm1SoughtInfo        
    }
})
export default class FillForm1CommonInfo extends Vue {

    @commonState.State
    public lookups!: lookupsInfoType;
    
    @form1State.State
    public form1Info: form1DataInfoType;

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    appealedInSupremeCourtOptions = [
        { text: 'Yes', value: true },
        { text: 'Not Applicable', value: false }
    ]
    
    appealFromOptionsListNames = [];
    involvesOtherListNames = [];

    dataReady = false;
    commonInfo = {} as form1DataInfoType;

    mounted() { 
        this.dataReady = false;
        this.commonInfo = this.form1Info;
        this.extractFields();
        this.dataReady = true;
    }

    public extractFields(){
        this.involvesOtherListNames = [];
        this.appealFromOptionsListNames = [];

        for (const option of this.lookups.appealFromOptionsList){            
            this.appealFromOptionsListNames.push(option.name)
        }

        if (this.commonInfo.appealTribunal){
            //TODO
            this.commonInfo.appealFrom = 'Order of a Tribunal';
        }

        for (const option of this.lookups.involvesOtherList){            
            this.involvesOtherListNames.push(option.name)
        }
    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){        
        this.UpdateForm1Info(this.commonInfo);
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');           
        return (date <= day);           
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