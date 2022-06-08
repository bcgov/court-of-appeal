<template>
    <b-card class="mx-4" :key="updated">

    <!-- <Appellants> -->
        <b-row class="mb-2 mx-n4">   
            <b-col cols="10" :class="state.appellants !=null?'border border-danger is-invalid':''">
                <b-form-group
                    class="labels"                
                    label="Appellants:">                    
                    <span 
                        v-if="formInfo.appellants.length == 0 && !AddNewAppellantForm"
                        class="h6 text-muted ml-2 my-2">No appellants have been assigned.
                    </span>
                    <b-table
                        v-else-if="formInfo.appellants.length > 0"                                                                
                        style="font-size:16px;"
                        class="mt-2"
                        :items="formInfo.appellants"
                        :fields="partyFields"
                        head-row-variant="primary"
                        borderless    
                        small                                            
                        responsive="sm"
                        >                                          
                        <template v-slot:cell(organization)="data" >
                            <span v-if="data.item.isOrganization" style="font-size: 16px;">
                                Organization
                            </span>
                                <span v-else style="font-size: 16px;">
                                Individual
                            </span>                                    
                        </template>

                        <template v-slot:cell(name)="data" >
                            <span style="font-size: 16px;">
                                {{data.item.name}}</span>
                        </template>
                        
                        <template v-slot:cell(edit)="data" >   
                            <div style="float: right;">                                                                     
                                <b-button 
                                    class="mr-2" 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="removeParty(data, 'appellants')">
                                    <b-icon 
                                        icon="trash-fill" 
                                        font-scale="1.25" 
                                        variant="danger"/>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="editParty(data,'Appellant')">
                                    <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                </b-button>
                            </div>
                        </template>

                    </b-table> 
                </b-form-group>
            </b-col>  
            <b-col cols="2">           
                <b-button                            
                    style="margin-top: 2.7rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                    v-if="!AddNewAppellantForm" 
                    size="sm" 
                    variant="court" 
                    @click="addNewParty('Appellant')"><b-icon icon="plus"/>Add Appellant</b-button>
            </b-col>
        </b-row>

    <!-- <Respondents> -->
        <b-row class="mb-2 mx-n4">   
            <b-col cols="10" :class="state.respondents !=null?'border border-danger is-invalid':''">
                <b-form-group
                    class="labels"                
                    label="Respondents:">                    
                    <span 
                        v-if="formInfo.respondents.length == 0 && !AddNewRespondentForm" 
                        class="h6 text-muted ml-2 my-2">No respondents have been assigned.
                    </span>
                    <b-table
                        v-else-if="formInfo.respondents.length > 0"
                        style="font-size:16px;"
                        class="mt-2"
                        :items="formInfo.respondents"
                        :fields="partyFields"
                        head-row-variant="primary"
                        borderless    
                        small                                            
                        responsive="sm"
                        >                                          
                        <template v-slot:cell(organization)="data" >
                            <span v-if="data.item.isOrganization" style="font-size: 16px;">
                                Organization
                            </span>
                                <span v-else style="font-size: 16px;">
                                Individual
                            </span>                                    
                        </template>

                        <template v-slot:cell(name)="data" >
                            <span style="font-size: 16px;">
                                {{data.item.name}}</span>
                        </template>
                        
                        <template v-slot:cell(edit)="data" >   
                            <div style="float: right;">                                                                     
                                <b-button 
                                    class="mr-2" 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="removeParty(data, 'respondents')">
                                    <b-icon 
                                        icon="trash-fill" 
                                        font-scale="1.25" 
                                        variant="danger"/>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="editParty(data,'Respondent')">
                                    <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                </b-button>
                            </div>
                        </template>

                    </b-table> 
                </b-form-group>
            </b-col>  
            <b-col cols="2">           
                <b-button 
                    style="margin-top: 2.7rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                    v-if="!AddNewRespondentForm" 
                    size="sm" 
                    variant="court" 
                    @click="addNewParty('Respondent')"><b-icon icon="plus"/>Add Respondent</b-button>
            </b-col>
        </b-row>

    <!-- <Interveners> -->
        <b-row class="mb-2 mx-n4">   
            <b-col cols="10" :class="state.interveners !=null?'border border-danger is-invalid':''">
                <b-form-group
                    class="labels"                
                    label="Interveners:">                    
                    <span 
                        v-if="formInfo.interveners.length == 0 && !AddNewIntervenerForm" 
                        class="h6 text-muted ml-2 my-2">No interveners have been assigned.
                    </span>
                    <b-table
                        v-else-if="formInfo.interveners.length > 0"
                        style="font-size:16px;"
                        class="mt-2"
                        :items="formInfo.interveners"
                        :fields="partyFields"
                        head-row-variant="primary"
                        borderless    
                        small                                            
                        responsive="sm"
                        >                                          
                        <template v-slot:cell(organization)="data" >
                            <span v-if="data.item.isOrganization" style="font-size: 16px;">
                                Organization
                            </span>
                                <span v-else style="font-size: 16px;">
                                Individual
                            </span>                                    
                        </template>

                        <template v-slot:cell(name)="data" >
                            <span style="font-size: 16px;">
                                {{data.item.name}}</span>
                        </template>
                        
                        <template v-slot:cell(edit)="data" >   
                            <div style="float: right;">                                                                     
                                <b-button 
                                    class="mr-2" 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="removeParty(data,'interveners')">
                                    <b-icon 
                                        icon="trash-fill" 
                                        font-scale="1.25" 
                                        variant="danger"/>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="transparent" 
                                    @click="editParty(data,'Intervener')">
                                    <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                </b-button>
                            </div>
                        </template>

                    </b-table> 
                </b-form-group>
            </b-col>  
            <b-col cols="2">           
                <b-button 
                    style="margin-top: 2.7rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                    v-if="!AddNewIntervenerForm" 
                    size="sm" 
                    variant="court" 
                    @click="addNewParty('Intervener')"><b-icon icon="plus"/>Add Intervener</b-button>
            </b-col>
        </b-row>


        <b-modal size="xl" v-model="showPartyWindow" footer-class="d-none" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 v-if="isCreate" class="my-2 ml-2">Add {{partyType}}</h1>
                <h1 v-else class="my-2 ml-2">Edit {{partyType}}</h1>
            </template>
            <add-party-modal :isCreate="isCreate" :party="partyToEdit" @partyChanged="partyChanged" />
            <template v-slot:modal-header-close>
                <b-button variant="primary"  class="mt-1" @click="showPartyWindow = false">&times;</b-button>
            </template>
        </b-modal>
    </b-card>
