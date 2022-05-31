<template>
    <div :key="'party-modal-'+update">
        <!-- {{party}} -->

        <b-card class="bg-white border-white text-dark">

            <b-row class="mx-3" v-if="isCreate">
                <div class="labels mr-3">The new party is:</div>
                <b-form-group                    
                    :key="partyStates.type"
                    :class="partyStates.type==false? 'border border-danger': 'mx-1'">
                    <b-form-radio-group                        
                        v-model="party.isOrganization"
                        @change="initPartyStates()"
                        :options="partyTypeOptions"                
                    ></b-form-radio-group>                
                </b-form-group>            
            </b-row>     

            <b-card no-body v-if=" party.isOrganization" class="border-white">

                <b-row class="ml-1">
                    <b-col cols="6">                    
                        <b-form-group
                            class="labels"                
                            label="Organization Name" 
                            label-for="organization-name">
                            <b-form-input 
                                id="organization-name"                                    
                                :state="partyStates.organizationName"             
                                v-model="party.organization">
                            </b-form-input>
                        </b-form-group>
                    </b-col>                
                    <b-col cols="6">
                        <b-form-group
                            class="labels"                
                            label="Counsel Name:" 
                            label-for="counsel-name">
                            <b-form-input 
                                id="counsel-name"                 
                                v-model="party.counselName">
                            </b-form-input>
                        </b-form-group>
                    </b-col>           
                </b-row>

            </b-card>

            <b-card no-body v-else class="border-white">

                <b-row class="ml-1">
<!-- <SURNAME> -->                    
                    <b-col cols="6">                    
                        <b-form-group
                            class="labels"                
                            label="Surname:" 
                            label-for="surname">
                            <b-form-input 
                                id="surname"                                    
                                :state="partyStates.lastName"                  
                                v-model="party.lastName">
                            </b-form-input>
                        </b-form-group>
                    </b-col>   
                    
<!-- <FIRST NAME> -->
                    <b-col cols="6">
                        <b-form-group
                            class="labels"                
                            label="First Given Name:" 
                            label-for="first-name">
                            <b-form-input 
                                id="first-name"                                    
                                :state="partyStates.firstName"                                                     
                                v-model="party.firstName">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="ml-1">
<!-- <Counsel Name> -->
                    <b-col cols="6">
                        <b-form-group
                            class="labels"                
                            label="Counsel Name:" 
                            label-for="counsel-name">
                            <b-form-input 
                                id="counsel-name"                                                       
                                v-model="party.counselName">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>           
                 
            </b-card>

            
<!-- <ALIASES> -->
            <b-card no-body class="border-white">
                <b-row class="ml-1">   
                    <b-col cols="10">
                        <b-form-group
                            class="labels"                
                            label="Other Names:" 
                            label-for="aliases">
                            <span 
                                v-if="party.aliases && party.aliases.length == 0 && !AddNewAliasForm" 
                                id="aliases" 
                                class="text-muted ml-2 my-2">No aliases have been assigned.
                            </span>
                            <b-table
                                v-else-if="party.aliases && party.aliases.length > 0"                                                                
                                id="aliases"
                                :items="party.aliases"
                                :fields="aliasFields"
                                head-row-variant="primary"
                                borderless    
                                small                                            
                                responsive="sm"
                                >                                          
                                <template v-slot:cell(type)="data" >
                                    <span style="font-size: 16px;">
                                        {{data.item.type}}</span>
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
                                            @click="removeAlias(data)">
                                            <b-icon 
                                                icon="trash-fill" 
                                                font-scale="1.25" 
                                                variant="danger"/>
                                        </b-button>
                                        <b-button 
                                            size="sm" 
                                            variant="transparent" 
                                            @click="editAlias(data)">
                                            <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                        </b-button>
                                    </div>
                                </template>

                                <template v-slot:row-details="data">
                                    <b-card 
                                        body-class="m-0 px-0 py-1" 
                                        :border-variant="addAliasFormColor" 
                                        style="border:2px solid;">
                                        <add-alias-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateAlias="false" 
                                            v-on:submit="modifyAliasList" 
                                            v-on:cancel="closeAliasForm" />
                                    </b-card>
                                </template>
                            </b-table> 
                        </b-form-group>
                    </b-col>  
                    <b-col cols="2">           
                        <b-button 
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                            v-if="!AddNewAliasForm" 
                            size="sm" 
                            variant="court" 
                            @click="addNewAlias"><b-icon icon="plus"/>Add Alias</b-button>
                    </b-col>
                </b-row>
            </b-card>           

            <b-card 
                v-if="AddNewAliasForm" 
                id="addAliasForm" 
                class="my-1 ml-4" 
                :border-variant="addAliasFormColor" 
                style="border:2px solid; width: 81%;" 
                body-class="px-1 py-1">
                <add-alias-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateAlias="true" 
                    v-on:submit="modifyAliasList" 
                    v-on:cancel="closeAliasForm" />                
            </b-card>

