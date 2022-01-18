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
                style="max-width:75%" 
                :disabled="true"
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
                style="max-width:75%" 
                :state="fileNumberState? null:false"
                v-model="searchParams.file">
            </b-form-input>
            <span 
                style="font-size: 0.75rem;" 
                class="text-secondary ml-2">ex. CA12345
            </span>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Party" 
            label-for="party">
            <b-form-radio-group
                id="party"
                style="max-width:75%" 
                :state="partyState? null:false"
                v-model="searchParams.searchBy"
                :options="partyOptions"                
            ></b-form-radio-group>
           
        </b-form-group>

        <b-form-group
            v-if="searchParams.searchBy=='Organization'"
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Organization Name" 
            label-for="organization-name">
            <b-form-input 
                id="organization-name"
                style="width:150%" 
                v-model="searchParams.organizationName">
            </b-form-input>
        </b-form-group>

        <div v-else>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="First Name" 
                label-for="first-name">
                <b-form-input 
                    id="first-name"
                    style="max-width:75%" 
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
                    style="max-width:75%" 
                    v-model="searchParams.lastName">
                </b-form-input>
            </b-form-group>            
        </div>
        <div>
            <h2 v-if="notFound" style="float:left" class="mt-4"><b-badge variant="danger">No such Court of Appeal document found</b-badge></h2>           
        </div>

        

        <b-button 
            style="float: right;  width: 80px; height: 50px; opacity:1;" 
            :disabled="searching"
            variant="success"
            @click="findFile()"
            ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
            <span style="font-size: 20px;" v-else>Find</span>
        </b-button>               
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { form5SearchInfoType } from '@/types/Information/Form5';
import { partiesDataJsonDataType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form5CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @informationState.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    levelOfCourt = "Court of Appeal";

    fileNumberState = true;
    partyState = true;

    dataReady = false;
    searching = false;

    searchParams = {} as form5SearchInfoType;
    notFound = false;
    partyOptions = [
        {text: 'Individual', value: 'Individual'},
        {text: 'Organization', value: 'Organization'}
    ];

    mounted(){
        this.fileNumberState = true;
        this.partyState = true;
        this.dataReady = false;
        this.searching = false;
        this.dataReady = true; 
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        this.fileNumberState = true;
        this.partyState = true;

        if(!this.searchParams.file){
            this.fileNumberState = false;
            this.searching = false;
            return
        }

        if(!this.searchParams.searchBy){
            this.partyState = false;
            this.searching = false;
            return
        }
        
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
                this.$router.push({name: "fill-form5"})
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