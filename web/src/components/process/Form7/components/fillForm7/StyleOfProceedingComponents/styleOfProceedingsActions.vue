<template>
    <b-card v-if="dataReady" class="mx-4" no-body border-variant="light" bg-variant="light" :key="updatedInfo">
       
        <b-row>
            <b-col cols="9" style="padding-right: 0;" >
                <b-button 
                    style="padding-right: 0;" 
                    class="bg-transparent border-light text-primary mr-2"
                    @click="addParties"
                    >Add another Party
                    <b-icon-plus class="ml-1 mr-0" variant="primary" scale="1.5" />
                </b-button>
           
                <b-button
                    class="bg-transparent border-light text-primary mr-2"                        
                    @click="editParties"
                    >Edit Parties
                    <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                </b-button>
           
                <b-button
                    
                    class="bg-transparent border-light text-primary"
                    @click="editStyleOfProceeding"
                    >Edit Style of Proceeding
                    <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                </b-button>
            </b-col>
        </b-row> 

            <b-modal size="xl" v-model="showPartyWindow" header-class="bg-primary text-white" :key="updatedPartyInfo">
                <template v-slot:modal-title>
                    <h1 v-if="isCreate" class="my-2 ml-2">Add Party</h1>
                    <h1 v-else class="my-2 ml-2">Edit Party</h1>
                </template>

                <b-card class="bg-white border-white text-dark">

                    <b-row class="ml-1">
                        
                        <b-form-group
                            v-if="isCreate"
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
                        <b-form-group
                            v-else
                            class="mx-3" 
                            style="display: inline;"                    
                            label="SELECT A PARTY TO EDIT:" 
                            label-for="party-to-edit">
                            <b-form-select
                                id="party-to-edit"  
                                style="display: inline;"                     
                                @change="enableEdit"
                                v-model="partyToEdit">
                                <b-form-select-option 
                                    v-for="party in form7SubmissionInfo.parties" 
                                    :key="party.ceisPartyId"
                                    :value="party">
                                    {{party.fullName}}
                                </b-form-select-option>                
                            </b-form-select>                
                        </b-form-group>
                    
                    </b-row>

                    <b-card v-if="displayWarning" class="bg-danger text-white border-danger">
                        <div v-if="isCreate">
                            WARNING: The parties to an appeal are almost always the parties that appear 
                            in the lower court. Do not add parties that were not named on the lower court 
                            file as this may result in your appeal form being rejected.
                        </div>
                        <div v-else>
                            WARNING: The spelling and names of the parties must be the same as on the 
                            Supreme Court order. Do not modify names. This should only be used in 
                            exceptional circumstances.
                        </div>
                    </b-card>                

                    <b-card no-body v-else-if="partyDataReady && !displayWarning && party.isOrganization" class="border-white">

                        <b-row class="ml-1">
                            <b-col cols="6">                    
                                <b-form-group
                                    class="labels"                
                                    label="ORGANIZATION NAME" 
                                    label-for="organization-name">
                                    <b-form-input 
                                        id="organization-name"                                    
                                        :state="form7PartiesStates.organizationName"             
                                        v-model="party.organizationName">
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
                                        :state="form7PartiesStates.lowerCourtRole"             
                                        v-model="party.lowerCourtRole"                    
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
                                        v-model="party.counselName">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>           
                        </b-row>

                    </b-card>

                    <b-card no-body v-else-if="partyDataReady && !displayWarning && !party.isOrganization" class="border-white">

                        <b-row class="ml-1">
                            <b-col cols="6">                    
                                <b-form-group
                                    class="labels"                
                                    label="SURNAME:" 
                                    label-for="surname">
                                    <b-form-input 
                                        id="surname"                                    
                                        :state="form7PartiesStates.surname"                  
                                        v-model="party.surname">
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
                                        :disabled="!isCreate"
                                        :state="form7PartiesStates.lowerCourtRole"
                                        v-model="party.lowerCourtRole"                    
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
                                        :state="form7PartiesStates.firstGivenName"                                                     
                                        v-model="party.firstGivenName">
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
                                        v-model="party.counselName">
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
                                        v-model="party.secondGivenName">
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
                                        v-model="party.thirdGivenName">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>                     
                        </b-row>            
                    </b-card>

                    <b-card no-body v-if="partyDataReady && !displayWarning" class="border-white">

                        <b-card no-body class="border-white">
                            <b-row class="ml-1">   
                                <b-col cols="10">
                                    <b-form-group
                                        class="labels"                
                                        label="OTHER NAMES:" 
                                        label-for="aliases">
                                        <span 
                                            v-if="party.aliases.length == 0 && !AddNewAliasForm" 
                                            id="aliases" 
                                            class="text-muted ml-2 my-2">No aliases have been assigned.
                                        </span>
                                        <b-table
                                            v-else-if="party.aliases.length > 0"
                                            :key="updated"                                
                                            id="aliases"
                                            :items="party.aliases"
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
                                                    <b-button 
                                                        class="mr-2" 
                                                        size="sm" 
                                                        variant="transparent" 
                                                        @click="removeAlias(data)">
                                                        <b-icon 
                                                            icon="trash-fill" 
                                                            font-scale="1.25" 
                                                            variant="danger"/>
                                                    </b-button>
                                                    <b-button 
                                                        size="sm" 
                                                        variant="transparent" 
                                                        @click="editAlias(data)">
                                                        <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                                    </b-button>
                                                </div>
                                            </template>

                                            <template v-slot:row-details="data">
                                                <b-card 
                                                    body-class="m-0 px-0 py-1" 
                                                    :border-variant="addAliasFormColor" 
                                                    style="border:2px solid;">
                                                    <add-alias-form 
                                                        :formData="data.item" 
                                                        :index="data.index" 
                                                        :isCreateAlias="false" 
                                                        v-on:submit="modifyAliasList" 
                                                        v-on:cancel="closeAliasForm" />
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

                        <b-card 
                            v-if="AddNewAliasForm" 
                            id="addAliasForm" 
                            class="my-1 ml-4" 
                            :border-variant="addAliasFormColor" 
                            style="border:2px solid; width: 81%;" 
                            body-class="px-1 py-1">
                            <add-alias-form 
                                :formData="{}" 
                                :index="-1" 
                                :isCreateAlias="true" 
                                v-on:submit="modifyAliasList" 
                                v-on:cancel="closeAliasForm" />                
                        </b-card>

                        <b-card no-body class="border-white">
                            <b-row class="ml-1">   
                                <b-col cols="10">
                                    <b-form-group
                                        class="labels"                
                                        label="LEGAL REPRESENTATIVES:" 
                                        label-for="representatives">
                                        <span 
                                            v-if="party.legalReps.length == 0 && !AddNewRepresentativeForm" 
                                            id="representatives" 
                                            class="text-muted ml-2 my-2">No representatives have been assigned.
                                        </span>
                                        <b-table
                                            v-else-if="party.legalReps.length > 0"
                                            :key="updated"                                
                                            id="representatives"
                                            :items="party.legalReps"
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
                                                    <b-button 
                                                        class="mr-2" 
                                                        size="sm" 
                                                        variant="transparent" 
                                                        @click="removeRepresentative(data)">
                                                        <b-icon 
                                                            icon="trash-fill" 
                                                            font-scale="1.25" 
                                                            variant="danger"/>
                                                    </b-button>
                                                    <b-button 
                                                        size="sm" 
                                                        variant="transparent" 
                                                        @click="editRepresentative(data)">
                                                        <b-icon 
                                                            icon="pencil-square" 
                                                            font-scale="1.25" 
                                                            variant="primary"/>
                                                    </b-button>
                                                </div>
                                            </template>

                                            <template v-slot:row-details="data">
                                                <b-card 
                                                    body-class="m-0 px-0 py-1" 
                                                    :border-variant="addRepresentativeFormColor" 
                                                    style="border:2px solid;">
                                                    <add-representative-form 
                                                        :formData="data.item" 
                                                        :index="data.index" 
                                                        :isCreateRep="false" 
                                                        :isOrganization="party.isOrganization" 
                                                        v-on:submit="modifyRepresentativeList" 
                                                        v-on:cancel="closeRepresentativeForm" />
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
                                        @click="addNewRepresentative">
                                        <b-icon 
                                            icon="plus" 
                                            style="padding:0; margin:0;"/>Add Representative
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-card>           

                        <b-card 
                            v-if="AddNewRepresentativeForm" 
                            id="addRepresentativeForm" 
                            class="my-1 ml-4" 
                            :border-variant="addRepresentativeFormColor" 
                            style="border:2px solid; width: 81%;" 
                            body-class="px-1 py-1">
                            <add-representative-form 
                                :formData="{}" 
                                :index="-1" 
                                :isCreateRep="true" 
                                :isOrganization="party.isOrganization" 
                                v-on:submit="modifyRepresentativeList" 
                                v-on:cancel="closeRepresentativeForm" />                
                        </b-card>

                    </b-card>            
            
                </b-card>            

                <template v-slot:modal-footer>
                    <b-button 
                        v-if="!isCreate && enableEditParty"
                        variant="danger"
                        class="mr-auto" 
                        @click="confirmDeleteParty">
                        <b-icon-trash-fill class="mr-1" />Delete
                    </b-button>
                    <b-button variant="dark" @click="showPartyWindow = false">Cancel</b-button>
                    <b-button 
                        v-if="isCreate && enableAddParty"
                        variant="success" 
                        @click="saveNewParty">
                        <i class="fas fa-save mr-1"></i>Save
                    </b-button>
                    <b-button 
                        v-else-if="!isCreate && enableEditParty"
                        variant="success" 
                        @click="saveParty">
                        <i class="fas fa-save mr-1"></i>Save
                    </b-button>
                </template>

                <template v-slot:modal-header-close>
                    <b-button
                        variant="outline-dark"
                        class="closeButton"
                        @click="showPartyWindow = false"
                        >&times;</b-button
                    >
                </template>
            </b-modal>

            <b-modal size="lg" v-model="showConfirmEditStyleOfProceeding" id="bv-modal-confirm-edit" header-class="bg-warning text-light">
            
                <template v-slot:modal-title>
                    <h2 class="mb-0 text-light">Confirm Edit Style of Proceedings</h2>                    
                </template>			

                <div>
                    Modifications to the style of proceeding will result in the document 
                    being submitted to the registry for processing.  Do you wish to proceed?
                </div>
                
                <template v-slot:modal-footer>
                    <b-button variant="secondary" @click="cancelEditStyleOfProceedings()">Cancel</b-button>
                    <b-button variant="primary" @click="confirmEditStyleOfProceedings()">OK</b-button>                
                </template>            
                <template v-slot:modal-header-close>                 
                    <b-button variant="outline-warning" class="text-light closeButton" @click="cancelEditStyleOfProceedings()"
                    >&times;</b-button>
                </template>

            </b-modal>

            <b-modal size="xl" v-model="showEditStyleOfProceedingWindow" header-class="bg-primary text-white">
                <template v-slot:modal-title>
                    <h1 class="my-2 ml-2">Edit Style of Proceeding</h1>                
                </template>

                <b-card v-if="styleOfProceedingDataReady" class="bg-white border-white text-dark">               

                    <b-table
                            :items="styleOfProceedingsInfo.manualSop"
                            :fields="sopFields"                    
                            :no-sort-reset="true"
                            sort-icon-left
                            thead-class="d-none"
                            borderless                  
                            small
                            v-sortStyleOfProceeding
                            responsive="sm"
                        >
                        <template v-slot:cell(partyName)="data" >
                            <b-form-select
                                v-model="data.item.conjunction" 
                                style="width:20%; border:1px solid #F1F1F1; display:block"                  
                                :options="styleOfProceedingOptions">
                            </b-form-select> 
                            <div>
                            <b-form-input 
                                id="fullname"
                                style="text-align:center; width:80%; border:1px solid #F0F0F0; background-color:#FAFAFA; margin:0 0 0 auto;" 
                                disabled    
                                v-model="data.item.partyName">
                            </b-form-input>
                            </div>
                            <div style="float:right;" class="labels">
                                <div>{{data.item.appealRole}}/</div>
                                <div>{{data.item.lowerCourtRole}}</div>
                            </div>                        
                        </template>

                        <template v-slot:cell(edit)>
                            <b-button                     
                                variant="light"
                                class="handle"
                                style="margin-top: 2.75rem; float:right;" 
                                >
                                <i style="margin-top:.3rem; font-size:16pt;" class="fas fa-arrows-alt"></i>
                            </b-button>                         
                        </template>                   
                        
                    </b-table>                         
            
                </b-card>            

                <template v-slot:modal-footer> 
                    <b-button                     
                        variant="dark"
                        class="mr-auto" 
                        @click="cancelStyleOfProceeding">
                        Cancel
                    </b-button>

                    <b-button                    
                        variant="danger" 
                        @click="resetStyleOfProceeding">
                        <b-icon-arrow-counterclockwise class="mr-1"/>
                        Reset Style of Proceeding
                    </b-button>

                    <b-button                    
                        variant="success" 
                        @click="saveNewStyleOfProceeding">
                        <i class="fas fa-save mr-1"></i>Update Style of Proceeding
                    </b-button>
                    
                </template>

                <template v-slot:modal-header-close>
                    <b-button
                        variant="outline-dark"
                        class="closeButton"
                        @click="showEditStyleOfProceedingWindow = false"
                        >&times;</b-button
                    >
                </template>
            </b-modal>

            <b-modal v-model="showConfirmDeleteParty" id="bv-modal-confirm-delete" header-class="bg-warning text-light">
            
                <template v-slot:modal-title>
                    <h2 class="mb-0 text-light">Confirm Delete Party</h2>                    
                </template>			

                <h4>Are you sure you want to delete this party?</h4>
                
                <template v-slot:modal-footer>
                    <b-button variant="primary" @click="cancelPartyDeletion()">Cancel</b-button>
                    <b-button variant="danger" @click="deleteParty()">Confirm</b-button>                
                </template>            
                <template v-slot:modal-header-close>                 
                    <b-button variant="outline-warning" class="text-light closeButton" @click="cancelPartyDeletion()"
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

