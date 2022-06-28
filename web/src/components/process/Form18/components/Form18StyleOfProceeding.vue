<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        
        <b-card class="bg-light border-0">
            <p style="font-size: 1.25rem;font-weight: 700;">Style of Proceeding (Parties) in Case</p>
            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>
        </b-card>
        
<!-- <Appellant/Respondent> -->
        <b-row style="margin-top:4rem;">
            <b-col cols="6" style="font-weight: 700;">First Appellant:
                
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                <b-form-select                            
                    class="mt-2"
                    @change="recheckStates()"                        
                    :state="state.firstAppellant"                   
                    v-model="form18Info.firstAppellant"                    
                    :options="applicantNames">
                </b-form-select>
                
            </b-col>

            <b-col cols="6" style="font-weight: 700;">First Respondent:
                
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="Name of the first respondent named on Form 1: Notice of Appeal."/>
                <b-form-select 
                    class="mt-2"
                    @change="recheckStates()"             
                    :state="state.firstRespondent"                   
                    v-model="form18Info.firstRespondent"                    
                    :options="respondentNames">
                </b-form-select>
                
            </b-col>
        </b-row>

<!-- <Asking for Changing Representation> -->
        <b-row class="mt-5">
            <b-col cols="6" style="font-weight: 700;">
                Are you changing your representation?
                <div class="text-info"
                    style="display: block; font-size: 0.75rem;"><b>Note:</b> Changing Representation means a change from one lawyer to another; 
                    or from being self-represented to having a lawyer; or from having a lawyer 
                    to being self-represented</div>                                
            </b-col>
            <b-col >
                <b-form-radio-group                
                    :class="state.changeRepresentation==false?'border border-danger is-invalid w-50':''"
                    @change="recheckStates()"
                    v-model="form18Info.changeRepresentation"
                    :options="changeRepresentationOptions">
                </b-form-radio-group>
                <span
                    v-if="(state.changeRepresentation != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify whether you are changing representation.
                </span>                     
            </b-col>
        </b-row> 

<!-- <Change Representation Lawyers> -->
        <div v-if="form18Info.changeRepresentation">

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    What is your current representation status?                                
                </b-col>
                <b-col>
                    <b-form-radio-group                
                        style="width:100%"
                        :class="state.currentRepresentation==false?'border border-danger is-invalid':''" 
                        :state="state.currentRepresentation"
                        @change="recheckStates()"                                    
                        v-model="form18Info.currentRepresentation"                    
                        :options="representationOptions">
                    </b-form-radio-group>
                    <span
                        v-if="(state.currentRepresentation != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Current Representation.
                    </span>
                </b-col>
            </b-row>

            <b-row class="mt-4" v-if="form18Info.currentRepresentation == 'Lawyer'">
                <b-col cols="6" style="font-weight: 700;">
                    What is the current lawyer's name and firm name?                                
                </b-col>
                <b-col :class="state.currentLawyerName==false? 'is-invalid' :''">
                    <b-form-textarea                
                        style="width:100%"
                        @change="recheckStates()" 
                        :state="state.currentLawyerName"                                    
                        v-model="form18Info.currentLawyerName">
                    </b-form-textarea> 
                </b-col>
            </b-row>

            <b-row class="mt-4" v-if="form18Info.currentRepresentation != null">
                <b-col cols="6" style="font-weight: 700;">
                    What is your new representation status?                                
                </b-col>
                <b-col>
                    <b-form-radio-group                
                        style="width:100%"
                        :class="state.newRepresentation==false?'border border-danger is-invalid':''" 
                        :state="state.newRepresentation"
                        @change="recheckStates();updated++;"                                    
                        v-model="form18Info.newRepresentation"                    
                        :options="form18Info.currentRepresentation == 'Lawyer' ? representationOptions: lawyerRepresentationOptions ">
                    </b-form-radio-group>
                    <span
                        v-if="(state.newRepresentation != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify New Representation.
                    </span>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4" v-if="form18Info.newRepresentation == 'Lawyer'">
                <b-col cols="6" style="font-weight: 700;">
                    What is the new lawyer's name and firm name?                                
                </b-col>
                <b-col :class="state.newLawyerName==false? 'is-invalid' :''">
                    <b-form-textarea                
                        style="width:100%"
                        @change="recheckStates()"
                        :state="state.newLawyerName"                                    
                        v-model="form18Info.newLawyerName">
                    </b-form-textarea>
                </b-col>
            </b-row>

        </div> 