</template>

<script lang="ts">
import { partyJsonDataType } from '@/types/Information/json';
import { Component, Vue, Prop } from 'vue-property-decorator';

import AddPartyModal from './AddPartyModal.vue'

@Component({
    components:{        
        AddPartyModal        
    }
})
export default class PartiesTable extends Vue { 
    
    @Prop({required:true})
    formInfo: any 

    @Prop({required:true})
    state: any
     
    partyFields = [
        { key:'organization', label:'Party Type', thClass: 'text-white bg-court', thStyle: '', sortable:false }, 
        { key:'name', label:'Party Name', thClass: 'text-white bg-court', thStyle: '',  sortable:false  },        
        { key:'edit', label:'', thClass: 'text-white bg-court', sortable:false }        
    ]


    AddNewRespondentForm = false;
    AddNewAppellantForm = false;
    AddNewIntervenerForm = false;
    
    partyToEdit = {} as partyJsonDataType;
    isCreate = true
    partyType = ''
    showPartyWindow = false

    updated=0;

    public addNewParty(type){
        this.partyToEdit = {} as partyJsonDataType
        this.partyType = type
        this.isCreate = true;
        this.showPartyWindow = true;        
    }

    public editParty(data, type) {
        this.partyToEdit = data.item
        this.partyType = type;
        this.isCreate = false;
        this.showPartyWindow = true;
    }

    public removeParty(data, type){ 
        const formData = this.formInfo;       
        formData[type].splice(data.index,1);
        this.updated ++;        
    }


    public partyChanged(partyCreated){
        if(partyCreated){
            const formInfo = this.formInfo
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                formInfo.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                formInfo.respondents.push(party);
            }
            else if(this.partyType =='Intervener'){
                formInfo.interveners.push(party);
            }
        }        
        this.showPartyWindow = false;        
        this.$emit('partyChanged')

    }
}
</script>

<style scoped lang="scss">


    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>