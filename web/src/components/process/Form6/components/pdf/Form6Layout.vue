<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 6</b></div>
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF SETTLEMENT OR ABANDONMENT: RULE 46</b></div>
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
                    To the appellant(s):
                </div>
                <div>
                    A person or party who abandons an appeal may be liable for the costs associated with the appeal.
                </div>
            </div>

        </div>

<!-- <name-of-parties> -->
        <div class="row" style="font-size: 9pt; margin:1rem -1rem 1rem 0">

            <div class="coa-help-box pd-est" style="line-height:1rem; padding-top:0.1rem; margin:.5rem 0 0.5rem -0.5rem; width:28%; height:3.5rem;">
                <b>Name of the party(ies) who wish to abandon an appeal or cross appeal</b>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>
                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{result.abandoningParties.join(', ')}}</div>                       

        </div>

<!-- <abandoning-type> -->
        <div class="row" style="font-size: 9pt; margin:1rem -1rem 1rem 0">

            <div class="coa-help-box pd-est-sm" style=" width:28%; margin:0.45rem 0 0rem -0.5rem; line-height:0.25rem; height:1.5rem;">
                <b>The party is abandoning an ...</b>
            </div>

            <div class="arrow-right-flash-20 mg-rg-2-5" style="width:0.05%;"></div>           
                                    
            <check-box 
                style="width:8%; margin: .5rem 0 0 2rem;" 
                :check="(result.abandonType == 'Appeal')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Appeal"/> 
                
            <div style="width:5%; margin: .5rem 0 0 2.5rem;"> or </div>       
            
            <check-box 
                style="width:27%; padding: 0; margin: .5rem 0 0 5rem;" 
                :check="(result.abandonType == 'Cross Appeal')?'yes':''"
                shiftmark="10" 
                marginLeft="0.5rem"
                text="Cross Appeal"/>            
            
        </div>

<!-- <name-of-parties-abandoning-against> -->
        <div class="row" style="font-size: 9pt; margin:1rem -1rem 1rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:3.5rem;">
                <b>Which party(ies) are you abandoning against?</b>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>
                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{result.abandoningAgainstParties.join(', ')}}</div>                       

        </div>

<!-- <name-of-judge> -->
        <div class="row" style="font-size: 9pt; margin:1rem -1rem 1rem 0">

            <div class="coa-help-box pd-est-lg" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:5.5rem;">
                <div style="font-weight: 700;">
                    Who made the order?
                </div>
                <div style="font-style: italic;">
                    Name the justice or other decision maker who pronounced the order you are abandoning.
                </div>
            </div>
            <div class="arrow-right-flash-54" style="width:0.05%;"></div>                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{result.judgeName}}</div>                       

        </div>  

<!-- <date-pronounced> -->
        <div class="row" style="font-size: 9pt; margin: 2rem -1rem 0rem 0;">
            
            <div class="coa-help-box pd-est" style="width:28%; padding-top:0.25rem; line-height:1rem; margin:.5rem 0 0.5rem -0.5rem;  height:3.5rem;">
                <div style="font-weight: 600;">
                    Date the order under appeal was pronounced
                </div>
                <div style="font-style: italic;font-size: 8.5pt;">
                    Not the date the order was entered.
                </div>                
            </div>
            <div class="arrow-right-flash-36" style="width:3.5%;"></div>       

            <div class="coa-text-box" style="width:25%; padding:0rem 0.5rem; display:flex; align-items:center; justify-content:center; text-align:center;">{{result.orderDate | beautify-date-dd/mm/yyyy}}</div>           
                
        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt; margin: 0;"> 
            <div class="mg-lf-17" style="margin-left:19.25rem; padding:0rem 0rem; border: 0px solid white;">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box mg-lf-0" style="margin-left:1rem; width:7rem;height:1.25rem;text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div> 

<!-- <date-initiating> -->
        <div class="row" style="font-size: 9pt; margin: 2rem -1rem 0rem 0;">
            
            <div class="coa-help-box pd-est" style="line-height:1.1rem; padding-top:0.15rem; margin:.5rem 0 0.5rem -0.5rem; width:28%; height:5.75rem;">
                <div style="font-weight: 700;">
                    Date initiating document in the appeal or cross appeal you are abandoning was filed
                </div>
                <div style="font-style: italic;">
                    Notice of Appeal/Form 1 or Notice of Cross Appeal/Form 3.
                </div>
                <b></b>
            </div>
            <div class="arrow-right-flash-54" style="width:3.5%;"></div>       

            <div class="coa-text-box" style="width:25%;padding:0rem 0.5rem; display:flex; align-items:center; justify-content:center; text-align:center;">{{result.initiatingDocumentDate | beautify-date-dd/mm/yyyy}}</div>           
                
        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt; margin: 0;"> 
            <div class="mg-lf-17" style="margin-left:19.25rem; padding:0rem 0rem; border: 0px solid white;">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box mg-lf-0" style="margin-left:1rem; width:7rem;height:1.25rem;text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div>  

        
<!-- <Sign-Date> -->
        <div class="row" style="font-size: 9pt; margin: 2rem -1rem 0rem 0;">
            
            <div class="coa-help-box pd-est-sm w-18-5" style="width:17.5%; margin:0.55rem 0 0rem -0.5rem; line-height:0.75rem;  height:2rem;">
                Date form completed
            </div>
            <div class="arrow-right-flash-25 mg-rg-3" style="width:3.5%;"></div>       

            <div class="coa-text-box w-18-5" style="width:15%; margin-left:-2.5rem; padding:0rem 0.5rem; display:flex; align-items:center; justify-content:center; text-align:center;">{{result.completionDate}}</div> 

            
            <div class="coa-help-box w-25-5" style="width:24.5%;padding:0.1rem 0.2rem; margin:0.42rem 0 0rem 0.5rem; line-height:0.95rem;  height:2.15rem;">
                Name of lawyer or party authorizing filing of this form.
            </div>
            <div class="arrow-right-flash-25 mg-rg-3" style="width:3.5%;"></div> 

            <div class="coa-text-box" style="width:24%; text-align:center; margin:0 -1.1rem 0 -2.5rem;"> {{result.authorizedName}}</div>
                
        </div>

<!-- <date-help>-->
        <div class="row" style="font-size: 9pt; margin:0rem 0 0 0;"> 
            <div class="mg-lf-9" style="margin-left:9.25rem; padding:0rem 0rem; border: 0px solid white;">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box mg-lf-0" style="margin-left:1rem; width:7rem;height:1.25rem;text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div> 
       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form6DataInfoType } from '@/types/Information/Form6';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form6Layout extends Vue {

    @Prop({required:true})
    result!: form6DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>