<!-- <LEGAL REP> -->
            <b-card no-body class="border-white">
                <b-row class="ml-1">   
                    <b-col cols="10">
                        <b-form-group
                            class="labels"                
                            label="Legal Representatives:" 
                            label-for="representatives">
                            <span 
                                v-if="party.legalReps && party.legalReps.length == 0 && !AddNewRepresentativeForm" 
                                id="representatives" 
                                class="text-muted ml-2 my-2">No representatives have been assigned.
                            </span>
                            <b-table
                                v-else-if="party.legalReps && party.legalReps.length > 0"                               
                                id="representatives"
                                :items="party.legalReps"
                                :fields="representativeFields"
                                head-row-variant="primary"
                                borderless    
                                small                                            
                                responsive="sm"
                                >                                          
                                <template v-slot:cell(type)="data" >
                                    <span style="font-size: 16px;">
                                        {{data.item.type}}</span>
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
                                            @click="removeRepresentative(data)">
                                            <b-icon 
                                                icon="trash-fill" 
                                                font-scale="1.25" 
                                                variant="danger"/>
                                        </b-button>
                                        <b-button 
                                            size="sm" 
                                            variant="transparent" 
                                            @click="editRepresentative(data)">
                                            <b-icon 
                                                icon="pencil-square" 
                                                font-scale="1.25" 
                                                variant="primary"/>
                                        </b-button>
                                    </div>
                                </template>

                                <template v-slot:row-details="data">
                                    <b-card 
                                        body-class="m-0 px-0 py-1" 
                                        :border-variant="addRepresentativeFormColor" 
                                        style="border:2px solid;">
                                        <add-representative-form 
                                            :formData="data.item" 
                                            :index="data.index" 
                                            :isCreateRep="false" 
                                            :isOrganization="party.isOrganization" 
                                            v-on:submit="modifyRepresentativeList" 
                                            v-on:cancel="closeRepresentativeForm" />
                                    </b-card>
                                </template>
                            </b-table> 
                        </b-form-group>
                    </b-col>  
                    <b-col cols="2">           
                        <b-button 
                            style="margin-top: 2.25rem; height: 2.25rem; font-size: 0.75rem; width: 100%"
                            v-if="!AddNewRepresentativeForm" 
                            size="sm" 
                            variant="court" 
                            @click="addNewRepresentative">
                            <b-icon 
                                icon="plus" 
                                style="padding:0; margin:0;"/>Add Representative
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>           

            <b-card 
                v-if="AddNewRepresentativeForm" 
                id="addRepresentativeForm" 
                class="my-1 ml-4" 
                :border-variant="addRepresentativeFormColor" 
                style="border:2px solid; width: 81%;" 
                body-class="px-1 py-1">
                <add-representative-form 
                    :formData="{}" 
                    :index="-1" 
                    :isCreateRep="true" 
                    :isOrganization="party.isOrganization" 
                    v-on:submit="modifyRepresentativeList" 
                    v-on:cancel="closeRepresentativeForm" />                
            </b-card>

        </b-card>                       

        <b-row class="border-top">            
            <b-button class="py-2 mt-1 ml-5" variant="dark" @click="closeModal">Cancel</b-button>
            <b-button class="mt-1 ml-auto mr-5" variant="success" @click="saveParty"><i class="fas fa-save mr-1"></i>Save</b-button>
        </b-row>
       
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { aliasInfoType, form13PartiesInfoType, form13PartiesStatesInfoType, representativeInfoType } from '@/types/Information/Form13';

import AddAliasForm from '@/components/process/Form1/components/fillForm1/AddAliasForm.vue';
import AddRepresentativeForm from '@/components/process/Form1/components/fillForm1/AddRepresentativeForm.vue';
import {getPartyTitles, getFullName} from "./PartyTitlesForm13"

@Component({
    components:{        
        AddAliasForm,
        AddRepresentativeForm  
    }
})
export default class AddPartyModal extends Vue {

    @Prop({required:true})
    isCreate: boolean;

    @Prop({required:true})
    party: form13PartiesInfoType;

    partyStates= {} as form13PartiesStatesInfoType;

    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

