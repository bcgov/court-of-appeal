<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 2</b></div>
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF APPEARANCE (RULES 7(1), 8(a), 10(1) )</b></div>
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
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first appellant named on Form 1: Notice of Appeal.</i></div> 
                        <div style="width:5.5%; padding: 0; margin:0.5rem 0 0 0;"></div>
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first respondent named on Form 1: Notice of Appeal.</i></div>
                    </div>
                    
                </div>
            </div>
        </div>      

<!-- <name-of-parties-filing-notice-of-appearance> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Name(s) of party(ies) filing the notice of appearance</b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.filingParties.join(', ')}}</div>                       
            </div>
        </div>

<!-- <address> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:6.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    
                    <b>Name(s) and address(es) within BC for service of party(ies).</b>
                    <i>
                        If you have a lawyer, include the law firm's address; 
                        otherwise provide another address for service.
                    </i>
                </div>                
            </div>

            <div class="arrow-right-flash-62"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2" v-html="result.contactAddress"></div>
            </div>                       

        </div>         

<!-- <phone> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="font-weight: 600; line-height:1.1rem;">
                   
                    Phone number(s) of the party(ies) filing the notice of appearance
                  
                </div>                
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2" v-html="result.phones"></div>
            </div> 
        </div> 

<!-- <email> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:6.5rem;">
                <div class="ml-2" style="line-height:1.1rem;">
                    <b>
                        Email address(es) for service of party(ies)
                    </b> 
                    <i >
                        If you provide an email address, you consent to have documents served on you by email.
                    </i>               
                </div>
            </div>

            <div class="arrow-right-flash-62"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
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

         <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0; text-align: left; padding: 0.5rem;">
            <b>To the party completing this form: </b>
            The other parties to this appeal are entitled to rely on the address for 
            service you have provided on this Notice of Appearance unless you change 
            your address for service by filing and serving a Change of Address for 
            Service in Form 18.                
        </div>
       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form2DataInfoType } from '@/types/Information/Form2';

@Component
export default class Form2Layout extends Vue {

    @Prop({required:true})
    result!: form2DataInfoType;
   
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>