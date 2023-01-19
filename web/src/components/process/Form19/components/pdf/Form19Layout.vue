<template>
    <div v-if="dataReady">

        <!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 19</b></div>
                <div style="width:75%; font-size:14pt;"><b>
                    NOTICE OF WITHDRAWAL OF LAWYER: <i>(RULE 87(1))</i>
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


<!-- <lawyer-name> -->   
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0;  height:3.5rem;">
                <div class="ml-2" style="font-weight: 600;">
                    Name of lawyer seeking to withdraw                    
                </div>                
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{lawyerName}}</div>
            </div>                       

        </div> 

<!-- <parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="font-weight: 600;">
                    Name(s) of person(s) the lawyer represents
                </div>               
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{parties}}</div> 
            </div>                      

        </div> 


<!-- <address> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="font-weight: 600; line-height:1.1rem;">
                    Last known address(es) for the person(s) the lawyer represents
                </div>                
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.addresses}}</div>
            </div>                       

        </div> 

        

<!-- <phone> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="font-weight: 600; line-height:1.1rem;">
                    Last known phone number(s) of person(s) the lawyer represents
                </div>                
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.phoneNumbers}}</div>
            </div>                       

        </div> 

        <div class="new-page" />

<!-- <email> -->
        <div class="row" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2" style="font-weight: 600; line-height:1.1rem;">
                    Last known email(s) for the person(s) the lawyer represents
                </div>                
            </div>

            <div class="arrow-right-flash-36"></div><!-- < width ~ 8% > -->
                    
            <div class="coa-text-box-left" style="width:64%; font-weight: 700;">
                <div class="ml-2">{{result.emailAdresses}}</div>
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

        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0rem; text-align: left; padding: 0.5rem;">
            <div style="margin-bottom: 0.75rem;">
                <b>To the person(s) receiving this notice of withdrawal:</b><br>
                If you object to the lawyer’s withdrawal from this proceeding, you may file and serve an objection in Form 20 not more than
                seven days after being served with this notice of withdrawal. If you do not file an objection within the required timeline the
                lawyer will be removed from the record.<br><br>
                If no objection is filed, the other parties to the proceeding may serve all further documents on you by mail to your last
                known address(es) noted above. If you wish to change your address for service, complete Part B of Form 18.
            </div>                
        </div>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form19DataInfoType } from '@/types/Information/Form19';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form19Layout extends Vue {

    @Prop({required:true})
    result!: form19DataInfoType;

    dataReady = false;
    lawyerName = '';
    parties = '';

    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo(){

        if (this.result.withdrawingLawyerName == 'Other'){
            this.lawyerName = this.result.withdrawingLawyerNameOther;
        } else {
            this.lawyerName = this.result.withdrawingLawyerName;
        }

        this.parties = this.result.representingParties.join(', ');
           
    }

    
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>