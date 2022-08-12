<template>
    <div v-if="dataReady">
        <b-table-simple small borderless>
            <b-tbody >
                <b-tr class="my-4 mx-2">
                    <b-td style="width: 45%;">
                        <div class="m-0 p-0 labels"> Name of person whose affidavit is being filed: </div>                        
                        <b-form-input
                            tabindex="0"
                            class="my-2"
                            style="padding 0; margin:0; width: 90%;"
                            size="sm"
                            v-model="name"                                
                            :state = "nameState?null:false">
                        </b-form-input>                                                   
                    </b-td>   
                    <b-td style="width: 30%">
                        <label class="ml-1 m-0 p-0 labels"> Date affidavit was sworn: </label>
                        <b-card                             
                            class="mt-2" 
                            style="padding: 0; float: left; display: inline-block;" 
                            :border-variant="dateState == false?'danger': 'muted'">
                            <div class="vuetify">
                                <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                    <v-date-picker
                                        v-model="date"                           
                                        color="warning"             
                                        :allowed-dates="allowedDates"                            
                                        header-color="red"
                                    ></v-date-picker>                            
                                </v-app>
                            </div>    
                        </b-card>
                                               
                    </b-td>                                                     
                    <b-td style="width: 25%">
                        <div style="float: right;">
                            <b-button                                    
                                style="margin: 1.7rem 0 0 0; padding:0; width: 4.5rem;"
                                variant="secondary"
                                @click="closeForm()">
                                Cancel
                            </b-button>   
                            <b-button                                    
                                style="margin: 1.7rem 0 0 0.35rem; padding:0; width: 4.5rem;"
                                variant="court"                        
                                @click="saveForm()">
                                {{addButtonText}}
                            </b-button>  
                        </div>
                    </b-td>
                </b-tr>
                
            </b-tbody>
        </b-table-simple>  

        <b-modal v-model="showCancelWarning" id="bv-modal-alias-cancel-warning" header-class="bg-warning text-light">            
            <template v-slot:modal-title>
                <h2 v-if="isCreateAffidavit" class="mb-0 text-light"> Unsaved New Affidavit Details </h2>                
                <h2 v-else class="mb-0 text-light"> Unsaved Affidavit Details Changes </h2>                                 
            </template>
            <p>Are you sure you want to cancel without saving your changes?</p>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="$bvModal.hide('bv-modal-alias-cancel-warning')"                   
                >No</b-button>
                <b-button variant="success" @click="confirmedCloseForm()"
                >Yes</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                 <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-alias-cancel-warning')"
                 >&times;</b-button>
            </template>
        </b-modal>             
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'; 
import moment from 'moment-timezone';
import { affidavitInfoType } from '@/types/Information/Form4';

@Component
export default class AddAffidavitForm extends Vue {        

    @Prop({required: true})
    formData!: affidavitInfoType;

    @Prop({required: true})
    index!: number;

    @Prop({required: true})
    isCreateAffidavit!: boolean;    
    
    name = '';
    nameState = true;

    date = '';
    dateState = true;
    
    originalName = ''; 
    originalDate = '';    
    
    showCancelWarning = false;

    addButtonText = 'Add';
    dataReady = false;
    
    mounted()
    { 
        this.dataReady = false;
        this.clearSelections();
        if(!this.isCreateAffidavit) {
            this.extractFormInfo();
            this.addButtonText = 'Save';
        } else {
            this.addButtonText = 'Add';
        }
        
        this.dataReady = true;              
    }

    public extractFormInfo(){
        this.originalName = this.name = this.formData.name;
        this.originalDate = this.date = this.formData.date;           
    }

    public saveForm(){
            
        this.nameState = this.name != "";
        this.dateState = this.date != "";        
        
        if (this.nameState && this.dateState){        
            const affidavitInfo = {} as affidavitInfoType;            
            affidavitInfo.name = this.name;    
            affidavitInfo.date = this.date;
            
            this.$emit('submit', this.isCreateAffidavit, affidavitInfo, this.index);
        }            
    }

    public closeForm(){
        if(this.isChanged())
            this.showCancelWarning = true;
        else
            this.confirmedCloseForm();
    }

    public isChanged(){
        if(this.isCreateAffidavit){
            if(this.name.length && this.date.length) return true;
            return false;
        } else {

            if ( this.originalName != this.name || 
                this.originalDate != this.date ) {
                    return true;
                } else {
                    return false;
                }                
        }
    }

    public confirmedCloseForm(){           
        this.clearSelections();
        this.$emit('cancel');
    }

    public clearSelections(){
        this.name = '';
        this.nameState = true; 
        
        this.date = '';
        this.dateState = true;
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date <= day);           
    }
    
}
</script>

<style scoped lang="scss">

    :deep(.vuetify){
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    }

    td {
        margin: 0rem 0.5rem 0.1rem 0rem;
        padding: 0rem 0.5rem 0.1rem 0rem;        
        background-color: white ;
    }

    .labels {
        font-size: 0.85rem; 
        font-weight:300;
    }
</style>