<template>
    <b-card v-if="dataReady" class="bg-white border-white text-dark">

        <b-row class="ml-1">
            
            <b-form-group
                class="mx-1" 
                style="display: inline;"                    
                label="THE NEW PARTY IS:" 
                label-for="party-type">
                <b-form-radio-group
                    id="party-type"  
                    style="display: inline;"                     
                    @change="enableAdd"
                    v-model="party.isOrganization"
                    :options="partyTypeOptions"                
                ></b-form-radio-group>                
            </b-form-group>
           
        </b-row>

        <b-card v-if="displayWarning" class="bg-danger">

        </b-card>

        <b-card v-else-if="!displayWarning && party.isOrganization">

            <b-row class="mt-4">
                <b-col cols="6">
                    NAME OF JUDGE
                    <span style="display: block;"></span>
                </b-col>   
                <b-col cols="6">
                    NAME OF JUDGE
                    <span style="display: block;"></span>
                </b-col>         
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="float: right"></b-col>
                <b-col cols="6" style="float: right">
                    DATE OF ORDER
                    <span style="display: block;">{{supremeCourtOrderJson.orderDate | beautify-date-month}}</span>
                </b-col>           
            </b-row>

        </b-card>

        <b-card v-else-if="!displayWarning && !party.isOrganization">

            <b-row class="mt-4">
                <b-col cols="6">
                    NAME OF JUDGE
                    <span style="display: block;"></span>
                </b-col>   
                <b-col cols="6">
                    NAME OF JUDGE
                    <span style="display: block;"></span>
                </b-col>         
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="float: right"></b-col>
                <b-col cols="6" style="float: right">
                    DATE OF ORDER
                    <span style="display: block;">{{supremeCourtOrderJson.orderDate | beautify-date-month}}</span>
                </b-col>           
            </b-row>

        </b-card>
                 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';
const informationState = namespace("Information");

@Component
export default class FillForm7AddParty extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public caseLocation: string;

    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

      
    displayWarning = true;
    party = {} as supremeCourtPartiesJsonInfoType;
    dataReady = false;

    mounted() { 
        this.dataReady = false; 
        this.displayWarning = true;
        console.log(this.party)
       

        this.dataReady = true;            
    }

    public enableAdd(){
        this.displayWarning = false;
        this.$emit('enableAdd');
    }

}
</script>

<style scoped lang="scss">

</style>