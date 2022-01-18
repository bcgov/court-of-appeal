<template>
    
    <b-card v-if="dataReady" no-body class="mb-4 border-light bg-light">

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Style of Proceeding</p> 
            <p class="ml-4">
                Include only those parties whose interests are affected by the order sought by the appellant(s). 
                The order of the names will be handled for you.
            </p>
            <b-table
                :key="updateTable"                 
                :items="partiesList"
                :fields="partiesFields"
                :state="form7InfoStates.respondents || form7InfoStates.appellants"
                class="mx-4 text-center"
                striped
                small 
                responsive="sm"
                >

                <template v-slot:cell(app)="row">
                    <span v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Appellant'" v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template> 

                <template v-slot:cell(appAction)="row" >
                    <b-button
                        v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''"  
                        @click="showConfirmEditParty(row, true, true)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Appellant'"  
                        @click="showConfirmEditParty(row, true, false)"        
                        class="text-white bg-primary my-3 moveButton" 
                        ><b-icon-chevron-right/>
                    </b-button> 
                </template>          

                <template v-slot:cell(title)="row">
                    <span v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''" v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template>
                
                <template v-slot:cell(resAction)="row" >
                    <b-button
                        v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Respondent'"  
                        @click="showConfirmEditParty(row, false, true)"
                        class="text-white bg-primary my-3 moveButton"
                        ><b-icon-chevron-left/>
                    </b-button>
                    <b-button  
                        v-if="!row.item.appealCourtRole || row.item.appealCourtRole == ''"  
                        @click="showConfirmEditParty(row, false, false)"        
                        class="text-white bg-primary my-3 moveButton" 
                        ><b-icon-chevron-right/>
                    </b-button>
                </template>

                <template v-slot:cell(res)="row">
                    <span v-if="row.item.appealCourtRole && row.item.appealCourtRole == 'Respondent' " v-html="row.item.title">
                        {{row.item.title}}
                    </span>                                        
                </template>                
                
            </b-table> 
            <span
                v-if="(form7InfoStates.respondents != null || form7InfoStates.appellants != null)" 
                style="font-size: 0.75rem;" 
                class="mx-4 bg-white text-danger">A minimum of one Appellant and one Respondent is required.
            </span> 

            <hr class="mb-3 mx-4">
            <b-row class="mx-0">
                <b-col cols="2" style="padding-right: 0;" >
                    <b-button 
                        style="float: left; padding-right: 0;" 
                        class="bg-transparent border-white text-primary"
                        @click="addParties"
                        >Add another Party
                        <b-icon-plus class="ml-1 mr-0" variant="primary" scale="1.5" />
                    </b-button>
                </b-col>
                <b-col cols="2" style="padding-right: 0;" class="text-center">
                    <b-button
                        class="bg-transparent border-white text-primary"                        
                        @click="editParties"
                        >Edit Parties
                        <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                    </b-button>
                </b-col>
                <b-col cols="3" style="padding-left: 0;">
                    <b-button
                        style="float: left;" 
                        class="bg-transparent border-white text-primary"
                        @click="editStyleOfProceeding"
                        >Edit Style of Proceeding
                        <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                    </b-button>
                </b-col>
            </b-row> 
            <span
                v-if="(!editStyleOfProceedingsEnabled)" 
                style="font-size: 0.75rem;" 
                class="mx-4 bg-white text-danger">A minimum of one Appellant and one Respondent is required to edit style of proceedings.
            </span>

            <hr class="mb-4 mx-4">
            <p class="ml-4 mt-2 mb-5" style="font-weight:700;">Please ensure that the required names and address fields are completed.</p>

            <p class="ml-4 mt-4">TO THE RESPONDENT(S)</p>
            <b-form-group
                class="ml-4"                
                label="The names of the parties in the Respondent Column above should populate below and you will need to add in the address for service." 
                label-for="respondent-names">
                <b-form-textarea 
                    id="respondent-names"
                    rows="3"
                    disabled                    
                    @change="update"
                    v-model="respondentNames">
                </b-form-textarea>
            </b-form-group>

            <p class="ml-4 mt-4">AND TO THE RESPONDENT(S) SOLICITOR</p>
            <b-form-group
                class="ml-4"                
                label="If counsel represented the Respondent include their name and address in the box below." 
                label-for="respondent-solicitor">
                <span><b>Note</b>: You may serve a Notice of Appeal to the Respondent(s) solicitor in the lower court.</span>
                <b-form-textarea 
                    id="respondent-solicitor"
                    disabled
                    rows="3"
                    @change="update"
                    v-model="respondentSolicitorNames">
                </b-form-textarea>
            </b-form-group>
            
            <b-form-group
                class="ml-4 mt-4"                
                label="THIS NOTICE OF APPEAL IS GIVEN BY (enter name of lawyer or party)" 
                label-for="appellant">                
                <b-form-input 
                    id="appellant"
                    style="width: 45%;" 
                    :state="form7InfoStates.mainAppellant"
                    @change="update"      
                    v-model="styleOfProceedingsInfo.mainAppellant">
                </b-form-input>
            </b-form-group>
            
            <b-form-group
                class="ml-4 mt-4"                
                label="WHOSE ADDRESS OF SERVICE IS" 
                label-for="appellant-address">
                <b-form-textarea 
                    id="appellant-address"
                    rows="3"
                    :state="form7InfoStates.serviceAddress"
                    @change="update"                    
                    v-model="styleOfProceedingsInfo.serviceAddress">
                </b-form-textarea>
                <span
                    v-if="(form7InfoStates.validServiceAddress != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger">
                    Address of service must be in British Columbia (did you forget to include the province?)
                </span>
                
            </b-form-group>
            
        </b-card>        

        <b-modal size="xl" v-model="showPartyWindow" header-class="bg-primary text-white" :key="updatedPartyInfo">
            <template v-slot:modal-title>
                <h1 v-if="isCreate" class="my-2 ml-2">Add Party</h1>
                <h1 v-else class="my-2 ml-2">Edit Party</h1>
            </template>

            <b-card class="bg-white border-white text-dark">

                <b-row class="ml-1">
                    
                    <b-form-group
                        v-if="isCreate"
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
                    <b-form-group
                        v-else
                        class="mx-3" 
                        style="display: inline;"                    
                        label="SELECT A PARTY TO EDIT:" 
                        label-for="party-to-edit">
                        <b-form-select
                            id="party-to-edit"  
                            style="display: inline;"                     
                            @change="enableEdit"
                            v-model="partyToEdit">
                            <b-form-select-option 
                                 v-for="party in partiesList" 
                                :key="party.ceisPartyId"
                                :value="party">
                                {{party.fullName}}
                            </b-form-select-option>                
                        </b-form-select>                
                    </b-form-group>
                
                </b-row>

                <b-card v-if="displayWarning" class="bg-danger text-white border-danger">
                    <div v-if="isCreate">
                        WARNING: The parties to an appeal are almost always the parties that appear 
                        in the lower court. Do not add parties that were not named on the lower court 
                        file as this may result in your appeal form being rejected.
                    </div>
                    <div v-else>
                        WARNING: The spelling and names of the parties must be the same as on the 
                        Supreme Court order. Do not modify names. This should only be used in 
                        exceptional circumstances.
                    </div>
                </b-card>                

                <b-card no-body v-else-if="partyDataReady && !displayWarning && party.isOrganization" class="border-white">

                    <b-row class="ml-1">
                        <b-col cols="6">                    
                            <b-form-group
                                class="labels"                
                                label="ORGANIZATION NAME" 
                                label-for="organization-name">
                                <b-form-input 
                                    id="organization-name"                                    
                                    :state="form7PartiesStates.organizationName"             
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
                                    :state="form7PartiesStates.lowerCourtRole"             
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

                <b-card no-body v-else-if="partyDataReady && !displayWarning && !party.isOrganization" class="border-white">

                    <b-row class="ml-1">
                        <b-col cols="6">                    
                            <b-form-group
                                class="labels"                
                                label="SURNAME:" 
                                label-for="surname">
                                <b-form-input 
                                    id="surname"                                    
                                    :state="form7PartiesStates.surname"                  
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
                                    :disabled="!isCreate"
                                    :state="form7PartiesStates.lowerCourtRole"
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
                                    :state="form7PartiesStates.firstGivenName"                                                     
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

                <b-card no-body v-if="partyDataReady && !displayWarning" class="border-white">

                    <b-card no-body class="border-white">
                        <b-row class="ml-1">   
                            <b-col cols="10">
                                <b-form-group
                                    class="labels"                
                                    label="OTHER NAMES:" 
                                    label-for="aliases">
                                    <span 
                                        v-if="party.aliases.length == 0 && !AddNewAliasForm" 
                                        id="aliases" 
                                        class="text-muted ml-2 my-2">No aliases have been assigned.
                                    </span>
                                    <b-table
                                        v-else-if="party.aliases.length > 0"
                                        :key="updated"                                
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

                    <b-card no-body class="border-white">
                        <b-row class="ml-1">   
                            <b-col cols="10">
                                <b-form-group
                                    class="labels"                
                                    label="LEGAL REPRESENTATIVES:" 
                                    label-for="representatives">
                                    <span 
                                        v-if="party.legalReps.length == 0 && !AddNewRepresentativeForm" 
                                        id="representatives" 
                                        class="text-muted ml-2 my-2">No representatives have been assigned.
                                    </span>
                                    <b-table
                                        v-else-if="party.legalReps.length > 0"
                                        :key="updated"                                
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
        
            </b-card>            

            <template v-slot:modal-footer>
                <b-button 
                    v-if="!isCreate && enableEditParty"
                    variant="danger"
                    class="mr-auto" 
                    @click="confirmDeleteParty">
                    <b-icon-trash-fill class="mr-1" />Delete
                </b-button>
                <b-button variant="dark" @click="showPartyWindow = false">Cancel</b-button>
                <b-button 
                    v-if="isCreate && enableAddParty"
                    variant="success" 
                    @click="saveNewParty">
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
                <b-button 
                    v-else-if="!isCreate && enableEditParty"
                    variant="success" 
                    @click="saveParty">
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
            </template>

            <template v-slot:modal-header-close>
                <b-button
                    variant="outline-dark"
                    class="closeButton"
                    @click="showPartyWindow = false"
                    >&times;</b-button
                >
            </template>
        </b-modal>

        <b-modal v-model="showConfirmDeleteParty" id="bv-modal-confirm-delete" header-class="bg-warning text-light">
            
			<template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Delete Party</h2>                    
            </template>			

            <h4>Are you sure you want to delete this party?</h4>
			
            <template v-slot:modal-footer>
				<b-button variant="primary" @click="cancelPartyDeletion()">Cancel</b-button>
                <b-button variant="danger" @click="deleteParty()">Confirm</b-button>                
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="cancelPartyDeletion()"
                >&times;</b-button>
            </template>

        </b-modal>

        <b-modal size="lg" v-model="showConfirmEditParties" id="bv-modal-confirm-edit-party" header-class="bg-warning text-light">
            
			<template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Edit Parties</h2>                    
            </template>			

            <div>
                You have made edits to the style of cause and modifying the parties will reset these edits.  Do you wish to proceed?
            </div>
			
            <template v-slot:modal-footer>
				<b-button variant="secondary" @click="cancelShowConfirmEditParties()">Cancel</b-button>
                <b-button variant="primary" @click="confirmEditPartyAppealRoles()">OK</b-button>                
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="cancelShowConfirmEditParties()"
                >&times;</b-button>
            </template>

        </b-modal>

        <b-modal size="lg" v-model="showConfirmEditStyleOfProceeding" id="bv-modal-confirm-edit" header-class="bg-warning text-light">
            
			<template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Edit Style of Proceedings</h2>                    
            </template>			

            <div>
                Modifications to the style of proceeding will result in the document 
                being submitted to the registry for processing.  Do you wish to proceed?
            </div>
			
            <template v-slot:modal-footer>
				<b-button variant="secondary" @click="cancelEditStyleOfProceedings()">Cancel</b-button>
                <b-button variant="primary" @click="confirmEditStyleOfProceedings()">OK</b-button>                
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="cancelEditStyleOfProceedings()"
                >&times;</b-button>
            </template>

        </b-modal>

        <b-modal size="xl" v-model="showEditStyleOfProceedingWindow" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="my-2 ml-2">Edit Style of Proceeding</h1>                
            </template>

            <b-card v-if="styleOfProceedingDataReady" class="bg-white border-white text-dark">               

                <b-table
                        :items="styleOfProceedingsInfo.manualSop"
                        :fields="sopFields"                    
                        :no-sort-reset="true"
                        sort-icon-left
                        thead-class="d-none"
                        borderless                    
                        small
                        responsive="sm"
                    >
                    <template v-slot:cell(partyName)="data" >
                        <b-form-group
                                class="labels"                
                                :label="data.item.appealRole + ' / ' + data.item.lowerCourtRole" 
                                label-for="fullname">
                               
                                <b-form-input 
                                    id="fullname"  
                                    disabled    
                                    v-model="data.item.partyName.join(', ')">
                                </b-form-input>
                        </b-form-group>                        
                    </template>

                    <template v-slot:cell(conjunction)="data" >
                        <b-form-group style="margin-top: 2.35rem;" >
                            <b-form-select
                                v-model="data.item.conjunction"                   
                                :options="styleOfProceedingOptions">
                            </b-form-select>                        
                        </b-form-group>                         
                    </template>

                    <template v-slot:cell(edit)="data" >
                         <b-button                     
                            variant="info"
                            style="margin-top: 2.35rem; float:right;" 
                            >
                            <i class="fas fa-sort"></i>
                        </b-button>                         
                    </template>                   
                    
                </b-table>                         
        
            </b-card>            

            <template v-slot:modal-footer> 
                <b-button                     
                    variant="dark"
                    class="mr-auto" 
                    @click="showEditStyleOfProceedingWindow = false">
                    Cancel
                </b-button>

                <b-button                    
                    variant="danger" 
                    @click="resetStyleOfProceeding">
                    <b-icon-arrow-counterclockwise class="mr-1"/>
                    Reset Style of Proceeding
                </b-button>

                <b-button                    
                    variant="success" 
                    @click="saveNewStyleOfProceeding">
                    <i class="fas fa-save mr-1"></i>Update Style of Proceeding
                </b-button>
                
            </template>

            <template v-slot:modal-header-close>
                <b-button
                    variant="outline-dark"
                    class="closeButton"
                    @click="showEditStyleOfProceedingWindow = false"
                    >&times;</b-button
                >
            </template>
        </b-modal>
        
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");
import "@/store/modules/common";
const commonState = namespace("Common");

