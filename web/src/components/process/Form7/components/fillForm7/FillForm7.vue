<template>
    <b-card no-body border-variant="light" bg-variant="light">
        <b-card header-tag="header" class="mx-auto mb-4 border-white bg-white">

            <p class="ml-4 mt-2" style="font-size: 1.25rem;">Lower Court Case Information</p>
            <b-card-header class="mx-4 " header-bg-variant="warning" header-border-variant="white" header-text-variant="white">                
                <fill-form-7-header-info @displayResults="displayResults"/>
            </b-card-header>        

            <fill-form-7-summary-info class="mx-2" />

            <b-row class="ml-3">
                <b-col cols="4">
                    DURATION OF TRIAL/HEARING                
                    <b-row class="ml-0 mt-1">
                        <b-form-input                    
                            style="max-width:15%" 
                            v-model="supremeCourtOrderJson.appearanceDays">
                        </b-form-input>
                        <span class="ml-2 my-auto">Days</span>
                    </b-row>
                    <b-row class="ml-0 mt-5 font-weight-bold">Please complete the following fields:</b-row>                
                </b-col>           
            </b-row>
        </b-card>

        <b-card class="mb-4 border-white bg-white">                
                <b-form-group
                    class="mt-2 ml-4 labels"
                    label="Type Of Order" 
                    label-for="order-type">
                    <b-form-radio-group                
                        v-model="orderType"
                        id="order-type"
                        :options="typesOfOrders"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                </b-form-group>
                
                <b-form-group
                    class="ml-4 labels"
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
                    <p class="content">
                        From a <b>Master, Registrar or Special Referee</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Civil Court Rules 23-6(8)
                        </a>
                    </p>
                    <p class="content">
                        From a <b>Tribunal</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Court Civil Rules 18-3
                        </a>
                    </p>
                    <b-form-radio-group                
                        v-model="appealedInSupremeCourt"
                        id="appealed-in-supreme-court"
                        style="font-size: 1rem; font-weight:400;" 
                        :options="appealedInSupremeCourtOptions"                
                        
                    ></b-form-radio-group>
                </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Nature of the Appeal</p>            
            <b-form-group
                class="ml-4 mt-3 labels"
                label="Which of the following best describes what this appeal involves?" 
                label-for="appeal-nature">
                <span style="font-size: 1rem; font-weight:400;">CIVIL</span>
                <b-form-radio-group  
                    id="appeal-nature"     
                    style="font-size: 1rem; font-weight:500;"        
                    v-model="appealNature"
                    :options="appealNatureOptions"                
                    stacked                
                ></b-form-radio-group>
             </b-form-group>

            <b-form-group
                class="ml-4 mt-3 labels"                
                label="If the appeal is from a part of the judgement only, please specify the part:" 
                label-for="part-of-judgement">
                <b-form-input 
                    id="part-of-judgement"                    
                    v-model="partOfJudgement">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <fill-form-7-sought-info/>
            <b-form-group
                class="ml-4 mt-3 labels font-italic"                
                label="And further take notice that the Court of Appeal will be moved at the hearing of this appeal for an order that:" 
                label-for="order-sought">
                <b-form-textarea 
                    id="order-sought"
                    rows="4"                    
                    v-model="orderSought">
                </b-form-textarea>
            </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Style of Proceeding</p> 
            <p class="ml-4">
                Include only those parties whose interests are affected by the order sought by the appellant(s). 
                The order of the names will be handled for you.
            </p>

            <b-table
                :key="updateTable"                 
                :items="partiesList"
                :fields="partiesFields"
                class="mx-4 text-center"
                striped
                small 
                responsive="sm"
                > 

                <template v-slot:cell(app)="row">
                    <span v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Appellant'" v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template> 

                <template v-slot:cell(appAction)="row" >
                    <b-button
                        v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''"  
                        @click="appLeft(row)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Appellant'"  
                        @click="appRight(row)"        
                        class="text-white bg-primary my-3 moveButton" 
                        ><b-icon-chevron-right/>
                    </b-button> 
                </template>          

                <template v-slot:cell(title)="row">
                    <span v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''" v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template>
                
                <template v-slot:cell(resAction)="row" >
                    <b-button
                        v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Respondent'"  
                        @click="resLeft(row)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''"  
                        @click="resRight(row)"        
                        class="text-white bg-primary my-3 moveButton" 
                        ><b-icon-chevron-right/>
                    </b-button>
                </template>

                <template v-slot:cell(res)="row">
                    <span v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Respondent' " v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template>                
                
            </b-table> 
            <hr class="mb-3 mx-4">
            <b-row class="mx-0">
                <b-col cols="2" style="padding-right: 0;" >
                    <b-button 
                        style="float: left; padding-right: 0;" 
                        class="bg-transparent border-white text-primary"
                        @click="addParties"
                        >Add another Party
                        <b-icon-plus class="ml-1 mr-0" variant="primary" scale="1.5" />
                    </b-button>
                </b-col>
                <b-col cols="2" style="padding-right: 0;" class="text-center">
                    <b-button
                        class="bg-transparent border-white text-primary"                        
                        @click="editParties"
                        >Edit Parties
                        <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                    </b-button>
                </b-col>
                <b-col cols="3" style="padding-left: 0;">
                    <b-button
                        style="float: left;" 
                        class="bg-transparent border-white text-primary"
                        @click="editStyleOfProceeding"
                        >Edit Style of Proceeding
                        <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                    </b-button>
                </b-col>
            </b-row> 

            <hr class="mb-4 mx-4">
            <p class="ml-4 mt-2 mb-5" style="font-weight:700;">Please ensure that the required names and address fields are completed.</p>

            <p class="ml-4 mt-4">TO THE RESPONDENT(S)</p>
            <b-form-group
                class="ml-4"                
                label="The names of the parties in the Respondent Column above should populate below and you will need to add in the address for service." 
                label-for="respondent-names">
                <b-form-textarea 
                    id="respondent-names"
                    rows="3"                    
                    v-model="respondentNames">
                </b-form-textarea>
            </b-form-group>

            <p class="ml-4 mt-4">AND TO THE RESPONDENT(S) SOLICITOR</p>
            <b-form-group
                class="ml-4"                
                label="If counsel represented the Respondent include their name and address in the box below." 
                label-for="respondent-solicitor">
                <span><b>Note</b>: You may serve a Notice of Appeal to the Respondent(s) solicitor in the lower court.</span>
                <b-form-textarea 
                    id="respondent-solicitor"
                    rows="3"                    
                    v-model="respondentSolicitorNames">
                </b-form-textarea>
            </b-form-group>
            
            <b-form-group
                class="ml-4 mt-4"                
                label="THIS NOTICE OF APPEAL IS GIVEN BY (enter name of lawyer or party)" 
                label-for="appellant">                
                <b-form-input 
                    id="appellant"
                    style="width: 45%;"       
                    v-model="appellant">
                </b-form-input>
            </b-form-group>
            
            <b-form-group
                class="ml-4 mt-4"                
                label="WHOSE ADDRESS OF SERVICE IS" 
                label-for="appellant-address">
                <b-form-textarea 
                    id="appellant-address"
                    rows="3"                    
                    v-model="appellantAddress">
                </b-form-textarea>
            </b-form-group>
            
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Reference Number (optional)</p>           
            
            <b-form-group
                class="ml-4 mt-3 labels"                
                label="If you have a reference number you would like to use for your records, please enter it below:" 
                label-for="reference-number">
                <b-form-input 
                    id="reference-number"                    
                    v-model="referenceNumber">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-row>
            <b-col cols="9" style="padding-right: 0;">
                <b-button 
                    style="float: right;" 
                    variant="primary"
                    @click="saveForm(false)"
                    >
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
            </b-col>
            <b-col cols="3">
                <b-button
                    style="float: right;" 
                    variant="primary"
                    @click="navigateToPreviewPage"
                    >Preview Form
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
        </b-row> 


        <b-modal size="xl" v-model="showAddParty" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="my-2 ml-2">Add Party</h1>
            </template>

            <fill-form-7-add-party @enableAdd="enableAddParty = true;"/>

            <template v-slot:modal-footer>
                <b-button variant="danger" @click="showAddParty = false">Cancel</b-button>
                <b-button 
                    v-if="enableAddParty"
                    variant="success" 
                    @click="showAddParty = false">Add Party
                    <b-icon-plus class="ml-1 mr-0" variant="white" scale="1.5" />
                </b-button>
            </template>

            <template v-slot:modal-header-close>
                <b-button
                    variant="outline-dark"
                    class="closeButton"
                    @click="showAddParty = false"
                    >&times;</b-button
                >
            </template>
        </b-modal> 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/information";
