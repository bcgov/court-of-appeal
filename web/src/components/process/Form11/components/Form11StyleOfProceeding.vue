<template>
    <b-card v-if="dataReady" class="ml-4 border-white" :key="updated">              

<!-- <PARTIES> -->
        <b-card class="mb-4 bg-white border-white text-dark"> 

<!-- <Appellants> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.appellantsInfo !=null?'border border-danger is-invalid':''">
                    <b-form-group
                        class="labels"                
                        label="Appellants:">
                        <p class="content text-primary">
                            To prepare your order, you must enter the full names of 
                            all the appellant(s) as it appears on the reasons for 
                            judgment or notice of appeal.  In addition, if counsel 
                            appeared at the application, enter the name of counsel 
                            by clicking on <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/> 
                            and type the name in the counsel’s name field.
                        </p>  
                        <span 
                            v-if="form11Info.appellants.length == 0 && !AddNewAppellantForm"                             
                            class="text-muted ml-2 my-2">No appellants have been assigned.
                        </span>
                        <b-table
                            v-else-if="form11Info.appellants.length > 0"                                                                
                            style="font-size: 16px;"
                            class="mt-2"
                            :items="form11Info.appellants"
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
                                        @click="removeAppellant(data)">
                                        <b-icon 
                                            icon="trash-fill" 
                                            font-scale="1.25" 
                                            variant="danger"/>
                                    </b-button>
                                    <b-button 
                                        size="sm" 
                                        variant="transparent" 
                                        @click="editAppellant(data)">
                                        <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                    </b-button>
                                </div>
                            </template>

                        </b-table> 
                    </b-form-group>
                </b-col>  
                <b-col cols="2">           
                    <b-button                            
                        style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                        v-if="!AddNewAppellantForm" 
                        size="sm" 
                        variant="court" 
                        @click="addNewAppellant"><b-icon icon="plus"/>Add Appellant</b-button>
                </b-col>
            </b-row>

<!-- <Respondents> -->
            <b-row class="mb-2 mx-n4">   
                <b-col cols="10" :class="state.respondentsInfo !=null?'border border-danger is-invalid':''">
                    <b-form-group
                        class="labels"                
                        label="Respondents:">
                        <p class="content text-primary">
                            To prepare your order, you must enter the full names of 
                            all the respondent(s) as it appears on the reasons for 
                            judgment or notice of appeal.  In addition, if counsel 
                            appeared at the application, enter the name of counsel 
                            by clicking on <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/> 
                            and type the name in the counsel’s name field.
                        </p> 
                        <span 
                            v-if="form11Info.respondents.length == 0 && !AddNewRespondentForm"
                            class="text-muted ml-2 my-2">No respondents have been assigned.
                        </span>
                        <b-table
                            v-else-if="form11Info.respondents.length > 0"                        
                            class="mt-2"
                            style="font-size: 16px;"
                            :items="form11Info.respondents"
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
                                        @click="removeRespondent(data)">
                                        <b-icon 
                                            icon="trash-fill" 
                                            font-scale="1.25" 
                                            variant="danger"/>
                                    </b-button>
                                    <b-button 
                                        size="sm" 
                                        variant="transparent" 
                                        @click="editRespondent(data)">
                                        <b-icon icon="pencil-square" font-scale="1.25" variant="primary"/>
                                    </b-button>
                                </div>
                            </template>

                        </b-table> 
                    </b-form-group>
                </b-col>  
                <b-col cols="2">           
                    <b-button 
                        style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%;"
                        v-if="!AddNewRespondentForm" 
                        size="sm" 
                        variant="court" 
                        @click="addNewRespondent"><b-icon icon="plus"/>Add Respondent</b-button>
                </b-col>
            </b-row>

        </b-card>
        <!-- {{partyNames}} -->
        
        <div v-if="this.form11Info.appellants && this.form11Info.appellants.length>0 && this.form11Info.respondents && this.form11Info.respondents.length>0">
            
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; margin:0 0 0 1rem;font-weight:600;">Style of Proceeding (Parties) in Case</p>

    <!-- <BETWEEN> -->
                <b-row class="mt-4 ml-1" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{form11Info.appellantNames}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
    <!-- <AND> -->
                <b-row class="mt-3 ml-1" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{form11Info.respondentNames}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>
            </b-card>
               
