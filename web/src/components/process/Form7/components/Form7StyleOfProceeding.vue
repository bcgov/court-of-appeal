<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <b-card class="border-white bg-white"> 

            <h2 class="ml-4 mt-3 text-primary" >Style of Proceeding (Parties) in Case</h2>
            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>

            <b-row class="mt-4 mx-5 bg-info p-3" style="border-radius: 1rem;">
                <b-col cols="1">
                    <b-icon-question-circle-fill style="margin-top: 4rem;" class="ml-3" scale="4" variant="primary"/>
                </b-col>
                <b-col> 
                    <div style="margin-bottom: 0.75rem; font-weight: 700;">
                        To the party(ies) filing the notice of urgent application:
                    </div>                   
                    <div style="margin-bottom: 0.75rem;">
                        In cases of urgency you may apply for permission to bring an application 
                        on shorter notice than is otherwise required under the Court of Appeal 
                        Rules. You must obtain an urgent application hearing date from the 
                        Registrar. Even in cases of urgency, you must give notice and attempt 
                        to serve the application material on all parties.
                    </div>                   
                
                </b-col>
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
                    :state="state.firstAppellant"                   
                    v-model="form7Info.firstAppellant"                    
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
                    :state="state.firstRespondent"                   
                    v-model="form7Info.firstRespondent"                    
                    :options="respondentNames">
                </b-form-select>
                
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col cols="7" class="labels">
                Name of the party(ies) bringing the application:                                
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-checkbox-group                
                    style="width:100%" 
                    :state="state.filingParties"              
                    v-model="form7Info.filingParties"                    
                    :options="partyNames">
                </b-form-checkbox-group>                    
                
            </b-col>
        </b-row> 

        <b-row class="mt-4">
            <b-col cols="7" class="labels">
                Location where the application will be heard:                                
            </b-col>
            <b-col class="ml-1 mt-2">  
                <b-form-select
                    :state="state.hearingLocation"                                                                                                          
                    v-model="form7Info.hearingLocation">
                        <b-form-select-option
                            v-for="location in locationsInfo" 
                            :key="location.id"
                            :value="location">
                                {{location.name}}
                        </b-form-select-option>    
                </b-form-select>
                
            </b-col>
        </b-row>

        <b-row class="mt-4">
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
                                v-model="form7Info.hearingDate"                           
                                color="warning"             
                                :allowed-dates="allowedDates"                            
                                header-color="red"
                            ></v-date-picker>                            
                        </v-app>
                    </div>    
                </b-card>                    
            </b-col>
        </b-row>   

        <b-row class="mt-5">
            <b-col cols="7" class="labels">Time of Hearing: 
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="The default value is 10:00AM."/>            
            </b-col>
            <b-col class="ml-1 mt-1">
                <b-form-timepicker 
                    style="width: 12rem;"  
                    v-model="form7Info.hearingTime"
                    :state="state.hearingTime"
                    locale="en">
                </b-form-timepicker> 
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col cols="7" class="labels">
                List any affidavits being filed                                
            </b-col>
            <b-col class="ml-1 mt-2">                   
                <b-form-textarea                
                    style="width:100%"                                                            
                    v-model="form7Info.affidavits"
                    :state ="state.affidavits">
                </b-form-textarea>                    
            </b-col>                
        </b-row>

        <b-row class="mt-4">
            <b-col cols="7" class="labels">
                Have you filed materials in support of the main application?
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-radio-group
                    :state="state.filedMaterial"                 
                    v-model="form7Info.filedMaterial"
                    :options="yesNoOptions"                
                ></b-form-radio-group>

            </b-col>
        </b-row> 

        <b-row v-if="form7Info.filedMaterial" class="mt-4">
            <b-col cols="7" class="labels">
                Enter a list of the material you have filed:                                
            </b-col>
            <b-col class="ml-1 mt-2">                   
                <b-form-textarea                
                    style="width:100%"                                                            
                    v-model="form7Info.materialList"
                    :state ="state.materialList">
                </b-form-textarea>                    
            </b-col>                
        </b-row>

        <b-row class="mt-4">
            <b-col cols="7" class="labels">
                Name of lawyer or party authorizing filing of this Form:                             
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-input                    
                    v-model="form7Info.authorizedName"                        
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
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import { form7DataInfoType } from '@/types/Information/Form7';
import { partiesDataJsonDataType } from '@/types/Information/json';

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component
export default class Form7StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @form7State.State
    public form7Info: form7DataInfoType;

    @form7State.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void  
    
    @form7State.State
    public currentNoticeOfUrgentApplicationId: string;

    @form7State.Action
    public UpdateCurrentNoticeOfUrgentApplicationId!: (newCurrentNoticeOfUrgentApplicationId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];    
    
    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];    

    state = {
        firstAppellant: null,
        firstRespondent: null,
        filingParties: null,
        hearingLocation: null,
        hearingDate: null,
        hearingTime: null,    
        affidavits: null,
        filedMaterial: null,
        materialList: null,         
        authorizedName:null
    }  

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public extractInfo(){      

        if(this.currentNoticeOfUrgentApplicationId){
            this.getForm7Data();
           
        } else {   
            
            const form7Data = {} as form7DataInfoType;

            form7Data.appellants = this.partiesJson.appellants
            form7Data.respondents = this.partiesJson.respondents;
            form7Data.formSevenNumber = this.fileNumber;            
            form7Data.version = this.$store.state.Application.version;             
           
            this.UpdateForm7Info(form7Data);                       
            this.saveForm(true);
        }  
          

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form7Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form7Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
     
        this.dataReady = true;

    }

    public getForm7Data() {        
       
        this.$http.get('/form7/forms/'+this.currentNoticeOfUrgentApplicationId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form7Data = response.data.data                
                this.UpdateForm7Info(form7Data) 
                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

     public clearStates(){
        this.state = {
            firstAppellant: null,
            firstRespondent: null,
            filingParties: null,
            hearingLocation: null,
            hearingDate: null,
            hearingTime: null,    
            affidavits: null,
            filedMaterial: null,
            materialList: null,         
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        this.state.firstAppellant = !this.form7Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form7Info.firstRespondent? false : null; 
        this.state.filingParties = this.form7Info.filingParties?.length>0? null :false;
        this.state.hearingLocation = !this.form7Info.hearingLocation? false : null;
        this.state.hearingDate = this.form7Info.hearingDate? null :false;
        this.state.hearingTime = this.form7Info.hearingTime? null :false;
        this.state.affidavits = this.form7Info.affidavits? null :false;
        this.state.filedMaterial = this.form7Info.filedMaterial != null? null :false;
        this.state.materialList = this.form7Info.materialList? null :false;
        this.state.authorizedName = !this.form7Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form7/forms';

        // if (this.currentNoticeOfUrgentApplicationId){
        //     method = 'put';
        //     url = '/form7/forms/'+this.currentNoticeOfUrgentApplicationId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form7Info,
                    type:'Form7',
                    description:'Notice of Urgent Application'
                }
            }
            this.saveInfo(options, draft);

        // } else {           

        //     const options = {
        //         method: method,
        //         url: url,
        //         data: {
        //             data:this.form7Info,
        //             type:'Form7',
        //             description:'Notice of Urgent Application'
        //         }
        //     }
        //     this.saveInfo(options, draft);
        // }        
       
    }

    public saveInfo(options, draft){

        // this.$http(options)
        //     .then(response => {
        //         if(response.data){
        //             if(options.method == "post"){
        //                 this.UpdateCurrentNoticeOfUrgentApplicationId(response.data.file_id);
                        this.extractPartiesData();    
                        const data = this.form7Info;  
                        this.UpdateForm7Info(data)                  
            //         }

            //         this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
            //     }
            // }, err => {
            //     const errMsg = err.response.data.error;
                
            // })
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
           
        return (date >= day);           
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form7"}) 
    }

}
</script>

<style lang="scss" scoped>

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

</style>