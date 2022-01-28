<template>
    <div v-if="dataReady">
        <div style="font-weight: 800; color:#FFF; line-height:0.1rem; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        <div>            
            <div style="text-align: center;">
                <div style="line-height:0.75rem; font-size:12pt;"><b>FORM 7 (RULES 11 (A))</b></div>               
            </div>            
        </div> 

<!-- <Reg Info> -->
        <div class="row mt-3 mb-2 p-0 mx-0 " style="line-height:1rem; padding:0; font-size:10pt;">
            <div style="width:57%"></div>
            <div style="width:23%; margin: 0; padding:0;">
                Court of Appeal File No.<br>
                <span style="line-height:0rem; font-size:8pt; font-weight: 700;">(For Registry Use Only)</span>
            </div>
            <div style="width:20%; margin: 0;"></div>
        </div>

        <div class="my-2 row" style="line-height:1rem; padding:0; font-size:10pt;">
            <div style="width:57%"></div>
            <div style="width:23%; margin: 0; padding:0;">
                Supreme Court File No.
            </div>
            <div style="width:20%; margin: 0; padding:0; color:#000;">{{result.lowerCourtFileNo}}</div>
        </div>

        <div class="my-2 row" style="line-height:1rem; padding:0; font-size:10pt;">
            <div style="width:57%"></div>
            <div style="width:23%; margin: 0; padding:0;">
                Supreme Court Registry
            </div>
            <div style="width:20%; margin: 0; padding:0; color:#000;"> {{caseLocation.name}}</div>
        </div>
        
<!-- <Parties> -->
        <div class="mt-3 mb-2" style="display: block; text-align: center; font-size:11pt; font-weight: 800;">COURT OF APPEAL</div>
        <div v-for="sop,inx in caseSop" :key="inx">
            <div class="my-0 row" style="line-height:1rem; padding:0;margin:0;font-weight: 700;">
                <div>{{sop.conjunction}}:</div>
            </div>

            <div class="my-0 row" style="line-height:1rem; padding:0;margin:0"> 
                <div style="width:17%"></div>
                <div style="width:66%; text-align: center">
                    {{sop.partyName}}
                </div>
                <div style="width:17%"></div>
            </div>

            <div class="my-0 row" style="font-weight: 700;"> 
                <div style="width:66%;"></div>
                <div style="width:34%; line-height:1rem; padding:0;margin:0">
                    <div v-if="sop.lowerCourtRole == 'NONE (New Party)'">
                        {{sop.appealRole}}
                    </div>            
                    <div v-else>                        
                        {{sop.appealRole}}/<br> {{sop.lowerCourtRole}}
                    </div>
                </div>
            </div>          
        </div>

<!-- <Hereby> -->
        <div class="mt-3 mb-4" style="display: block; text-align: center; font-weight: 700; font-size:11pt;">NOTICE OF APPEAL</div>       

        <div class="mt-4" style="line-height:1.15rem;" >
            <underline-form 
                style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="29rem" 
                hint=""
                beforetext="Take notice that" 
                :text="applicantNames.join(', ')"/>
            <div style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0.15rem;">
                hereby appeals  
            </div>
            <underline-form 
                style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="17.75rem" 
                hint=""
                beforetext=" to the Court of Appeal for British Columbia from the order of" 
                :text="result.judgeFullName"/>
            <underline-form 
                style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="24.25rem" 
                hint=""
                beforetext="of the Supreme Court of BC pronounced the" 
                :text="result.dateOfJudgement | beautify-date-month-year"/>
            <underline-form 
                style="text-indent:1px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="15rem" 
                hint=""
                beforetext="at" 
                :text="caseLocation.city"/>
            <div style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;">
                , British Columbia  
            </div>
            <div v-if="result.partOfJudgment" style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;">
                [If the appeal is from a part of the judgment only, please specify the part] 
            </div>
            <underline-form 
                v-if="result.partOfJudgment"
                style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="30rem" 
                hint=""
                beforetext="" 
                :text="result.partOfJudgment"/>.
        </div>

<!-- <1> -->
        <section>
            <div style="margin:0 0 0 0.25rem;display:inline;  ">The appeal is from a:</div>   
            <div class="row" style="margin:0.25rem 0 0 1rem; " >
                
                <div style="width:50%">                                          
                    <check-box                                                                                      
                        :check="(result.appealFrom == 'Trial Judgment')?'yes':''" 
                        text="Trial Judgment"/>  
                    <check-box                                                                                      
                    :check="(result.appealFrom == 'Summary Trial Judgment')?'yes':''" 
                    text="Summary Trial Judgment"/>
                </div>
                <div style="width:50%">
                    <check-box                                                                                      
                        :check="(result.appealFrom == 'Order of a Statutory Body')?'yes':''" 
                        text="Order of a Statutory Body"/>  
                    <check-box                                                                                      
                    :check="(result.appealFrom == 'Chambers Judgment')?'yes':''" 
                    text="Chambers Judgment"/>     
                </div>           
                
            </div>                        
        </section>

