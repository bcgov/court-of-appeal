<template>
    <b-card v-if="dataReady" class="bg-white border-white text-dark" >

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
                <span style="display: block;">{{caseLocation["value"]}}</span>
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
                    href=""
                    target="_blank">court registry</a>.
            </p>
        </b-row>
                 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
const informationState = namespace("Information");

@Component
export default class FillForm7SummaryInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public caseLocation: string;

    levelOfCourt = "Supreme Court of BC";  
    judgeFullName = "";
    dataReady = false;

    mounted() { 
        this.dataReady = false; 

        this.judgeFullName = this.supremeCourtOrderJson.honorificTitle + ' ' + this.supremeCourtOrderJson.judgeFirstName + ' ' + this.supremeCourtOrderJson.judgeSurname

        this.dataReady = true;
            
    }


}
</script>

<style scoped lang="scss">



</style>