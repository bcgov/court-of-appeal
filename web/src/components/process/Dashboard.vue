<template>
    <b-card bg-variant="light" border-variant="white">
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
        <loading-spinner v-if="!dataLoaded" waitingText="Loading ..." />   

        <b-container v-else class="container">            
            <my-documents-table 
                v-bind:enableActions="false" 
                v-bind:title="'Document Reminders'">
            </my-documents-table>
            <b-row no-gutters class="bg-white pt-0">
                <b-button 
                    class="ml-5 mb-3 bg-primary outline-dark"
                
                    @click="navigateToDocumentsPage">
                    View All Documents
                </b-button>
            </b-row>
        </b-container>

        <b-container class="container mt-3">
            <b-row >
                <b-col cols="8">

                    <b-row v-if="journeyStarted" no-gutters class="bg-white">
                        <b-button 
                            @click="restartJourney" 
                            variant="outline-success bg-light text-dark" 
                            class="mt-3 mr-3"
                            style="margin-left:auto; right:0; top: 1; border-width: 2px;">
                            Restart journey
                        </b-button>
                    </b-row>

                    <appeal-process v-if="journeyStarted"></appeal-process>
                    <start-efiling v-else ></start-efiling>

                    
                </b-col>
                <b-col cols="4">

                    <most-used-forms></most-used-forms>
                    <need-help class="mt-3"></need-help>

                </b-col>
            </b-row>
        </b-container>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import MyDocumentsTable from "@/components/process/myDocuments/MyDocumentsTable.vue";
import AppealProcess from "@/components/process/appealProcess/AppealProcess.vue";
import StartEfiling from "@/components/process/appealProcess/StartEfiling.vue";
import NeedHelp from "@/components/utils/NeedHelp.vue";
import MostUsedForms from "@/components/utils/MostUsedForms.vue";

@Component({
    components:{
        MyDocumentsTable,
        AppealProcess,
        StartEfiling,
        NeedHelp,
        MostUsedForms
    }
})
export default class DashboardPage extends Vue {

    
    @informationState.Action
    public UpdateCasesJson!: (newCasesJson: any) => void

    @informationState.Action
    public UpdateJourneyJson!: (newJourneyJson: any) => void


    dataLoaded = false;    
    journeyStarted = false;
    error = '';

    casesJson = {};
    journeyJson = {};

    mounted() {  
        this.dataLoaded = false;
        this.loadInfo();
       
    }

    public loadInfo () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
    
        // this.$http.get('/journey/')
        // .then((response) => {

            const response = {"journey":{"id":6,"type":"respondToNoticeOfAppeal","state":"started","userid":12,"ca_number":null,"steps":"[{\"status\":\"draft\",\"type\":\"form-2\"},{\"status\":\"new\",\"type\":\"package\"},{\"status\":\"new\",\"type\":\"file\"},{\"status\":\"new\",\"type\":\"hearing\"},{\"status\":\"new\",\"type\":\"courtorder\"}]"}};
            
            this.journeyJson = response;
            if (this.journeyJson['journey']['state'] == "started"){
                this.journeyStarted = true;
            }
            this.UpdateJourneyJson(this.journeyJson['journey'])

            this.loadCases();     
        // },(err) => {
        //     this.dataLoaded = true;
        //     this.error = err;        
        // });
    }

    public loadCases () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
    
        // this.$http.get('/cases/')
        // .then((response) => {

            const response = {"cases":[{"id":22,"personId":12,"type":"form-2","status":"Draft","modified":"2021-09-10T15:49:35Z","packageUrl":null,"data":{"formSevenNumber":"CA39029","appellants":[{"name":"One TEST","firstName":"One","lastName":"TEST","solicitor":{"name":"William T. H. Lovatt null","counselFirstName":"William T. H. Lovatt","counselLastName":null,"firmName":"Axis Law","firmPhone":"604 601-8501","addressLine1":"1500 - 701 West Georgia Street","addressLine2":null,"city":"Vancouver","postalCode":"V7Y 1C6","province":"BC"},"partyId":118931,"id":0}],"respondents":[{"name":"Two TEST","firstName":"Two","lastName":"TEST","solicitor":{"name":"Jane Doe","counselFirstName":"Jane","counselLastName":"Doe","firmName":"Edward F. Macaulay Law Corporation","firmPhone":"604 684-0112","addressLine1":"#1400 - 1125 Howe Street","addressLine2":null,"city":"Vancouver","postalCode":"V6Z 2K8","province":"British Columbia"},"partyId":118932,"id":0,"responding":true}],"useServiceEmail":true,"sendNotifications":true,"serviceInformation":{"province":"British Columbia","country":"Canada","selectedContactId":0,"name":"Two TEST","addressLine1":"4 - 5 st","addressLine2":null,"city":"Coquitlam","postalCode":"V3K1C9","phone":"9876543654","email":"email@yahoo.com"},"selfRepresented":true,"version":"0.1"}}]};
            
            this.casesJson = response;
            this.UpdateCasesJson(this.casesJson['cases'])

            this.dataLoaded = true;       
        // },(err) => {
        //     this.dataLoaded = true;
        //     this.error = err;        
        // });
    }

    public restartJourney() {
        this.journeyStarted = false;
    }

    public navigateToDocumentsPage() {

        this.$router.push({name: "my-documents" }) 

    }


}
</script>

<style scoped lang="scss">

@import "src/styles/common";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

    .home-content {
        padding-bottom: 20px;
        padding-top: 2rem;
        max-width: 950px;
        color: black;
    }

</style>