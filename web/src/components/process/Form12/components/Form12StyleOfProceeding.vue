<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">                 

        <b-card class="mb-4 bg-white border-white text-dark"> 
            <b-card no-body class="border-white">
                <b-row class="mb-2">   
                    <b-col cols="10" :class="state.appellantsInfo !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="Appellants:" 
                            label-for="appellants">
                            <p class="content text-primary">
                                You must enter the full names of all the appellant(s) as 
                                it appears on the reasons for judgment or notice of appeal.
                            </p>  
                            <span 
                                v-if="form12Info.appellantsInfo.length == 0 && !AddNewAppellantForm" 
                                id="appellants" 
                                class="text-muted ml-2 my-2">No appellants have been assigned.
                            </span>
                            <b-table
                                v-else-if="form12Info.appellantsInfo.length > 0"                                                                
                                id="appellants"
                                class="mt-2"
                                :items="form12Info.appellantsInfo"
                                :fields="partyFields"
                                head-row-variant="primary"
                                borderless    
                                small                                            
                                responsive="sm"
                                >                                          
                                <template v-slot:cell(organization)="data" >
                                    <span v-if="data.item.organization" style="font-size: 16px;">
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

                                <template v-slot:row-details="data">
                                    <b-card 
                                        body-class="m-0 px-0 py-1" 
                                        :border-variant="addAppellantFormColor" 
                                        style="border:2px solid;">
                                        <add-party-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateParty="false" 
                                            v-on:submit="modifyAppellantList" 
                                            v-on:cancel="closeAppellantForm" />
                                    </b-card>
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
            </b-card>           

            <b-card 
                v-if="AddNewAppellantForm" 
                id="addAppellantForm" 
                class="my-1 ml-4" 
                :border-variant="addAppellantFormColor" 
                style="border:2px solid; width: 81%;" 
                body-class="px-1 py-1">
                <add-party-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateParty="true" 
                    v-on:submit="modifyAppellantList" 
                    v-on:cancel="closeAppellantForm" />                
            </b-card>

            <b-card no-body class="border-white">
                <b-row class="mb-2">   
                    <b-col cols="10" :class="state.respondentsInfo !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="Respondents:" 
                            label-for="respondents">
                            <p class="content text-primary">
                                You must enter full names of all the respondent(s) as it 
                                appears on reasons for judgment or notice of appeal.
                            </p> 
                            <span 
                                v-if="form12Info.respondentsInfo.length == 0 && !AddNewRespondentForm" 
                                id="respondents" 
                                class="text-muted ml-2 my-2">No respondents have been assigned.
                            </span>
                            <b-table
                                v-else-if="form12Info.respondentsInfo.length > 0"                                                                
                                id="respondents"
                                class="mt-2"
                                :items="form12Info.respondentsInfo"
                                :fields="partyFields"
                                head-row-variant="primary"
                                borderless    
                                small                                            
                                responsive="sm"
                                >                                          
                                <template v-slot:cell(organization)="data" >
                                    <span v-if="data.item.organization" style="font-size: 16px;">
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

                                <template v-slot:row-details="data">
                                    <b-card 
                                        body-class="m-0 px-0 py-1" 
                                        :border-variant="addRespondentFormColor" 
                                        style="border:2px solid;">
                                        <add-party-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateParty="false" 
                                            v-on:submit="modifyRespondentList" 
                                            v-on:cancel="closeRespondentForm" />
                                    </b-card>
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

            <b-card 
                v-if="AddNewRespondentForm" 
                id="addPartyForm" 
                class="my-1 ml-4" 
                :border-variant="addRespondentFormColor" 
                style="border:2px solid; width: 81%;" 
                body-class="px-1 py-1">
                <add-party-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateParty="true" 
                    v-on:submit="modifyRespondentList" 
                    v-on:cancel="closeRespondentForm" />                
            </b-card>                 
        </b-card>
        
        <div v-if="partyDataExists()">
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>
            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form12Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form12Info.respondentNames}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>   

            <b-card class="mb-4 bg-white border-white text-dark"> 
                <b-card no-body class="border-white">
                    <b-row class="mb-2 ml-1" style="margin-left: -0.25rem !important;">   
                        <b-col cols="10" :class="state.judgeNames !=null?'border-danger':''">
                            <b-form-group
                                class="labels"                
                                label="Provide the names of the justices who heard the application:" 
                                label-for="judges">
                                <p class="content text-primary">
                                    <b>Note:</b> Justices’ names must be set out in the same order 
                                    as the reasons for Judgment.
                                </p> 
                                <span 
                                    v-if="form12Info.judgeNames && form12Info.judgeNames.length == 0 && !AddNewJudgeNamesForm" 
                                    id="judges" 
                                    class="text-muted ml-2 mb-2 mt-4">No judges have been listed.
                                </span>
                                <b-table
                                    v-else-if="form12Info.judgeNames && form12Info.judgeNames.length > 0"
                                    :key="updated"                                
                                    id="judges"
                                    class="mt-2"
                                    :items="form12Info.judgeNames"
                                    :fields="judgeFields"
                                    head-row-variant="primary"
                                    borderless    
                                    small                                            
                                    responsive="sm"
                                    >

                                    <template v-slot:cell(name)="data" >
                                        <span style="font-size: 16px;">
                                            {{data.item}}
                                        </span>
                                    </template>
                                    
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
                        :formData="{}" 
                        :index="-1" 
                        :isCreateJudge="true" 
                        v-on:submit="modifyJudgeNames" 
                        v-on:cancel="closeJudgeNamesForm" />                
                </b-card>
            </b-card>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Where was the hearing held?                                
                </b-col>
                <b-col class="ml-1 mt-2">  
                    <b-form-select                
                        style="width:100%"              
                        v-model="hearingLocation" 
                        @change="update"                   
                        :options="hearingLocationList">
                    </b-form-select>
                    <b-row v-if="hearingLocation == 'Other'">
                        <span class="mt-3 ml-3">Specify:</span>
                        <b-form-select                        
                            style="width:70%; float: right;"
                            class="mt-2 ml-5"
                            @change="update"
                            :options="otherHearingLocationList"                                    
                            v-model="otherHearingLocation">
                        </b-form-select>
                    </b-row>
                    <span
                        v-if="(state.hearingLocation != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Hearing Location.
                    </span>                        
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What was the date of the judgment?                    
                </b-col>
                <b-col>                   
                    <b-card                        
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="state.dateOfJudgement == false?'danger': 'dark'">
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

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the application to vary the order of a justice?                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked               
                        style="width:100%"                        
                        :state="state.applyingParties"                                      
                        v-model="form12Info.applyingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                </b-col>
            </b-row>    

            <div v-if="justiceDataExists() && form12Info.applyingParties.length > 0">   

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Who made the order that you were seeking to vary?                                
                    </b-col>
                    <b-col class="ml-1">   
                        <b-form-radio-group 
                            stacked               
                            style="width:100%"                                    
                            v-model="form12Info.varyingOrderJudgeName"                    
                            :options="form12Info.judgeNames">
                        </b-form-radio-group> 
                        <span
                            v-if="(state.varyingOrderJudgeName != null)" 
                            style="font-size: 0.75rem;" 
                            class="bg-white text-danger"><b-icon-exclamation-circle/>
                            Specify who made the order that you were seeking to vary.
                        </span>

                    </b-col>
                </b-row>   

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        What was the date of the order that were seeking to vary?                    
                    </b-col>
                    <b-col>                   
                        <b-card                        
                            class="mt-2" 
                            style="padding: 0; float: left;" 
                            :border-variant="state.varyingOrderDate == false?'danger': 'dark'">
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

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Who made the application?                                
                    </b-col>
                    <b-col class="ml-1">   
                        <b-form-checkbox-group 
                            stacked               
                            style="width:100%"                        
                            :state="state.filingParties"                                      
                            v-model="form12Info.filingParties"                    
                            :options="form12Info.applyingParties">
                        </b-form-checkbox-group> 
                    </b-col>
                </b-row> 

                <div v-if="form12Info.filingParties.length > 0 && form12Info.varyingOrderJudgeName">

                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Enter the names of parties who attended at the hearing:                                
                        </b-col>
                        <b-col class="ml-1">   
                            <b-form-checkbox-group 
                                stacked               
                                style="width:100%"                        
                                :state="state.appearingParties"                                      
                                v-model="form12Info.appearingParties"                    
                                :options="form12Info.filingParties">
                            </b-form-checkbox-group> 
                        </b-col>
                    </b-row>

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

        <b-row class="my-3 question" style="padding: 0;">
            <b-col cols="7" class="labels">
                Name of lawyer or party authorizing filing of this Form:                                
            </b-col>
            <b-col>
                <b-form-input                    
                    v-model="form12Info.authorizedName"                        
                    :state ="state.authorizedName">
                </b-form-input>
                <span class="ml-2" style="font-weight: 600; font-size:11pt;">Electronically filed</span>

            </b-col>
        </b-row>            

        <hr/>    

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

