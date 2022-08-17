<template>
    <div v-if="dataReady">

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white; display:flex; align-items:center; justify-content:center;"><b>FORM 18</b></div>
                <div style="width:75%; font-size:14pt; line-height:2rem;"><b>
                    NOTICE OF CHANGE OF REPRESENTATION/CHANGE OF ADDRESS FOR SERVICE: <i>(RULE 86)</i>
                </b></div>
            </div>         
        </div> 

<!-- <stamp-info-box> -->
        <div style="margin: 0.75rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

            <div class="my-2 row" > 
                <div style="width:30%;">
                    <div style="border: 1px solid #E8E8E8; width: 9rem; height: 9rem; margin: 2rem 2rem; text-align:center; line-height:8.5rem;">
                        [STAMP]
                    </div>
                </div>

                <div style="width:70%;">
                    <div class="row" >
                        <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Court of Appeal File No.</div></div>
                        <div class="coa-text-box" style="width:40%;" >{{result.formSevenNumber}}</div>
                    </div>

                    <div class="row" >
                        <div style="width:45.5%; padding:0.5rem;"></div>
                        <div style="width:40%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                            <div class="arrow-up-flash"></div>
                            <div class="arrow-up-box"></div>
                        </div>
                    </div>

                    <div class="row" >
                        <div style="width:45.5%; padding:0.5rem;"></div>
                        <div class="coa-help-box" style="width:40%;">
                            <i>The file number can be found on the upper right corner of the Notice of Appeal.</i>
                        </div>                        
                    </div>
                   
                    <div class="row" style="margin-top: 0.5rem;">
                        <div class="coa-text-box" style="width:40%;">{{result.firstAppellant}}</div> 
                        <div style="width:5.5%; margin-top:0.5rem">v.</div>
                        <div class="coa-text-box" style="width:40%;">{{result.firstRespondent}}</div>
                    </div>

                    
                    <div class="row" >
                        <div style="width:40%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                            <div class="arrow-up-flash"></div>
                            <div class="arrow-up-box"></div>
                        </div>
                        <div style="width:5.5%; margin-top:0.5rem"></div>
                        <div style="width:40%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                            <div class="arrow-up-flash"></div>
                            <div class="arrow-up-box"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first appellant named on Form 1: Notice of Appeal.</i></div> 
                        <div style="width:5.5%; padding: 0; margin:0.5rem 0 0 0;"></div>
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first respondent named on Form 1: Notice of Appeal.</i></div>
                    </div>
                    
                </div>
            </div>

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.75rem 0.5rem 0rem 0.5rem;">
                <div style="margin-bottom: 0.75rem;">
                    If you are changing representation, complete Part A and Part B. If you are only changing 
                    your address for service, complete Part B only. If you are a lawyer seeking to withdraw 
                    from the record without your client's permission, use Form 19.
                </div>                
            </div>

        </div>

        <!-- <filing-parties> -->
        <div class="mt-4" style="display:flex; font-size: 9pt;">       

            <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0;  height:6.5rem;">
                <div class="ml-2">
                    <b>
                        Name(s) of person(s) filing the notice of change of
                        representation/change of address for service
                    </b>                          
                </div>
            </div>

            <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:60%;">
                <div class="mx-2">{{result.filingParties.join(', ')}}</div> 
            </div>                      

        </div> 