<!-- <Name of Filing Parties> -->
        <b-row class="mt-4" v-if="form18Info.changeRepresentation != null">
            <b-col cols="6" style="font-weight: 700;">
                Name of party(ies) filing this form:                                
            </b-col>
            <b-col >
                <b-form-checkbox-group                
                    stacked
                    @change="recheckStates()"
                    style="width:100%" 
                    :state="state.filingParties"                                        
                    v-model="form18Info.filingParties"                    
                    :options="partyNames">
                </b-form-checkbox-group>
            </b-col>
        </b-row> 

<!-- <Ask Self-Represented> -->
        <b-row class="mt-5" v-if="form18Info.changeRepresentation == false">
            <b-col cols="6" style="font-weight: 700;">
                Are you self-represented?                                
            </b-col>
            <b-col >
                <b-form-radio-group 
                    :class="this.state.selfRepresented==false?'border w-25 border-danger is-invalid':'' "               
                    @change="toggleRepresentation" 
                    v-model="form18Info.selfRepresented"
                    :options="changeRepresentationOptions"                
                ></b-form-radio-group>                
            </b-col>
        </b-row> 

<!-- <Change Address> -->
        <div :key="updated" v-if="form18Info.selfRepresented !=null || form18Info.changeRepresentation">

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Mailing address for service:
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover
                        scale="1.1"
                        title="The address where you would like to receive documents."/>                  
                </b-col>
            </b-row>

            <p class="mt-4" style="font-weight: 700;">Service Information</p>

<!-- <Self-Represented Name for Service> -->
            <b-row  v-if="getServiceInfoCondition">
                <b-col cols="3">
                    Phone <span class="text-danger">* </span>
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="The registry may contact you by phone to schedule your appeal."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        :state="state.phone"
                        @change="recheckStates()"                        
                        v-model="form18Info.serviceInformation.phone">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        :class="state.phone==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. 604-567-8901 x1234 or 250-123-4567
                    </span>   
                </b-col>
            </b-row>

<!-- < ^| Counsel Name for Service> -->
            <b-card no-body border-variant="white" v-else >

                <b-row class="mt-2">
                    <b-col cols="3">
                        Counsel's First Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            @change="recheckStates()" 
                            :state="state.counselFirstName"             
                            v-model="form18Info.serviceInformation.counselFirstName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Counsel's Last Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            @change="recheckStates()"
                            :state="state.counselLastName"
                            v-model="form18Info.serviceInformation.counselLastName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Firm Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            @change="recheckStates()"
                            :state="state.firmName"                        
                            v-model="form18Info.serviceInformation.firmName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Firm's Phone <span class="text-danger">* </span>
                        <b-icon-question-circle-fill 
                            class="text-primary"
                            scale="1.1"
                            v-b-tooltip.hover
                            title="The registry may contact you by phone to schedule your appeal."/>
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            @change="recheckStates()"
                            :state="state.firmPhone"                        
                            v-model="form18Info.serviceInformation.firmPhone">
                        </b-form-input>
                        <span 
                            style="font-size: 0.75rem;" 
                            :class="state.firmPhone==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. 604-567-8901 x1234 or 250-123-4567
                        </span>   
                    </b-col>
                </b-row>

            </b-card>

<!-- <Email> -->
            <b-row class="mt-2">
                <b-col cols="3">
                    Email address
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        scale="1.1"
                        v-b-tooltip.hover                    
                        title="Receive electronic document status change notifications or be served electonically by another party (you need to agree to this using the checkboxes below."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        @change="recheckStates()"
                        :state="state.email"                         
                        v-model="form18Info.serviceInformation.email">
                    </b-form-input>
                    <span
                        v-if="state.email==false" 
                        style="font-size: 0.75rem;" 
                        class="text-danger ml-1">Invalid Email Address. <div class="ml-1 mt-n1"> <i>(If you provide an email address, It must be valid.)</i></div>
                    </span>
                </b-col>
            </b-row>

<!-- <Address Line 1> -->
            <b-row class="mt-2">
                <b-col cols="3">
                    Address Line 1 <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        @change="recheckStates()"
                        :state="state.addressLine1"                         
                        v-model="form18Info.serviceInformation.addressLine1">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">Street address
                    </span>   
                </b-col>
            </b-row>

