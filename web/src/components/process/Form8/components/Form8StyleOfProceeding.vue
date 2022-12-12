<template>
    <b-card no-body v-if="dataReady" class="border-white bg-white">
        <b-card class="border-white bg-white"> 
            <b-card class="bg-light border-0">
                <h2 class="ml-3 mt-2 text-primary" >Style of Proceeding (Parties) in Case</h2>
                
                <b-row class="mt-4 ml-1" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form8Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3 ml-1" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form8Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>         
            </b-card>

            <b-row class="mt-4 mx-5 bg-info p-3" style="border-radius: 1rem;">
                <b-col cols="1">
                    <b-icon-question-circle-fill style="margin-top: 3rem;" class="ml-3" scale="4" variant="primary"/>
                </b-col>
                <b-col>                    
                    <div style="margin-bottom: 0.75rem;">
                        An application to vary is heard by a division of the court. Contact the court 
                        scheduler to obtain an application hearing date and time.
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        Communicate with the other party or parties to ensure they are available on 
                        the requested date. Applications to vary are to be no more than 30 minutes.
                    </div>
                
                </b-col>
            </b-row>
            
        </b-card>       

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Name of the party(ies) bringing the application:                                
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-checkbox-group 
                    stacked
                    @change="recheckStates()"               
                    style="width:100%" 
                    :state="state.filingParties"              
                    v-model="form8Info.filingParties"                    
                    :options="partyNames">
                </b-form-checkbox-group>                    
                
            </b-col>
        </b-row>            

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Who made the Order?
            </b-col>
            <b-col class="ml-1 mt-2">
                
                <b-form-select 
                        stacked               
                        style="width:100%"
                        :state="state.judgeName"                                   
                        v-model="form8Info.judgeName"
                        @change="recheckStates()"
                        text-field="text"
                        value-field="text"                    
                        :options="justiceNameOptions">                            
                    </b-form-select>
                    <b-row v-if="form8Info.judgeName == 'Other'" class="m-0 p-0">
                        <div style="width:25%;" class="mt-3 ml-1">Other Name:</div>
                        <div style="width:74%;">
                            <b-form-input 
                                style="margin-top:0.5rem;"
                                @change="recheckStates()"                                
                                :state="state.judgeNameOther"
                                v-model="form8Info.judgeNameOther" 
                            />
                        </div>
                    </b-row> 
                    <span
                        v-if="(state.judgeName != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify who made the order.
                    </span>
            </b-col>
        </b-row>  

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Date the order under appeal was pronounced:
            </b-col>
            <b-col class="ml-1 mt-2">
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
                    v-if="isPastDeadline">You may need to apply to extend the time to vary the order.</span>
            </b-col>
        </b-row>                   

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Name of lawyer or party authorizing filing of this Form: 
                            
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-input 
                    @change="recheckStates()"                   
                    v-model="form8Info.authorizedName"                        
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
import moment from 'moment-timezone';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import { form8DataInfoType } from '@/types/Information/Form8';
import { chambersHearingJsonInfoType, partiesDataJsonDataType } from '@/types/Information/json';
import {justiceNames} from '@/components/utils/JusticeName';

