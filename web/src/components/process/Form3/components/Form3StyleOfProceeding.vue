<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">                 

        <b-card v-if="form3Info.requiresManualEntry" class="mb-4 bg-white border-white text-dark"> 
            <b-card no-body class="border-white">
                <b-row class="mb-2">   
                    <b-col cols="10" :class="state.appellants !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="Appellants:" 
                            label-for="appellants">
                            <span 
                                v-if="form3Info.manualAppellants.length == 0 && !AddNewAppellantForm" 
                                id="appellants" 
                                class="text-muted ml-2 my-2">No appellants have been assigned.
                            </span>
                            <b-table
                                v-else-if="form3Info.manualAppellants.length > 0"
                                                                
                                id="appellants"
                                :items="form3Info.manualAppellants"
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
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
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
                    <b-col cols="10" :class="state.respondents !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="Respondents:" 
                            label-for="respondents">
                            <span 
                                v-if="form3Info.manualRespondents.length == 0 && !AddNewRespondentForm" 
                                id="respondents" 
                                class="text-muted ml-2 my-2">No respondents have been assigned.
                            </span>
                            <b-table
                                v-else-if="form3Info.manualRespondents.length > 0"                                                                
                                id="respondents"
                                :items="form3Info.manualRespondents"
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
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
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

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels ml-n4">
                    What is the court of appeal Number?
                    <span 
                        style="font-size: 9pt;" 
                        class="text-secondary ml-1">(ex. CA12345)
                    </span>
                </b-col>
                <b-col>
                    <b-form-input                
                        style="width:100%"
                        @change="recheckStates()"                        
                        :state="state.formSevenNumber"                                                           
                        v-model="form3Info.formSevenNumber">
                    </b-form-input>
                </b-col>
            </b-row>         
        </b-card>
        
        <div v-if="partyDataExists()">
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>
                
                <b-row class="mt-4" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form3Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form3Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>
            </b-card>  

            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    <p>Is Leave to Cross Appeal Required?</p>
                    <p style="font-size: 0.75rem; margin-top:-1rem;">
                        (Court of Appeal Rule 12 explains when you need leave to cross appeal, if unsure check "yes")
                    </p>
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        :class="state.crossAppealRequired==false?'border border-danger is-invalid w-50':''"                                          
                        v-model="form3Info.crossAppealRequired"
                        @change="recheckStates()" 
                        :options="yesNoOptions">
                    </b-form-radio-group>
                </b-col>
            </b-row>    

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    <p>Are you amending a Notice of Cross Appeal that has been filed?</p>
                    <p style="font-size: 0.75rem; margin-top:-1rem;">
                        Pursuant to 
                        <a 
                            target="_blank"
                            href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section82">
                            Rule 82 of the Court of Appeal Rules
                        </a> 
                        you may amend a notice of cross appeal form without permission 
                        of the court or a justice in certain circumstances. 
                        Please ensure that you review the rule for those circumstances.
                    </p>
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        :class="state.amending==false?'border border-danger is-invalid w-50':''"
                        :state="state.amending" 
                        @change="recheckStates()"                                        
                        v-model="form3Info.amending"
                        :options="yesNoOptions">
                    </b-form-radio-group>
                    <span
                        v-if="(state.amending != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether you are amending a Notice of Cross Appeal that has been filed.
                    </span>
                </b-col>
            </b-row>  

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the Order?
                </b-col>
                <b-col>
                    <b-form-input                
                        style="width:100%"
                        @change="recheckStates()"                        
                        :state="state.judgeName"                                                           
                        v-model="form3Info.judgeName">
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Date the order under appeal was pronounced:
                </b-col>
                <b-col>                   
                    <b-card                 
                        :class="state.orderDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'"
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    @change="updateOrderDate"
                                    v-model="orderDateValue"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>
                    <span 
                        style="display: inline-block; font-size: 0.75rem;" 
                        class="text-orange"
                        :key="updateOrderDetails"
                        v-if="isPastDeadline">You may need to apply to extend the time to cross appeal.</span>
                </b-col>
            </b-row>    

            <div v-if="form3Info.crossAppealRequired">

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Part of the Order being cross appealed 
                        <p class="content text-primary">
                            <b> Note: </b> If you are only seeking leave to cross appeal one part of an order, 
                            enter the part that you are seeking leave to cross appeal.                            
                        </p>                               
                    </b-col>
                    <b-col>                    
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"  
                            :state="state.partOfOrderLeaveCrossAppealed"                                                          
                            v-model="form3Info.partOfOrderLeaveCrossAppealed">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Enter the grounds for leave to cross appeal                                                    
                    </b-col>
                    <b-col>                   
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()" 
                            :state="state.groundsLeaveCrossAppeal"                                                           
                            v-model="form3Info.groundsLeaveCrossAppeal">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>

            </div> 
            <div v-else>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Part of the Order being cross appealed                                
                    </b-col>
                    <b-col>                    
                        <b-form-textarea                
                            style="width:100%"  
                            rows="6"
                            @change="recheckStates()" 
                            :state="state.partOfOrderCrossAppealed"                                                          
                            v-model="form3Info.partOfOrderCrossAppealed">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>
                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Order you are seeking on cross appeal                                                    
                    </b-col>
                    <b-col>                   
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()" 
                            :state="state.seekingOrder"                                                           
                            v-model="form3Info.seekingOrder">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>

            </div> 

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of the Party(ies) who wish to cross appeal the order under appeal:                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked               
                        style="width:100%" 
                        @change="updateAddressFields"
                        :state="state.crossAppealingParties"                                      
                        v-model="form3Info.crossAppealingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                </b-col>
            </b-row> 
        
            <b-row class="mt-5 question" v-if="!form3Info.requiresManualEntry">
                <b-col cols="7" class="labels">
                    Are you self-represented?                                
                </b-col>
                <b-col class="ml-1">   

                    <b-form-radio-group
                        :class="state.selfRepresenting==false?'border border-danger is-invalid w-50':''"
                        style="max-width:75%"
                        @change="recheckStates()"                   
                        v-model="form3Info.selfRepresenting"
                        :options="yesNoOptions"                
                    ></b-form-radio-group>                    
                    
                </b-col>
            </b-row> 
        
           

            <b-row v-if="form3Info.crossAppealingParties.length > 0" class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name(s) and address(es) within BC for service of the party(ies) filing cross appeal.    
                    <p class="content text-primary">
                        <b>Note:</b> If you have a lawyer, include the law firms' address; otherwise provide your own residential address
                        <br/>It must be a residential address or business address in British Columbia, 
                        other than a post office box.
                    </p>
                    <div class="text-warning mt-3" v-if="state.nonBcAddress == true">
                        Pursuant to Rule 80(3) -  a party who wishes to apply for permission under subrule (1) (c) 
                        to use a residential address or business address for service outside of British Columbia
                        must submit a written request to the registrar.
                    </div>                                                
                </b-col>
                <b-col>  
                    <div 
                        v-for="(address,index) in form3Info.addresses" 
                        :key="'address' +index"                       
                        :value="address"> {{form3Info.addresses[index].name}}                  
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"                                                                                       
                            v-model="form3Info.addresses[index].contactInfo">
                        </b-form-textarea>      
                    </div> 
                    <span
                        v-if="(state.addresses != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Specify the addresses of the party(ies) filing cross appeal.<br/>
                        Please note that the email address is not mandatory but rather as per the 
                        wording of the rule must either have an address or an email address for service.  
                        It is okay if they put both.
                    </span>                  
                </b-col>                
            </b-row>
          
            <b-row v-if="form3Info.crossAppealingParties.length > 0" class="mt-5 question">
                <b-col cols="7" class="labels">
                    Phone number(s) of party(ies) filing cross appeal                                
                </b-col>
                <b-col>                    
                    <div 
                        v-for="(phone,index) in form3Info.phoneNumbers" 
                        :key="'phone' + index"                        
                        :value="phone"> {{form3Info.phoneNumbers[index].name}}                  
                        <b-form-input                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"                                                                                       
                            v-model="form3Info.phoneNumbers[index].contactInfo">
                        </b-form-input>      
                    </div>
                    <span
                        v-if="(state.phoneNumbers != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Specify the phone numbers of the party(ies) filing the Cross Appeal.
                        <br/> <i> e.g. 123-456-7890</i>
                    </span>                    
                </b-col>                
            </b-row>
            
            <b-row v-if="form3Info.crossAppealingParties.length > 0" class="mt-4 question">
                <b-col cols="7" class="labels">
                    Email address(es) for party(ies) providing service for cross appeal 
                    <p class="content text-primary">
                        <b> Note: </b> If you provide an email address, you consent to have documents served on you by email.
                    </p>                               
                </b-col>
                <b-col>                   
                    <div 
                        v-for="(email,index) in form3Info.emailAdresses" 
                        :key="'email' + index"                       
                        :value="email"> {{form3Info.emailAdresses[index].name}}                  
                        <b-form-input                
                            style="width:100%" 
                            rows="6"                                                                                       
                            v-model="form3Info.emailAdresses[index].contactInfo">
                        </b-form-input>      
                    </div> 
                    <div
                        v-if="state.email==false"
                        style="font-size: 0.75rem; margin-top:0rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Invalid Email Address. <i>(If you provide an email address, It must be valid.)</i>
                    </div>                 
                </b-col>                
            </b-row>              

            <b-row class="my-3 question" style="padding: 0;">
                <b-col cols="7" class="labels">
                    Name of lawyer or party authorizing filing of this Form:                                
                </b-col>
                <b-col>
                    <b-form-input 
                        @change="recheckStates()"                   
                        v-model="form3Info.authorizedName"                        
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
        
        <b-modal size="lg" no-close-on-backdrop v-model="showNoneBcAlert" header-class="bg-warning text-light">            
			<template v-slot:modal-title>
                <h2 class="mb-0 text-light">Service outside of British Columbia</h2>                    
            </template>
            <div>
                <b>Pursuant to Rule 80(3)</b> -  a party who wishes to apply for permission under subrule (1) (c) 
                to use a residential address or business address for service outside of British Columbia
                must submit a written request to the registrar.
            </div>			
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="confirmNavigateToPreviewPage()">OK</b-button>                
            </template>
        </b-modal>
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import { form3DataInfoType, partyInfoType } from '@/types/Information/Form3';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import AddPartyForm from './AddPartyForm.vue';
import { partiesContact } from '@/types/Information';

