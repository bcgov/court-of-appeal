<template>
    
    <b-card v-if="dataReady" no-body class="mb-4 border-light bg-light">

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
                :state="form7InfoStates.respondents || form7InfoStates.appellants"
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
                        @click="showConfirmEditParty(row, true, true)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Appellant'"  
                        @click="showConfirmEditParty(row, true, false)"        
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
                        @click="showConfirmEditParty(row, false, true)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''"  
                        @click="showConfirmEditParty(row, false, false)"        
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
            <span
                v-if="(form7InfoStates.respondents != null || form7InfoStates.appellants != null)" 
                style="font-size: 0.75rem;" 
                class="mx-4 bg-white text-danger">A minimum of one Appellant and one Respondent is required.
            </span> 

            <hr class="mb-3 mx-4">

            <style-of-proceeding-actions @updateResults="updateTableResults();"/>
          
            <span
                v-if="(!editStyleOfProceedingsEnabled)" 
                style="font-size: 0.75rem;" 
                class="mx-4 bg-white text-danger">A minimum of one Appellant and one Respondent is required to edit style of proceedings.
            </span>

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
                    disabled                    
                    @change="update"
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
                    disabled
                    rows="3"
                    @change="update"
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
                    :state="form7InfoStates.mainAppellant"
                    @change="update"      
                    v-model="styleOfProceedingsInfo.appealingFirm">
                </b-form-input>
            </b-form-group>
            
            <b-form-group
                class="ml-4 mt-4"                
                label="WHOSE ADDRESS OF SERVICE IS" 
                label-for="appellant-address">
                <b-form-textarea 
                    id="appellant-address"
                    rows="3"
                    :state="form7InfoStates.serviceAddress"
                    @change="update"                    
                    v-model="styleOfProceedingsInfo.appealingFirmAddress">
                </b-form-textarea>
                <span
                    v-if="(form7InfoStates.validServiceAddress != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger">
                    Address of service must be in British Columbia (did you forget to include the province?)
                </span>
                
            </b-form-group>
            
        </b-card>
      
        <b-modal size="lg" v-model="showConfirmEditParties" id="bv-modal-confirm-edit-party" header-class="bg-warning text-light">
            
			<template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Edit Parties</h2>                    
            </template>			

            <div>
                You have made edits to the style of cause and modifying the parties will reset these edits.  Do you wish to proceed?
            </div>
			
            <template v-slot:modal-footer>
				<b-button variant="secondary" @click="cancelShowConfirmEditParties()">Cancel</b-button>
                <b-button variant="primary" @click="confirmEditPartyAppealRoles()">OK</b-button>                
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="cancelShowConfirmEditParties()"
                >&times;</b-button>
            </template>

        </b-modal>
        
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");
import "@/store/modules/common";
const commonState = namespace("Common");

import AddAliasForm from './AddAliasForm.vue';
import AddRepresentativeForm from './AddRepresentativeForm.vue';

