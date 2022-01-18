<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>

            
            <b-row style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>

            <b-row class="mt-3">

                <b-col cols="2" style="font-weight: 700;">Responding: 
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="The name of the party responding to the appeal."/>            
                </b-col>
                <b-col cols="10" style="font-weight: 200;">{{respondentNames.join(', ')}}</b-col>
            </b-row>

            <p class="mt-3 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?" 
                label-for="representation">
                <b-form-radio-group
                    id="representation"
                    style="max-width:75%"                   
                    v-model="form6Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form6Info.selfRepresented !=null">
            <p  
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
                    style="width:300%" 
                    :state="state.courtHouse"                   
                    v-model="form6Info.courtHouse"                    
                    :options="courtHouseNames">
                </b-form-select>
            </b-form-group>

            <b-row>
                <b-col cols="3" style="font-weight: 700;">Time of Hearing: 
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="The default value is 10:00AM."/>            
                </b-col>
                <b-col class="ml-1">            
                    
                    <b-form-input    
                        style="width: 6rem;"                    
                        v-model="form6Info.timeOfAppealHearing"                            
                        size="md"
                        type="text"
                        autocomplete="off"
                        @paste.prevent
                        :formatter="timeFormat"
                        placeholder="HH:MM*"
                        :state="state.timeOfAppealHearing"
                    ></b-form-input>
                    
                </b-col>
            </b-row>

            <b-row class="my-3" style="padding: 0;">
                <b-col cols="3" style="font-weight: 700;">Date the Appeal will be Heard: 
                                
                </b-col>
                <b-col class="ml-3" style="padding: 0;">                     

                    <b-form-datepicker
                        style="width: 20rem;" 
                        size="md"
                        v-model="form6Info.dateOfAppealHearing"
                        placeholder="Hearing Date*"
                        :state ="state.dateOfAppealHearing"                                    
                        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                        locale="en-US">
                    </b-form-datepicker>

                </b-col>
            </b-row>

            <p  
                style="font-weight: 700;"
                >Estimated length of appeal in days
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="If days are unknown to enter 0, however both estimates cannot be 0 one of them must have a 'real' number."/> 
                    <br>
                    <span style="font-size: 8pt; padding: 0; font-weight: 400;">
                        Can enter intergers of half or full days (ie: 1.5 days, 2 days, 2.5 days BUT NOT 2.75 days, etc)
                    </span> 
            </p>
             

            <b-row class="ml-2">
                <b-col cols="3" >Appellant's estimate:<span class="text-danger">*</span> 
                                
                </b-col>
                <b-col class="p-0">            
                    
                    <b-form-input    
                        style="width: 6rem;"                    
                        v-model="form6Info.numberOfDaysApp"                            
                        size="md"
                        type="text"
                        autocomplete="off"
                        @paste.prevent
                        :state = "state.numberOfDaysApp"
                    ></b-form-input>
                    
                    
                </b-col>
            </b-row>      

            <b-row class="ml-2 mt-2">
                <b-col cols="3" >Respondent's estimate:<span class="text-danger">*</span> 
                                
                </b-col>
                <b-col class="p-0">            
                    
                    <b-form-input    
                        style="width: 6rem;"                    
                        v-model="form6Info.numberOfDaysResp"                            
                        size="md"
                        type="text"
                        autocomplete="off"
                        @paste.prevent
                        :state="state.numberOfDaysRes"
                    ></b-form-input>
                    
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-form-group>
                    <span class="ml-3">I agree to pay all hearing fees payable under Item 4 of Division 1 of Schedule 2-Court Fees.</span>	
                    <b-form-checkbox
                        class="ml-5"
                        style="display: inline;"
                        size="sm"									
                        v-model="form6Info.acknowledge"
                        :state="state.acknowledge"
                        >  
                    </b-form-checkbox>						
                </b-form-group>
            </b-row>

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.authorizedName"                        
                        :state ="state.authorizedName">
                    </b-form-input>
                    <span class="ml-2" style="font-weight: 700;">Electronically filed</span>

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

