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
                    <b-badge :class="'p-2 bg-'+row.item.form" style="fontSize:10pt; width:5rem;">
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
import { Component, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
import "@/store/modules/information";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import { caseJsonDataType } from "@/types/Information/json";
import { form5FormsJsonDataType } from "@/types/Information/Form5";
import { form7SubmissionDataInfoType } from "@/types/Information/Form7";
import { form6FormsJsonDataType } from "@/types/Information/Form6";
import { form9FormsJsonDataType } from "@/types/Information/Form9";
import { form18FormsJsonDataType } from "@/types/Information/Form18";

@Component
export default class MyDocumentsTableBrief extends Vue {

    @form2State.State
    public casesJson!: caseJsonDataType[];

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    @form5State.State
    public form5FormsJson!: form5FormsJsonDataType[];

    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

    @form6State.State
    public form6FormsJson!: form6FormsJsonDataType[];

    @form6State.Action
	public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form7State.State
    public form7FormsJson!: form7SubmissionDataInfoType[];

    @form7State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @form9State.State
    public form9FormsJson!: form9FormsJsonDataType[];

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    @form18State.State
    public form18FormsJson!: form18FormsJsonDataType[];

    @form18State.Action
    public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void


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

        //___Form 6___
        for (const docJson of this.form6FormsJson) {
            const doc = { 
                id:'',
                pdfType:'ABA',
                form:'form6',
                formName:'Form 6',
                description:'Notice of Settlement or Abandonment',
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
            doc.packageUrl = docJson['package_url'];
            doc.packageNum = docJson['package_number'];
            doc.pdfType = docJson['pdf_types'];
            this.documentsList.push(doc);
        }

        //___Form 9___
        for (const docJson of this.form9FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form9',
                formName:'Form 9',
                description:'Requisition',
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

        //___Form 18___
        for (const docJson of this.form18FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form18',
                formName:'Form 18',
                description:'Notice of Change of Representation/Change of Address for Service',
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
        
        }else if(item.formName=='Form 6'){
            this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(item.id);
            this.$router.push({name: "fill-form6" });
        
        }else if(item.formName=='Form 7'){
            this.UpdateCurrentNoticeOfAppealId(item.id)
            this.$router.push({name: "start-form7" });

        }else if(item.formName=='Form 9'){
            this.UpdateCurrentRequisitionId(item.id);
            this.$router.push({name: "fill-form9" });

        }else if(item.formName=='Form 18'){
            this.UpdateCurrentNoticeOfRepChangeAddressId(item.id);
            this.$router.push({name: "fill-form18" });

        }
    }

   
}
</script>
