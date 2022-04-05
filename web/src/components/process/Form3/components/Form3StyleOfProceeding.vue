<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>
            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{form3Info.appellantNames}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{form3Info.respondentNames}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>  

            <b-row class="mt-4">
                <b-col>
                    <p style="font-weight: 700;">Is Leave to Cross Appeal Required?</p>
                    <p style="font-size: 0.75rem;">
                        (Court of Appeal Rule 12 explains when you need leave to cross appeal, if unsure check "yes")
                    </p>
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.crossAppealRequired"                                         
                        v-model="form3Info.crossAppealRequired"
                        :options="yesNoOptions">
                    </b-form-radio-group>
                </b-col>
            </b-row>    

            <b-row class="my-3" style="padding: 0;">
                <b-col
                    style="font-weight: 700;">Who made the Order?
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" >                   
                        {{form3Info.judgeName}}
                    </b-card>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col
                    style="font-weight: 700;">Date the order under appeal was pronounced:
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" style="min-height:2.75rem;">
                        {{form3Info.orderDate | beautify-date-blank}}
                    </b-card>
                </b-col>
            </b-row>    

            <div v-if="form3Info.crossAppealRequired">

                <b-row class="mt-5">
                    <b-col cols="6" style="font-weight: 700;">
                        Part of the Order being cross appealed 
                        <p style="font-size: 0.75rem; font-weight: 400;">
                            NOTE: If you are only seeking leave to cross appeal one part of an order, 
                            enter the part that you are seeking leave to cross appeal.
                        </p>                               
                    </b-col>
                    <b-col>                    
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"  
                            :state="state.partOfOrderLeaveCrossAppealed"                                                          
                            v-model="form3Info.partOfOrderLeaveCrossAppealed">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>
                <b-row class="mt-4">
                    <b-col cols="6" style="font-weight: 700;">
                        Enter the grounds for leave to cross appeal                                                    
                    </b-col>
                    <b-col>                   
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6" 
                            :state="state.groundsLeaveCrossAppeal"                                                           
                            v-model="form3Info.groundsLeaveCrossAppeal">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>

            </div> 
            <div v-else>

                <b-row class="mt-5">
                    <b-col style="font-weight: 700;">
                        Part of the Order being cross appealed                                
                    </b-col>
                    <b-col>                    
                        <b-form-textarea                
                            style="width:100%"  
                            rows="6" 
                            :state="state.partOfOrderCrossAppealed"                                                          
                            v-model="form3Info.partOfOrderCrossAppealed">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>
                <b-row class="mt-4">
                    <b-col style="font-weight: 700;">
                        Order you are seeking on cross appeal                                                    
                    </b-col>
                    <b-col>                   
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6" 
                            :state="state.seekingOrder"                                                           
                            v-model="form3Info.seekingOrder">
                        </b-form-textarea>                    
                    </b-col>                
                </b-row>

            </div> 

            <b-row class="mt-5">
                <b-col style="font-weight: 700;">
                    Name of the Party(ies) who wish to cross appeal the order under appeal:                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.crossAppealingParties"                                      
                        v-model="form3Info.crossAppealingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                </b-col>
            </b-row> 
         
            <b-row class="mt-5">
                <b-col style="font-weight: 700;">
                    Are you self-represented?                                
                </b-col>
                <b-col class="ml-1">   

                    <b-form-radio-group
                        id="representation"
                        style="max-width:75%"                   
                        v-model="form3Info.selfRepresented"
                        :options="yesNoOptions"                
                    ></b-form-radio-group>                    
                    
                </b-col>
            </b-row> 
           
        </div>

        <div v-if="form3Info.selfRepresented !=null">    

            <b-row class="mt-4">
                <b-col style="font-weight: 700;">
                    Name(s) and address(es) within BC for service of the party(ies) filing cross appeal    
                    <p style="font-size: 0.75rem; font-weight: 400;">
                        NOTE: If you have a lawyer, include the law firms' address. Otherwise provide your own residential address
                    </p>                                                
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%" 
                        rows="6" 
                        :state="state.addresses"                                                           
                        v-model="form3Info.addresses">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
          
            <b-row class="mt-5">
                <b-col style="font-weight: 700;">
                    Phone number(s) of party(ies) filing cross appeal                                
                </b-col>
                <b-col>                    
                    <b-form-textarea                
                        style="width:100%"  
                        :state="state.phoneNumbers"                                                          
                        v-model="form3Info.phoneNumbers">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            
            <b-row class="mt-4">
                <b-col style="font-weight: 700;">
                    Email address(es) for party(ies) providing service for cross appeal                                
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%"                                                            
                        v-model="form3Info.emailAdresses"
                        :state ="state.emailAdresses">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>              

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form3Info.authorizedName"                        
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