<!-- <Address Line 2> -->
            <b-row class="mt-2">
                <b-col cols="3">
                    Address Line 2                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"                        
                        v-model="form18Info.serviceInformation.addressLine2">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">Apartment, suite, unit, building, floor, etc.
                    </span>   
                </b-col>
            </b-row>

<!-- <City> -->
            <b-row class="mt-2">
                <b-col cols="3">
                    City <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        @change="recheckStates()"
                        :state="state.city"                         
                        v-model="form18Info.serviceInformation.city">
                    </b-form-input>  
                </b-col>
            </b-row>

<!-- <Province> -->
            <b-row class="mt-2">
                <b-col cols="3">Province <span class="text-danger">*</span></b-col>
                <b-col cols="4">
                    <b-form-select
                        v-model="form18Info.serviceInformation.province" 
                        @change="recheckStates()"
                        :state="state.province"
                        :options="provinces" >                        
                    </b-form-select>
                    <div style="font-size: 0.75rem; text-align: justify;" v-if="state.nonBcAddress == true" class="text-warning mt-1" >
                        Pursuant to Rule 80(3) -  a party who wishes to apply for permission under subrule (1) (c) 
                        to use a residential address or business address for service outside of British Columbia
                        must submit a written request to the registrar.
                    </div>
                </b-col>
            </b-row>

<!-- <Country> -->
            <b-row class="mt-2">
                <b-col cols="3">Country</b-col>
                <b-col cols="4">Canada</b-col>
            </b-row>

<!-- <Postal Code> -->
            <b-row class="mt-2">
                <b-col cols="3">
                    Postal Code <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        @change="recheckStates()" 
                        :state="state.postalCode"                        
                        v-model="form18Info.serviceInformation.postalCode">
                    </b-form-input> 
                    <span 
                        style="font-size: 0.75rem;" 
                        :class="state.postalCode==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. A1A 1A1
                    </span> 
                </b-col>
            </b-row>        
        </div>

<!-- <Use Service Email > -->
        <div class="mt-5" v-if="form18Info.changeRepresentation != null">       

            <b-row>
                <b-form-group>
                    <span class="ml-3">I would like to receive email notifications when the status of my document changes</span>	
                    <b-form-checkbox
                        class="ml-5"
                        style="display: inline;"
                        size="sm"									
                        v-model="form18Info.useServiceEmail"
                        >  
                    </b-form-checkbox>						
                </b-form-group>
            </b-row>

            <b-row >
                <b-form-group>
                    <span class="ml-3 mr-1">I agree to be served documents electronically by another party</span>
                    <b-icon-question-circle-fill 
                        class="text-primary mr-5"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Electronic service will replace in-person service if you select this option."/>	
                    <b-form-checkbox                        
                        style="display: inline; margin-left: 8.25rem;"
                        size="sm"									
                        v-model="form18Info.sendNotifications"
                        >  
                    </b-form-checkbox>						
                </b-form-group>
            </b-row> 

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">
                    Name of lawyer or party authorizing filing of this Form:
                </b-col>
                <b-col>
                    <b-form-input
                        @change="recheckStates()"                    
                        v-model="form18Info.authorizedName"                        
                        :state ="state.authorizedName">
                    </b-form-input>
                    <span class="ml-2" style="font-weight: 700; font-size:11pt">Electronically filed</span>

                </b-col>
            </b-row>

        </div>

        <hr/>    
<!-- <Save Buttons> -->
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

