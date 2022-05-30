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

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import "@/store/modules/forms/form13";
const form13State = namespace("Form13");

import "@/store/modules/forms/form14";
const form14State = namespace("Form14");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import { form1FormsJsonDataType } from "@/types/Information/Form1";
import { caseJsonDataType } from "@/types/Information/json";
import { form3FormsJsonDataType } from "@/types/Information/Form3";
import { form4FormsJsonDataType } from "@/types/Information/Form4";
import { form5FormsJsonDataType } from "@/types/Information/Form5";
import { form6FormsJsonDataType } from "@/types/Information/Form6";
import { form7FormsJsonDataType } from "@/types/Information/Form7";
import { form8FormsJsonDataType } from "@/types/Information/Form8";
import { form9FormsJsonDataType } from "@/types/Information/Form9";
import { form10FormsJsonDataType } from "@/types/Information/Form10";
import { form11FormsJsonDataType } from "@/types/Information/Form11";
import { form12FormsJsonDataType } from "@/types/Information/Form12";
import { form13FormsJsonDataType } from "@/types/Information/Form13";
import { form14FormsJsonDataType } from "@/types/Information/Form14";
import { form16FormsJsonDataType } from "@/types/Information/Form16";
import { form17FormsJsonDataType } from "@/types/Information/Form17";
import { form18FormsJsonDataType } from "@/types/Information/Form18";
import { form19FormsJsonDataType } from "@/types/Information/Form19";
import { form20FormsJsonDataType } from "@/types/Information/Form20";
import { form22FormsJsonDataType } from "@/types/Information/Form22";


@Component
export default class MyDocumentsTableBrief extends Vue {

    @form1State.State
    public form1FormsJson!: form1FormsJsonDataType[];

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @form2State.State
    public casesJson!: caseJsonDataType[];

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void    

    @form3State.State
    public form3FormsJson!: form3FormsJsonDataType[];

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void

    @form4State.State
    public form4FormsJson!: form4FormsJsonDataType[];

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
    
    @form5State.State
    public form5FormsJson!: form5FormsJsonDataType[];

    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

    @form6State.State
    public form6FormsJson!: form6FormsJsonDataType[];

    @form6State.Action
	public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form7State.State
    public form7FormsJson!: form7FormsJsonDataType[];

    @form7State.Action
    public UpdateCurrentNoticeOfUrgentApplicationId!: (newCurrentNoticeOfUrgentApplicationId: string) => void

    @form8State.State
    public form8FormsJson!: form8FormsJsonDataType[];

    @form8State.Action
    public UpdateForm8FormsJson!: (newForm8FormsJson: form8FormsJsonDataType[])=> void

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void
    
    @form9State.State
    public form9FormsJson!: form9FormsJsonDataType[];

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    @form10State.State
    public form10FormsJson!: form10FormsJsonDataType[];

    @form10State.Action
	public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void

    @form11State.State
    public form11FormsJson!: form11FormsJsonDataType[];

    @form11State.Action
	public UpdateCurrentOrderMultipleJusticesId!: (newCurrentOrderMultipleJusticesId: string) => void

    @form12State.State
    public form12FormsJson!: form12FormsJsonDataType[];

    @form12State.Action
	public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void

    @form13State.State
    public form13FormsJson!: form13FormsJsonDataType[];

    @form13State.Action
	public UpdateCurrentConsentOrderExtendTimeId!: (newCurrentConsentOrderExtendTimeId: string) => void

    @form14State.State
    public form14FormsJson!: form14FormsJsonDataType[];

    @form14State.Action
	public UpdateCurrentConsentOrderRemoveInactiveId!: (newCurrentConsentOrderRemoveInactiveId: string) => void

    @form16State.State
    public form16FormsJson!: form16FormsJsonDataType[];

    @form16State.Action
	public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void

    @form17State.State
    public form17FormsJson!: form17FormsJsonDataType[];

    @form17State.Action
	public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void
    
    @form18State.State
    public form18FormsJson!: form18FormsJsonDataType[];

    @form18State.Action
    public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void

    @form19State.State
    public form19FormsJson!: form19FormsJsonDataType[];

    @form19State.Action
    public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void

    @form20State.State
    public form20FormsJson!: form20FormsJsonDataType[];

    @form20State.Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void

    @form22State.State
    public form22FormsJson!: form22FormsJsonDataType[];

    @form22State.Action
    public UpdateCurrentNoFeesPayableId!: (newCurrentNoFeesPayableId: string) => void

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

