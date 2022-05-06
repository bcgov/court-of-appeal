<template>
    <div v-if="dataReady">

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 4</b></div>
                <div style="width:70%; font-size:14pt; text-align: left; padding-left: 0.75rem; line-height:1.75rem;">
                    <b style="font-size:16pt;">NOTICE OF APPLICATION:</b><b class="ml-2" > RULES 13(a), 20(3) and (4), 54(a), 58(1), 59(1), 60(2), 61(2), 63(2)</b>
                </div>
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
                    <div class="row mt-4" >
                        <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Court of Appeal File No.</div></div>
                        <div class="coa-text-box" style="width:40%; font-weight: 700;" >{{result.formSevenNumber}}</div>
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
                    
                </div>
            </div>

        </div>

        <div class="row mt-3" style="font-size: 12pt;">
            <b>PARTIES TO THE APPEAL</b>
        </div>

<!-- <name-of-appellants> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.55rem 0; height:4.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    <b>Appellant(s)</b><br/>
                    <i>List the name(s) of the appellant(s) named on Form 1: Notice of Appeal</i>
                </div>
            </div>

            <div class="arrow-right-flash-45"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.appellantNames}}</div>                       
            </div> 
        </div>

<!-- <name-of-respondents> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.55rem 0; height:4.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    <b>Respondent(s)</b><br/>
                    <i style="font-size:8.8pt;" >List the name(s) of the respondent(s) named on Form 1: Notice of Appeal</i>
                </div>
            </div>

            <div class="arrow-right-flash-45"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.respondentNames}}</div>                       
            </div> 
        </div>

<!-- <jurisdiction-type> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.32rem 0; line-height:1rem; height:2.5rem;">
                <b class="ml-2">The application is in the jurisdiction of:</b>
            </div>

            <div class="arrow-right-flash-25"></div>           
                       

            <div style="width:24%; margin-top:1rem;">                  
                <check-box 
                    style="margin: 0 0 0 1.75rem;"
                    :check="(result.jurisdictionType == 'The Court (3 Judges)')?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="The Court (3 Judges)"/> 
            </div>

            <div style="width:22%; margin-top:1rem;">
                <check-box 
                    style="margin: 0rem 0rem 0 1.75rem;" 
                    :check="(result.jurisdictionType == 'A Chambers Judge')?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="A Chambers Judge"/> 
            </div>
            
            <div style="width:18%;  margin-top:1rem;">
                <check-box 
                    style="margin: 0rem 0rem 0 1.75rem;" 
                    :check="(result.jurisdictionType == 'The Registrar')?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="The Registrar"/> 
            </div>           
            
        </div>

<!-- <Comment To the Party(ies)> -->
        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem -15px 0.5rem -15px; text-align: left; padding: 0.5rem;">
            <div style="font-weight: 700; margin-bottom: 0.75rem;">
                To the party(ies) filing the application
            </div>
            <div style="margin-bottom: 0.75rem;">
                If your application is before a chambers judge check the 
                <a 
                    target='_blank' 
                    href="https://www.bccourts.ca/court_of_appeal/hearing_list/lists/available%20chambers%20dates/Available%20Chambers%20Dates.pdf">
                    available chambers dates
                </a>
                 on the court website and the timelines for bringing your application under the rules.
            </div>
            <div style="margin-bottom: 0.75rem;">
                If your application is before the court or the registrar contact the appropriate 
                scheduler before completing this form.
            </div>
            <div style="margin-bottom: 0.75rem;">
                Communicate with the other party or parties to ensure they are available on the 
                requested date. Chambers applications are to be no more than 30 minutes.

            </div>
        </div>

<!-- <name-of-applying-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1.2rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Name(s) of the party(ies) bringing the application</b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.applicantParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <name-of-responding-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Name(s) of responding party(ies) to be served <br/>with the application</b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.respondentParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <hearing-location-address> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    <b>Location where the application will be heard</b><br/>
                    <i style="font-size:8.7pt;">Enter the address of the courthouse.</i>
                </div>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">
                    {{result.hearingLocation.name}}<br> 
                    <b v-html="result.hearingLocation.address">{{result.hearingLocation.address}}</b><br>
                    {{result.hearingLocation.postalCode}}
                </div>                       
            </div> 
        </div>

<!-- <date-of-hearing> -->
        <div class="row mt-3" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:0.29rem 0; line-height:1.25rem; height:2.5rem;">
                <b class="ml-2">Date the application will be heard</b>
            </div>

            <div class="arrow-right-flash-25"></div>

            <div style="width:1.65%;"></div>

            <div style="width:20%;">           
                
                <div class="coa-text-box-center" style="font-weight: 700; height:3rem; margin:0.1rem 0 0 0; ">
                    <div class="mx-2" style="height:3rem; margin:1.75rem 0 0 0;">{{result.hearingDate | beautify-date-dd/mm/yyyy}}</div>                    
                </div>
                <div >
                    <div class="arrow-up-flash"></div>
                    <div class="arrow-up-box"></div>               
                    <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
                </div> 

            </div>         
            
            <div style="width:5%;"></div>
            
            <div class="coa-text-box-center" style="width:20%; height:3rem; margin:0.1rem 0 0 0; text-align:center; background: #E8E8E8; border: 1px solid #E8E8E8;">
                Chambers applications begin at 9:30 am.
            </div>            

        </div>