<!--  < Part A >   ____________________________________________________________         -->           

        <div class="row mt-4">
            <div style="width:6%; background:#CCC;"> <!-- <col 6%> -->
                <div style="transform: rotate(-90deg); font-weight:600; font-size:14pt; margin:0 -8.5rem;"> PART A </div>
            </div>
            
            <div style="width:1%;"><!-- <col 1%> -->
            </div>
            <div style="width:93%;" >  <!-- <col 93%> -->
    <!-- ROW <current-status> -->                
                <div style="display:flex; font-size: 9pt;">                      
                    <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">
                        <div style="margin-left:4.5rem" ><b>Current status:</b></div>
                    </div>       

                    <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

                    <div style="margin-top: 1rem; width:24%;">              
                        <check-box 
                            style="margin: .5rem 0 0 1rem;" 
                            :check="currentSelfRepresented?'yes':''" 
                            shiftmark="1" 
                            marginLeft="0.5rem"
                            text="Self-represented"/>  
                    </div>
                    <div style="margin-top: 1rem; width:12%;">              
                        <check-box                    
                            style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                            :check="currentLawyer?'yes':''"
                            shiftmark="1" 
                            marginLeft="0.5rem"
                            text="Lawyer"/>
                    </div>   

                    <div class="coa-text-box-center" style="width:31%;">{{currentLawyerName}}</div>                               
                </div>

     <!-- ROW <current-status-help-text> -->    
                <div style="display:flex; font-size: 9pt;">
                    <div style="width:69%;">
                    </div>    
                    <div style="width:31%;">
                        <div class="arrow-up-flash"></div>
                        <div class="arrow-up-box"></div>               
                        <div class="coa-help-box" style="text-align:center; line-height:1rem"><i>Name of lawyer and firm name</i></div>                 
                    </div>
                </div>

    <!-- ROW <new-status> -->        
                <div class="mt-3" style="display:flex; font-size: 9pt;">                      
                    <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">            
                        <div style="margin-left:8.35rem;"><b>New status:</b></div>
                    </div>

                    <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->

                    <div style="margin-top: 1rem; width:24%;">              
                            <check-box 
                                style="margin: .5rem 0 0 1rem;" 
                                :check="newSelfRepresented?'yes':''" 
                                shiftmark="1" 
                                marginLeft="0.5rem"
                                text="Self-represented"/>
                    </div>                
                    <div style="margin-top: 1rem; width:12%;">              
                        <check-box                    
                            style="padding: 0; margin: .5rem .5rem 0 1rem;"
                            :check="newLawyer?'yes':''"
                            shiftmark="1" 
                            marginLeft="0.5rem"
                            text="Lawyer"/>
                    </div> 
            
                    <div class="coa-text-box-center" style="width:31%;">{{newLawyerName}}</div>
                </div>

    <!-- ROW <current-status-help-text> -->    
                <div style="display:flex; font-size: 9pt;">
                    <div style="width:69%;">
                    </div>                         
                    <div style="width:31%;">
                        <div class="arrow-up-flash"></div>
                        <div class="arrow-up-box"></div>               
                        <div class="coa-help-box" style="text-align:center; line-height:1rem"><i>Name of lawyer and firm name</i></div>                 
                    </div>
                </div>
            </div>
        </div>

<!--  < Part B >   ____________________________________________________________         -->

        <div class="row mt-4">
            <div style="width:6%; background:#CCC;"> <!-- <col 6%> -->
                <div style="transform: rotate(-90deg); font-weight:600; font-size:14pt; margin:0 -11.2rem;"> PART B </div>
            </div>
            
            <div style="width:1%;"><!-- <col 1%> -->
            </div>
            <div style="width:93%;" >  <!-- <col 93%> -->
<!-- ROW <service-address> -->            
                <div style="display:flex; font-size: 9pt;">

                    <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:6.5rem;">
                        <div class="ml-2">
                            <b>
                                Name(s) and residential or business address(es) within B.C. for service of person(s) completing this form
                            </b>    
                            <i><br>Include law firm if represented.</i> 
                        </div>                       
                    </div>

                    <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                    
                    <div class="coa-text-box-left" style="width:60%;">
                        <div class="mx-2">{{address}}</div> 
                    </div>                      

                </div> 
           

<!-- ROW <phone-number> -->
                <div class="mt-4" style="display:flex; font-size: 9pt;">

                    <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0; height:3.5rem;">
                        <div class="ml-2" style="font-weight: 700;">
                            Phone number(s) of the person(s) completing this form
                        </div>               
                    </div>

                    <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
                    
                    <div class="coa-text-box-left" style="width:60%;">
                        <div class="mx-2">{{phone}}</div>
                    </div>                       

                </div> 


