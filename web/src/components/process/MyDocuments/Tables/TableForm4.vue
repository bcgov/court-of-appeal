<template>
    <div> 

        <b-alert
            :show="errorMsgDismissCountDown"
            dismissible
            variant="danger"
            @dismissed="errorMsgDismissCountDown=0"
            @dismiss-count-down="errorMsgCountDownChanged"
        > 
            {{errorMsg}}
        </b-alert>

        <b-row v-if="enableActions && documentsList.length" class="bg-form4 mb-2 py-1 mx-0">
            <b-col cols="10">
                <div style="font-weight:600; font-size:14pt; margin:0 0 0 18rem;" class="p-0 text-center">Notice of Application (Form 4)</div>
            </b-col>
            <b-col  cols="2">
                <b-button 
                    class="mr-2  bg-light border border-primary"
                    size="sm"
                    @click="downloadDocument('')"
                    v-b-tooltip.hover.noninteractive
                    title="download selected">
                    <b-icon-download variant="primary"/>
                </b-button>
                <b-button 
                    class="mr-2 bg-light border border-danger" 
                    size="sm"
                    @click="deleteDocument"
                    v-b-tooltip.hover.noninteractive.v-danger
                    title="delete selected">
                    <b-icon-trash-fill variant="danger"/>
                </b-button>
                <b-button 
                    class="bg-light border border-success"
                    size="sm"
                    @click="createDocument"
                    v-b-tooltip.hover.noninteractive.v-success
                    title="create new submission">
                    <b-icon-plus scale="1.5" variant="success"/>
                </b-button>
            </b-col>
        </b-row>

        <b-row v-else-if="documentsList.length" class="bg-select mb-0 py-1 mx-0">
            <b-col cols="12">
                <div style="font-weight:600; line-height:0.6rem; font-size:10pt; margin:0 0 0 0rem;" class="p-0 text-center text-primary">Notice of Application (Form 4) </div>
            </b-col>
        </b-row>
       

        <b-row v-if="documentsList.length" style="p-0">
            <b-col> 
                <b-card no-body border-variant="white" bg-variant="white" v-if="!documentsList.length">
                    <span class="text-muted ml-4 mb-5">No documents.</span>
                </b-card>

                <b-card v-else no-body border-variant="light" bg-variant="white">
                    <b-table  
                        :items="documentsList"
                        :fields="documentsFields"
                        style="font-size: 0.85rem;"
                        class="mx-2 my-0"  
                        head-row-variant="primary"                      
                        sort-by="modifiedDate"
                        :sort-desc="true"
                        borderless
                        :thead-class="enableActions?'':'m-0 p-0 h6'"
                        sort-icon-left
                        striped
                        small 
                        responsive="sm"
                        >

                        <template v-if="enableActions" v-slot:head(select) >                                  
                            <b-form-checkbox                            
                                class="m-0"
                                v-b-tooltip.hover.left
                                title="Select All"
                                v-model="allDocumentsChecked"
                                @change="checkAllDocuments"                                                                       					
                                size="sm"/>
                        </template>

                        <template v-if="enableActions" v-slot:cell(select)="data" >                                  
                            <b-form-checkbox
                                size="sm"
                                class="m-0"
                                v-b-tooltip.hover.noninteractive.v-warning
                                :title="data.item.status=='Submitted'?'Cannot Delete submitted app':''"
                                v-model="data.item.isChecked"
                                @change="toggleSelectedDocuments"                                            					
                                />
                        </template>

                        <template v-slot:cell(action)="row">
                            <b-button v-if="row.item.status == 'Draft'" size="sm" variant="transparent" class="my-0 py-0 px-1"
                                @click="resumeApplication(row.item)"
                                v-b-tooltip.hover.noninteractive
                                title="Resume Application">
                                <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                            </b-button>
                            <b-button 
                                v-else-if="row.item.status == 'Submitted'" 
                                size="sm" 
                                variant="transparent" 
                                class="my-0 py-0 px-1"
                                @click="navigateToEFilingHub(row.item.packageUrl)"
                                    v-b-tooltip.hover.noninteractive.v-info
                                    title="Navigate To Submitted Application">
                                    <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                            </b-button>
                            <b-button 
                                v-if="row.item.pdf_types"
                                variant="transparent"
                                class="m-0 p-0"
                                @click="downloadDocument(row.item.fileNumber)"
                                v-b-tooltip.hover.noninteractive.v-success
                                title="Download the generated PDF">
                                <span style="font-size:18px; padding:0; transform:translate(2px,1px);" class="far fa-file-pdf btn-icon-left text-success ml-1"/>
                            </b-button>                            
                        </template>

                        <template v-slot:cell(status)="row">                  
                            <span v-if="row.value == 'Submitted'" class="text-white bg-success px-1">{{row.value}}</span> 
                            <span v-if="row.value == 'Draft'" class="text-primary">{{row.value}}</span>

                        </template>

                        <template v-slot:cell(parties)="row">                  
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.appNames">{{ row.item.appNames | truncate-text(10)}}
                            </span>
                            <b class="text-info"> / </b>
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.resNames">{{ row.item.resNames | truncate-text(10)}}
                            </span>
                           
                        </template>

                        <template v-slot:cell(description)="row">                  
                            <ul style="list-style-type: ''; padding-inline-start: 3px; margin:0; padding:0;">
                                <li  v-for="(desc,inx) in row.value" 
                                    :key="inx"
                                    v-b-tooltip.hover.noninteractive
                                    :title="desc">
                                    {{desc | truncate-text(20)}}
                                    </li>
                            </ul>
                        </template>
                        
                        <template v-slot:cell(modifiedDate)="row">                  
                            <span>{{ row.item.modifiedDate | beautify-date-weekday}}</span>
                        </template>
                        
                    </b-table>
                </b-card>                
            </b-col>
        </b-row>


        <b-modal size="lg" v-model="confirmDelete" id="bv-modal-confirm-delete" header-class="bg-danger text-light">                    
            <template v-slot:modal-title>
                <h3 class="mb-0 text-light">Confirm Delete Application</h3>                                  
            </template>
            <h4 v-if="applicationsToDelete.length>0">Are you sure you want to delete the selected <b>"{{applicationsToDelete.join(', ')}}"</b> <b class="text-danger"> Notice of Application </b> application<span v-if="applicationsToDelete.length>1" >s</span>?</h4>            
            <h4 v-if="applicationsNotAllowedToDelete.length>0" class="text-danger"> You cannot delete the submitted application<span v-if="applicationsNotAllowedToDelete.length>1" >s</span> <b> "{{applicationsNotAllowedToDelete.join(', ')}}"</b> !</h4>
            <template v-slot:modal-footer>
                <b-button v-if="applicationsToDelete.length>0" variant="danger" @click="confirmDeleteApplication()">Confirm</b-button>
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button style="height:1rem" variant="outline-warning" class="m-0 p-0 text-light closeButton" @click="$bvModal.hide('bv-modal-confirm-delete')"
                ><div style="transform: translate(0px, -20px); ">&times;</div></b-button>
            </template>
        </b-modal>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as _ from 'underscore';

