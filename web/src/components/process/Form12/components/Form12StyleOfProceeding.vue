<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">              

<!-- <PARTIES> -->
        <b-card class="mb-4 bg-white border-white text-dark"> 

<!-- <Appellants> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.appellantsInfo !=null?'border border-danger':''">
                    <b-form-group
                        class="labels"                
                        label="Appellants:" 
                        label-for="appellants">
                        <p class="content text-primary">
                            You must enter the full names of all the appellant(s) as 
                            it appears on the reasons for judgment or notice of appeal.
                        </p>  
                        <span 
                            v-if="form12Info.appellants.length == 0 && !AddNewAppellantForm" 
                            id="appellants" 
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form12Info.appellants.length > 0"                                                                
                            id="appellants"
                            class="mt-2"
                            :items="form12Info.appellants"
                            :fields="partyFields"
                            head-row-variant="primary"
                            borderless    
                            small                                            
                            responsive="sm"
                            >                                          
                            <template v-slot:cell(organization)="data" >
                                <span v-if="data.item.isOrganization" style="font-size: 16px;">
                                    Organization
                                </span>
                                    <span v-else style="font-size: 16px;">
                                    Individual
                                </span>                                    
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
                                        @click="removeAppellant(data)">
                                        <b-icon 
                                            icon="trash-fill" 
                                            font-scale="1.25" 
                                            variant="danger"/>
                                    </b-button>
                                    <b-button 
                                        size="sm" 
                                        variant="transparent" 
                                        @click="editAppellant(data)">
                                        <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                    </b-button>
                                </div>
                            </template>

                        </b-table> 
                    </b-form-group>
                </b-col>  
                <b-col cols="2">           
                    <b-button                            
                        style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                        v-if="!AddNewAppellantForm" 
                        size="sm" 
                        variant="court" 
                        @click="addNewAppellant"><b-icon icon="plus"/>Add Appellant</b-button>
                </b-col>
            </b-row>

<!-- <Respondents> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.respondentsInfo !=null?'border border-danger':''">
                    <b-form-group
                        class="labels"                
                        label="Respondents:" 
                        label-for="respondents">
                        <p class="content text-primary">
                            You must enter full names of all the respondent(s) as it 
                            appears on reasons for judgment or notice of appeal.
                        </p> 
                        <span 
                            v-if="form12Info.respondents.length == 0 && !AddNewRespondentForm" 
                            id="respondents" 
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form12Info.respondents.length > 0"                                                                
                            id="respondents"
                            class="mt-2"
                            :items="form12Info.respondents"
                            :fields="partyFields"
                            head-row-variant="primary"
                            borderless    
                            small                                            
                            responsive="sm"
                            >                                          
                            <template v-slot:cell(organization)="data" >
                                <span v-if="data.item.isOrganization" style="font-size: 16px;">
                                    Organization
                                </span>
                                    <span v-else style="font-size: 16px;">
                                    Individual
                                </span>                                    
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
                                        @click="removeRespondent(data)">
                                        <b-icon 
                                            icon="trash-fill" 
                                            font-scale="1.25" 
                                            variant="danger"/>
                                    </b-button>
                                    <b-button 
                                        size="sm" 
                                        variant="transparent" 
                                        @click="editRespondent(data)">
                                        <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                    </b-button>
                                </div>
                            </template>

                        </b-table> 
                    </b-form-group>
                </b-col>  
                <b-col cols="2">           
                    <b-button 
                        style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                        v-if="!AddNewRespondentForm" 
                        size="sm" 
                        variant="court" 
                        @click="addNewRespondent"><b-icon icon="plus"/>Add Respondent</b-button>
                </b-col>
            </b-row>

        </b-card>
        <!-- {{partyNames}} -->
        
        <div v-if="this.form12Info.appellants && this.form12Info.appellants.length>0 && this.form12Info.respondents && this.form12Info.respondents.length>0">
            <p style="font-size: 1.25rem; margin:0 0 0 1rem;">Style of Proceeding (Parties) in Case</p>

<!-- <BETWEEN> -->
            <b-row class="mt-4 ml-1" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form12Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
<!-- <AND> -->
            <b-row class="mt-3 ml-1" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form12Info.respondentNames}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>   
