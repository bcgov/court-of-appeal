<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">                 

        <b-card v-if="form22Info.requiresManualEntry" class="mb-4 bg-white border-white text-dark"> 
            <b-card no-body class="border-white">
                <b-row class="mb-2">   
                    <b-col cols="10" :class="state.appellants !=null?'border border-danger is-invalid':''">
                        <b-form-group
                            class="labels"                
                            label="Appellants:" 
                            label-for="appellants">
                            <span 
                                v-if="form22Info.manualAppellants.length == 0 && !AddNewAppellantForm" 
                                id="appellants" 
                                class="text-muted ml-2 my-2">No appellants have been assigned.
                            </span>
                            <b-table
                                v-else-if="form22Info.manualAppellants.length > 0"                                                                
                                id="appellants"
                                :items="form22Info.manualAppellants"
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
                    <b-col cols="10" :class="state.respondents !=null?'border border-danger is-invalid':''">
                        <b-form-group
                            class="labels"                
                            label="Respondents:" 
                            label-for="respondents">
                            <span 
                                v-if="form22Info.manualRespondents.length == 0 && !AddNewRespondentForm" 
                                id="respondents" 
                                class="text-muted ml-2 my-2">No respondents have been assigned.
                            </span>
                            <b-table
                                v-else-if="form22Info.manualRespondents.length > 0"                                                                
                                id="respondents"
                                :items="form22Info.manualRespondents"
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
        </b-card>
        
        <div v-if="partyDataExists()">
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>
                
                <b-row class="mt-4" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form22Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form22Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>
            </b-card>  

            <b-row class="mt-5">
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
                        v-model="form22Info.firstAppellant"                    
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
                        v-model="form22Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of the party(ies) bringing the application:                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked
                        @change="recheckStates(true)"               
                        style="width:100%"                        
                        :state="state.applyingParties"                                      
                        v-model="form22Info.applyingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                </b-col>
            </b-row>    

            <p class="mt-2" style="font-size: 1.25rem; font-weight: 700;">Basis For Bringing The Appeal</p>        

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What are the orders you will ask this court to make on appeal? 
                    <p class="content text-primary">
                        Briefly list the orders.
                    </p>                               
                </b-col>
                <b-col>                    
                    <b-form-textarea                
                        style="width:100%" 
                        rows="6"
                        @change="recheckStates()"  
                        :state="state.orders"                                                          
                        v-model="form22Info.orders">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What are the grounds of appeal?     
                    <p class="content text-primary">
                        Be as specific as possible.  For example, if you believe 
                        the trial judge used an incorrect legal test or otherwise 
                        misapplied the law.
                    </p>                                               
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%" 
                        rows="6"
                        @change="recheckStates()" 
                        :state="state.grounds"                                                           
                        v-model="form22Info.grounds">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>

            <p class="mt-2" style="font-size: 1.25rem; font-weight: 700;">Income and Assets</p>   

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    <p>Income</p>                    
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group   
                        stacked             
                        style="width:100%"
                        @change="recheckStates()" 
                        :class="state.income==false?'border border-danger is-invalid':''"                     
                        v-model="form22Info.income"
                        :options="incomeOptions">
                    </b-form-radio-group>
                    <span
                        v-if="(state.income != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify income information.
                    </span> 
                </b-col>
            </b-row>   

            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    <p>Assets</p>                    
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        stacked
                        @change="recheckStates()"
                        :class="state.assets==false?'border border-danger is-invalid':''"
                        style="width:100%"                      
                        v-model="form22Info.assets"
                        :options="assetOptions">
                    </b-form-radio-group>
                    <span
                        v-if="(state.assets != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify asset information.
                    </span>  
                </b-col>
            </b-row>   

            <div v-if="form22Info.assets == false && form22Info.income == 0">

                <p class="mt-2" style="font-size: 1.25rem; ">Financial Circumstances</p>  

                <b-row class="bg-primary border-primary text-white mx-2">
                    <p style="margin: 1rem; font-size: 16px;">            
                        You have indicated that the income or assets criteria do not apply 
                        and you must either complete this portion or abandon your application.
                    </p>
                </b-row>

                <b-row class="mt-4 question">
                    <b-col cols="7" class="labels">
                        Please provide specific details about your financial circumstances 
                        <p class="content text-primary">
                            For example, if you have recently lost employment or have a large number of dependents.
                        </p>                               
                    </b-col>
                    <b-col>                    
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"  
                            :state="state.finances"                                                          
                            v-model="form22Info.finances">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>
            </div>            

            <b-row class="my-3 question" style="padding: 0;">
                <b-col cols="7" class="labels">
                    Name of lawyer or party authorizing filing of this Form:                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form22Info.authorizedName"
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
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import { form22DataInfoType } from '@/types/Information/Form22';
import { partiesDataJsonDataType } from '@/types/Information/json';
import AddPartyForm from './AddPartyForm.vue';
import { partyInfoType } from '@/types/Information/Form3';

