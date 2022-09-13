<template>
    <b-card no-body v-if="dataReady" class="border-white bg-white">
        <b-card class="border-white bg-white"> 
            <b-card class="bg-light border-0">
                <h2 class="ml-4 mt-3 text-primary" >Style of Proceeding (Parties) in Case</h2>

                
                <b-row class="mt-4 ml-4" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3 ml-4" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>
            </b-card>    

            <b-row class="mt-4 mx-5 bg-info p-3" style="border-radius: 1rem;">
                <b-col cols="1">
                    <b-icon-question-circle-fill style="margin-top: 5rem;" class="ml-3" scale="4" variant="primary"/>
                </b-col>
                <b-col>
                    <div style="margin-bottom: 0.75rem;">
                        If your application is before a single judge in chambers check the 
                        <a 
                            target='_blank' 
                            href="https://www.bccourts.ca/court_of_appeal/hearing_list/lists/available%20chambers%20dates/Available%20Chambers%20Dates.pdf">
                            available chambers dates
                        </a>
                        on the court website and the timelines for bringing your application under the rules.
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        If your application is before the court or the registrar contact the appropriate 
                        scheduler before completing this form.
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        Communicate with the other party or parties to ensure they are available on the 
                        requested date. Chambers applications are to be no more than 30 minutes.
                    </div>
                
                </b-col>
            </b-row>

        </b-card>

        <b-card class="border-white bg-white">
            
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Are you self-represented?                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group
                        :class="state.selfRepresented==false?'border border-danger is-invalid w-50': ''"
                        style="max-width:75%"
                        @change="recheckStates()"                   
                        v-model="form4Info.selfRepresented"
                        :options="yesNoOptions"                
                    ></b-form-radio-group>
                </b-col>
            </b-row>  

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    This application is in the jurisdiction of:                                
                </b-col>
                <b-col :class="state.jurisdictionType==false?'border border-danger is-invalid ml-1 mt-2': 'ml-1 mt-2'">   

                    <b-form-radio-group
                        stacked                
                        style="width:100%"
                        @change="changeOrderList(false);recheckStates()" 
                        :state="state.jurisdictionType"                   
                        v-model="form4Info.jurisdictionType"                    
                        :options="jurisdictionTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row>
            
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of the party(ies) bringing the application:                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group                
                        stacked
                        style="width:100%" 
                        :state="state.applicantParties"
                        @change="updateOtherParties"                   
                        v-model="form4Info.applicantParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>
                    <b-row class="ml-1 text-danger" v-if="invalidApplicantParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>        

            <div v-if="!invalidApplicantParties && form4Info.applicantParties && form4Info.applicantParties.length > 0">
  
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Name(s) of the responding party(ies) to be served with the application:                                
                    </b-col>
                    <b-col class="ml-1 mt-2">   

                        <b-form-checkbox-group 
                            stacked
                            :key="updated"               
                            style="width:100%"
                            @change="recheckStates()" 
                            :state="state.respondentParties"                   
                            v-model="form4Info.respondentParties"                    
                            :options="otherPartyNames">
                        </b-form-checkbox-group>
                        
                    </b-col>
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Location where the application will be heard:                                
                    </b-col>
                    <b-col class="ml-1 mt-2">  
                        <b-form-select 
                            :state="state.hearingLocation"               
                            style="width:100%"              
                            v-model="hearingLocation" 
                            @change="update"                   
                            :options="hearingLocationList">
                        </b-form-select>
                        <b-row v-if="hearingLocation == 'Other'">
                            <span class="mt-3 ml-3">Specify:</span>
                            <b-form-select                        
                                style="width:70%; float: right;"
                                :state="state.hearingLocationOther"
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
                        Date the application will be heard:
                        <b-icon-question-circle-fill 
                            class="text-primary"
                            v-b-tooltip.hover.noninteractive
                            scale="1.1"
                            title="Chamber applications begin at 9:30AM"/>
                    </b-col>
                    <b-col>                   
                        <b-card                        
                            :class="state.hearingDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'"
                            style="padding: 0; float: center;">
                            <div class="vuetify">
                                <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                    <v-date-picker
                                        v-model="form4Info.hearingDate"
                                        @change="recheckStates()"                           
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
                        Estimated duration of application:
                        <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="It will be between 5-30 minutes."/>                                    
                    </b-col>
                    <b-col class="ml-1 mt-2">
                        <b-form-input         
                            v-model="form4Info.estimatedDuration" 
                            :state = "state.estimatedDuration"
                            @change="recheckStates()"                           
                            size="md"
                            type="text"
                            autocomplete="off"
                            @paste.prevent                            
                        ></b-form-input>                        
                    </b-col>
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Enter the section(s) or rule(s) that you are relying on for your application    
                        <p class="content text-primary">
                            <i>E.g.,</i> If you are applying for leave to appeal, enter 
                        “Section 31 of the Court of Appeal Act”. If you are applying 
                        for a stay of proceedings, enter “Section 33 of the Court 
                        of Appeal Act”. 
                        </p>                             
                    </b-col>
                    <b-col class="ml-1 mt-2">                   
                        <b-form-textarea  
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"                                                           
                            v-model="form4Info.relyingSectionRule"
                            :state ="state.relyingSectionRule">
                        </b-form-textarea> 

                    </b-col>                
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Select the order(s) that you are seeking                                
                    </b-col>
                    <b-col class="ml-1 mt-2">

                        <b-form-checkbox-group
                            style="width:100%" 
                            stacked
                            @change="updateSeekingOrder"
                            v-model="form4Info.orderList"
                            :state ="state.orderList"                   
                            :options="orderList">
                        </b-form-checkbox-group>
                        
                        <span
                            v-if="(state.orderList != null)" 
                            style="font-size: 0.75rem;" 
                            class="bg-white text-danger"><b-icon-exclamation-circle/>
                            Specify the order(s) you are seeking.
                        </span>                   
                    </b-col>                               
                </b-row>

                <b-row class="mt-4 question" v-if="form4Info.orderList && form4Info.orderList.length > 0" :key="updated + 1">
                    <b-col cols="7" class="labels">
                        Enter details on each order you are seeking                                                    
                    </b-col>
                    <b-col class="mt-2">
                        <div 
                            v-for="(order,index) in form4Info.seekingOrder" 
                            :key="'order' +index"                       
                            :value="order"> {{form4Info.seekingOrder[index].name}}                  
                            <b-form-textarea                
                                style="width:100%" 
                                rows="6"
                                @change="recheckStates()"                                                                                       
                                v-model="form4Info.seekingOrder[index].details">
                            </b-form-textarea>      
                        </div> 
                        <span
                            v-if="(state.seekingOrder != null)" 
                            style="font-size: 0.75rem;" 
                            class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                            Specify the details of the order(s) you are seeking.
                        </span>             
                    </b-col>                
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Is an application book required?   
                        <p class="content text-primary">
                            See Rule 13 for leave applications
                            and Division 2 of Part 9 of the Rules
                            for other applications.
                        </p>                               
                    </b-col>
                    <b-col class="ml-1 mt-2">   

                        <b-form-radio-group
                            :class="state.bookRequired==false?'border border-danger is-invalid w-50':''"
                            :state="state.bookRequired"
                            @change="recheckStates()"                 
                            v-model="form4Info.bookRequired"
                            :options="yesNoOptions"                
                        ></b-form-radio-group>

                    </b-col>
                </b-row>   

                <b-card v-if="form4Info.bookRequired == false" class="mb-4 bg-white border-white text-dark"> 
                    <b-card no-body :class="state.affidavitList !=null?'border-danger is-invalid':'border-white'">
                        <b-row class="mb-2 ml-1" style="margin-left: -0.25rem !important;">   
                            <b-col cols="10" >
                                <b-form-group
                                    class="labels"                
                                    label="List the affidavit(s) in support of this application:" 
                                    label-for="affidavits">
                                    <span 
                                        v-if="form4Info.affidavitList && form4Info.affidavitList.length == 0 && !AddNewAffidavitForm" 
                                        id="affidavits" 
                                        class="text-muted ml-2 my-2">No affidavits have been listed.
                                    </span>
                                    <b-table
                                        v-else-if="form4Info.affidavitList && form4Info.affidavitList.length > 0"
                                        :key="updated"                                
                                        id="affidavits"
                                        :items="form4Info.affidavitList"
                                        :fields="affidavitFields"
                                        head-row-variant="primary"
                                        borderless    
                                        small                                            
                                        responsive="sm"
                                        >                                          
                                        <template v-slot:cell(date)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.date | beautify-date}}
                                            </span>                             
                                        </template>

                                        <template v-slot:cell(name)="data" >
                                            <span style="font-size: 16px;">
                                                {{data.item.name}}
                                            </span>
                                        </template>
                                        
                                        <template v-slot:cell(edit)="data" >   
                                            <div style="float: right;">                                                                     
                                                <b-button 
                                                    class="mr-2" 
                                                    size="sm" 
                                                    variant="transparent" 
                                                    @click="removeAffidavit(data)">
                                                    <b-icon 
                                                        icon="trash-fill" 
                                                        font-scale="1.25" 
                                                        variant="danger"/>
                                                </b-button>
                                                <b-button 
                                                    size="sm" 
                                                    variant="transparent" 
                                                    @click="editAffidavit(data)">
                                                    <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                                </b-button>
                                            </div>
                                        </template>

                                        <template v-slot:row-details="data">
                                            <b-card 
                                                body-class="m-0 px-0 py-1" 
                                                :border-variant="addAffidavitFormColor" 
                                                style="border:2px solid;">
                                                <add-affidavit-form 
                                                    :formData="data.item" 
                                                    :index="data.index" 
                                                    :isCreateAffidavit="false" 
                                                    v-on:submit="modifyAffidavitList" 
                                                    v-on:cancel="closeAffidavitForm" />
                                            </b-card>
                                        </template>
                                    </b-table> 
                                </b-form-group>
                            </b-col>  
                            <b-col>           
                                <b-button 
                                    style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%; float: right;"
                                    v-if="!AddNewAffidavitForm" 
                                    size="sm" 
                                    variant="court" 
                                    @click="addNewAffidavit"><b-icon icon="plus"/>Add Affidavit</b-button>
                            </b-col>
                        </b-row>
                    </b-card>           

                    <b-card 
                        v-if="AddNewAffidavitForm" 
                        id="addAffidavitForm" 
                        class="my-1 ml-4" 
                        :border-variant="addAffidavitFormColor" 
                        style="border:2px solid;" 
                        body-class="px-1 py-1">
                        <add-affidavit-form 
                            :formData="{}" 
                            :index="-1" 
                            :isCreateAffidavit="true" 
                            v-on:submit="modifyAffidavitList" 
                            v-on:cancel="closeAffidavitForm" />                
                    </b-card>
                </b-card>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        The applicant anticipates that this application will be:
                    </b-col>
                    <b-col class="ml-1 mt-2">
                        <b-form-radio-group
                            :class="state.applicationContested==false?'border border-danger is-invalid':''"
                            :state="state.applicationContested"
                            @change="recheckStates()"                 
                            v-model="form4Info.applicationContested"
                            :options="contestedOptions"                
                        ></b-form-radio-group>
                    </b-col>
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Do you consent to have documents served on you by email?
                    </b-col>
                    <b-col class="ml-1 mt-2">
                        <b-form-radio-group
                            :class="state.acknowledgeEmailService==false?'border border-danger is-invalid w-50':''"
                            :state="state.acknowledgeEmailService"
                            @change="recheckStates()"                 
                            v-model="form4Info.acknowledgeEmailService"
                            :options="yesNoOptions"                
                        ></b-form-radio-group>
                    </b-col>
                </b-row>               

                <b-card v-if="form4Info.acknowledgeEmailService" no-body class="border-white">

                    <b-row class="mt-4 question">
                        <b-col cols="7" class="labels">
                            Provide email addresses of the applicants for service
                        </b-col>
                        <b-col class="ml-1 mt-2">
                            <b-form-textarea
                                :state="state.emailAddresses"
                                @change="recheckStates()"                 
                                v-model="form4Info.emailAddresses"                                            
                            ></b-form-textarea>
                        </b-col>
                    </b-row>

                </b-card>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Name of lawyer or party authorizing filing of this Form: 
                    </b-col>
                    <b-col class="ml-1 mt-2">
                        <b-form-input                    
                            v-model="form4Info.authorizedName"
                            @change="recheckStates()"                        
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
            </div>

        </b-card>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import AddAffidavitForm from './AddAffidavitForm.vue';

