<template>
    <b-card border-variant="white" id="documents"> 

        <b-alert
            :show="errorMsgDismissCountDown"
            dismissible
            variant="danger"
            @dismissed="errorMsgDismissCountDown=0"
            @dismiss-count-down="errorMsgCountDownChanged"
        > 
            {{errorMsg}}
        </b-alert>
        <b-row v-if="enableActions" class="mb-2">
            <b-col cols="9">
                <h3>{{title}}</h3>
            </b-col>
            <b-col  cols="3">
                <b-button 
                    class="mr-2  bg-transparent border border-primary"
                    size="lg"
                    @click="downloadDocument"
                    v-b-tooltip.hover.noninteractive
                    title="download">
                    <b-icon-download variant="primary"/>
                </b-button>
                <b-button 
                    class="mr-2 bg-transparent border border-primary" 
                    size="lg"
                    @click="archiveDocument"
                    v-b-tooltip.hover.noninteractive
                    title="archive">
                    <b-icon-archive-fill variant="primary"/>
                </b-button>
                <b-button 
                    class="bg-transparent border border-primary"
                    size="lg"
                    @click="createDocument"
                    v-b-tooltip.hover.noninteractive
                    title="create">
                    <b-icon-plus variant="primary"/>
                </b-button>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col>
                <h3>{{title}}</h3>
            </b-col>            
        </b-row>          
        <b-row>
            <b-col> 
                <b-card no-body border-variant="white" bg-variant="white" v-if="!documentsList.length">
                    <span class="text-muted ml-4 mb-5">No documents.</span>
                </b-card>

                <b-card v-else no-body border-variant="light" bg-variant="white">
                    <b-table  :items="documentsList"
                        :fields="documentsFields"
                        class="mx-4"
                        sort-by="modifiedDate"
                        :sort-desc="true"
                        borderless
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
                                v-model="data.item.isChecked"
                                @change="toggleSelectedDocuments"                                            					
                                />
                        </template>

                        <template v-slot:cell(action)="row">
                            <b-button v-if="row.item.status == 'Draft'" size="sm" variant="transparent" class="my-0 py-0"
                                @click="resumeApplication(row.item.fileNumber)"
                                v-b-tooltip.hover.noninteractive
                                title="Resume Application">
                                <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                            </b-button>
                            <b-button v-else-if="row.item.status == 'Submitted'" size="sm" variant="transparent" class="my-0 py-0"
                                @click="navigateToEFilingHub(row.item.package_url)"
                                    v-b-tooltip.hover.noninteractive
                                    title="Navigate To Submitted Application">
                                    <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                            </b-button>
                            
                        </template>

                        <template v-slot:cell(status)="row">                  
                            <span>{{ row.item.status}}</span>
                            <span 
                                v-if="row.item.pdf_types"
                                style="font-size:14px; padding:0; transform:translate(2px,-1px);" 
                                class="far fa-file-pdf btn-icon-left text-success ml-1"
                                v-b-tooltip.hover.noninteractive
                                title="PDF generated"/> 
                        </template>

                        <template v-slot:cell(parties)="row">                  
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.appNames">{{ row.item.appNames | truncate-word-after(10)}}
                            </span>
                            <b class="text-info"> / </b>
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.resNames">{{ row.item.resNames | truncate-word-after(10)}}
                            </span>
                           
                        </template>
                        
                        <template v-slot:cell(modifiedDate)="row">                  
                            <span>{{ row.item.modifiedDate | beautify-date-weekday}}</span>
                        </template>
                        
                    </b-table>
                </b-card>                
            </b-col>
        </b-row>


        <b-modal v-model="confirmArchive" id="bv-modal-confirm-archive" header-class="bg-warning text-light">                    
            <template v-slot:modal-title>
                <h3 class="mb-0 text-light">Confirm Archive Application</h3>                                  
            </template>
            <h4>Are you sure you want to archive your <b>"{{applicationsToArchive.join(', ')}}"</b> application<span v-if="applicationsToArchive.length>1" >s</span>?</h4>            
            <template v-slot:modal-footer>
                <b-button variant="danger" @click="confirmArchiveApplication()">Confirm</b-button>
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-confirm-archive')">Cancel</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-confirm-archive')"
                >&times;</b-button>
            </template>
        </b-modal>

    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { caseJsonDataType } from "@/types/Information/json";
