<template>

<div v-if="dataReady">

    <!-- <header> -->
    <div style="margin-top:-1.25rem;">
        <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
            <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
        </div>   
        <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
            <div style="width:25%; font-size:20pt; background: black; color: white; display:flex; align-items:center; justify-content:center;"><b>FORM 1</b></div>
            <div style="width:75%; font-size:14pt; line-height:2rem;"><b>
                NOTICE OF APPEAL: RULE 6(1)
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
                    <div style="width:45.5%; padding:0.5rem;">
                        <div style="text-align:right; margin-right:0.5rem;">
                            <div>Court of Appeal File No.</div>
                        <div style="display:block; font-size: 8pt; font-weight: 700; margin-right: 1rem;">(For Registry Use Only)</div>
                        </div>
                    </div>
                    <div class="coa-text-box" style="width:40%;background: #E8E8E8;" ></div>
                </div>

                <div class="row" style="margin-top: 0.5rem;">
                    <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Supreme Court File No.</div></div>
                    <div class="coa-text-box" style="width:40%;" v-if="result.appealTribunal"></div>
                    <div class="coa-text-box" style="width:40%;" v-else>{{result.lowerCourtFileNo}}</div>
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
                        <i>The file number can be found on the upper right corner of the Supreme Court documents.</i>
                    </div>                        
                </div>

                <div class="row" style="margin-top: 0.5rem;">
                    <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Supreme Court Registry Location</div></div>
                    <div class="coa-text-box" style="width:40%;" v-if="result.appealTribunal"></div>
                    <div class="coa-text-box" style="width:40%;" v-else>{{caseLocation.name}}</div>
                </div>

                
            </div>
        </div>

        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0.5rem; text-align: left; padding: 0.5rem;">
            <div style="margin-bottom: 0.75rem;">
                <b>To the respondent(s)</b><br>
                A court proceeding has been commenced against you in the Court of Appeal. See the final page 
                of this form for details on how to respond.
            </div>                
        </div>

    </div>

    <div class="row my-4" style="font-weight: 700;">1. PARTIES TO THE APPEAL</div>

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Appellant(s)
                </b>    
                <i><br>
                    List the party(ies) appealing the Supreme Court or tribunal order. 
                    Identify their roles in the proceeding below in brackets. E.g.: 
                    Jane Doe (plaintiff, petitioner, etc.)

                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.appellants}}</div> 
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Respondent(s)
                </b>    
                <i><br>
                    List the other party(ies) in the Supreme Court or tribunal order you 
                    are appealing who are affected by the appeal. Identify their roles 
                    in the proceeding below in brackets. E.g.: Jane Doe (defendant). 
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.respondents}}</div> 
        </div>                      

    </div> 

    <div class="row my-4" style="font-weight: 700;">2. THE ORDER YOU ARE APPEALING</div>

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Is leave to appeal required?
                </b>    
                <i><br>
                    Court of Appeal Rule 12 explains when you need leave to appeal. 
                    If you are unsure, check “Yes”. 
                </i> 
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="true?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="true?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

    </div> 

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Who made the order?
                </b>    
                <i><br>
                    Name the justice or other decision maker who pronounced the order you are appealing.
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" v-if="result.appealTribunal">{{result.tribunalOriginalDecisionMaker}}</div> 
            <div class="mx-2">{{result.judgeFullName}}</div> 
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt;">                      
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">
            <div style="margin-left:4.5rem" ><b>What court and/or tribunal pronounced the order(s)?</b></div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="!result.appealTribunal?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Supreme Court"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="result.appealTribunal?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Tribunal"/>
        </div>   

        <div class="coa-text-box-center" style="width:31%;" v-if="result.appealTribunal">{{result.tribunalType}}</div>   
        <div class="coa-text-box-center" style="width:31%;" v-else></div>                            
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
                        :check="true?'yes':''" 
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="Self-represented"/>  
                </div>
                <div style="margin-top: 1rem; width:12%;">              
                    <check-box                    
                        style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                        :check="true?'yes':''"
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="Lawyer"/>
                </div>   

                <div class="coa-text-box-center" style="width:31%;">{{result}}</div>                               
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
                    <div style="margin-left:8.35rem;"><b>New:</b></div>
                </div>

                <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->

                <div style="margin-top: 1rem; width:24%;">              
                        <check-box 
                            style="margin: .5rem 0 0 1rem;" 
                            :check="true?'yes':''" 
                            shiftmark="1" 
                            marginLeft="0.5rem"
                            text="Self-represented"/>
                </div>                
                <div style="margin-top: 1rem; width:12%;">              
                    <check-box                    
                        style="padding: 0; margin: .5rem .5rem 0 1rem;"
                        :check="true?'yes':''"
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="Lawyer"/>
                </div> 
        
                <div class="coa-text-box-center" style="width:31%;">{{result}}</div>
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
                            Name(s) and residential or business address(es) within B.C. for service of party(ies) completing this form
                        </b>    
                        <i><br>Include law firm if represented.</i> 
                    </div>                       
                </div>

                <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                
                <div class="coa-text-box-left" style="width:60%;">
                    <div class="mx-2">{{result}}</div> 
                </div>                      

            </div> 
        

