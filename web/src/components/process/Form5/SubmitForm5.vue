<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-5-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <b-row class="ml-2" style="font-size: 2rem;">
                Submit through E-Filing
            </b-row> 
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                By submitting, you will be redirected to the E-Filing Hub.
            </b-row>

            <b-card id="drop-area" @click="uploadClicked" class="mb-5">                    
                <div style="padding:0; margin: 0 auto; width:33px;">
                    <label class="btn btn-default btnfile">
                        <span style="font-size:20px; transform:translate(0,-17px);" class="fa fa-plus"></span>                            
                    </label>
                </div>
                <input id="inputfile" type="file" multiple style="display: none;" accept="application/pdf,image/x-png,image/jpeg" @change="handleSelectedFile" onclick="this.value=null;">
                <p class="text-center m-0 text-info">Drag and Drop the PDF documents or JPG/PNG images here,</p>
                <p class="text-center m-0 text-info" > or click here to Browse for files</p>
            </b-card>

            <b-card border-variant="white" bg-variant="white" no-body v-if="!supportingDocuments.length">
                <span class="text-muted text-center py-3">No uploaded documents.</span>
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

            

            <b-row class="mt-5">
                <b-alert
                    :show="errorMsg !=''"
                    style="margin:0 0 2rem auto;"
                    dismissible
                    variant="danger"
                > {{errorMsg}}
                </b-alert>
            </b-row>

            <b-row class="ml-5">
                <b-col cols="10">
                    <b-button 
                        style="float: right; width: 120px; height: 50px; font-size: 20px;" 
                        variant="danger"
                        @click="cancel()"
                        >
                        Cancel
                    </b-button>
                </b-col>
                <b-col cols="2">
                    <b-button
                        style="float: left; width: 120px; height: 50px; font-size: 20px; opacity:1;" 
                        :disabled="submitting"
                        variant="success"
                        @click="submit()"
                        ><spinner color="#FFF" v-if="submitting" style="margin:0; padding: 0; transform:translate(0px,-22px);"/>
                        <span v-else style="margin:0; padding: 0;">Submit
                        <span style="margin:0; padding: 0;" class="fa fa-paper-plane btn-icon-left"/></span>
                    </b-button>
                </b-col>
            </b-row>

        </b-card>



        <b-modal size="lg" v-model="showTypeOfDocuments" hide-header-close hide-header>
            <b-card style="border-radius:10px" class="bg-light">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px; width:35rem; margin:0 auto; padding:1rem 0;">Specify the Type of Document(s)</h1>
                <div v-if="supportingFile" class="h3 my-4 text-center"><div class="mb-3"> File Name(s): </div> <span v-for="(file,inx) in supportingFile" :key="inx" style="display:block;" class="my-2  p-0 h3 text-success"> {{file["name"]}} </span> </div>
                <b-form-group style="width:30rem; margin: 2rem auto;"> 
                    <b-form-select
                        id="documentType"
                        v-model="fileType"
                        :state = "selectedDocumentTypeState?null:false">
                        <b-form-select-option v-for="docType in documentTypesJson" :value="docType.type" :key="docType.type">{{docType.description}}</b-form-select-option>  
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

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/common";
const commonState = namespace("Common");

import Form5ProcessHeader from "@/components/process/Form5/components/Form5ProcessHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";
import { form5StatusInfoType } from '@/types/Information/Form5';
import { packageInfoType } from '@/types/Information';
import { documentTypesJsonInfoType } from '@/types/Common';


@Component({
    components:{
        Form5ProcessHeader,
        Spinner
    }
})
export default class SubmitForm5 extends Vue {

    @form5State.State
    public currentNoticeOfHearingOfAppealId: string;

    @form5State.State
    public supportingDocuments!: any;

    @form5State.Action
    public UpdateSupportingDocuments!: (newSupportingDocuments) => void

    @commonState.State
    public documentTypesJson: documentTypesJsonInfoType[]

    stepsCompleted = {} as form5StatusInfoType;  
    mountedData = false; 
    packageInfo = {} as packageInfoType;
    submitting = false;
    errorMsg=""

    supportingFile = null;
    showTypeOfDocuments = false;
    fileType = "";

    selectedDocumentTypeState = true;
    supportingDocumentFields = [
        { key: 'fileName', label: 'File Name',tdClass:'align-middle'},
        { key: 'fileType', label: 'File Type',tdClass:'align-middle'},
        { key: 'edit', thClass: 'd-none',tdClass:'align-middle'},
        { key: 'preview', thClass: 'd-none'}
    ];

    mounted() {
        this.mountedData = false;       
        this.submitting = false;    
        this.errorMsg = ""
        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }
        this.mountedData = true;

        Vue.nextTick(()=>{
            const dropArea = document.getElementById('drop-area');
            dropArea.addEventListener('drop', this.handleFileDrop, false);
            dropArea.addEventListener('dragenter', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragleave', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragover', this.dragPreventDefaults, false);     
        })
    }  

    public submit() {        
        this.errorMsg =""
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
        const url = "/form5/efiling/"+this.currentNoticeOfHearingOfAppealId+"/submit/";
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json"                  
            }
        }
        
        this.$http.post(url, bodyFormData, header)
        .then(res => {
            // this.submitting = false;
            if(res.data?.message=="success" && res.data?.redirectUrl){
                const eFilingUrl = res.data?.redirectUrl
                location.replace(eFilingUrl);
            }else
                this.submitting = false;
            
        }, err => {
            console.log(err.response?.data?.message);
            const generalError = " Error in submission. Please refresh the page and try again."
            if(err.response?.data?.message)
                this.errorMsg = err.response.data.message
            else if(err.response?.data?.detail)
                this.errorMsg = err.response.data.detail+generalError
            else
                this.errorMsg = generalError
            this.submitting = false;
        });        

    }

    public cancel() {
        this.UpdateSupportingDocuments([])
        this.$router.push({name: "dashboard" }) 
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

            this.UpdateSupportingDocuments(supportingdocuments);
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