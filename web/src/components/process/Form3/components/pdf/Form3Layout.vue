<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 3</b></div>
                <div v-if="result.amending" style="width:75%; font-size:14pt;"><b>AMENDED NOTICE OF CROSS APPEAL RULE 9(a)</b></div>
                <div v-else style="width:75%; font-size:14pt;"><b>NOTICE OF CROSS APPEAL RULE 9(a)</b></div>
            </div>         
        </div>
       
<!-- <stamp-info-box> -->
        <div style="margin: 0.75rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

            <div class="my-2 row" > 
                <div style="width:30%; margin-top:-1.5rem;">
                    <div style="border: 1px solid #E8E8E8; width: 9rem; height: 9rem; margin: 2rem 2rem; text-align:center; line-height:8.5rem;">
                        [STAMP]
                    </div>
                </div>

                <div style="width:70%;">
                    <div class="row mt-2" >
                        <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Court of Appeal File No.</div></div>
                        <div class="coa-text-box" style="width:40%;  font-weight: 700;" >{{result.formSevenNumber}}</div>
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

            <div class="row" style="font-size: 12pt; margin:-1rem 0 0 0.75rem; font-weight: 600;">PARTIES TO THE APPEAL</div>

            <!-- <name-of-appellants> -->
            <div class="row mt-3" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:5.5rem;">
                    <div class="ml-2">
                        <b>Appellant(s)</b> 
                        <i>
                            <br>List the name(s) of the <br> appellant(s) named on <br> Form 1: Notice of Appeal
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54"></div>
                        
                <div class="coa-text-box-left" style="width:63.7%; font-weight: 700;">
                    <div class="ml-2">{{result.appellantNames}}</div>                       
                </div> 
            </div>

            <!-- <name-of-respondents> -->
            <div class="row mt-3" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:5.5rem;">
                    <div class="ml-2">
                        <b>Respondent(s)</b>
                        <i>
                            <br>List the name(s) of the respondent(s) named on <br> Form 1: Notice of Appeal
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54"></div>
                        
                <div class="coa-text-box-left" style="width:63.7%; font-weight: 700;">
                    <div class="ml-2">{{result.respondentNames}}</div>                       
                </div> 
            </div>

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the appellant(s) and any respondent(s) not cross 
                    appealing the order under appeal:
                </div>
                <div>
                    A court proceeding has been commenced against you in 
                    the Court of Appeal. See the final page of this form 
                    for details on how to respond.
                </div>
            </div>

        </div>

<!-- <name-of-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">
                    Name of the party(ies) who wish
                    to cross appeal the order under appeal.
                </b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.crossAppealingParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <1> -->
        <div class="row mt-3" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">1.</b> THE ORDER IN THE APPEAL YOU ARE CROSS APPEALING</div>

<!-- <REQUIRED> -->
        <div class="row mt-2" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:1rem; height:5.65rem;">
                <div class="ml-2">
                    <b style="font-size:8.55pt;">Is leave to cross appeal required?</b>
                    <i>
                        <br>Court of Appeal Rule 12 explains when you need leave to cross appeal. 
                            If you are unsure, check “Yes.”  
                    </i>
                </div>
            </div>

            <div class="arrow-right-flash-54"></div>           
            
            <div style="width:2%;"></div>

            <div style="width:30%; margin:2.75rem 0;">                  
                <check-box 
                    style="margin-left:1rem;"
                    :check="(result.crossAppealRequired)?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Yes"/> 
            </div>
            
            <div style="width:30%;margin:2.75rem 0;">
                <check-box 
                    style="margin: 0 ;" 
                    :check="(!result.crossAppealRequired)?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="No"/> 
            </div>           
            
        </div>

<!-- <name-of-judge> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:6rem;">
                <div class="ml-2">
                    <b> Who made the order?</b>
                    <i>
                        <br>Name the justice or other decision
                            maker who pronounced the order
                            in the appeal you are cross
                            appealing.
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-54"></div> 

            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.judgeName}}</div>                       
            </div>

        </div>  


<!-- <date-pronounced> -->
        <div class="row mt-2" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:.4rem 0; line-height:1rem; height:4.75rem;">
                <div class="ml-2">
                    <b>Date the order was pronounced</b>
                    <i style="font-size:8.5pt;"><br>Include the day, month and year that the order in the appeal you are cross appealing was pronounced.</i>
                </div>                
            </div>
            <div class="arrow-right-flash-45"></div>       

            <div class="coa-text-box-center" style="width:25%; font-weight: 700;">{{result.orderDate | beautify-date-dd/mm/yyyy}}</div>           
                
        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt;">
            <div style="width:36%;"></div>
            <div style="width:25%">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div>

<!-- <2> -->
        <div class="row" style="font-size: 12pt; margin:0.2rem 0.5rem 0.5rem 0.5rem; font-weight: 700;"><b class="mr-3">2.</b> RELIEF SOUGHT</div>

        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 9.5pt; margin: 0; text-align: left; padding:0.25rem 0.5rem;">
            <div>
                If leave to cross appeal is not required, fill out Part A. If you are seeking leave to cross appeal, fill out Part B.
            </div>
            
        </div>

