<template>
    <b-card v-if="dataReady" class="bg-white border-white text-dark">

        <b-row class="ml-1">
            
            <b-form-group
                class="mx-1" 
                style="display: inline;"                    
                label="THE NEW PARTY IS:" 
                label-for="party-type">
                <b-form-radio-group
                    id="party-type"  
                    style="display: inline;"                     
                    @change="enableAdd"
                    v-model="party.isOrganization"
                    :options="partyTypeOptions"                
                ></b-form-radio-group>                
            </b-form-group>
           
        </b-row>

        <b-card v-if="displayWarning" class="bg-danger text-white border-danger">
            WARNING: The parties to an appeal are almost always the parties that appear 
            in the lower court. Do not add parties that were not named on the lower court 
            file as this may result in your appeal form being rejected.

        </b-card>

        <b-card no-body v-else-if="!displayWarning && party.isOrganization" class="border-white">

            <b-row class="ml-1">
                <b-col cols="6">                    
                    <b-form-group
                        class="labels"                
                        label="ORGANIZATION NAME" 
                        label-for="organization-name">
                        <b-form-input 
                            id="organization-name"                    
                            v-model="party.organizationName">
                        </b-form-input>
                    </b-form-group>
                </b-col>   
                <b-col cols="6">
                    <b-form-group
                        class="labels"                        
                        label="LOWER COURT ROLE:" 
                        label-for="court-role">
                        <b-form-select                            
                            id="court-role"              
                            v-model="party.lowerCourtRole"                    
                            :options="lookups.lowerCourtRoles">
                        </b-form-select>                        
                    </b-form-group>       
                </b-col>         
            </b-row>

            <b-row class="ml-1">
                <b-col cols="6" ></b-col>
                <b-col cols="6">
                    <b-form-group
                        class="labels"                
                        label="COUNSEL NAME:" 
                        label-for="counsel-number">
                        <b-form-input 
                            id="counsel-name"                    
                            v-model="party.counselName">
                        </b-form-input>
                    </b-form-group>
                </b-col>           
            </b-row>

        </b-card>

        <b-card no-body v-else-if="!displayWarning && !party.isOrganization" class="border-white">

            <b-row class="ml-1">
                <b-col cols="6">                    
                    <b-form-group
                        class="labels"                
                        label="SURNAME:" 
                        label-for="surname">
                        <b-form-input 
                            id="surname"                    
                            v-model="party.surname">
                        </b-form-input>
                    </b-form-group>
                </b-col>   
                <b-col cols="6">
                    <b-form-group
                        class="labels"                        
                        label="LOWER COURT ROLE:" 
                        label-for="court-role">
                        <b-form-select                            
                            id="court-role"              
                            v-model="party.lowerCourtRole"                    
                            :options="lookups.lowerCourtRoles">
                        </b-form-select>                        
                    </b-form-group>       
                </b-col>         
            </b-row>

            <b-row class="ml-1">
                <b-col cols="6">
                    <b-form-group
                        class="labels"                
                        label="FIRST GIVEN NAME:" 
                        label-for="first-name">
                        <b-form-input 
                            id="first-name"                    
                            v-model="party.firstGivenName">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                        class="labels"                
                        label="COUNSEL NAME:" 
                        label-for="counsel-number">
                        <b-form-input 
                            id="counsel-name"                    
                            v-model="party.counselName">
                        </b-form-input>
                    </b-form-group>
                </b-col>           
            </b-row>
            <b-row class="ml-1">
                <b-col cols="6">
                    <b-form-group
                        class="labels"                
                        label="SECOND GIVEN NAME:" 
                        label-for="second-name">
                        <b-form-input 
                            id="second-name"                    
                            v-model="party.secondGivenName">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                     
            </b-row>
            <b-row class="ml-1">
                <b-col cols="6">
                    <b-form-group
                        class="labels"                
                        label="THIRD GIVEN NAME:" 
                        label-for="third-name">
                        <b-form-input 
                            id="third-name"                    
                            v-model="party.thirdGivenName">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                     
            </b-row>

        </b-card>
                 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';
import { lookupsInfoType } from '@/types/Information';


@Component
export default class FillForm7AddParty extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public caseLocation: string;

    @commonState.State
    public lookups!: lookupsInfoType;
    

    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

      
    displayWarning = true;
    party = {} as supremeCourtPartiesJsonInfoType;
    dataReady = false;

    mounted() { 
        this.dataReady = false; 
        this.displayWarning = true;
        console.log(this.party)
       

        this.dataReady = true;            
    }

    public enableAdd(){
        this.displayWarning = false;
        this.$emit('enableAdd');
    }

}
</script>

<style scoped lang="scss">

.labels {
    font-size: 0.75rem; font-weight:600;
}

</style>