<template>
    <div v-if="dataReady">
        <b-table-simple small borderless>
            <b-tbody >
                <b-tr>
                    <b-td>
                        <label class="h6 ml-2 m-0 p-0"> Alias Type: </label>
                        <b-form-group style="margin: 0.05rem 0 0 0.5rem;width: 20rem;"> 
                            <b-form-select
                                tabindex="1"
                                size = "sm"
                                v-model="selectedAliasType"
                                :state = "aliasTypeState?null:false">
                                    <b-form-select-option :value="{}">
                                        Select an Alias Type*
                                    </b-form-select-option>
                                    <b-form-select-option
                                        v-for="alias in lookups.aliasTypes" 
                                        :key="alias"
                                        :value="alias">
                                            {{alias}}
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
                                v-model="aliasName"                                
                                :state = "aliasNameState?null:false"
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

        <b-modal v-model="showCancelWarning" id="bv-modal-alias-cancel-warning" header-class="bg-warning text-light">            
            <template v-slot:modal-title>
                <h2 v-if="isCreateAlias" class="mb-0 text-light"> Unsaved New Alias </h2>                
                <h2 v-else class="mb-0 text-light"> Unsaved Alias Changes </h2>                                 
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
    import { namespace } from 'vuex-class';
    import "@/store/modules/common";
import { lookupsInfoType, aliasInfoType } from '@/types/Information/Form1';
    const commonState = namespace("Common");    

    @Component
    export default class AddAliasForm extends Vue {        

        @commonState.State
        public lookups!: lookupsInfoType;

        @Prop({required: true})
        formData!: aliasInfoType;

        @Prop({required: true})
        index!: number;

        @Prop({required: true})
        isCreateAlias!: boolean;             

        selectedAliasType = ''
        aliasTypeState = true;     

        aliasName = '';
        aliasNameState = true;         

        originalSelectedAliasType = '';
        originalAliasName = '';  
        
        showCancelWarning = false;

        addButtonText = 'Add';
        dataReady = false;
        
        mounted()
        { 
            this.dataReady = false;
            this.clearSelections();
            if(!this.isCreateAlias) {
                this.extractFormInfo();
                this.addButtonText = 'Save';
            } else {
                this.addButtonText = 'Add';
            }
            this.dataReady = true;              
        }        

        public extractFormInfo(){            
            const index = this.lookups.aliasTypes.findIndex(alias=>{if(alias == this.formData.nameType)return true})
            this.originalSelectedAliasType = this.selectedAliasType = (index>=0)? this.lookups.aliasTypes[index]: '';            
            this.originalAliasName = this.aliasName = this.formData.name;
        }

        public saveForm(){
               
            this.aliasTypeState = this.selectedAliasType != "";
            this.aliasNameState = this.aliasName != ""; 
            
            if (this.aliasTypeState && this.aliasNameState){        
                const alias = {} as aliasInfoType;
                alias.nameType = this.selectedAliasType;
                alias.name = this.aliasName;       
                this.$emit('submit', this.isCreateAlias, alias, this.index);
            }
                
        }

        public closeForm(){
            if(this.isChanged())
                this.showCancelWarning = true;
            else
                this.confirmedCloseForm();
        }

        public isChanged(){
            if(this.isCreateAlias){
                if(this.selectedAliasType.length && this.aliasName.length ) return true;
                return false;
            }else{
                if( (this.originalSelectedAliasType != this.selectedAliasType) ||
                    (this.originalAliasName != this.aliasName)) return true;
                return false;
            }
        }

        public confirmedCloseForm(){           
            this.clearSelections();
            this.$emit('cancel');
        }

        public clearSelections(){
            this.selectedAliasType = '';
            this.aliasName = '';           
            this.aliasNameState  = true;
            this.aliasTypeState   = true;                     
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