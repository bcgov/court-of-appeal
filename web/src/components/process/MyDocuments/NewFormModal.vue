<template>
    <div>

        <b-modal size="lg" v-model="showSelectFormToFill" id="bv-modal-select-form" header-class="bg-primary">                        
            <template v-slot:modal-title>
                <h2 class="m-0 ml-1 text-white" style="font-size: 2rem;">Click on the form to fill</h2>                                  
            </template>
            <b-row v-for="form,inx in forms" :key="inx"> 
                <b-button 
                    size="sm" 
                    variant="transparent" 
                    class="py-1 my-1 ml-3 border-0" 
                    style="font-size:14px;"
                    @click="createDocument(form.name);">
                    <b-icon-file-text class="text-warning"/>                   
                    {{form.title}}
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

@Component
export default class NewFormModal extends Vue {

    @Prop({required: true})
    showSelectFormToFill!: boolean;

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

    @form5State.Action
    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

    @form6State.Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form7State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    forms = [
        {name:'form2', title:'Notice of Appearance (Form 2)'},
        {name:'form5', title:'Notice of Hearing of Appeal (Form 5)'},
        {name:'form6', title:'Notice of Settlement or Abandonment (Form 6)'},
        {name:'form7', title:'Notice of Appeal (Form 7)'},
        {name:'form9', title:'Requisition (Form 9)'}
        // {name:'form7', title:''},
    ]


    mounted() {        
    }

    CloseModal(){
        this.$emit('closeModal')
    }

    public createDocument(form) {
        
        if(form=='form2'){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" });
        
        }else if(form=='form5'){
            this.UpdateCurrentNoticeOfHearingOfAppealId(null);
            this.$router.push({name: "start-form5" });
        
        }else if(form=='form6'){
            this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
            this.$router.push({name: "start-form6" });

        }else if(form=='form7'){
            this.UpdateCurrentNoticeOfAppealId(null)
            this.$router.push({name: "checklist-form7" });
            
        }else if(form=='form9'){
            this.UpdateCurrentRequisitionId(null)
            this.$router.push({name: "start-form9" });
        }
        
    }
}
</script>