import { form6DataInfoType } from '@/types/Information/Form6';
import { applicantJsonDataType, partiesDataJsonDataType, respondentsJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

@Component
export default class Form6StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @informationState.State
    public form6Info: form6DataInfoType;

    @informationState.Action
    public UpdateForm6Info!: (newForm6Info: form6DataInfoType) => void  
    
    @informationState.State
    public currentCaseId: string;

    @informationState.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    applicants: applicantJsonDataType[] = [];
    respondents: respondentsJsonDataType[] = [];
    notFound = false;
    representationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    courtHouseNames = [
        {text: 'Vancouver Registry', value: 'Vancouver Registry, BC Court of Appeal, The Law Courts, 400-800 Hornby Street, Vancouver, BC, V6Z 2C5'},
        {text: 'Victoria Registry', value: 'Victoria Registry, 2nd Flr, 850 Burdett Ave., Victoria, BC, V8W 9J2'}
    ];

    state = {
        courtHouse:null,
        timeOfAppealHearing: null,
        dateOfAppealHearing: null,
        numberOfDaysApp: null,
        numberOfDaysRes: null,
        acknowledge: null,
        authorizedName:null
    }

    respondentName = ""; 
    updated=0;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;        
    }

    public extractInfo(){

        if(this.currentCaseId){
            this.applicants = this.form6Info.appellants;
            this.respondents = this.form6Info.respondents;
        }else{
            this.applicants = this.partiesJson.appellants;
            this.respondents = this.partiesJson.respondents;            

            this.form6Info.appellants = this.applicants;
            this.form6Info.respondents = this.respondents;
            this.form6Info.formSevenNumber = this.fileNumber;
            
            this.form6Info.version = this.$store.state.Application.version;
            this.form6Info.timeOfAppealHearing = '10:00';
            this.form6Info.acknowledge = false;           
            
        }

        this.applicantNames = [];
        this.respondentNames = [];

        for (const respondent of this.respondents){
            this.respondentNames.push(respondent.name);  
        }

        for (const applicant of this.applicants){
            this.applicantNames.push(applicant.name);  
        }

    }

    public checkStates(){        

        this.state.courtHouse = !this.form6Info.courtHouse? false : null;
        this.state.timeOfAppealHearing = !this.form6Info.timeOfAppealHearing? false : null;
        this.state.dateOfAppealHearing = !this.form6Info.dateOfAppealHearing? false : null;
        
        const numberOfDaysApp = this.form6Info.numberOfDaysApp?.trim();
        this.state.numberOfDaysApp = this.checkDay(numberOfDaysApp)==false? false : null;

        const numberOfDaysRes = this.form6Info.numberOfDaysResp?.trim();
        this.state.numberOfDaysRes = this.checkDay(numberOfDaysRes)==false? false : null;

        this.state.acknowledge = !this.form6Info.acknowledge? false : null; 
        this.state.authorizedName = !this.form6Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }

    public checkDay(day: string){

        let valid = false;
        if (Number(day) % 1 == 0 || Number(day) % 1 == 0.5){
            valid = true;
        }       

        return valid;
    }

    public saveForm(draft: boolean) {        
        
        
        if(this.checkStates())
        {
            const url = this.currentCaseId? ('/case/'+this.currentCaseId+'/') : '/case/';
            const method = this.currentCaseId? "put" : "post"
            const body = {
                type: "form-5",
                status:"Draft",
                description:"form6",
                data: this.form6Info
            }  

            const options = {
                method: method,
                url: url,
                data: body
            }

            this.$http(options)
            .then(response => {
                if(response.data){
                    if(method == "post") this.UpdateCurrentCaseId(response.data.case_id);
                    this.UpdateForm6Info(this.form6Info);
                    if(!draft) this.navigateToPreviewPage(this.currentCaseId);                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
        }
    }

    public timeFormat(value , event){        
        if(isNaN(Number(value.slice(-1))) && value.slice(-1) != ':') return value.slice(0,-1) 
        if(value.length!=3 && value.slice(-1) == ':') return value.slice(0,-1);
        if(value.length==2 && event.data && value.slice(0,1)>=6 && value.slice(-1)>=6) return value.slice(0,-1);
        if(value.length==2 && event.data && value.slice(-1)<6) return '0'+value.slice(0,1)+':'+value.slice(1,2);
        if(value.length==2 && event.data && value.slice(0,1)>=2 && value.slice(0,1)<6 && value.slice(-1)>=6) return '00:'+value.slice(0,2);            
        if(value.length==2 && event.data && value.slice(0,1)<2 && value.slice(-1)>=6) return value.slice(0,2)+':';
        if(value.length==4 && value.slice(-1)>=6) return value.slice(0,-1);
        if(value.length==3 && value.slice(0,1)!=':' && value.slice(1,2)!=':' && value.slice(-1)<6) return value.slice(0,2)+':'+value.slice(2,3);
        if(value.length==3 && value.slice(-1)>=6 ) return value.slice(0,-1);
        if(value.length==6 && value.slice(0,1)==0 && value.slice(4,6)<60 && (value.slice(1,2)+value.slice(3,4))<24) return value.slice(1,2)+value.slice(3,4)+':'+value.slice(4,5)+value.slice(5,6);           
        if(value.length>5) return value.slice(0,5);
        if(value.length==5 && (value.slice(0,2)>=24 || value.slice(3,5)>=60)) return '';
        if(value.length==5 && ( isNaN(value.slice(0,2)) || isNaN(value.slice(3,5)) || value.slice(2,3)!=':') )return '';
        if(value.length==4 && ( isNaN(value.slice(0,2)) || isNaN(value.slice(3,4)) || value.slice(2,3)!=':') )return '';
        return value
    }

    public dayFormat(value , event){
        return value;
    }

    public navigateToPreviewPage(caseId) {        
        this.$router.push({name: "preview-form6", params: {caseId: caseId}}) 
    }

}
</script>

<style scoped lang="scss">
</style>