<template>
    <b-card v-if="dataReady" :key="update" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
                Forms Submission
            <p style="font-size: 18px; font-weight: 300;">
                You would use this feature if when uploading a document which has not 
                been created using the application or was previously created (i.e. 
                orders) using the application and it needs to be submitted.
            </p>
        </b-card-header>      

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <b-row class="mb-5">
                <b-col cols="1" >               
                    <div>
                        <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Are you starting a new court file or filing to an existing court file?
                    </p>
                    <b-form-radio-group                     
                        v-model="newApplication"
                        @change="updateNewApplication()"
                        :options="responseOptions">                   
                    </b-form-radio-group>                 
                </b-col> 
            </b-row>

            <b-row v-if="displayRejectionQuestion" class="mb-5">
                <b-col cols="1">               
                    <div>
                        <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Are you submitting a package that was previously rejected?
                    </p> 
                    <b-form-radio-group 
                        v-model="rejectionResponse"
                        @change="updateRejectionQuestion()"
                        :options="yesNoOptions">               
                    </b-form-radio-group>  
                    <b-card 
                        class="border-primary bg-primary text-white mt-2 mr-5" 
                        v-if="rejectionResponse">
                        <p>
                            If you are submitting documents that were previously rejected 
                            by the registry please use the 
                            <a  href="https://justice.gov.bc.ca/cso/index.do"
                                target="_blank"
                                class= "text-white">CSO website
                            </a>
                            to resubmit your documents.
                        </p> 
                    </b-card>   
                </b-col>
            </b-row> 

            <b-row v-if="displayWaiveFeesQuestion" class="mb-5">
                <b-col cols="1">               
                    <div>
                        <step-number v-bind:stepNumber="3" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                    </div>
                </b-col>
                <b-col cols="11">
                    <p class="question pb-0 mt-3">
                        Are you submitting an application to waive the fees or do you have an order to waive the fees?
                    </p> 
                    <b-form-radio-group 
                        v-model="waiveFees"
                        @change="updateWaiveFeesQuestion()"
                        :options="yesNoOptions">                   
                    </b-form-radio-group>
                    <b-card 
                        class="border-primary bg-primary text-white mt-2 mr-5" 
                        v-if="waiveFees">
                        <p>
                            You will need to submit your documents via the 
                            <a  href="https://justice.gov.bc.ca/cso/index.do"
                                target="_blank"
                                class= "text-white">CSO website
                            </a>
                            and attach the proper application (Form 22) or a 
                            copy of the order granting the fee to be waived.
                        </p> 
                    </b-card>   
                </b-col>
            </b-row> 
           
        </b-card>

        <b-card class="ml-2 mt-2 border-white" >
            <p style="font-size: 1.25rem; ">Court of Appeal Case Information</p>

            <p class="mt-3">Find the Court of Appeal case appeal you are responding to by entering the following case information:</p>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Level of Court" 
                label-for="level-of-court">
                <b-form-input 
                    id="level-of-court"
                    style="max-width:75%" 
                    :disabled="true"
                    v-model="levelOfCourt">
                </b-form-input>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Court of Appeal File no." 
                label-for="court-of-appeal-file-no">
                <b-form-input 
                    id="court-of-appeal-file-no"
                    style="max-width:75%" 
                    :state="fileNumberState? null:false"
                    v-model="searchParams.file">
                </b-form-input>
                <span 
                    style="font-size: 0.75rem;" 
                    class="text-secondary ml-2">ex. CA12345
                </span>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Respondent" 
                label-for="respondent">
                <b-form-radio-group
                    id="respondent"
                    style="max-width:75%" 
                    :state="respondentState? null:false"
                    v-model="searchParams.searchBy"
                    :options="respondentOptions"                
                ></b-form-radio-group>
            
            </b-form-group>

            <b-form-group
                v-if="searchParams.searchBy=='Organization'"
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Organization Name" 
                label-for="organization-name">
                <b-form-input 
                    id="organization-name"
                    style="width:150%" 
                    v-model="searchParams.organizationName">
                </b-form-input>
            </b-form-group>

            <div v-else>

                <b-form-group
                    class="mx-1" 
                    label-cols-sm="3"
                    content-cols-sm="3"
                    label="First Name" 
                    label-for="first-name">
                    <b-form-input 
                        id="first-name"
                        style="max-width:75%" 
                        v-model="searchParams.firstName">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    class="mx-1" 
                    label-cols-sm="3"
                    content-cols-sm="3"
                    label="Last Name" 
                    label-for="last-name">
                    <b-form-input 
                        id="last-name"
                        style="max-width:75%" 
                        v-model="searchParams.lastName">
                    </b-form-input>
                </b-form-group>
                
            </div>

            <b-button 
                style="float: right;  width: 80px; height: 50px; opacity:1;" 
                :disabled="searching"
                variant="success"
                @click="findFile()"
                ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
                <span style="font-size: 20px;" v-else>Find</span>
            </b-button>

        </b-card>

        <b-card v-if="resultsReady && !searching" class="ml-2 mt-2 border-white results-table">
            
            <p v-if="notFound">
                No such Court of Appeal document found.
            </p>
            <b-card 
                v-else
                no-body 
                class="mx-3 mb-5 border-white">                
                <div >
                    <hr class="mb-4">
                    <h2 class="text-primary mx-3">Results</h2>
                   
                    
                </div>


               
                
            </b-card> 

        </b-card>

        <b-card 
            v-if="displayApplicationSubmission" 
            border-variant="white" 
            bg-variant="white" 
            class="mt-3 bg-white mx-4">

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <upload-document-header />
                
                <b-card id="drop-area" @click="uploadClicked">                    
                    <div style="padding:0; margin: 0 auto; width:33px;">
                        <label class="btn btn-default btnfile">
                            <span style="font-size:20px; transform:translate(0,-17px);" class="fa fa-plus"></span>                            
                        </label>
                    </div>
                    <input id="inputfile" type="file" multiple style="display: none;" accept="application/pdf,image/x-png,image/jpeg" @change="handleSelectedFile" onclick="this.value=null;">
                    <p class="text-center m-0 text-info">Drag and Drop the PDF documents or JPG/PNG images here,</p>
                    <p class="text-center m-0 text-info" > or click here to Browse for files</p>
                </b-card>

                <b-card border-variant="white" body-class="mb-0 pb-0">
                    <h4 style="height: 2px; padding:0; margin:0 0 1.5rem 0;">Uploaded Documents:</h4>
                    <hr class="bg-light" style="height: 2px; padding:0; margin:0;"/> 
                </b-card>

                <b-card border-variant="white" bg-variant="white" no-body v-if="!supportingDocuments.length">
                    <span class="text-muted ml-4 mb-5">No uploaded documents.</span>
                </b-card>
                <b-card v-else no-body border-variant="white" bg-variant="white" id="supportingdocs">
                    <b-table 
                        :items="supportingDocuments"
                        :fields="supportingDocumentFields"
                        class="mx-0"
                        borderless                        
                        striped
                        small 
                        fixed>

                        <template v-slot:table-colgroup>
                            <col style="width:20rem">
                            <col style="width:10rem">
                            <col style="width:5rem">
                            <col style="width:6rem">
                        </template>

                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" v-b-tooltip.hover.noninteractive = "'delete file'" style="border:0px;" variant="transparent" @click="removeDocument(row.index)">
                                <b-icon-trash-fill font-scale="1.75" variant="danger"></b-icon-trash-fill>                    
                            </b-button>
                        </template>
                        <template v-slot:cell(fileName)="row">                  
                            <span>{{row.item.fileName}}</span>
                        </template>
                        <template v-slot:cell(fileType)="row">                  
                            <span>{{row.item.documentType}}</span>
                        </template>
                        
                        <template v-slot:cell(preview)="data">                            
                            <embed v-if="data.item.file.type=='application/pdf'" style="float:right" :src="data.item.image" width="100" height="120" type="application/pdf">
                            <div style="float:right; margin-right:1rem;" v-else>
                                <b-row>
                                    <b-img  :style="{transform:'rotate('+data.item.imageRotation+'deg)'}" :src="data.item.image" width="100" height="100"  />
                                </b-row>
                                <b-row>
                                    <b-button size="sm" v-b-tooltip.hover.noninteractive.bottom = "'rotate image'"  style="width:3rem;height:1.2rem;padding:0; margin-right:0.25rem;" variant="info" @click="data.item.imageRotation=(data.item.imageRotation+270)%360">                                        
                                        <span class="fa fa-undo"></span>
                                    </b-button>
                                    <b-button size="sm" v-b-tooltip.hover.noninteractive.bottom = "'rotate image'" style="width:3rem;height:1.2rem;padding:0;" variant="info" @click="data.item.imageRotation=(data.item.imageRotation+90)%360">
                                        <span class="fa fa-undo" style="transform:rotateY(180deg)"></span>
                                    </b-button>                                    
                                </b-row>
                            </div>
                        </template>
                    </b-table>
                </b-card>

            </b-card>           

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
                <span class="text-primary" style='font-size:1.4rem;'>Filing with Court Services Online:</span>

                <div class="mt-3">
                    <div class="mb-3">
                        When you click Submit Documents, you will be taken to the Court Services Online e-filing hub. 
                        In the next few stpes you will be able to do a final review of the documents you are submitting 
                        for filing and (if completed successfully) you will receive a 
                        <div style="display:inline;">
                            <b style="display:inline;" v-b-tooltip.hover class="text-primary" title="A number assigned by the system to track the documents you have submitted for filing."> 
                                Package Number.
                                <div style="display:inline; font-size:1.2rem;" class="fa fa-question-circle"></div>
                            </b>
                        </div>
                    </div>
                    <p>
                        Once your filins have been reviewed by the court registry, you will be notified via e-mail.
                    </p>
                    <!-- <p style="font-weight: bold;">You will need your Court File Number if you are filing any additional documentation.</p> -->
                </div>

                <div v-if="error" style="margin:1rem auto; display: block;">
                    <b-badge class="bg-danger" style="margin:1rem auto; display: block;">{{error}}</b-badge>
                </div>

                <div style="width:19rem; margin: 0 auto;" v-b-tooltip.hover.v-danger  :title="submitEnable? '':'Please review your application before submission'">
                    <loading-spinner v-if="submitting" waitingText="Waiting for eFiling Hub ..."/> 
                    <b-button v-else
                        :disabled="!submitEnable"                   
                        v-on:click.prevent="submit()"                        
                        variant="success">
                            <span class="fa fa-paper-plane btn-icon-left"/>
                            Proceed to Submit
                    </b-button>                    
                    
                </div>
            </b-card>            
           
        </b-card>

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="lg" v-model="showTypeOfDocuments" hide-header-close hide-header>
            <b-card style="border-radius:10px" class="bg-light">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px; width:35rem; margin:0 auto; padding:1rem 0;">Specify the Type of Document(s)</h1>
                <div v-if="supportingFile" class="h3 my-4 text-center"><div class="mb-3"> File Name(s): </div> <span v-for="(file,inx) in supportingFile" :key="inx" style="display:block;" class="my-2  p-0 h3 text-success"> {{file["name"]}} </span> </div>
                <b-form-group style="width:30rem; margin: 2rem auto;"> 
                    <b-form-select
                        id="documentType"
                        v-model="fileType"
                        :state = "selectedDocumentTypeState?null:false">
                        <b-form-select-option v-for="docType in fileTypes" :value="docType.type" :key="docType.type">{{docType.description}}</b-form-select-option>  
                    </b-form-select>
                </b-form-group> 
            </b-card>
            <template v-slot:modal-footer>                
                <b-button style="margin-left: 0;margin-right:auto;" variant="primary" @click="showTypeOfDocuments=false">Cancel</b-button>
                <b-button style="margin-left: auto;margin-right:0;" variant="success" @click="addDocument()">Submit</b-button>
            </template>            
          
        </b-modal>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/manualForm";
