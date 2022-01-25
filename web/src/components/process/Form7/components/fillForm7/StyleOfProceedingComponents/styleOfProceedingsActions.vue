<template>
    <b-card v-if="dataReady" no-body border-variant="light" bg-variant="light" :key="updatedInfo">
       
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

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");
import "@/store/modules/common";
const commonState = namespace("Common");

import AddAliasForm from './AddAliasForm.vue';
import AddRepresentativeForm from './AddRepresentativeForm.vue';

import { aliasInfoType, form7DataInfoType, form7PartiesInfoType, form7PartiesStatesInfoType, form7StatesInfoType, lookupsInfoType, manualSopInfoType, representativeInfoType } from '@/types/Information';
import { supremeCourtCaseJsonDataInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

import sortStyleOfProceeding from './util/sortStyleOfProceeding'

@Component({
    components:{        
        AddAliasForm,
        AddRepresentativeForm        
    },
    directives:{
        sortStyleOfProceeding
    }
})
export default class styleOfProceedingsActions extends Vue {    

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;    

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @commonState.State
    public userName!: string;

    @commonState.State
    public lookups!: lookupsInfoType;    

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

     partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

    aliasFields = [
        {
            key:'type',          
            label:'Alias Type',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'name',          
            label:'Alias Name',   
            thClass: 'text-white bg-court', 
            thStyle: 'font-size: 1rem;',          
            sortable:false            
        }, 
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }        
    ]

    sopFields = [
        {
            key:'partyName',          
            label:'',                
                      
            sortable:false            
        },
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }        
    ]

    representativeFields = [
        {
            key:'type',          
            label:'Representative Type',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'name',          
            label:'Representative Name',   
            thClass: 'text-white bg-court', 
            thStyle: 'font-size: 1rem;',          
            sortable:false            
        }, 
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }        
    ]

    styleOfProceedingOptions = [
        {text: 'And', value: 'And'},
        {text: 'Between', value: 'Between'},
        {text: 'Re', value: 'Re'},
        {text: 'In The Matter Of', value: 'In The Matter Of'}
    ];

      
    displayWarning = true;

    AddNewAliasForm = false;       
    addAliasFormColor = 'court';
    latestEditAliasData;
    isEditAliasOpen = false;

    AddNewRepresentativeForm = false; 
    addRepresentativeFormColor = 'court';
    latestEditRepresentativeData;
    isEditRepresentativeOpen = false;
    updated = 0;
    updatedPartyInfo = 0;
    
    partyDataReady = false;

     partiesList: form7PartiesInfoType[] = [];  
    party = {} as form7PartiesInfoType;    
    partyToEdit = {} as form7PartiesInfoType;
    updateTable = 0;
    showPartyWindow = false;
    showConfirmDeleteParty = false;
    showConfirmEditStyleOfProceeding = false;
    showEditStyleOfProceedingWindow = false;
    styleOfProceedingDataReady = false;
    enableAddParty = false;
    enableEditParty = false;
    isCreate = false;
    showConfirmEditParties = false;

    styleOfProceedingsInfo = {} as form7DataInfoType;
    form7PartiesStates = {} as form7PartiesStatesInfoType; 
    editStyleOfProceedingsEnabled = true;   
    noRolePartyManualSop: manualSopInfoType[] = [];

    tmpManualSop=[]

    referenceNumber = '';    
    updatedInfo = 0;
    dataReady = false;
   

    mounted() { 

        this.dataReady = false;
        this.styleOfProceedingsInfo = this.form7Info;
        //  this.extractInfo();
        this.form7PartiesStates = {} as form7PartiesStatesInfoType;
        this.dataReady = true;
          
                       
    }    

    public addParties(){       
        this.party = {} as supremeCourtPartiesJsonInfoType;
        this.enableAddParty = false;
        this.isCreate = true;
        this.showPartyWindow = true;
        this.partyDataReady = false; 
        this.displayWarning = true;        
        this.party.aliases = [];
        this.party.legalReps = [];
        this.partyDataReady = true;
    }

    public saveNewParty(){

        if (this.checkPartyStates()){

            if (this.party.isOrganization){
                this.party.fullName = this.party.organizationName;
            } else {
                this.party.fullName = 
                this.party.surname + ', ' + 
                this.party.firstGivenName + 
                (this.party.secondGivenName? ' ' + this.party.secondGivenName:'') +
                (this.party.thirdGivenName? ' ' + this.party.thirdGivenName:'')
            }           

            this.party.title = this.getPartyTitles(this.party);        
            this.partiesList.push(this.party);       
            this.styleOfProceedingsInfo.parties = this.partiesList;
            this.UpdateForm7Info(this.styleOfProceedingsInfo);        
            this.showPartyWindow = false;
            this.updateTable ++;

        }        
    }

    public getPartyTitles(partyInfo: form7PartiesInfoType){
        let title = '';
        if (partyInfo.legalReps.length == 0 && partyInfo.aliases.length == 0){            
            title = partyInfo.lowerCourtRole + "</br>" + partyInfo.fullName;
        } else {

            const repTitle = [];
            for (const legalRep of partyInfo.legalReps){                
                const repFormat = this.lookups.legalRepFormatters[legalRep.type].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
                repTitle.push(repFormat);
            }
            
            const aliasTitle = [];
            for (const alias of partyInfo.aliases){                    
                aliasTitle.push(alias.type + ' ' + alias.name);
            }
           
            const repText = repTitle.length?repTitle.join('</br> or'): '';
            const aliasText = aliasTitle.length?aliasTitle.join('</br>'): '';            
            title = partyInfo.lowerCourtRole + "</br>" + (repText?(repText + "</br>"):'') + aliasText;
        }

        return title;
    }

    public editParties(){
        this.party = {} as supremeCourtPartiesJsonInfoType;
        this.partyToEdit = {} as supremeCourtPartiesJsonInfoType;
        this.enableEditParty = false;
        this.isCreate = false;
        this.showPartyWindow = true;
        this.partyDataReady = false; 
        this.displayWarning = true;
    }

    public saveParty(){
        if (this.party.isOrganization){
            this.party.fullName = this.party.organizationName;
        } else {
            this.party.fullName = 
            this.party.surname + ', ' + 
            this.party.firstGivenName + 
            (this.party.secondGivenName? ' ' + this.party.secondGivenName:'') +
            (this.party.thirdGivenName? ' ' + this.party.thirdGivenName:'')
        }        

        this.party.title = this.getPartyTitles(this.party);
        
        if (this.party.appealCourtRole && this.party.appealCourtRole == 'Respondent') {
            this.party.appealCourtRole = ''
            const resIndex = this.styleOfProceedingsInfo.respondents.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
            if (resIndex != -1) {
                this.styleOfProceedingsInfo.respondents.splice(resIndex, 1);
            }

            const resNameIndex =  this.respondents.indexOf(this.party.fullName);
            if (resNameIndex != -1) {
                this.respondents.splice(resNameIndex, 1);
            }

            if (this.party.counselName) {            
                const solicitorNameIndex =  this.respondentSolicitors.indexOf(this.party.counselName);
                if (solicitorNameIndex != -1){
                    this.respondentSolicitors.splice(solicitorNameIndex, 1);
                }
            }
                  
        } else if (this.party.appealCourtRole && this.party.appealCourtRole == 'Appellant') {
            this.party.appealCourtRole = ''
            const appIndex = this.styleOfProceedingsInfo.appellants.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
            if (appIndex != -1) {
                this.styleOfProceedingsInfo.appellants.splice(appIndex, 1);
            }                     
        } 
         
        const index = this.partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
        this.partiesList[index] = this.party;
        this.styleOfProceedingsInfo.parties = this.partiesList;
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.showPartyWindow = false;
        this.updateTable ++;
    }

    public checkPartyStates(){

        let stateCheck = true;
        if (this.party.isOrganization){

            this.form7PartiesStates.organizationName = !(this.party.organizationName)? false : null;           
            this.form7PartiesStates.lowerCourtRole = !(this.party.lowerCourtRole)? false : null;

        } else {
            this.form7PartiesStates.surname = !(this.party.surname)? false : null;
            this.form7PartiesStates.firstGivenName = !(this.party.firstGivenName)? false : null;
            this.form7PartiesStates.lowerCourtRole = !(this.party.lowerCourtRole)? false : null;
        }
        
        this.updatedPartyInfo ++;

        for(const field of Object.keys(this.form7PartiesStates)){
            if(this.form7PartiesStates[field]==false)
                stateCheck = false;
        }

        return stateCheck;            
    }

    public editStyleOfProceeding(){ 

        if (this.styleOfProceedingsInfo.respondents && 
            this.styleOfProceedingsInfo.respondents.length > 0 &&
            this.styleOfProceedingsInfo.appellants && 
            this.styleOfProceedingsInfo.appellants.length > 0 ){
                this.showConfirmEditStyleOfProceeding = true;
                this.editStyleOfProceedingsEnabled = true;
            } else {
                this.editStyleOfProceedingsEnabled = false;

            }        
    }

    public enableAdd(){
        this.displayWarning = false;
        this.enableAddParty = true;
    }

    public enableEdit(){
        this.displayWarning = false;
        this.enableEditParty = true;
        console.log(this.partyToEdit)
        this.party = this.partyToEdit;
        this.partyDataReady = true;
    }

    public addNewAlias(){
        if(this.isEditAliasOpen){            
            this.addAliasFormColor = 'danger'
        }else{
            this.AddNewAliasForm = true;            
        }
    }

    public addNewRepresentative(){
        if(this.isEditRepresentativeOpen){            
            this.addRepresentativeFormColor = 'danger'
        }else{
            this.AddNewRepresentativeForm = true;            
        }
    }

    public modifyAliasList(isCreateAlias: boolean, newAlias: aliasInfoType, index: number){        

        if (isCreateAlias){           
            this.party.aliases.push(newAlias)
            this.closeAliasForm();
        } else {           
            this.party.aliases[index].type = newAlias.type;
            this.party.aliases[index].name = newAlias.name;           
            this.closeAliasForm();
        }
        this.updated ++;
        
    }

    public removeAlias(data){        
        this.party.aliases.splice(data.index,1);
        this.updated ++;        
    }

    public modifyRepresentativeList(isCreateRep: boolean, newRepresentative: representativeInfoType, index: number){       

        if (isCreateRep){           
            this.party.legalReps.push(newRepresentative)
            this.closeRepresentativeForm();
        } else {           
            this.party.legalReps[index].type = newRepresentative.type;
            this.party.legalReps[index].name = newRepresentative.name;           
            this.closeRepresentativeForm();
        }
        this.updated ++;        
    }

    public removeRepresentative(data){
        this.party.legalReps.splice(data.index,1);
        this.updated ++;
    }

    public closeAliasForm() {                     
        this.AddNewAliasForm= false; 
        this.addAliasFormColor = 'court'
        if(this.isEditAliasOpen){
            this.latestEditAliasData.toggleDetails();
            this.isEditAliasOpen = false;
        } 
    }

    public closeRepresentativeForm() {                     
        this.AddNewRepresentativeForm= false; 
        this.addRepresentativeFormColor = 'court'
        if(this.isEditRepresentativeOpen){
            this.latestEditRepresentativeData.toggleDetails();
            this.isEditRepresentativeOpen = false;
        } 
    }

    public editAlias(data) {
        if(this.AddNewAliasForm || this.isEditAliasOpen){            
            this.addAliasFormColor = 'danger';                     
        }else if(!this.isEditAliasOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditAliasOpen = true;
            this.latestEditAliasData = data            
        }   
    }

    public editRepresentative(data) {
        if(this.AddNewRepresentativeForm || this.isEditRepresentativeOpen){            
            this.addRepresentativeFormColor = 'danger';                     
        }else if(!this.isEditRepresentativeOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditRepresentativeOpen = true;
            this.latestEditRepresentativeData = data;            
        }   
    }    

    public confirmDeleteParty(){        
        this.showConfirmDeleteParty = true;
    }
    
    public cancelPartyDeletion() {
        this.showConfirmDeleteParty = false;
    }

    public deleteParty(){
        
        this.showConfirmDeleteParty = false;
        const index = this.partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
        this.partiesList.splice(index, 1);       
        this.styleOfProceedingsInfo.parties = this.partiesList;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.showPartyWindow = false;
        this.updateTable ++;
    }

    public confirmEditStyleOfProceedings(){ 

        this.styleOfProceedingDataReady = false;
        this.tmpManualSop=this.styleOfProceedingsInfo.manualSop
        this.showEditStyleOfProceedingWindow = true;       
        this.showConfirmEditStyleOfProceeding = false;    
        
        this.noRolePartyManualSop = [];

        this.loadSopInfo(this.styleOfProceedingsInfo.appellants);
        this.loadSopInfo(this.styleOfProceedingsInfo.respondents); 

        this.styleOfProceedingsInfo.manualSop = this.styleOfProceedingsInfo.manualSop.concat(this.noRolePartyManualSop)        

        this.UpdateForm7Info(this.styleOfProceedingsInfo)
        
        this.styleOfProceedingDataReady = true;

    }


    public loadSopInfo(partiesInfo: form7PartiesInfoType[]){        

        if (this.styleOfProceedingsInfo.manualSop && this.styleOfProceedingsInfo.manualSop.length > 0){

            for (const party of partiesInfo){

                const currentSop = this.styleOfProceedingsInfo.manualSop;
                const identicalIndex = currentSop.findIndex(sop => sop.partyName.includes(this.getPartyDisplayName(party)));

                if (identicalIndex != -1){
                    if (currentSop[identicalIndex].lowerCourtRole == party.lowerCourtRole && currentSop[identicalIndex].appealRole == party.appealCourtRole){
                        continue;
                    } else {
                        const nameIndex = currentSop[identicalIndex].partyName.findIndex(name => name == this.getPartyDisplayName(party))
                        this.styleOfProceedingsInfo.manualSop[identicalIndex].partyName.splice(nameIndex, 1);
                        this.prePopulateSop(party);
                    }
                } else {
                    const index = currentSop.findIndex(sop => sop.lowerCourtRole == party.lowerCourtRole && sop.appealRole == party.appealCourtRole);
                    if (index != -1){
                        this.styleOfProceedingsInfo.manualSop[index].partyName.push(this.getPartyDisplayName(party));
                        this.styleOfProceedingsInfo.manualSop[index].plural = true;
                    } else {                        
                        this.prePopulateSop(party);
                    }
                }
            }

        } else {

            this.styleOfProceedingsInfo.manualSop = [];
            for (const party of partiesInfo){
                this.prePopulateSop(party);
            }

        }       

    }

     public prePopulateSop(partyInfo: form7PartiesInfoType){

        let sop = {} as manualSopInfoType;            
        sop.plural = false;
        sop.appealRole = partyInfo.appealCourtRole;
        sop.lowerCourtRole = partyInfo.lowerCourtRole;
        sop.partyName = [];
        sop.partyName.push(this.getPartyDisplayName(partyInfo))
        if (partyInfo.lowerCourtRole == 'NONE (New Party)'){
            sop.conjunction = 'And';
            this.noRolePartyManualSop.push(sop);
        } else if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
                sop.conjunction = 'Between';
                this.styleOfProceedingsInfo.manualSop.unshift(sop);
        } else {
            sop.conjunction = 'And';
            this.styleOfProceedingsInfo.manualSop.push(sop);
        }

    }
    
    public cancelEditStyleOfProceedings() {
        this.showConfirmEditStyleOfProceeding = false;        
    }

    public saveNewStyleOfProceeding(){
        console.log('save new SOP')
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.showEditStyleOfProceedingWindow = false;
    }

    public resetStyleOfProceeding(){
        console.log('reset SOP')
        this.showEditStyleOfProceedingWindow = false;
        this.styleOfProceedingsInfo.manualSop = [];
    }

    public cancelStyleOfProceeding(){
        console.log('cancel SOP')
        this.styleOfProceedingsInfo.manualSop = this.tmpManualSop;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.showEditStyleOfProceedingWindow = false;
    }



    public displayResults(){
        this.$emit('displayResults');
    }
}
</script>

<style scoped lang="scss">

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>