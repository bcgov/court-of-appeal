<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>

            
            <b-row class="ml-2" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3 ml-2" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>

            <p 
                class="mt-3" 
                style="font-weight: 700;"
                >Responding: 
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="The name of the party responding to the appeal."/>            
            </p>
            <p class="ml-5" style="font-weight: 200;">{{respondentNames.join(', ')}}</p>

            <p class="ml-3 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?" 
                label-for="representation">
                <b-form-radio-group
                    id="representation"
                    style="max-width:25%"
                    @change="toggleRepresentation" 
                    v-model="form2Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div :key="updated" v-if="form2Info.selfRepresented !=null">
            <p  
                style="font-weight: 700;"
                >Mailing address for service: 
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
                    scale="1.1"
                    title="The address where you would like to receive documents."/>            
            </p>           

            <b-form-group 
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Select a contact name to auto-fill the address." 
                label-for="contact">
                <b-form-select 
                    id="contact"
                    @change="toggleRepresentation"
                    v-model="respondentName"                    
                    :options="respondentNames">
                </b-form-select>
            </b-form-group>

            <p style="font-weight: 700;">Service Information</p>


            <b-row  v-if="form2Info.selfRepresented">
                <b-col cols="3">
                    Phone <span class="text-danger">* </span>
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="The registry may contact you by phone to schedule your appeal."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        :state="state.phone"                        
                        v-model="form2Info.serviceInformation.phone">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        :class="state.phone==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. 604-567-8901 x1234 or 250-123-4567
                    </span>   
                </b-col>
            </b-row>

            <b-card no-body border-variant="white" v-else >

                <b-row class="mt-2">
                    <b-col cols="3">
                        Counsel's First Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%" 
                            :state="state.counselFirstName"             
                            v-model="form2Info.serviceInformation.counselFirstName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Counsel's Last Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            :state="state.counselLastName"
                            v-model="form2Info.serviceInformation.counselLastName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Firm Name <span class="text-danger">*</span>                   
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            :state="state.firmName"                        
                            v-model="form2Info.serviceInformation.firmName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Firm's Phone <span class="text-danger">* </span>
                        <b-icon-question-circle-fill 
                            class="text-primary"
                            scale="1.1"
                            v-b-tooltip.hover
                            title="The registry may contact you by phone to schedule your appeal."/>
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"
                            :state="state.firmPhone"                        
                            v-model="form2Info.serviceInformation.firmPhone">
                        </b-form-input>
                        <span 
                            style="font-size: 0.75rem;" 
                            :class="state.firmPhone==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. 604-567-8901 x1234 or 250-123-4567
                        </span>   
                    </b-col>
                </b-row>

            </b-card>

            <b-row class="mt-2">
                <b-col cols="3">
                    Email address
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        scale="1.1"
                        v-b-tooltip.hover                    
                        title="Receive electronic document status change notifications or be served electonically by another party (you need to agree to this using the checkboxes below."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        :state="state.email"                         
                        v-model="form2Info.serviceInformation.email">
                    </b-form-input>
                    <span
                        v-if="state.email==false" 
                        style="font-size: 0.75rem;" 
                        class="px-2 bg-danger text-white">Invalid Email Format!
                    </span>
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">
                    Address Line 1 <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        :state="state.addressLine1"                         
                        v-model="form2Info.serviceInformation.addressLine1">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">Street address
                    </span>   
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">
                    Address Line 2                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"                        
                        v-model="form2Info.serviceInformation.addressLine2">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">Apartment, suite, unit, building, floor, etc.
                    </span>   
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">
                    City <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"
                        :state="state.city"                         
                        v-model="form2Info.serviceInformation.city">
                    </b-form-input>  
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">Province</b-col>
                <b-col cols="4">BC</b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">Country</b-col>
                <b-col cols="4">Canada</b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">
                    Postal Code <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%" 
                        :state="state.postalCode"                        
                        v-model="form2Info.serviceInformation.postalCode">
                    </b-form-input> 
                    <span 
                        style="font-size: 0.75rem;" 
                        :class="state.postalCode==null?'text-secondary ml-2':'px-2 bg-danger text-white'">ex. A1A 1A1
                    </span> 
                </b-col>
            </b-row> 


            <b-row class="mt-5">
                <b-form-group>
                    <span class="ml-3">I would like to receive email notifications when the status of my document changes</span>	
                    <b-form-checkbox
                        class="ml-5"
                        style="display: inline;"
                        size="sm"									
                        v-model="form2Info.useServiceEmail"
                        >  
                    </b-form-checkbox>						
                </b-form-group>
            </b-row>

            <b-row >
                <b-form-group>
                    <span class="ml-3 mr-1">I agree to be served documents electronically by another party</span>
                    <b-icon-question-circle-fill 
                        class="text-primary mr-5"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Electronic service will replace in-person service if you select this option."/>	
                    <b-form-checkbox                        
                        style="display: inline; margin-left: 8.25rem;"
                        size="sm"									
                        v-model="form2Info.sendNotifications"
                        >  
                    </b-form-checkbox>						
                </b-form-group>
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