<!-- <2> -->
        <div class="print-block">
            <section>
                <div style="margin:0 0 0 0.25rem;display:inline;">                   
                    If the appeal is from an appeal under Rule 18-3 or 23-6 (8) of the Supreme 
                    Court Civil Rules or Rule 18-3 or 22-7 (8) of the Supreme Court Family 
                    Rules, name the maker of the original decision, direction or order:
                    <underline-form 
                        v-if="result.partOfJudgment"
                        style="text-indent:2px;display:inline-block;margin:0.25rem 0 0.5rem 0;" 
                        textwidth="37.75rem" 
                        beforetext=""
                        hint="" 
                        :text="(!result.wasSupremeAppeal)?'Not Applicable':result.decisionMaker"/>   
                </div>
            </section>
        </div>

<!-- <3> -->
        <div class="print-block">

            <section>
                <div style="margin:0 0 0 0.25rem;display:inline;  ">Please identify which of the following is involved in the appeal:</div>   
                <div class="row" style="margin:0.25rem 0 0 1rem; " >
                    
                    <div style="width:33%">                                          
                        <check-box                                                                                      
                            :check="(result.involves == 'Civil Procedure')?'yes':''" 
                            text="Civil Procedure"/>  
                        <check-box                                                                                      
                            :check="(result.involves == 'Municipal Law')?'yes':''" 
                            text="Municipal Law"/>
                        <check-box                                                                                      
                            :check="(result.involves == 'Equity')?'yes':''" 
                            text="Equity"/>
                    </div>
                    <div style="width:33%">
                        <check-box                                                                                      
                            :check="(result.involves == 'Constitutional/Administrative')?'yes':''" 
                            text="Constitutional/Administrative"/>  
                        <check-box                                                                                      
                            :check="(result.involves == 'Torts')?'yes':''" 
                            text="Torts"/>
                        <check-box                                                                                      
                            :check="(result.involves == 'Motor Vehicle Accidents')?'yes':''" 
                            text="Motor Vehicle Accidents"/>    
                    </div>
                    <div style="width:33%; padding-left: 2rem;">
                        <check-box                                                                                      
                            :check="(result.involves == 'Commercial')?'yes':''" 
                            text="Commercial"/>  
                        <check-box                                                                                      
                            :check="(result.involves == 'Real Property')?'yes':''" 
                            text="Real Property"/>
                        <check-box                                                                                      
                            :check="(result.involves == 'Wills and Estates')?'yes':''" 
                            text="Wills and Estates"/>     
                    </div>                    
                    
                </div>   
                <div style="margin:1.25rem 0 0 1rem;">Family</div>  
                <div class="row" style="margin:0.25rem 0 0 1rem; " >
                    
                    <div style="width:33%">                                          
                        <check-box                                                                                      
                            :check="(result.involves == 'Divorce')?'yes':''" 
                            text="Divorce"/>  
                        <check-box                                                                                      
                            :check="(result.involves == 'Family Law Act')?'yes':''" 
                            text="Family Law Act"/>
                    </div>
                    <div style="width:67%">
                        <check-box                                                                                      
                            :check="(result.involves == 'Corollary Relief in a Divorce Proceeding')?'yes':''" 
                            text="Corollary Relief in a Divorce Proceeding"/>  
                        <check-box                                                                                      
                            :check="(result.involves == 'Other Family')?'yes':''" 
                            text="Other Family"/>     
                    </div>                                    
                    
                </div>                        
            </section>
            
        </div>

        <div style="margin:0 0 0 0.25rem;">
            (The Divorce Registry will, as applicable, be notified by the Court of Appeal 
            Registry on filing if the appeal involves divorce, corollary relief in divorce 
            proceeding or matters under the Family Law Act)
        </div> 

        <div class="print-block" style="margin:1rem 0 0 0.25rem;">
            And further take notice that the Court of Appeal will be moved at the hearing 
            of this application for an order that
            <div v-if="result.orderSought" 
                class="answerbox">{{result.orderSought}}</div>
            <div v-else style="margin-bottom:3rem;"></div>                    
        </div>

        <div style="margin:1rem 0 0 0.25rem;">
            The trial/hearing of this proceeding occupied <b style="color:#000">{{result.trialDurationDays}}</b> days.
        </div>

        <div style="margin:0.25rem 0 0 0.25rem;">
            Dated electronically in British Columbia, this <span style="color:#000">{{currentDate}}</span>.
        </div>

        <div class="row" style="margin:0; padding:0;">

            <div style="width:62%"></div>
            <div style="width:38%; padding:0; margin:0;">
                <div style="height:3rem; border:1px solid; margin:0;"></div>
                <div style="text-align: center; margin:0; color:#000;">
                    {{result.appealingFirm}}
                </div>
                <div style="margin:0; padding:0; text-align: center;">
                    Appellant(s)/Solicitor for the Appellant(s)
                </div>
            </div>

        </div>
        <div style="line-height:1.15rem;">
            <underline-form 
                    style="text-indent:0px;display:inline-block;margin:1rem 0 0.5rem 0;" 
                    textwidth="33.5rem" 
                    beforetext="To the respondent(s):" 
                    hint=""
                    :text="respondentNames.toString()"/>
            <underline-form 
                style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="34.5rem" 
                beforetext="And to its solicitor:" 
                hint=""
                :text="(result.respondentSolicitor)?result.respondentSolicitor:''"/>
            <underline-form 
                style="text-indent:0px;display:inline-block;margin:0 0 0.5rem 0;" 
                textwidth="29rem" 
                hint=""
                beforetext="This Notice of Appeal is given by" 
                :text="result.appealingFirm"/>
        
            <div class="print-block" style="margin:0 0 0 0.25rem;">
                whose address for service is
                <div v-if="result.appealingFirmAddress" 
                    class="answerbox">{{result.appealingFirmAddress}}</div>
                <div v-else style="margin-bottom:3rem;"></div>  
            </div> 
        </div>

        <div style="margin:1rem 0 0 0.25rem;">
            To the respondent(s): 
            <p style="margin-top:0.45rem;">
                IF YOU INTEND TO PARTICIPATE in this appeal, YOU MUST GIVE NOTICE of your intention by filing a form entitled "Notice of
                Appearance" (Form 2 of the Court of Appeal Rules) in a Court of Appeal registry and serve the notice of appearance on the
                appellant WITHIN 10 DAYS of receiving this Notice of Appeal.
            </p>
        </div>

        <div style="margin:1rem 0 0 0.25rem;">
            IF YOU FAIL TO FILE A NOTICE OF APPEARANCE
           
                <p style="text-indent:4rem; margin:0.5rem 0 0 0;">
                    (a) you are deemed to take no position on the appeal, and
                </p>
                <p style="text-indent:4rem; margin:0.5rem 0 0 0;">
                    (b) the parties are not obliged to serve any further documents on you.
                </p>
            
            <p style="margin-top:0.75rem;">
                The filing registries for the British Columbia Court of Appeal are as follows:
            </p>

            <div class="row" style="margin:0.25rem 0 0 0; padding:0" >
                <div style="padding:0">
                    <div style="display:block;">Central Registry:</div>
                    <div style="text-indent:0.5rem;display:block;">B.C. Court of Appeal</div>
                    <div style="text-indent:0.5rem;display:block;">Suite 400, 800 Hornby Street</div>
                    <div style="text-indent:0.5rem;display:block;">Vancouver BC V6Z 2C5</div>
                </div>
            </div>

            <div class="row" style="margin:1rem 0 0 0; " >
                    
                <div style="width:50%; padding:0">            
                    <div style="display:block;">Other Registries:</div>
                    <div style="text-indent:0.5rem;display:block;">B.C. Court of Appeal</div>
                    <div style="text-indent:0.5rem;display:block;">The Law Courts</div>
                    <div style="text-indent:0.5rem;display:block;">P.O. Box 9248 STN PROV GOVT</div>
                    <div style="text-indent:0.5rem;display:block;">850 Burdett Ave</div>
                    <div style="text-indent:0.5rem;display:block;">Victoria BC V8W 1B4</div>
                </div>

                <div style="width:50%;">   
                           
                    <div style="display:block; margin-top:1.35rem;">B.C. Court of Appeal</div>
                    <div style="display:block;">223 - 455 Columbia Street</div>
                    <div style="display:block;">Kamloops BC V2C 6K4</div>               
            
                </div>
            </div>
            <div style="display:block; margin-top:1rem;">Inquiries should be addressed to (604) 660-2468</div>
            <div style="display:block;">Fax filings: (604) 660-1951</div>
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

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import { form7SubmissionDataInfoType, manualSopInfoType, form7PartiesInfoType } from '@/types/Information/Form7';

@Component({
    components:{       
        CheckBox,
        UnderlineForm            
    }
})
export default class Form7Layout extends Vue {

    @Prop({required:true})
    result!: form7SubmissionDataInfoType; 

    @informationState.State
    public caseLocation: locationsInfoType;

    @form7State.Action
    public UpdateForm7SubmissionInfo!: (newForm2SubmissionInfo: form7SubmissionDataInfoType) => void
    
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
    
    public prePopulateSop(partyInfo: form7PartiesInfoType){

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