const manualFormState = namespace("ManualForm");

import StepNumber from "@/components/utils/StepNumber.vue";
import GetHelpForPdf from "./components/GetHelpForPDF.vue";
import UploadDocumentHeader from "./components/UploadDocumentHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";

import JsonDocumentTypes from "@/components/utils/documentTypes.json"
import { manualFormSearchInfoType } from '@/types/Information/ManualForm';

@Component({
    components:{
        StepNumber,
        GetHelpForPdf,        
        UploadDocumentHeader,
        Spinner            
    }
})
export default class ChecklistOrders extends Vue { 

    @manualFormState.State
    public currentManualFormsId!: string;

    supportingDocuments = []; 
	    
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 

    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    responseOptions = [
        {text: 'New', value: true},
        {text: 'Existing', value: false}
    ];

    
    levelOfCourt = "Court of Appeal";

    fileNumberState = true;
    respondentState = true;

    dataReady = false;
    searching = false;
    resultsReady = false;
    stepStyle = "font-size: 2rem;";
    searchParams = {} as manualFormSearchInfoType;
    notFound = false;

    newApplication = null;    
    rejectionResponse = null;
    waiveFees = null;

    displayRejectionQuestion = false;
    displayWaiveFeesQuestion = false;    
    displayFileSearch = false;
    displayApplicationSubmission = false;

