<template>    
    <b-card v-if="dataReady" class="mb-4 border-white bg-white">

        <h2 class="ml-4 pl-2 mt-3 text-primary">Lower Court Case Information</h2>        

        <b-row v-if="manualTrib" class="mt-0 question">
            <b-col cols="7" class="labels">
                Type of Tribunal:                                
            </b-col>
            <b-col>
                <b-form-select                
                    style="width:100%"              
                    v-model="tribunalType" 
                    @change="update"                   
                    :options="tribunalTypes">
                </b-form-select>
                <b-form-input
                    v-if="tribunalType == 'Other'"
                    style="width:100%" 
                    placeholder="Tribunal Type"
                    class="mt-2"
                    @change="update"                                    
                    v-model="otherTribunalType">
                </b-form-input>
                <span
                    v-if="(form1InfoStates.tribunalType != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Type of Tribunal.
                </span>                   
            </b-col>
        </b-row>
        
        <b-row v-else class="mt-0 question">
            <b-col cols="7" class="labels">
                Supreme Court File No.                                
            </b-col>
            <b-col>                    
                <b-form-input                        
                    style="width:100%" 
                    placeholder="Supreme Court File No."
                    class="mt-2"
                    @change="update"                                    
                    v-model="manualSummaryInfo.lowerCourtFileNo">
                </b-form-input>
                <span
                    v-if="(form1InfoStates.lowerCourtFileNo != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify Supreme Court File No.
                </span>                   
            </b-col>
        </b-row>

        <b-row v-if="manualNorm || manualNTrib" class="mt-4 question">
            <b-col cols="7" class="labels">
                Registry Location:                                
            </b-col>
            <b-col>
                <b-form-select                
                    style="width:100%"              
                    v-model="manualSummaryInfo.lowerCourtRegistryId" 
                    @change="update">
                    <b-form-select-option
                        v-for="location in locationsInfo" 
                        :key="location.id"
                        :value="location.id">
                            {{location.name}}
                    </b-form-select-option>
                </b-form-select>
                
                <span
                    v-if="(form1InfoStates.lowerCourtRegistryId != null)" 
                    style="font-size: 0.75rem;" 
                    class="bg-white text-danger"><b-icon-exclamation-circle/>
                    Specify registry location.
                </span>                   
            </b-col>
        </b-row>

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Name of Decision Maker                                
            </b-col>
            <b-col class="mt-2">
                <b-form-input
                    :state="form1InfoStates.tribunalOriginalDecisionMaker"
                    @change="update"
                    style="max-width:100%" 
                    v-model="manualSummaryInfo.tribunalOriginalDecisionMaker">
                </b-form-input> 
            </b-col>
        </b-row>

        <b-row class="my-4 question" style="padding: 0;">
            <b-col cols="7" class="labels">
                Date the Order was Pronounced:                                
            </b-col>
            <b-col class="ml-3" style="padding: 0;">  
                <b-card 
                    class="mt-2" 
                    style="padding: 0; float: left;" 
                    :border-variant="form1InfoStates.tribunalDateOfOrder == false?'danger': 'dark'">
                    <div class="vuetify">
                        <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                            <v-date-picker
                                v-model="manualSummaryInfo.tribunalDateOfOrder"                           
                                color="warning"             
                                :allowed-dates="allowedDates"                            
                                header-color="red"
                                @change="update"
                            ></v-date-picker>                            
                        </v-app>
                    </div>    
                </b-card>
            </b-col>
        </b-row>

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                City where the Order was Pronounced                                
            </b-col>
            <b-col class="mt-2">
                <b-form-input
                    :state="form1InfoStates.cityOfOrder"
                    @change="update"
                    style="max-width:100%" 
                    v-model="manualSummaryInfo.cityOfOrder">
                </b-form-input> 
            </b-col>
        </b-row>            

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Length of the Lower Court hearing: 
                <p :class="form1InfoStates.appearanceDays == false?'content text-danger':'content text-primary'">
                    Indicate in days or hours the length of the hearing 
                    that led to the order you are appealing from. For 
                    example, if you are appealing a judgment from a 
                    trial that took two hours, enter “two hours.”
                </p>                               
            </b-col>
            <b-col class="mt-1">
                <b-form-input    
                    style="width: 15rem; display: inline-block;"                    
                    :state="form1InfoStates.appearanceDays"
                    @change="update"
                    v-model="trialDurationDays"                            
                    size="md"
                    type="text"                        
                ></b-form-input>   
            </b-col>
        </b-row>
       
    </b-card>    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/common";
const commonState = namespace("Common");

import { form1StatesInfoType, form1DataInfoType } from '@/types/Information/Form1';
import { locationsInfoType } from '@/types/Common';

@Component
export default class FillForm1ManualSummaryInfo extends Vue {    

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.State
    public form1Info: form1DataInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    manualSummaryInfo = {} as form1DataInfoType;

    @Prop({required: true})
    manualNTrib!: boolean

    @Prop({required: true})
    manualTrib!: boolean

