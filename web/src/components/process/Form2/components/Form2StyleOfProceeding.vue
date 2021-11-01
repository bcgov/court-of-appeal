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

        <div v-if="form2Info.selfRepresented !=null">
            <p  
                style="font-weight: 700;"
                >Mailing address for service: 
                <b-icon-question-circle-fill 
                    class="text-primary"
                    v-b-tooltip.hover.noninteractive
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
                    Phone <span class="text-danger">*</span>
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        title="The registry may contact you by phone to schedule your appeal."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"                        
                        v-model="form2Info.serviceInformation.phone">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">ex. 604-567-8901 x1234
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
                            v-model="form2Info.serviceInformation.firmName">
                        </b-form-input>  
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col cols="3">
                        Firm's Phone <span class="text-danger">*</span>
                        <b-icon-question-circle-fill 
                            class="text-primary"
                            v-b-tooltip.hover.noninteractive
                            title="The registry may contact you by phone to schedule your appeal."/>
                    </b-col>
                    <b-col cols="4">
                        <b-form-input 
                            style="width: 100%"                        
                            v-model="form2Info.serviceInformation.firmPhone">
                        </b-form-input>
                        <span 
                            style="font-size: 0.75rem;" 
                            class="text-secondary ml-2">ex. 604-567-8901 x1234
                        </span>   
                    </b-col>
                </b-row>

            </b-card>

            <b-row class="mt-2">
                <b-col cols="3">
                    Email address
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        title="Receive electronic document status change notifications or be served 
                        electonically by another party (you need to agree to this using the checkboxes below."/>
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"                        
                        v-model="form2Info.serviceInformation.email">
                    </b-form-input>
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col cols="3">
                    Address Line 1 <span class="text-danger">*</span>                   
                </b-col>
                <b-col cols="4">
                    <b-form-input 
                        style="width: 100%"                        
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
                        v-model="form2Info.serviceInformation.postalCode">
                    </b-form-input>  
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

    respondentName = "";  

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;        
    }

    public extractInfo(){

        this.applicants = this.partiesJson.appellants;
        this.respondents = this.partiesJson.respondents;
        this.applicantNames = [];
        this.respondentNames = [];

        for (const respondent of this.respondents){
            this.respondentNames.push(respondent.name);  
        }

        for (const applicant of this.applicants){
            this.applicantNames.push(applicant.name);  
        }

        this.form2Info.appellants = this.applicants;
        this.form2Info.respondents = this.respondents;
        this.form2Info.formSevenNumber = this.fileNumber;
        this.form2Info.serviceInformation = {} as serviceInformationJsonDataType;
        this.form2Info.serviceInformation.province = "British Columbia";
        this.form2Info.serviceInformation.country = "Canada";

    }

    public toggleRepresentation(){
        console.log(this.respondentName)
        if (!this.form2Info.selfRepresented){
            const contactInfo = this.respondents.filter(resp => {
                if (resp.name = this.respondentName) {
                    return true;
                }
            })[0];
            this.form2Info.serviceInformation.country = "Canada";
            this.form2Info.serviceInformation.selectedContactId = contactInfo.id;
            this.form2Info.serviceInformation.name = contactInfo.name;
            this.form2Info.serviceInformation.counselFirstName = contactInfo.solicitor.counselFirstName;
            this.form2Info.serviceInformation.counselLastName = contactInfo.solicitor.counselLastName;
            this.form2Info.serviceInformation.firmName = contactInfo.solicitor.firmName;
            this.form2Info.serviceInformation.firmPhone = contactInfo.solicitor.firmPhone;
            this.form2Info.serviceInformation.email = "";
            this.form2Info.serviceInformation.addressLine1 = contactInfo.solicitor.addressLine1;
            this.form2Info.serviceInformation.addressLine2 = contactInfo.solicitor.addressLine2;
            this.form2Info.serviceInformation.city = contactInfo.solicitor.city;
            this.form2Info.serviceInformation.postalCode = contactInfo.solicitor.postalCode;

        }
    }

    public saveForm(draft: boolean) {
        
        console.log('save and continue');

        const form2data: form2DataInfoType = {"formSevenNumber":"CA39029","appellants":[{"name":"One TEST","firstName":"One","lastName":"TEST","solicitor":{"name":"William T. H. Lovatt null","counselFirstName":"William T. H. Lovatt","counselLastName":null,"firmName":"Axis Law","firmPhone":"604 601-8501","addressLine1":"1500 - 701 West Georgia Street","addressLine2":null,"city":"Vancouver","postalCode":"V7Y 1C6","province":"BC"},"partyId":118931,"id":0}],"respondents":[{"name":"Two TEST","firstName":"Two","lastName":"TEST","solicitor":{"name":"Jane Doe","counselFirstName":"Jane","counselLastName":"Doe","firmName":"Edward F. Macaulay Law Corporation","firmPhone":"604 684-0112","addressLine1":"#1400 - 1125 Howe Street","addressLine2":null,"city":"Vancouver","postalCode":"V6Z 2K8","province":"British Columbia"},"partyId":118932,"id":0,"responding":true}],"useServiceEmail":true,"sendNotifications":true,"serviceInformation":{"province":"British Columbia","country":"Canada","selectedContactId":0,"name":"Two TEST","addressLine1":"4 - 5 st","addressLine2":null,"city":"Coquitlam","postalCode":"V7Y 1C6","phone":"9876543234","email":"email@yahoo.com"},"selfRepresented":true,"version":"0.1"};

        const url = '/case/';
        const body = {
            type: "form-2",
            data: form2data
        }  
        //TODO Add functionality to determine put or post

        this.$http.post(url, body )
        .then(response => {
            if(response.data){
                const caseId = response.data.case_id;
                this.UpdateForm2Info(this.form2Info);
                this.navigateToPreviewPage(caseId);                           
            }
        }, err => {
            const errMsg = err.response.data.error;
            
        })
    }

    public navigateToPreviewPage(caseId) {        
        this.$router.push({name: "preview", params: {caseId: caseId}}) 
    }

}
</script>

<style scoped lang="scss">
</style>