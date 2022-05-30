<template>
    <b-card v-if="dataReady" no-body class="border-light bg-light">

        <b-card class="mb-4 border-white bg-white">  

            <b-row class="mt-2 question">
                <b-col cols="7" class="labels">
                    Are you seeking leave to appeal?                                
                </b-col>
                <b-col>
                    <b-form-radio-group                
                        v-model="commonInfo.applyLeave"
                        :state="form1InfoStates.applyLeave"
                        :class="form1InfoStates.applyLeave==false? 'border border-danger w-50':''"
                        @change="update"
                        :options="responseOptions"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                    <span
                        v-if="(form1InfoStates.applyLeave != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether you are seeking leave to appeal.
                    </span>                   
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Are you amending a Notice of Appeal that has been filed? 
                    <p class="help-content">
                        Pursuant to 
                        <a
                            href=""
                            target="_blank">
                            Rule 84 of the Court of Appeal Rules
                        </a>
                        you may amend a notice of appeal form without permission of 
                        the court or a justice in certain circumstances. Please 
                        ensure that you review the rule for those circumstances.
                    </p>                               
                </b-col>
                <b-col>
                    <b-form-radio-group                
                        v-model="commonInfo.amending"
                        :state="form1InfoStates.amending"
                        :class="form1InfoStates.amending==false? 'border border-danger w-50':''"
                        @change="update"
                        :options="responseOptions"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                    <span
                        v-if="(form1InfoStates.amending != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether you are amending a Notice of Appeal that has been filed.
                    </span>                   
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Does this appeal involve the rights or interests of a child?                                
                </b-col>
                <b-col>
                    <b-form-radio-group                
                        v-model="commonInfo.appealInvolvesChild"
                        :state="form1InfoStates.appealInvolvesChild"
                        :class="form1InfoStates.appealInvolvesChild==false? 'border border-danger w-50':''"
                        @change="update"
                        :options="responseOptions"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>                                   
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What type of proceeding are you appealing from?                                
                </b-col>
                <b-col>
                    <b-form-radio-group
                        v-model="commonInfo.appealFrom"
                        :state="form1InfoStates.appealFrom"
                        :class="form1InfoStates.appealFrom==false? 'border border-danger w-75':''"
                        :disabled="commonInfo.appealTribunal"
                        @change="update" 
                        style="font-size: 1rem;"  
                        stacked                                                                                                     
                        >
                        <b-form-radio
                            v-for="appealFrom in lookups.appealFromOptionsList" 
                            :style="(commonInfo.appealFrom == appealFrom.name)?'font-weight:700;':'font-weight:400;'"
                            :key="appealFrom.name"
                            :value="appealFrom.name">
                                {{appealFrom.name}}
                                <b-icon-question-circle-fill
                                    style="color: #38598a;"
                                    v-b-tooltip:hover.v-info.html="helpText(appealFrom.help).title"                                    
                                    />
                        </b-form-radio>    
                    </b-form-radio-group> 
                    <span
                        v-if="(form1InfoStates.appealFrom != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Type of Order.
                    </span>                   
                </b-col>
            </b-row>      

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Was this matter already appealed in Supreme Court?   
                    <p class="help-content">
                        From a <b>Provincial Court Judge</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Court Civil Rules 18-3
                        </a>
                    </p>
                    <p class="help-content mt-1">
                        From a <b>Master, Registrar or Special Referee</b> to a Supreme Court Judge - 
                        <a                            
                            href=""
                            target="_blank">
                            Supreme Civil Court Rules 23-6(8)
                        </a>
                    </p>
                    <p class="help-content mt-1">
                        From a <b>Tribunal</b> to a Supreme Court Judge - 
                        <a                            
                            href=""
                            target="_blank">
                            Supreme Court Civil Rules 18-3
                        </a>
                    </p>                             
                </b-col>
                <b-col>
                    <b-form-radio-group 
                        class="mt-0"     
                        v-model="commonInfo.wasSupremeAppeal"
                        @change="update"
                        :state="form1InfoStates.wasSupremeAppeal"
                        :class="form1InfoStates.wasSupremeAppeal==false? 'border border-danger w-50':''"
                        style="font-size: 1rem; font-weight:400;" 
                        :options="appealedInSupremeCourtOptions"
                    ></b-form-radio-group> 
                    <span
                        v-if="(form1InfoStates.wasSupremeAppeal != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether this matter was already appealed in Supreme Court.
                    </span>                       
                </b-col>
            </b-row>      

            <b-row v-if="commonInfo.wasSupremeAppeal" class="mt-4 question">
                <b-col cols="7" class="labels">
                    What's the name of the maker of the original decision, direction or order?                                
                </b-col>
                <b-col class="mt-0">
                    <b-form-input
                        :state="form1InfoStates.decisionMaker"  
                        @change="update"              
                        v-model="commonInfo.decisionMaker">
                    </b-form-input> 
                </b-col>
            </b-row>            
            
        </b-card>

        <b-card v-if="commonInfo.applyLeave != null" class="mb-4 border-white bg-white">
            <fill-form-1-sought-info/>           

            <b-row class="my-4 question">
                <b-col cols="7">
                    <div v-if="commonInfo.applyLeave"
                        class="labels">
                        Enter the grounds for leave to appeal:
                        <p class="content text-primary font-italic">
                            Be as specific as possible. For example, if you believe the trial 
                            judge used an incorrect legal test or otherwise misapplied the law, indicate that here.
                        </p>
                    </div>
                    <div v-else
                        class="labels">
                        Enter the order you are seeking on appeal:
                        <p class="content text-primary font-italic">
                            Briefly list the order(s) you will ask this Court to make on appeal. 
                            For example: “Set aside the trial judgment and order a new trial.”
                        </p>
                    </div>                                              
                </b-col>
                <b-col>  
                    <b-form-textarea
                        rows="4" 
                        :state="form1InfoStates.orderSought"
                        @change="update"                   
                        v-model="commonInfo.orderSought">
                    </b-form-textarea>                   
                </b-col>
            </b-row>

            <b-row class="my-4 question">
                <b-col cols="7" >
                    <div v-if="commonInfo.applyLeave"
                        class="labels"> 
                        If you are only seeking leave to appeal one part of the judgment, 
                        enter the part that you are seeking leave to appeal:
                    </div>
                    <div v-else
                        class="labels">
                        If you only want to appeal one part of an order, enter the part that is being appealed:
                    </div>                                              
                </b-col>
                <b-col>  
                    <b-form-textarea
                        rows="4"
                        :state="form1InfoStates.partOfJudgment"  
                        @change="update"              
                        v-model="commonInfo.partOfJudgment">
                    </b-form-textarea>
                   
                </b-col>
            </b-row>          
        </b-card>

        <b-card v-if="commonInfo.applyLeave != null" class="mb-4 border-white bg-white">
            <h2 class="ml-4 mt-3 pl-2 text-primary">Additional Information</h2>            

            <b-row class="my-4 question">
                <b-col cols="7" class="labels">
                   Is there an order sealing any part of the trial court or tribunal file?                                
                </b-col>
                <b-col class="mt-1">  
                    <b-form-radio-group                
                        v-model="commonInfo.orderSealed"
                        :state="form1InfoStates.orderSealed"
                        :class="form1InfoStates.orderSealed==false? 'border border-danger w-50':''"
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

            <b-row v-if="commonInfo.orderSealed" class="my-4 question">
                <b-col cols="7" class="labels">
                    What is the date of this order?                                
                </b-col>
                <b-col class="ml-3 mt-1" style="padding: 0;">  
                    <b-card 
                        class="mt-2" 
                        style="padding: 0; float: center;" 
                        :border-variant="form1InfoStates.dateSealed == false?'danger': 'muted'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="commonInfo.dateSealed"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                    @change="update"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="mb-4 mt-5 question">
                <b-col cols="7" class="labels">
                   Are there orders that protect the identity of a party or parties?                                
                </b-col>
                <b-col class="mt-1">  
                    <b-form-radio-group                
                        v-model="commonInfo.orderBan"
                        :state="form1InfoStates.orderBan"
                        :class="form1InfoStates.orderBan==false? 'border border-danger w-50':''"
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

            <b-row v-if="commonInfo.orderBan" class="my-4 question">
                <b-col cols="7" class="labels">
                    What is the date of this order?                                
                </b-col>
                <b-col class="ml-3 mt-1" style="padding: 0;">  
                    <b-card 
                        class="mt-2" 
                        style="padding: 0; float: center;" 
                        :border-variant="form1InfoStates.dateBan == false?'danger': 'muted'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="commonInfo.dateBan"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                    @change="update"
                                ></v-date-picker>                            
                            </v-app>  
                        </div>  
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="my-5 question">
                <b-col cols="7" class="labels">
                   Which of the following best describes what this appeal involves?                                
                </b-col>
                <b-col class="mt-1">
                    <b-form-checkbox-group
                        style="font-size: 1rem; font-weight:500;"        
                        v-model="commonInfo.involves"
                        :state="form1InfoStates.involves"
                        @change="update"                                     
                        stacked                
                    >                        
                        <b-form-checkbox
                            v-for="involves in lookups.involvesOtherList" 
                            :key="involves.name"
                            :value="involves.name">
                                {{involves.name}}
                                <b-icon-question-circle-fill
                                    style="color: #38598a;"
                                    v-b-tooltip:hover.v-info.html="helpText(involves.help).title"                                    
                                    />
                        </b-form-checkbox> 
                    </b-form-checkbox-group>
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
            this.commonInfo.appealFrom = 'Order of a Tribunal';
        }

        for (const option of this.lookups.involvesOtherList){            
            this.involvesOtherListNames.push(option.name)
        }
    }

    public helpText(content: string){
        return {title: "<div style='margin: 0;'>" +content+ "</div>"};
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
        font-size: 0.75rem; 
        font-weight:400;       
    }    

    .help-content {        
        margin-bottom: 0px !important; 
        font-size: 0.9rem; 
        font-weight:400;       
    } 

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 1.15rem !important;
    }

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    }

</style>