        //___Form 1___
        for (const docJson of this.form1FormsJson) {                
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form1',
                formName:'Form 1',
                description:'Notice of Appeal',
                fileNumber:'',                 
                status:'', 
                modifiedDate:'', 
                packageNum:'',
                packageUrl:'',                
            };
            doc.id = String(docJson.id);
            doc.fileNumber = docJson.data.lowerCourtFileNo;
            doc.status = docJson.status;
            doc.modifiedDate = docJson.modified;
            doc.packageUrl = docJson.packageUrl;
            doc.packageNum = docJson.packageNumber;
            doc.pdfType = docJson.pdf_types;
            this.documentsList.push(doc);
        }

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

        //___Form 3___
        for (const docJson of this.form3FormsJson) {
            const doc = { 
                id:'',
                pdfType:'NCA',
                form:'form3',
                formName:'Form 3',
                description:'Notice of Cross Appeal',
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

        //___Form 4___
        for (const docJson of this.form4FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form4',
                formName:'Form 4',
                description:'Notice of Application',
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
                description:'Notice of Urgent Application',
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

         //___Form 8___
        for (const docJson of this.form8FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form8',
                formName:'Form 8',
                description:'Notice of Application to Vary',
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

        //___Form 10___
        for (const docJson of this.form10FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form10',
                formName:'Form 10',
                description:'Order of a single justice',
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

        //___Form 11___
        for (const docJson of this.form11FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form11',
                formName:'Form 11',
                description:'Order of three or more justices',
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

        //___Form 12___
        for (const docJson of this.form12FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form12',
                formName:'Form 12',
                description:'Order from an application to vary the order of a justice',
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

        //___Form 13___
        for (const docJson of this.form13FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form13',
                formName:'Form 13',
                description:'Consent order to extend time to file a document',
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

        //___Form 14___
        for (const docJson of this.form14FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form14',
                formName:'Form 14',
                description:'Consent order to remove an appeal from the inactive list',
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

        //___Form 16___
        for (const docJson of this.form16FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form16',
                formName:'Form 16',
                description:'Offer To Settle Costs',
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

        //___Form 17___
        for (const docJson of this.form17FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form17',
                formName:'Form 17',
                description:'Certificate of Costs',
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

        //___Form 19___
        for (const docJson of this.form19FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form19',
                formName:'Form 19',
                description:'Notice of Withdrawal of Lawyer',
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

        //___Form 20___
        for (const docJson of this.form20FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form20',
                formName:'Form 20',
                description:'Notice of Objection to Withdrawal',
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

        //___Form 22___
        for (const docJson of this.form22FormsJson) {
            const doc = { 
                id:'',
                pdfType:'FORM',
                form:'form22',
                formName:'Form 22',
                description:'Application For Order that No Fees are Payable',
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
        
        }else if(item.formName=='Form 1'){
            this.UpdateCurrentNoticeOfAppealId(item.id)
            this.$router.push({name: "start-form1" });

        }else if(item.formName=='Form 8'){
            this.UpdateCurrentNoticeOfApplicationToVaryId(item.id);
            this.$router.push({name: "fill-form8" });

        }else if(item.formName=='Form 9'){
            this.UpdateCurrentRequisitionId(item.id);
            this.$router.push({name: "fill-form9" });

        }else if(item.formName=='Form 16'){
            this.UpdateCurrentOfferToSettleCostsId(item.id);
            this.$router.push({name: "fill-form16" });

        }else if(item.formName=='Form 18'){
            this.UpdateCurrentNoticeOfRepChangeAddressId(item.id);
            this.$router.push({name: "fill-form18" });

        }else if(item.formName=='Form 19'){
            this.UpdateCurrentNoticeOfWithdrawalOfLawyerId(item.id);
            this.$router.push({name: "fill-form19" });

        }else if(item.formName=='Form 20'){
            this.UpdateCurrentNoticeOfObjectionToWithdrawalId(item.id);
            this.$router.push({name: "fill-form20" });
        
        }else if(item.formName=='Form 3'){
            this.UpdateCurrentNoticeOfCrossAppealId(item.id);
            this.$router.push({name: "fill-form3" });

        }else if(item.formName=='Form 4'){
            this.UpdateCurrentNoticeOfApplicationId(item.id);
            this.$router.push({name: "fill-form4" });
        
        }else if(item.formName=='Form 7'){
            this.UpdateCurrentNoticeOfUrgentApplicationId(item.id);             
            this.$router.push({name: "fill-form7"}); 

        } else if(item.formName=='Form 22'){
            this.UpdateCurrentNoFeesPayableId(item.id);             
            this.$router.push({name: "fill-form22"}); 

        } else if(item.formName=='Form 12'){
            this.UpdateCurrentOrderToVarySingleJusticeId(item.id);             
            this.$router.push({name: "fill-form12"});        

        } else if(item.formName=='Form 10'){
            this.UpdateCurrentOrderSingleJusticeId(item.id);             
            this.$router.push({name: "fill-form10"}); 

        } else if(item.formName=='Form 11'){
            this.UpdateCurrentOrderMultipleJusticesId(item.id);             
            this.$router.push({name: "fill-form11"}); 
        } else if(item.formName=='Form 17'){
            this.UpdateCurrentCertificateOfCostsId(item.id);             
            this.$router.push({name: "fill-form17"}); 
        } else if(item.formName=='Form 14'){
            this.UpdateCurrentConsentOrderRemoveInactiveId(item.id);             
            this.$router.push({name: "fill-form14"}); 
        }else if(item.formName=='Form 13'){
            this.UpdateCurrentConsentOrderExtendTimeId(item.id);             
            this.$router.push({name: "fill-form13"}); 
        }

    }
   
}
</script>
