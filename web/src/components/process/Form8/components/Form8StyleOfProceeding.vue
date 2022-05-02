<template>
    <b-card no-body v-if="dataReady" class="border-white bg-white">
        <b-card class="border-white bg-white"> 

            <h2 class="ml-4 mt-3 text-primary" >Style of Proceeding (Parties) in Case</h2>
            
            <b-row class="mt-4 ml-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form8Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3 ml-4" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form8Info.respondentNames}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>         

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
                <b-card body-class="py-2 bg-select" >                   
                    {{form8Info.judgeName}}
                </b-card>
            </b-col>
        </b-row>  

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Date the order under appeal was pronounced:
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-card body-class="py-2 bg-select" style="min-height:2.75rem;">
                    {{form8Info.orderDate | beautify-date-blank}}
                </b-card>
            </b-col>
        </b-row>                   

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Name of lawyer or party authorizing filing of this Form: 
                            
            </b-col>
            <b-col class="ml-1 mt-2">
                <b-form-input                    
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

import { form8DataInfoType } from '@/types/Information/Form8';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

@Component
export default class Form8StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]    

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

    state = {        
        filingParties:null,         
        authorizedName:null
    }  

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
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
            form8Data.judgeName = Vue.filter('getFullJudgeName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
            form8Data.orderDate = this.previousCourts[0]?.JudgmentDate;

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
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){

        this.state.filingParties = this.form8Info.filingParties?.length>0? null :false;        
        this.state.authorizedName = !this.form8Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
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