import { namespace } from "vuex-class";
import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import { documentInfoType } from "@/types/Information";
import { form4FormsJsonDataType } from "@/types/Information/Form4";

@Component
export default class TableForm4 extends Vue {

    @Prop({required: true})
    enableActions!: boolean;
    
    @form4State.State
    public form4FormsJson!: form4FormsJsonDataType[];
    
    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
    
    allDocumentsChecked = false;
    showSelectFormToFill = false;
    
    documentsList: documentInfoType[] = [];
  
    documentsFields = [
        {
            key:'select',          
            label:'',                  
            thClass: 'border-dark border-bottom',            
            sortable:false            
        },       
        {
            key: "fileNumber",
            label: "App #",
            sortable: true,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "description",
            label: "Document Description",
            sortable: false,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "caseNumber",
            label: "File #",
            sortable: false,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "parties",
            label: "Parties",
            sortable: false,
            thClass: 'border-dark border-bottom',
        },           
        {
            key: "status",
            label: "Status",
            sortable: true,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "modifiedDate",
            label: "Last Updated",
            sortable: true,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "packageNum",
            label: "eFiling #",
            sortable: true,
            thClass: 'border-dark border-bottom',
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            thClass: 'border-dark border-bottom',
        }
    ];

    confirmDelete = false;
    applicationsToDelete = [];
    applicationsNotAllowedToDelete = [];

    errorMsg = "";
    errorMsgDismissCountDown = 0;
   

    mounted() {
        // console.log('form 4s')
        this.extractDocuments();       
    }

