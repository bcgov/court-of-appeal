<template>
    <div v-if="dataReady">
        <b-table-simple small borderless>
            <b-tbody >
                <b-tr class="my-4 mx-2">
                    <b-td style="width: 45%;">
                        <div class="m-0 p-0 labels"> Name of Judge: </div>                        
                        <b-form-input
                            tabindex="0"
                            class="my-2"
                            style="padding 0; margin:0; width: 90%;"
                            size="sm"
                            v-model="name"                                
                            :state = "nameState?null:false">
                        </b-form-input>                                                   
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

        <b-modal v-model="showCancelWarning" id="bv-modal-judge-cancel-warning" header-class="bg-warning text-light">            
            <template v-slot:modal-title>
                <h2 v-if="isCreateJudge" class="mb-0 text-light"> Unsaved New Judge Details </h2>                
                <h2 v-else class="mb-0 text-light"> Unsaved Judge Details Changes </h2>                                 
            </template>
            <p>Are you sure you want to cancel without saving your changes?</p>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="$bvModal.hide('bv-modal-judge-cancel-warning')"                   
                >No</b-button>
                <b-button variant="success" @click="confirmedCloseForm()"
                >Yes</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                 <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-judge-cancel-warning')"
                 >&times;</b-button>
            </template>
        </b-modal>             
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AddJudgeForm extends Vue {        

    @Prop({required: true})
    formData!: string;

    @Prop({required: true})
    index!: number;

    @Prop({required: true})
    isCreateJudge!: boolean;    
    
    name = '';
    nameState = true;
    
    originalName = '';    
    
    showCancelWarning = false;

    addButtonText = 'Add';
    dataReady = false;
    
    mounted()
    { 
        this.dataReady = false;
        this.clearSelections();
        if(!this.isCreateJudge) {
            this.extractFormInfo();
            this.addButtonText = 'Save';
        } else {
            this.addButtonText = 'Add';
        }
        
        this.dataReady = true;              
    }

    public extractFormInfo(){
        this.originalName = this.name = this.formData;                   
    }

    public saveForm(){
            
        this.nameState = this.name != "";                
        
        if (this.nameState){
            const judgeName = this.name;            
            this.$emit('submit', this.isCreateJudge, judgeName, this.index);
        }            
    }

    public closeForm(){
        if(this.isChanged())
            this.showCancelWarning = true;
        else
            this.confirmedCloseForm();
    }

    public isChanged(){
        if(this.isCreateJudge){
            if(this.name.length) return true;
            return false;
        } else {

            if ( this.originalName != this.name ) {
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
    }
    
}
</script>

<style scoped lang="scss">

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