    update = 0;

    error = "";
    showGetHelpForPDF = false;

    submitting = false;
        
    supportingFile = null;
    selectedDocumentTypeState = true;
    selectedSupportingDocumentState = true;
    fileType = "";
    fileTypes = [];

    supportingDocumentFields = [
        { key: 'fileName', label: 'File Name',tdClass:'align-middle'},
        { key: 'fileType', label: 'File Type',tdClass:'align-middle'},
        { key: 'edit', thClass: 'd-none',tdClass:'align-middle'},
        { key: 'preview', thClass: 'd-none'}
    ];
       
    showTypeOfDocuments = false;
    submitEnable = true;
    
    mounted(){
        this.dataReady = false;  
        this.fileNumberState = true;
        this.respondentState = true;
        this.resultsReady = false;
        this.newApplication = null;       
        this.rejectionResponse = null;
        this.waiveFees = null;  
        this.fileTypes = JsonDocumentTypes;
        this.submitting = false;    
        this.error = ""     
        this.resetValues();
        this.searching = false;
        this.dataReady = true;  
        Vue.nextTick(()=>{
            const dropArea = document.getElementById('drop-area');
            dropArea.addEventListener('drop', this.handleFileDrop, false);
            dropArea.addEventListener('dragenter', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragleave', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragover', this.dragPreventDefaults, false);     
        })
    }