<!-- <email> -->
                <div class="mt-4" style="display:flex; font-size: 9pt;">       

                    <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0;  height:6.5rem;">
                        <div class="ml-2">
                            <b>Email address(es)</b><b style="font-size:8pt;"> for service of the person(s) completing this form</b>
                            <i><br>If you provide an email address you consent to have documents served on you by email.</i>      
                        </div>
                    </div>

                    <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                            
                    <div class="coa-text-box-left" style="width:60%;">                        
                        <div v-if="result.useServiceEmail" class="mx-2">{{result.serviceInformation.email}}</div> 
                    </div>                      

                </div> 

            </div>
        </div>
<!-- <____________________________________________________________________________________> -->

<!-- <Sign-Date> -->
        <div class="row mt-5" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:19%; margin:0.5rem 0; line-height:0.75rem;  height:2rem;">
                <div class="ml-2"> Date form completed</div>
            </div>
            <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->      

            <div class="coa-text-box-center" style="width:15%;">{{result.completionDate}}</div> 
            
            <div style="width:3.28%;"></div>
            
            <div class="coa-arrow-box-left" style="width:25%; margin:0.5rem 0; line-height:0.95rem;  height:2.15rem;">
                <div class="ml-2">Name of lawyer or party authorizing filing of this form</div>
            </div>
            <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->

            <div class="coa-text-box-center" style="width:25%;"> {{result.authorizedName}}</div>
                
        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt;">
            <div style="width:25.25%;"></div>
            <div style="width:15%">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
            <!-- <div style="width:34.25%;"></div>
            <div style="width:25.25%; float: right;">On Behalf of {{result.filingParties.join(', ')}}</div> -->

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form18DataInfoType } from '@/types/Information/Form18';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form18Layout extends Vue {

    @Prop({required:true})
    result!: form18DataInfoType;

    dataReady = false;
    phone = '';
    address = '';

    currentSelfRepresented = false
    currentLawyer = false
    currentLawyerName = ''

    newSelfRepresented = false
    newLawyer = false
    newLawyerName = ''

    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo(){

        const serviceInfo = this.result.serviceInformation;
        const address =   (serviceInfo.addressLine1? (serviceInfo.addressLine1 + ', '):'')
                        + (serviceInfo.addressLine2? (serviceInfo.addressLine2 + ', '):'') 
                        + (serviceInfo.city? (serviceInfo.city + ', '):'')
                        + (serviceInfo.province? (serviceInfo.province + ', '):'') 
                        + (serviceInfo.country? ( serviceInfo.country + ', '):'')
                        + (serviceInfo.postalCode? serviceInfo.postalCode:'');


        if (!this.result.selfRepresented){
            const counselName = Vue.filter('getFullName')(serviceInfo.counselFirstName, serviceInfo.counselLastName)
            this.address =    (counselName? (counselName + ', '):'')  
                            + (serviceInfo.firmName? (serviceInfo.firmName+ ', '):'') 
                            + address;
            this.phone = serviceInfo.firmPhone;
        } else {
            this.address = address;
            this.phone = serviceInfo.phone;
        }

        this.currentSelfRepresented = (this.result.currentRepresentation == 'Self-represented') && this.result.changeRepresentation
        this.currentLawyer = (this.result.currentRepresentation == 'Lawyer') && this.result.changeRepresentation
        this.currentLawyerName = this.result.changeRepresentation? this.result.currentLawyerName :''

        this.newSelfRepresented = (this.result.newRepresentation == 'Self-represented') && this.result.changeRepresentation
        this.newLawyer = (this.result.newRepresentation == 'Lawyer') && this.result.changeRepresentation
        this.newLawyerName = this.result.changeRepresentation? this.result.newLawyerName :''
           
    }

    
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>