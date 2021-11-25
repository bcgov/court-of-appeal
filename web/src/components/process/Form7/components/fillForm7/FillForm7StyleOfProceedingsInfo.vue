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
                    @change="update"      
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
                    @change="update"                    
                    v-model="styleOfProceedingsInfo.serviceAddress">
                </b-form-textarea>
            </b-form-group>
            
        </b-card>        

        <b-modal size="xl" v-model="showAddParty" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="my-2 ml-2">Add Party</h1>
            </template>

            <b-card v-if="partyDataReady" class="bg-white border-white text-dark">

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
                            v-model="newParty.isOrganization"
                            :options="partyTypeOptions"                
                        ></b-form-radio-group>                
                    </b-form-group>
                
                </b-row>

                <b-card v-if="displayWarning" class="bg-danger text-white border-danger">
                    WARNING: The parties to an appeal are almost always the parties that appear 
                    in the lower court. Do not add parties that were not named on the lower court 
                    file as this may result in your appeal form being rejected.
                </b-card>

                <b-card no-body v-else-if="!displayWarning && newParty.isOrganization" class="border-white">

                    <b-row class="ml-1">
                        <b-col cols="6">                    
                            <b-form-group
                                class="labels"                
                                label="ORGANIZATION NAME" 
                                label-for="organization-name">
                                <b-form-input 
                                    id="organization-name"             
                                    v-model="newParty.organizationName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>   
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                        
                                label="LOWER COURT ROLE:" 
                                label-for="court-role">
                                <b-form-select                            
                                    id="court-role"             
                                    v-model="newParty.lowerCourtRole"                    
                                    :options="lookups.lowerCourtRoles">
                                </b-form-select>                        
                            </b-form-group>       
                        </b-col>         
                    </b-row>

                    <b-row class="ml-1">
                        <b-col cols="6" ></b-col>
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                
                                label="COUNSEL NAME:" 
                                label-for="counsel-number">
                                <b-form-input 
                                    id="counsel-name"                 
                                    v-model="newParty.counselName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>           
                    </b-row>

                </b-card>

                <b-card no-body v-else-if="!displayWarning && !newParty.isOrganization" class="border-white">

                    <b-row class="ml-1">
                        <b-col cols="6">                    
                            <b-form-group
                                class="labels"                
                                label="SURNAME:" 
                                label-for="surname">
                                <b-form-input 
                                    id="surname"                  
                                    v-model="newParty.surname">
                                </b-form-input>
                            </b-form-group>
                        </b-col>   
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                        
                                label="LOWER COURT ROLE:" 
                                label-for="court-role">
                                <b-form-select                            
                                    id="court-role" 
                                    v-model="newParty.lowerCourtRole"                    
                                    :options="lookups.lowerCourtRoles">
                                </b-form-select>                        
                            </b-form-group>       
                        </b-col>         
                    </b-row>

                    <b-row class="ml-1">
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                
                                label="FIRST GIVEN NAME:" 
                                label-for="first-name">
                                <b-form-input 
                                    id="first-name"                                                      
                                    v-model="newParty.firstGivenName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                
                                label="COUNSEL NAME:" 
                                label-for="counsel-number">
                                <b-form-input 
                                    id="counsel-name"                                                       
                                    v-model="newParty.counselName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>           
                    </b-row>
                    <b-row class="ml-1">
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                
                                label="SECOND GIVEN NAME:" 
                                label-for="second-name">
                                <b-form-input 
                                    id="second-name"                    
                                    v-model="newParty.secondGivenName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>                     
                    </b-row>
                    <b-row class="ml-1">
                        <b-col cols="6">
                            <b-form-group
                                class="labels"                
                                label="THIRD GIVEN NAME:" 
                                label-for="third-name">
                                <b-form-input 
                                    id="third-name"                    
                                    v-model="newParty.thirdGivenName">
                                </b-form-input>
                            </b-form-group>
                        </b-col>                     
                    </b-row>            
                </b-card>

                <b-card no-body v-if="!displayWarning" class="border-white">

                    <b-card no-body class="border-white">
                        <b-row class="ml-1">   
                            <b-col cols="10">
                                <b-form-group
                                    class="labels"                
                                    label="OTHER NAMES:" 
                                    label-for="aliases">
                                    <span v-if="newParty.aliases.length == 0 && !AddNewAliasForm" id="aliases" class="text-muted ml-2 my-2">No aliases have been assigned.</span>
                                    <b-table
                                        v-else-if="newParty.aliases.length > 0"
                                        :key="updated"                                
                                        id="aliases"
                                        :items="newParty.aliases"
                                        :fields="aliasFields"
                                        head-row-variant="primary"
                                        borderless    
                                        small                                            
                                        responsive="sm"
                                        >                                          
                                        <template v-slot:cell(type)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.type}}</span>
                                        </template>

                                        <template v-slot:cell(name)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.name}}</span>
                                        </template>
                                        
                                        <template v-slot:cell(edit)="data" >   
                                            <div style="float: right;">                                                                     
                                                <b-button class="mr-2" size="sm" variant="transparent" @click="removeAlias(data)"><b-icon icon="trash-fill" font-scale="1.25" variant="danger"/></b-button>
                                                <b-button size="sm" variant="transparent" @click="editAlias(data)"><b-icon icon="pencil-square" font-scale="1.25" variant="primary"/></b-button>
                                            </div>
                                        </template>

                                        <template v-slot:row-details="data">
                                            <b-card body-class="m-0 px-0 py-1" :border-variant="addAliasFormColor" style="border:2px solid;">
                                                <add-alias-form :formData="data.item" :index="data.index" :isCreate="false" v-on:submit="modifyAliasList" v-on:cancel="closeAliasForm" />
                                            </b-card>
                                        </template>
                                    </b-table> 
                                </b-form-group>
                            </b-col>  
                            <b-col cols="2">           
                                <b-button 
                                    style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                                    v-if="!AddNewAliasForm" 
                                    size="sm" 
                                    variant="court" 
                                    @click="addNewAlias"><b-icon icon="plus"/>Add Alias</b-button>
                            </b-col>
                        </b-row>
                    </b-card>           

                    <b-card v-if="AddNewAliasForm" id="addAliasForm" class="my-1 ml-4" :border-variant="addAliasFormColor" style="border:2px solid; width: 81%;" body-class="px-1 py-1">
                        <add-alias-form :formData="{}" :index="-1" :isCreate="true" v-on:submit="modifyAliasList" v-on:cancel="closeAliasForm" />                
                    </b-card>

                    <b-card no-body class="border-white">
                        <b-row class="ml-1">   
                            <b-col cols="10">
                                <b-form-group
                                    class="labels"                
                                    label="LEGAL REPRESENTATIVES:" 
                                    label-for="representatives">
                                    <span v-if="newParty.legalReps.length == 0 && !AddNewRepresentativeForm" id="representatives" class="text-muted ml-2 my-2">No representatives have been assigned.</span>
                                    <b-table
                                        v-else-if="newParty.legalReps.length > 0"
                                        :key="updated"                                
                                        id="representatives"
                                        :items="newParty.legalReps"
                                        :fields="representativeFields"
                                        head-row-variant="primary"
                                        borderless    
                                        small                                            
                                        responsive="sm"
                                        >                                          
                                        <template v-slot:cell(type)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.type}}</span>
                                        </template>

                                        <template v-slot:cell(name)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.name}}</span>
                                        </template>
                                        
                                        <template v-slot:cell(edit)="data" >   
                                            <div style="float: right;">                                                                     
                                                <b-button class="mr-2" size="sm" variant="transparent" @click="removeRepresentative(data)"><b-icon icon="trash-fill" font-scale="1.25" variant="danger"/></b-button>
                                                <b-button size="sm" variant="transparent" @click="editRepresentative(data)"><b-icon icon="pencil-square" font-scale="1.25" variant="primary"/></b-button>
                                            </div>
                                        </template>

                                        <template v-slot:row-details="data">
                                            <b-card body-class="m-0 px-0 py-1" :border-variant="addRepresentativeFormColor" style="border:2px solid;">
                                                <add-representative-form :formData="data.item" :index="data.index" :isCreate="false" :isOrganization="newParty.isOrganization" v-on:submit="modifyRepresentativeList" v-on:cancel="closeRepresentativeForm" />
                                            </b-card>
                                        </template>
                                    </b-table> 
                                </b-form-group>
                            </b-col>  
                            <b-col cols="2">           
                                <b-button 
                                    style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%"
                                    v-if="!AddNewRepresentativeForm" 
                                    size="sm" 
                                    variant="court" 
                                    @click="addNewRepresentative"><b-icon icon="plus" style="padding:0; margin:0;"/>Add Representative</b-button>
                            </b-col>
                        </b-row>
                    </b-card>           

                    <b-card v-if="AddNewRepresentativeForm" id="addRepresentativeForm" class="my-1 ml-4" :border-variant="addRepresentativeFormColor" style="border:2px solid; width: 81%;" body-class="px-1 py-1">
                        <add-representative-form :formData="{}" :index="-1" :isCreate="true" :isOrganization="newParty.isOrganization" v-on:submit="modifyRepresentativeList" v-on:cancel="closeRepresentativeForm" />                
                    </b-card>

                </b-card>            
        
            </b-card>            

            <template v-slot:modal-footer>
                <b-button variant="dark" @click="showAddParty = false">Cancel</b-button>
                <b-button 
                    v-if="enableAddParty"
                    variant="success" 
                    @click="saveNewParty">
                    <i class="fas fa-save mr-1"></i>Save
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";