<!-- <JudgeNames> -->
            <b-card class="mt-3 mb-4 bg-white border-white text-dark"> 
                <b-card no-body class="border-white">
                    <b-row class="mb-2"  style="margin:0 -1rem !important;">   
                        <b-col cols="10" :class="state.judgeNames !=null?'border border-danger is-invalid':''">
                            <b-form-group
                                class="labels"                
                                label="Provide the names of the justices who heard the application:">
                                <p class="content text-primary">
                                    <b>Note:</b> Justices’ names must be set out in the same order 
                                    as the reasons for Judgment.
                                </p>                                 
                                <div 
                                    v-if="form11Info.judgeNames && form11Info.judgeNames.length == 0 && !AddNewJudgeNamesForm"                                      
                                    class="text-muted mt-3">No judges have been listed.
                                </div>
                                <b-table
                                    v-else-if="form11Info.judgeNames && form11Info.judgeNames.length > 0"
                                    class="mt-2"
                                    :items="form11Info.judgeNames"
                                    :fields="judgeFields"
                                    head-row-variant="primary"
                                    borderless    
                                    small                                            
                                    responsive="sm">
                                    
                                    <template v-slot:cell(edit)="data" >   
                                        <div style="float: right;">                                                                     
                                            <b-button 
                                                class="mr-2" 
                                                size="sm" 
                                                variant="transparent" 
                                                @click="removeJudgeNames(data.item)">
                                                <b-icon 
                                                    icon="trash-fill" 
                                                    font-scale="1.25" 
                                                    variant="danger"/>
                                            </b-button>
                                            <b-button 
                                                size="sm" 
                                                variant="transparent" 
                                                @click="editJudgeNames(data)">
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
                                            :border-variant="addJudgeNamesFormColor" 
                                            style="border:2px solid;">
                                            <add-judge-form 
                                                :formData="data.item" 
                                                :index="data.index" 
                                                :isCreateJudge="false" 
                                                v-on:submit="modifyJudgeNames" 
                                                v-on:cancel="closeJudgeNamesForm" />
                                        </b-card>
                                    </template>
                                </b-table> 
                            </b-form-group>
                        </b-col>  
                        <b-col>           
                            <b-button 
                                style="margin-top: 4rem; height: 2.25rem; font-size: 0.75rem; width: 100%; float: right;"
                                v-if="!AddNewJudgeNamesForm" 
                                size="sm" 
                                variant="court" 
                                @click="addNewJudgeNames">
                                <b-icon icon="plus"/>Add Judge Names</b-button>
                        </b-col>
                    </b-row>
                </b-card>           

                <b-card 
                    v-if="AddNewJudgeNamesForm" 
                    id="addJudgeForm" 
                    class="my-1 ml-4" 
                    :border-variant="addJudgeNamesFormColor" 
                    style="border:2px solid;" 
                    body-class="px-1 py-1">
                    <add-judge-form 
                        :formData="{name:'', other:''}" 
                        :index="-1" 
                        :isCreateJudge="true" 
                        v-on:submit="modifyJudgeNames" 
                        v-on:cancel="closeJudgeNamesForm" />                
                </b-card>
            </b-card>
<!-- HEARING DATE -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    When was the hearing held?                    
                </b-col>
                <b-col>                   
                    <b-card
                        :class="state.hearingDate == false?'border border-danger is-invalid': 'muted'"                                                
                        style="margin:0 1px; padding:0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.hearingDate"
                                    @change="recheckStates()"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>
<!-- <HEARING LOCATION> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Where was the hearing held?                                
                </b-col>
                <b-col class="ml-0 mt-2">  
                    <b-form-select                
                        style="width:100%"
                        :state="state.hearingLocation"              
                        v-model="hearingLocation" 
                        @change="updateHearingLocation"                   
                        :options="hearingLocationList">
                    </b-form-select>
                    <b-row v-if="hearingLocation == 'Other'" class="m-0 p-0">
                        <div style="width:39%;" class="mt-3 ml-1">Please specify:</div>
                        <div style="width:60%;">
                            <b-form-select
                                :state="state.hearingLocationOther"
                                class="mt-2"
                                @change="updateHearingLocation"
                                :options="otherHearingLocationList"                                    
                                v-model="otherHearingLocation">
                            </b-form-select>
                        </div>
                    </b-row>
                    <span
                        v-if="(state.hearingLocation != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify Hearing Location.
                    </span>                        
                </b-col>
            </b-row>
<!-- Date of Judgment -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What was the date of the judgment? 
                    <div class="content text-primary">
                        Date reserve judgment was release or, if judgment not reserved, the date when the judgment was given in court
                    </div>
                </b-col>
                <b-col>                   
                    <b-card
                        :class="state.dateOfJudgement == false?'border border-danger is-invalid': 'muted'"                                                
                        style="margin:0 1px; padding:0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.dateOfJudgement"                           
                                    color="warning"
                                    @change="recheckStates()"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>

<!-- <Judgment Reserved> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Was judgment reserved?
                </b-col>
                <b-col class="ml-1">   
                    <b-form-radio-group                                                           
                        :class="state.judgmentReserved==false?'border border-danger is-invalid w-50':''" 
                        @change="recheckStates()"                                     
                        v-model="form11Info.judgmentReserved"
                        :options="yesNoOptions">                        
                    </b-form-radio-group> 
                </b-col>
            </b-row>
  
<!-- <Hearing Held Date> -->
            <b-row class="mt-4 question" v-if="form11Info.judgmentReserved">
                <b-col cols="7" class="labels">
                    When was the hearing held?
                </b-col>
                <b-col>                   
                    <b-card                        
                        :class="state.hearingHeldDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'" 
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.judgmentReservedDate"
                                    @change="recheckStates()"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>

            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    Do any of the following apply?
                </b-col>
                <b-col>                     
                </b-col>
            </b-row>

