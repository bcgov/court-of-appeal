<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <p style="font-size: 1.25rem; ">Court of Appeal Case Information</p>

        <p class="mt-3">Find the Court of Appeal case appeal you are responding to by entering the following case information:</p>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Level of Court" 
            label-for="level-of-court">
            <b-form-input 
                id="level-of-court"
                style="max-width:25%" 
                v-model="levelOfCourt">
            </b-form-input>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Court of Appeal File no." 
            label-for="court-of-appeal-file-no">
            <b-form-input 
                id="court-of-appeal-file-no"
                style="max-width:25%" 
                v-model="searchParams.file">
            </b-form-input>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Respondent" 
            label-for="respondent">
            <b-form-radio-group
                id="respondent"
                style="max-width:25%" 
                v-model="searchParams.searchBy"
                :options="respondentOptions"                
            ></b-form-radio-group>
           
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="First Name" 
            label-for="first-name">
            <b-form-input 
                id="first-name"
                style="max-width:25%" 
                v-model="searchParams.firstName">
            </b-form-input>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Last Name" 
            label-for="last-name">
            <b-form-input 
                id="last-name"
                style="max-width:25%" 
                v-model="searchParams.lastName">
            </b-form-input>
            <h2 v-if="notFound" class=" mt-4"><b-badge variant="danger">No such Court of Appeal document found</b-badge></h2>           
        </b-form-group>

        <b-button 
            style="float: right;  width: 80px; height: 50px;" 
            :disabled="searching"
            variant="success"
            @click="findFile()"
            ><spinner v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
            <span style="font-size: 20px;" v-else>Find</span>
        </b-button>               
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { form2SearchInfoType } from '@/types/Information';
import { partiesDataJsonDataType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form2CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @informationState.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    levelOfCourt = "Court of Appeal";

    dataReady = false;
    searching = false;

    searchParams = {} as form2SearchInfoType;
    notFound = false;
    respondentOptions = [
        {text: 'Individual', value: 'Individual'},
        {text: 'Organization', value: 'Organization'}
    ];

    mounted(){
        this.dataReady = false;
        this.searching = false;
        this.dataReady = true; 
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        
        const url = '/form7s/?'+
            'caseNumber='+(this.searchParams.file?this.searchParams.file:'')+
            '&firstName='+(this.searchParams.firstName?this.searchParams.firstName:'')+
            '&lastName='+(this.searchParams.lastName?this.searchParams.lastName:'')+
            '&searchBy='+(this.searchParams.searchBy?this.searchParams.searchBy:'')+
            '&organizationName='+(this.searchParams.organizationName?this.searchParams.organizationName:''); 
        
        this.$http.get(url)
        .then(res => {
            this.searching = false;
            if(res.data?.parties){
                this.UpdatePartiesJson(res.data.parties);
                this.UpdateFileNumber(this.searchParams.file)
                this.UpdateCurrentCaseId(null);
                this.$router.push({name: "fill"})
            }
            else
                this.notFound = true;
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;     
        });
    }
}
</script>

<style scoped lang="scss">



</style>