<!-- <JudgeNames> -->
            <b-card class="mb-4 bg-white border-white text-dark"> 
                <b-card no-body class="border-white">
                    <b-row class="mb-2"  style="margin:0 -1rem !important;">   
                        <b-col cols="10" :class="state.judgeNames !=null?'border border-danger':''">
                            <b-form-group
                                class="labels"                
                                label="Provide the names of the justices who heard the application:">
                                <p class="content text-primary">
                                    <b>Note:</b> Justices’ names must be set out in the same order 
                                    as the reasons for Judgment.
                                </p>                                 
                                <div 
                                    v-if="form12Info.judgeNames && form12Info.judgeNames.length == 0 && !AddNewJudgeNamesForm"                                      
                                    class="text-muted mt-3">No judges have been listed.
                                </div>
                                <b-table
                                    v-else-if="form12Info.judgeNames && form12Info.judgeNames.length > 0"
                                    class="mt-2"
                                    :items="form12Info.judgeNames"
                                    :fields="judgeFields"
                                    head-row-variant="primary"
                                    borderless    
                                    small                                            
                                    responsive="sm">
                                    
                                    <template v-slot:cell(edit)="data" >   
                                        <div style="float: right;">                                                                     
                                            <b-button 
                                                class="mr-2" 
                                                size="sm" 
                                                variant="transparent" 
                                                @click="removeJudgeNames(data.item)">
                                                <b-icon 
                                                    icon="trash-fill" 
                                                    font-scale="1.25" 
                                                    variant="danger"/>
                                            </b-button>
                                            <b-button 
                                                size="sm" 
                                                variant="transparent" 
                                                @click="editJudgeNames(data)">
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
                                            :border-variant="addJudgeNamesFormColor" 
                                            style="border:2px solid;">
                                            <add-judge-form 
                                                :formData="data.item" 
                                                :index="data.index" 
                                                :isCreateJudge="false" 
                                                v-on:submit="modifyJudgeNames" 
                                                v-on:cancel="closeJudgeNamesForm" />
                                        </b-card>
                                    </template>
                                </b-table> 
                            </b-form-group>
                        </b-col>  
                        <b-col>           
                            <b-button 
                                style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%; float: right;"
                                v-if="!AddNewJudgeNamesForm" 
                                size="sm" 
                                variant="court" 
                                @click="addNewJudgeNames">
                                <b-icon icon="plus"/>Add Judge Names</b-button>
                        </b-col>
                    </b-row>
                </b-card>           

                <b-card 
                    v-if="AddNewJudgeNamesForm" 
                    id="addJudgeForm" 
                    class="my-1 ml-4" 
                    :border-variant="addJudgeNamesFormColor" 
                    style="border:2px solid;" 
                    body-class="px-1 py-1">
                    <add-judge-form 
                        :formData="{name:'', other:''}" 
                        :index="-1" 
                        :isCreateJudge="true" 
                        v-on:submit="modifyJudgeNames" 
                        v-on:cancel="closeJudgeNamesForm" />                
                </b-card>
            </b-card>
<!-- <HEARING LOCATION> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Where was the hearing held?                                
                </b-col>
                <b-col class="ml-0 mt-2">  
                    <b-form-select                
                        style="width:100%"              
                        v-model="hearingLocation" 
                        @change="updateHearingLocation"                   
                        :options="hearingLocationList">
                    </b-form-select>
                    <b-row v-if="hearingLocation == 'Other'" class="m-0 p-0">
                        <div style="width:39%;" class="mt-3 ml-1">Please specify:</div>
                        <div style="width:60%;">
                            <b-form-select
                                :state="state.hearingLocationOther"
                                class="mt-2"
                                @change="updateHearingLocation"
                                :options="otherHearingLocationList"                                    
                                v-model="otherHearingLocation">
                            </b-form-select>
                        </div>
                    </b-row>
                    <span
                        v-if="(state.hearingLocation != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Hearing Location.
                    </span>                        
                </b-col>
            </b-row>