<!-- <Later Date> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    <ul style="list-style-type: square">
                        <li>
                            The Court has made a decision and indicated that reasons on this decision will be provided at a later date
                        </li>
                    </ul>
                </b-col>
                <b-col> 
                    <b-form-radio-group                                                           
                        :class="state.laterDateDecided==false?'border border-danger is-invalid w-50':''"
                        @change="recheckStates()"                                      
                        v-model="form11Info.laterDateDecided">
                        <b-form-radio :value="true"> Yes </b-form-radio>
                        <b-form-radio :value="false"> No </b-form-radio>
                    </b-form-radio-group>
                </b-col>
            </b-row>
            <b-row class="mt-n1 question" v-if="form11Info.laterDateDecided">
                <b-col cols="7" class="labels" style="font-size:12pt;">
                    <ul>
                        Please indicate the date when the reasons will be provided / released
                    </ul>
                </b-col>
                <b-col class="mb-4"> 
                    <b-card                        
                        :class="state.laterDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'" 
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.laterDate"
                                    @change="recheckStates()"                           
                                    color="warning"                                                                             
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>  
                </b-col>
            </b-row>

<!-- <Supplementary Reasons> -->
            <b-row class="mt-2 question">
                <b-col cols="7" class="labels">
                    <ul style="list-style-type: square">
                        <li>
                            The Court will be providing supplementary reasons
                        </li>
                    </ul>
                </b-col>
                <b-col> 
                    <b-form-radio-group                                                           
                        :class="state.supplementaryReasons==false?'border border-danger is-invalid w-50':''"                                      
                        v-model="form11Info.supplementaryReasons"
                        @change="recheckStates()"
                        :options="yesNoOptions">                        
                    </b-form-radio-group>
                </b-col>
            </b-row>
            <b-row class="mt-n1 question" v-if="form11Info.supplementaryReasons">
                <b-col cols="7" class="labels" style="font-size:12pt;">
                    <ul>
                        Please indicate the date when the reasons will be provided / released
                    </ul>
                </b-col>
                <b-col> 
                    <b-card                        
                        :class="state.supplementaryReasonsDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'" 
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.supplementaryReasonsDate"
                                    @change="recheckStates()"                           
                                    color="warning"                                                                             
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>  
                </b-col>
            </b-row>
              
<!-- <Who Made Order-VaryOrderJudgeName> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the order that was being appealed? 
                    <div class="content text-primary">
                        Name of judge and court/tribunal appealed from
                    </div>                               
                </b-col>
                <b-col class="ml-1">   
                    <b-form-input 
                        :state="state.varyingOrderJudgeName"
                        @change="recheckStates()"               
                        style="width:100%"                                    
                        v-model="form11Info.varyingOrderJudgeName">                            
                    </b-form-input>
                    <!-- <b-row v-if="form11Info.varyingOrderJudgeName == 'Other'" class="m-0 p-0">
                        <div style="width:25%;" class="mt-3 ml-1">Other Name:</div>
                        <div style="width:74%;">
                            <b-form-input 
                                style="margin-top:0.5rem;"                                
                                :state="state.varyingOrderJudgeNameOther"
                                v-model="form11Info.varyingOrderJudgeNameOther" 
                            />
                        </div>
                    </b-row> 
                    <span
                        v-if="(state.varyingOrderJudgeName != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify who made the order that you were seeking to vary.
                    </span> -->
                </b-col>
            </b-row>
<!-- <Vary Order Location> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Location of court/tribunal   
                </b-col>
                <b-col class="ml-1">   
                    <b-form-input
                        @change="recheckStates()"                                                             
                        v-model="form11Info.varyingOrderLocation"                                                        
                        :state="state.varyingOrderLocation"                           
                    />
                </b-col>
            </b-row>               
<!-- <Vary Order Date> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Date of order appealed from?                    
                </b-col>
                <b-col>                   
                    <b-card                        
                        :class="state.varyingOrderDate == false?'border border-danger is-invalid mt-2': 'muted mt-2'" 
                        style="padding: 0; float: center;">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    v-model="form11Info.varyingOrderDate"                           
                                    color="warning"
                                    @change="recheckStates()"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>                    
                </b-col>
            </b-row>

