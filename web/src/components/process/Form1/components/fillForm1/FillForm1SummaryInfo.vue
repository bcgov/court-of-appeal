<template>
    
    <b-card header-tag="header" class="mb-4 border-white bg-white">

        <h2 class="ml-4 pl-2 mt-3 text-primary" >Lower Court Case Information</h2>
        <b-card-header 
            class="mx-4 rounded" 
            header-bg-variant="primary" 
            header-border-variant="white">                
            <fill-form-1-header-info @displayResults="displayResults"/>
        </b-card-header>        

        <b-card v-if="dataReady" class="bg-white border-white text-dark mx-2">
            <b-row>
                <b-col cols="4">
                    <span class="labels">Level Of Court</span>
                    <span style="display: block;">{{levelOfCourt}}</span>

                </b-col>
                <b-col cols="4">
                    <span class="labels">Supreme Court File No.</span>
                    <span style="display: block;">{{form1Info.lowerCourtFileNo}}</span>

                </b-col>
                <b-col cols="4">
                    <span class="labels">Supreme Court Registry</span>
                    <span style="display: block;">{{form1Info.lowerCourtRegistryName}}</span>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="4">
                    <span class="labels">Name Of Judge</span>
                    <span style="display: block;">{{judgeFullName}}</span>
                </b-col>           
            </b-row>

            <b-row class="mt-4">
                <b-col cols="4">
                    <span class="labels">Date Of Order</span>
                    <span style="display: block;">{{form1Info.dateOfJudgement | beautify-date-month}}</span>
                </b-col>           
            </b-row>

            <b-row class="mt-4 mx-5 bg-info p-3" style="border-radius: 1rem;">
                <b-col cols="1">
                    <b-icon-question-circle-fill class="mt-3 ml-3" scale="4" variant="primary"/>
                </b-col>
                <b-col>
                    Please ensure that you review the date of the order noted above to confirm that it is accurate. 
                    Should you find the date above is wrong, please contact the 
                    <a                
                        href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations?keyword=courthouse%26keyword=locations"
                        target="_blank">court registry</a>.
                
                </b-col>
            </b-row>
        </b-card>

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Length of the Lower Court hearing: 
                <p :class="form1InfoStates.appearanceDays == false?'content text-danger':'content text-primary'">
                    Indicate in days or hours the length of the hearing 
                    that led to the order you are appealing from. For 
                    example, if you are appealing a judgment from a 
                    trial that took two hours, enter “two hours.”
                </p>                               
            </b-col>
            <b-col class="mt-2">
                <b-form-input    
                    style="width: 15rem; display: inline-block;"                    
                    :state="form1InfoStates.appearanceDays"
                    @change="update"
                    v-model="trialDurationDays"                            
                    size="md"
                    type="text"                        
                ></b-form-input>   
            </b-col>
        </b-row>  

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                City where the Order was Pronounced                                
            </b-col>
            <b-col class="mt-2">
                <b-form-input
                    :state="form1InfoStates.cityOfOrder"
                    @change="update"
                    style="max-width:100%" 
                    v-model="cityOfOrder">
                </b-form-input> 
            </b-col>
        </b-row>
        
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import FillForm1HeaderInfo from "@/components/process/Form1/components/fillForm1/FillForm1HeaderInfo.vue";
import { locationsInfoType } from '@/types/Common';
import { form1StatesInfoType, form1DataInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        FillForm1HeaderInfo
    }
})
export default class FillForm1SummaryInfo extends Vue {    

    @informationState.State
    public caseLocation: locationsInfoType;

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.State
    public form1Info: form1DataInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    levelOfCourt = "Supreme Court of BC";  
    judgeFullName = "";
    trialDurationDays = "";
    cityOfOrder = "";
    dataReady = false;

    mounted() { 
        this.dataReady = false; 
        this.judgeFullName = 
            this.form1Info.honorificTitle + ' ' + 
            this.form1Info.nameOfJudge;
        this.trialDurationDays = this.form1Info.trialDurationDays?this.form1Info.trialDurationDays:'';
        this.cityOfOrder = this.form1Info.cityOfOrder?this.form1Info.cityOfOrder:'';
        this.update();
        this.dataReady = true;            
    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){ 
              
        const form1 = this.form1Info;
        form1.trialDurationDays = this.trialDurationDays;     
        form1.cityOfOrder = this.cityOfOrder;
        form1.judgeFullName = this.judgeFullName;
        this.UpdateForm1Info(form1);
    }

}
</script>

<style lang="scss" scoped>  

    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 1.15rem !important;
    }
</style>