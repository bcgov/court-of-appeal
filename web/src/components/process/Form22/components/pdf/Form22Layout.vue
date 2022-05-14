<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>Form 22</b></div>               
                <div style="width:75%; font-size:14pt;">
                    <b>APPLICATION FOR ORDER THAT NO FEES ARE PAYABLE <i>(RULE 85)</i></b>
                </div>
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

                    <div class="row" style="margin-top: 0.5rem;">
                        <div class="coa-text-box" style="width:40%; font-weight: 700;">{{result.firstAppellant}}</div> 
                        <div style="width:5.5%; margin-top:0.5rem">v.</div>
                        <div class="coa-text-box" style="width:40%; font-weight: 700;">{{result.firstRespondent}}</div>
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
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first appellant named on FORM 1: Notice of Appeal.</i></div> 
                        <div style="width:5.5%; padding: 0; margin:0.5rem 0 0 0;"></div>
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first respondent named on FORM 1: Notice of Appeal.</i></div>
                    </div>
                    
                    
                </div>
            </div>

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the person(s) filing the application (the applicant):
                </div>
                <div style="margin-bottom: 0.75rem;">
                    To obtain an order that no court fees are payable, you must show that: 
                    (1) your appeal is not bound to fail; scandalous, frivolous or vexatious;
                    or an abuse of court process; and (2) payment of court fees would cause 
                    you undue hardship.
                </div>
                <div style="margin-bottom: 0.75rem;">
                    If you meet the income and assets criteria in Part B, you meet the 
                    financial hardship criteria. If not, you can complete Part C and 
                    argue at the hearing that there are special financial circumstances 
                    that establish undue hardship, or you can abandon your application.
                </div>
                <div style="margin-bottom: 0.75rem;">
                    This is a “without notice” application. You do not need to serve 
                    this form on any other parties and they do not need to attend the 
                    application hearing.                    
                </div>
            </div>

        </div>

<!-- <name-of-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">
                    Name(s) of person(s) bringing the application
                </b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.applyingParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <PART A> -->
        <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
            <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 600;"><b class="mr-3">PART A:</b> BASIS FOR BRINGING THE APPEAL</div>

            <!-- <orders> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.5rem 0; height:5.8rem;">
                    <div class="ml-2">
                        <b>Order(s) you are seeking on appeal</b>
                        <i style="font-size:8.7pt;">
                            <br>Briefly list the order(s) you will ask
                                this court to make on appeal.
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="background:#FFF; width:63.25%; font-weight: 700;">
                    <div class="ml-2">{{result.orders}}</div>                       
                </div> 
            </div>

            <!-- <grounds> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.25rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.45rem 0; height:7.3rem;">
                    <div class="ml-2">
                        <b>Grounds of appeal</b>
                        <i>
                            <br>Be as specific as possible. 
                            <span style="font-size:8.25pt;">For example, if you believe the trial
                            judge used an incorrect legal test or otherwise misapplied the law,
                            note that here.
                            </span>
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-66" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="background:#FFF; width:63.25%; font-weight: 700;">
                    <div class="ml-2">{{result.grounds}}</div>                       
                </div> 
            </div>            
        </div>

<!-- <PART B> -->
        <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
            <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">PART B:</b> INCOME AND ASSETS</div>

            <!-- <part-of-order-cross-appealed> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.3rem 0; height:6.1rem;">
                    <div class="ml-2">
                        <b>Check the applicable boxes</b>
                        <i style="font-size:8.8pt;">
                            <br>If the income or assets criteria do not apply, you must complete
                                Part C or abandon your application. 
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54" style="border-left-color: #FFF;"></div>
                        
                <div style="width:63.25%; margin:0;"> 
                    <b>Income</b>                 
                    <check-box 
                        style="margin-left:1rem;"
                        :check="(result.income == 1)?'yes':''" 
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="1-3 household members - My gross household income is less than $60,000"/> 
                    <check-box 
                        style="margin-left:1rem;" 
                        :check="(result.income == 2)?'yes':''"
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="4 or more household members - My gross household income is less than $84,000"/> 
                    <b>Assets</b>                 
                    <check-box 
                        style="margin-left:1rem;"
                        :check="(result.assets)?'yes':''" 
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="The value of my household assets, after subtracting any outstanding debt owing on them, is less than $10,000"/> 
                </div>
                
            </div>
                     
        </div>

<!-- <PART C> -->
        <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
            <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">PART C:</b> FINANCIAL CIRCUMSTANCES</div>

            <!-- <financial> -->
            <div class="row mt-1" style="font-size: 9pt; margin: 0.5rem 0.5rem;">

                <div class="coa-arrow-box-left" style="background:#FFF; width:28%; line-height:1rem; margin:.3rem 0; height:8.7rem;">
                    <div class="ml-2">
                        <b>Special financial circumstances</b>
                        <i style="font-size:8.8pt;">
                            <br>Be as specific as possible about your financial circumstances. For example,
                            if you have recently lost employment or have a large number of
                            dependants note that here.
                        </i>
                    </div>
                </div>

                <div class="arrow-right-flash-54" style="border-left-color: #FFF;"></div>
                        
                <div class="coa-text-box-left" style="width:63.25%; background:#FFF; font-weight: 700;">
                    <div v-if="result.assets == false && result.income == 0" class="ml-2">{{result.finances}}</div>                       
                </div> 
            </div>
                       
        </div>

        <!-- <hearing-location-address> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    <b>Location of hearing</b><br/>
                    <i style="font-size:8.7pt;">Enter the address of the courthouse.</i>
                </div>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">
                    
                </div>                       
            </div> 
        </div>

<!-- <date-of-hearing> -->
        <div class="row mt-3" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:0.29rem 0; line-height:1.25rem; height:2.5rem;">
                <b class="ml-2">Date hearing will take place</b>
            </div>

            <div class="arrow-right-flash-25"></div>

            <div style="width:1.65%;"></div>

            <div style="width:20%;">           
                
                <div class="coa-text-box-center" style="font-weight: 700; height:3rem; margin:0.1rem 0 0 0; ">
                    <div class="mx-2" style="height:3rem; margin:1.75rem 0 0 0;"></div>                    
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

<!-- <Sign-Date> -->
        <div class="row mt-5" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:19%; margin:0.5rem 0; line-height:0.75rem;  height:2rem;">
                <div class="ml-2"> Date form completed</div>
            </div>
            <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->      

            <div class="coa-text-box-center" style="width:15%; font-weight: 700;">{{result.completionDate}}</div> 
            
            <div style="width:3.28%;"></div>
            
            <div class="coa-arrow-box-left" style="width:25%; margin:0.5rem 0; line-height:0.95rem;  height:2.15rem;">
                <div class="ml-2">Name of lawyer or person authorizing filing of this form</div>
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
import { form22DataInfoType } from '@/types/Information/Form22';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form22Layout extends Vue {

    @Prop({required:true})
    result!: form22DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>