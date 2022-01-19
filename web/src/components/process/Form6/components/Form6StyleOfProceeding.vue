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

            <b-row>
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.abandoningParties"
                        @change="updateOtherParties"                   
                        v-model="form6Info.abandoningParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAbandoningParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="!invalidAbandoningParties && form6Info.abandoningParties && form6Info.abandoningParties.length > 0">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col class="ml-1">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form6Info.abandonType"                    
                        :options="abandonTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    Which party(ies) are you abandonign against?                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group 
                        :key="updated"               
                        style="width:100%" 
                        :state="state.abandoningAgainstParties"                   
                        v-model="form6Info.abandoningAgainstParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                    
                </b-col>
            </b-row> 

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Who made the Order?
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.judgeName"                        
                        disabled>
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the order under appeal was pronounced:
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.orderDate"                        
                        disabled>
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the initiating document in the appeal or cross appeal you are abandoning was filed:
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.initiatingDocumentDate"                        
                        disabled>
                    </b-form-input>
                </b-col>
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
    partyNames: string[] = [];
    otherPartyNames: string[] = [];

    applicants: applicantJsonDataType[] = [];
    respondents: respondentsJsonDataType[] = [];
    
    representationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    abandonTypeOptions = [ 'Appeal', 'Cross Appeal' ];

    state = {
        abandoningParties:null,
        abandonType: null,
        abandoningAgainstParties: null,        
        authorizedName:null
    }

    respondentName = ""; 
    updated=0;  
    invalidAbandoningParties = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;        
    }

    public extractInfo(){

        this.invalidAbandoningParties = false;

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
            //TODO: populate following with real data from webcats
            this.form6Info.judgeName = 'Drake';
            this.form6Info.orderDate = '11/11/2021';
            this.form6Info.initiatingDocumentDate = '11/11/2020';          
            
        }

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.applicants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }

    }

    public checkStates(){        

        this.state.abandoningParties = !this.form6Info.abandoningParties? false : null;
        this.state.abandonType = !this.form6Info.abandonType? false : null;
        this.state.abandoningAgainstParties = !this.form6Info.abandoningAgainstParties? false : null;
        this.state.authorizedName = !this.form6Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }

    

    public saveForm(draft: boolean) {        
        console.log('saving')
        
        if(this.checkStates())
        {
            console.log('valid')
            const url = this.currentCaseId? ('/case/'+this.currentCaseId+'/') : '/case/';
            const method = this.currentCaseId? "put" : "post"
            const body = {
                type: "form-6",
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
    
    public updateOtherParties(){

        const otherParties = [];

        if (this.partyNames.length == this.form6Info.abandoningParties.length){

            this.invalidAbandoningParties = true;

        } else {

            this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form6Info.abandoningParties.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage(caseId) {        
        this.$router.push({name: "preview-form6", params: {caseId: caseId}}) 
    }

}
</script>

<style scoped lang="scss">
</style>