<!-- ROW <phone-number> -->
            <div class="mt-4" style="display:flex; font-size: 9pt;">

                <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0; height:3.5rem;">
                    <div class="ml-2" style="font-weight: 700;">
                        Phone number(s) of the party(ies) completing this form
                    </div>               
                </div>

                <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
                
                <div class="coa-text-box-left" style="width:60%;">
                    <div class="mx-2">{{result}}</div>
                </div>                       

            </div> 


<!-- <email> -->
            <div class="mt-4" style="display:flex; font-size: 9pt;">       

                <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0;  height:6.5rem;">
                    <div class="ml-2">
                        <b>Email address(es)</b><b style="font-size:8pt;"> for service of the party(ies) completing this form</b>
                        <i><br>If you provide an email address you consent to have documents served on you by email.</i>      
                    </div>
                </div>

                <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                        
                <div class="coa-text-box-left" style="width:60%;">
                    <div class="mx-2">{{result}}</div> 
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
            <div class="ml-2">Name of lawyer or party authorizing filing of this form.</div>
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
    </div>


    </div>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { locationsInfoType } from '@/types/Common';
const informationState = namespace("Information");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import { form1DataInfoType, manualSopInfoType, form1PartiesInfoType } from '@/types/Information/Form1';

@Component({
    components:{       
        CheckBox,
        UnderlineForm            
    }
})
export default class Form1Layout extends Vue {

    @Prop({required:true})
    result!: form1DataInfoType; 

    @informationState.State
    public caseLocation: locationsInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    caseSop :manualSopInfoType[] = [];
    noRolePartySop: manualSopInfoType[] = [];
    currentDate = '';

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }

    public getFullName(party){

        if(party.isOrganization || !party.surname){
            return (party.organizationName?party.organizationName:'')
        } else{
            return  (party.firstGivenName? party.firstGivenName+' ':'')+
                    (party.secondGivenName? party.secondGivenName+' ':'')+
                    (party.thirdGivenName? party.thirdGivenName+' ':'')+
                    (party.surname? party.surname+' ':'')
        }        
    }
   
    public extractInfo(){

        console.log(this.result)
        console.log(this.caseLocation)
        
        const parties = this.result.parties
        this.applicantNames = [];
        this.respondentNames = [];
        
        for(const party of parties){
            if(party.appealRole=="Appellant")
                this.applicantNames.push(this.getFullName(party));
            else if(party.appealRole=="Respondent")
                this.respondentNames.push(this.getFullName(party));
        }

        if (this.result.manualSop?.length > 1){
            this.caseSop = this.result.manualSop;
        } else {

            this.caseSop = [];
            this.noRolePartySop = [];  
            for(const party of parties)
                this.prePopulateSop(party);          


            if (this.noRolePartySop.length > 0){
                this.caseSop = this.caseSop.concat(this.noRolePartySop);
            }           

        }

        this.currentDate = Vue.filter('beautify-date-month-year')(moment().format("YYYY-MM-DD"))
    }
    
    public prePopulateSop(partyInfo: form1PartiesInfoType){

        let sop = {} as manualSopInfoType;            
        sop.plural = false;
        sop.appealRole = partyInfo.appealRole;
        sop.lowerCourtRole = partyInfo.lowerCourtRole;
        
        sop.partyName=this.getFullName(partyInfo)
        if (partyInfo.lowerCourtRole == 'NONE (New Party)'){
            sop.conjunction = 'And';
            this.noRolePartySop.push(sop);
        } else if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
            partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
                sop.conjunction = 'Between';
                this.caseSop.unshift(sop);
        } else {
            sop.conjunction = 'And';
            this.caseSop.push(sop);
        }
    }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>