import { form3DataInfoType } from '@/types/Information/Form3';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

@Component
export default class Form3StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]

    @informationState.State
    public fileNumber: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    @form3State.Action
    public UpdateForm3Info!: (newForm3Info: form3DataInfoType) => void  
    
    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void
    
    dataReady = false;    
    partyNames: string[] = [];
    
    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    state = {        
        crossAppealRequired:null,
        crossAppealingParties:null,
        partOfOrderCrossAppealed:null,
        seekingOrder:null,
        partOfOrderLeaveCrossAppealed:null,
        groundsLeaveCrossAppeal:null,       
        phoneNumbers:null,
        emailAdresses:null,
        addresses:null,               
        authorizedName:null
    }

    updated=0; 

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public extractInfo(){       

        if(this.currentNoticeOfCrossAppealId){
            this.getForm3Data();
           
        } else { 
            
            let applicantNames = [];
            let respondentNames = [];
            
            const form3Data = {} as form3DataInfoType;

            form3Data.appellants = this.partiesJson.appellants
            form3Data.respondents = this.partiesJson.respondents;

            for (const respondent of form3Data.respondents){
                respondentNames.push(respondent.name);                
            }

            for (const applicant of form3Data.appellants){
                applicantNames.push(applicant.name);                
            }

            form3Data.appellantNames = applicantNames.join(', ');
            form3Data.respondentNames = respondentNames.join(', ');      
            form3Data.crossAppealRequired = true;      
            form3Data.formSevenNumber = this.fileNumber;
            
            form3Data.version = this.$store.state.Application.version;            

            form3Data.judgeName = Vue.filter('getFullName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
            form3Data.orderDate = this.previousCourts[0]?.JudgmentDate;
           
            this.UpdateForm3Info(form3Data);                       
            this.saveForm(true);
        }            

    }

    public extractPartiesData(){

        
        this.partyNames = [];

        for (const respondent of this.form3Info.respondents){
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form3Info.appellants){
            this.partyNames.push(applicant.name);  
        }       
        this.dataReady = true;

    }

    public getForm3Data() {        
       
        this.$http.get('/form3/forms/'+this.currentNoticeOfCrossAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form3Data = response.data.data                
                this.UpdateForm3Info(form3Data) 
                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            crossAppealRequired:null,
            crossAppealingParties:null,
            partOfOrderCrossAppealed:null,
            seekingOrder:null,
            partOfOrderLeaveCrossAppealed:null,
            groundsLeaveCrossAppeal:null,       
            phoneNumbers:null,
            emailAdresses:null,
            addresses:null,               
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        this.state.crossAppealRequired = this.form3Info.crossAppealRequired != null? null:false;
        this.state.crossAppealingParties = this.form3Info.crossAppealingParties?.length>0? null :false;
        this.state.partOfOrderLeaveCrossAppealed = (this.form3Info.crossAppealRequired && !this.form3Info.partOfOrderLeaveCrossAppealed)? false: null;
        this.state.groundsLeaveCrossAppeal = (this.form3Info.crossAppealRequired && !this.form3Info.groundsLeaveCrossAppeal)? false: null;
        this.state.partOfOrderCrossAppealed = (!this.form3Info.crossAppealRequired && !this.form3Info.partOfOrderCrossAppealed)? false: null;
        this.state.seekingOrder = (!this.form3Info.crossAppealRequired && !this.form3Info.seekingOrder)? false: null;
        this.state.phoneNumbers = this.form3Info.phoneNumbers? null :false;
        this.state.emailAdresses = this.form3Info.emailAdresses? null :false;
        this.state.addresses = this.form3Info.addresses? null :false;       
        this.state.authorizedName = !this.form3Info.authorizedName? false : null;       
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form3/forms';

        if (this.currentNoticeOfCrossAppealId){
            method = 'put';
            url = '/form3/forms/'+this.currentNoticeOfCrossAppealId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Cross Appeal'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Cross Appeal'
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
                        this.UpdateCurrentNoticeOfCrossAppealId(response.data.file_id);
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
        this.$router.push({name: "preview-form3"}) 
    }

}
</script>

<style scoped lang="scss">
</style>