<!-- Date of Judgment -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What was the date of the judgment?                    
                </b-col>
                <b-col>                   
                    <b-card                                                
                        style="margin:0 1px; padding:0; float: center;" 
                        :border-variant="state.dateOfJudgement == false?'danger': 'muted'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form12Info.dateOfJudgement"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>
<!-- <ApplyingParties-Who Made Application to VARY ORDER> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the application to vary the order of a justice?                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked
                        @change="applyingPartiesChanged()"               
                        style="width:100%"                        
                        :state="state.applyingParties"                                      
                        v-model="form12Info.applyingParties">
                        <b-form-checkbox
                            :value="partyname" 
                            v-for="partyname,inx in partyNames" 
                            :key="'party-made-app-'+inx">
                            {{partyname.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group> 
                </b-col>
            </b-row> 
            <!-- {{form12Info.applyingParties}}    -->

            <div v-if="this.form12Info.judgeNames && this.form12Info.judgeNames.length>0 && form12Info.applyingParties.length > 0">   
<!-- <Who Made Order-VaryOrderJudgeName> -->
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Who made the order that you were seeking to vary?                                
                    </b-col>
                    <b-col class="ml-1">   
                        <b-form-select 
                            stacked               
                            style="width:100%"                                    
                            v-model="form12Info.varyingOrderJudgeName"
                            text-field="text"
                            value-field="text"                    
                            :options="justiceNameOptions">                            
                        </b-form-select>
                        <b-row v-if="form12Info.varyingOrderJudgeName == 'Other'" class="m-0 p-0">
                            <div style="width:25%;" class="mt-3 ml-1">Other Name:</div>
                            <div style="width:74%;">
                                <b-form-input 
                                    style="margin-top:0.5rem;"                                
                                    :state="state.varyingOrderJudgeNameOther"
                                    v-model="form12Info.varyingOrderJudgeNameOther" 
                                />
                            </div>
                        </b-row> 
                        <span
                            v-if="(state.varyingOrderJudgeName != null)" 
                            style="font-size: 0.75rem;" 
                            class="bg-white text-danger"><b-icon-exclamation-circle/>
                            Specify who made the order that you were seeking to vary.
                        </span>
                    </b-col>
                </b-row>   
<!-- <Date of Order> -->
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        What was the date of the order that were seeking to vary?                    
                    </b-col>
                    <b-col>                   
                        <b-card                        
                            class="mt-2" 
                            style="padding: 0; float: center;" 
                            :border-variant="state.varyingOrderDate == false?'danger': 'muted'">
                            <div class="vuetify">
                                <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                    <v-date-picker
                                        v-model="form12Info.varyingOrderDate"                           
                                        color="warning"             
                                        :allowed-dates="allowedDates"                            
                                        header-color="red"
                                    ></v-date-picker>                            
                                </v-app>
                            </div>    
                        </b-card>                    
                    </b-col>
                </b-row>
<!-- <FilingParties-Made Application> -->
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Who made the application?                                
                    </b-col>
                    <b-col class="ml-1">   
                        <b-form-checkbox-group 
                            stacked
                            @change="filingPartiesChanged()"               
                            style="width:100%"                        
                            :state="state.filingParties"                                      
                            v-model="form12Info.filingParties">
                            <b-form-checkbox
                                :value="applyingparty"
                                v-for="applyingparty,inx in form12Info.applyingParties"
                                :key="'appling-party-'+inx">
                                    {{applyingparty.name}}
                            </b-form-checkbox>
                        </b-form-checkbox-group> 
                    </b-col>
                </b-row> 
                <!-- {{form12Info.filingParties}} -->

                <div v-if="form12Info.filingParties && form12Info.filingParties.length > 0 && form12Info.varyingOrderJudgeName">
<!-- <Appearing Partie -Attended Hearing> -->
                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Enter the names of parties who attended at the hearing:                                
                        </b-col>
                        <b-col class="ml-1">   
                            <b-form-checkbox-group 
                                stacked                                               
                                style="width:100%"                        
                                :state="state.appearingParties"                                      
                                v-model="form12Info.appearingParties">
                                <div v-for="filingparty,inx in getFilingParties"
                                    :key="'appling-party-'+inx">
                                    <b-form-checkbox
                                        :value="filingparty">
                                            {{filingparty.name}}
                                    </b-form-checkbox>                                    
                                </div>
                            </b-form-checkbox-group> 
                        </b-col>
                    </b-row>
                    <!-- {{form12Info.appearingParties}} -->
<!-- <Order Allowed> -->
                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            The application to vary the order of {{form12Info.varyingOrderJudgeName}} was:
                        </b-col>
                        <b-col class="ml-1 mt-2">
                            <b-form-radio-group
                                :state="state.orderAllowed"                 
                                v-model="form12Info.orderAllowed"
                                :options="allowedOptions"                
                            ></b-form-radio-group>
                            <span
                                v-if="(state.orderAllowed != null)" 
                                style="font-size: 0.75rem;" 
                                class="bg-white text-danger"><b-icon-exclamation-circle/>
                                Specify whether the order was allowed or dismissed.
                            </span>
                        </b-col>
                    </b-row>
<!-- <Other Order> -->
                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Did the Justices’ make any other orders?
                        </b-col>
                        <b-col class="ml-1 mt-2">
                            <b-form-radio-group                                              
                                v-model="form12Info.otherOrders"
                                :options="responseOptions"                
                            ></b-form-radio-group>
                            <span
                                v-if="(state.otherOrders != null)" 
                                style="font-size: 0.75rem;" 
                                class="bg-white text-danger"><b-icon-exclamation-circle/>
                                Specify whether the Justices’ made any other orders.
                            </span>
                        </b-col>
                    </b-row>
<!-- <Other Order Details> -->
                    <b-row v-if="form12Info.otherOrders" class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Enter the other orders that the Justices' made:                                                            
                        </b-col>
                        <b-col>                    
                            <b-form-textarea                
                                style="width:100%" 
                                rows="6"  
                                :state="state.furtherOrders"                                                          
                                v-model="form12Info.furtherOrders">
                            </b-form-textarea>                    
                        </b-col>                
                    </b-row>
                </div>

            </div>  

        </div>          
<!-- <Authorizing Name> -->
        <!-- <b-row class="my-3 question" style="padding: 0;">
            <b-col cols="7" class="labels">
                Name of lawyer or party authorizing filing of this Form:                                
            </b-col>
            <b-col>
                <b-form-input                    
                    v-model="form12Info.authorizedName"                        
                    :state ="state.authorizedName">
                </b-form-input>
                <div class="ml-2 mt-1" style="font-weight: 600; font-size:11pt;">Electronically filed</div>
            </b-col>
        </b-row>             -->

        <hr class="mt-5"/>    

        <b-row >
            <b-col cols="10">
                <b-button 
                    style="float: left;" 
                    variant="success"
                    @click="saveForm(true)"
                    >Save as Draft
                </b-button>
            </b-col>
            <b-col cols="2">
                <b-button
                    style="float: right;" 
                    variant="success"
                    @click="saveForm(false)"
                    >Continue
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
        </b-row>

        <b-modal size="xl" v-model="showPartyWindow" footer-class="d-none" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 v-if="isCreate" class="my-2 ml-2">Add {{partyType}}</h1>
                <h1 v-else class="my-2 ml-2">Edit {{partyType}}</h1>
            </template>
            <add-party-modal :isCreate="isCreate" :party="partyToEdit" @partyChanged="partyChanged" />
            <template v-slot:modal-header-close>
                <b-button variant="primary"  class="mt-1" @click="showPartyWindow = false">&times;</b-button>
            </template>
        </b-modal>
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");


import { form12DataInfoType, form12PartiesInfoType } from '@/types/Information/Form12';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddJudgeForm from './AddJudgeForm.vue';
import AddPartyModal from './AddPartyModal.vue';
import { hearingLocationsInfoType } from '@/types/Common';
import {justiceNames} from './JusticeName'

@Component({
    components:{        
        AddJudgeForm,
        AddPartyForm,
        AddPartyModal        
    }
})
export default class Form12StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @commonState.State
    public hearingLocationsInfo!: hearingLocationsInfoType[];

    @form12State.State
    public currentOrder: previousCourtJsonInfoType;

    @form12State.State
    public form12Info: form12DataInfoType;

    @form12State.Action
    public UpdateForm12Info!: (newForm12Info: form12DataInfoType) => void  
    
    @form12State.State
    public currentOrderToVarySingleJusticeId: string;

    @form12State.Action
    public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
    
    dataReady = false;
    updated=0; 
    updateOrderDetails = 0;
    orderDateValue = '';
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form12PartiesInfoType[] = [];

    addJudgeNamesFormColor = 'court';
    AddNewJudgeNamesForm = false;
    latestEditJudgeNamesData;
    isEditJudgeNamesOpen = false;

    hearingLocationList: string[] = [];
    otherHearingLocationList: string[] = [];
    hearingLocation = "";
    otherHearingLocation = "";

    partyToEdit = {} as form12PartiesInfoType;
    showPartyWindow = false
    isCreate = true
    partyType = ''

    allowedOptions = [
        {text: 'Allowed', value: true},
        {text: 'Dismissed', value: false}
    ];

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ]; 

    partyFields = [
        {
            key:'organization',          
            label:'Party Type',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'name',          
            label:'Party Name',   
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

    judgeFields = [
        { key:'name', label:'Name', thClass:'text-white bg-court', thStyle: 'font-size: 1rem;', sortable:false },
        { key:'other',label:'', thClass:'text-white bg-court', thStyle: 'font-size: 1rem;', sortable:false},         
        { key:'edit', label:'', thClass: 'text-white bg-court', sortable:false}
    ]

    state = { 
        appellantsInfo: null,
        respondentsInfo: null,
        judgeNames: null,        
        hearingLocation: null,
        hearingLocationOther: null,     
        dateOfJudgement: null,
        applyingParties: null,   
        varyingOrderJudgeName: null,
        varyingOrderJudgeNameOther: null,
        varyingOrderDate: null,
        filingParties: null,
        appearingParties: null,
        orderAllowed: null,
        otherOrders: null,
        furtherOrders: null,
        authorizedName: null
    }

    justiceNameOptions = [];
    created(){
        this.justiceNameOptions = justiceNames
    }

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }
    
    public extractInfo(){
        
        this.extractHearingLocations()

        if(this.currentOrderToVarySingleJusticeId){
            this.getForm12Data();
           
        } else { 

            const form12Data = this.form12Info;            
            form12Data.version = this.$store.state.Application.version;
            form12Data.applyingParties = [];
            form12Data.judgeNames = [];
            form12Data.appellants = this.partiesJson.appellants
            form12Data.respondents = this.partiesJson.respondents
            form12Data.formSevenNumber = this.fileNumber; 
            form12Data.appearingParties = [];
            form12Data.applyingParties = [];
            form12Data.filingParties = [];           
            form12Data.previousCourts = this.currentOrder;
            this.UpdateForm12Info(form12Data);
            this.initHearingLocation()
            this.revaluateForm12Data()
            this.extractJudgeNames()
            this.saveForm(true);
        }          
    }

    public extractJudgeNames(){
        const currentOrder = this.form12Info.previousCourts
        const judgeName = (
            (currentOrder.JudgeSalutation? currentOrder.JudgeSalutation+' ':'Justice ')+
            (currentOrder.JudgeLastName? currentOrder.JudgeLastName:'')
        ).trim()

        if(judgeName){
            const justiceIndex = justiceNames.findIndex(name=> name.toLowerCase().includes(judgeName.toLowerCase()))
            if(justiceIndex>-1){
                this.form12Info.varyingOrderJudgeName=justiceNames[justiceIndex]
                this.form12Info.varyingOrderJudgeNameOther=''
            }
            else{
                this.form12Info.varyingOrderJudgeName='Other'
                this.form12Info.varyingOrderJudgeNameOther=judgeName
            }
            this.form12Info.varyingOrderDate= currentOrder.JudgmentDate.slice(0,10)            
        }
        else{
            this.form12Info.varyingOrderJudgeName='';
            this.form12Info.varyingOrderJudgeNameOther='';
            this.form12Info.varyingOrderDate='';
        }
        this.UpdateForm12Info(this.form12Info);
    } 

    public extractHearingLocations(){
        this.hearingLocationList = [];
        
        for (const hearingLocation of this.hearingLocationsInfo){
            if (hearingLocation.other)
                this.otherHearingLocationList.push(hearingLocation.name);
            else 
                this.hearingLocationList.push(hearingLocation.name);                
        }
        this.hearingLocationList.push('Other');
    }
    
    public initHearingLocation(){
        this.hearingLocation = this.form12Info.hearingLocation?.name
        if(this.otherHearingLocationList.includes(this.hearingLocation)){
            this.hearingLocation ='Other'
            this.otherHearingLocation = this.form12Info.hearingLocation.name
        }
    }

    public updateHearingLocation(){ 
              
        const form12 = this.form12Info;       
        form12.hearingLocation = {} as hearingLocationsInfoType;
       
        if (this.hearingLocation == 'Other' && this.otherHearingLocation.length > 0){
            form12.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.otherHearingLocation)[0]
        } else if (this.hearingLocation != 'Other') {
            form12.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.hearingLocation)[0]
        }  
        
        this.UpdateForm12Info(form12);
    }

    public revaluateForm12Data(){

        const form12Data = this.form12Info;

        for (const respondent of form12Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form12Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form12Data.appellants.map(resp=>resp.name)
        const respondents = form12Data.respondents.map(resp=>resp.name)
        form12Data.appellantNames = appellants.join(', ');
        form12Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form12Data.appellants, ...form12Data.respondents]
        this.UpdateForm12Info(form12Data);
    }

    public getForm12Data() {        
       
        this.$http.get('/form12/forms/'+this.currentOrderToVarySingleJusticeId)
        .then((response) => {
            if(response?.data?.data){
                const form12Data = response.data.data
                this.UpdateForm12Info(form12Data);
                this.revaluateForm12Data()
                this.initHearingLocation()
                this.clearStates();
                this.extractJudgeNames()                
            }                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            appellantsInfo: null,
            respondentsInfo: null,
            judgeNames: null,        
            hearingLocation: null,
            hearingLocationOther: null,     
            dateOfJudgement: null,
            applyingParties: null,   
            varyingOrderJudgeName: null,
            varyingOrderJudgeNameOther: null,
            varyingOrderDate: null,
            filingParties: null,
            appearingParties: null,
            orderAllowed: null,
            otherOrders: null,
            furtherOrders: null,
            authorizedName: null
        }
        this.dataReady = true; 
    }

    public checkStates(){  
        
        this.state.appellantsInfo = this.form12Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form12Info.respondents?.length>0? null :false;            
        this.state.judgeNames = this.form12Info.judgeNames?.length>0? null :false;
        
        this.state.hearingLocation =  this.hearingLocation? null :false
        this.state.hearingLocationOther =  this.hearingLocation=='Other' && !this.otherHearingLocation? false :null
        
        this.state.dateOfJudgement = this.form12Info.dateOfJudgement? null: false;
        this.state.applyingParties = this.form12Info.applyingParties?.length>0? null :false;
        this.state.varyingOrderJudgeName = this.form12Info.varyingOrderJudgeName? null :false;
        this.state.varyingOrderJudgeNameOther = this.form12Info.varyingOrderJudgeName=='Other' && !this.form12Info.varyingOrderJudgeNameOther? false: null;
        this.state.varyingOrderDate = this.form12Info.varyingOrderDate? null :false;
        this.state.filingParties = this.form12Info.filingParties?.length>0? null :false;
        this.state.appearingParties = this.form12Info.appearingParties?.length>0? null :false;
        this.state.orderAllowed = this.form12Info.orderAllowed == true || this.form12Info.orderAllowed ==false? null :false;
        this.state.otherOrders = this.form12Info.otherOrders == true || this.form12Info.otherOrders ==false? null :false;
        this.state.furtherOrders = this.form12Info.otherOrders == true && !this.form12Info.furtherOrders? false :null

        this.state.authorizedName = !this.form12Info.authorizedName? false : null;       

        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    } 

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form12/forms';

        if (this.currentOrderToVarySingleJusticeId){
            method = 'put';
            url = '/form12/forms/'+this.currentOrderToVarySingleJusticeId;
            const form12Data = this.form12Info;            
            this.UpdateForm12Info(form12Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form12Info,
                    type:'Form12',
                    description:'Order from an application to vary the order of a justice'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form12Info,
                    type:'Form12',
                    description:'Order from an application to vary the order of a justice'
                }
            }
            this.saveInfo(options, draft);
        }
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentOrderToVarySingleJusticeId(response.data.file_id); 
                    }

                    this.clearStates();                                     
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;                
            })
    }

    public addNewRespondent(){
        this.state.respondentsInfo = null
        this.partyToEdit = {} as form12PartiesInfoType
        this.partyType = 'Respondent'
        this.isCreate = true;
        this.showPartyWindow = true;        
    }

    public editRespondent(data) {
        this.partyToEdit = data.item
        this.partyType = 'Respondent';
        this.isCreate = false;
        this.showPartyWindow = true;
    }

    public removeRespondent(data){ 
        const form12Data = this.form12Info;       
        form12Data.respondents.splice(data.index,1);
        form12Data.respondentNames = form12Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form12Data.appellants, ...form12Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form12PartiesInfoType
        this.partyType = 'Appellant'
        this.isCreate = true;
        this.showPartyWindow = true;        
    }

    public editAppellant(data) {
        this.partyToEdit = data.item
        this.partyType = 'Appellant';
        this.isCreate = false;
        this.showPartyWindow = true;        
    }

    public removeAppellant(data){   
        const form12Data = this.form12Info;       
        form12Data.appellants.splice(data.index,1); 
        form12Data.appellantNames = form12Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form12Data.appellants, ...form12Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form12Info = this.form12Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form12Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form12Info.respondents.push(party);
            }
            this.UpdateForm12Info(form12Info)
        }
        this.revaluateForm12Data();
        this.showPartyWindow = false;
        this.somePartiesChanged() 
        this.updated++;
    }

    public addNewJudgeNames(){
        if(this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger'
        }else{
            this.state.judgeNames = null;
            this.AddNewJudgeNamesForm = true;            
        }
    }

    public editJudgeNames(data) {
        // console.log(data)
        if(this.AddNewJudgeNamesForm || this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger';                     
        }else if(!this.isEditJudgeNamesOpen && !data.detailsShowing){
            //console.log(data);
            data.toggleDetails();
            this.isEditJudgeNamesOpen = true;
            this.latestEditJudgeNamesData = data;            
        }   
    }

    public modifyJudgeNames(isCreateJudgeNames: boolean, newJudgeName: string, index: number, otherName){        

        const form12Data = this.form12Info;

        if (isCreateJudgeNames){           
            form12Data.judgeNames.push({name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) })            
        } else {                    
            form12Data.judgeNames[index] = {name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) };        
        }
        this.UpdateForm12Info(form12Data)
        this.closeJudgeNamesForm();
        this.updated ++;
    }

    public removeJudgeNames(data){ 
        const form12Data = this.form12Info;       
        form12Data.judgeNames.splice(data.index,1);        
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public closeJudgeNamesForm() {                     
        this.AddNewJudgeNamesForm= false; 
        this.addJudgeNamesFormColor = 'court'
        if(this.isEditJudgeNamesOpen){
            this.latestEditJudgeNamesData.toggleDetails();
            this.isEditJudgeNamesOpen = false;
        } 
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date < day);           
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form12"}) 
    }

    public somePartiesChanged(){
        this.form12Info.applyingParties=[]
        this.form12Info.filingParties=[]
        this.form12Info.appearingParties=[]
        this.updated++;
    }

    public applyingPartiesChanged(){
        this.form12Info.filingParties=[]
        this.form12Info.appearingParties=[]
        this.updated++;
    }
    
    public filingPartiesChanged(){
        this.form12Info.appearingParties=[]
        this.updated++;
    }

    get getFilingParties(){
        const filingParties=[]
            for(const party of this.form12Info.filingParties){
                filingParties.push(party)                
                if(party.counselName){
                    const counsel: form12PartiesInfoType = JSON.parse(JSON.stringify(party))
                    counsel.isCounsel = true
                    counsel.name = counsel.counselName+', counsel for '+counsel.name
                    filingParties.push(counsel)                    
                }
            }
        return filingParties
    }

}
</script>

<style scoped lang="scss">

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    }

    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 0.75rem !important;
    }

</style>