import { aliasInfoType, form7PartiesInfoType, form7PartiesStatesInfoType, form7StatesInfoType, form7SubmissionDataInfoType, lookupsInfoType, manualSopInfoType, representativeInfoType } from '@/types/Information';
import { supremeCourtCaseJsonDataInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

import sortStyleOfProceeding from './StyleOfProceedingComponents/util/sortStyleOfProceeding'
import styleOfProceedingActions from './StyleOfProceedingComponents/styleOfProceedingsActions.vue'

@Component({
    components:{        
        AddAliasForm,
        AddRepresentativeForm,
        styleOfProceedingActions        
    },
    directives:{
        sortStyleOfProceeding
    }
})
export default class FillForm7StyleOfProceedingsInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;    

    @informationState.State
    public form7SubmissionInfo: form7SubmissionDataInfoType;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @commonState.State
    public userName!: string;

    @commonState.State
    public lookups!: lookupsInfoType;    

    @informationState.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void


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
    
   
    dataReady = false;

    partiesList: form7PartiesInfoType[] = []; 
    respondentNames = '';
    respondents: string[] = [];
    respondentSolicitorNames = '';
    respondentSolicitors: string[] = [];     

    updateTable = 0;

    showConfirmEditParties = false;
    rowInfo;
    moveLeft = false;
    moveApp = false;
    
    styleOfProceedingsInfo = {} as form7SubmissionDataInfoType;
    form7PartiesStates = {} as form7PartiesStatesInfoType; 
    editStyleOfProceedingsEnabled = true;   


    @Watch('respondents')
    setRespondentNames(newRespondents: string[]) 
    {
        this.respondentNames = newRespondents.join('; ');
        this.respondentSolicitorNames = this.respondentSolicitors.join('; ');        
    }

    mounted() { 
        this.dataReady = false;
        this.styleOfProceedingsInfo = this.form7SubmissionInfo;   
        this.respondents = [];
        this.respondentSolicitors = [];     
        this.extractInfo();
        this.form7PartiesStates = {} as form7PartiesStatesInfoType;
        this.dataReady = true;                   
    }

    public extractInfo(){
        this.styleOfProceedingsInfo.appealingFirm = this.userName;
        this.partiesList = this.form7SubmissionInfo.parties;
        this.styleOfProceedingsInfo.appellants = this.styleOfProceedingsInfo.appellants?this.styleOfProceedingsInfo.appellants:[];
        this.styleOfProceedingsInfo.respondents = this.styleOfProceedingsInfo.respondents?this.styleOfProceedingsInfo.respondents:[]; 
        for (const respondent of this.styleOfProceedingsInfo.respondents){
            this.respondents.push(respondent.fullName);
            if (respondent.counselName) {
                this.respondentSolicitors.push(respondent.counselName);
            }                       
        }       
        for (const party in this.form7SubmissionInfo.parties){
            const partyInfo = this.form7SubmissionInfo.parties[party];
            this.partiesList[party].title = this.getPartyTitles(partyInfo);            
        }  
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo)      
    }  

    public getPartyTitles(partyInfo: form7PartiesInfoType){
        let title = '';
        if (partyInfo.legalReps.length == 0 && partyInfo.aliases.length == 0){            
            title = partyInfo.lowerCourtRole + "</br>" + partyInfo.fullName;
        } else {

            const repTitle = [];
            for (const legalRep of partyInfo.legalReps){                
                const repFormat = this.lookups.legalRepFormatters[legalRep.repType].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
                repTitle.push(repFormat);
            }
            
            const aliasTitle = [];
            for (const alias of partyInfo.aliases){                    
                aliasTitle.push(alias.nameType + ' ' + alias.name);
            }
           
            const repText = repTitle.length?repTitle.join('</br> or'): '';
            const aliasText = aliasTitle.length?aliasTitle.join('</br>'): '';            
            title = partyInfo.lowerCourtRole + "</br>" + (repText?(repText + "</br>"):'') + aliasText;
        }

        return title;
    }

    public getPartyDisplayName(partyInfo: form7PartiesInfoType){
        let title = '';
        if (partyInfo.legalReps.length == 0 && partyInfo.aliases.length == 0){            
            title = partyInfo.fullName;
        } else {

            const repTitle = [];
            for (const legalRep of partyInfo.legalReps){                
                const repFormat = this.lookups.legalRepFormatters[legalRep.repType].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
                repTitle.push(repFormat);
            }
            
            const aliasTitle = [];
            for (const alias of partyInfo.aliases){                    
                aliasTitle.push(alias.nameType + ' ' + alias.name);
            }
           
            const repText = repTitle.length?repTitle.join('or '): '';
            const aliasText = aliasTitle.length?aliasTitle.join(', '): '';            
            title = (repText?(repText + ", "):'') + aliasText;
        }

        return title;
    }

    public updateTableResults(){
        console.log('updating')
        this.partiesList = this.form7SubmissionInfo.parties;
        this.updateTable++;
    }

    public showConfirmEditParty(row, app, left){

        this.rowInfo = row;
        this.moveApp = app;
        this.moveLeft = left;
        if (this.styleOfProceedingsInfo.manualSop?.length > 0){
            this.showConfirmEditParties = true;
        } else {
            this.confirmEditPartyAppealRoles();
        }       
    }

    public cancelShowConfirmEditParties(){
        this.showConfirmEditParties = false;
    }

    public confirmEditPartyAppealRoles(){
        
        this.showConfirmEditParties = false;
        if (this.moveLeft){

            if (this.moveApp){
                this.appLeft(this.rowInfo);
            } else {
                this.resLeft(this.rowInfo)
            }

        } else {

            if (this.moveApp){
                this.appRight(this.rowInfo);
            } else {
                this.resRight(this.rowInfo)
            }

        }
        this.styleOfProceedingsInfo.manualSop = [];
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
    }    

    public appLeft(row){        
        this.partiesList[row.index].appealCourtRole = 'Appellant';
        this.styleOfProceedingsInfo.appellants.push(this.partiesList[row.index]);
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);        
        this.updateTable ++;
    }

    public appRight(row){
        this.partiesList[row.index].appealCourtRole = '';           
        const index = this.styleOfProceedingsInfo.appellants.findIndex(app => app.fullName == this.partiesList[row.index].fullName)
        this.styleOfProceedingsInfo.appellants.splice(index, 1);
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
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
         
        const index = this.styleOfProceedingsInfo.respondents.findIndex(res => res.fullName == this.partiesList[row.index].fullName)
        this.styleOfProceedingsInfo.respondents.splice(index, 1);
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public resRight(row){
        this.partiesList[row.index].appealCourtRole = 'Respondent';
        this.respondents.push(this.partiesList[row.index].fullName);
        if (this.partiesList[row.index].counselName) {
            this.respondentSolicitors.push(this.partiesList[row.index].counselName);
        }        
        this.styleOfProceedingsInfo.respondents.push(this.partiesList[row.index]);
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public update(){        
        
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
    } 

}
</script>

<style scoped lang="scss">

    .labels {
        font-size: 1.15rem; font-weight:600;
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