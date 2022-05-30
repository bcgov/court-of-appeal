<template>
    <div>

        <b-modal size="lg" v-model="showSelectFormToFill" id="bv-modal-select-form" header-class="bg-primary">                        
            <template v-slot:modal-title>
                <h2 class="m-0 ml-1 text-white" style="font-size: 2rem;">Click on the form to fill</h2>                                  
            </template>
            <b-row style="border-bottom:1px solid #DDD; background:#EEE; padding: 1rem 0;">
                <b-col cols="4">
                    <b class="text-primary float-right">Search Forms by a keyword:</b>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="searchingKey" style="margin:-0.45rem 0 -0.5rem 0; width:27rem;"/>
                </b-col>
            </b-row>
            <b-row v-for="form,inx in filteredForms" :key="inx"> 
                <b-button 
                    size="sm" 
                    variant="transparent" 
                    class="py-1 my-1 ml-3 border-0" 
                    style="font-size:14px;"
                    @click="createDocument(form.name);">
                    <b-icon-file-text class="text-primary mr-1"/>                   
                    <b>{{form.title}}</b>
                </b-button>                
            </b-row>            
            
            <template v-slot:modal-footer>                
                <b-button variant="primary" @click="CloseModal()">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-white" class="text-light closeButton" @click="CloseModal()"
                >&times;</b-button>
            </template>
        </b-modal>
    </div>
       
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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

@Component
export default class NewFormModal extends Vue {

    @Prop({required: true})
    showSelectFormToFill!: boolean;

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

    @form6State.Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form7State.Action
    public UpdateCurrentNoticeOfUrgentApplicationId!: (newCurrentNoticeOfUrgentApplicationId: string) => void

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    @form10State.Action
	public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void

    @form11State.Action
	public UpdateCurrentOrderMultipleJusticesId!: (newCurrentOrderMultipleJusticesId: string) => void

    @form12State.Action
	public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void

    @form14State.Action
	public UpdateCurrentConsentOrderRemoveInactiveId!: (newCurrentConsentOrderRemoveInactiveId: string) => void

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void

    @form17State.Action
    public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void

    @form18State.Action
    public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void

    @form19State.Action
    public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void

    @form20State.Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void    

    @form22State.Action
    public UpdateCurrentNoFeesPayableId!: (newCurrentNoFeesPayableId: string) => void

    forms = [
        {name:'form1', title:'Notice of Appeal (Form 1)'},
        {name:'form2', title:'Notice of Appearance (Form 2)'},
        {name:'form3', title:'Notice of Cross Appeal (Form 3)'},
        {name:'form4', title:'Notice of Application (Form 4)'},
        {name:'form5', title:'Notice of Hearing of Appeal (Form 5)'},
        {name:'form6', title:'Notice of Settlement or Abandonment (Form 6)'},   
        {name:'form7', title:'Notice of Urgent Application (Form 7)'},  
        {name:'form8', title:'Notice of Application to Vary an Order of a Justice (Form 8)'},     
        {name:'form9', title:'Requisition (Form 9)'},
        {name:'form10', title:'Order of a single justice (Form 10)'},
        {name:'form11', title:'Order of three or more justices (Form 11)'},
        {name:'form12', title:'Order from an application to vary the order of a justice (Form 12)'},
        {name:'form14', title:'Consent order to remove an appeal from the inactive list (Form 14)'},
        {name:'form16', title:'Offer To Settle Costs (Form 16)'},
        {name:'form17', title:'Certificate of Costs (Form 17)'},
        {name:'form18', title:'Notice of Change of Representation/Change of Address for Service (Form 18)'},
        {name:'form19', title:'Notice of Withdrawal of Lawyer (Form 19)'},
        {name:'form20', title:'Notice of Objection to Withdrawal (Form 20)'},
        {name:'form22', title:'Application For Order that No Fees are Payable (Form 22)'}
        // {name:'form7', title:''},
    ]

    searchingKey=''

    mounted() {        
    }

    get filteredForms(){
        if(this.searchingKey.trim().length>0)
            return this.forms.filter(form => form.title.toLowerCase().includes(this.searchingKey.toLowerCase()))
        else
            return this.forms
    }

    CloseModal(){
        this.$emit('closeModal')
    }

    public createDocument(form) {
        
        if(form=='form1'){
            this.UpdateCurrentNoticeOfAppealId(null)
            this.$router.push({name: "checklist-form1" });
            
        } else if(form=='form2'){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" });
        
        }else if(form=='form3'){
            this.UpdateCurrentNoticeOfCrossAppealId(null);
            this.$router.push({name: "checklist-form3" });
        
        }else if(form=='form4'){
            this.UpdateCurrentNoticeOfApplicationId(null);
            this.$router.push({name: "start-form4" });

        }else if(form=='form5'){
            this.UpdateCurrentNoticeOfHearingOfAppealId(null);
            this.$router.push({name: "start-form5" });
        
        }else if(form=='form6'){
            this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
            this.$router.push({name: "start-form6" });

        }else if(form=='form7'){
            this.UpdateCurrentNoticeOfUrgentApplicationId(null);
            this.$router.push({name: "start-form7" });
            
        }else if(form=='form8'){
            this.UpdateCurrentNoticeOfApplicationToVaryId(null);
            this.$router.push({name: "start-form8" });

        }else if(form=='form9'){
            this.UpdateCurrentRequisitionId(null)
            this.$router.push({name: "start-form9" });

        }else if(form=='form10'){
            this.UpdateCurrentOrderSingleJusticeId(null);
            this.$router.push({name: "checklist-orders" });

        }else if(form=='form11'){
            this.UpdateCurrentOrderMultipleJusticesId(null);
            this.$router.push({name: "checklist-orders" });

        }else if(form=='form12'){
            this.UpdateCurrentOrderToVarySingleJusticeId(null);
            this.$router.push({name: "checklist-orders" });

        } else if(form=='form14'){
            this.UpdateCurrentConsentOrderRemoveInactiveId(null);
            this.$router.push({name: "checklist-orders" });

        }else if(form=='form16'){
            this.UpdateCurrentOfferToSettleCostsId(null);
            this.$router.push({name: "start-form16" });

        }else if(form=='form17'){
            this.UpdateCurrentCertificateOfCostsId(null)
            this.$router.push({name: "start-form17" });

        }else if(form=='form18'){
            this.UpdateCurrentNoticeOfRepChangeAddressId(null)
            this.$router.push({name: "start-form18" });

        }else if(form=='form19'){
            this.UpdateCurrentNoticeOfWithdrawalOfLawyerId(null)
            this.$router.push({name: "start-form19" });

        }else if(form=='form20'){
            this.UpdateCurrentNoticeOfObjectionToWithdrawalId(null)
            this.$router.push({name: "start-form20" });

        }else if(form=='form22'){
            this.UpdateCurrentNoFeesPayableId(null)
            this.$router.push({name: "start-form22" });
            
        }        
    }
}
</script>