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
                            v-if="form13Info.appellants.length == 0 && !AddNewAppellantForm"
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form13Info.appellants.length > 0"
                            class="mt-2"
                            style="font-size: 16px;"
                            :items="form13Info.appellants"
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
                            v-if="form13Info.respondents.length == 0 && !AddNewRespondentForm" 
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form13Info.respondents.length > 0"
                            class="mt-2"
                            :items="form13Info.respondents"
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
        
        <div v-if="this.form13Info.appellants && this.form13Info.appellants.length>0 && this.form13Info.respondents && this.form13Info.respondents.length>0">
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; margin:0 0 0 1rem; font-weight:600;">Style of Proceeding (Parties) in Case</p>

    <!-- <BETWEEN> -->
                <b-row class="mt-4 ml-1" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form13Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
    <!-- <AND> -->
                <b-row class="mt-3 ml-1" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form13Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row> 
            </b-card> 


<!-- <FilingParties-Made Application> -->
            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    Name of party applying to extend time:                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked 
                        @change="recheckStates(true)"                      
                        :state="state.filingParties"                                      
                        v-model="form13Info.filingParties">
                        <b-form-checkbox
                            :value="applyingparty"
                            v-for="applyingparty,inx in partyNames"
                            :key="'appling-party-'+inx">
                                {{applyingparty.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>                    
                </b-col>
            </b-row> 

<!-- <seeking extention> -->            

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What are you wanting to extend the time to file?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group 
                        stacked
                        @change="recheckStates(true)" 
                        :state="state.seekingExtension"
                        v-model="form13Info.seekingExtension"
                        :options="seekingExtensionOptions"> 
                        <b-form-checkbox value="other">
                            <b-row style="margin-left:0.1rem; width:138%"> 
                                <div style="width:15%;">other </div>
                                <div  style="width:85%;">
                                    <b-form-input size="sm"
                                        @change="recheckStates()" 
                                        :state="state.seekingExtensionOther"
                                        v-model="form13Info.seekingExtensionOther" />
                                </div>
                            </b-row>
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-col>
            </b-row>

<!-- <Extension Date> -->
            <b-row class="mt-4 question" >
                <b-col cols="7" class="labels">
                    What is the date of the extension when you want to file?
                </b-col>
                <b-col>                   
                    <b-card                        
                        :class="state.extensionDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'" 
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form13Info.extensionDate"
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
                        v-model="form13Info.signingParties">

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

import "@/store/modules/forms/form13";
const form13State = namespace("Form13");

import { form13DataInfoType, form13PartiesInfoType } from '@/types/Information/Form13';
import { partiesDataJsonDataType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddPartyModal from './AddPartyModal.vue';

@Component({
    components:{
        AddPartyForm,
        AddPartyModal        
    }
})
export default class Form13StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @form13State.State
    public form13Info: form13DataInfoType;

    @form13State.Action
    public UpdateForm13Info!: (newForm13Info: form13DataInfoType) => void  
    
    @form13State.State
    public currentConsentOrderExtendTimeId: string;

    @form13State.Action
    public UpdateCurrentConsentOrderExtendTimeId!: (newCurrentConsentOrderExtendTimeId: string) => void
    
    dataReady = false;
    updated=0;     
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form13PartiesInfoType[] = [];
    

    partyToEdit = {} as form13PartiesInfoType;
    showPartyWindow = false
    isCreate = true
    partyType = ''   
    seekingExtensionOptions = [
        'appeal record',
        'transcript',
        'factum',
        'appeal book',
        'book of authorities'
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
        filingParties: null,
        seekingExtension: null,  
        seekingExtensionOther: null, 
        extensionDate: null,
        signingParties: null               
    }    

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }
    
    public extractInfo(){       

        if(this.currentConsentOrderExtendTimeId){
            this.getForm13Data();
           
        } else { 

            const form13Data = this.form13Info;            
            form13Data.version = this.$store.state.Application.version;
            form13Data.seekingExtension = [];
            form13Data.seekingExtensionOther = '';
            form13Data.filingParties = [];
            form13Data.signingParties = [];
            form13Data.appellants = this.partiesJson.appellants
            form13Data.respondents = this.partiesJson.respondents
            form13Data.formSevenNumber = this.fileNumber; 
            form13Data.orderDate = moment().format("YYYY-MM-DD")
            
            this.UpdateForm13Info(form13Data);           
            this.revaluateForm13Data();            
            this.saveForm(true);
        }          
    }

    public revaluateForm13Data(){

        const form13Data = this.form13Info;

        for (const respondent of form13Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form13Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form13Data.appellants.map(resp=>resp.name)
        const respondents = form13Data.respondents.map(resp=>resp.name)
        form13Data.appellantNames = appellants.join(', ');
        form13Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form13Data.appellants, ...form13Data.respondents]
        this.UpdateForm13Info(form13Data);
    }

    public getForm13Data() {        
       
        this.$http.get('/form13/forms/'+this.currentConsentOrderExtendTimeId)
        .then((response) => {
            if(response?.data?.data){
                const form13Data = response.data.data
                this.UpdateForm13Info(form13Data);
                this.revaluateForm13Data();               
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
            seekingExtension: null,
            seekingExtensionOther: null,
            extensionDate: null,
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
        
        this.state.appellantsInfo = this.form13Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form13Info.respondents?.length>0? null :false;            
        this.state.seekingExtension = this.form13Info.seekingExtension?.length>0? null :false
        this.state.seekingExtensionOther = this.form13Info.seekingExtension?.includes('other') && !this.form13Info.seekingExtensionOther? false :null
        this.state.filingParties = this.form13Info.filingParties?.length>0? null :false;
        this.state.extensionDate = this.form13Info.extensionDate? null :false; 
        
        const signingParties = this.form13Info.signingParties?this.form13Info.signingParties:[];
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
        let url = '/form13/forms';

        if (this.currentConsentOrderExtendTimeId){
            method = 'put';
            url = '/form13/forms/'+this.currentConsentOrderExtendTimeId;
            const form13Data = this.form13Info;            
            this.UpdateForm13Info(form13Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form13Info,
                    type:'Form13',
                    description:'Consent order to extend time to file a document'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form13Info,
                    type:'Form13',
                    description:'Consent order to extend time to file a document'
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
                        this.UpdateCurrentConsentOrderExtendTimeId(response.data.file_id); 
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
        this.partyToEdit = {} as form13PartiesInfoType
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
        const form13Data = this.form13Info;       
        form13Data.respondents.splice(data.index,1);
        form13Data.respondentNames = form13Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form13Data.appellants, ...form13Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm13Info(form13Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form13PartiesInfoType
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
        const form13Data = this.form13Info;       
        form13Data.appellants.splice(data.index,1); 
        form13Data.appellantNames = form13Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form13Data.appellants, ...form13Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm13Info(form13Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form13Info = this.form13Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form13Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form13Info.respondents.push(party);
            }
            this.UpdateForm13Info(form13Info)
        }
        this.revaluateForm13Data();
        this.showPartyWindow = false;
        this.somePartiesChanged() 
        this.updated++;
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form13"}) 
    }

    public somePartiesChanged(){     
        this.form13Info.filingParties = [];
        this.form13Info.signingParties = [];  
        this.updated++;
    }

    public getCounselParty(party){

        if(party.counselName){
            const counsel: form13PartiesInfoType = JSON.parse(JSON.stringify(party))
            counsel.isCounsel = true
            counsel.name = counsel.counselName+', counsel for '+counsel.name
            return counsel
        }        
        return party
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date >= day);           
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