import AddAliasForm from './AddAliasForm.vue';
import AddRepresentativeForm from './AddRepresentativeForm.vue';

import { aliasInfoType, form7DataInfoType, form7PartiesInfoType, form7PartiesStatesInfoType, form7StatesInfoType, lookupsInfoType, manualSopInfoType, representativeInfoType } from '@/types/Information/Form7';
import { supremeCourtCaseJsonDataInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

@Component({
    components:{        
        AddAliasForm,
        AddRepresentativeForm        
    }
})
export default class FillForm7StyleOfProceedingsInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;    

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @commonState.State
    public userName!: string;

    @commonState.State
    public lookups!: lookupsInfoType;    

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    partiesFields = [
        {
            key:'app',          
            label:'Appellant(s)',                  
            thClass: 'text-white bg-primary text-center',            
            sortable:false            
        }, 
        {
            key:'appAction',          
            label:'',   
            thClass: 'text-white bg-primary text-center',           
            sortable:false            
        }, 
        {
            key:'title',          
            label:'Party (Not affected by the Appeal)',                  
            thClass: 'text-white bg-primary text-center',            
            sortable:false            
        }, 
        {
            key:'resAction',          
            label:'',   
            thClass: 'text-white bg-primary text-center',           
            sortable:false            
        },        
        {
            key: "res",
            label: "Respondent(s)",            
            thClass: 'text-white bg-primary text-center',
            sortable: false
        }
    ]
    
    partyTypeOptions = [
        {text: 'an individual', value: false},
        {text: 'an organization', value: true}
    ];

    aliasFields = [
        {
            key:'type',          
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

    sopFields = [
        {
            key:'partyName',          
            label:'',                
                      
            sortable:false            
        }, 
        {
            key:'conjunction',          
            label:'',   
           
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
            key:'type',          
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

    styleOfProceedingOptions = [
        {text: 'And', value: 'And'},
        {text: 'Between', value: 'Between'},
        {text: 'Re', value: 'Re'},
        {text: 'In The Matter Of', value: 'In The Matter Of'}
    ];

      
    displayWarning = true;

    AddNewAliasForm = false;       
    addAliasFormColor = 'court';
    latestEditAliasData;
    isEditAliasOpen = false;

    AddNewRepresentativeForm = false; 
    addRepresentativeFormColor = 'court';
    latestEditRepresentativeData;
    isEditRepresentativeOpen = false;
    updated = 0;
    updatedPartyInfo = 0;
    
    partyDataReady = false;
    
    respondentNames = '';
    respondents: string[] = [];
    respondentSolicitorNames = '';
    respondentSolicitors: string[] = [];
    
    dataReady = false;

    partiesList: form7PartiesInfoType[] = [];  
    party = {} as form7PartiesInfoType;    
    partyToEdit = {} as form7PartiesInfoType;
    updateTable = 0;
    showPartyWindow = false;
    showConfirmDeleteParty = false;
    showConfirmEditStyleOfProceeding = false;
    showEditStyleOfProceedingWindow = false;
    styleOfProceedingDataReady = false;
    enableAddParty = false;
    enableEditParty = false;
    isCreate = false;
    showConfirmEditParties = false;
    rowInfo;
    moveLeft = false;
    moveApp = false;
    
    styleOfProceedingsInfo = {} as form7DataInfoType;
    form7PartiesStates = {} as form7PartiesStatesInfoType; 
    editStyleOfProceedingsEnabled = true;   
    noRolePartyManualSop: manualSopInfoType[] = [];

    @Watch('respondents')
    setRespondentNames(newRespondents: string[]) 
    {
        this.respondentNames = newRespondents.join('; ');
        this.respondentSolicitorNames = this.respondentSolicitors.join('; ');        
    }

    mounted() { 
        this.dataReady = false;
        this.styleOfProceedingsInfo = this.form7Info;   
        this.respondents = [];
        this.respondentSolicitors = [];     
        this.extractInfo();
        this.form7PartiesStates = {} as form7PartiesStatesInfoType;
        this.dataReady = true;                   
    }

    public extractInfo(){
        this.styleOfProceedingsInfo.mainAppellant = this.userName;
        this.partiesList = this.supremeCourtCaseJson.parties;
        this.styleOfProceedingsInfo.appellants = this.styleOfProceedingsInfo.appellants?this.styleOfProceedingsInfo.appellants:[];
        this.styleOfProceedingsInfo.respondents = this.styleOfProceedingsInfo.respondents?this.styleOfProceedingsInfo.respondents:[]; 
        for (const respondent of this.styleOfProceedingsInfo.respondents){
            this.respondents.push(respondent.fullName);
            if (respondent.counselName) {
                this.respondentSolicitors.push(respondent.counselName);
            }                       
        }       
        for (const party in this.supremeCourtCaseJson.parties){
            const partyInfo = this.supremeCourtCaseJson.parties[party];
            this.partiesList[party].title = this.getPartyTitles(partyInfo);            
        }  
        this.UpdateForm7Info(this.styleOfProceedingsInfo)      
    }  

    public getPartyTitles(partyInfo: form7PartiesInfoType){
        let title = '';
        if (partyInfo.legalReps.length == 0 && partyInfo.aliases.length == 0){            
            title = partyInfo.lowerCourtRole + "</br>" + partyInfo.fullName;
        } else {

            const repTitle = [];
            for (const legalRep of partyInfo.legalReps){                
                const repFormat = this.lookups.legalRepFormatters[legalRep.type].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
                repTitle.push(repFormat);
            }
            
            const aliasTitle = [];
            for (const alias of partyInfo.aliases){                    
                aliasTitle.push(alias.type + ' ' + alias.name);
            }
           
            const repText = repTitle.length?repTitle.join('</br> or'): '';
            const aliasText = aliasTitle.length?aliasTitle.join('</br>'): '';            
            title = partyInfo.lowerCourtRole + "</br>" + (repText?(repText + "</br>"):'') + aliasText;
        }

        return title;
    }

    public getPartyDisplayName(partyInfo: form7PartiesInfoType){
        let title = '';
        if (partyInfo.legalReps.length == 0 && partyInfo.aliases.length == 0){            
            title = partyInfo.fullName;
        } else {

            const repTitle = [];
            for (const legalRep of partyInfo.legalReps){                
                const repFormat = this.lookups.legalRepFormatters[legalRep.type].replace('{0}', legalRep.name).replace('{1}', partyInfo.fullName);
                repTitle.push(repFormat);
            }
            
            const aliasTitle = [];
            for (const alias of partyInfo.aliases){                    
                aliasTitle.push(alias.type + ' ' + alias.name);
            }
           
            const repText = repTitle.length?repTitle.join('or '): '';
            const aliasText = aliasTitle.length?aliasTitle.join(', '): '';            
            title = (repText?(repText + ", "):'') + aliasText;
        }

        return title;
    }

    public showConfirmEditParty(row, app, left){

        this.rowInfo = row;
        this.moveApp = app;
        this.moveLeft = left;
        if (this.styleOfProceedingsInfo.manualSop?.length > 0){
            this.showConfirmEditParties = true;
        } else {
            this.confirmEditPartyAppealRoles();
        }
       
    }

    public cancelShowConfirmEditParties(){
        this.showConfirmEditParties = false;
    }

    public confirmEditPartyAppealRoles(){
        
        this.showConfirmEditParties = false;
        if (this.moveLeft){

            if (this.moveApp){
                this.appLeft(this.rowInfo);
            } else {
                this.resLeft(this.rowInfo)
            }

        } else {

            if (this.moveApp){
                this.appRight(this.rowInfo);
            } else {
                this.resRight(this.rowInfo)
            }

        }
        this.styleOfProceedingsInfo.manualSop = [];
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
    }    

    public appLeft(row){        
        this.partiesList[row.index].appealCourtRole = 'Appellant';
        this.styleOfProceedingsInfo.appellants.push(this.partiesList[row.index]);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.updateTable ++;
    }

    public appRight(row){
        this.partiesList[row.index].appealCourtRole = '';           
        const index = this.styleOfProceedingsInfo.appellants.findIndex(app => app.fullName == this.partiesList[row.index].fullName)
        this.styleOfProceedingsInfo.appellants.splice(index, 1);
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public resLeft(row){
        this.partiesList[row.index].appealCourtRole = '';
        const resNameIndex =  this.respondents.indexOf(this.partiesList[row.index].fullName);
        this.respondents.splice(resNameIndex, 1);
        if (this.partiesList[row.index].counselName) {            
            const solicitorNameIndex =  this.respondentSolicitors.indexOf(this.partiesList[row.index].counselName);
            this.respondentSolicitors.splice(solicitorNameIndex, 1);
        }
         
        const index = this.styleOfProceedingsInfo.respondents.findIndex(res => res.fullName == this.partiesList[row.index].fullName)
        this.styleOfProceedingsInfo.respondents.splice(index, 1);
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public resRight(row){
        this.partiesList[row.index].appealCourtRole = 'Respondent';
        this.respondents.push(this.partiesList[row.index].fullName);
        if (this.partiesList[row.index].counselName) {
            this.respondentSolicitors.push(this.partiesList[row.index].counselName);
        }        
        this.styleOfProceedingsInfo.respondents.push(this.partiesList[row.index]);
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.updateTable ++;
    }

    public addParties(){       
        this.party = {} as supremeCourtPartiesJsonInfoType;
        this.enableAddParty = false;
        this.isCreate = true;
        this.showPartyWindow = true;
        this.partyDataReady = false; 
        this.displayWarning = true;        
        this.party.aliases = [];
        this.party.legalReps = [];
        this.partyDataReady = true;
    }

    public saveNewParty(){

        if (this.checkPartyStates()){

            if (this.party.isOrganization){
                this.party.fullName = this.party.organizationName;
            } else {
                this.party.fullName = 
                this.party.surname + ', ' + 
                this.party.firstGivenName + 
                (this.party.secondGivenName? ' ' + this.party.secondGivenName:'') +
                (this.party.thirdGivenName? ' ' + this.party.thirdGivenName:'')
            }           

            this.party.title = this.getPartyTitles(this.party);        
            this.partiesList.push(this.party);       
            this.styleOfProceedingsInfo.parties = this.partiesList;
            this.UpdateForm7Info(this.styleOfProceedingsInfo);        
            this.showPartyWindow = false;
            this.updateTable ++;

        }        
    }

    public editParties(){
        this.party = {} as supremeCourtPartiesJsonInfoType;
        this.partyToEdit = {} as supremeCourtPartiesJsonInfoType;
        this.enableEditParty = false;
        this.isCreate = false;
        this.showPartyWindow = true;
        this.partyDataReady = false; 
        this.displayWarning = true;
    }

    public saveParty(){
        if (this.party.isOrganization){
            this.party.fullName = this.party.organizationName;
        } else {
            this.party.fullName = 
            this.party.surname + ', ' + 
            this.party.firstGivenName + 
            (this.party.secondGivenName? ' ' + this.party.secondGivenName:'') +
            (this.party.thirdGivenName? ' ' + this.party.thirdGivenName:'')
        }        

        this.party.title = this.getPartyTitles(this.party);
        
        if (this.party.appealCourtRole && this.party.appealCourtRole == 'Respondent') {
            this.party.appealCourtRole = ''
            const resIndex = this.styleOfProceedingsInfo.respondents.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
            if (resIndex != -1) {
                this.styleOfProceedingsInfo.respondents.splice(resIndex, 1);
            }

            const resNameIndex =  this.respondents.indexOf(this.party.fullName);
            if (resNameIndex != -1) {
                this.respondents.splice(resNameIndex, 1);
            }

            if (this.party.counselName) {            
                const solicitorNameIndex =  this.respondentSolicitors.indexOf(this.party.counselName);
                if (solicitorNameIndex != -1){
                    this.respondentSolicitors.splice(solicitorNameIndex, 1);
                }
            }
                  
        } else if (this.party.appealCourtRole && this.party.appealCourtRole == 'Appellant') {
            this.party.appealCourtRole = ''
            const appIndex = this.styleOfProceedingsInfo.appellants.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)
            if (appIndex != -1) {
                this.styleOfProceedingsInfo.appellants.splice(appIndex, 1);
            }                     
        } 
         
        const index = this.partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
        this.partiesList[index] = this.party;
        this.styleOfProceedingsInfo.parties = this.partiesList;
        this.styleOfProceedingsInfo.respondentSolicitors = this.respondentSolicitors;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.showPartyWindow = false;
        this.updateTable ++;
    }

    public checkPartyStates(){

        let stateCheck = true;
        if (this.party.isOrganization){

            this.form7PartiesStates.organizationName = !(this.party.organizationName)? false : null;           
            this.form7PartiesStates.lowerCourtRole = !(this.party.lowerCourtRole)? false : null;

        } else {
            this.form7PartiesStates.surname = !(this.party.surname)? false : null;
            this.form7PartiesStates.firstGivenName = !(this.party.firstGivenName)? false : null;
            this.form7PartiesStates.lowerCourtRole = !(this.party.lowerCourtRole)? false : null;
        }
        
        this.updatedPartyInfo ++;

        for(const field of Object.keys(this.form7PartiesStates)){
            if(this.form7PartiesStates[field]==false)
                stateCheck = false;
        }

        return stateCheck;            
    }

    public editStyleOfProceeding(){ 

        if (this.styleOfProceedingsInfo.respondents && 
            this.styleOfProceedingsInfo.respondents.length > 0 &&
            this.styleOfProceedingsInfo.appellants && 
            this.styleOfProceedingsInfo.appellants.length > 0 ){
                this.showConfirmEditStyleOfProceeding = true;
                this.editStyleOfProceedingsEnabled = true;
            } else {
                this.editStyleOfProceedingsEnabled = false;

            }        
    }

    public update(){        
        
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
    }

    public enableAdd(){
        this.displayWarning = false;
        this.enableAddParty = true;
    }

    public enableEdit(){
        this.displayWarning = false;
        this.enableEditParty = true;
        console.log(this.partyToEdit)
        this.party = this.partyToEdit;
        this.partyDataReady = true;
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
            this.party.aliases.push(newAlias)
            this.closeAliasForm();
        } else {           
            this.party.aliases[index].type = newAlias.type;
            this.party.aliases[index].name = newAlias.name;           
            this.closeAliasForm();
        }
        this.updated ++;
        
    }

    public removeAlias(data){        
        this.party.aliases.splice(data.index,1);
        this.updated ++;        
    }

    public modifyRepresentativeList(isCreateRep: boolean, newRepresentative: representativeInfoType, index: number){       

        if (isCreateRep){           
            this.party.legalReps.push(newRepresentative)
            this.closeRepresentativeForm();
        } else {           
            this.party.legalReps[index].type = newRepresentative.type;
            this.party.legalReps[index].name = newRepresentative.name;           
            this.closeRepresentativeForm();
        }
        this.updated ++;        
    }

    public removeRepresentative(data){
        this.party.legalReps.splice(data.index,1);
        this.updated ++;
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

    public confirmDeleteParty(){        
        this.showConfirmDeleteParty = true;
    }
    
    public cancelPartyDeletion() {
        this.showConfirmDeleteParty = false;
    }

    public deleteParty(){
        
        this.showConfirmDeleteParty = false;
        const index = this.partiesList.findIndex(originalParty => originalParty.ceisPartyId == this.party.ceisPartyId)                         
        this.partiesList.splice(index, 1);       
        this.styleOfProceedingsInfo.parties = this.partiesList;
        this.UpdateForm7Info(this.styleOfProceedingsInfo);        
        this.showPartyWindow = false;
        this.updateTable ++;
    }

    public confirmEditStyleOfProceedings(){ 

        this.styleOfProceedingDataReady = false;
        this.showEditStyleOfProceedingWindow = true;       
        this.showConfirmEditStyleOfProceeding = false;    
        
        this.noRolePartyManualSop = [];

        this.loadSopInfo(this.styleOfProceedingsInfo.appellants);
        this.loadSopInfo(this.styleOfProceedingsInfo.respondents); 

        this.styleOfProceedingsInfo.manualSop = this.styleOfProceedingsInfo.manualSop.concat(this.noRolePartyManualSop)        

        this.UpdateForm7Info(this.styleOfProceedingsInfo)
        
        this.styleOfProceedingDataReady = true;

    }

    public loadSopInfo(partiesInfo: form7PartiesInfoType[]){        

        if (this.styleOfProceedingsInfo.manualSop && this.styleOfProceedingsInfo.manualSop.length > 0){

            for (const party of partiesInfo){

                const currentSop = this.styleOfProceedingsInfo.manualSop;
                const identicalIndex = currentSop.findIndex(sop => sop.partyName.includes(this.getPartyDisplayName(party)));

                if (identicalIndex != -1){
                    if (currentSop[identicalIndex].lowerCourtRole == party.lowerCourtRole && currentSop[identicalIndex].appealRole == party.appealCourtRole){
                        continue;
                    } else {
                        const nameIndex = currentSop[identicalIndex].partyName.findIndex(name => name == this.getPartyDisplayName(party))
                        this.styleOfProceedingsInfo.manualSop[identicalIndex].partyName.splice(nameIndex, 1);
                        this.prePopulateSop(party);
                    }
                } else {
                    const index = currentSop.findIndex(sop => sop.lowerCourtRole == party.lowerCourtRole && sop.appealRole == party.appealCourtRole);
                    if (index != -1){
                        this.styleOfProceedingsInfo.manualSop[index].partyName.push(this.getPartyDisplayName(party));
                        this.styleOfProceedingsInfo.manualSop[index].plural = true;
                    } else {                        
                        this.prePopulateSop(party);
                    }
                }
            }

        } else {

            this.styleOfProceedingsInfo.manualSop = [];
            for (const party of partiesInfo){
                this.prePopulateSop(party);
            }

        }       

    }

    public prePopulateSop(partyInfo: form7PartiesInfoType){

        let sop = {} as manualSopInfoType;            
        sop.plural = false;
        sop.appealRole = partyInfo.appealCourtRole;
        sop.lowerCourtRole = partyInfo.lowerCourtRole;
        sop.partyName = [];
        sop.partyName.push(this.getPartyDisplayName(partyInfo))
        if (partyInfo.lowerCourtRole == 'NONE (New Party)'){
            sop.conjunction = 'And';
            this.noRolePartyManualSop.push(sop);
        } else if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
                sop.conjunction = 'Between';
                this.styleOfProceedingsInfo.manualSop.unshift(sop);
        } else {
            sop.conjunction = 'And';
            this.styleOfProceedingsInfo.manualSop.push(sop);
        }

    }
    
    public cancelEditStyleOfProceedings() {
        this.showConfirmEditStyleOfProceeding = false;        
    }

    public saveNewStyleOfProceeding(){
        console.log('save new SOP')
        this.UpdateForm7Info(this.styleOfProceedingsInfo);
        this.showEditStyleOfProceedingWindow = false;
    }

    public resetStyleOfProceeding(){
        console.log('reset SOP')
        this.showEditStyleOfProceedingWindow = false;
        this.styleOfProceedingsInfo.manualSop = [];
    }

}
</script>

<style scoped lang="scss">

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }

</style>