@Component
export default class Form8StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @form8State.State
    public currentOrder: chambersHearingJsonInfoType;  

    @informationState.State
    public fileNumber: string;

    @form8State.State
    public form8Info: form8DataInfoType;

    @form8State.Action
    public UpdateForm8Info!: (newForm8Info: form8DataInfoType) => void  
    
    @form8State.State
    public currentNoticeOfApplicationToVaryId: string;

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void
    
    dataReady = false;    
    partyNames: string[] = [];  
    updateOrderDetails = 0;
    orderDateValue = '';

    state = {        
        filingParties:null,         
        authorizedName:null,
        orderDate: null,
        judgeName: null,
        judgeNameOther: null
    }  

    justiceNameOptions = [];
    
    created(){
        this.justiceNameOptions = justiceNames
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public updateOrderDate(){       
        this.form8Info.orderDate = this.orderDateValue;        
        this.updateOrderDetails ++;
        this.recheckStates()
    }

    public extractInfo(){       

        if(this.currentNoticeOfApplicationToVaryId){
            this.getForm8Data();
           
        } else {   
            
            const form8Data = {} as form8DataInfoType;

            form8Data.appellants = this.partiesJson.appellants
            form8Data.respondents = this.partiesJson.respondents;
            form8Data.formSevenNumber = this.fileNumber;
            
            form8Data.version = this.$store.state.Application.version;  
            
            const judgeName = this.currentOrder && this.currentOrder.JudgeLastName? (
                (this.currentOrder.JudgeSalutation? this.currentOrder.JudgeSalutation+' ':'Justice ')
                +this.currentOrder.JudgeLastName
            ).trim() : ''

            if(judgeName){
                const justiceIndex = justiceNames.findIndex(name=> name.toLowerCase().includes(judgeName.toLowerCase()))
                if(justiceIndex>-1){
                    form8Data.judgeName = justiceNames[justiceIndex]
                    form8Data.judgeNameOther=''
                }
                else{
                    form8Data.judgeName='Other'
                    form8Data.judgeNameOther=judgeName
                }
            } else {
                form8Data.judgeName='';
                form8Data.judgeNameOther='';
            }

            const orderDate = this.currentOrder?.JudgmentDate?this.currentOrder.JudgmentDate.slice(0,10):'';
            form8Data.orderDate = orderDate;
            this.orderDateValue = orderDate; 

            let applicantNames = [];
            let respondentNames = [];
            
            for (const respondent of form8Data.respondents){
                respondentNames.push(respondent.name);
            }

            for (const applicant of form8Data.appellants){ 
                applicantNames.push(applicant.name);
            }

            form8Data.respondentNames = respondentNames.join(', ');
            form8Data.appellantNames = applicantNames.join(', ');
  
            this.UpdateForm8Info(form8Data);                       
            this.saveForm(true);
        }
    }

    get isPastDeadline(){

        const today = new Date();
        const orderDate = new Date(this.form8Info.orderDate);

        const TimePast = today.getTime() - orderDate.getTime();
        const daysPast = TimePast / (1000 * 3600 * 24);        
        
        return daysPast > 30;
    }

    public extractPartiesData(){
        
        this.partyNames = [];

        for (const respondent of this.form8Info.respondents){          
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form8Info.appellants){           
            this.partyNames.push(applicant.name);  
        }       
        this.dataReady = true;
    }

    public getForm8Data() {        
       
        this.$http.get('/form8/forms/'+this.currentNoticeOfApplicationToVaryId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form8Data = response.data.data    
                this.orderDateValue = form8Data.orderDate? form8Data.orderDate.slice(0,10): '';
                this.UpdateForm8Info(form8Data) 
                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

     public clearStates(){
        this.state = {            
            filingParties:null,
            orderDate: null,
            judgeName: null,  
            judgeNameOther: null,               
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date <= day);           
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

        this.state.filingParties = this.form8Info.filingParties?.length>0? null :false; 
        this.state.orderDate = this.form8Info.orderDate? null:false;
        
        this.state.judgeName = this.form8Info.judgeName? null :false;
        this.state.judgeNameOther = this.form8Info.judgeName=='Other' && !this.form8Info.judgeNameOther? false: null;
        
        this.state.authorizedName = !this.form8Info.authorizedName? false : null;       
        
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
        let url = '/form8/forms';

        if (this.currentNoticeOfApplicationToVaryId){
            method = 'put';
            url = '/form8/forms/'+this.currentNoticeOfApplicationToVaryId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form8Info,
                    type:'Form8',
                    description:'Notice of Application to Vary an Order of a Justice'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form8Info,
                    type:'Form8',
                    description:'Notice of Application to Vary an Order of a Justice'
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
                        this.UpdateCurrentNoticeOfApplicationToVaryId(response.data.file_id);
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
        this.$router.push({name: "preview-form8"}) 
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