const informationState = namespace("Information");

@Component
export default class MyDocumentsTable extends Vue {

    @Prop({required: true})
    title!: string;

    @Prop({required: true})
    enableActions!: boolean;
    
    @informationState.State
    public casesJson!: caseJsonDataType[];
    
    @informationState.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    allDocumentsChecked = false;
    
    documentsList = [];
  
    documentsFields = [
        {
            key:'select',          
            label:'',                  
            tdClass: 'border-top', 
            cellStyle: 'font-size: 16px;', 
            sortable:false            
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            tdClass: "border-top"
        },
        {
            key: "fileNumber",
            label: "File #",
            sortable: true,
            tdClass: "border-top"
        },
        {
            key: "caseNumber",
            label: "Case #",
            sortable: false,
            tdClass: "border-top"
        },
        {
            key: "parties",
            label: "Parties",
            sortable: false,
            tdClass: "border-top"
        },        
        {
            key: "status",
            label: "Status",
            sortable: true,
            tdClass: "border-top"
        },
        {
            key: "modifiedDate",
            label: "Recently Modified",
            sortable: true,
            tdClass: "border-top"
        }
    ];

    confirmArchive = false;
    applicationsToArchive = [];

    errorMsg = "";
    errorMsgDismissCountDown = 0;
   

    mounted() {
        this.extractDocuments();       
    }

    public extractDocuments () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly    
        this.documentsList = [];
        for (const docJson of this.casesJson) {                
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
                packageUrl:''
            };
            //console.log(docJson)
            doc.fileNumber = docJson.id;
            doc.caseNumber = docJson.data.formSevenNumber;
            doc.status = docJson.archive? "Archived":docJson.status;
            doc.modifiedDate = docJson.modified;
            doc.pdf_types = docJson.pdf_types;
            const appellants = docJson.data.appellants;
            const respondents = docJson.data.respondents;
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
    }

    public resumeApplication(caseId) {
        console.log(caseId)
        this.UpdateCurrentCaseId(caseId);
        this.$router.push({name: "preview", params: {caseId: caseId}}) 

    }

    public createDocument() {
        this.$router.push({name: "start" })
    }

    public downloadDocument() {
        
        const checkedFileIdsList = this.documentsList.filter(doc => {return doc.isChecked}).map(doc => doc.fileNumber)

        if(checkedFileIdsList.length>0){
            let pdfIds = ''
            for(const fileId of checkedFileIdsList)
                pdfIds+= '&id='+fileId;

            const pdf_type = 'FORM';
            const url = '/form-print/0/?pdf_type='+pdf_type+pdfIds;
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
                link.download = pdf_type+".zip";
                link.click();
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            },err => {
                          
                this.errorMsg = "PDF file has not been generated for the selected documents !"
                this.errorMsgDismissCountDown = 5;                
            });
        }
    }

    public navigateToEFilingHub(package_url) {
        location.replace(package_url)
    }

    public archiveDocument() {

        const checkedFileIdsList = this.documentsList.filter(doc => {return doc.isChecked}).map(doc => doc.fileNumber)
        
        this.applicationsToArchive = checkedFileIdsList;
        if(checkedFileIdsList.length>0){
            this.confirmArchive=true;            
        }
    }

    public confirmArchiveApplication() { 
        
        let pdfIds = ''       
        for(const fileId of this.applicationsToArchive)
            pdfIds+= '&id='+fileId;
        
        const url = '/case/0/?'+pdfIds;
        const body = {
            archive: true
        } 

        this.$http.put(url, body)
        .then(response => {
            
            if(response?.data =="success")
                this.$emit('reload')

        }, err => {
            this.errorMsg = "Error while archiving !"
            this.errorMsgDismissCountDown = 2;
        })
        
        this.confirmArchive=false;

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

    button {
    border: 0px;
    }
</style>
