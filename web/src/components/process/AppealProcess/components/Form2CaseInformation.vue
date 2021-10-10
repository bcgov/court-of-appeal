<template>
    <b-card class="ml-4 border-white">
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
            style="float: right;" 
            variant="success"
            @click="findFile()"
            >Find
        </b-button>
               
        
    </b-card>
</template>

<script lang="ts">

import { form2SearchInfoType } from '@/types/Information';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");



@Component
export default class Form2CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    levelOfCourt = "Court of Appeal";

    searchParams = {} as form2SearchInfoType;
    notFound = false;
    respondentOptions = [
        {text: 'Individual', value: 'ind'},
        {text: 'Organization', value: 'org'}
    ];

    public findFile(){
        this.notFound = false;
        console.log('search');
        //if data exists:
        const partiesData = {appellants:[{"name":"One TEST","firstName":"One","lastName":"TEST","solicitor":{"name":"William T. H. Lovatt null","counselFirstName":"William T. H. Lovatt","counselLastName":null,"firmName":"Axis Law","firmPhone":"604 601-8501","addressLine1":"1500 - 701 West Georgia Street","addressLine2":null,"city":"Vancouver","postalCode":"V7Y 1C6","province":"BC"},"partyId":118931}],respondents:[{"name":"Two TEST","firstName":"Two","lastName":"TEST","solicitor":{"name":"Jane Doe","counselFirstName":"Jane","counselLastName":"Doe","firmName":"Edward F. Macaulay Law Corporation","firmPhone":"604 684-0112","addressLine1":"#1400 - 1125 Howe Street","addressLine2":null,"city":"Vancouver","postalCode":"V6Z 2K8","province":"British Columbia"},"partyId":118932}]}
        this.UpdatePartiesJson(partiesData);
        this.UpdateFileNumber(this.searchParams.file)
        this.$router.push({name: "fill"})
        //if doesn't exists
        this.notFound = true;
    }


    


}
</script>

<style scoped lang="scss">



</style>