<template>
    
    <b-card header-tag="header" class="mx-auto mb-4 border-white bg-white">

        <p class="ml-4 mt-2" style="font-size: 1.25rem;">Lower Court Case Information</p>
        <b-card-header 
            class="mx-4 " 
            header-bg-variant="primary" 
            header-border-variant="white">                
            <fill-form-7-header-info @displayResults="displayResults"/>
        </b-card-header>        

        <b-card v-if="dataReady" class="bg-white border-white text-dark">
            <b-row>
                <b-col cols="4">
                    LEVEL OF COURT
                    <span style="display: block;">{{levelOfCourt}}</span>

                </b-col>
                <b-col cols="4">
                    SUPREME COURT FILE NO.
                    <span style="display: block;">{{supremeCourtCaseJson.courtClassCd}}{{supremeCourtCaseJson.fileNumber}}</span>

                </b-col>
                <b-col cols="4">
                    SUPREME COURT REGISTRY
                    <span style="display: block;">{{caseLocation.name}}</span>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="4">
                    NAME OF JUDGE
                    <span style="display: block;">{{judgeFullName}}</span>
                </b-col>           
            </b-row>

            <b-row class="mt-4">
                <b-col cols="4">
                    DATE OF ORDER
                    <span style="display: block;">{{supremeCourtOrderJson.orderDate | beautify-date-month}}</span>
                </b-col>           
            </b-row>

            <b-row class="mt-4 mx-1">
                <p>
                    Please ensure that you review the date of the order noted above to confirm that it is accurate. 
                    Should you find the date above is wrong, please contact the 
                    <a                
                        href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations?keyword=courthouse%26keyword=locations"
                        target="_blank">court registry</a>.
                </p>
            </b-row>
        </b-card>

        <b-row class="ml-2">
            <b-col cols="4">
                DURATION OF TRIAL/HEARING                
                <b-row class="ml-0 mt-1">
                    <b-form-input                    
                        style="max-width:25%" 
                        :state="form7InfoStates.appearanceDays"
                        @change="update"
                        v-model="appearanceDays">
                    </b-form-input>
                    <span class="ml-2 my-auto">Days</span>
                </b-row>
                <span
                    v-if="(form7InfoStates.appearanceDays != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger">
                    The duration should be at least 1 day in length.
                </span>
                                
            </b-col>           
        </b-row>
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
const informationState = namespace("Information");
import FillForm7HeaderInfo from "@/components/process/Form7/components/fillForm7/FillForm7HeaderInfo.vue";
import { form7DataInfoType, form7StatesInfoType } from '@/types/Information';
import { locationsInfoType } from '@/types/Common';

@Component({
    components:{
        FillForm7HeaderInfo
    }
})
export default class FillForm7SummaryInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public caseLocation: locationsInfoType;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    levelOfCourt = "Supreme Court of BC";  
    judgeFullName = "";
    appearanceDays = 0;
    dataReady = false;

    mounted() { 
        this.dataReady = false; 
        this.judgeFullName = 
            this.supremeCourtOrderJson.honorificTitle + ' ' + 
            this.supremeCourtOrderJson.judgeFirstName + ' ' + 
            this.supremeCourtOrderJson.judgeSurname;
        this.appearanceDays = this.supremeCourtOrderJson.appearanceDays;
        this.update();
        this.dataReady = true;            
    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){ 
              
        const form7 = this.form7Info;
        form7.trialDurationDays = this.appearanceDays;     
        form7.judgeFullName = this.judgeFullName;   
        form7.dateOfJudgment = this.supremeCourtOrderJson.orderDate;
        this.UpdateForm7Info(form7);
    }

}
</script>