<!-- <PART A> -->
        <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
            <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 600;"><b class="mr-3">PART A:</b> LEAVE NOT REQUIRED</div>

            <!-- <part-of-order-cross-appealed> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.5rem 0; height:5.8rem;">
                    <div class="ml-2">
                        <b>Part of the order being cross appealed</b>
                        <i style="font-size:8.7pt;">
                            <br>If you only want to cross appeal one part of an order, enter the part that is being cross appealed.
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="background:#FFF; width:63.25%; font-weight: 700;">
                    <div v-if="!result.crossAppealRequired" class="ml-2">{{result.partOfOrderCrossAppealed}}</div>                       
                </div> 
            </div>

            <!-- <seeking-order> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.25rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.45rem 0; height:7.3rem;">
                    <div class="ml-2">
                        <b>Order you are seeking on cross appeal</b>
                        <i>
                            <br>Briefly list the order(s) you will ask this court to make on cross appeal. 
                            <span style="font-size:8.25pt;">For example: “Set aside the trial judgment and order a 
                                new trial”. Include any order as to costs.
                            </span>
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-66" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="background:#FFF; width:63.25%; font-weight: 700;">
                    <div v-if="!result.crossAppealRequired" class="ml-2">{{result.seekingOrder}}</div>                       
                </div> 
            </div>            
        </div>

<!-- <PART B> -->
        <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
            <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">PART B:</b> SEEKING LEAVE TO APPEAL</div>

            <!-- <part-of-order-cross-appealed> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.3rem 0; height:6.1rem;">
                    <div class="ml-2">
                        <b>Part of the order being cross appealed</b>
                        <i style="font-size:8.8pt;">
                            <br>If you are only seeking leave to cross appeal one part of an order, enter the part that you are seeking leave to cross appeal.
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="width:63.25%; background:#FFF; font-weight: 700;">
                    <div v-if="result.crossAppealRequired" class="ml-2">{{result.partOfOrderLeaveCrossAppealed}}</div>                       
                </div> 
            </div>

            <!-- <grounds> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.4rem 0; height:7.4rem;">
                    <div class="ml-2">
                        <b>Grounds for leave to cross appeal</b>
                        <i style="font-size:8.5pt;">
                            <br>Be as specific as possible. For example, if you believe the trial judge used an incorrect legal test 
                            or otherwise misapplied the law, indicate that here.
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-66" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="width:63.25%; background:#FFF; font-weight: 700;">
                    <div v-if="result.crossAppealRequired" class="ml-2">{{result.groundsLeaveCrossAppeal}}</div>                       
                </div> 
            </div>            
        </div>

<!-- <3> -->
        <div class="row mt-3" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">3.</b> SERVICE</div>

        

        <!-- <self-represented> -->
        <div class="row mt-2" style="font-size: 9pt;  margin: 0.5rem 0.5rem;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:1rem; height:3.5rem;">
                <b class="ml-2">Are you representing yourself?</b>
            </div>

            <div class="arrow-right-flash-36"></div>           
            
            <div style="width:2%;"></div>

            <div style="width:30%; margin:1.5rem 0;">                  
                <check-box 
                    style="margin-left:1rem;"
                    :check="(result.selfRepresenting)?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Yes"/> 
            </div>
            
            <div style="width:30%;margin:1.5rem 0;">
            <check-box 
                style="margin: 0 ;" 
                :check="(!result.selfRepresenting)?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/> 
            </div>           
            
        </div>
        

        <!-- <addresses> -->
        <div class="row mt-3" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.45rem 0; height:7.3rem;">
                <div class="ml-2">
                    <b>Name(s) and address(es) within BC for service of the party(ies) filing cross appeal</b>
                    <i>
                        <br>If you have a lawyer, include the law firm’s address; otherwise provide your own residential address.
                    </i>
                </div>
            </div>

            <div class="arrow-right-flash-66"></div>
                    
            <div class="coa-text-box-left" style="width:63.5%; font-weight: 700;">
                <div class="ml-2" v-html="result.contactAddress"></div>                       
            </div> 
        </div>

        <!-- <phone-numbers> -->
        <div class="row mt-3" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Phone number(s) of party(ies) filing cross appeal</b>                    
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:63.5%; font-weight: 700;">
                <div class="ml-2" v-html="result.phones"></div>                       
            </div> 
        </div>

            <!-- <emails> -->
        <div class="row mt-3" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.35rem 0; height:6rem;">
                <div class="ml-2">
                    <b style="font-size:8.65pt;" >Email address(es) for service of party(ies) filing cross appeal</b>
                    <i>
                        <br>If you provide an email address, you consent to have documents served on you by email.
                    </i>
                </div>
            </div>

            <div class="arrow-right-flash-54"></div>
                    
            <div class="coa-text-box-left" style="width:63.5%; font-weight: 700;">
                <div class="ml-2" v-html="result.emails"></div>                       
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
                <div class="ml-2">Name of lawyer or party authorizing filing of this form</div>
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

        <div style="font-size: 9.75pt; margin: 1.5rem 0 0.5rem 0; text-align: justify; padding: 0.5rem;">
            
            <div>
                <b>If you intend to participate</b> in this cross appeal and you have not already filed a 
                Notice of Appearance in this matter in a Court of Appeal registry,<b> you must give notice</b> 
                of your intention to participate by filing a form entitled “Notice of Appearance” 
                (Form 2 of the Court of Appeal Rules) in a Court of Appeal registry and serve the Notice 
                of Appearance on the other parties to the appeal and cross appeal <b>not more than 10 days</b> 
                after receiving this Notice of Cross Appeal.
            </div>
        </div>
       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form3DataInfoType } from '@/types/Information/Form3';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form3Layout extends Vue {

    @Prop({required:true})
    result!: form3DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>