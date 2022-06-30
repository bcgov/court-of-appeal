<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">              

<!-- <PARTIES> -->
        <b-card class="mb-4 bg-white border-white text-dark"> 

<!-- <Appellants> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.appellantsInfo !=null?'border border-danger is-invalid':''">
                    <b-form-group
                        class="labels"                
                        label="Appellants:">
                        <p class="content text-primary">
                            To prepare your order, you must enter the full 
                            names of all the appellant(s) as it appears on 
                            the reasons for judgment or notice of appeal. 
                            In addition, if counsel will be signing the order, 
                            enter the name of counsel by clicking on <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/> 
                            and type the name in the counsel’s name field.
                        </p>  
                        <span 
                            v-if="form15Info.appellants.length == 0 && !AddNewAppellantForm"
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form15Info.appellants.length > 0"
                            class="mt-2"
                            style="font-size: 16px;"
                            :items="form15Info.appellants"
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
                                    {{data.item.name}}
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
                <b-col cols="10" :class="state.respondentsInfo !=null?'border border-danger is-invalid':''">
                    <b-form-group
                        class="labels"                
                        label="Respondents:">
                        <p class="content text-primary">
                            To prepare your order, you must enter the full names of 
                            all the respondent(s) as it appears on the reasons for 
                            judgment or notice of appeal. In addition, if counsel 
                            will be signing the order, enter the name of counsel 
                            by clicking on <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/> 
                            and type the name in the counsel’s name field.
                        </p> 
                        <span 
                            v-if="form15Info.respondents.length == 0 && !AddNewRespondentForm" 
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form15Info.respondents.length > 0"
                            class="mt-2"
                            :items="form15Info.respondents"
                            :fields="partyFields"
                            head-row-variant="primary"
                            style="font-size: 16px;"
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

                            
                            <template v-slot:cell(edit)="data" >   
                                <div style="float: right;">                                                                     
                                    <b-button 
                                        class="mr-2 border-0" 
                                        size="sm" 
                                        variant="transparent" 
                                        @click="removeRespondent(data)">
                                        <b-icon 
                                            icon="trash-fill" 
                                            font-scale="1.25" 
                                            variant="danger"/>
                                    </b-button>
                                    <b-button 
                                        size="sm border-0" 
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
        
        <div v-if="this.form15Info.appellants && this.form15Info.appellants.length>0 && this.form15Info.respondents && this.form15Info.respondents.length>0">
            
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; margin:0 0 0 1rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>

    <!-- <BETWEEN> -->
                <b-row class="mt-4 ml-1" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form15Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
    <!-- <AND> -->
                <b-row class="mt-3 ml-1" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form15Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row> 
            </b-card> 


