<template>
    <b-card class="bg-white border-white">

        <b-row class="mb-4 ml-1 bg-white border-white" style="font-size: 2rem; font-weight: 700;">            
            Do these apply to your appeal?
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1">               
                <div>
                    <step-number v-bind:stepNumber="1" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you seeking to file your Notice of Appeal outside the time limit?
                </p>
                <p class="content pt-0">
                    Most Supreme Court orders: <b>within 30 days of order being pronounced</b><br/>
                    Bankruptcy cases: <b>within 10 days of order being pronounced</b><br/>
                    Pronounced means the date the order was given by the lower court and not the date it 
                    was entered by the registry.
                </p>

                <b-form-radio-group v-model="insideTimeLimit">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="insideTimeLimit == 'yes'">
                    The time limit for <i>filing and serving</i> an appeal is usually 30 days commencing on the 
                    day after the order is pronounced (the date the order was spoken by the lower court judge). 
                    An appeal relating to bankruptcy needs to be filed and served within 10 days. If it is past 
                    the deadline, you need to file the Notice of Appeal along with the Notice of Motion and 
                    supporting affidavit seeking an extension of time.<br/>
                    You cannot do that using this process. At this time, this process does not support filing 
                    of these documents together.
                </b-card>                           
                
            </b-col>            
        </b-row> 

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="2" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you appealing an order made under the Bankruptcy and Insolvency Act or the Companies' 
                    Creditors Arrangement Act?
                </p>               

                <b-form-radio-group v-model="appealingBankruptcy">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="appealingBankruptcy == 'yes'">
                    <p>
                        The appeal period for filing and serving an appeal is usually 30 days commencing on 
                        the day after the order is pronounced (the date the order was spoken by the lower 
                        court judge); however if another enactment specifies a different period, that 
                        different period applies.
                    </p>

                    <p>
                        Bankruptcy and Insolvency Act - 
                        <a  href="http://laws.justice.gc.ca/eng/regulations/C.R.C.,_c._368/page-2.html#h-10"
                            target="_blank"
                            class= "text-white">Section 31(1) and (2) Bankruptcy and Insolvency General Rules 
                            prescribes a 10 day appeal period</a>.
                    </p>

                    <p>
                        Companies’ Creditors Arrangement Act – 
                        <a  href="http://laws.justice.gc.ca/eng/acts/C-36/page-7.html#docCont"
                            target="_blank"
                            class= "text-white">Section 14(2) prescribes a 21 day appeal period</a>.
                    </p>

                    <p>
                        If you are appealing an order under the Bankruptcy and Insolvency Act or the Companies’ 
                        Creditors Arrangement Act, you cannot do so using this process at this time.
                    </p>
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="3" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you applying for an order to have the fees waived (not be paid)?
                </p>               

                <b-form-radio-group v-model="appealingFeesWaived">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="appealingFeesWaived == 'yes'">                    

                    <p>
                        If you are applying for an order to have the fees waived, you need to file the 
                        Notice of Appeal along with the Notice of Motion and supporting affidavit  
                        <a  href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form19.pdf"
                            target="_blank"
                            class= "text-white">(Form 19 - Affidavit: No Fees Payable (Indigent Status))
                        </a>.
                    </p>

                    <p>
                        You cannot do that using this process. At this time, this system does not support 
                        the submission of these documents together; but you can use the application to 
                        complete your Notice of Appeal form and print it off to file with the Court of 
                        Appeal Registry in person along with the other forms noted above.
                    </p>

                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="4" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Do you seek to appeal an order of a Supreme Court Master?
                </p>               

                <b-form-radio-group v-model="appealingSupremeCourtMaster">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="appealingSupremeCourtMaster == 'yes'">    

                    <p>
                        Appeals of a Supreme Court Master's decision are typically brought 
                        to a Supreme Court Judge.
                    </p> 

                    <p>
                        Complete and file with the Supreme Court, a Notice of Appeal 
                        from Master, Registrar or Special Referee form.                        
                    </p>               

                    <p>
                        Supreme Court Civil 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/17_168_2009%20-%20Supreme%20Court%20Civil%20Rules/168_2009_03.xml#subrule_d2e32458"
                            target="_blank"
                            class= "text-white">Rule 23-6 (8)</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form121"
                            target="_blank"
                            class= "text-white">Form 121</a><br/>
                        Supreme Court Family 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/18_169_2009%20-%20Supreme%20Court%20Family%20Rules/169_2009_03.xml#subrule_d2e28133"
                            target="_blank"
                            class= "text-white">Rule 22-7 (8)</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F98"
                            target="_blank"
                            class= "text-white"> Form F98</a>                        
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row class="mb-4">
            <b-col cols="1" >
               
                <div>
                    <step-number v-bind:stepNumber="5" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>               

            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Do you seek to appeal a Provincial Court Order?
                </p>               

                <b-form-radio-group v-model="appealingProvincialCourtOrder">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="appealingProvincialCourtOrder == 'yes'">    

                    <p>
                        The appeal would typically be brought in the Supreme Court by filing a Notice of Appeal if 
                        Direction Required and a Notice of Appeal - Standard Directions with the Supreme Court.
                    </p>           

                    <p>
                        Supreme Court Civil 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/17_168_2009%20-%20Supreme%20Court%20Civil%20Rules/168_2009_02.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form73"
                            target="_blank"
                            class= "text-white">Form 73</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/168_2009_04#Form74"
                            target="_blank"
                            class= "text-white">Form 74</a><br/>
                        Supreme Court Family 
                        <a  href="http://www.bclaws.ca/civix/document/LOC/complete/statreg/--%20C%20--/Court%20Rules%20Act%20[RSBC%201996]%20c.%2080/05_Regulations/18_169_2009%20-%20Supreme%20Court%20Family%20Rules/169_2009_03.xml#rule18-3"
                            target="_blank"
                            class= "text-white">Rule 18-3</a>:
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F79"
                            target="_blank"
                            class= "text-white">Form F79</a> or
                        <a  href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/169_2009_04#F80"
                            target="_blank"
                            class= "text-white">Form F80</a><br/>                        
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row>

        <b-row>
            <b-col cols="1" >               
                <div>
                    <step-number v-bind:stepNumber="6" v-bind:active="true" v-bind:stepStyle="stepStyle"/>                    
                </div>
            </b-col>
            <b-col cols="11">

                <p class="content pb-0">
                    Are you representing yourself?
                </p>               

                <b-form-radio-group v-model="selfRepresenting">
                    <b-form-radio value='yes'>Yes</b-form-radio>
                    <b-form-radio value='no'>No</b-form-radio>                   
                </b-form-radio-group> 
                <b-card class="border-primary bg-primary text-white mt-2 mr-5" v-if="selfRepresenting == 'yes'">    

                    <p>
                        If you are representing yourself in the Court of Appeal, you will need to learn 
                        about the court system and specific procedures in the Court of Appeal. The 
                        following link will provide you access to information on the Court of Appeal 
                        processes and how you can prepare case:
                    </p>           

                    <p>                        
                        <a  href="http://www.courtofappealbc.ca/?ct=t(primary-menu)"
                            target="_blank"
                            class= "text-white">Court of Appeal information
                        </a>                                          
                    </p>                    
                    
                </b-card>                           
                
            </b-col> 
            
        </b-row>               
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

import StepNumber from "@/components/utils/StepNumber.vue";

@Component({
    components:{
        StepNumber
    }
})
export default class Form7QualifyQuestions extends Vue {

    stepStyle = "font-size: 2rem;";
    insideTimeLimit = '';
    appealingBankruptcy = '';
    appealingFeesWaived = '';
    appealingSupremeCourtMaster = '';
    appealingProvincialCourtOrder = '';
    selfRepresenting = '';


    get qualificationResponse(){

        if (this.insideTimeLimit == 'no' &&
            this.appealingBankruptcy == 'no' &&
            this.appealingFeesWaived == 'no' &&
            this.appealingSupremeCourtMaster == 'no' &&
            this.appealingProvincialCourtOrder == 'no' ){

            return true;

        } else {
            return false;
        }
        
    }

    @Watch('qualificationResponse')
    setQualification(qualified: boolean) 
    {
        console.log('watching')
        this.$emit('disableContinue', !qualified);
    }
    

}
</script>

<style scoped lang="scss">

    .step-number {
        border-radius: 50%;
        padding: 20px;
    }

    .content {        
        margin-bottom: 8px !important;        
    }

</style>