    public extractDocuments () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly    
        this.documentsList = [];
        for (const docJson of this.form4FormsJson) {                
            const doc = {
                isChecked: false, 
                pdf_types:'', 
                fileNumber:0, 
                caseNumber:'', 
                parties:'', 
                appNames: '', 
                resNames: '', 
                status:'', 
                modifiedDate:'', 
                packageNum:'',
                packageUrl:'',
                description:[]
            };
            //console.log(docJson)
            doc.fileNumber = docJson.id;
            doc.caseNumber = docJson.data.formSevenNumber;
            doc.status = docJson.status;
            doc.modifiedDate = docJson.modified;
            doc.pdf_types = docJson.pdf_types;
            doc.description = [docJson.description];
            doc.packageUrl = docJson.packageUrl;
            doc.packageNum = docJson.packageNumber;

            const appellants = docJson.data.appellants;
            const respondents = docJson.data.respondents;

            // console.log(appellants)
            const app_names = [];
            const res_names = [];
            for (const app of appellants){
                app_names.push(app.name)                
            }
            for (const res of respondents){
                res_names.push(res.name)                
            }
            doc.appNames = app_names.join(', ')
            doc.resNames = res_names.join(', ');

            this.documentsList.push(doc);
        }
        
        if(!this.enableActions && this.documentsList.length>2){            
            this.documentsList = _.sortBy(this.documentsList, 'modifiedDate').reverse().splice(0,2)
        }   
    }

    public resumeApplication(fileInfo: documentInfoType) {
        const caseId = fileInfo.fileNumber.toString()
        this.UpdateCurrentNoticeOfApplicationId(caseId);  
        // console.log(fileInfo)      
        this.$router.push({name: "fill-form4"});
       
    }

    public createDocument() {
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

    public downloadDocument(fileNumber?) {
        const checkedFileIdsList = this.documentsList.filter(doc => {return doc.isChecked}).map(doc => doc.fileNumber)

        if(fileNumber || checkedFileIdsList.length>0){
            
            const filenum = fileNumber? fileNumber: '0';
            const pdf_filename = fileNumber? "Form.pdf":"Form.zip";

            let pdfIds = ''
            for(const fileId of checkedFileIdsList)
                pdfIds+= '&id='+fileId;

            if(fileNumber) pdfIds = ''

            const pdf_type = 'FORM';
            const url = '/form4/form-print/'+filenum+'/?pdf_type='+pdf_type+pdfIds;
            const options = {
                responseType: "blob",
                headers: {
                "Content-Type": "application/json",
                }
            }
            this.$http.get(url, options)
            .then(res => {
                const blob = res.data;
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.download = pdf_filename;
                link.click();
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            },err => {
                          
                this.errorMsg = "PDF file has not been generated for the selected documents !"
                this.errorMsgDismissCountDown = 3;                
            });
        }
    }

    public navigateToEFilingHub(package_url) {
        window.open(package_url)
    }

    public deleteDocument() {

        this.applicationsToDelete = this.documentsList.filter(doc => {return (doc.isChecked && doc.status !='Submitted')}).map(doc => doc.fileNumber)
        this.applicationsNotAllowedToDelete = this.documentsList.filter(doc => {return (doc.isChecked && doc.status =='Submitted')}).map(doc => doc.fileNumber)

        if(this.applicationsToDelete.length>0 || this.applicationsNotAllowedToDelete.length>0){
            this.confirmDelete=true;            
        }
    }

    public confirmDeleteApplication() { 
        const data ={
            data:{
                ids:this.applicationsToDelete
            }
        }

        const url = '/form4/forms';

        this.$http.delete(url, data)
        .then(response => {
            
            if(response?.status == 204)
                this.$emit('reload')

        }, err => {
            this.errorMsg = "Error while Deleting !"
            this.errorMsgDismissCountDown = 2;
        })
        
        this.confirmDelete=false;

    }

    public checkAllDocuments(checked){
        for(const docInx in this.documentsList) {       
            this.documentsList[docInx].isChecked = checked;              
        }        
    }

    public toggleSelectedDocuments() {  
        Vue.nextTick(()=>{

            const checkedDocs = this.documentsList.filter(document=>{return document.isChecked});
            
            if(checkedDocs.length == this.documentsList.length)
                this.allDocumentsChecked = true;
            else
                this.allDocumentsChecked = false;                       
        })        
	}

    public errorMsgCountDownChanged(dismissCountDown){
        this.errorMsgDismissCountDown = dismissCountDown
    }
}
</script>

<style scoped lang="scss">
    @import "src/styles/common";
    @import "~@fortawesome/fontawesome-free/css/all.min.css";
    
    .home-content {
        padding-bottom: 20px;
        padding-top: 2rem;
        max-width: 950px;
        color: black;
    }

    .register-button {
        color: $gov-white !important;
        border: 2px solid rgba($gov-mid-blue, 0.3);
        margin-top: 2.5rem;
        width: 100%;
        &:active {
            border: 2px solid rgba($gov-white, 0.8);
        }
    }

    .terms {
        color: $gov-mid-blue;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }

    button {
        border: 0px;
    }
</style>
