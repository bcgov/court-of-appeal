<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>

                
                <b-row  class="mt-4" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
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
                        v-model="form5Info.firstAppellant"                    
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
                        v-model="form5Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <p class="mt-5 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?">
                <b-form-radio-group
                    :class="state.selfRepresented==false?'border border-danger is-invalid w-50':''"
                    style="max-width:75%"
                    @change="recheckStates()"                   
                    v-model="form5Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form5Info.selfRepresented !=null">
            <p  
                class="mt-5"
                style="font-weight: 700;"
                >Court House Location: 
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="The address of the courthouse where the appeal will be heard."/>            
            </p>           

            <b-form-group 
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Select the registry location." 
                label-for="registry">
                <b-form-select 
                    id="registry"
                    @change="recheckStates()"
                    style="width:300%" 
                    :state="state.courtHouse"                   
                    v-model="form5Info.courtHouse"                    
                    :options="courtHouseNames">
                </b-form-select>
            </b-form-group>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">Time of Hearing: 
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="The default value is 10:00AM."/>            
                </b-col>
                <b-col class="ml-1">
                    <b-form-timepicker 
                        style="width: 12rem;"  
                        v-model="form5Info.timeOfAppealHearing"
                        :state="state.timeOfAppealHearing"
                        locale="en">
                    </b-form-timepicker>
                    <!-- <b-form-input    
                        style="width: 8rem;"                    
                        v-model="form5Info.timeOfAppealHearing"                            
                        size="md"
                        type="time"
                        autocomplete="off"
                        @paste.prevent
                        :formatter="timeFormat"
                        placeholder="HH:MM*"
                        :state="state.timeOfAppealHearing"
                    ></b-form-input> -->

                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col cols="3" style="font-weight: 700;">Date the Appeal will be Heard: 
                                
                </b-col>
                <b-col class="ml-3" style="padding: 0;">  
                    <b-card 
                        :class="state.dateOfAppealHearing == false?'border border-danger is-invalid': 'muted'"
                        style="padding: 0; margin:1rem 0 0 0.2rem; float: left;">
                        <div class="vuetify">                            
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form5Info.dateOfAppealHearing"                           
                                    color="warning"
                                    @change="recheckStates()"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app> 
                        </div>   
                    </b-card>
                </b-col>
            </b-row>

            <p  
                style="font-weight: 700;"
                class="mt-5"
                >Estimated length of appeal in days
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="If days are unknown to enter 0, however both estimates cannot be 0 one of them must have a 'real' number."/> 
                    <br>
                    <span style="font-size: 9pt; padding: 0; font-weight: 400;">
                        Can enter intergers of half or full days (ie: 1.5 days, 2 days, 2.5 days BUT NOT 2.75 days, etc)
                    </span> 
            </p>
             

            <b-row class="ml-2">
                <b-col cols="3" >Appellant's estimate:<span class="text-danger">*</span> 
                                
                </b-col>
                <b-col class="p-0">            
                    
                    <b-form-input    
                        style="width: 8rem;"                    
                        v-model="form5Info.numberOfDaysApp"                            
                        size="md"
                        type="text"
                        @change="recheckStates()"
                        autocomplete="off"
                        @paste.prevent
                        :state = "state.numberOfDaysApp"
                    ></b-form-input>
                    <div v-if="state.numberOfDaysApp==false" style="font-size:8pt" class="mt-0 text-danger"> Numbers only </div>
                    
                </b-col>
            </b-row>      

            <b-row class="ml-2 mt-2">
                <b-col cols="3" >Respondent's estimate:<span class="text-danger">*</span> 
                                
                </b-col>
                <b-col class="p-0">            
                    
                    <b-form-input    
                        style="width: 8rem;"                    
                        v-model="form5Info.numberOfDaysResp"                            
                        size="md"
                        type="text"
                        @change="recheckStates()"
                        autocomplete="off"
                        @paste.prevent
                        :state="state.numberOfDaysRes"
                    ></b-form-input>
                    <div v-if="state.numberOfDaysRes==false" style="font-size:8pt" class="mt-0 text-danger"> Numbers only </div>
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-form-group>
                    <span class="ml-3">I agree to pay all hearing fees payable under Item 4 of Division 1 of Schedule 2-Court Fees.</span>	
                    <b-form-checkbox
                        class="ml-4"
                        style="display: inline;"
                        size="lg"
                        @change="recheckStates()"									
                        v-model="form5Info.acknowledge"
                        :state="state.acknowledge"
                        >  
                    </b-form-checkbox>
                    <span v-if="state.acknowledge==false" class="text-danger"> acknowledgment required !</span>						
                </b-form-group>
            </b-row>

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input 
                        @change="recheckStates()"                   
                        v-model="form5Info.authorizedName"                        
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
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import { form5DataInfoType } from '@/types/Information/Form5';
import { partiesDataJsonDataType } from '@/types/Information/json';
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