    aliasFields = [
        {
            key:'nameType',          
            label:'Alias Type',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'name',          
            label:'Alias Name',   
            thClass: 'text-white bg-court', 
            thStyle: 'font-size: 1rem;',          
            sortable:false            
        }, 
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }        
    ]

    representativeFields = [
        {
            key:'repType',          
            label:'Representative Type',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'name',          
            label:'Representative Name',   
            thClass: 'text-white bg-court', 
            thStyle: 'font-size: 1rem;',          
            sortable:false            
        }, 
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }        
    ]

    AddNewAliasForm = false;       
    addAliasFormColor = 'court';
    latestEditAliasData;
    isEditAliasOpen = false;

    AddNewRepresentativeForm = false; 
    addRepresentativeFormColor = 'court';
    latestEditRepresentativeData;
    isEditRepresentativeOpen = false;

    update = 0;
    originalParty = {} as form13PartiesInfoType

    mounted(){
        this.initPartyStates()
        if(this.isCreate){
            this.prepopulateParty()
        }else{
            this.originalParty = JSON.parse(JSON.stringify(this.party))
        }
    }

    public initPartyStates(){
        this.partyStates.firstName = null
        this.partyStates.lastName = null
        this.partyStates.organizationName = null
        this.partyStates.counselName = null
        this.partyStates.type = null
        this.update++;
    }

    public prepopulateParty(){
        this.party.isOrganization = null
        this.party.firstName = null
        this.party.lastName = null
        this.party.organization = null
        this.party.name = null
        this.party.title = null
        this.party.counselName = null
        this.party.aliases = []
        this.party.legalReps = []
        this.update++;
    }

    public checkPartyStates(){

        let stateCheck = true;
        this.partyStates.type = (this.party.isOrganization == null)? false :null
        
        if (this.party.isOrganization){
            this.partyStates.organizationName = !(this.party.organization)? false : null;
        } else {
            this.partyStates.lastName = !(this.party.lastName)? false : null;
            this.partyStates.firstName = !(this.party.firstName)? false : null;
        }

        for(const field of Object.keys(this.partyStates)){
            if(this.partyStates[field]==false)
                stateCheck = false;
        }
        this.update++;
        return stateCheck;            
    }

    public addNewAlias(){
        if(this.isEditAliasOpen){            
            this.addAliasFormColor = 'danger'
        }else{
            this.AddNewAliasForm = true;            
        }
    }

    public addNewRepresentative(){
        if(this.isEditRepresentativeOpen){            
            this.addRepresentativeFormColor = 'danger'
        }else{
            this.AddNewRepresentativeForm = true;            
        }
    }

    public modifyAliasList(isCreateAlias: boolean, newAlias: aliasInfoType, index: number){        

        if (isCreateAlias){
            if(this.party.aliases)           
                this.party.aliases.push(newAlias)
            else
                this.party.aliases=[newAlias]
            this.closeAliasForm();
        } else {           
            this.party.aliases[index].nameType = newAlias.nameType;
            this.party.aliases[index].name = newAlias.name;           
            this.closeAliasForm();
        }        
    }

    public removeAlias(data){        
        this.party.aliases.splice(data.index,1);      
    }

    public modifyRepresentativeList(isCreateRep: boolean, newRepresentative: representativeInfoType, index: number){       

        if (isCreateRep){ 
            if(this.party.legalReps)          
                this.party.legalReps.push(newRepresentative)
            else
                this.party.legalReps=[newRepresentative]
            this.closeRepresentativeForm();
        } else {           
            this.party.legalReps[index].repType = newRepresentative.repType;
            this.party.legalReps[index].name = newRepresentative.name;           
            this.closeRepresentativeForm();
        }      
    }

    public removeRepresentative(data){
        this.party.legalReps.splice(data.index,1);
    }

    public editAlias(data) {
        if(this.AddNewAliasForm || this.isEditAliasOpen){            
            this.addAliasFormColor = 'danger';                     
        }else if(!this.isEditAliasOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditAliasOpen = true;
            this.latestEditAliasData = data            
        }   
    }

    public editRepresentative(data) {
        if(this.AddNewRepresentativeForm || this.isEditRepresentativeOpen){            
            this.addRepresentativeFormColor = 'danger';                     
        }else if(!this.isEditRepresentativeOpen && !data.detailsShowing){
            data.toggleDetails();
            this.isEditRepresentativeOpen = true;
            this.latestEditRepresentativeData = data;            
        }   
    }

    public closeAliasForm() {                     
        this.AddNewAliasForm= false; 
        this.addAliasFormColor = 'court'
        if(this.isEditAliasOpen){
            this.latestEditAliasData.toggleDetails();
            this.isEditAliasOpen = false;
        } 
    }

    public closeRepresentativeForm() {                     
        this.AddNewRepresentativeForm= false; 
        this.addRepresentativeFormColor = 'court'
        if(this.isEditRepresentativeOpen){
            this.latestEditRepresentativeData.toggleDetails();
            this.isEditRepresentativeOpen = false;
        } 
    }

    public closeModal(){
        for(const field of Object.keys(this.party)){
            this.party[field] = this.originalParty[field]
        }
        this.$emit('partyChanged',false)
    }

    public saveParty(){
        if(this.checkPartyStates()){
            this.party.name = getFullName(this.party);
            this.party.title = getPartyTitles(this.party, '</br>');
            //console.log(this.party)
            if(this.isCreate)
                this.$emit('partyChanged',true)
            else
                this.$emit('partyChanged',false)
        }
    }


}
</script>
<style lang="scss" scoped>
    .labels{
        color: rgb(41, 76, 105);
        font-weight: 600;
    }
</style>