import "@/store/modules/common";
const commonState = namespace("Common");
import { partiesDataJsonDataType, supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';
const informationState = namespace("Information");

import AddAliasForm from './AddAliasForm.vue';
import AddRepresentativeForm from './AddRepresentativeForm.vue';
import { aliasInfoType, form7DataInfoType, form7PartiesInfoType, lookupsInfoType, representativeInfoType } from '@/types/Information';
import { indexOf } from 'underscore';


@Component({
    components:{        
        AddAliasForm,
        AddRepresentativeForm        
    }
})
export default class FillForm7StyleOfProceedingsInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;    

    @informationState.State
    public form7Info: form7DataInfoType;

    @commonState.State
    public userName!: string;

    @commonState.State
    public lookups!: lookupsInfoType;    

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void


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

    
    partyDataReady = false;
    
    respondentNames = '';
    respondents: string[] = [];
    respondentSolicitorNames = '';
    respondentSolicitors: string[] = [];
    appellant = '';
    
    dataReady = false;

    partiesList: form7PartiesInfoType[] = [];  
    newParty = {} as form7PartiesInfoType;    
    updateTable = 0;
    showAddParty = false;
    enableAddParty = false;
    isCreate = false;

    
    styleOfProceedingsInfo = {} as form7DataInfoType;

    @Watch('respondents')
    setRespondentNames(newRespondents: string[]) 
    {
        this.respondentNames = newRespondents.join('; ');
        this.respondentSolicitorNames = this.respondentSolicitors.join('; ')

    }

    mounted() { 
        this.dataReady = false;
        this.styleOfProceedingsInfo = this.form7Info;
        this.extractInfo();
        this.dataReady = true;
                   
    }

    public extractInfo(){
        this.appellant = this.userName;
        this.partiesList = this.supremeCourtCaseJson.parties;
        this.form7Info.appellants = [];
        this.form7Info.respondents = [];
        for (const party in this.supremeCourtCaseJson.parties){
            if (this.partiesList[party].legalReps.length == 0){
                //TODO: if alias: intervener two, intervener on behalf of Two Test
                // or executor 2, executor for the Estate of Two Test
                // formerly known as three tests
                this.partiesList[party].title = this.supremeCourtCaseJson.parties[party].lowerCourtRole 
                                                + "</br>" 
                                                + this.supremeCourtCaseJson.parties[party].fullName;
            } else {
                //TODO: intervener two, intervener on behalf of Two Test
                // or executor 2, executor for the Estate of Two Test
            }
        }
        
    }  

     public appLeft(row){        
        this.partiesList[row.index].appealCourtRole = 'Appellant';
        this.styleOfProceedingsInfo.appellants.push(this.partiesList[row.index]);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.updateTable ++;
    }

    public appRight(row){
        this.partiesList[row.index].appealCourtRole = '';           
        const index = this.styleOfProceedingsInfo.appellants.findIndex(app => app.ceisPartyId == this.partiesList[row.index].ceisPartyId)
        this.styleOfProceedingsInfo.appellants.splice(index, 1);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
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
         
        const index = this.styleOfProceedingsInfo.respondents.findIndex(res => res.ceisPartyId == this.partiesList[row.index].ceisPartyId)
        this.styleOfProceedingsInfo.respondents.splice(index, 1);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public resRight(row){
        this.partiesList[row.index].appealCourtRole = 'Respondent';
        this.respondents.push(this.partiesList[row.index].fullName);
        if (this.partiesList[row.index].counselName) {
            this.respondentSolicitors.push(this.partiesList[row.index].counselName);
        }        
        this.styleOfProceedingsInfo.respondents.push(this.partiesList[row.index]);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public addParties(){       
        this.newParty = {} as supremeCourtPartiesJsonInfoType;
        this.enableAddParty = false;
        this.isCreate = true;
        this.showAddParty = true;
        this.partyDataReady = false; 
        this.displayWarning = true;        
        this.newParty.aliases = [];
        this.newParty.legalReps = [];
        this.partyDataReady = true;
    }

    public saveNewParty(){
        if (this.newParty.isOrganization){
            this.newParty.fullName = this.newParty.organizationName;
        } else {
            this.newParty.fullName = 
            this.newParty.surname + ', ' + 
            this.newParty.firstGivenName + 
            (this.newParty.secondGivenName? ' ' + this.newParty.secondGivenName:'') +
            (this.newParty.thirdGivenName? ' ' + this.newParty.thirdGivenName:'')
        }
        //TODO: save party and get ceisId

        this.newParty.title = this.newParty.lowerCourtRole 
                            + "</br>" 
                            + this.newParty.fullName;        
        this.partiesList.push(this.newParty);       
        this.styleOfProceedingsInfo.parties = this.partiesList;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.showAddParty = false;
        this.updateTable ++;
    }

    public editParties(){
        // TODO: 
        console.log('Edit Parties')
        this.isCreate = false;
    }

    public editStyleOfProceeding(){
        // TODO: 
        console.log('Edit Style of Proceeding')
    }

    public update(){        
        
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
    }

    public enableAdd(){
        this.displayWarning = false;
        this.enableAddParty = true;
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

        if (this.isCreate){

           if (isCreateAlias){           
                this.newParty.aliases.push(newAlias)
                this.closeAliasForm();
            } else {           
                this.newParty.aliases[index].type = newAlias.type;
                this.newParty.aliases[index].name = newAlias.name;           
                this.closeAliasForm();
            }
            this.updated ++;
        }
    }

    public removeAlias(data){
        if (this.isCreate){
            this.newParty.aliases.splice(data.index,1);
            this.updated ++;
        }
    }

    public modifyRepresentativeList(isCreateRep: boolean, newRepresentative: representativeInfoType, index: number){        

        if (this.isCreate) {
            if (isCreateRep){           
            this.newParty.legalReps.push(newRepresentative)
            this.closeRepresentativeForm();
            } else {           
                this.newParty.legalReps[index].type = newRepresentative.type;
                this.newParty.legalReps[index].name = newRepresentative.name;           
                this.closeRepresentativeForm();
            }
            this.updated ++;
        }
    }

    public removeRepresentative(data){
        this.newParty.legalReps.splice(data.index,1);
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



</style>