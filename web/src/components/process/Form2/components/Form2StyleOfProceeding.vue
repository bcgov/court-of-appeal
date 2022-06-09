<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>
                
                <b-row class="mt-4" style="font-weight: 700;">
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
                        v-model="form2Info.firstAppellant"                    
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
                        v-model="form2Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            
        </div>

        <div class="mt-5" >

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name of party(ies) filing the Notice of Appearance:                                
                </b-col>
                <b-col >   

                    <b-form-checkbox-group
                        style="width:100%" 
                        stacked
                        :state="state.filingParties"   
                        @change="updateAddressFields"                                     
                        v-model="form2Info.filingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>
                                     
                </b-col>
            </b-row>

            <b-row v-if="form2Info.filingParties.length > 0" :key="updated + 1" class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name(s) and address(es) within BC for the service of the respondent(s)                                                    
                </b-col>
                <b-col>
                    <div 
                        v-for="(address,index) in form2Info.addresses" 
                        :key="'address' +index"                       
                        :value="address"> {{form2Info.addresses[index].name}}                  
                        <b-form-textarea                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"                                                                                       
                            v-model="form2Info.addresses[index].contactInfo">
                        </b-form-textarea>      
                    </div> 
                    <span
                        v-if="(state.addresses != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Specify the addresses of the party(ies) filing the Notice of Appearance.
                    </span>             
                </b-col>                
            </b-row>

            <b-row v-if="form2Info.filingParties.length > 0" :key="updated" class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Phone number(s) of the party(ies) filing the Notice of Appearance                                
                </b-col>
                <b-col>
                    <div 
                        v-for="(phone,index) in form2Info.phoneNumbers" 
                        :key="'phone' + index"                        
                        :value="phone"> {{form2Info.phoneNumbers[index].name}}                  
                        <b-form-input                
                            style="width:100%" 
                            rows="6"
                            @change="recheckStates()"                                                                                       
                            v-model="form2Info.phoneNumbers[index].contactInfo">
                        </b-form-input>      
                    </div>
                    <span
                        v-if="(state.phoneNumbers != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Specify the phone numbers of the party(ies) filing the Notice of Appearance.
                    </span>
                </b-col>                
            </b-row>

            <b-row v-if="form2Info.filingParties.length > 0" :key="updated + 2" class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Email(s) address(es) for service of respondent(s)                                
                </b-col>
                <b-col>
                    <div 
                        v-for="(email,index) in form2Info.emailAdresses" 
                        :key="'email' + index"                       
                        :value="email"> {{form2Info.emailAdresses[index].name}}                  
                        <b-form-input                
                            style="width:100%" 
                            rows="6"                                                                                       
                            v-model="form2Info.emailAdresses[index].contactInfo">
                        </b-form-input>      
                    </div>                                    
                </b-col>                
            </b-row>

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="6" 
                    style="font-weight: 700;">
                    Name of lawyer or party authorizing filing of this Form:
                </b-col>
                <b-col>
                    <b-form-input
                        @change="recheckStates()"               
                        v-model="form2Info.authorizedName"                        
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

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import { form2DataInfoType } from '@/types/Information/Form2';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { partiesContact } from '@/types/Information';