import { form2DataInfoType } from '@/types/Information';
import { applicantJsonDataType, partiesDataJsonDataType, respondentsJsonDataType, serviceInformationJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

@Component
export default class Form2StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @informationState.State
    public form2Info: form2DataInfoType;

    @informationState.Action
    public UpdateForm2Info!: (newForm2Info: form2DataInfoType) => void  
    
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

    state = {
        phone:null,
        email:null,
        addressLine1:null,
        city:null,
        postalCode:null,

        counselFirstName:null,
        counselLastName:null,
        firmName:null,
        firmPhone:null,
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
            this.applicants = this.form2Info.appellants;
            this.respondents = this.form2Info.respondents;
        }else{
            this.applicants = this.partiesJson.appellants;
            this.respondents = this.partiesJson.respondents;            

            this.form2Info.appellants = this.applicants;
            this.form2Info.respondents = this.respondents;
            this.form2Info.formSevenNumber = this.fileNumber;
            this.form2Info.serviceInformation = {} as serviceInformationJsonDataType;
            this.form2Info.serviceInformation.province = "British Columbia";
            this.form2Info.serviceInformation.country = "Canada";
            this.form2Info.version = this.$store.state.Application.version;

            this.form2Info.useServiceEmail = false
            this.form2Info.sendNotifications = false
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

    public toggleRepresentation(){

        Vue.nextTick(()=>
        {
            if (!this.form2Info.selfRepresented){
                const contactInfo = this.respondents.filter(resp => {
                    if (resp.name = this.respondentName) {
                        return true;
                    }
                })[0];

                if(contactInfo){
                    this.form2Info.serviceInformation.country = "Canada";
                    this.form2Info.serviceInformation.selectedContactId = contactInfo.id;
                    this.form2Info.serviceInformation.name = contactInfo.name;
                    this.form2Info.serviceInformation.counselFirstName = contactInfo.solicitor?.counselFirstName;
                    this.form2Info.serviceInformation.counselLastName = contactInfo.solicitor?.counselLastName;
                    this.form2Info.serviceInformation.firmName = contactInfo.solicitor?.firmName;
                    this.form2Info.serviceInformation.firmPhone = contactInfo.solicitor?.firmPhone;
                    this.form2Info.serviceInformation.email = "";
                    this.form2Info.serviceInformation.addressLine1 = contactInfo.solicitor?.addressLine1;
                    this.form2Info.serviceInformation.addressLine2 = contactInfo.solicitor?.addressLine2;
                    this.form2Info.serviceInformation.city = contactInfo.solicitor?.city;
                    this.form2Info.serviceInformation.postalCode = contactInfo.solicitor?.postalCode;
                    this.updated++;
                }

            }
        })
    }

    public checkStates(){
        
        const phoneFormat = /^[0-9]{3}-[0-9]{3}\-[0-9]{4}((\s\x[0-9]{4})|)$/;
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const postcodeFormat = /^(([A-Z][0-9][A-Z] [0-9][A-Z][0-9])|([a-z][0-9][a-z] [0-9][a-z][0-9]))?$/;

        const selfRep = this.form2Info.selfRepresented

        const phone = this.form2Info.serviceInformation.phone?.trim()
        this.state.phone = (selfRep && phoneFormat.test(phone)==false)? false : null;

        this.state.counselFirstName = !selfRep && !this.form2Info.serviceInformation.counselFirstName? false : null;
        this.state.counselLastName =  !selfRep && !this.form2Info.serviceInformation.counselLastName? false : null;
        this.state.firmName =  !selfRep && !this.form2Info.serviceInformation.firmName?  false : null;
        
        const firmPhone = this.form2Info.serviceInformation.firmPhone?.trim()
        this.state.firmPhone = (!selfRep && phoneFormat.test(firmPhone)==false)? false : null;
        
        const email = this.form2Info.serviceInformation.email?.trim();
        this.state.email =(email && !emailFormat.test(email) ||(!email && this.form2Info.useServiceEmail))? false : null;
        
        this.state.addressLine1 = !this.form2Info.serviceInformation.addressLine1? false : null;
        this.state.city = !this.form2Info.serviceInformation.city? false : null;

        const postalCode = this.form2Info.serviceInformation.postalCode?.trim()
        this.state.postalCode = !postcodeFormat.test(postalCode)? false : null;
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }

    public saveForm(draft: boolean) {
        
        this.toggleRepresentation();
        
        if(this.checkStates())
        {
            const url = this.currentCaseId? ('/case/'+this.currentCaseId+'/') : '/case/';
            const method = this.currentCaseId? "put" : "post"
            const body = {
                type: "form-2",
                status:"Draft",
                data: this.form2Info
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
                    this.UpdateForm2Info(this.form2Info);
                    if(!draft) this.navigateToPreviewPage(this.currentCaseId);                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
        }
    }

    public navigateToPreviewPage(caseId) {        
        this.$router.push({name: "preview", params: {caseId: caseId}}) 
    }

}
</script>

<style scoped lang="scss">
</style>