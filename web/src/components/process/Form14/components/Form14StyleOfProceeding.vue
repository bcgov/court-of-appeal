<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">              

<!-- <PARTIES> -->
        <b-card class="mb-4 bg-white border-white text-dark"> 

<!-- <Appellants> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.appellantsInfo !=null?'border border-danger':''">
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
                            v-if="form14Info.appellants.length == 0 && !AddNewAppellantForm"
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form14Info.appellants.length > 0"
                            class="mt-2"
                            style="font-size: 16px;"
                            :items="form14Info.appellants"
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
                <b-col cols="10" :class="state.respondentsInfo !=null?'border border-danger':''">
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
                            v-if="form14Info.respondents.length == 0 && !AddNewRespondentForm" 
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form14Info.respondents.length > 0"
                            class="mt-2"
                            :items="form14Info.respondents"
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
        <!-- {{partyNames}} -->
        
        <div v-if="this.form14Info.appellants && this.form14Info.appellants.length>0 && this.form14Info.respondents && this.form14Info.respondents.length>0">
            <p style="font-size: 1.25rem; margin:0 0 0 1rem;">Style of Proceeding (Parties) in Case</p>

<!-- <BETWEEN> -->
            <b-row class="mt-4 ml-1" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form14Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
<!-- <AND> -->
            <b-row class="mt-3 ml-1" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form14Info.respondentNames}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>  


<!-- <seeking to have removed from the inactive list> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What are you seeking to have removed from the inactive list?                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked                                       
                        style="width:100%"                        
                        :state="state.seekingRemoved"   
                        :options="seekingRemovedOptions"                                   
                        v-model="form14Info.seekingRemoved">
                        <!-- <b-form-checkbox
                            :value="partyname" 
                            v-for="partyname,inx in partyNames" 
                            :key="'party-made-app-'+inx">
                            {{partyname.name}}
                        </b-form-checkbox> -->
                    </b-form-checkbox-group> 
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
                        @change="updated++"                       
                        :state="state.signingParties"                                      
                        v-model="form14Info.signingParties">

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

import "@/store/modules/forms/form14";
const form14State = namespace("Form14");

import { form14DataInfoType, form14PartiesInfoType } from '@/types/Information/Form14';
import { partiesDataJsonDataType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddPartyModal from './AddPartyModal.vue';

@Component({
    components:{
        AddPartyForm,
        AddPartyModal        
    }
})
export default class Form14StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @form14State.State
    public form14Info: form14DataInfoType;

    @form14State.Action
    public UpdateForm14Info!: (newForm14Info: form14DataInfoType) => void  
    
    @form14State.State
    public currentConsentOrderRemoveInactiveId: string;

    @form14State.Action
    public UpdateCurrentConsentOrderRemoveInactiveId!: (newCurrentConsentOrderRemoveInactiveId: string) => void
    
    dataReady = false;
    updated=0;     
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form14PartiesInfoType[] = [];
    

    partyToEdit = {} as form14PartiesInfoType;
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

    state = { 
        appellantsInfo: null,
        respondentsInfo: null,
        seekingRemoved: null,
        signingParties: null       
    }    

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }
    
    public extractInfo(){       

        if(this.currentConsentOrderRemoveInactiveId){
            this.getForm14Data();
           
        } else { 

            const form14Data = this.form14Info;            
            form14Data.version = this.$store.state.Application.version;
            form14Data.seekingRemoved = [];
            form14Data.signingParties = []; 
            form14Data.appellants = this.partiesJson.appellants
            form14Data.respondents = this.partiesJson.respondents
            form14Data.formSevenNumber = this.fileNumber; 
            form14Data.orderDate = moment().format("YYYY-MM-DD")
            
            this.UpdateForm14Info(form14Data);           
            this.revaluateForm14Data();            
            this.saveForm(true);
        }          
    }

    public revaluateForm14Data(){

        const form14Data = this.form14Info;

        for (const respondent of form14Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form14Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form14Data.appellants.map(resp=>resp.name)
        const respondents = form14Data.respondents.map(resp=>resp.name)
        form14Data.appellantNames = appellants.join(', ');
        form14Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form14Data.appellants, ...form14Data.respondents]
        this.UpdateForm14Info(form14Data);
    }

    public getForm14Data() {        
       
        this.$http.get('/form14/forms/'+this.currentConsentOrderRemoveInactiveId)
        .then((response) => {
            if(response?.data?.data){
                const form14Data = response.data.data
                this.UpdateForm14Info(form14Data);
                this.revaluateForm14Data();               
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
            seekingRemoved: null,
            signingParties: null            
        }
        this.dataReady = true; 
    }

    public checkStates(){  
        
        this.state.appellantsInfo = this.form14Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form14Info.respondents?.length>0? null :false;            
        this.state.seekingRemoved = this.form14Info.seekingRemoved?.length>0? null :false;
        this.state.signingParties = this.form14Info.signingParties?.length>0? null :false;
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    } 

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form14/forms';

        if (this.currentConsentOrderRemoveInactiveId){
            method = 'put';
            url = '/form14/forms/'+this.currentConsentOrderRemoveInactiveId;
            const form14Data = this.form14Info;            
            this.UpdateForm14Info(form14Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form14Info,
                    type:'Form14',
                    description:'Consent order to remove an appeal from the inactive list'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form14Info,
                    type:'Form14',
                    description:'Consent order to remove an appeal from the inactive list'
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
                        this.UpdateCurrentConsentOrderRemoveInactiveId(response.data.file_id); 
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
        this.partyToEdit = {} as form14PartiesInfoType
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
        const form14Data = this.form14Info;       
        form14Data.respondents.splice(data.index,1);
        form14Data.respondentNames = form14Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form14Data.appellants, ...form14Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm14Info(form14Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form14PartiesInfoType
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
        const form14Data = this.form14Info;       
        form14Data.appellants.splice(data.index,1); 
        form14Data.appellantNames = form14Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form14Data.appellants, ...form14Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm14Info(form14Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form14Info = this.form14Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form14Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form14Info.respondents.push(party);
            }
            this.UpdateForm14Info(form14Info)
        }
        this.revaluateForm14Data();
        this.showPartyWindow = false;
        this.somePartiesChanged() 
        this.updated++;
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form14"}) 
    }

    public somePartiesChanged(){   
        this.form14Info.signingParties = [];    
        this.updated++;
    }    

    public getCounselParty(party){

        if(party.counselName){
            const counsel: form14PartiesInfoType = JSON.parse(JSON.stringify(party))
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