    public extractInfo(courtOrders: previousCourtJsonInfoType[]){

        let orders: orderInfoDataType[] = [];
        orders = courtOrders;

        for(const orderInx in orders){
            //console.log(orderInx)
            orders[orderInx].JudgeFullName = 'The Honourable ' +  
                (orders[orderInx].JudgeSalutation? orders[orderInx].JudgeSalutation + ' ':'') + 
                (orders[orderInx].JudgeFirstName? orders[orderInx].JudgeFirstName + ' ':'' )+ 
                (orders[orderInx].JudgeLastName? orders[orderInx].JudgeLastName:'');
        }

        return orders;        
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        this.fileNumberState = true;
        this.respondentState = true;

        if(!this.searchParams.file){
            this.fileNumberState = false;
            this.searching = false;
            return
        }

        if(!this.searchParams.searchBy){
            this.respondentState = false;
            this.searching = false;
            return
        }
        
        const url = '/form7s/?'+
            'caseNumber='+(this.searchParams.file?this.searchParams.file:'')+
            '&firstName='+(this.searchParams.firstName?this.searchParams.firstName:'')+
            '&lastName='+(this.searchParams.lastName?this.searchParams.lastName:'')+
            '&searchBy='+(this.searchParams.searchBy?this.searchParams.searchBy:'')+
            '&organizationName='+(this.searchParams.organizationName?this.searchParams.organizationName:''); 
        
        this.resultsReady = true;
        
        this.$http.get(url)
        .then(res => {            

            if (res.data){

                if(res.data?.parties){
                    this.extractInfo(res.data.parties)
                    // this.UpdatePartiesJson(res.data.parties);
                    // this.UpdateFileNumber(this.searchParams.file)                
                }

                
                //console.log(this.orders)
                
                this.notFound = false;

            } else {
                this.notFound = true;
            }
            this.searching = false;
            Vue.filter('scrollInto')('results-table')
                
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;     
        });
    }

    public resetValues(){
        this.displayRejectionQuestion = false;
        this.displayWaiveFeesQuestion = false;  
        this.displayFileSearch = false;
        this.displayApplicationSubmission = false;  
          
    }

    public updateNewApplication(){
        this.resetValues();        
        this.displayRejectionQuestion = this.newApplication != null;
        this.update++;
    }

    public updateRejectionQuestion(){
        this.resetValues();
        this.displayRejectionQuestion = true;       
        this.displayWaiveFeesQuestion = this.rejectionResponse != null;        
        this.update++;
    }

