<template>
    <b-card border-variant="white" id="documents">  
        <b-row v-if="enableActions">
            <b-col cols="9">
                <h1>{{title}}</h1>
            </b-col>
            <b-col  cols="3">
                <b-button 
                    class="mr-2 bg-transparent outline-primary"
                    size="lg"
                    @click="downloadDocument"
                    v-b-tooltip.hover.noninteractive
                    title="download">
                    <b-icon-download variant="primary"/>
                </b-button>
                <b-button 
                    class="mr-2 bg-transparent border-primary" 
                    size="lg"
                    @click="archiveDocument"
                    v-b-tooltip.hover.noninteractive
                    title="archive">
                    <b-icon-archive-fill variant="primary"/>
                </b-button>
                <b-button 
                    class="bg-transparent outline-primary"
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
                <h1>{{title}}</h1>
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
                        sort-by="lastUpdated"
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
                            
                        </template>
                        
                        
                        <template v-slot:cell(modifiedDate)="row">                  
                            <span>{{ row.item.modifiedDate | beautify-date-weekday}}</span>
                        </template>
                        
                    </b-table>
                </b-card>                
            </b-col>
        </b-row>


        <b-modal v-model="confirmArchive" id="bv-modal-confirm-archive" header-class="bg-warning text-light">
            <b-row v-if="archiveError" id="ArchiveError" class="h4 mx-2">
                <b-badge class="mx-1 mt-2"
                    style="width: 20rem;"
                    v-b-tooltip.hover
                    :title="archiveErrorMsgDesc"
                    variant="danger"> {{archiveErrorMsg}}
                    <b-icon class="ml-3"
                        icon = x-square-fill
                        @click="archiveError = false"/>
                </b-badge>                    
            </b-row>            
            <template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Archive Application</h2>                                  
            </template>
            <h4 >Are you sure you want to archive your <b>"{{applicationsToArchive}}"</b> application?</h4>            
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
const informationState = namespace("Information");

@Component
export default class MyDocumentsTable extends Vue {

    @Prop({required: true})
    title!: string;

    @Prop({required: true})
    enableActions!: boolean;
    
    @informationState.State
    public casesJson!: any[]; 
    
    allDocumentsChecked = false;    
    selectedDocuments: string[] = [];
    
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
            sortable: false,
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
            sortable: false,
            tdClass: "border-top"
        },
        {
            key: "modifiedDate",
            label: "Recently Modified",
            sortable: false,
            tdClass: "border-top"
        }
    ];

    checkedDocs = [];

    confirmArchive = false;
    currentApplication = {};
    applicationsToArchive = [];
    indexesToArchive = [-1];

    archiveErrorMsg = "";
    archiveErrorMsgDesc = "";
    archiveError = false;

    mounted() {  

        this.extractDocuments();
       
    }

    public extractDocuments () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly    
       
        for (const docJson of this.casesJson) {                
            const doc = {isChecked: false, fileNumber:0, caseNumber:0, parties:'', status:'', modifiedDate:'', packageNum:'', last_efiling_submission:{package_number:'',package_url:''}};
            console.log(docJson)
            doc.fileNumber = docJson.id;
            doc.caseNumber = docJson.data.formSevenNumber;
            doc.status = docJson.status;
            doc.modifiedDate = docJson.modified;

            this.documentsList.push(doc);
        }      
    }

    public resumeApplication(documentId) {

        this.$router.push({name: "preview" }) 

    }

    public createDocument() {
        this.$router.push({name: "start" })
    }

    public downloadDocument() {
        console.log('downloading')

    }

    public archiveDocument() {
        this.archiveErrorMsg = '';
        this.archiveErrorMsgDesc = '';
        this.archiveError = false;
        //   this.applicationToArchive = application;
        //   this.indexesToArchive = index;
        this.confirmArchive=true;
    }

    public confirmArchiveApplication() {
        // this.$http.delete('/app/'+ this.applicationsToArchive['fileNumber'] + '/')
        // .then((response) => {
        //     //   var indexToArchive = this.documents.findIndex((app) =>{if(app.id == this.applicationToArchive['id'])return true});
        //     //   if(indexToArchive>=0)this.documents.splice(indexToArchive, 1);

        // },err => {
        //     const errMsg = err.response.data.error;
        //     this.archiveErrorMsg = errMsg.slice(0,60) + (errMsg.length>60?' ...':'');
        //     this.archiveErrorMsgDesc = errMsg;
        //     this.archiveError = true;
        // });
        this.confirmArchive=false;
    }

    public checkAllDocuments(checked){
        for(const docInx in this.documentsList) {       
            this.documentsList[docInx].isChecked = checked;              
        }        
    }

    public toggleSelectedDocuments() {  
        Vue.nextTick(()=>{

            this.checkedDocs = this.documentsList.filter(document=>{return document.isChecked});
            
            if(this.checkedDocs.length == this.documentsList.length)
                this.allDocumentsChecked = true;
            else
                this.allDocumentsChecked = false;                       
        })        
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