    @Prop({required: true})
    manualNorm!: boolean

    
    dataReady = false;
    //TODO: add tribunal types
    tribunalTypes = [
    { text: 'Tribunal', value: 'a', disabled: true },
    "British Columbia Utilities Commission",    
    "Building Code Appeal Board", 
    "Civil Resolution Tribunal", 
    "Community Care and Assisted Living Appeal Board", 
    "Disciplinary and Professional Conduct Board", 
    "Employment and Assistance Appeal Board", 
    "Employment Standards Tribunal", 
    "Enviornmental Appeal Board", 
    "Expropriation Compensation Board", 
    "Financial Services Tribunal", 
    "Forest Appeals Commission", 
    "Forest Practices Board", 
    "Health Care Practitioners' Special Special Committee for Audit Hearings", 
    "Health Professions Review Board", 
    "Hospital Appeal Board", 
    "Industry Training Appeal Board", 
    "Labour Relations Board", 
    "Mental Health Review Board", 
    "Oli and Gas Appeal Tribunal", 
    "Property Assessment Appeal Board", 
    "Property Assessment Review Panels", 
    "Safety Standards Appeal Board", 
    "Surface Rights Board", 
    "Workers' Compensation Appeal Tribunal", 
    "Other",
    { text: 'Regulatory Bodies', value: 'b', disabled: true },
    "Applied Science Technologists and Technicians of BC", 
    "Architectural Institute of BC", 
    "Assayer Certification Board of Examiners", 
    "Association of BC Land Surveyors", 
    "Association of British Columbia Forest Professionals", 
    "Association of Professional Engineers and Geoscientists of BC", 
    "British Columbia Broiler Hatching Egg Commission", 
    "British Columbia Chicken Marketing Board", 
    "British Columbia College of Social Workers", 
    "British Columbia Cranberry Marketing Commission", 
    "British Columbia Egg Marketing Board", 
    "British Columbia Ferry Commission", 
    "British Columbia Hog Marketing Commission", 
    "British Columbia Institute of Agrologists", 
    "British Columbia Milk Marketing Board", 
    "British Columbia Securities Commission", 
    "British Columbia Teachers' Council", 
    "British Columbia Turkey Marketing Board", 
    "British Columbia Vegetable Marketing Commission", 
    "British Columbia Society of Landscape Architects", 
    "Board of Examiners of the British Columbia Registered Music Teachers Association", 
    "British Columbia Container Trucking Commissioner", 
    "Chartered Professional Accountants of British Columbia", 
    "College of Applied Biology", 
    "Consumer Protection BC", 
    "Emergency Medical Assistants Licensing Board", 
    "Insurance Council of British Columbia", 
    "Land Title and Survey Authority of British Columbia", 
    "Law Society of British Columbia", 
    "Notaries Public Board of Examiners", 
    "British Columbia College of Nurses and Midwives",
    "College of Chiropractors of British Columbia",
    "College of Dental Hygienists of British Columbia",
    "College of Dental Surgeons of British Columbia",
    "College of Dental Technicians of British Columbia",
    "College of Denturists of British Columbia",
    "College of Dietitians of British Columbia",
    "College of Massage Therapists of British Columbia",
    "College of Naturopathic Physicians of British Columbia",
    "College of Occupational Therapists of British Columbia",
    "College of Opticians of British Columbia",
    "College of Optometrists of British Columbia",
    "College of Pharmacists of British Columbia",
    "College of Physical Therapists of British Columbia",
    "College of Physicians and Surgeons of British Columbia",
    "College of Psychologists of British Columbia",
    "College of Speech & Hearing Health Professionals of BC",
    "College of Traditional Chinese Medicine Practioners and Acupuncturists of British Columbia",
    "College of Veterinarians of British Columbia",
    "Real Estate Errors and Omissions Insurance Corporation",
    "WorkSafeBC",
    "Vehicle Sales Authority of British Columbia"
    ];
    otherTribunalType = "";
    tribunalType = "";
    trialDurationDays = "";

    mounted() { 
        this.dataReady = false; 
        this.manualSummaryInfo = this.form1Info;
        this.extractInfo();
        this.dataReady = true;            
    }

    public extractInfo(){

        this.trialDurationDays = this.form1Info.trialDurationDays?this.form1Info.trialDurationDays:"";

        if (this.manualSummaryInfo.tribunalType?.trim().length>0){

            if (this.tribunalTypes.includes(this.manualSummaryInfo.tribunalType)){
                this.tribunalType = this.manualSummaryInfo.tribunalType;
                this.otherTribunalType = '';            
            } else {
                this.tribunalType = 'Other';
                this.otherTribunalType = this.manualSummaryInfo.tribunalType;            
            }
        } else {
            this.tribunalType = '';
        }

    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){ 
              
        const form1 = this.manualSummaryInfo;
        form1.trialDurationDays = this.trialDurationDays; 
        if (this.tribunalType == 'Other'){
            form1.tribunalType = this.otherTribunalType;
        } else {
            form1.tribunalType = this.tribunalType;
        }
        //TODO  determine this
        if (form1.appealingScFlaDivorce && form1.lowerCourtRegistryId){
            const selectedLocation: locationsInfoType = this.locationsInfo.filter(location=>location.id == form1.lowerCourtRegistryId)[0]
            form1.lowerCourtRegistryName = selectedLocation.name;
        }
          
        this.UpdateForm1Info(form1);
    }

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
           
        return (date <= day);           
    }

}
</script>

<style lang="scss" scoped>
    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
    }

    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 1.15rem !important;
    }
</style>