    public updateWaiveFeesQuestion(){
        this.resetValues();
        this.displayRejectionQuestion = true;
        this.displayWaiveFeesQuestion = true;  
        this.determineSubmissionQualification()
        this.update++;
    } 

    public determineSubmissionQualification(){

        // if ()

        this.displayApplicationSubmission = this.newApplication != null 
                                            && this.rejectionResponse == false 
                                            && this.waiveFees == false;

    }

    public submit() {
        
        this.error =""
        const bodyFormData = new FormData();
        const docType = []
        const lastFileTypes = this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:[]
        
        let fileIndex = 0;
        for(const filetype of lastFileTypes){
        
            const tempSupportingDocs = this.supportingDocuments?.filter(doc=>{return(doc.documentType==filetype)})
        
            if(tempSupportingDocs.length>0){
                const filesIndices = [];
                const filesRotation = [];
                for(const supportingDoc of tempSupportingDocs){
                    bodyFormData.append('files',supportingDoc['file']);
                    filesIndices.push(fileIndex)
                    filesRotation.push(supportingDoc['imageRotation'])
                    fileIndex++;
                }
                docType.push({type: tempSupportingDocs[0]['documentType'], files: filesIndices, rotations:filesRotation})
            }
        }
        
        const docTypeJson = JSON.stringify(docType);
        bodyFormData.append('documents', docTypeJson);          
        
        this.submitting = true;
        const url = "/form5/efiling/"+this.currentManualFormsId+"/submit/";
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json"                  
            }
        }
        
        this.$http.post(url, bodyFormData, header)
        .then(res => {
            this.submitting = false;
            if(res.data?.message=="success" && res.data?.redirectUrl){
                const eFilingUrl = res.data?.redirectUrl
                location.replace(eFilingUrl);
            }
            
        }, err => {
            console.log(err.response?.data?.message);
            const generalError = " Error in submission. Please refresh the page and try again."
            if(err.response?.data?.message)
                this.error = err.response.data.message
            else if(err.response?.data?.detail)
                this.error = err.response.data.detail+generalError
            else
                this.error = generalError
            this.submitting = false;
        });        

    }

    public dragPreventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    public handleFileDrop(e) {
        e.preventDefault()
        e.stopPropagation()
        const dt = e.dataTransfer
        const files = dt.files

        if (files && files[0]) 
        {
            this.supportingFile = files;            
            this.showTypeOfDocuments= true;
        }
    } 

    public uploadClicked(){
        const el = document.getElementById("inputfile");
        if(el) el.click();
    }

    public handleSelectedFile(event){

        event.preventDefault();
        event.stopPropagation();
        
        if (event.target.files && event.target.files[0]) 
        {
            this.supportingFile = event.target.files;
            this.showTypeOfDocuments= true;
        }
    }

    public addDocument() {
        this.selectedDocumentTypeState = this.fileType.length>0? true: false;

        if (this.supportingFile && this.fileType.length>0) {

            this.showTypeOfDocuments = false;

            const supportingdocuments = this.supportingDocuments 
            let typeIndex =  this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:[]
            if(!typeIndex.includes(this.fileType))
                typeIndex.push(this.fileType)
            
            for(const supportingfile of this.supportingFile){
            
                const newFile = {
                    "fileName": supportingfile.name,
                    "file": supportingfile,
                    "documentType": this.fileType,
                    "image": URL.createObjectURL(supportingfile),
                    "imageRotation": 0,
                    "typeIndex":typeIndex
                }
                supportingdocuments.push(newFile);
            }

            
            this.supportingFile = null;
            this.fileType = "";
            Vue.nextTick(()=>{
                const el = document.getElementById('drop-area');
                if(el) el.scrollIntoView();
            })
        }
    }

    public removeDocument(index) {
        this.supportingDocuments.splice(index, 1);
    }
  

}
</script>

<style scoped lang="scss">
    .btnfile {
        margin:0 0 0.5rem 0;
        padding: 0;
        width: 25px;
        height: 25px;       
        border-radius: 17px; 
        background: rgb(4, 153, 49);
        font-size: 30px;
        color: white;
    }
    .btnfile:hover {
        background-color: #103c6b;
        color: white;
    }
    #drop-area {
        border: 2px dashed #ccc;
        border-radius: 20px;        
        margin: 10px 1.5rem;
        padding: 0;
    }
    #drop-area.highlight {
    border-color: purple;
    }

</style>