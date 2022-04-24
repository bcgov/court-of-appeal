<template>
    <div v-if="dataReady">
        <b-table-simple small borderless>
            <b-tbody >
                <b-tr>
                    <b-td>
                        <label class="h6 ml-2 m-0 p-0"> Representative Type: </label>
                        <b-form-group style="margin: 0.05rem 0 0 0.5rem;width: 20rem;"> 
                            <b-form-select
                                tabindex="1"
                                size = "sm"
                                v-if="isOrganization"
                                v-model="selectedRepresentativeType"
                                :state = "representativeTypeState?null:false">
                                    <b-form-select-option 
                                        v-for="representative in lookups.organizationLegalReps" 
                                        :key="representative"
                                        :value="representative">
                                            {{representative}}
                                    </b-form-select-option>                                    
                            </b-form-select>
                            <b-form-select
                                tabindex="1"
                                size = "sm"
                                v-else
                                v-model="selectedRepresentativeType"
                                :state = "representativeTypeState?null:false">                                   
                                    <b-form-select-option
                                        v-for="representative in lookups.individualLegalReps" 
                                        :key="representative"
                                        :value="representative">
                                            {{representative}}
                                    </b-form-select-option>     
                            </b-form-select>
                        </b-form-group>
                                               
                    </b-td>
                    <b-td>
                        <label class="h6 m-0 p-0"> Name: </label>
                        <b-input-group  style="padding 0; margin:0 ;width: 20rem">
                            <b-form-input
                                tabindex="2"
                                class="mb-1"
                                size="sm"
                                v-model="representativeName"                                
                                :state = "representativeNameState?null:false"
                                >
                            </b-form-input>
                        </b-input-group>                                           
                    </b-td>                    
                    <b-td >
                        <div>
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

        <b-modal v-model="showCancelWarning" id="bv-modal-representative-cancel-warning" header-class="bg-warning text-light">            
            <template v-slot:modal-title>
                <h2 v-if="isCreateRep" class="mb-0 text-light"> Unsaved New Representative </h2>                
                <h2 v-else class="mb-0 text-light"> Unsaved Representative Changes </h2>                                 
            </template>
            <p>Are you sure you want to cancel without saving your changes?</p>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="$bvModal.hide('bv-modal-representative-cancel-warning')"                   
                >No</b-button>
                <b-button variant="success" @click="confirmedCloseForm()"
                >Yes</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                 <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-representative-cancel-warning')"
                 >&times;</b-button>
            </template>
        </b-modal>             
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import "@/store/modules/common";
const commonState = namespace("Common");    

import { lookupsInfoType, representativeInfoType } from '@/types/Information/Form1';

@Component
export default class AddRepresentativeForm extends Vue {        

    @commonState.State
    public lookups!: lookupsInfoType;

    @Prop({required: true})
    formData!: representativeInfoType;

    @Prop({required: true})
    index!: number;

    @Prop({required: true})
    isCreateRep!: boolean; 
    
    @Prop({required: true})
    isOrganization!: boolean;

    selectedRepresentativeType = ''
    representativeTypeState = true;     

    representativeName = '';
    representativeNameState = true;         

    originalSelectedRepresentativeType = '';
    originalRepresentativeName = '';  
    
    showCancelWarning = false;

    addButtonText = 'Add';
    dataReady = false;
    
    mounted(){ 
        this.dataReady = false;
        this.clearSelections();
        if(!this.isCreateRep) {
            this.extractFormInfo();
            this.addButtonText = 'Save';
        } else {
            this.addButtonText = 'Add';

        }
        this.dataReady = true;              
    }        

    public extractFormInfo(){ 
        if (this.isOrganization){
            const index = this.lookups.organizationLegalReps.findIndex(representative=>{if(representative == this.formData.repType)return true})
            this.originalSelectedRepresentativeType = this.selectedRepresentativeType = (index>=0)? this.lookups.organizationLegalReps[index]: '';
        } else {
            const index = this.lookups.individualLegalReps.findIndex(representative=>{if(representative == this.formData.repType)return true})
            this.originalSelectedRepresentativeType = this.selectedRepresentativeType = (index>=0)? this.lookups.individualLegalReps[index]: '';
        }           
                    
        this.originalRepresentativeName = this.representativeName = this.formData.name;
    }

    public saveForm(){
            
        this.representativeTypeState = this.selectedRepresentativeType != "";
        this.representativeNameState = this.representativeName != ""; 
        
        if (this.representativeTypeState && this.representativeNameState){        
            const representative = {} as representativeInfoType;
            representative.repType = this.selectedRepresentativeType;
            representative.name = this.representativeName;       
            this.$emit('submit', this.isCreateRep, representative, this.index);
        }
            
    }

    public closeForm(){
        if(this.isChanged())
            this.showCancelWarning = true;
        else
            this.confirmedCloseForm();
    }

    public isChanged(){
        if(this.isCreateRep){
            if(this.selectedRepresentativeType.length && this.representativeName.length ) return true;
            return false;
        }else{
            if( (this.originalSelectedRepresentativeType != this.selectedRepresentativeType) ||
                (this.originalRepresentativeName != this.representativeName)) return true;
            return false;
        }
    }

    public confirmedCloseForm(){           
        this.clearSelections();
        this.$emit('cancel');
    }

    public clearSelections(){
        this.selectedRepresentativeType = '';
        this.representativeName = '';           
        this.representativeNameState  = true;
        this.representativeTypeState   = true;                     
    } 
    
}
</script>

<style scoped>
    td {
        margin: 0rem 0.5rem 0.1rem 0rem;
        padding: 0rem 0.5rem 0.1rem 0rem;        
        background-color: white ;
    }
</style>