import AddAliasForm from '../AddAliasForm.vue';
import AddRepresentativeForm from '../AddRepresentativeForm.vue';

import { aliasInfoType, form7PartiesInfoType, form7PartiesStatesInfoType, form7SubmissionDataInfoType, lookupsInfoType, manualSopInfoType, representativeInfoType } from '@/types/Information';
import { supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

import sortStyleOfProceeding from './util/sortStyleOfProceeding';

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
    public form7SubmissionInfo!: form7SubmissionDataInfoType;    

    @commonState.State
    public userName!: string;

    @commonState.State
    public lookups!: lookupsInfoType;    

    @informationState.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void

    @informationState.State
    public form7ManualSopOrder!: number[];

    @informationState.Action
    public UpdateForm7ManualSopOrder!: (newform7ManualSopOrder: number[]) => void

    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

    aliasFields = [
        {
            key:'nameType',          
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
            key:'repType',          
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

    //partiesList: form7PartiesInfoType[] = [];  
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

    respondentSolicitors: string[] = [];
    respondents: string[] = [];
    styleOfProceedingsInfo = {} as form7SubmissionDataInfoType;
    form7PartiesStates = {} as form7PartiesStatesInfoType; 
    editStyleOfProceedingsEnabled = true;   
    noRolePartyManualSop: manualSopInfoType[] = [];

    referenceNumber = '';    
    updatedInfo = 0;
    dataReady = false;
   

    mounted() { 

        this.dataReady = false;
        this.styleOfProceedingsInfo = this.form7SubmissionInfo; 
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
            const styleOfProceedings = this.form7SubmissionInfo;
            const partiesList = this.form7SubmissionInfo.parties;

            if (this.party.isOrganization){
                this.party.surname = null;
                this.party.firstGivenName = null;
                this.party.secondGivenName = null;
                this.party.thirdGivenName = null;
                this.party.fullName = this.party.organizationName;

            } else {
                if (!this.party.secondGivenName) this.party.secondGivenName = null;
                if (!this.party.thirdGivenName)this.party.thirdGivenName = null;
                this.party.organizationName = null;
                this.party.fullName = 
                this.party.surname + ', ' + 
                this.party.firstGivenName + 
                (this.party.secondGivenName? ' ' + this.party.secondGivenName:'') +
                (this.party.thirdGivenName? ' ' + this.party.thirdGivenName:'')
            }           

            this.party.title = this.getPartyTitles(this.party);        
            partiesList.push(this.party);       
            styleOfProceedings.parties = partiesList;
            this.UpdateForm7SubmissionInfo(styleOfProceedings);        
            this.showPartyWindow = false;
            Vue.nextTick(()=> {
                this.updateResults();
            });           

        }        
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

        if (this.checkPartyStates()){

            const styleOfProceedings = this.form7SubmissionInfo;
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
            
            if (this.party.appealRole && this.party.appealRole == 'Respondent') {
                this.party.appealRole = ''
                const resIndex = styleOfProceedings.respondents.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
                if (resIndex != -1) {
                    styleOfProceedings.respondents.splice(resIndex, 1);
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
                    
            } else if (this.party.appealRole && this.party.appealRole == 'Appellant') {
                this.party.appealRole = ''
                const appIndex = styleOfProceedings.appellants.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
                if (appIndex != -1) {
                    styleOfProceedings.appellants.splice(appIndex, 1);
                }                     
            } 

            const partiesList = this.form7SubmissionInfo.parties;
            
            const index = partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
            partiesList[index] = this.party;
            styleOfProceedings.parties = partiesList;
            styleOfProceedings.respondentSolicitor = this.respondentSolicitors.join(', ');
            this.UpdateForm7SubmissionInfo(styleOfProceedings);        
            this.showPartyWindow = false;
            Vue.nextTick(()=> {
                this.updateResults();
            });

        }
       
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

        const styleOfProceedings = this.form7SubmissionInfo;

        if (styleOfProceedings.respondents && 
            styleOfProceedings.respondents.length > 0 &&
            styleOfProceedings.appellants && 
            styleOfProceedings.appellants.length > 0 ){
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
            this.party.aliases[index].nameType = newAlias.nameType;
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
            this.party.legalReps[index].repType = newRepresentative.repType;
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
        const styleOfProceedings = this.form7SubmissionInfo
        const partiesList = this.form7SubmissionInfo.parties;
        this.showConfirmDeleteParty = false;
        const index = partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
        partiesList.splice(index, 1);       
        styleOfProceedings.parties = partiesList;
        this.UpdateForm7SubmissionInfo(styleOfProceedings);        
        this.showPartyWindow = false;
        Vue.nextTick(()=> {
            this.updateResults();
        });
    }

    public confirmEditStyleOfProceedings(){ 

        const styleOfProceedings = this.form7SubmissionInfo;

        this.styleOfProceedingDataReady = false;
        this.showEditStyleOfProceedingWindow = true;       
        this.showConfirmEditStyleOfProceeding = false;    
        
        this.noRolePartyManualSop = [];
        this.loadSopInfo(styleOfProceedings.appellants);
        this.loadSopInfo(styleOfProceedings.respondents); 

        styleOfProceedings.manualSop = styleOfProceedings.manualSop.concat(this.noRolePartyManualSop)        

        this.UpdateForm7ManualSopOrder([...Array(styleOfProceedings.manualSop.length).keys()])

        this.UpdateForm7SubmissionInfo(styleOfProceedings);

        this.styleOfProceedingsInfo = JSON.parse(JSON.stringify(this.form7SubmissionInfo));
        this.styleOfProceedingDataReady = true;
    }


    public loadSopInfo(partiesInfo: form7PartiesInfoType[]){        

        if (this.styleOfProceedingsInfo.manualSop && this.styleOfProceedingsInfo.manualSop.length > 0){

            for (const party of partiesInfo){

                const currentSop = this.styleOfProceedingsInfo.manualSop;
                const identicalIndex = currentSop.findIndex(sop => sop.partyName.split('; ').includes(this.getPartyDisplayName(party)));

                if (identicalIndex != -1){
                    if (currentSop[identicalIndex].lowerCourtRole == party.lowerCourtRole && currentSop[identicalIndex].appealRole == party.appealRole){
                        continue;
                    } else {
                        const partyNames = currentSop[identicalIndex].partyName.split('; ')
                        const nameIndex = partyNames.findIndex(name => name == this.getPartyDisplayName(party))
                        this.styleOfProceedingsInfo.manualSop[identicalIndex].partyName = partyNames.splice(nameIndex, 1).join('; ');
                        this.prePopulateSop(party);
                    }
                } else {
                    const index = currentSop.findIndex(sop => sop.lowerCourtRole == party.lowerCourtRole && sop.appealRole == party.appealRole);
                    if (index != -1){
                        const partyNames = this.styleOfProceedingsInfo.manualSop[index].partyName.split('; ')
                        partyNames.push(this.getPartyDisplayName(party))
                        this.styleOfProceedingsInfo.manualSop[index].partyName = partyNames.join('; ')
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

    public prePopulateSop(partyInfo: form7PartiesInfoType){

        const styleOfProceedings = this.form7SubmissionInfo;

        let sop = {} as manualSopInfoType;            
        sop.plural = false;
        sop.appealRole = partyInfo.appealRole;
        sop.lowerCourtRole = partyInfo.lowerCourtRole;
        sop.partyName = this.getPartyDisplayName(partyInfo)       
        if (partyInfo.lowerCourtRole == 'NONE (New Party)'){
            sop.conjunction = 'And';
            this.noRolePartyManualSop.push(sop);
        } else if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
                sop.conjunction = 'Between';
                styleOfProceedings.manualSop.unshift(sop);
        } else {
            sop.conjunction = 'And';
            styleOfProceedings.manualSop.push(sop);
        }

        this.UpdateForm7SubmissionInfo(styleOfProceedings);

    }
    
    public cancelEditStyleOfProceedings() {
        this.showConfirmEditStyleOfProceeding = false;        
    }

    public saveNewStyleOfProceeding(){
        console.log('save new SOP')
        
        const msops = []
        for(const orderInx of this.form7ManualSopOrder){
            msops.push(this.styleOfProceedingsInfo.manualSop[orderInx])
        }
        this.styleOfProceedingsInfo.manualSop = msops;
        console.log(this.styleOfProceedingsInfo)


        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
        this.showEditStyleOfProceedingWindow = false;
    }

    public resetStyleOfProceeding(){
        console.log('reset SOP')
        this.showEditStyleOfProceedingWindow = false;
        this.styleOfProceedingsInfo.manualSop = [];
        this.UpdateForm7SubmissionInfo(this.styleOfProceedingsInfo);
    }

    public cancelStyleOfProceeding(){
        console.log('cancel SOP')        
        this.showEditStyleOfProceedingWindow = false;
    }

    public updateResults(){            
        this.$emit('updateResults');
    }
}
</script>

<style scoped lang="scss">

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>