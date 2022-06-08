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

        
        <b-row class="bg-manualForm mb-2 py-1 mx-0">    
            <b-col cols="10">
                <div 
                    style="font-weight:600; font-size:14pt; margin:0 0 0 18rem;" 
                    class="p-0 text-center text-white">
                    Manually Submitted Files
                </div>
            </b-col>
            <b-col  cols="2">               
                <b-button 
                    class="bg-light border border-success mr-3"
                    size="sm"
                    style="float: right;"
                    @click="createDocument"
                    v-b-tooltip.hover.noninteractive.v-success
                    title="create new submission">
                    <b-icon-plus scale="1.5" variant="success"/>
                </b-button>
            </b-col>
        </b-row>


        <b-row style="p-0">
            <b-col> 
                <b-card no-body border-variant="white" bg-variant="white" v-if="!documentsList.length">
                    <span class="text-muted ml-4 mb-5">No documents.</span>
                </b-card>

                <b-card v-else no-body border-variant="light" bg-variant="white">
                    <b-table  
                        :items="documentsList"
                        :fields="documentsFields"
                        style="font-size: 0.85rem;"
                        class="mx-2"  
                        head-row-variant="primary"                      
                        sort-by="modifiedDate"
                        :sort-desc="true"
                        borderless
                        sort-icon-left
                        striped
                        small 
                        responsive="sm"
                        >
                        
                        <template v-slot:cell(action)="row">                           
                            <b-button 
                                v-if="row.item.status == 'Submitted'" 
                                size="sm" 
                                variant="transparent" 
                                class="my-0 py-0 px-1"
                                @click="navigateToEFilingHub(row.item.packageUrl)"
                                    v-b-tooltip.hover.noninteractive.v-info
                                    title="Navigate To Submitted Application">
                                    <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                            </b-button>
                        </template>

                        <template v-slot:cell(status)="row">                  
                            <span v-if="row.value == 'Submitted'" class="text-white bg-success px-1">{{row.value}}</span> 
                            <span v-if="row.value == 'Draft'" class="text-primary">{{row.value}}</span>
                        </template>

                        <template v-slot:cell(parties)="row">                  
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.appNames">{{ row.item.appNames | truncate-text(20)}}
                            </span>
                            <b class="text-info"> / </b>
                            <span 
                                v-b-tooltip.hover.noninteractive
                                :title="row.item.resNames">{{ row.item.resNames | truncate-text(20)}}
                            </span>
                           
                        </template>

                        <template v-slot:cell(description)="row">                             
                            <ul style="margin:0; padding:0;">
                                <li  v-for="(rowvalue,inx) in row.value" 
                                    :key="'type-'+inx">                                    
                                    {{rowvalue['typeName'] | truncate-text(40)}}
                                    <ul style="padding-inline-start: 12px; margin:0 0 0 2rem; padding:0;">
                                        <li  v-for="(filename,fileInx) in rowvalue['fileName']"
                                            :key="'file-'+fileInx"
                                            v-b-tooltip.hover.noninteractive.left
                                            :title="filename">
                                            {{filename| truncate-text(40)}}
                                        </li>
                                    </ul>
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

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as _ from 'underscore';

import { namespace } from "vuex-class";
import "@/store/modules/forms/manualForm";
const manualFormState = namespace("ManualForm");

import { documentInfoType } from "@/types/Information";
import { manualFormsJsonDataType } from "@/types/Information/ManualForm";

@Component
export default class TableManualForms extends Vue {

    @Prop({required: true})
    enableActions!: boolean;
    
    @manualFormState.State
    public manualFormsJson!: manualFormsJsonDataType[];
        
    allDocumentsChecked = false;
    showSelectFormToFill = false;
    
    documentsList: documentInfoType[] = [];
  
    documentsFields = [            
        {
            key: "fileNumber",
            label: "App #",
            sortable: true,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "description",
            label: "Document Description",
            sortable: false,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "caseNumber",
            label: "File #",
            sortable: false,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "parties",
            label: "Parties",
            sortable: false,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },          
        {
            key: "status",
            label: "Status",
            sortable: true,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "modifiedDate",
            label: "Last Updated",
            sortable: true,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "packageNum",
            label: "eFiling #",
            sortable: true,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            thClass: 'border-dark border-bottom',
            tdClass:'align-middle'
        }
    ];   

    errorMsg = "";
    errorMsgDismissCountDown = 0;
   

    mounted() {        
        this.extractDocuments();       
    }

    public extractDocuments () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly    
        this.documentsList = [];
        for (const docJson of this.manualFormsJson) {                
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
            doc.status = docJson.archive? "Archived":docJson.status;
            doc.modifiedDate = docJson.modified;
            doc.pdf_types = docJson.pdf_types;
            doc.description = docJson.data.doc_type;
            doc.packageUrl = docJson.packageUrl;
            doc.packageNum = docJson.packageNumber;

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
        
        if(!this.enableActions && this.documentsList.length>2){            
            this.documentsList = _.sortBy(this.documentsList, 'modifiedDate').reverse().splice(0,2)
        }   
    }

    public createDocument() {
        this.$router.push({name: "file-submission" });
    }


    public navigateToEFilingHub(package_url) {
        window.open(package_url)
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