<!-- <FilingParties-Made Application> -->
            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    Who is making the application?                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked
                        @change="recheckStates(true)"                      
                        :state="state.filingParties"                                      
                        v-model="form15Info.filingParties">
                        <b-form-checkbox
                            :value="applyingparty"
                            v-for="applyingparty,inx in partyNames"
                            :key="'appling-party-'+inx">
                                {{applyingparty.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>                    
                </b-col>
            </b-row> 


<!-- <orders> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What orders are you asking to be made?                                
                </b-col>
                <b-col class="ml-1 mt-2">   
                    <b-form-textarea
                        max-rows="8"
                        @change="recheckStates()"                       
                        :state="state.orders"              
                        v-model="form15Info.orders">                       
                    </b-form-textarea> 
                </b-col>
            </b-row> 

<!-- <Other Order exists?> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Are there any additional orders you are seeking?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group
                        :class="state.otherOrders==false?'border border-danger is-invalid w-50':''"                                             
                        v-model="form15Info.otherOrders"
                        @change="recheckStates()"
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

<!-- <additional orders> -->
            <b-row v-if="form15Info.otherOrders" class="mt-4 question">
                <b-col cols="7" class="labels">
                    Please specify:                                                     
                </b-col>
                <b-col class="ml-1 mt-2">   
                    <b-form-textarea
                        max-rows="8"
                        @change="recheckStates()"                        
                        :state="state.additionalOrders"              
                        v-model="form15Info.additionalOrders">                       
                    </b-form-textarea> 
                </b-col>
            </b-row> 

            <!-- <Signing Parties> -->
            <b-row class="mt-4 question">
                <b-col class="labels">
                    Select the names of the parties and/or counsel who will be signing the order:  
                    <p class="content text-primary">
                        Please select the names of the parties and/or counsel 
                        who will be signing the order. If the name of counsel 
                        is not appearing, please ensure that you enter 
                        counsel’s name at the top of the page.
                    </p>                              
                </b-col>
            </b-row>
            <b-row class="mx-3">
                <b-col class="mx-1 p-2 bg-light border-light rounded">   
                    <b-form-checkbox-group 
                        stacked                                               
                        style="width:100%"
                        @change="checkStates(true)"                       
                        :state="state.signingParties"                                      
                        v-model="form15Info.signingParties">

                        <div v-for="filingparty,inx in partyNames" :key="'appling-party-'+inx">
                            <b-row>
                                <b-col>
                                    <b-form-checkbox :value="filingparty">
                                        {{filingparty.name}}
                                    </b-form-checkbox>
                                </b-col>
                                <b-col>
                                    <b-form-checkbox v-if="filingparty.counselName" :value="getCounselParty(filingparty)">
                                        {{filingparty.counselName}}, counsel for {{filingparty.name}}
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>                        
                        </div>
                        <span
                            v-if="(state.signingParties != null)" 
                            style="font-size: 0.75rem;" 
                            class="bg-white text-danger"><b-icon-exclamation-circle/>
                            Specify at least one respondent and one appellant.
                        </span>

                    </b-form-checkbox-group> 
                </b-col>
            </b-row>

        </div>          

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

import "@/store/modules/forms/form15";
const form15State = namespace("Form15");

import { form15DataInfoType, form15PartiesInfoType } from '@/types/Information/Form15';
import { partiesDataJsonDataType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddPartyModal from './AddPartyModal.vue';

@Component({
    components:{
        AddPartyForm,
        AddPartyModal        
    }
})
export default class Form15StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @form15State.State
    public form15Info: form15DataInfoType;

    @form15State.Action
    public UpdateForm15Info!: (newForm15Info: form15DataInfoType) => void  
    
    @form15State.State
    public currentConsentOrderId: string;

    @form15State.Action
    public UpdateCurrentConsentOrderId!: (newCurrentConsentOrderId: string) => void
    
    dataReady = false;
    updated=0;     
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form15PartiesInfoType[] = [];
    

    partyToEdit = {} as form15PartiesInfoType;
    showPartyWindow = false
    isCreate = true
    partyType = ''   
    seekingRemovedOptions = [
        'appeal',
        'application for leave to appeal',
        'cross appeal',
        'application for leave to cross appeal'
    ]

    partyFields = [
        { key:'organization', label:'Party Type', thClass: 'text-white bg-court', thStyle: '', sortable:false }, 
        { key:'name', label:'Party Name', thClass: 'text-white bg-court', thStyle: '',  sortable:false  },
        { key:'counselName', label:'Counsel Name', thClass: 'text-white bg-court', thStyle: '',  sortable:false  },
        { key:'edit', label:'', thClass: 'text-white bg-court', sortable:false }        
    ]   

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ]; 

    state = { 
        appellantsInfo: null,
        respondentsInfo: null,
        filingParties: null,
        orders: null,
        otherOrders: null,
        additionalOrders: null,
        signingParties: null       
    }    

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }
    
    public extractInfo(){       

        if(this.currentConsentOrderId){
            this.getForm15Data();
           
        } else { 

            const form15Data = this.form15Info;            
            form15Data.version = this.$store.state.Application.version;
            form15Data.filingParties = [];
            form15Data.signingParties = []; 
            form15Data.appellants = this.partiesJson.appellants
            form15Data.respondents = this.partiesJson.respondents
            form15Data.formSevenNumber = this.fileNumber; 
            
            this.UpdateForm15Info(form15Data);           
            this.revaluateForm15Data();            
            this.saveForm(true);
        }          
    }

    public revaluateForm15Data(){

        const form15Data = this.form15Info;

        for (const respondent of form15Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form15Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form15Data.appellants.map(resp=>resp.name)
        const respondents = form15Data.respondents.map(resp=>resp.name)
        form15Data.appellantNames = appellants.join(', ');
        form15Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form15Data.appellants, ...form15Data.respondents]
        this.UpdateForm15Info(form15Data);
    }

    public getForm15Data() {        
       
        this.$http.get('/form15/forms/'+this.currentConsentOrderId)
        .then((response) => {
            if(response?.data?.data){
                const form15Data = response.data.data
                this.UpdateForm15Info(form15Data);
                this.revaluateForm15Data();               
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
            filingParties: null,
            orders: null,
            otherOrders: null,
            additionalOrders: null,
            signingParties: null            
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
        
        this.state.appellantsInfo = this.form15Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form15Info.respondents?.length>0? null :false;            
        this.state.filingParties = this.form15Info.filingParties?.length>0? null :false;
        this.state.orders = this.form15Info.orders? null :false;
        this.state.otherOrders = this.form15Info.otherOrders == true || this.form15Info.otherOrders ==false? null :false;
        this.state.additionalOrders = this.form15Info.otherOrders == true && !this.form15Info.additionalOrders? false :null;
        const signingParties = this.form15Info.signingParties?this.form15Info.signingParties:[];
        const signingAppellants = signingParties.filter(party=> !party.responding)
        const signingRespondents = signingParties.filter(party=> party.responding)
        
        this.state.signingParties = (signingAppellants.length>0 && signingRespondents.length > 0)? null :false;
        
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
        let url = '/form15/forms';

        if (this.currentConsentOrderId){
            method = 'put';
            url = '/form15/forms/'+this.currentConsentOrderId;
            const form15Data = this.form15Info;            
            this.UpdateForm15Info(form15Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form15Info,
                    type:'Form15',
                    description:'Consent Order - General'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form15Info,
                    type:'Form15',
                    description:'Consent Order - General'
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
                        this.UpdateCurrentConsentOrderId(response.data.file_id); 
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
        this.partyToEdit = {} as form15PartiesInfoType
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
        const form15Data = this.form15Info;       
        form15Data.respondents.splice(data.index,1);
        form15Data.respondentNames = form15Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form15Data.appellants, ...form15Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm15Info(form15Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form15PartiesInfoType
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
        const form15Data = this.form15Info;       
        form15Data.appellants.splice(data.index,1); 
        form15Data.appellantNames = form15Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form15Data.appellants, ...form15Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm15Info(form15Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form15Info = this.form15Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form15Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form15Info.respondents.push(party);
            }
            this.UpdateForm15Info(form15Info)
        }
        this.revaluateForm15Data();
        this.showPartyWindow = false;
        this.somePartiesChanged() 
        this.updated++;
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form15"}) 
    }

    public somePartiesChanged(){   
        this.form15Info.filingParties = [];
        this.form15Info.signingParties = [];    
        this.updated++;
    }    

    public getCounselParty(party){

        if(party.counselName){
            const counsel: form15PartiesInfoType = JSON.parse(JSON.stringify(party))
            counsel.isCounsel = true
            counsel.name = counsel.counselName+', counsel for '+counsel.name
            return counsel
        }        
        return party
    }

}
</script>

<style scoped lang="scss">    

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