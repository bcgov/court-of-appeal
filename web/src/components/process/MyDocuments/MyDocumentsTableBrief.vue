<template>
    <b-card border-variant="white" body-class="mx-0 px-3 py-0">
        <b-row>
            <b-col>
                <div style="margin:0 0 0 1rem; font-size:12pt; font-weight:600; ">Submissions</div>
            </b-col>                       
        </b-row>
        
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
                thead-class="m-0 p-0 h6'"
                sort-icon-left
                striped
                small 
                responsive="sm"
                >               

                <template v-slot:cell(action)="row">
                    <b-button v-if="row.item.status == 'Draft'" size="sm" 
                        variant="transparent" 
                        class="my-0 py-0 px-1 border-0"
                        @click="resumeApplication(row.item)"
                        v-b-tooltip.hover.noninteractive
                        title="Resume Application">
                        <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                    </b-button>
                    <b-button 
                        v-else-if="row.item.status == 'Submitted'" 
                        size="sm" 
                        variant="transparent" 
                        class="my-0 py-0 px-1 border-0"
                        @click="navigateToEFilingHub(row.item.packageUrl)"
                            v-b-tooltip.hover.noninteractive.v-info
                            title="Navigate To Submitted Application">
                            <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                    </b-button>
                    <b-button 
                        v-if="row.item.pdfType"
                        variant="transparent"
                        class="m-0 p-0 border-0"
                        @click="downloadDocument(row.item)"
                        v-b-tooltip.hover.noninteractive.v-success
                        title="Download the generated PDF">
                        <span style="font-size:18px; padding:0; transform:translate(2px,1px);" class="far fa-file-pdf btn-icon-left text-success ml-1"/>
                    </b-button>                          
                </template>

                <template v-slot:cell(status)="row">                  
                    <span v-if="row.value == 'Submitted'" class="text-white bg-success px-1">{{row.value}}</span> 
                    <span v-if="row.value == 'Draft'" class="text-primary">{{row.value}}</span>

                </template>                

                <template v-slot:cell(formName)="row"> 
                    <b-badge :class="'p-2 bg-'+row.item.form" style="fontSize:10pt">
                        {{row.value}}
                    </b-badge>                 
                    
                </template>
                
                <template v-slot:cell(modifiedDate)="row">                  
                    <span>{{ row.item.modifiedDate | beautify-date-weekday}}</span>
                </template>
                
            </b-table>
        </b-card>                
       
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
import "@/store/modules/information";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import { caseJsonDataType } from "@/types/Information/json";
import { form5FormsJsonDataType } from "@/types/Information/Form5";
import { form7SubmissionDataInfoType } from "@/types/Information/Form7";

@Component({
    components:{
       
    }
})
export default class MyDocumentsTable extends Vue {

    @form2State.State
    public casesJson!: caseJsonDataType[];
    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    @form5State.State
    public form5FormsJson!: form5FormsJsonDataType[];
    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

    @form7State.State
    public form7FormsJson!: form7SubmissionDataInfoType[];
    @form7State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void


    documentsList = []
    documentsFields =[
        { key: "formName",    label: "Form",          sortable: true,  thClass: 'border-dark border-bottom',},
        { key: "description", label: "Description",   sortable: false, thClass: 'border-dark border-bottom', tdClass:'align-middle',},
        { key: "fileNumber",  label: "File #",        sortable: false, thClass: 'border-dark border-bottom', tdClass:'align-middle',},
        { key: "status",      label: "Status",        sortable: true,  thClass: 'border-dark border-bottom', tdClass:'align-middle',},
        { key: "modifiedDate",label: "Last Updated",  sortable: true,  thClass: 'border-dark border-bottom', tdClass:'align-middle',},
        { key: "packageNum",  label: "eFiling #",     sortable: true,  thClass: 'border-dark border-bottom', tdClass:'align-middle',},
        { key: "action",      label: "Action",        sortable: false, thClass: 'border-dark border-bottom', tdClass:'align-middle',}
    ]
    mounted() {
        this.extractDocuments()       
    }

    public extractDocuments(){
        this.documentsList = [];

        //___Form 2___
        for (const docJson of this.casesJson) {                
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form2',                
                formName:'Form 2',
                description:'Notice of Appearance',
                fileNumber:'',                 
                status:'', 
                modifiedDate:'', 
                packageNum:'',
                packageUrl:'',                
            };
            doc.id = String(docJson.id); 
            doc.fileNumber = docJson.data.formSevenNumber;
            doc.status = docJson.status;
            doc.modifiedDate = docJson.modified;
            doc.packageUrl = docJson.packageUrl;
            doc.packageNum = docJson.packageNumber;
            doc.pdfType = docJson.pdf_types;
            this.documentsList.push(doc);
        }

        //___Form 5___
        for (const docJson of this.form5FormsJson) {
            const doc = { 
                id:'',
                pdfType:'NHA',
                form:'form5',
                formName:'Form 5',
                description:'Notice of Hearing of Appeal',
                fileNumber:'',                 
                status:'', 
                modifiedDate:'', 
                packageNum:'',
                packageUrl:'',                
            };
            doc.id = String(docJson.id); 
            doc.fileNumber = docJson.data.formSevenNumber;
            doc.status = docJson.status;
            doc.modifiedDate = docJson.modified
            doc.packageUrl = docJson.packageUrl;
            doc.packageNum = docJson.packageNumber;
            doc.pdfType = docJson.pdf_types;
            this.documentsList.push(doc);
        }

        //___Form 7___
        for (const docJson of this.form7FormsJson) {                
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form7',
                formName:'Form 7',
                description:'Notice of Appeal',
                fileNumber:'',                 
                status:'', 
                modifiedDate:'', 
                packageNum:'',
                packageUrl:'',                
            };
            doc.id = docJson['noticeOfAppealId']
            doc.fileNumber = docJson.lowerCourtFileNo;
            doc.status = docJson['electronicallyFiled']=='Y'? "Submitted":"Draft";
            doc.modifiedDate = docJson['dateModified'];
            doc.packageUrl = docJson['packageUrl'];
            doc.packageNum = docJson['packageNumber'];
            doc.pdfType = docJson['pdf_types'];
            this.documentsList.push(doc);
        }
    }

    public navigateToEFilingHub(package_url) {
        window.open(package_url)
    }

    public downloadDocument(item) {
        const fileNumber = item.id;
        const pdf_type = item.pdfType;
        const pdf_filename = item.form+ ".pdf";
        const formRoute = item.form=='form2'?'':('/'+item.form);
        
        const url = formRoute+'/form-print/'+fileNumber+'/?pdf_type='+pdf_type;
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
                                        
        });
        
    }

   
    public resumeApplication(item){

        if(item.formName=='Form 2'){
            this.UpdateCurrentCaseId(item.id);
            this.$router.push({name: "fill-form2", params: {caseId: item.id}})
        
        }else if(item.formName=='Form 5'){
            this.UpdateCurrentNoticeOfHearingOfAppealId(item.id);
            this.$router.push({name: "fill-form5" });
        
        }else if(item.formName=='Form 7'){
            this.UpdateCurrentNoticeOfAppealId(item.id)
            this.$router.push({name: "start-form7" });
        }
    }

   
}
</script>
