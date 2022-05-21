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
                            v-if="form10Info.appellants.length == 0 && !AddNewAppellantForm" 
                            id="appellants" 
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form10Info.appellants.length > 0"                                                                
                            id="appellants"
                            class="mt-2"
                            :items="form10Info.appellants"
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
                            v-if="form10Info.respondents.length == 0 && !AddNewRespondentForm" 
                            id="respondents" 
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form10Info.respondents.length > 0"                                                                
                            id="respondents"
                            class="mt-2"
                            :items="form10Info.respondents"
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
        
        <div v-if="this.form10Info.appellants && this.form10Info.appellants.length>0 && this.form10Info.respondents && this.form10Info.respondents.length>0">
            <p style="font-size: 1.25rem; margin:0 0 0 1rem;">Style of Proceeding (Parties) in Case</p>

<!-- <BETWEEN> -->
            <b-row class="mt-4 ml-1" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form10Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
<!-- <AND> -->
            <b-row class="mt-3 ml-1" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form10Info.respondentNames}}</span></b-col>
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
                                    v-if="form10Info.judgeNames && form10Info.judgeNames.length == 0 && !AddNewJudgeNamesForm"                                      
                                    class="text-muted mt-3">No judges have been listed.
                                </div>
                                <b-table
                                    v-else-if="form10Info.judgeNames && form10Info.judgeNames.length > 0"
                                    class="mt-2"
                                    :items="form10Info.judgeNames"
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
                                    v-model="form10Info.dateOfJudgement"                           
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
                        v-model="form10Info.applyingParties">
                        <b-form-checkbox
                            :value="partyname" 
                            v-for="partyname,inx in partyNames" 
                            :key="'party-made-app-'+inx">
                            {{partyname.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group> 
                </b-col>
            </b-row> 
            <!-- {{form10Info.applyingParties}}    -->

            <div v-if="this.form10Info.judgeNames && this.form10Info.judgeNames.length>0 && form10Info.applyingParties.length > 0">   
<!-- <Who Made Order-VaryOrderJudgeName> -->
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Who made the order that you were seeking to vary?                                
                    </b-col>
                    <b-col class="ml-1">   
                        <b-form-select 
                            stacked               
                            style="width:100%"                                    
                            v-model="form10Info.varyingOrderJudgeName"
                            text-field="text"
                            value-field="text"                    
                            :options="justiceNameOptions">                            
                        </b-form-select>
                        <b-row v-if="form10Info.varyingOrderJudgeName == 'Other'" class="m-0 p-0">
                            <div style="width:25%;" class="mt-3 ml-1">Other Name:</div>
                            <div style="width:74%;">
                                <b-form-input 
                                    style="margin-top:0.5rem;"                                
                                    :state="state.varyingOrderJudgeNameOther"
                                    v-model="form10Info.varyingOrderJudgeNameOther" 
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
                                        v-model="form10Info.varyingOrderDate"                           
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
                            v-model="form10Info.filingParties">
                            <b-form-checkbox
                                :value="applyingparty"
                                v-for="applyingparty,inx in form10Info.applyingParties"
                                :key="'appling-party-'+inx">
                                    {{applyingparty.name}}
                            </b-form-checkbox>
                        </b-form-checkbox-group> 
                    </b-col>
                </b-row> 
                <!-- {{form10Info.filingParties}} -->

                <div v-if="form10Info.filingParties && form10Info.filingParties.length > 0 && form10Info.varyingOrderJudgeName">
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
                                v-model="form10Info.appearingParties">
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
                    <!-- {{form10Info.appearingParties}} -->
<!-- <Order Allowed> -->
                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            The application to vary the order of {{form10Info.varyingOrderJudgeName}} was:
                        </b-col>
                        <b-col class="ml-1 mt-2">
                            <b-form-radio-group
                                :state="state.orderAllowed"                 
                                v-model="form10Info.orderAllowed"
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
                                v-model="form10Info.otherOrders"
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
                    <b-row v-if="form10Info.otherOrders" class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Enter the other orders that the Justices' made:                                                            
                        </b-col>
                        <b-col>                    
                            <b-form-textarea                
                                style="width:100%" 
                                rows="6"  
                                :state="state.furtherOrders"                                                          
                                v-model="form10Info.furtherOrders">
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
                    v-model="form10Info.authorizedName"                        
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

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");


import { form10DataInfoType, form10PartiesInfoType } from '@/types/Information/Form10';
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
export default class Form10StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @commonState.State
    public hearingLocationsInfo!: hearingLocationsInfoType[];

    @form10State.State
    public currentOrder: previousCourtJsonInfoType;

    @form10State.State
    public form10Info: form10DataInfoType;

    @form10State.Action
    public UpdateForm10Info!: (newForm10Info: form10DataInfoType) => void  
    
    @form10State.State
    public currentOrderSingleJusticeId: string;

    @form10State.Action
    public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void
    
    dataReady = false;
    updated=0; 
    updateOrderDetails = 0;
    orderDateValue = '';
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form10PartiesInfoType[] = [];

    addJudgeNamesFormColor = 'court';
    AddNewJudgeNamesForm = false;
    latestEditJudgeNamesData;
    isEditJudgeNamesOpen = false;

    hearingLocationList: string[] = [];
    otherHearingLocationList: string[] = [];
    hearingLocation = "";
    otherHearingLocation = "";

    partyToEdit = {} as form10PartiesInfoType;
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

        if(this.currentOrderSingleJusticeId){
            this.getForm10Data();
           
        } else { 

            const form10Data = this.form10Info;            
            form10Data.version = this.$store.state.Application.version;
            form10Data.applyingParties = [];
            form10Data.judgeNames = [];
            form10Data.appellants = this.partiesJson.appellants
            form10Data.respondents = this.partiesJson.respondents
            form10Data.formSevenNumber = this.fileNumber; 
            form10Data.appearingParties = [];
            form10Data.applyingParties = [];
            form10Data.filingParties = [];           
            form10Data.previousCourts = this.currentOrder;
            this.UpdateForm10Info(form10Data);
            this.initHearingLocation()
            this.revaluateForm10Data()
            this.extractJudgeNames()
            this.saveForm(true);
        }          
    }

    public extractJudgeNames(){
        const currentOrder = this.form10Info.previousCourts
        const judgeName = (
            (currentOrder.JudgeSalutation? currentOrder.JudgeSalutation+' ':'Justice ')+
            (currentOrder.JudgeLastName? currentOrder.JudgeLastName:'')
        ).trim()

        if(judgeName){
            const justiceIndex = justiceNames.findIndex(name=> name.toLowerCase().includes(judgeName.toLowerCase()))
            if(justiceIndex>-1){
                this.form10Info.varyingOrderJudgeName=justiceNames[justiceIndex]
                this.form10Info.varyingOrderJudgeNameOther=''
            }
            else{
                this.form10Info.varyingOrderJudgeName='Other'
                this.form10Info.varyingOrderJudgeNameOther=judgeName
            }
            this.form10Info.varyingOrderDate= currentOrder.JudgmentDate.slice(0,10)            
        }
        else{
            this.form10Info.varyingOrderJudgeName='';
            this.form10Info.varyingOrderJudgeNameOther='';
            this.form10Info.varyingOrderDate='';
        }
        this.UpdateForm10Info(this.form10Info);
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
        this.hearingLocation = this.form10Info.hearingLocation?.name
        if(this.otherHearingLocationList.includes(this.hearingLocation)){
            this.hearingLocation ='Other'
            this.otherHearingLocation = this.form10Info.hearingLocation.name
        }
    }

    public updateHearingLocation(){ 
              
        const form10 = this.form10Info;       
        form10.hearingLocation = {} as hearingLocationsInfoType;
       
        if (this.hearingLocation == 'Other' && this.otherHearingLocation.length > 0){
            form10.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.otherHearingLocation)[0]
        } else if (this.hearingLocation != 'Other') {
            form10.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.hearingLocation)[0]
        }  
        
        this.UpdateForm10Info(form10);
    }

    public revaluateForm10Data(){

        const form10Data = this.form10Info;

        for (const respondent of form10Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form10Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form10Data.appellants.map(resp=>resp.name)
        const respondents = form10Data.respondents.map(resp=>resp.name)
        form10Data.appellantNames = appellants.join(', ');
        form10Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form10Data.appellants, ...form10Data.respondents]
        this.UpdateForm10Info(form10Data);
    }

    public getForm10Data() {        
       
        this.$http.get('/form10/forms/'+this.currentOrderSingleJusticeId)
        .then((response) => {
            if(response?.data?.data){
                const form10Data = response.data.data
                this.UpdateForm10Info(form10Data);
                this.revaluateForm10Data()
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
        
        this.state.appellantsInfo = this.form10Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form10Info.respondents?.length>0? null :false;            
        this.state.judgeNames = this.form10Info.judgeNames?.length>0? null :false;
        
        this.state.hearingLocation =  this.hearingLocation? null :false
        this.state.hearingLocationOther =  this.hearingLocation=='Other' && !this.otherHearingLocation? false :null
        
        this.state.dateOfJudgement = this.form10Info.dateOfJudgement? null: false;
        this.state.applyingParties = this.form10Info.applyingParties?.length>0? null :false;
        this.state.varyingOrderJudgeName = this.form10Info.varyingOrderJudgeName? null :false;
        this.state.varyingOrderJudgeNameOther = this.form10Info.varyingOrderJudgeName=='Other' && !this.form10Info.varyingOrderJudgeNameOther? false: null;
        this.state.varyingOrderDate = this.form10Info.varyingOrderDate? null :false;
        this.state.filingParties = this.form10Info.filingParties?.length>0? null :false;
        this.state.appearingParties = this.form10Info.appearingParties?.length>0? null :false;
        this.state.orderAllowed = this.form10Info.orderAllowed == true || this.form10Info.orderAllowed ==false? null :false;
        this.state.otherOrders = this.form10Info.otherOrders == true || this.form10Info.otherOrders ==false? null :false;
        this.state.furtherOrders = this.form10Info.otherOrders == true && !this.form10Info.furtherOrders? false :null

        this.state.authorizedName = !this.form10Info.authorizedName? false : null;       

        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    } 

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form10/forms';

        if (this.currentOrderSingleJusticeId){
            method = 'put';
            url = '/form10/forms/'+this.currentOrderSingleJusticeId;
            const form10Data = this.form10Info;            
            this.UpdateForm10Info(form10Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form10Info,
                    type:'Form10',
                    description:'Order from an application to vary the order of a justice'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form10Info,
                    type:'Form10',
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
                        this.UpdateCurrentOrderSingleJusticeId(response.data.file_id); 
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
        this.partyToEdit = {} as form10PartiesInfoType
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
        const form10Data = this.form10Info;       
        form10Data.respondents.splice(data.index,1);
        form10Data.respondentNames = form10Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form10Data.appellants, ...form10Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm10Info(form10Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form10PartiesInfoType
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
        const form10Data = this.form10Info;       
        form10Data.appellants.splice(data.index,1); 
        form10Data.appellantNames = form10Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form10Data.appellants, ...form10Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm10Info(form10Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form10Info = this.form10Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form10Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form10Info.respondents.push(party);
            }
            this.UpdateForm10Info(form10Info)
        }
        this.revaluateForm10Data();
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

        const form10Data = this.form10Info;

        if (isCreateJudgeNames){           
            form10Data.judgeNames.push({name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) })            
        } else {                    
            form10Data.judgeNames[index] = {name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) };        
        }
        this.UpdateForm10Info(form10Data)
        this.closeJudgeNamesForm();
        this.updated ++;
    }

    public removeJudgeNames(data){ 
        const form10Data = this.form10Info;       
        form10Data.judgeNames.splice(data.index,1);        
        this.UpdateForm10Info(form10Data);
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
        this.$router.push({name: "preview-form10"}) 
    }

    public somePartiesChanged(){
        this.form10Info.applyingParties=[]
        this.form10Info.filingParties=[]
        this.form10Info.appearingParties=[]
        this.updated++;
    }

    public applyingPartiesChanged(){
        this.form10Info.filingParties=[]
        this.form10Info.appearingParties=[]
        this.updated++;
    }
    
    public filingPartiesChanged(){
        this.form10Info.appearingParties=[]
        this.updated++;
    }

    get getFilingParties(){
        const filingParties=[]
            for(const party of this.form10Info.filingParties){
                filingParties.push(party)                
                if(party.counselName){
                    const counsel: form10PartiesInfoType = JSON.parse(JSON.stringify(party))
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