<template>
    <div :key="'party-modal-'+update">

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
                                :state="partyStates.organization"             
                                v-model="party.organization">
                            </b-form-input>
                        </b-form-group>
                    </b-col>                
                    <b-col cols="6">                        
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
                    </b-col>
                </b-row>           
                 
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

import { partyJsonDataType, partiesStateJsonDataType } from '@/types/Information/json';


@Component
export default class AddPartyModal extends Vue {

    @Prop({required:true})
    isCreate: boolean;

    @Prop({required:true})
    party: partyJsonDataType;

    partyStates= {} as partiesStateJsonDataType;

    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

   
    AddNewAliasForm = false;       
    addAliasFormColor = 'court';
    latestEditAliasData;
    isEditAliasOpen = false;

    AddNewRepresentativeForm = false; 
    addRepresentativeFormColor = 'court';
    latestEditRepresentativeData;
    isEditRepresentativeOpen = false;

    update = 0;
    originalParty = {} as partyJsonDataType

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
        this.partyStates.organization = null
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
        this.update++;
    }

    public checkPartyStates(){

        let stateCheck = true;
        this.partyStates.type = (this.party.isOrganization == null)? false :null
        
        if (this.party.isOrganization){
            this.partyStates.organization = !(this.party.organization)? false : null;
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

    public closeModal(){
        for(const field of Object.keys(this.party)){
            this.party[field] = this.originalParty[field]
        }
        this.$emit('partyChanged',false)
    }

    public saveParty(){
        if(this.checkPartyStates()){
            this.party.name = this.getFullName(this.party);

            if(this.isCreate)
                this.$emit('partyChanged',true)
            else
                this.$emit('partyChanged',false)
        }
    }

    public getFullName(partyInfo){
    
        let fullName =''
        if (partyInfo.isOrganization){                
            fullName = partyInfo.organization;
        } 
        else {                
            fullName = partyInfo.firstName +' ' +partyInfo.lastName 
        }
        return fullName
    }
}
</script>
<style lang="scss" scoped>
    .labels{
        color: rgb(41, 76, 105);
        font-weight: 600;
    }
</style>