<!-- <FilingParties-Made Application> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the application to vary the order of a justice?                                
                </b-col>
                <b-col class="ml-1">   
                    <b-form-checkbox-group 
                        stacked
                        @change="recheckStates(true)"
                        :state="state.filingParties"                                      
                        v-model="form11Info.filingParties">
                        <b-form-checkbox
                            :value="applyingparty"
                            v-for="applyingparty,inx in partyNames"
                            :key="'appling-party-'+inx">
                                {{applyingparty.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group> 
                </b-col>
            </b-row> 
            <!-- {{form11Info.filingParties}} -->
        
<!-- <Appearing Partie -Attended Hearing> -->
            <b-row class="mt-4 question">
                <b-col class="labels">
                    Enter the names of the parties and/or counsel who attended at the hearing:  
                    <p class="content text-primary">
                        Please select the names of the parties and/or counsel 
                        who attended at the hearing.  If the name of counsel 
                        is not appearing, please ensure that you enter 
                        counsel’s name at the top of the page.
                    </p>                                
                </b-col>
            </b-row>
            <b-row class="mx-3">
                <b-col class="mx-1 p-2 bg-light border-light rounded">   
                    <b-form-checkbox-group 
                        stacked                                               
                        style="width:100%"
                        @change="updated++;recheckStates(true);"                       
                        :state="state.appearingParties"                                      
                        v-model="form11Info.appearingParties">

                        <div v-for="party,inx in partyNames" :key="'appling-party-'+inx">
                            <b-row>
                                <b-col>
                                    <b-form-checkbox :value="party">
                                        {{party.name}}
                                    </b-form-checkbox>
                                </b-col>
                                <b-col>
                                    <b-form-checkbox v-if="party.counselName" :value="getCounselParty(party)">
                                        {{party.counselName}}, counsel for {{party.name}}
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>                        
                        </div>

                    </b-form-checkbox-group> 
                </b-col>
            </b-row>
            <!-- {{form11Info.appearingParties}} --> 

<!-- <Order Allowed> -->
            <b-row class="mt-4 question" v-if="form11Info.varyingOrderJudgeName">
                <!-- <b-col cols="7" class="labels" v-if="form11Info.varyingOrderJudgeName=='Other'">
                    Was the order to vary the order of {{form11Info.varyingOrderJudgeNameOther}} :
                </b-col> -->
                <b-col cols="7" class="labels">
                    Was the order to vary the order of {{form11Info.varyingOrderJudgeName}} :
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group
                        :class="state.orderAllowed==false?'border border-danger is-invalid':''"
                        @change="recheckStates()"                                         
                        v-model="form11Info.orderAllowed"
                        :options="allowedOptions"                
                    ></b-form-radio-group>
                    <span
                        v-if="(state.orderAllowed != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether the order was allowed or dismissed.
                    </span>
                </b-col>
            </b-row>

<!-- <Orders Court Made> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What orders did the court make?
                    <div class="content text-primary font-italic">
                        Enter the orders that the court made as numbered paragraphs.
                    </div>
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-textarea
                        style="width:100%" 
                        max-rows="6"
                        @change="recheckStates()"  
                        :state="state.ordersCourtMade"
                        v-model="form11Info.ordersCourtMade"               
                    ></b-form-textarea>
                    <span
                        v-if="(state.ordersCourtMade != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify the Court’s Orders.
                    </span>
                </b-col>
            </b-row>

<!-- <Other Order> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Did the court make any additional orders?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-radio-group 
                        :class="state.otherOrders==false?'border border-danger is-invalid w-50':''"
                        @change="recheckStates()"                                             
                        v-model="form11Info.otherOrders"
                        :options="yesNoOptions"                
                    ></b-form-radio-group>
                    <span
                        v-if="(state.otherOrders != null)" 
                        style="font-size: 0.75rem;" 
                        class="bg-white text-danger"><b-icon-exclamation-circle/>
                        Specify whether the Justices’ made any other orders.
                    </span>
                </b-col>
            </b-row>
<!-- <Other Order Details> -->
            <b-row v-if="form11Info.otherOrders" class="mt-4 question">
                <b-col cols="7" class="labels">
                    Enter the other orders that the Justices' made:                                                            
                </b-col>
                <b-col>                    
                    <b-form-textarea                
                        style="width:100%"
                        @change="recheckStates()" 
                        max-rows="6"  
                        :state="state.furtherOrders"                                                          
                        v-model="form11Info.furtherOrders">
                    </b-form-textarea>                    
                </b-col>                
            </b-row> 

<!-- <Order Awarding Costs> -->
            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Did the court make an order awarding costs?
                </b-col>
                <b-col class="ml-1">   
                    <b-form-radio-group
                        @change="form11Info.unsuccessfulParties=[];updateNonSuccessfulParties();recheckStates();"                                                           
                        :class="state.orderedAwardingCosts==false?'border border-danger is-invalid w-50':''"                                      
                        v-model="form11Info.orderedAwardingCosts"
                        :options="yesNoOptions">                        
                    </b-form-radio-group> 
                </b-col>
            </b-row>  

            <b-row class="mt-4 question" v-if="form11Info.orderedAwardingCosts">
                <b-col cols="7" class="labels">
                    Who was the successful party?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group  
                        stacked
                        :state="state.successfulParties"
                        @change="form11Info.unsuccessfulParties=[];updateNonSuccessfulParties();recheckStates();"                   
                        v-model="form11Info.successfulParties">
                        <b-form-checkbox
                            :value="successparty"
                            v-for="successparty,inx in partyNames"
                            :key="'success-party-'+inx">
                                {{successparty.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidSuccessfulParties">You cannot select all parties.</b-row>                    
                </b-col>
            </b-row>

            <b-row class="mt-4 question" v-if="form11Info.orderedAwardingCosts">
                <b-col cols="7" class="labels">
                    Who was ordered to pay costs?
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group 
                        stacked
                        @change="recheckStates()"                        
                        :state="state.unsuccessfulParties"                   
                        v-model="form11Info.unsuccessfulParties">
                        <b-form-checkbox
                            :value="unsuccessparty"
                            v-for="unsuccessparty,inx in nonSuccessfulPartyNames"
                            :key="'unsuccess-party-'+inx">
                                {{unsuccessparty.name}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-col>
            </b-row> 


        </div>          


        <hr class="mt-5"/>    

        <b-row >
            <b-col cols="10">
                <b-button 
                    style="float: left;" 
                    variant="success"
                    @click="saveForm(true)"
                    >Save as Draft
                </b-button>
            </b-col>
            <b-col cols="2">
                <b-button
                    style="float: right;" 
                    variant="success"
                    @click="saveForm(false)"
                    >Continue
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
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

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");


import { form11DataInfoType, form11PartiesInfoType } from '@/types/Information/Form11';
import { partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';

import AddPartyForm from './AddPartyForm.vue';
import AddJudgeForm from './AddJudgeForm.vue';
import AddPartyModal from './AddPartyModal.vue';
import { hearingLocationsInfoType } from '@/types/Common';
import {justiceNames} from './JusticeName'

@Component({
    components:{        
        AddJudgeForm,
        AddPartyForm,
        AddPartyModal        
    }
})
export default class Form11StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @commonState.State
    public hearingLocationsInfo!: hearingLocationsInfoType[];

    @form11State.State
    public currentOrder: previousCourtJsonInfoType;

    @form11State.State
    public form11Info: form11DataInfoType;

    @form11State.Action
    public UpdateForm11Info!: (newForm11Info: form11DataInfoType) => void  
    
    @form11State.State
    public currentOrderMultipleJusticesId: string;

    @form11State.Action
    public UpdateCurrentOrderMultipleJusticesId!: (newCurrentOrderMultipleJusticesId: string) => void
    
    dataReady = false;
    updated=0; 
    updateOrderDetails = 0;
    orderDateValue = '';
  
    addRespondentFormColor = 'court';
    AddNewRespondentForm = false;

    addAppellantFormColor = 'court';
    AddNewAppellantForm = false;

    partyNames: form11PartiesInfoType[] = [];

    addJudgeNamesFormColor = 'court';
    AddNewJudgeNamesForm = false;
    latestEditJudgeNamesData;
    isEditJudgeNamesOpen = false;

    hearingLocationList: string[] = [];
    otherHearingLocationList: string[] = [];
    hearingLocation = "";
    otherHearingLocation = "";

    partyToEdit = {} as form11PartiesInfoType;
    showPartyWindow = false
    isCreate = true
    partyType = ''
    
    invalidSuccessfulParties=false
    nonSuccessfulPartyNames: form11PartiesInfoType[]= []

    allowedOptions = [
        {text: 'Allowed', value: true},
        {text: 'Dismissed', value: false}
    ];

    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ]; 

    partyFields = [
        { key:'organization', label:'Party Type', thClass: 'text-white bg-court', thStyle: '', sortable:false }, 
        { key:'name', label:'Party Name', thClass: 'text-white bg-court', thStyle: '',  sortable:false  },
        { key:'counselName', label:'Counsel Name', thClass: 'text-white bg-court', thStyle: '',  sortable:false  },
        { key:'edit', label:'', thClass: 'text-white bg-court', sortable:false }        
    ]

    judgeFields = [
        { key:'name', label:'Name', thClass:'text-white bg-court', thStyle: 'font-size: 1rem;', sortable:false },
        { key:'other',label:'', thClass:'text-white bg-court', thStyle: 'font-size: 1rem;', sortable:false},         
        { key:'edit', label:'', thClass: 'text-white bg-court', sortable:false}
    ]

    state = { 
        appellantsInfo: null,
        respondentsInfo: null,
        judgeNames: null,        
        hearingLocation: null,
        hearingLocationOther: null,     
        dateOfJudgement: null, 
        varyingOrderJudgeName: null,
        // varyingOrderJudgeNameOther: null,
        varyingOrderDate: null,
        filingParties: null,
        appearingParties: null,
        orderAllowed: null,
        otherOrders: null,
        furtherOrders: null,
        varyingOrderLocation: null,
        judgmentReserved: null,
        hearingHeldDate: null,
        laterDateDecided: null,
        laterDate: null,
        supplementaryReasons: null,
        hearingDate: null,
        ordersCourtMade: null,
        orderedAwardingCosts: null,
        supplementaryReasonsDate: null,
        successfulParties: null,
        unsuccessfulParties: null,
    }

    justiceNameOptions = [];
    created(){
        this.justiceNameOptions = justiceNames
    }

    mounted() {
        this.dataReady = false;        
        this.extractInfo();              
    }
    
    public extractInfo(){
        
        this.extractHearingLocations()

        if(this.currentOrderMultipleJusticesId){
            this.getForm11Data();
           
        } else { 

            const form11Data = this.form11Info;            
            form11Data.version = this.$store.state.Application.version;
            form11Data.judgeNames = [];
            form11Data.appellants = this.partiesJson.appellants
            form11Data.respondents = this.partiesJson.respondents
            form11Data.formSevenNumber = this.fileNumber; 
            form11Data.appearingParties = [];
            form11Data.filingParties = []; 
            form11Data.successfulParties = [];
            form11Data.unsuccessfulParties = [];          
            form11Data.previousCourts = this.currentOrder;
            this.UpdateForm11Info(form11Data);
            this.initHearingLocation()
            this.revaluateForm11Data()
            this.extractJudgeNames()
            this.updateNonSuccessfulParties()
            this.saveForm(true);
        }          
    }

    public extractJudgeNames(){
        const currentOrder = this.form11Info.previousCourts
        const judgeName = currentOrder && currentOrder.JudgeLastName? (
            (currentOrder.JudgeSalutation? currentOrder.JudgeSalutation+' ':'Justice ')+
            (currentOrder.JudgeLastName)
        ).trim() : ''

        if(judgeName){
            // const justiceIndex = justiceNames.findIndex(name=> name.toLowerCase().includes(judgeName.toLowerCase()))
            // if(justiceIndex>-1){
            //     this.form11Info.varyingOrderJudgeName=justiceNames[justiceIndex]
            //     this.form11Info.varyingOrderJudgeNameOther=''                
            // }
            // else{
            //     this.form11Info.varyingOrderJudgeName='Other'
            //     this.form11Info.varyingOrderJudgeNameOther=judgeName
            // }
            this.form11Info.varyingOrderJudgeName=judgeName;
            this.form11Info.varyingOrderDate= currentOrder.JudgmentDate.slice(0,10)            
            this.form11Info.varyingOrderLocation = currentOrder.Location? currentOrder.Location: ''
        }
        else{
            this.form11Info.varyingOrderJudgeName='';
            //this.form11Info.varyingOrderJudgeNameOther='';
            this.form11Info.varyingOrderDate='';
            this.form11Info.varyingOrderLocation ='';
        }
        this.UpdateForm11Info(this.form11Info);
    } 

    public extractHearingLocations(){
        this.hearingLocationList = [];
        
        for (const hearingLocation of this.hearingLocationsInfo){
            if (hearingLocation.other)
                this.otherHearingLocationList.push(hearingLocation.name);
            else 
                this.hearingLocationList.push(hearingLocation.name);                
        }
        this.hearingLocationList.push('Other');
    }
    
    public initHearingLocation(){
        this.hearingLocation = this.form11Info.hearingLocation?.name
        if(this.otherHearingLocationList.includes(this.hearingLocation)){
            this.hearingLocation ='Other'
            this.otherHearingLocation = this.form11Info.hearingLocation.name
        }
    }

    public updateHearingLocation(){ 
              
        const form11 = this.form11Info;       
        form11.hearingLocation = {} as hearingLocationsInfoType;
       
        if (this.hearingLocation == 'Other' && this.otherHearingLocation.length > 0){
            form11.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.otherHearingLocation)[0]
        } else if (this.hearingLocation != 'Other') {
            form11.hearingLocation = this.hearingLocationsInfo.filter(location => location.name == this.hearingLocation)[0]
        }  
        
        this.UpdateForm11Info(form11);
        this.recheckStates()
    }

    public revaluateForm11Data(){

        const form11Data = this.form11Info;

        for (const respondent of form11Data.respondents){
            if (respondent.firstName && respondent.lastName){                    
                respondent.isOrganization = false;
            } else if (respondent.organization){
                respondent.isOrganization = true;
            }
            if(respondent.solicitor?.counselFirstName && respondent.solicitor?.counselLastName)
                respondent.counselName = respondent.solicitor.counselFirstName+' '+respondent.solicitor.counselLastName                          
            respondent.responding = true;
        }

        for (const applicant of form11Data.appellants){
            if (applicant.firstName && applicant.lastName){
                applicant.isOrganization = false;
            } else if (applicant.organization){
                applicant.isOrganization = true;
            }
            if(applicant.solicitor?.counselFirstName && applicant.solicitor?.counselLastName)
                applicant.counselName = applicant.solicitor.counselFirstName+' '+applicant.solicitor.counselLastName             
            applicant.responding = false;
        }

        const appellants = form11Data.appellants.map(resp=>resp.name)
        const respondents = form11Data.respondents.map(resp=>resp.name)
        form11Data.appellantNames = appellants.join(', ');
        form11Data.respondentNames = respondents.join(', ');

        this.partyNames = [...form11Data.appellants, ...form11Data.respondents]
        this.UpdateForm11Info(form11Data);
    }

    public getForm11Data() {        
       
        this.$http.get('/form11/forms/'+this.currentOrderMultipleJusticesId)
        .then((response) => {
            if(response?.data?.data){
                const form11Data = response.data.data
                this.UpdateForm11Info(form11Data);
                this.revaluateForm11Data()
                this.initHearingLocation()
                this.clearStates();
                this.updateNonSuccessfulParties()               
            }                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            appellantsInfo: null,
            respondentsInfo: null,
            judgeNames: null,        
            hearingLocation: null,
            hearingLocationOther: null,     
            dateOfJudgement: null,
            varyingOrderJudgeName: null,
            //varyingOrderJudgeNameOther: null,
            varyingOrderLocation: null,
            varyingOrderDate: null,
            filingParties: null,
            appearingParties: null,
            orderAllowed: null,
            otherOrders: null,
            furtherOrders: null,            
            judgmentReserved: null,
            hearingHeldDate: null,
            laterDateDecided: null,
            laterDate: null,
            supplementaryReasons: null,
            supplementaryReasonsDate: null,
            hearingDate: null,
            ordersCourtMade: null,
            orderedAwardingCosts: null,
            successfulParties: null,
            unsuccessfulParties: null
        }
        this.dataReady = true; 
    }

    public recheckStates(dontFindInvalidFields?){
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                this.checkStates(dontFindInvalidFields)
                return 
            }
        }
    }

    public checkStates(dontFindInvalidFields?){  
        
        this.state.appellantsInfo = this.form11Info.appellants?.length>0? null :false;
        this.state.respondentsInfo = this.form11Info.respondents?.length>0? null :false;            
        this.state.judgeNames = this.form11Info.judgeNames?.length>0? null :false;
        
        this.state.hearingLocation =  this.hearingLocation? null :false
        this.state.hearingLocationOther =  this.hearingLocation=='Other' && !this.otherHearingLocation? false :null
        
        this.state.dateOfJudgement = this.form11Info.dateOfJudgement? null: false;
        this.state.varyingOrderJudgeName = this.form11Info.varyingOrderJudgeName? null :false;
        //this.state.varyingOrderJudgeNameOther = this.form11Info.varyingOrderJudgeName=='Other' && !this.form11Info.varyingOrderJudgeNameOther? false: null;
        this.state.varyingOrderLocation = this.form11Info.varyingOrderLocation? null :false;
        this.state.varyingOrderDate = this.form11Info.varyingOrderDate? null :false;
        this.state.filingParties = this.form11Info.filingParties?.length>0? null :false;
        this.state.appearingParties = this.form11Info.appearingParties?.length>0? null :false;
        this.state.orderAllowed = this.form11Info.orderAllowed == true || this.form11Info.orderAllowed ==false? null :false;
        this.state.otherOrders = this.form11Info.otherOrders == true || this.form11Info.otherOrders ==false? null :false;
        this.state.furtherOrders = this.form11Info.otherOrders == true && !this.form11Info.furtherOrders? false :null

        this.state.judgmentReserved = this.form11Info.judgmentReserved == true || this.form11Info.judgmentReserved ==false? null :false;
        this.state.hearingHeldDate = this.form11Info.judgmentReserved && !this.form11Info.judgmentReservedDate? false :null
        this.state.laterDateDecided = this.form11Info.laterDateDecided == true || this.form11Info.laterDateDecided ==false? null :false;
        this.state.laterDate = this.form11Info.laterDateDecided && !this.form11Info.laterDate? false :null
        this.state.supplementaryReasons = this.form11Info.supplementaryReasons == true || this.form11Info.supplementaryReasons ==false? null :false;
        this.state.supplementaryReasonsDate = this.form11Info.supplementaryReasons && !this.form11Info.supplementaryReasonsDate? false :null
        this.state.orderedAwardingCosts = this.form11Info.orderedAwardingCosts == true || this.form11Info.orderedAwardingCosts ==false? null :false;
        this.state.successfulParties = this.form11Info.orderedAwardingCosts && (this.invalidSuccessfulParties || this.form11Info.successfulParties?.length==0) ?false : null
        this.state.unsuccessfulParties = this.form11Info.orderedAwardingCosts && this.form11Info.unsuccessfulParties?.length==0 ? false : null
        this.state.ordersCourtMade = this.form11Info.ordersCourtMade? null:false
        
        this.state.hearingDate = this.form11Info.hearingDate? null :false;

        if(dontFindInvalidFields == true) return true

        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }            
        }
        return true            
    } 

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form11/forms';

        if (this.currentOrderMultipleJusticesId){
            method = 'put';
            url = '/form11/forms/'+this.currentOrderMultipleJusticesId;
            const form11Data = this.form11Info;            
            this.UpdateForm11Info(form11Data);

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form11Info,
                    type:'Form11',
                    description:'Order of three or more justices'
                }
            }
            this.saveInfo(options, draft);

        } else {
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form11Info,
                    type:'Form11',
                    description:'Order of three or more justices'
                }
            }
            this.saveInfo(options, draft);
        }
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentOrderMultipleJusticesId(response.data.file_id); 
                    }

                    this.clearStates();                                     
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;                
            })
    }

    public addNewRespondent(){
        this.state.respondentsInfo = null
        this.partyToEdit = {} as form11PartiesInfoType
        this.partyType = 'Respondent'
        this.isCreate = true;
        this.showPartyWindow = true;        
    }

    public editRespondent(data) {
        this.partyToEdit = data.item
        this.partyType = 'Respondent';
        this.isCreate = false;
        this.showPartyWindow = true;
    }

    public removeRespondent(data){ 
        const form11Data = this.form11Info;       
        form11Data.respondents.splice(data.index,1);
        form11Data.respondentNames = form11Data.respondents.map(resp=>resp.name).join(', ');
        this.partyNames = [...form11Data.appellants, ...form11Data.respondents]
        this.somePartiesChanged()
        this.UpdateForm11Info(form11Data);
        this.updated ++;        
    }

    public addNewAppellant(){
        this.state.appellantsInfo = null
        this.partyToEdit = {} as form11PartiesInfoType
        this.partyType = 'Appellant'
        this.isCreate = true;
        this.showPartyWindow = true;        
    }

    public editAppellant(data) {
        this.partyToEdit = data.item
        this.partyType = 'Appellant';
        this.isCreate = false;
        this.showPartyWindow = true;        
    }

    public removeAppellant(data){   
        const form11Data = this.form11Info;       
        form11Data.appellants.splice(data.index,1); 
        form11Data.appellantNames = form11Data.appellants.map(resp=>resp.name).join(', ');
        this.partyNames = [...form11Data.appellants, ...form11Data.respondents]        
        this.somePartiesChanged()
        this.UpdateForm11Info(form11Data);
        this.updated ++;        
    }

    public partyChanged(partyCreated){
        if(partyCreated){
            const form11Info = this.form11Info
            const party = JSON.parse(JSON.stringify(this.partyToEdit))
            if(this.partyType == 'Appellant'){
                form11Info.appellants.push(party);
            }
            else if(this.partyType =='Respondent'){
                form11Info.respondents.push(party);
            }
            this.UpdateForm11Info(form11Info)
        }
        this.revaluateForm11Data();
        this.showPartyWindow = false;
        this.somePartiesChanged() 
        this.updated++;
    }

    public addNewJudgeNames(){
        if(this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger'
        }else{
            this.state.judgeNames = null;
            this.AddNewJudgeNamesForm = true;            
        }
    }

    public editJudgeNames(data) {
        // console.log(data)
        if(this.AddNewJudgeNamesForm || this.isEditJudgeNamesOpen){            
            this.addJudgeNamesFormColor = 'danger';                     
        }else if(!this.isEditJudgeNamesOpen && !data.detailsShowing){
            //console.log(data);
            data.toggleDetails();
            this.isEditJudgeNamesOpen = true;
            this.latestEditJudgeNamesData = data;            
        }   
    }

    public modifyJudgeNames(isCreateJudgeNames: boolean, newJudgeName: string, index: number, otherName){        

        const form11Data = this.form11Info;

        if (isCreateJudgeNames){           
            form11Data.judgeNames.push({name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) })            
        } else {                    
            form11Data.judgeNames[index] = {name: newJudgeName, other: otherName, text: (otherName?otherName:newJudgeName) };        
        }
        this.UpdateForm11Info(form11Data)
        this.closeJudgeNamesForm();
        this.updated ++;
    }

    public removeJudgeNames(data){ 
        const form11Data = this.form11Info;       
        form11Data.judgeNames.splice(data.index,1);        
        this.UpdateForm11Info(form11Data);
        this.updated ++;        
    }

    public closeJudgeNamesForm() {                     
        this.AddNewJudgeNamesForm= false; 
        this.addJudgeNamesFormColor = 'court'
        if(this.isEditJudgeNamesOpen){
            this.latestEditJudgeNamesData.toggleDetails();
            this.isEditJudgeNamesOpen = false;
        }
        this.recheckStates()
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date < day);           
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form11"}) 
    }

    public somePartiesChanged(){
        this.form11Info.filingParties=[]
        this.form11Info.appearingParties=[]
        this.form11Info.successfulParties = [];
        this.form11Info.unsuccessfulParties = [];
        this.updateNonSuccessfulParties();
        this.updated++;
    }

    public getCounselParty(party){

        if(party.counselName){
            const counsel: form11PartiesInfoType = JSON.parse(JSON.stringify(party))
            counsel.isCounsel = true
            counsel.name = counsel.counselName+', counsel for '+counsel.name
            return counsel
        }        
        return party
    }

    public updateNonSuccessfulParties(){
        const otherParties = [];

        if (this.partyNames.length == this.form11Info.successfulParties?.length){
            this.invalidSuccessfulParties = true;

        } else {
            this.invalidSuccessfulParties = false;

            for (const partyName of this.partyNames){
                const index = this.form11Info.successfulParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.nonSuccessfulPartyNames = otherParties;
            this.updated ++;
        }      
    }


}
</script>

<style scoped lang="scss">

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    }

    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
        font-style: italic;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 0.75rem !important;
    }

</style>