import { form18DataInfoType } from '@/types/Information/Form18';
import { partiesDataJsonDataType, serviceInformationJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

@Component
export default class Form18StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form18State.State
    public form18Info: form18DataInfoType;

    @form18State.Action
    public UpdateForm18Info!: (newForm18Info: form18DataInfoType) => void  
    
    @form18State.State
    public currentNoticeOfRepChangeAddressId: string;

    @form18State.Action
    public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    
    changeRepresentationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    representationOptions = [ 'Self-represented', 'Lawyer' ];
    lawyerRepresentationOptions = [ 'Lawyer' ];

    provinces = [
        {text:'british columbia', value:'BC'}, 
        {text:'ontario', value:'ON'}, 
        {text:'quebec', value:'QC'}, 
        {text:'alberta', value:'AB'}, 
        {text:'saskatchewan', value:'SK'}, 
        {text:'manitoba', value:'MB'},
        {text:'newfoundland and labrador', value:'NL'},
        {text:'newfoundland', value:'NL'},
        {text:'labrador', value:'NL'},
        {text:'prince edward island', value:'PE'},
        {text:'nova scotia', value:'NS'},
        {text:'new brunswick', value:'NB'},
        {text:'yukon', value:'YT'},
        {text:'northwest territories', value:'NT'},
        {text:'nunavut', value:'NU'}
    ]

    state = {
        firstAppellant: null,
        firstRespondent: null,
        changeRepresentation: null,
        currentRepresentation: null,
        currentLawyerName: null,
        newRepresentation: null,  
        newLawyerName: null, 
        phone:null,
        email:null,
        addressLine1:null,
        city:null,
        postalCode:null,
        counselFirstName:null,
        counselLastName:null,
        firmName:null,
        firmPhone:null,
        filingParties:null,            
        authorizedName:null,
        selfRepresented:null,
        province:null,
        nonBcAddress: null
    }

    respondentName = ""; 
    updated=0;  
    showNoneBcAlert=false

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
              
    }

    public extractInfo(){     

        if(this.currentNoticeOfRepChangeAddressId){
            this.getForm18Data();
           
        } else {  
            const form18Data = {} as form18DataInfoType;                  

            form18Data.appellants = this.partiesJson.appellants
            form18Data.respondents = this.partiesJson.respondents;
            form18Data.formSevenNumber = this.fileNumber;
            form18Data.serviceInformation = {} as serviceInformationJsonDataType;
            form18Data.serviceInformation.province = "BC";
            form18Data.serviceInformation.country = "Canada";
            form18Data.filingParties = [];           
            form18Data.version = this.$store.state.Application.version;
            form18Data.useServiceEmail = false
            form18Data.sendNotifications = false           
            this.UpdateForm18Info(form18Data);            
            this.saveForm(true); 
        } 
    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];

        for (const respondent of this.form18Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name)
        }

        for (const applicant of this.form18Info.appellants){
            this.applicantNames.push(applicant.name); 
            this.partyNames.push(applicant.name);          
        }
        this.dataReady = true;

    }

    public getForm18Data() {        
       
        this.$http.get('/form18/forms/'+this.currentNoticeOfRepChangeAddressId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form18Data = response.data.data                
                this.UpdateForm18Info(form18Data) 
                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public toggleRepresentation(){

        Vue.nextTick(()=>
        {
            if ((!this.form18Info.changeRepresentation && !this.form18Info.selfRepresented) || 
                (this.form18Info.changeRepresentation && this.form18Info.newRepresentation == 'Lawyer')){
                const contactInfo = this.form18Info.respondents.filter(resp => {
                    if (resp.name  == this.respondentName) {
                        return true;
                    }
                })[0];

                if(contactInfo){
                    this.form18Info.serviceInformation.country = "Canada";
                    this.form18Info.serviceInformation.selectedContactId = contactInfo.id;
                    this.form18Info.serviceInformation.name = contactInfo.name;
                    this.form18Info.serviceInformation.counselFirstName = contactInfo.solicitor?.counselFirstName;
                    this.form18Info.serviceInformation.counselLastName = contactInfo.solicitor?.counselLastName;
                    this.form18Info.serviceInformation.firmName = contactInfo.solicitor?.firmName;
                    this.form18Info.serviceInformation.firmPhone = contactInfo.solicitor?.firmPhone;
                    this.form18Info.serviceInformation.email = "";
                    this.form18Info.serviceInformation.addressLine1 = contactInfo.solicitor?.addressLine1;
                    this.form18Info.serviceInformation.addressLine2 = contactInfo.solicitor?.addressLine2;
                    this.form18Info.serviceInformation.city = contactInfo.solicitor?.city;
                    this.form18Info.serviceInformation.postalCode = contactInfo.solicitor?.postalCode;
                    this.updated++;
                }

            }
            this.recheckStates()
        })
    }

    public clearStates(){
        this.state = {
            firstAppellant: null,
            firstRespondent: null,
            changeRepresentation: null,
            currentRepresentation: null,
            currentLawyerName: null,
            newRepresentation: null,  
            newLawyerName: null, 
            phone:null,
            email:null,
            addressLine1:null,
            city:null,
            postalCode:null,
            counselFirstName:null,
            counselLastName:null,
            firmName:null,
            firmPhone:null,
            filingParties:null,           
            authorizedName:null,
            selfRepresented: null,
            province: null,
            nonBcAddress: null
        }
        this.dataReady = true; 
    }

    public recheckStates(){
        
        this.state.nonBcAddress = this.form18Info.serviceInformation?.province && this.form18Info.serviceInformation?.province != 'BC' ? true : null
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                this.checkStates()
                return 
            }
        }
    }

    public checkStates(){         
        
        if(this.form18Info.currentRepresentation!='Lawyer' && this.form18Info.newRepresentation!='Lawyer')
            this.form18Info.newRepresentation=''

        this.state.firstAppellant = !this.form18Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form18Info.firstRespondent? false : null;

        this.state.changeRepresentation = (this.form18Info.changeRepresentation == null)? false : null;

        const changeRep = this.form18Info.changeRepresentation;

        this.state.currentRepresentation = (changeRep && !this.form18Info.currentRepresentation)? false : null;
        this.state.currentLawyerName = (changeRep && this.form18Info.currentRepresentation=='Lawyer' && !this.form18Info.currentLawyerName)? false : null;

        this.state.newRepresentation = (changeRep && !this.form18Info.newRepresentation)? false : null;
        this.state.newLawyerName = (changeRep && this.form18Info.newRepresentation=='Lawyer' && !this.form18Info.newLawyerName)? false : null;


        const selfRep = this.form18Info.selfRepresented || (changeRep && this.form18Info.newRepresentation!='Lawyer');

        const phone = this.form18Info.serviceInformation?.phone?.trim()
        this.state.phone = (selfRep && Vue.filter('verifyPhone')(phone)==false)? false : null;

        this.state.counselFirstName = !selfRep && !this.form18Info.serviceInformation?.counselFirstName? false : null;
        this.state.counselLastName =  !selfRep && !this.form18Info.serviceInformation?.counselLastName? false : null;
        this.state.firmName =  !selfRep && !this.form18Info.serviceInformation?.firmName?  false : null;
        
        const firmPhone = this.form18Info.serviceInformation?.firmPhone?.trim()
        this.state.firmPhone = (!selfRep && Vue.filter('verifyPhone')(firmPhone)==false)? false : null;
        
        const email = this.form18Info.serviceInformation?.email?.trim();
        this.state.email =(email && !Vue.filter('verifyEmail')(email) ||(!email && this.form18Info.useServiceEmail))? false : null;
        
        this.state.addressLine1 = !this.form18Info.serviceInformation?.addressLine1? false : null;
        this.state.city = !this.form18Info.serviceInformation?.city? false : null;

        this.state.province = !this.form18Info.serviceInformation?.province ? false : null
        this.state.nonBcAddress = this.form18Info.serviceInformation?.province && this.form18Info.serviceInformation?.province != 'BC' ? true : null  

        const postalCode = this.form18Info.serviceInformation?.postalCode?.trim()
        this.state.postalCode = !Vue.filter('verifyPostCode')(postalCode)? false : null;        
        this.state.filingParties = (this.form18Info.filingParties?.length > 0)? null: false; 
           
        this.state.authorizedName = !this.form18Info.authorizedName? false : null; 
        this.state.selfRepresented = this.form18Info.selfRepresented==null && !changeRep? false :null

        // console.log(this.state)
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true            
    }


    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form18/forms';

        if (this.currentNoticeOfRepChangeAddressId){
            method = 'put';
            url = '/form18/forms/'+this.currentNoticeOfRepChangeAddressId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form18Info,
                    type:'Form18',
                    description:'Notice of Change of Representation/Change of Address for Service'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form18Info,
                    type:'Form18',
                    description:'Notice of Change of Representation/Change of Address for Service'
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
                        this.UpdateCurrentNoticeOfRepChangeAddressId(response.data.file_id);
                        this.extractPartiesData();                        
                    }

                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }   

    public navigateToPreviewPage() {          
        if (this.checkStates()){
            if(this.state.nonBcAddress)
               this.showNoneBcAlert=true
            else
                this.$router.push({name: "preview-form18"});
        }        
    }

    public confirmNavigateToPreviewPage(){
        this.showNoneBcAlert=false
        this.$router.push({name: "preview-form18"});
    }

    get getServiceInfoCondition(){
        return ((this.form18Info.selfRepresented && !this.form18Info.changeRepresentation) ||
                (this.form18Info.newRepresentation == 'Self-represented' && this.form18Info.changeRepresentation))
    }   
}
</script>

<style scoped lang="scss">
</style>