import { affidavitInfoType, form4DataInfoType, orderInfoType } from '@/types/Information/Form4';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { hearingLocationsInfoType, locationsInfoType } from '@/types/Common';

@Component({
    components:{        
        AddAffidavitForm        
    }
})
export default class Form4StyleOfProceeding extends Vue {

    @commonState.State
    public locationsInfo!: locationsInfoType[]; 
    
    @commonState.State
    public hearingLocationsInfo!: hearingLocationsInfoType[];
    
    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form4State.State
    public form4Info: form4DataInfoType;

    @form4State.Action
    public UpdateForm4Info!: (newForm4Info: form4DataInfoType) => void  
    
    @form4State.State
    public currentNoticeOfApplicationId: string;

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    hearingLocationList: string[] = [];
    otherHearingLocationList: string[] = [];
    hearingLocation = "";
    otherHearingLocation = "";

    updated=0; 
    addAffidavitFormColor = 'court';
    AddNewAffidavitForm = false;
    latestEditAffidavitData;
    isEditAffidavitOpen = false;

    affidavitFields = [
        {
            key:'name',          
            label:'Name',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'date',          
            label:'Date',   
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
    
    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    contestedOptions = [
        {text: 'Contested', value: true},
        {text: 'Uncontested', value: false}
    ];

    orderList = []

    orderListJudge = [
        'adjournment',
        'to consolidate or have appeals heard together',
        'directions',
        'dismissal of appeal in chambers',
        'dismissal (other)',
        'extend time to file books or documents',
        'extend time to appeal or cross-appeal',
        'intervener status',
        'leave to appeal',
        'payment of security',
        'reinstate appeal that is dismissed as abandoned',
        'remove appeal from the inactive list',          
        'stay of proceedings or execution',    
        'varying or cancelling an order of the registrar',
        'other'
    ];

    orderListRegistrar = [        
        'assessment',
        'settle order',
        'settle order and assessment',
        'settle contents of books',    
        'extend time to file books or documents',
        'extend time to appeal or cross-appeal',   
        'other'
    ];

    orderListCourt = [
        'adjournment',
        'adducing fresh or new evidence',
        'to consolidate or have appeals heard together',
        'directions',        
        'dismissal (other)',        
        'quashing an appeal or raising a preliminary objection',        
        'other'
    ];

    jurisdictionTypeOptions = [ 'The Court (3 Judges)', 'A Chambers Judge', 'The Registrar' ];

    state = {
        applicantParties:null,            
        respondentParties: null,  
        jurisdictionType: null,  
        hearingLocation: null,
        hearingLocationOther: null, 
        hearingDate: null, 
        estimatedDuration: null,
        relyingSectionRule: null, 
        orderList: null,
        seekingOrder: null, 
        bookRequired: null, 
        affidavitList: null, 
        applicationContested: null, 
        acknowledgeEmailService: null, 
        emailAddresses: null,     
        selfRepresented: null,         
        authorizedName:null
    }

    invalidApplicantParties = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.changeOrderList(true)             
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

        this.invalidApplicantParties = false;

        if(this.currentNoticeOfApplicationId){
            this.getForm4Data();
           
        } else {   
            
            const form4Data = {} as form4DataInfoType;

            let applicantNames = [];
            let respondentNames = [];

            form4Data.appellants = this.partiesJson.appellants
            form4Data.respondents = this.partiesJson.respondents;

            for (const respondent of form4Data.respondents){
                respondentNames.push(respondent.name);                
            }

            for (const applicant of form4Data.appellants){
                applicantNames.push(applicant.name);                
            }

            form4Data.appellantNames = applicantNames.join(', ');
            form4Data.respondentNames = respondentNames.join(', ');

            form4Data.formSevenNumber = this.fileNumber;
            
            form4Data.version = this.$store.state.Application.version;  
            form4Data.selfRepresented = this.$store.state.Common.userSelfRepresented;
            form4Data.affidavitList = [];   
            form4Data.orderList = []; 
            form4Data.seekingOrder = [];         
           
            this.UpdateForm4Info(form4Data);                       
            this.saveForm(true);
        }

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form4Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form4Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.updateOtherParties();
        this.dataReady = true;
    }

    public update(){ 
              
        const form4 = this.form4Info;
       
        form4.hearingLocation = {} as hearingLocationsInfoType;
       
        if (this.hearingLocation == 'Other' && this.otherHearingLocation.length > 0){
            form4.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.otherHearingLocation)[0]
        } else if (this.hearingLocation != 'Other') {
            form4.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.hearingLocation)[0]
        }  
        