@Component
export default class Form5StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form5State.State
    public form5Info: form5DataInfoType;
    
    @form5State.State
    public currentNoticeOfHearingOfAppealId: string;

     @form5State.Action
    public UpdateForm5Info!: (newForm5Info: form5DataInfoType) => void 

    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];   
 
    representationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    courtHouseNames = [
        {text: 'Vancouver Registry', value: 'Vancouver Registry, BC Court of Appeal, The Law Courts, 400-800 Hornby Street, Vancouver, BC, V6Z 2C5'},
        {text: 'Victoria Registry', value: 'Victoria Registry, 2nd Flr, 850 Burdett Ave., Victoria, BC, V8W 9J2'}
    ];

    state = {
        firstAppellant:null,
        firstRespondent:null,
        courtHouse:null,
        timeOfAppealHearing: null,
        dateOfAppealHearing: null,
        numberOfDaysApp: null,
        numberOfDaysRes: null,
        acknowledge: null,
        authorizedName:null,
        selfRepresented: null
    }

    respondentName = ""; 
    updated=0;

    mounted() {
        this.dataReady = false;
        if(this.currentNoticeOfHearingOfAppealId){

            this.getForm5Data();  

        } else {  

            const form5Data = {} as form5DataInfoType;

            form5Data.appellants = this.partiesJson.appellants;
            form5Data.respondents = this.partiesJson.respondents;
            form5Data.formSevenNumber = this.fileNumber;
            
            form5Data.version = this.$store.state.Application.version;
            form5Data.selfRepresented = this.$store.state.Common.userSelfRepresented;
            form5Data.timeOfAppealHearing = '10:00';
            form5Data.acknowledge = false; 
            this.UpdateForm5Info(form5Data); 
            this.saveForm(true);
        }      
    }

    public extractInfo(){    

        this.applicantNames = [];
        this.respondentNames = [];

        for (const respondent of this.form5Info.respondents){
            this.respondentNames.push(respondent.name);  
        }

        for (const applicant of this.form5Info.appellants){
            this.applicantNames.push(applicant.name);  
        }
        this.dataReady = true;       

    }

    public getForm5Data() {        
       
        this.$http.get('/form5/forms/'+this.currentNoticeOfHearingOfAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form5Data = response.data.data 
                const today = moment().format("YYYY-MM-DD")
                if(form5Data.dateOfAppealHearing<today){
                    form5Data.dateOfAppealHearing=null;
                }
                this.UpdateForm5Info(form5Data) 
                this.extractInfo();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            firstAppellant:null,
            firstRespondent:null,
            courtHouse:null,
            timeOfAppealHearing: null,
            dateOfAppealHearing: null,
            numberOfDaysApp: null,
            numberOfDaysRes: null,
            acknowledge: null,
            authorizedName:null,
            selfRepresented: null
        }
        this.dataReady = true; 
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');           
        return (date >= day);           
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

        this.state.courtHouse = !this.form5Info.courtHouse? false : null;
        this.state.firstAppellant = !this.form5Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form5Info.firstRespondent? false : null;
        //console.log(this.form5Info.timeOfAppealHearing)
        if(this.form5Info.timeOfAppealHearing?.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:?[0-5]?[0-9]?$")){
            this.state.timeOfAppealHearing = null;            
        }
        else
            this.state.timeOfAppealHearing =false;
        
        this.state.dateOfAppealHearing = this.form5Info.dateOfAppealHearing && this.allowedDates(this.form5Info.dateOfAppealHearing)? null: false;
        
        const numberOfDaysApp = this.form5Info.numberOfDaysApp?.trim();
        this.state.numberOfDaysApp = this.checkDay(numberOfDaysApp)==false? false : null;

        const numberOfDaysRes = this.form5Info.numberOfDaysResp?.trim();
        this.state.numberOfDaysRes = this.checkDay(numberOfDaysRes)==false? false : null;

        this.state.acknowledge = !this.form5Info.acknowledge? false : null; 
        this.state.authorizedName = !this.form5Info.authorizedName? false : null;       
        this.state.selfRepresented = this.form5Info.selfRepresented != null? null: false;

        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true            
    }

    public checkDay(day: string){

        let valid = false;
        if (day && (Number(day) % 1 == 0 || Number(day) % 1 == 0.5)){
            valid = true;
        }       

        return valid;
    }

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form5/forms';

        if (this.currentNoticeOfHearingOfAppealId){
            method = 'put';
            url = '/form5/forms/'+this.currentNoticeOfHearingOfAppealId;               

            if (!draft && !this.checkStates()){
                return
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form5Info,
                    type:'Form5',
                    description:'Notice of Hearing of Appeal'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form5Info,
                    type:'Form5',
                    description:'Notice of Hearing of Appeal'
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
                        this.UpdateCurrentNoticeOfHearingOfAppealId(response.data.file_id);
                        this.extractInfo();                        
                    }

                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }

    public timeFormat(value , event){        
        // if(isNaN(Number(value.slice(-1))) && value.slice(-1) != ':') return value.slice(0,-1) 
        // if(value.length!=3 && value.slice(-1) == ':') return value.slice(0,-1);
        // if(value.length==2 && event.data && value.slice(0,1)>=6 && value.slice(-1)>=6) return value.slice(0,-1);
        // if(value.length==2 && event.data && value.slice(-1)<6) return '0'+value.slice(0,1)+':'+value.slice(1,2);
        // if(value.length==2 && event.data && value.slice(0,1)>=2 && value.slice(0,1)<6 && value.slice(-1)>=6) return '00:'+value.slice(0,2);            
        // if(value.length==2 && event.data && value.slice(0,1)<2 && value.slice(-1)>=6) return value.slice(0,2)+':';
        // if(value.length==4 && value.slice(-1)>=6) return value.slice(0,-1);
        // if(value.length==3 && value.slice(0,1)!=':' && value.slice(1,2)!=':' && value.slice(-1)<6) return value.slice(0,2)+':'+value.slice(2,3);
        // if(value.length==3 && value.slice(-1)>=6 ) return value.slice(0,-1);
        // if(value.length==6 && value.slice(0,1)==0 && value.slice(4,6)<60 && (value.slice(1,2)+value.slice(3,4))<24) return value.slice(1,2)+value.slice(3,4)+':'+value.slice(4,5)+value.slice(5,6);           
        // if(value.length>5) return value.slice(0,5);
        // if(value.length==5 && (value.slice(0,2)>=24 || value.slice(3,5)>=60)) return '';
        // if(value.length==5 && ( isNaN(value.slice(0,2)) || isNaN(value.slice(3,5)) || value.slice(2,3)!=':') )return '';
        // if(value.length==4 && ( isNaN(value.slice(0,2)) || isNaN(value.slice(3,4)) || value.slice(2,3)!=':') )return '';
        return value
    }

    public dayFormat(value , event){
        return value;
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form5"}) 
    }

}
</script>

<style lang="scss" scoped>
    :deep(.vuetify){
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    }
</style>