@Component
export default class Form2StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form2State.State
    public form2Info: form2DataInfoType;

    @form2State.Action
    public UpdateForm2Info!: (newForm2Info: form2DataInfoType) => void  
    
    @form2State.State
    public currentCaseId: string;

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    updated=0;

    state = {
        firstAppellant: null,
        firstRespondent: null,
        filingParties:null,
        authorizedName: null,
        phoneNumbers: null,       
        addresses: null 
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();                
    }

    async getForm2Data() {
        
        this.$http.get('/case/'+this.currentCaseId+'/')
        .then((response) => {
            if(response?.data?.data){ 
                const form2Data = response.data.data                
                this.UpdateForm2Info(form2Data); 
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
            filingParties:null,
            authorizedName: null,
            phoneNumbers: null,       
            addresses: null 
        }
        this.dataReady = true; 
    }

    async extractInfo(){

        if(this.currentCaseId){
            await this.getForm2Data();
        } else {            
             
            const form2Data = {} as form2DataInfoType;
            form2Data.appellants = this.partiesJson.appellants;
            form2Data.respondents = this.partiesJson.respondents;
            form2Data.formSevenNumber = this.fileNumber;            
            form2Data.version = this.$store.state.Application.version;
            form2Data.filingParties = [];
            form2Data.addresses = [];
            form2Data.emailAdresses = [];
            form2Data.phoneNumbers = [];
            this.UpdateForm2Info(form2Data);           
            this.saveForm(true);
            
        } 
    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];               

        for (const applicant of this.form2Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);
        }

        for (const respondent of this.form2Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name);            
        }        
        this.dataReady = true;
    }  

    public updateAddressFields(){

        const formData = this.form2Info;
        const addressData = formData.addresses;
        const addresses: partiesContact[] = []; 
        const emailData = formData.emailAdresses;
        const emails: partiesContact[] = []; 
        const phoneData = formData.phoneNumbers;
        const phoneNumbers: partiesContact[] = []; 

        for (const partyName of this.form2Info.filingParties){
           
            const matchingAddressRecords = addressData.filter(address => address.name == partyName);

            if (matchingAddressRecords.length == 0){
                addresses.push({name: partyName, contactInfo: ''});
            } else {                
                const index = addressData.findIndex(address => address.name == matchingAddressRecords[0].name);               
                addresses.push(addressData[index]);
            }

            const matchingPhoneRecords = phoneData.filter(phone => phone.name == partyName); 
            
            if (matchingPhoneRecords.length == 0){
                phoneNumbers.push({name: partyName, contactInfo: ''});
            } else {                
                const index = phoneData.findIndex(phone => phone.name == matchingPhoneRecords[0].name);               
                phoneNumbers.push(phoneData[index]);
            }

            const matchingEmailRecords = emailData.filter(email => email.name == partyName); 
            
            if (matchingEmailRecords.length == 0){
                emails.push({name: partyName, contactInfo: ''});
            } else {                
                const index = emailData.findIndex(email => email.name == matchingEmailRecords[0].name);               
                emails.push(emailData[index]);
            }
        }

        formData.addresses = addresses;
        formData.emailAdresses = emails;
        formData.phoneNumbers = phoneNumbers;
        this.UpdateForm2Info(formData)
        this.recheckStates();
        this.updated ++;               
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
        this.state.firstAppellant = !this.form2Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form2Info.firstRespondent? false : null;
        this.state.filingParties = (this.form2Info.filingParties.length == 0)? false : null; 
        this.state.phoneNumbers = !(this.form2Info.phoneNumbers && this.verifyPhoneNumbers()
                                    && this.form2Info.phoneNumbers.length == this.form2Info.filingParties.length)? false : null;
        this.state.addresses = !(this.form2Info.addresses && this.verifyAddresses()
                                    && this.form2Info.addresses.length == this.form2Info.filingParties.length)? false : null;       
                                    
        this.state.authorizedName = !this.form2Info.authorizedName? false : null; 
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true;            
    } 
    
    public verifyPhoneNumbers(){
        for(const phoneNumber of this.form2Info.phoneNumbers){            
            if(phoneNumber.contactInfo.trim().length == 0)
                return false;
        }
        return true;
    }

    public verifyAddresses(){
        for(const address of this.form2Info.addresses){            
            if(address.contactInfo.trim().length == 0)
                return false;
        }
        return true;
    }

    public extractAddresses(){
        const addresses = [];
        for(const contactAddress of this.form2Info.addresses){            
            if(contactAddress.contactInfo.trim().length != 0){
                addresses.push(contactAddress.name + ': ' + contactAddress.contactInfo.trim());
            }  
        }
        return addresses.join('<br>');        
    }

    public extractPhoneNumbers(){
        const phoneNumbers = [];
        for(const phone of this.form2Info.phoneNumbers){            
            if(phone.contactInfo.trim().length != 0){
                phoneNumbers.push(phone.name + ': ' + phone.contactInfo.trim());
            }  
        }
        return phoneNumbers.join('<br>');        
    }

    public extractEmails(){
        const emails = [];
        for(const email of this.form2Info.emailAdresses){            
            if(email.contactInfo.trim().length != 0){
                emails.push(email.name + ': ' + email.contactInfo.trim());
            }  
        }
        return emails.join('<br>');        
    }

    public saveForm(draft: boolean) { 
        
        const url = this.currentCaseId? ('/case/'+this.currentCaseId+'/') : '/case/';
        const method = this.currentCaseId? "put" : "post";
        const form2Data = this.form2Info;
        form2Data.contactAddress = this.extractAddresses();
        form2Data.emails = this.extractEmails();
        form2Data.phones = this.extractPhoneNumbers();
        this.UpdateForm2Info(form2Data);
        const body = {
            type: "form-2",
            status:"Draft",
            description:"form2",
            data: this.form2Info
        }  

        const options = {
            method: method,
            url: url,
            data: body
        }       
            
        if (this.currentCaseId && !draft && !this.checkStates()){               
            return                
        }             
        
        this.saveInfo(options, draft);              
       
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentCaseId(response.data.case_id);
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
        this.$router.push({name: "preview-form2"}) 
    }

}
</script>

<style scoped lang="scss">
</style>