import { partyInfoType } from '@/types/Information/Form3';
import { form12DataInfoType } from '@/types/Information/Form12';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddJudgeForm from './AddJudgeForm.vue';
import { hearingLocationsInfoType } from '@/types/Common';


@Component({
    components:{        
        AddJudgeForm,
        AddPartyForm        
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
    latestEditRespondentData;
    isEditRespondentOpen = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;
    latestEditAppellantData;
    isEditAppellantOpen = false;

    addJudgeNamesFormColor = 'court';
    AddNewJudgeNamesForm = false;
    latestEditJudgeNamesData;
    isEditJudgeNamesOpen = false;

    hearingLocationList: string[] = [];
    otherHearingLocationList: string[] = [];
    hearingLocation = "";
    otherHearingLocation = "";

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
        {
            key:'name',          
            label:'Name',                  
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

    state = { 
        appellantsInfo: null,
        respondentsInfo: null,
        judgeNames: null,        
        hearingLocation: null,     
        dateOfJudgement: null,
        applyingParties: null,   
        varyingOrderJudgeName: null,
        varyingOrderDate: null,
        filingParties: null,
        appearingParties: null,
        orderAllowed: null,
        otherOrders: null,
        furtherOrders: null,
        authorizedName: null
    }

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }

    public partyDataExists(){

        const exists =  
            this.form12Info.appellantsInfo.length>0 && 
            this.form12Info.respondentsInfo.length>0;
            
        return exists;
    }

    public justiceDataExists(){

        const exists =  
            this.form12Info.judgeNames.length>0;
            
        return exists;
    }

    public update(){ 
              
        const form12 = this.form12Info;
       
        form12.hearingLocation = {} as hearingLocationsInfoType;
       
        if (this.hearingLocation == 'Other' && this.otherHearingLocation.length > 0){
            form12.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.otherHearingLocation)[0]
        } else if (this.hearingLocation != 'Other') {
            form12.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.hearingLocation)[0]
        }  
        
        this.UpdateForm12Info(form12);
    }

    public extractInfo(){       

        this.hearingLocationList = [];
        
        for (const hearingLocation of this.hearingLocationsInfo){
            if (hearingLocation.other){
                this.otherHearingLocationList.push(hearingLocation.name);
            } else {
                this.hearingLocationList.push(hearingLocation.name);    
            }           
        }

        this.hearingLocationList.push('Other');

        if(this.currentOrderToVarySingleJusticeId){
            this.getForm12Data();
           
        } else { 

            const form12Data = this.form12Info;            
            form12Data.version = this.$store.state.Application.version;
            form12Data.respondentsInfo = [];
            form12Data.appellantsInfo = [];
            form12Data.applyingParties = [];
            form12Data.judgeNames = [];                          

            let applicantNames = [];
            let respondentNames = []; 
            let applicantInfo: partyInfoType[] = [];
            let respondentInfo: partyInfoType[] = [];              

            form12Data.appellants = this.partiesJson.appellants
            form12Data.respondents = this.partiesJson.respondents;

            for (const respondent of form12Data.respondents){
                const party = {} as partyInfoType;
                party.name = respondent.name;
                if (party.firstName && party.lastName){
                    party.firstName = respondent.firstName;
                    party.lastName = respondent.lastName;
                    party.organization = false;
                } else if (respondent.organization){
                    party.organization = true;
                }
                respondentInfo.push(party);
                respondentNames.push(party.name);                
            }

            for (const applicant of form12Data.appellants){
                const party = {} as partyInfoType;
                party.name = applicant.name;
                if (party.firstName && party.lastName){
                    party.firstName = applicant.firstName;
                    party.lastName = applicant.lastName;
                    party.organization = false;
                } else if (applicant.organization){
                    party.organization = true;
                }
                applicantInfo.push(party);                
                applicantNames.push(party.name);                
            }

            form12Data.appellantNames = applicantNames.join(', ');
            form12Data.respondentNames = respondentNames.join(', ');   
            form12Data.appellantsInfo = applicantInfo;
            form12Data.respondentsInfo = respondentInfo;  
                    
            form12Data.formSevenNumber = this.fileNumber;
            
            this.UpdateForm12Info(form12Data);
            
            this.saveForm(true);
        }            

    }

    get partyNames(){
        
        let partyNames: string[] = [];        

        for (const respondent of this.form12Info.respondentsInfo){
            partyNames.push(respondent.name) 
        }

        for (const applicant of this.form12Info.appellantsInfo){
            partyNames.push(applicant.name);  
        }
        
        return partyNames;
    }  

    get applicantNames(){
        
        let applicantNames: string[] = [];                  

        for (const applicant of this.form12Info.appellantsInfo){
            applicantNames.push(applicant.name);  
        }
            
        return applicantNames;
    }

    get respondentNames(){
        
        let respondentNames: string[] = [];       

        for (const respondent of this.form12Info.respondentsInfo){
            respondentNames.push(respondent.name) 
        } 

        return respondentNames;
    }   

    public getForm12Data() {        
       
        this.$http.get('/form12/forms/'+this.currentOrderToVarySingleJusticeId)
        .then((response) => {
            if(response?.data?.data){
                const form12Data = response.data.data
                this.UpdateForm12Info(form12Data);
                this.clearStates();                
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
            dateOfJudgement: null,
            applyingParties: null,   
            varyingOrderJudgeName: null,
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

        
        // this.state.appellants = this.form12Info.appellantsInfo?.length>0? null :false;
        // this.state.respondents = this.form12Info.respondentsInfo?.length>0? null :false;            
        
        
        // this.state.firstAppellant = this.form12Info.firstAppellant != null? null:false;
        // this.state.firstRespondent = this.form12Info.firstRespondent != null? null:false;
        // this.state.applyingParties = this.form12Info.applyingParties?.length>0? null :false;
        
        // this.state.orders = this.form12Info.orders != null? null:false;
        // this.state.grounds = this.form12Info.grounds != null? null:false;
        
        // this.state.assets = this.form12Info.assets != null? null:false;
        // this.state.income = this.form12Info.income != null? null:false;
        // const financesRequired = this.form12Info.assets == false && this.form12Info.income == 0
        // this.state.finances = (financesRequired && !this.form12Info.finances)? false: null;
        
        // this.state.authorizedName = !this.form12Info.authorizedName? false : null;       

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
        if(this.isEditRespondentOpen){            
            this.addRespondentFormColor = 'danger'
        }else{
            this.AddNewRespondentForm = true;            
        }
    }

    public editRespondent(data) {
        if(this.AddNewRespondentForm || this.isEditRespondentOpen){            
            this.addRespondentFormColor = 'danger';                     
        }else if(!this.isEditRespondentOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditRespondentOpen = true;
            this.latestEditRespondentData = data            
        }   
    }

    public modifyRespondentList(isCreateParty: boolean, newParty: partyInfoType, index: number){        

        if (isCreateParty){

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName;
            }

            const respondentNames = []
            const form12Data = this.form12Info;
            form12Data.respondentsInfo.push(newParty)

            for (const respondent of form12Data.respondentsInfo){
                respondentNames.push(respondent.name);                
            }
            form12Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm12Info(form12Data)

            this.closeRespondentForm();

        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName;
            }  
            
            const respondentNames = [];
            const form12Data = this.form12Info;
            form12Data.respondentsInfo[index].organization = newParty.organization;
            form12Data.respondentsInfo[index].name = newParty.name; 
            form12Data.respondentsInfo[index].firstName = newParty.firstName;
            form12Data.respondentsInfo[index].lastName = newParty.lastName;

            for (const respondent of form12Data.respondentsInfo){
                respondentNames.push(respondent.name);                
            }
            form12Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm12Info(form12Data);
                      
            this.closeRespondentForm();
        }
        this.updated ++;
    }

    public removeRespondent(data){ 
        const form12Data = this.form12Info;       
        form12Data.respondentsInfo.splice(data.index,1);
        const respondentNames = [];
        for (const respondent of form12Data.respondentsInfo){
            respondentNames.push(respondent.name);                
        }
        form12Data.respondentNames = respondentNames.join(', '); 
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public closeRespondentForm() {                     
        this.AddNewRespondentForm= false; 
        this.addRespondentFormColor = 'court'
        if(this.isEditRespondentOpen){
            this.latestEditRespondentData.toggleDetails();
            this.isEditRespondentOpen = false;
        } 
    }

    public addNewAppellant(){
        if(this.isEditAppellantOpen){            
            this.addAppellantFormColor = 'danger'
        }else{
            this.AddNewAppellantForm = true;            
        }
    }

    public editAppellant(data) {
        if(this.AddNewAppellantForm || this.isEditAppellantOpen){            
            this.addAppellantFormColor = 'danger';                     
        }else if(!this.isEditAppellantOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditAppellantOpen = true;
            this.latestEditAppellantData = data            
        }   
    }
    
    public modifyAppellantList(isCreateParty: boolean, newParty: partyInfoType, index: number){        

        if (isCreateParty){ 

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName;
            }    

            const appellantNames = [];
            const form12Data = this.form12Info;
            form12Data.appellantsInfo.push(newParty)

            for (const appellant of form12Data.appellantsInfo){
                appellantNames.push(appellant.name);                
            }
            form12Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm12Info(form12Data);

            this.closeAppellantForm();
        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName
            } 
            
            const appellantNames = [];
            const form12Data = this.form12Info;
            form12Data.appellantsInfo[index].organization = newParty.organization;
            form12Data.appellantsInfo[index].name = newParty.name; 
            form12Data.appellantsInfo[index].firstName = newParty.firstName;
            form12Data.appellantsInfo[index].lastName = newParty.lastName;

            for (const appellant of form12Data.appellantsInfo){
                appellantNames.push(appellant.name);                
            }
            form12Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm12Info(form12Data);  
            this.closeAppellantForm();
        }
        this.updated ++;
        
    }

    public removeAppellant(data){   
        const form12Data = this.form12Info;       
        form12Data.appellantsInfo.splice(data.index,1);
        const appellantNames = [];
        for (const appellant of form12Data.appellantsInfo){
            appellantNames.push(appellant.name);                
        }
        form12Data.appellantNames = appellantNames.join(', '); 
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public closeAppellantForm() {                     
        this.AddNewAppellantForm= false; 
        this.addAppellantFormColor = 'court'
        if(this.isEditAppellantOpen){
            this.latestEditAppellantData.toggleDetails();
            this.isEditAppellantOpen = false;
        } 
    }

        public addNewJudgeNames(){
        if(this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger'
        }else{
            this.AddNewJudgeNamesForm = true;            
        }
    }

    public editJudgeNames(data) {
        console.log(data)
        if(this.AddNewJudgeNamesForm || this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger';                     
        }else if(!this.isEditJudgeNamesOpen && !data.detailsShowing){
            console.log(data);
            data.toggleDetails();
            this.isEditJudgeNamesOpen = true;
            this.latestEditJudgeNamesData = data;            
        }   
    }

    public modifyJudgeNames(isCreateJudgeNames: boolean, newJudgeName: string, index: number){        

        if (isCreateJudgeNames){
            
            const form12Data = this.form12Info;
            form12Data.judgeNames.push(newJudgeName)
            
            this.UpdateForm12Info(form12Data)

            this.closeJudgeNamesForm();

        } else { 
            
            const form12Data = this.form12Info;            
            form12Data.judgeNames[index] = newJudgeName;
           
            this.UpdateForm12Info(form12Data);
                      
            this.closeJudgeNamesForm();
        }
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

}
</script>

<style scoped lang="scss">

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
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