const informationState = namespace("Information");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

import FillForm7HeaderInfo from "@/components/process/Form7/components/fillForm7/FillForm7HeaderInfo.vue";
import FillForm7SummaryInfo from "@/components/process/Form7/components/fillForm7/FillForm7SummaryInfo.vue";
import FillForm7SoughtInfo from "@/components/process/Form7/components/fillForm7/FillForm7SoughtInfo.vue";
import FillForm7AddParty from "@/components/process/Form7/components/fillForm7/FillForm7AddParty.vue";
import { form7PartiesInfoType } from '@/types/Information';

@Component({
    components:{
        FillForm7HeaderInfo,
        FillForm7SummaryInfo,
        FillForm7SoughtInfo,
        FillForm7AddParty
    }
})
export default class FillForm7 extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @commonState.State
    public userName!: string;

    typesOfOrders = [
        { text: 'Trial Judgement', value: 'trial' },
        { text: 'Summary Trial Judgement', value: 'summaryTrial' },
        { text: 'Chambers Judgement', value: 'chambers' }
    ]

    appealedInSupremeCourtOptions = [
        { text: 'Yes', value: 'yes' },
        { text: 'Not Applicable', value: 'NA' }
    ]

    appealNatureOptions = [
        { text: 'Constitutional/Administrative', value: 'admin' },
        { text: 'Civil Procedure', value: 'civilPrcdr' },
        { text: 'Commercial', value: 'comm' },
        { text: 'Motor Vehicle Accidents', value: 'motorVhcl' },
        { text: 'Municipal Law', value: 'municipal' },
        { text: 'Real Property', value: 'realProp' },
        { text: 'Torts', value: 'torts' },
        { text: 'Equity', value: 'NA' },
        { text: 'Wills and estate', value: 'NA' }
    ]

    partiesFields = [
        {
            key:'app',          
            label:'Appellant(s)',                  
            thClass: 'text-white bg-primary text-center',            
            sortable:false            
        }, 
        {
            key:'appAction',          
            label:'',   
            thClass: 'text-white bg-primary text-center',           
            sortable:false            
        }, 
        {
            key:'title',          
            label:'Party (Not affected by the Appeal)',                  
            thClass: 'text-white bg-primary text-center',            
            sortable:false            
        }, 
        {
            key:'resAction',          
            label:'',   
            thClass: 'text-white bg-primary text-center',           
            sortable:false            
        },        
        {
            key: "res",
            label: "Respondent(s)",            
            thClass: 'text-white bg-primary text-center',
            sortable: false
        }
    ]

    orderType = '';
    appealedInSupremeCourt = '';
    appealNature = '';
    partOfJudgement = '';
    orderSought = '';
    respondentNames = '';
    respondents: string[] = [];
    respondentSolicitorNames = '';
    respondentSolicitors: string[] = [];
    appellant = '';
    appellantAddress = '';
    referenceNumber = '';    
    partiesList: form7PartiesInfoType[] = [];      
    updateTable = 0;
    showAddParty = false;
    enableAddParty = false;

    @Watch('respondents')
    setRespondentNames(newRespondents: string[]) 
    {
        this.respondentNames = newRespondents.join('; ');
        this.respondentSolicitorNames = this.respondentSolicitors.join('; ')

    }

    mounted() {  
        this.extractInfo();             
    }

    public extractInfo(){
        this.appellant = this.userName;
        this.partiesList = this.supremeCourtCaseJson.parties;
        for (const party in this.supremeCourtCaseJson.parties){
            this.partiesList[party].title = this.supremeCourtCaseJson.parties[party].lowerCourtRole 
                                            + "</br>" 
                                            + this.supremeCourtCaseJson.parties[party].fullName;
        }
    }    

    public appLeft(row){        
        this.partiesList[row.index].appealCourtRole = 'Appellant';
        this.updateTable ++;
    }

    public appRight(row){
        this.partiesList[row.index].appealCourtRole = '';
        this.updateTable ++;
    }

    public resLeft(row){
        this.partiesList[row.index].appealCourtRole = '';
        const resNameIndex =  this.respondents.indexOf(this.partiesList[row.index].fullName);
        this.respondents.splice(resNameIndex, 1);
        if (this.partiesList[row.index].counselName) {            
            const solicitorNameIndex =  this.respondentSolicitors.indexOf(this.partiesList[row.index].counselName);
            this.respondentSolicitors.splice(solicitorNameIndex, 1);
        }
        this.updateTable ++;
    }

    public resRight(row){
        this.partiesList[row.index].appealCourtRole = 'Respondent';
        this.respondents.push(this.partiesList[row.index].fullName);
        if (this.partiesList[row.index].counselName) {
            this.respondentSolicitors.push(this.partiesList[row.index].counselName);
        }
        this.updateTable ++;
    }

    public checkValidAddress(){

        const requiredContent = ['BC', 'B.C.', 'BRITISH COLUMBIA']       
        if (requiredContent.some(v => this.appellantAddress.toUpperCase().includes(v))) {
            return true;
        } else {
            return false;
        }
    }

    public checkWithinAppealPeriod(){
        return !this.supremeCourtOrderJson.isPastDeadline;
    }

    public checkStyleOfCause() {
        // TODO: 
        return true;

    }

    public addParties(){
        // TODO: 
        console.log('Add Parties');
        this.enableAddParty = false;
        this.showAddParty = true;
    }

    public editParties(){
        // TODO: 
        console.log('Edit Parties')
    }

    public editStyleOfProceeding(){
        // TODO: 
        console.log('Edit Style of Proceeding')
    }

    public checkStates(){
        
        const phoneFormat = /^[0-9]{3}-[0-9]{3}\-[0-9]{4}((\s\x[0-9]{4})|)$/;
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const postcodeFormat = /^(([A-Z][0-9][A-Z] [0-9][A-Z][0-9])|([a-z][0-9][a-z] [0-9][a-z][0-9]))?$/;

        

        // const selfRep = this.form2Info.selfRepresented

        // const phone = this.form2Info.serviceInformation.phone?.trim()
        // this.state.phone = (selfRep && phoneFormat.test(phone)==false)? false : null;

        // this.state.counselFirstName = !selfRep && !this.form2Info.serviceInformation.counselFirstName? false : null;
        // this.state.counselLastName =  !selfRep && !this.form2Info.serviceInformation.counselLastName? false : null;
        // this.state.firmName =  !selfRep && !this.form2Info.serviceInformation.firmName?  false : null;
        
        // const firmPhone = this.form2Info.serviceInformation.firmPhone?.trim()
        // this.state.firmPhone = (!selfRep && phoneFormat.test(firmPhone)==false)? false : null;
        
        // const email = this.form2Info.serviceInformation.email?.trim();
        // this.state.email =(email && !emailFormat.test(email) ||(!email && this.form2Info.useServiceEmail))? false : null;
        
        // this.state.addressLine1 = !this.form2Info.serviceInformation.addressLine1? false : null;
        // this.state.city = !this.form2Info.serviceInformation.city? false : null;

        // const postalCode = this.form2Info.serviceInformation.postalCode?.trim()
        // this.state.postalCode = !postcodeFormat.test(postalCode)? false : null;
        
        // for(const field of Object.keys(this.state)){
        //     if(this.state[field]==false)
        //         return false
        // }
        return true            
    }

    public saveForm(draft: boolean) {

        const data = this.getForm7Info();
        
        // if(this.checkStates())
        // {
        //     const url = this.currentCaseId? ('/myforms/'+this.currentCaseId+'/') : '/myforms/';
        //     const method = this.currentCaseId? "put" : "post"
        //     const body = {
        //         type: "form-2",
        //         status:"Draft",
        //         description:"form2",
        //         data: this.form2Info
        //     }  

        //     const options = {
        //         method: method,
        //         url: url,
        //         data: body
        //     }

        //     this.$http(options)
        //     .then(response => {
        //         if(response.data){
        //             if(method == "post") this.UpdateCurrentCaseId(response.data.case_id);
        //             this.UpdateForm2Info(this.form2Info);
        //             if(!draft) this.navigateToPreviewPage(this.currentCaseId);                           
        //         }
        //     }, err => {
        //         const errMsg = err.response.data.error;
                
        //     })
        // }
    }

    public getForm7Info(){
        //TODO: gather info from user input
        return {"parties":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"readOnlyUsers":"[]","readWriteUsers":"[]","lowerCourtLevelCd":"S","lowerCourtLevelName":"Supreme Court of BC","ElectronicallyFiled":"N","id":"00000000-0000-0000-0000-000000000000","lowerCourtFileNo":"S20191119","lowerCourtRegistryId":8807.0007,"lowerCourtRegistryName":"Victoria Law Courts","ceisFileId":5187,"nameOfJudge":"M.L. Drake","honorificTitle":"The Honourable Justice","dateOfJudgement":"2021-11-06T00:00:00-07:00","trialDurationDays":1,"appealSubmissionDeadline":"2021-12-06T16:00:00-08:00","lowerCourtStyleOfCause":"TEST, One v TEST, Two","lowerCourtClassName":"Supreme civil (General)","lowerCourtClassCd":"S","protectionOrder":false,"handTypedNoSearch":false,"appealingFirm":"Han Solo","appealingFirmAddress":"4 - 5 st, BC","manualSop":[],"toRespondents":"One Test","respondentSolicitor":"jhgjg","appealFrom":"Trial Judgment","wasSupremeAppeal":false,"involves":"Civil Procedure","orderSought":"juyhgjgf","styleOfCause":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"savedFromPage":"form"}
    }

    public navigateToPreviewPage(caseId) {  
        
        if (this.checkStates()){
            this.$router.push({name: "preview-form7", params: {caseId: caseId}});
        }
        
    }

    public displayResults(){
        this.$emit('displayResults');
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

    .moveButton {
        padding:0 1px 0 1px;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }



</style>