@Component({
    components:{        
        AddPartyForm        
    }
})
export default class Form3StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]

    @informationState.State
    public fileNumber: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    @form3State.Action
    public UpdateForm3Info!: (newForm3Info: form3DataInfoType) => void  
    
    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void
    
    dataReady = false;
    updated=0; 
    updateOrderDetails = 0;
    orderDateValue = '';
    
    showNoneBcAlert=false

    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;
    latestEditRespondentData;
    isEditRespondentOpen = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;
    latestEditAppellantData;
    isEditAppellantOpen = false;
    
    yesNoOptions = [
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

    state = { 
        appellants: null,
        respondents: null,
        formSevenNumber: null,
        orderDate: null,
        judgeName: null,
        crossAppealRequired:null,
        amending: null,
        crossAppealingParties:null,
        partOfOrderCrossAppealed:null,
        seekingOrder:null,
        partOfOrderLeaveCrossAppealed:null,
        groundsLeaveCrossAppeal:null,       
        phoneNumbers:null,        
        addresses:null,               
        authorizedName:null, 
        selfRepresenting: null,
        email:null,
        nonBcAddress: null
    }

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }

    public partyDataExists(){

        const existsManual = this.form3Info.requiresManualEntry && 
            this.form3Info.manualAppellants.length>0 && 
            this.form3Info.manualRespondents.length>0;

        const existsSupreme = !this.form3Info.requiresManualEntry && 
            this.form3Info.appellants.length>0 && 
            this.form3Info.respondents.length>0;
            
        return existsManual || existsSupreme;
    }

    public updateOrderDate(){       
        this.form3Info.orderDate = this.orderDateValue;
        this.recheckStates()
        this.updateOrderDetails ++;
    }

    public extractInfo(){       

        if(this.currentNoticeOfCrossAppealId){
            this.getForm3Data();
           
        } else { 

            const form3Data = this.form3Info;
            form3Data.crossAppealRequired = true;
            form3Data.version = this.$store.state.Application.version;
            form3Data.manualRespondents = [];
            form3Data.manualAppellants = [];
            form3Data.crossAppealingParties = [];
            form3Data.addresses = [];
            form3Data.emailAdresses = [];
            form3Data.phoneNumbers = [];

            if (this.form3Info?.requiresManualEntry){
                
                form3Data.appellants = [];
                form3Data.respondents = [];
                form3Data.appellantNames = '';
                form3Data.respondentNames = '';
                form3Data.formSevenNumber = ''; 
                form3Data.judgeName = '' 
                form3Data.orderDate = '';

            } else {               

                let applicantNames = [];
                let respondentNames = [];               

                form3Data.appellants = this.partiesJson.appellants
                form3Data.respondents = this.partiesJson.respondents;

                for (const respondent of form3Data.respondents){
                    respondentNames.push(respondent.name);                
                }

                for (const applicant of form3Data.appellants){
                    applicantNames.push(applicant.name);                
                }

                form3Data.appellantNames = applicantNames.join(', ');
                form3Data.respondentNames = respondentNames.join(', ');      
                      
                form3Data.formSevenNumber = this.fileNumber;

                form3Data.judgeName = this.previousCourts[0]?.JudgeSalutation + ' ' + Vue.filter('getFullName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
                const orderDate = this.previousCourts[0]?.JudgmentDate?this.previousCourts[0].JudgmentDate.slice(0,10):'';
                form3Data.orderDate = orderDate;
                this.orderDateValue = orderDate;                
            }
            this.UpdateForm3Info(form3Data);
            
            this.saveForm(true);
        }            

    }

    get partyNames(){
        
        let partyNames: string[] = [];

        if (this.form3Info.requiresManualEntry){

            for (const respondent of this.form3Info.manualRespondents){
                partyNames.push(respondent.name) 
            }

            for (const applicant of this.form3Info.manualAppellants){
                partyNames.push(applicant.name);  
            }

        } else {

            for (const respondent of this.form3Info.respondents){
                partyNames.push(respondent.name) 
            }

            for (const applicant of this.form3Info.appellants){
                partyNames.push(applicant.name);  
            }
        }      
        return partyNames;
    }  

    get isPastDeadline(){

        const today = new Date();
        const orderDate = new Date(this.form3Info.orderDate);

        const TimePast = today.getTime() - orderDate.getTime();
        const daysPast = TimePast / (1000 * 3600 * 24);        
        
        return daysPast > 30;
    }

    public updateAddressFields(){

        const formData = this.form3Info;
        const addressData = formData.addresses;
        const addresses: partiesContact[] = []; 
        const emailData = formData.emailAdresses;
        const emails: partiesContact[] = []; 
        const phoneData = formData.phoneNumbers;
        const phoneNumbers: partiesContact[] = []; 

        for (const partyName of this.form3Info.crossAppealingParties){
           
            const matchingAddressRecords = addressData.filter(address => address.name == partyName);

            if (matchingAddressRecords.length == 0){
                addresses.push({name: partyName, contactInfo: ''});
            } else {                
                const index = addressData.findIndex(address => address.name == matchingAddressRecords[0].name);               
                addresses.push(addressData[index]);
            }

            const matchingPhoneRecords = phoneData.filter(phone => phone.name == partyName); 
            
            if (matchingPhoneRecords.length == 0){
                phoneNumbers.push({name: partyName, contactInfo: ''});
            } else {                
                const index = phoneData.findIndex(phone => phone.name == matchingPhoneRecords[0].name);               
                phoneNumbers.push(phoneData[index]);
            }

            const matchingEmailRecords = emailData.filter(email => email.name == partyName); 
            
            if (matchingEmailRecords.length == 0){
                emails.push({name: partyName, contactInfo: ''});
            } else {                
                const index = emailData.findIndex(email => email.name == matchingEmailRecords[0].name);               
                emails.push(emailData[index]);
            }
        }

        formData.addresses = addresses;
        formData.emailAdresses = emails;
        formData.phoneNumbers = phoneNumbers;
        this.UpdateForm3Info(formData)
        this.recheckStates();
        this.updated ++;               
    }

    public getForm3Data() {        
       
        this.$http.get('/form3/forms/'+this.currentNoticeOfCrossAppealId)
        .then((response) => {
            if(response?.data?.data){
                const form3Data = response.data.data   
                this.orderDateValue = form3Data.orderDate? form3Data.orderDate.slice(0,10): '';             
                this.UpdateForm3Info(form3Data);
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            appellants: null,
            respondents: null,
            formSevenNumber: null,
            orderDate: null,
            judgeName: null,
            crossAppealRequired:null,
            amending: null,
            crossAppealingParties:null,
            partOfOrderCrossAppealed:null,
            seekingOrder:null,
            partOfOrderLeaveCrossAppealed:null,
            groundsLeaveCrossAppeal:null,       
            phoneNumbers:null,
            addresses:null,               
            authorizedName:null,
            selfRepresenting: null,
            email:null,
            nonBcAddress: null
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

        if(this.form3Info.requiresManualEntry){
            this.state.appellants = this.form3Info.manualAppellants?.length>0? null :false;
            this.state.respondents = this.form3Info.manualRespondents?.length>0? null :false;
        } else {
            this.state.appellants = null;
            this.state.respondents = null;
        }

        this.state.formSevenNumber = this.form3Info.formSevenNumber?.trim().length>0? null:false;
        this.state.orderDate = this.form3Info.orderDate? null:false;
        this.state.judgeName = this.form3Info.judgeName? null:false;        
        this.state.crossAppealRequired = this.form3Info.crossAppealRequired != null? null:false;
        this.state.amending = this.form3Info.amending != null? null:false;
        this.state.crossAppealingParties = this.form3Info.crossAppealingParties?.length>0? null :false;
        this.state.partOfOrderLeaveCrossAppealed = (this.form3Info.crossAppealRequired && !this.form3Info.partOfOrderLeaveCrossAppealed)? false: null;
        this.state.groundsLeaveCrossAppeal = (this.form3Info.crossAppealRequired && !this.form3Info.groundsLeaveCrossAppeal)? false: null;
        this.state.partOfOrderCrossAppealed = (!this.form3Info.crossAppealRequired && !this.form3Info.partOfOrderCrossAppealed)? false: null;
        this.state.seekingOrder = (!this.form3Info.crossAppealRequired && !this.form3Info.seekingOrder)? false: null;
        this.state.phoneNumbers = !(this.form3Info.phoneNumbers && this.verifyPhoneNumbers()
                                    && this.form3Info.phoneNumbers.length == this.form3Info.crossAppealingParties.length)? false : null;
         
        const verifiedAddresses = this.verifyAddresses()
        this.state.addresses = verifiedAddresses.valid;
        this.state.nonBcAddress = verifiedAddresses.nonBC;

        this.state.email = this.verifyEmails()? null: false;

        this.state.authorizedName = !this.form3Info.authorizedName? false : null;
        this.state.selfRepresenting = this.form3Info.selfRepresenting != null? null: false;

        for(const field of Object.keys(this.state)){            
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true            
    }   
    
    public verifyPhoneNumbers(){
        for(const phoneNumber of this.form3Info.phoneNumbers){            
            if(!Vue.filter('verifyPhone')(phoneNumber.contactInfo))            
                return false;
        }
        return true;
    }

    public verifyEmails(){
        for(const email of this.form3Info.emailAdresses){
            if(email.contactInfo && !Vue.filter('verifyEmail')(email.contactInfo))
                return false
        }
        return true
    }

    public verifyAddresses(){
        let nonBC = null
        for(const index in this.form3Info.addresses){ 
            const address = this.form3Info.addresses[index]
            const verifiedAddress = Vue.filter('verifyAddress')(address.contactInfo)
            
            if(verifiedAddress=='EMPTY' && (!this.form3Info.emailAdresses[index].contactInfo || !Vue.filter('verifyEmail')(this.form3Info.emailAdresses[index].contactInfo)))                  
                return {valid:false, nonBC:null};
            if(verifiedAddress=='ERR')
                return {valid:false, nonBC:null};
            if(verifiedAddress=='NONE_BC') nonBC = true
        }
        return {valid:null, nonBC:nonBC};
    }

    public extractAddresses(){
        const addresses = [];
        for(const contactAddress of this.form3Info.addresses){            
            if(contactAddress.contactInfo.trim().length != 0){
                addresses.push(contactAddress.name + ': ' + contactAddress.contactInfo.trim());
            }  
        }
        return addresses.join('<br>');        
    }

    public extractPhoneNumbers(){
        const phoneNumbers = [];
        for(const phone of this.form3Info.phoneNumbers){            
            if(phone.contactInfo.trim().length != 0){
                phoneNumbers.push(phone.name + ': ' + phone.contactInfo.trim());
            }  
        }
        return phoneNumbers.join('<br>');        
    }

    public extractEmails(){
        const emails = [];
        for(const email of this.form3Info.emailAdresses){            
            if(email.contactInfo.trim().length != 0){
                emails.push(email.name + ': ' + email.contactInfo.trim());
            }  
        }
        return emails.join('<br>');        
    }


    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form3/forms';

        if (this.currentNoticeOfCrossAppealId){
            method = 'put';
            url = '/form3/forms/'+this.currentNoticeOfCrossAppealId;
            const form3Data = this.form3Info;
            form3Data.contactAddress = this.extractAddresses();
            form3Data.emails = this.extractEmails();
            form3Data.phones = this.extractPhoneNumbers();
            this.UpdateForm3Info(form3Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Cross Appeal'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Cross Appeal'
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
                        this.UpdateCurrentNoticeOfCrossAppealId(response.data.file_id); 
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
            const form3Data = this.form3Info;
            form3Data.manualRespondents.push(newParty)

            for (const respondent of form3Data.manualRespondents){
                respondentNames.push(respondent.name);                
            }
            form3Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm3Info(form3Data)

            this.closeRespondentForm();

        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName;
            }  
            
            const respondentNames = [];
            const form3Data = this.form3Info;
            form3Data.manualRespondents[index].organization = newParty.organization;
            form3Data.manualRespondents[index].name = newParty.name; 
            form3Data.manualRespondents[index].firstName = newParty.firstName;
            form3Data.manualRespondents[index].lastName = newParty.lastName;

            for (const respondent of form3Data.manualRespondents){
                respondentNames.push(respondent.name);                
            }
            form3Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm3Info(form3Data);
                      
            this.closeRespondentForm();
        }
        this.updated ++;
    }

    public removeRespondent(data){ 
        const form3Data = this.form3Info;       
        form3Data.manualRespondents.splice(data.index,1);
        const respondentNames = [];
        for (const respondent of form3Data.manualRespondents){
            respondentNames.push(respondent.name);                
        }
        form3Data.respondentNames = respondentNames.join(', '); 
        this.UpdateForm3Info(form3Data);
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

            const appellantNames = []
            const form3Data = this.form3Info;
            form3Data.manualAppellants.push(newParty)

            for (const appellant of form3Data.manualAppellants){
                appellantNames.push(appellant.name);                
            }
            form3Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm3Info(form3Data);

            this.closeAppellantForm();
        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName
            } 
            
            const appellantNames = [];
            const form3Data = this.form3Info;
            form3Data.manualAppellants[index].organization = newParty.organization;
            form3Data.manualAppellants[index].name = newParty.name; 
            form3Data.manualAppellants[index].firstName = newParty.firstName;
            form3Data.manualAppellants[index].lastName = newParty.lastName;

            for (const appellant of form3Data.manualAppellants){
                appellantNames.push(appellant.name);                
            }
            form3Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm3Info(form3Data);  
            this.closeAppellantForm();
        }
        this.updated ++;
        
    }

    public removeAppellant(data){   
        const form3Data = this.form3Info;       
        form3Data.manualAppellants.splice(data.index,1);
        const appellantNames = [];
        for (const appellant of form3Data.manualAppellants){
            appellantNames.push(appellant.name);                
        }
        form3Data.appellantNames = appellantNames.join(', '); 
        this.UpdateForm3Info(form3Data);
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

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date <= day);           
    }
   
    public navigateToPreviewPage() {          
        if (this.checkStates()){
            if(this.state.nonBcAddress)
               this.showNoneBcAlert=true
            else
                this.$router.push({name: "preview-form3"});
        }        
    }

    public confirmNavigateToPreviewPage(){
        this.showNoneBcAlert=false
        this.$router.push({name: "preview-form3"});
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
        font-style: italic;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 0.75rem !important;
    }

</style>