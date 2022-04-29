<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>

            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>
           
        </div>

        <b-card class="mb-4 bg-white border-white text-dark"> 
            <b-card no-body class="border-white">
                <b-row class="mb-2 ml-1" style="margin-left: -0.25rem !important;">   
                    <b-col cols="10" :class="state.originalJudgeNames !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="List the judge(s) who made the order:" 
                            label-for="judges">
                            <span 
                                v-if="form12Info.originalJudgeNames && form12Info.originalJudgeNames.length == 0 && !AddNewOriginalJudgeNamesForm" 
                                id="judges" 
                                class="text-muted ml-2 my-2">No judges have been listed.
                            </span>
                            <b-table
                                v-else-if="form12Info.originalJudgeNames && form12Info.originalJudgeNames.length > 0"
                                :key="updated"                                
                                id="judges"
                                :items="form12Info.originalJudgeNames"
                                :fields="nameFields"
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
                                            @click="removeOriginalJudgeNames(data.item)">
                                            <b-icon 
                                                icon="trash-fill" 
                                                font-scale="1.25" 
                                                variant="danger"/>
                                        </b-button>
                                        <b-button 
                                            size="sm" 
                                            variant="transparent" 
                                            @click="editOriginalJudgeNames(data)">
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
                                        :border-variant="addOriginalJudgeNamesFormColor" 
                                        style="border:2px solid;">
                                        <add-judge-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateJudge="false" 
                                            v-on:submit="modifyOriginalJudgeNames" 
                                            v-on:cancel="closeOriginalJudgeNamesForm" />
                                    </b-card>
                                </template>
                            </b-table> 
                        </b-form-group>
                    </b-col>  
                    <b-col>           
                        <b-button 
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%; float: right;"
                            v-if="!AddNewOriginalJudgeNamesForm" 
                            size="sm" 
                            variant="court" 
                            @click="addNewOriginalJudgeNames">
                            <b-icon icon="plus"/>Add Judge Names</b-button>
                    </b-col>
                </b-row>
            </b-card>           

            <b-card 
                v-if="AddNewOriginalJudgeNamesForm" 
                id="addJudgeForm" 
                class="my-1 ml-4" 
                :border-variant="addOriginalJudgeNamesFormColor" 
                style="border:2px solid;" 
                body-class="px-1 py-1">
                <add-judge-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateJudge="true" 
                    v-on:submit="modifyOriginalJudgeNames" 
                    v-on:cancel="closeOriginalJudgeNamesForm" />                
            </b-card>
        </b-card>

        <!-- <b-card class="mb-4 bg-white border-white text-dark"> 
            <b-card no-body class="border-white">
                <b-row class="mb-2 ml-1" style="margin-left: -0.25rem !important;">   
                    <b-col cols="10" :class="state.originalJudgeNames !=null?'border-danger':''">
                        <b-form-group
                            class="labels"                
                            label="List the judge(s) who made the order:" 
                            label-for="judges">
                            <span 
                                v-if="form12Info.originalJudgeNames && form12Info.originalJudgeNames.length == 0 && !AddNewOriginalJudgeNamesForm" 
                                id="judges" 
                                class="text-muted ml-2 my-2">No judges have been listed.
                            </span>
                            <b-table
                                v-else-if="form12Info.originalJudgeNames && form12Info.originalJudgeNames.length > 0"
                                :key="updated"                                
                                id="judges"
                                :items="form12Info.originalJudgeNames"
                                :fields="nameFields"
                                head-row-variant="primary"
                                borderless    
                                small                                            
                                responsive="sm"
                                >

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
                                            @click="removeOriginalJudgeNames(data)">
                                            <b-icon 
                                                icon="trash-fill" 
                                                font-scale="1.25" 
                                                variant="danger"/>
                                        </b-button>
                                        <b-button 
                                            size="sm" 
                                            variant="transparent" 
                                            @click="editOriginalJudgeNames(data)">
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
                                        :border-variant="addOriginalJudgeNamesFormColor" 
                                        style="border:2px solid;">
                                        <add-judge-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateJudge="false" 
                                            v-on:submit="modifyOriginalJudgeNames" 
                                            v-on:cancel="closeOriginalJudgeNamesForm" />
                                    </b-card>
                                </template>
                            </b-table> 
                        </b-form-group>
                    </b-col>  
                    <b-col>           
                        <b-button 
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%; float: right;"
                            v-if="!AddNewOriginalJudgeNamesForm" 
                            size="sm" 
                            variant="court" 
                            @click="addNewOriginalJudgeNames">
                            <b-icon icon="plus"/>Add Judge Names</b-button>
                    </b-col>
                </b-row>
            </b-card>           

            <b-card 
                v-if="AddNewOriginalJudgeNamesForm" 
                id="addJudgeForm" 
                class="my-1 ml-4" 
                :border-variant="addOriginalJudgeNamesFormColor" 
                style="border:2px solid;" 
                body-class="px-1 py-1">
                <add-judge-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateJudge="true" 
                    v-on:submit="modifyOriginalJudgeNames" 
                    v-on:cancel="closeOriginalJudgeNamesForm" />                
            </b-card>
        </b-card> -->

        <div v-if="form12Info !=null">

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of the party(ies) bringing the application:                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group 
                        stacked               
                        style="width:100%" 
                        @change="updateOtherParties"
                        :state="state.filingParties"              
                        v-model="form12Info.filingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>                    
                    
                </b-col>
            </b-row> 

        </div>

        <div v-if="form12Info.filingParties && form12Info.filingParties.length > 0">

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Date of the order:
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Chamber applications begin at 9:30AM"/>
                </b-col>
                <b-col>                   
                    <b-card                        
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="state.originalJudgementDate == false?'danger': 'dark'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form12Info.originalJudgementDate"                           
                                    color="warning"             
                                    :allowed-dates="allowedOrderDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Location where the application will be heard:                                
                </b-col>
                <b-col class="ml-1 mt-2">  
                    <b-form-select
                        :state="state.hearingLocation"                                                                                                          
                        v-model="form12Info.hearingLocation">
                            <b-form-select-option
                                v-for="location in locationsInfo" 
                                :key="location.id"
                                :value="location">
                                    {{location.name}}
                            </b-form-select-option>    
                    </b-form-select>
                    
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
                        class="mt-2" 
                        style="padding: 0; float: left;" 
                        :border-variant="state.hearingDate == false?'danger': 'dark'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form12Info.hearingDate"                           
                                    color="warning"             
                                    :allowed-dates="allowedHearingDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>



            <!-- <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col :class="state.abandonType==false?'border border-danger ml-1': 'ml-1'">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form12Info.abandonType"                    
                        :options="abandonTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row> -->

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Which party(ies) are appearing?                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group 
                        :key="updated"               
                        style="width:100%" 
                        stacked
                        :state="state.appearingParties"                   
                        v-model="form12Info.appearingParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                    
                </b-col>
            </b-row> 

            <b-row v-if="form12Info.originalJudgeNames.length > 0" class="mt-4 question">
                <b-col cols="7" class="labels">
                    Whose order are you varying?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group 
                        :key="updated"               
                        style="width:100%" 
                        stacked
                        :state="state.judgeName"                   
                        v-model="form12Info.judgeName"                    
                        :options="form12Info.originalJudgeNames">
                    </b-form-radio-group>
                </b-col>
            </b-row> 

            <b-row v-if="form12Info.judgeName && form12Info.judgeName.length > 0" class="mt-4 question">
                <b-col cols="7" class="labels">
                    The order to vary the order of Mr./Madam Justice {{form12Info.judgeName}}:
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group
                        :state="state.orderAllowed"                 
                        v-model="form12Info.orderAllowed"
                        :options="allowedOptions"                
                    ></b-form-radio-group>
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
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import { form12DataInfoType } from '@/types/Information/Form12';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import { locationsInfoType } from '@/types/Common';

