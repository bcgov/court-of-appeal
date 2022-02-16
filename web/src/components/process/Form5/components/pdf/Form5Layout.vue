<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 5</b></div>
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF HEARING OF APPEAL: RULE 33(2), 34(2)</b></div>
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

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the party(ies) filing the Notice of Hearing of Appeal:
                </div>
                <div>
                    <b>You are required to attach a copy of the orders under appeal 
                    to this form.</b> The court will review any appeal set for one 
                    day or longer and may adjust the length.
                </div>
            </div>

        </div>        

<!-- <address> -->
        <div class="row mt-2" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Address of the courthouse where the appeal will be heard</b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2">{{result.courtHouse}}</div>                       
            </div>

        </div>

<!-- <date> -->
        <div class="row mt-2" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:0.25rem; height:1.5rem;">
                <b class="ml-2">Date the appeal will be heard</b>
            </div>

            <div class="arrow-right-flash-20"></div>

            <div style="width:2.35%;"></div>

            <div class="coa-text-box-center" style="width:20%; text-align:center">{{result.dateOfAppealHearing | beautify-date-dd/mm/yyyy}}</div>           
            
            <div style="width:10%;"> 
                <div class="mt-2"  style="text-align:center" >at</div> 
            </div>
            
            <div class="coa-text-box-center" style="width:20%; text-align:center;">{{result.timeOfAppealHearing | beautify-time-am-pm}}</div>
            
            <div style="width:14.25%;"></div>  

        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt;">
            <div style="width:36%;"></div>
            <div style="width:20%">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div>
                

<!-- <estimated-length> -->
        <div class="row" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:1.1rem; height:3.5rem;">
                <div class="ml-2">
                    <b style="font-size:8.15pt; margin:0; padding:0;">Estimated length of appeal in days</b> <br>
                    <i>The default length for an appeal is half a day.</i>
                </div>
            </div>

            <div class="arrow-right-flash-36 "></div> <!-- < width ~ 8% > -->

            <div style="width:30%; text-align:center; margin-top:1rem;">
                <div class="coa-text-box" >{{result.numberOfDaysApp}}</div> 
                <div style="">Appellant’s estimate</div> 
            </div> 

            <div style="width:4%;"> </div>

            <div style="width:30%; text-align:center; margin-top:1rem;">
                <div class="coa-text-box" >{{result.numberOfDaysResp}}</div>
                <div>Respondent’s estimate</div>
            </div>
        </div>
      

<!-- <ACK> -->
        <div 
            class="row coa-help-box" 
            style="margin:0.5rem -9px 0 -9px; line-height:0.5rem; font-size: 10pt; text-align: left;">
            I agree to pay all hearing fees payable under Item 5 of Division 1 of Schedule 2-Court Fees.
        </div>


<!-- <Sign-Date> -->
        <div class="row mt-4" style="font-size: 9pt;">
            
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
import { form5DataInfoType } from '@/types/Information/Form5';
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Form5Layout extends Vue {

    @Prop({required:true})
    result!: form5DataInfoType;    
   
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>