        this.UpdateForm4Info(form4);
        this.recheckStates();
    }

    public getForm4Data() {        
       
        this.$http.get('/form4/forms/'+this.currentNoticeOfApplicationId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form4Data = response.data.data                
                this.UpdateForm4Info(form4Data);
                if (form4Data.hearingLocation?.name){

                    if (this.hearingLocationList.includes(form4Data.hearingLocation.name)){
                        this.hearingLocation = form4Data.hearingLocation.name;
                        this.otherHearingLocation = '';            
                    } else {
                        this.hearingLocation = 'Other';
                        this.otherHearingLocation = form4Data.hearingLocation.name;            
                    }
                    
                } else {
                    this.hearingLocation = '';
                    this.otherHearingLocation = '';
                } 

                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

     public clearStates(){
        this.state = {            
            applicantParties:null,            
            respondentParties: null,  
            jurisdictionType: null,  
            hearingLocation: null,
            hearingLocationOther: null, 
            hearingDate: null, 
            estimatedDuration: null,
            relyingSectionRule: null, 
            orderList: null,
            seekingOrder: null, 
            bookRequired: null, 
            affidavitList: null, 
            applicationContested: null, 
            acknowledgeEmailService: null, 
            emailAddresses: null,     
            selfRepresented: null,         
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public recheckStates(){
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                this.checkStates()
                return 
            }
        }
    }

    public checkStates(){   
        
        
        this.state.applicantParties = this.form4Info.applicantParties?.length>0? null :false;
        this.state.respondentParties = this.form4Info.respondentParties?.length>0? null :false;
        this.state.jurisdictionType = !this.form4Info.jurisdictionType? false : null;

        this.state.hearingLocation = !this.form4Info.hearingLocation? false : null;
        this.state.hearingLocationOther = this.hearingLocation=='Other' && !this.otherHearingLocation ?false : null;
        this.state.hearingDate = this.form4Info.hearingDate && this.allowedDates(this.form4Info.hearingDate)? null: false; 
        this.state.estimatedDuration = !this.form4Info.estimatedDuration? false : null;         
        this.state.relyingSectionRule = !this.form4Info.relyingSectionRule? false :null;  
          
        this.state.orderList = this.form4Info.orderList?.length>0 ? null: false  
        this.state.seekingOrder = !(this.form4Info.seekingOrder && this.verifyOrders()
                                    && this.form4Info.seekingOrder.length == this.form4Info.orderList?.length)? false : null;       
      
        this.state.bookRequired = this.form4Info.bookRequired==null? false :null
        const affidavitRequired = this.form4Info.bookRequired ==false; 
        this.state.affidavitList = (affidavitRequired && this.form4Info.affidavitList?.length == 0)? false :null 
        this.state.applicationContested = this.form4Info.applicationContested==null? false :null 
        this.state.acknowledgeEmailService = this.form4Info.acknowledgeEmailService==null? false :null
        const emailRequired = this.form4Info.acknowledgeEmailService
        this.state.emailAddresses= (emailRequired && !this.form4Info.emailAddresses)? false :null    
        this.state.selfRepresented = this.form4Info.selfRepresented==null? false :null
        
        this.state.authorizedName = !this.form4Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true            
    }   
    
    public verifyOrders(){
        for(const order of this.form4Info.seekingOrder){            
            if(order.details?.trim()?.length == 0)
                return false;
        }
        return true;
    }

    public extractOrderDetails(){
        const orders = [];
        for(const order of this.form4Info.seekingOrder){            
            if(order.details?.trim()?.length != 0){
                orders.push(order.name + ': ' + order.details.trim());
            }  
        }
        return orders.join('<br>');        
    }

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form4/forms';

        if (this.currentNoticeOfApplicationId){
            method = 'put';
            url = '/form4/forms/'+this.currentNoticeOfApplicationId;               

            if (!draft && !this.checkStates()){               
                return                
            } 

            const form4Data = this.form4Info;
            form4Data.orderDetails = this.extractOrderDetails();
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form4Info,
                    type:'Form4',
                    description:'Notice of Application'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form4Info,
                    type:'Form4',
                    description:'Notice of Application'
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
                        this.UpdateCurrentNoticeOfApplicationId(response.data.file_id);
                        this.extractPartiesData();                        
                    }
                    const data = this.form4Info;
                    this.UpdateForm4Info(data)
                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }
    
    public updateOtherParties(){

        const otherParties = [];

        if (this.partyNames.length == this.form4Info.applicantParties?.length){

            this.invalidApplicantParties = true;

        } else {

            this.invalidApplicantParties = false;

            for (const partyName of this.partyNames){
                const index = this.form4Info.applicantParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        } 
        this.recheckStates();
    }

    public addNewAffidavit(){
        this.state.affidavitList= null
        if(this.isEditAffidavitOpen){            
            this.addAffidavitFormColor = 'danger'
        }else{
            this.AddNewAffidavitForm = true;            
        }
    }

    public editAffidavit(data) {
        if(this.AddNewAffidavitForm || this.isEditAffidavitOpen){            
            this.addAffidavitFormColor = 'danger';                     
        }else if(!this.isEditAffidavitOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditAffidavitOpen = true;
            this.latestEditAffidavitData = data            
        }   
    }

    public modifyAffidavitList(isCreateAffidavit: boolean, newAffidavit: affidavitInfoType, index: number){        

        if (isCreateAffidavit){
            
            const form4Data = this.form4Info;
            form4Data.affidavitList.push(newAffidavit)
            
            this.UpdateForm4Info(form4Data)

            this.closeAffidavitForm();

        } else { 
            
            const form4Data = this.form4Info;
            form4Data.affidavitList[index].date = newAffidavit.date;
            form4Data.affidavitList[index].name = newAffidavit.name;
           
            this.UpdateForm4Info(form4Data);
                      
            this.closeAffidavitForm();
        }
        this.updated ++;
    }

    public removeAffidavit(data){ 
        const form4Data = this.form4Info;       
        form4Data.affidavitList.splice(data.index,1);
        
        this.UpdateForm4Info(form4Data);
        this.updated ++;        
    }

    public closeAffidavitForm() {                     
        this.AddNewAffidavitForm= false; 
        this.addAffidavitFormColor = 'court'
        if(this.isEditAffidavitOpen){
            this.latestEditAffidavitData.toggleDetails();
            this.isEditAffidavitOpen = false;
        } 
    }

    public changeOrderList(mounted){
        if(!mounted) this.form4Info.orderList=[]
        if(this.form4Info.jurisdictionType == 'The Registrar')
            this.orderList = this.orderListRegistrar
        else if(this.form4Info.jurisdictionType == 'A Chambers Judge')
            this.orderList = this.orderListJudge
        else
            this.orderList = this.orderListCourt 
    }

    public updateSeekingOrder(){
        
        const formData = this.form4Info;
        const orderData = Array.isArray(formData.seekingOrder)? formData.seekingOrder: [];
        const orders: orderInfoType[] = []; 

        for (const orderName of this.form4Info.orderList){
           
            const matchingOrderRecords = orderData.filter(order => order.name == orderName);

            if (matchingOrderRecords.length == 0){
                orders.push({name: orderName, details: ''});
            } else {                
                const index = orderData.findIndex(order => order.name == matchingOrderRecords[0].name);               
                orders.push(orderData[index]);
            }            
        }

        formData.seekingOrder = orders;
        
        this.UpdateForm4Info(formData)
        this.recheckStates();
        this.updated ++;               

    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date >= day);           
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form4"}) 
    }

}
</script>


<style scoped lang="scss">

    :deep(.vuetify){
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
        margin-left: 1.15rem !important;
    }

</style>