import AddJudgeForm from './AddJudgeForm.vue';
import AddPartyForm from './AddPartyForm.vue';

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
    public locationsInfo!: locationsInfoType[];  

    @form12State.State
    public form12Info: form12DataInfoType;

    @form12State.State
    public currentOrder: previousCourtJsonInfoType;

    @form12State.Action
    public UpdateForm12Info!: (newForm12Info: form12DataInfoType) => void  
    
    @form12State.State
    public currentOrderToVarySingleJusticeId: string;

    @form12State.Action
    public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    updated=0;

    addOriginalJudgeNamesFormColor = 'court';
    AddNewOriginalJudgeNamesForm = false;
    latestEditOriginalJudgeNamesData;
    isEditOriginalJudgeNamesOpen = false;

    allowedOptions = [
        {text: 'Allowed', value: true},
        {text: 'Dismissed', value: false}
    ];

    nameFields = [
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
        originalJudgeNames: null,
        originalJudgementLocation: null,
        originalJudgementDate: null,
        hearingLocation: null,     
        hearingDate: null,
        filingParties: null,
        judgeName: null,
        appearingParties: null,
        orderAllowed: null,
        furtherOrders: null
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();                
    }

    async getForm12Data() {
        
        this.$http.get('/form12/forms/'+this.currentOrderToVarySingleJusticeId+'/')
        .then((response) => {
            if(response?.data?.data){ 
                const form12Data = response.data.data                
                this.UpdateForm12Info(form12Data); 
                this.extractPartiesData();
                this.clearStates(); 
            }                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            originalJudgeNames: null,
            originalJudgementLocation: null,
            originalJudgementDate: null,
            hearingLocation: null,     
            hearingDate: null,
            filingParties: null,
            judgeName: null,
            appearingParties: null,
            orderAllowed: null,
            furtherOrders: null            
        }
        this.dataReady = true; 
    }

    async extractInfo(){

        if(this.currentOrderToVarySingleJusticeId){
            await this.getForm12Data();
        } else {            
             
            const form12Data = {} as form12DataInfoType;
            form12Data.appellants = this.partiesJson.appellants;
            form12Data.respondents = this.partiesJson.respondents;
            form12Data.formSevenNumber = this.fileNumber;            
            form12Data.version = this.$store.state.Application.version;
            form12Data.originalJudgeNames = [];
            form12Data.filingParties = [];
            form12Data.appearingParties = [];
            this.UpdateForm12Info(form12Data);           
            this.saveForm(true);
            
        } 
    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];               

        for (const applicant of this.form12Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);
        }

        for (const respondent of this.form12Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name);            
        }        
        this.dataReady = true;
    }  

    public checkStates(){ 
        this.state.hearingLocation = !this.form12Info.hearingLocation? false : null;
        this.state.hearingDate = !this.form12Info.hearingDate? false : null;
        this.state.filingParties = (this.form12Info.filingParties.length == 0)? false : null; 
        this.state.judgeName = !this.form12Info.judgeName? false : null;
        this.state.appearingParties = (this.form12Info.appearingParties.length == 0)? false : null; 
        this.state.orderAllowed = this.form12Info.orderAllowed == null? false : null;           
        this.state.furtherOrders = !this.form12Info.furtherOrders? false : null; 
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        const url = this.currentOrderToVarySingleJusticeId? ('/form12/forms/'+this.currentOrderToVarySingleJusticeId+'/') : '/case/';
        const method = this.currentOrderToVarySingleJusticeId? "put" : "post"
        const body = {
            type: "form-12",
            status:"Draft",
            description:"form12",
            data: this.form12Info
        }  

        const options = {
            method: method,
            url: url,
            data: body
        }       
            
        // if (this.currentOrderToVarySingleJusticeId && !draft && !this.checkStates()){               
        //     return                
        // }             
        
        this.saveInfo(options, draft);              
       
    }

    public saveInfo(options, draft){

        // this.$http(options)
        //     .then(response => {
        //         if(response.data){
        //             if(options.method == "post"){
        //                 this.UpdateCurrentOrderToVarySingleJusticeId(response.data.case_id);
                        this.extractPartiesData();                       
        //             }
                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
            //     }
            // }, err => {
            //     const errMsg = err.response.data.error;                
            // })
    }   

    public updateOtherParties(){

        const otherParties = [];

        // if (this.partyNames.length == this.form6Info.abandoningParties?.length){

        //     this.invalidAbandoningParties = true;

        // } else {

            //this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form12Info.filingParties?.indexOf(partyName)
                if (index != -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        // }        
    }

    public addNewOriginalJudgeNames(){
        if(this.isEditOriginalJudgeNamesOpen){            
            this.addOriginalJudgeNamesFormColor = 'danger'
        }else{
            this.AddNewOriginalJudgeNamesForm = true;            
        }
    }

    public editOriginalJudgeNames(data) {
        console.log(data)
        if(this.AddNewOriginalJudgeNamesForm || this.isEditOriginalJudgeNamesOpen){            
            this.addOriginalJudgeNamesFormColor = 'danger';                     
        }else if(!this.isEditOriginalJudgeNamesOpen && !data.detailsShowing){
            console.log(data);
            data.toggleDetails();
            this.isEditOriginalJudgeNamesOpen = true;
            this.latestEditOriginalJudgeNamesData = data;            
        }   
    }

    public modifyOriginalJudgeNames(isCreateOriginalJudgeNames: boolean, newOriginalJudgeName: string, index: number){        

        if (isCreateOriginalJudgeNames){
            
            const form12Data = this.form12Info;
            form12Data.originalJudgeNames.push(newOriginalJudgeName)
            
            this.UpdateForm12Info(form12Data)

            this.closeOriginalJudgeNamesForm();

        } else { 
            
            const form12Data = this.form12Info;            
            form12Data.originalJudgeNames[index] = newOriginalJudgeName;
           
            this.UpdateForm12Info(form12Data);
                      
            this.closeOriginalJudgeNamesForm();
        }
        this.updated ++;
    }

    public removeOriginalJudgeNames(data){ 
        const form12Data = this.form12Info;       
        form12Data.originalJudgeNames.splice(data.index,1);
        
        this.UpdateForm12Info(form12Data);
        this.updated ++;        
    }

    public closeOriginalJudgeNamesForm() {                     
        this.AddNewOriginalJudgeNamesForm= false; 
        this.addOriginalJudgeNamesFormColor = 'court'
        if(this.isEditOriginalJudgeNamesOpen){
            this.latestEditOriginalJudgeNamesData.toggleDetails();
            this.isEditOriginalJudgeNamesOpen = false;
        } 
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form12"}) 
    }

    public allowedHearingDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date >= day);           
    }

    public allowedOrderDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date <= day);           
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
        margin-left: 1.15rem !important;
    }

</style>