<template>
    <div v-if="dataReady">
        <b-table-simple small borderless>
            <b-tbody >
                <b-tr>
                    <b-td>
                        <label class="h6 ml-2 m-0 p-0"> Party Type: </label>
                        <b-form-group style="margin: 0.05rem 0 0 0.5rem;width: 10rem;"> 
                            <b-form-select
                                tabindex="1"
                                size = "sm"
                                @change="changed"
                                v-model="selectedPartyType"
                                :state = "partyTypeState?null:false">                                   
                                    <b-form-select-option
                                        v-for="option in partyTypeOptions" 
                                        :key="option.text"
                                        :value="option.value">
                                            {{option.text}}
                                    </b-form-select-option>     
                            </b-form-select>
                        </b-form-group>
                                               
                    </b-td>
                    <b-td :key="updated" v-if="selectedPartyType == true">
                        <label class="h6 m-0 p-0"> Firm Name: </label>
                        <b-input-group  style="padding 0; margin:0 ;width: 20rem">
                            <b-form-input
                                tabindex="2"
                                class="mb-1"
                                size="sm"
                                v-model="firmName"                                
                                :state = "firmNameState?null:false"
                                >
                            </b-form-input>
                        </b-input-group>                                           
                    </b-td> 
                    <b-td :key="updated" v-else>
                        <label class="h6 m-0 p-0"> First Name: </label>
                        <b-input-group  style="padding 0; margin:0 ;width: 20rem">
                            <b-form-input
                                tabindex="2"
                                class="mb-1"
                                size="sm"
                                v-model="firstName"                                
                                :state = "firstNameState?null:false"
                                >
                            </b-form-input>
                        </b-input-group>    
                        <label class="h6 m-0 p-0"> Last Name: </label>
                        <b-input-group  style="padding 0; margin:0 ;width: 20rem">
                            <b-form-input
                                tabindex="3"
                                class="mb-1"
                                size="sm"
                                v-model="lastName"                                
                                :state = "lastNameState?null:false"
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
                <h2 v-if="isCreateParty" class="mb-0 text-light"> Unsaved New Party </h2>                
                <h2 v-else class="mb-0 text-light"> Unsaved Party Changes </h2>                                 
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
import { partyInfoType } from '@/types/Information/Form3';

@Component
export default class AddPartyForm extends Vue {        

    @Prop({required: true})
    formData!: partyInfoType;

    @Prop({required: true})
    index!: number;

    @Prop({required: true})
    isCreateParty!: boolean;   
    
    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

    updated = 0;

    selectedPartyType;
    partyTypeState = true; 
    
    firmName = '';
    firmNameState = true;

    firstName = '';
    firstNameState = true;  
    
    lastName = '';
    lastNameState = true;

    originalPartyType;
    originalFirmName = ''; 
    originalFirstName = '';  
    originalLastName = '';   
    
    showCancelWarning = false;

    addButtonText = 'Add';
    dataReady = false;
    
    mounted()
    { 
        this.dataReady = false;
        this.clearSelections();
        if(!this.isCreateParty) {
            this.extractFormInfo();
            this.addButtonText = 'Save';
        } else {
            this.addButtonText = 'Add';
        }
        
        this.dataReady = true;              
    }    
    
    public changed(){
        this.updated++;
    }

    public extractFormInfo(){
        const index = this.partyTypeOptions.findIndex(partyType=>{if(partyType.value == this.formData.organization)return true})            
        this.originalPartyType = this.selectedPartyType = (index>=0)? this.partyTypeOptions[index].value: null;            
        this.originalFirmName = this.firmName = this.formData.name;
        this.originalFirstName = this.firstName = this.formData.firstName;
        this.originalLastName = this.lastName = this.formData.lastName;            
    }

    public saveForm(){
            
        this.partyTypeState = this.selectedPartyType != null;

        if (this.selectedPartyType){
            this.firmNameState = this.firmName != ""; 
            this.firstNameState = true;
            this.lastNameState = true; 
        } else {
            this.firmNameState = true; 
            this.firstNameState = this.firstName != "";
            this.lastNameState = this.lastName != ""; 
        }
        
        if (this.partyTypeState && this.firmNameState && this.firstNameState && this.lastNameState){        
            const party = {} as partyInfoType;
            party.organization = this.selectedPartyType;
            party.name = this.firmName;    
            party.firstName = this.firstName;
            party.lastName = this.lastName;   
            this.$emit('submit', this.isCreateParty, party, this.index);
        }
            
    }

    public closeForm(){
        if(this.isChanged())
            this.showCancelWarning = true;
        else
            this.confirmedCloseForm();
    }

    public isChanged(){
        if(this.isCreateParty){
            if(this.selectedPartyType != null && (this.firmName.length || this.firstName.length && this.lastName.length) ) return true;
            return false;
        } else {

            if ( this.originalPartyType != this.selectedPartyType || 
                this.originalFirmName != this.firmName || 
                this.originalFirstName != this.firstName || 
                this.originalLastName != this.lastName ) {
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

        this.selectedPartyType = null;
        this.partyTypeState = true; 
        
        this.firmName = '';
        this.firmNameState = true;

        this.firstName = '';
        this.firstNameState = true;  
        
        this.lastName = '';
        this.lastNameState = true;    

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