<!-- <rule-sections> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="line-height: 1rem; width:28%; margin:.4rem 0; height:9.15rem;">
                <div class="ml-2">
                    <b> Enter the section(s) or rule(s) that you are relying on for your application</b>
                    <i style="line-height: 0.1rem;">
                        <br>E.g., If you are applying for leave to appeal, enter 
                        “Section 31 of the Court of Appeal Act”. If you are applying 
                        for a stay of proceedings, enter “Section 33 of the Court 
                        of Appeal Act”. 
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-80"></div> 

            <div class="coa-text-box-left" style="width:64%;">                
                <div class="ml-2" style="font-weight: 700;">
                    {{result.relyingSectionRule}}
                </div>
            </div>

        </div>  

<!-- <seeking-order> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="line-height: 1rem; width:28%; margin:.5rem 0; height:9.0rem;">
                <div class="ml-2">
                    <b> Enter the order that you are seeking</b>
                    <i>
                        <br>E.g., “stay of proceedings” or “extension of time to file an appeal book” 
                        and any request with respect to costs. If you are seeking leave to appeal, 
                        enter “leave to appeal the order of _________.” 
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-80"></div> 

            <div class="coa-text-box-left" style="width:64%;">                
                <div 
                    class="ml-2" 
                    style="font-weight: 700;" 
                    v-html="result.orderDetails">
                </div>
            </div>

        </div>

<!-- <book-required> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.35rem 0; line-height:1.05rem; height:6rem;">
                <div class="ml-2">
                    <b>Is an application book required?</b>
                    <i>
                        <br>See Rule 13 for leave applications and Division 2 of 
                        Part 9 of the Rules for other applications. 
                    </i>
                </div>
            </div>

            <div class="arrow-right-flash-54"></div>           
            
            <div style="width:2%;"></div>

            <div style="width:20%; margin-top: 2.65rem;">                  
                <check-box 
                    style="margin-left:0.2rem;"
                    :check="(result.bookRequired)?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Yes"/> 
            </div>
                
            <div style="width:5%;"></div>       
            
            <div style="width:25%; margin-top: 2.65rem;">
            <check-box 
                style="margin:0;" 
                :check="(!result.bookRequired)?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/> 
            </div>           
            
        </div>

<!-- <affidavits> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:9rem;">
                <div class="ml-2">
                    <b>
                        If you are not required to file an application book, list 
                        the affidavit(s) in support of this application
                    </b>
                    <i>
                        <br>Enter the name of each person whose affidavit is being filed 
                        and the date each affidavit was sworn. 
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-80"></div> 

            <div class="coa-text-box-left" style="width:64%;"> 
                <div v-if="result.bookRequired" class="ml-2" style="font-weight: 700;"></div>               
                <div v-else class="ml-2" style="font-weight: 700;">
                    <div v-for="affidavit,inx in result.affidavitList" :key="inx" style="text-indent:10px;display:inline;">
                        <div style="display:inline-block;"> Affidavit by {{affidavit.name}} sworn on {{affidavit.date | beautify-date}} </div>
                    </div>
                </div>                
            </div>

        </div>

<!-- <contested> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:1.25rem; height:4.5rem;">
                <div class="ml-2">
                    <b>The applicant anticipates that this application will be…</b>
                    <i><br>Check only one.</i>
                </div>
            </div>

            <div class="arrow-right-flash-45"></div>           
            
            <div style="width:2%;"></div>

            <div style="width:20%; margin-top: 2rem;">                  
                <check-box 
                    style="margin-left:0.2rem;"
                    :check="(result.applicationContested)?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Contested"/> 
            </div>
                
            <div style="width:5%;"></div>       
            
            <div style="width:25%;margin-top: 2rem;">
                <check-box 
                    style="margin:0;" 
                    :check="(!result.applicationContested)?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Uncontested"/> 
            </div>           
            
        </div>

<!-- <email-addresses> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.35rem 0; height:6rem;">
                <div class="ml-2">
                    <b> Email address(es) for service of applicant(s)</b>
                    <i>
                        <br>If you provide an email address, you consent 
                        to have documents served on you by email.
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-54"></div> 

            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.emailAddresses}}</div>                       
            </div>

        </div> 

<!-- <Sign-Date> -->
        <div class="row mt-5" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:19%; margin:0.5rem 0; line-height:0.75rem;  height:2rem;">
                <div class="ml-2"> Date form completed</div>
            </div>
            <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->      

            <div class="coa-text-box-center" style="width:15%; font-weight: 700;">{{result.completionDate}}</div> 
            
            <div style="width:3.28%;"></div>
            
            <div class="coa-arrow-box-left" style="width:25%; margin:0.5rem 0; line-height:0.95rem;  height:2.15rem;">
                <div class="ml-2">Name of lawyer or party authorizing filing of this form.</div>
            </div>
            <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->

            <div class="coa-text-box-center" style="width:25%; font-weight: 700;"> {{result.authorizedName}}</div>
                
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
import { form4DataInfoType } from '@/types/Information/Form4';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form4Layout extends Vue {

    @Prop({required:true})
    result!: form4DataInfoType;

    dataReady = false;
    rules = '';

    mounted(){
        this.dataReady = false;
        // if (this.result.selfRepresented){

        //     const ruleList = [];
        //     for (const rule of this.result.relyingSectionRule){                
        //         if (rule == 'Other' && this.result.otherRelyingSectionRule){
        //             ruleList.push(this.result.otherRelyingSectionRule);
        //         } else {
        //             ruleList.push(rule);
        //         }
        //     }
        //     this.rules = ruleList.join(', ');

        // } else {
        //     this.rules = this.result.lawyerRelyingSectionRule;
        // }
        this.dataReady = true;
    }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>