@Component({
    components:{        
        AddPartyForm        
    }
})
export default class Form22StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @form22State.State
    public form22Info: form22DataInfoType;

    @form22State.Action
    public UpdateForm22Info!: (newForm22Info: form22DataInfoType) => void  
    
    @form22State.State
    public currentNoFeesPayableId: string;

    @form22State.Action
    public UpdateCurrentNoFeesPayableId!: (newCurrentNoFeesPayableId: string) => void
    
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

    assetOptions = [
        {text: 'The value of my household assets, after subtracting any outstanding debt owing on them, is less than $10,000', value: true},
        {text: 'Not applicable', value: false}
    ];
    
    incomeOptions = [
        {text: '1-3 household members - My gross household income is less than $60,000', value: 1},
        {text: '4 or more household members - My gross household income is less than $84,000', value: 2},
        {text: 'None of the above', value: 0}
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
        firstAppellant: null, 
        firstRespondent: null,         
        authorizedName: null, 
        applyingParties: null,    
        orders: null, 
        grounds: null, 
        income: null, 
        assets: null, 
        finances: null
    }

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }

    public partyDataExists(){

        const existsManual = this.form22Info.requiresManualEntry && 
            this.form22Info.manualAppellants.length>0 && 
            this.form22Info.manualRespondents.length>0;

        const existsSupreme = !this.form22Info.requiresManualEntry && 
            this.form22Info.appellants.length>0 && 
            this.form22Info.respondents.length>0;
            
        return existsManual || existsSupreme;
    }

    public extractInfo(){       

        if(this.currentNoFeesPayableId){
            this.getForm22Data();
           
        } else { 

            const form22Data = this.form22Info;            
            form22Data.version = this.$store.state.Application.version;
            form22Data.manualRespondents = [];
            form22Data.manualAppellants = [];
            form22Data.applyingParties = [];            

            if (this.form22Info?.requiresManualEntry){
                
                form22Data.appellants = [];
                form22Data.respondents = [];
                form22Data.appellantNames = '';
                form22Data.respondentNames = '';
                form22Data.formSevenNumber = '';

            } else {               

                let applicantNames = [];
                let respondentNames = [];               

                form22Data.appellants = this.partiesJson.appellants
                form22Data.respondents = this.partiesJson.respondents;

                for (const respondent of form22Data.respondents){
                    respondentNames.push(respondent.name);                
                }

                for (const applicant of form22Data.appellants){
                    applicantNames.push(applicant.name);                
                }

                form22Data.appellantNames = applicantNames.join(', ');
                form22Data.respondentNames = respondentNames.join(', ');      
                      
                form22Data.formSevenNumber = this.fileNumber;
            }
            this.UpdateForm22Info(form22Data);
            
            this.saveForm(true);
        }            

    }

    get partyNames(){
        
        let partyNames: string[] = [];

        if (this.form22Info.requiresManualEntry){

            for (const respondent of this.form22Info.manualRespondents){
                partyNames.push(respondent.name) 
            }

            for (const applicant of this.form22Info.manualAppellants){
                partyNames.push(applicant.name);  
            }

        } else {

            for (const respondent of this.form22Info.respondents){
                partyNames.push(respondent.name) 
            }

            for (const applicant of this.form22Info.appellants){
                partyNames.push(applicant.name);  
            }
        }      
        return partyNames;
    }  

    get applicantNames(){
        
        let applicantNames: string[] = [];

        if (this.form22Info.requiresManualEntry){            

            for (const applicant of this.form22Info.manualAppellants){
                applicantNames.push(applicant.name);  
            }

        } else {            

            for (const applicant of this.form22Info.appellants){
                applicantNames.push(applicant.name);  
            }
        }      
        return applicantNames;
    }

    get respondentNames(){
        
        let respondentNames: string[] = [];

        if (this.form22Info.requiresManualEntry){

            for (const respondent of this.form22Info.manualRespondents){
                respondentNames.push(respondent.name) 
            }            

        } else {

            for (const respondent of this.form22Info.respondents){
                respondentNames.push(respondent.name) 
            }            
        }      
        return respondentNames;
    }   

    public getForm22Data() {        
       
        this.$http.get('/form22/forms/'+this.currentNoFeesPayableId)
        .then((response) => {
            if(response?.data?.data){
                const form22Data = response.data.data
                this.UpdateForm22Info(form22Data);
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
            firstAppellant: null, 
            firstRespondent: null,         
            authorizedName: null, 
            applyingParties: null,    
            orders: null, 
            grounds: null, 
            income: null, 
            assets: null, 
            finances: null
        }
        this.dataReady = true; 
    }

    public recheckStates(dontFindInvalidFields?){
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                this.checkStates(dontFindInvalidFields)
                return 
            }
        }
    }

    public checkStates(dontFindInvalidFields?){   

        if(this.form22Info.requiresManualEntry){
            this.state.appellants = this.form22Info.manualAppellants?.length>0? null :false;
            this.state.respondents = this.form22Info.manualRespondents?.length>0? null :false;            
        } else {
            this.state.appellants = null;
            this.state.respondents = null;            
        }
        
        this.state.firstAppellant = this.form22Info.firstAppellant != null? null:false;
        this.state.firstRespondent = this.form22Info.firstRespondent != null? null:false;
        this.state.applyingParties = this.form22Info.applyingParties?.length>0? null :false;
        
        this.state.orders = this.form22Info.orders != null? null:false;
        this.state.grounds = this.form22Info.grounds != null? null:false;
        
        this.state.assets = this.form22Info.assets != null? null:false;
        this.state.income = this.form22Info.income != null? null:false;
        const financesRequired = this.form22Info.assets == false && this.form22Info.income == 0
        this.state.finances = (financesRequired && !this.form22Info.finances)? false: null;
        
        this.state.authorizedName = !this.form22Info.authorizedName? false : null;       

        if(dontFindInvalidFields == true) return true

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
        let url = '/form22/forms';

        if (this.currentNoFeesPayableId){
            method = 'put';
            url = '/form22/forms/'+this.currentNoFeesPayableId;
            const form22Data = this.form22Info;            
            this.UpdateForm22Info(form22Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form22Info,
                    type:'Form22',
                    description:'Application For Order that No Fees are Payable'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form22Info,
                    type:'Form22',
                    description:'Application For Order that No Fees are Payable'
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
                        this.UpdateCurrentNoFeesPayableId(response.data.file_id); 
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
            const form22Data = this.form22Info;
            form22Data.manualRespondents.push(newParty)

            for (const respondent of form22Data.manualRespondents){
                respondentNames.push(respondent.name);                
            }
            form22Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm22Info(form22Data)

            this.closeRespondentForm();

        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName;
            }  
            
            const respondentNames = [];
            const form22Data = this.form22Info;
            form22Data.manualRespondents[index].organization = newParty.organization;
            form22Data.manualRespondents[index].name = newParty.name; 
            form22Data.manualRespondents[index].firstName = newParty.firstName;
            form22Data.manualRespondents[index].lastName = newParty.lastName;

            for (const respondent of form22Data.manualRespondents){
                respondentNames.push(respondent.name);                
            }
            form22Data.respondentNames = respondentNames.join(', '); 
            this.UpdateForm22Info(form22Data);
                      
            this.closeRespondentForm();
        }
        this.updated ++;
    }

    public removeRespondent(data){ 
        const form22Data = this.form22Info;       
        form22Data.manualRespondents.splice(data.index,1);
        const respondentNames = [];
        for (const respondent of form22Data.manualRespondents){
            respondentNames.push(respondent.name);                
        }
        form22Data.respondentNames = respondentNames.join(', '); 
        this.UpdateForm22Info(form22Data);
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
            const form22Data = this.form22Info;
            form22Data.manualAppellants.push(newParty)

            for (const appellant of form22Data.manualAppellants){
                appellantNames.push(appellant.name);                
            }
            form22Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm22Info(form22Data);

            this.closeAppellantForm();
        } else {  

            if (!newParty.organization){
                newParty.name = newParty.firstName + ' ' + newParty.lastName
            } 
            
            const appellantNames = [];
            const form22Data = this.form22Info;
            form22Data.manualAppellants[index].organization = newParty.organization;
            form22Data.manualAppellants[index].name = newParty.name; 
            form22Data.manualAppellants[index].firstName = newParty.firstName;
            form22Data.manualAppellants[index].lastName = newParty.lastName;

            for (const appellant of form22Data.manualAppellants){
                appellantNames.push(appellant.name);                
            }
            form22Data.appellantNames = appellantNames.join(', '); 
            this.UpdateForm22Info(form22Data);  
            this.closeAppellantForm();
        }
        this.updated ++;
        
    }

    public removeAppellant(data){   
        const form22Data = this.form22Info;       
        form22Data.manualAppellants.splice(data.index,1);
        const appellantNames = [];
        for (const appellant of form22Data.manualAppellants){
            appellantNames.push(appellant.name);                
        }
        form22Data.appellantNames = appellantNames.join(', '); 
        this.UpdateForm22Info(form22Data);
        this.updated ++;        
    }

    public closeAppellantForm() {                     
        this.AddNewAppellantForm= false; 
        this.addAppellantFormColor = 'court'
        if(this.isEditAppellantOpen){
            this.latestEditAppellantData.toggleDetails();
            this.isEditAppellantOpen = false;
        } 
        this.recheckStates()
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form22"}) 
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
        font-style: italic;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 0.75rem !important;
    }

</style>