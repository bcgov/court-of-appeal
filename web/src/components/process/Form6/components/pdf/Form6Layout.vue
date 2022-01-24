<template>
    <div>

        <div>
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 1rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div class="col-md-3" style="font-size:20pt; background: black; color: white;"><b>FORM 6</b></div>
                <div class="col-md-9" style="font-size:12pt;"><b>NOTICE OF SETTLEMENT OR ABANDONMENT: RULE 46</b></div>
            </div>         
        </div> 

        <div style="margin: 1rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

            <div class="my-3 row" > 
                <div class="col-md-3">
                    <div style="border: 1px solid #D8D8D8; width: 7rem; height: 10rem; margin: 2rem 2rem; padding-top: 4rem;">
                        [STAMP]
                    </div>
                </div>

                <div class="col-md-5" >
                    <div class="row" style="float:right; margin-right: 0.5rem;">Court of Appeal File No.</div>
                    <div class="row" style="margin-top: 7.75rem; max-width: 100%;">
                        <div class="col-md-11" style="border: 1px solid black;">{{result.firstAppellant}}</div> 
                        <div class="col-md-1" style="padding: 0; margin-right: 0;">v.</div>
                    </div>
                    <div style="margin: 0 0 -15px -45px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="max-width: 100%; font-style: italic;">
                        <div class="col-md-11" style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8;">
                            Name of the first appellant named on Form 1: Notice of Appeal.
                        </div> 
                        <div class="col-md-1"></div>                        
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="row" style="border: 1px solid black; max-width: 100%;">{{result.formSevenNumber}}</div>
                    <div style="margin: 0 0 -15px -15px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 100%; font-style: italic;">
                        The file number can be found on the upper right corner of the Notice of Appeal.
                    </div>

                    <div class="row" style="margin-top: 0.5rem; border: 1px solid black; max-width: 100%;">{{result.firstRespondent}}</div>
                    <div style="margin: 0 0 -15px -15px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                    <div style="margin: 0 -15px 0 -15px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 100%; font-style: italic;">
                        Name of the first respondent named
                        on Form 1: Notice of Appeal.
                    </div>
                </div>

            </div>

            <div style="border: 1px solid #D8D8D8; background: #D8D8D8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the appellant(s):
                </div>
                <div>
                    A person or party who abandons an appeal may be liable for the costs associated with the appeal.
                </div>
            </div>

        </div>        

        <div class="my-3 row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin-left: 0; border: 1px solid #D8D8D8; background: #D8D8D8; font-weight: 700; max-width: 90%; padding: 0.5rem;">
                            Name of the party(ies) who wish to abandon an appeal or cross appeal
                    </div>
                    <div style="margin: 7px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-8" style="border: 1px solid black; padding: 0.5rem;">{{result.abandoningParties.join(', ')}}</div>
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.25rem; font-weight: 700;">                        
                        The party is abandoning an ...
                    </div>
                    <div style="margin: -5px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-4"> 
                <div class="row">              
                    <check-box 
                        style="margin: 5px 0 0 20px; width: 70%;" 
                        :check="(result.abandonType == 'Appeal')?'yes':''" 
                        shiftmark="1" 
                        marginLeft="0.5rem"
                        text="Appeal"/> 
                    <div style="margin: 5px 0 0 0;">or</div>
                </div>
            </div>
            <div class="col-md-4">
                    
                <check-box 
                    style="padding: 0; margin: 5px 0 0 0; width: 80%;" 
                    :check="(result.abandonType == 'Cross Appeal')?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Cross Appeal"/>
                
            </div>
        </div>

        <div class="my-3 row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin-left: 0; border: 1px solid #D8D8D8; background: #D8D8D8; font-weight: 700; max-width: 90%; padding: 0.5rem;">
                            Which party(ies) are you abandoning against?
                    </div>
                    <div style="margin: 7px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-8" style="border: 1px solid black; padding: 0.5rem;">{{result.abandoningAgainstParties.join(', ')}}</div>
        </div>

        <div class="my-3 row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin-left: 0; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 90%; padding: 0.5rem;">
                            <b>Who made the order?</b><br>
                            <i>Name the justice or other decision maker who pronounced the order you are abandoning.</i>
                    </div>
                    <div style="margin: 25px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-8" style="border: 1px solid black; padding: 0.5rem;">{{result.judgeName}}</div>
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.5rem;">
                            <b>Date the order under appeal was pronounced</b><br>
                            <i>Not the date the order was entered.</i>
                    </div>
                    <div style="margin: 15px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-4">
                <div style="margin: 17px -15px 0 -15px; border: 1px solid black; max-width: 100%; padding: 0.5rem; text-align: center;">{{result.orderDate}}</div>
                <div style="margin: 0 0 -15px 75px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                <div style="margin: 0 -15px 0 5px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 80%; font-style: italic; padding: 0.5rem; text-align: center;">
                    DD/MM/YYYY
                </div>
                
            </div>
           
        </div>

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4">
                <div class="row">
                    <div 
                        style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.5rem;">
                            <b>Date initiating document in the appeal or cross appeal you are abandoning was filed</b><br>
                            <i>Notice of Appeal/Form 1 or Notice of Cross Appeal/Form 3.</i>
                    </div>
                    <div style="margin: 35px 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-4">
                <div style="margin: 35px -15px 0 -15px; border: 1px solid black; max-width: 100%; padding: 0.5rem; text-align: center;">{{result.initiatingDocumentDate}}</div>
                <div style="margin: 0 0 -15px 75px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                <div style="margin: 0 -15px 0 5px; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 80%; font-style: italic; padding: 0.5rem; text-align: center;">
                    DD/MM/YYYY
                </div>
                
            </div>
           
        </div>        

        <div class="row" style="font-size: 9pt; margin: 15px -15px 0 -15px;">
            <div class="col-md-4" >
                <div class="row">
                    <div 
                        style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.75rem;">
                            Date form completed
                    </div>
                    <div style="margin: 0 0 -5px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                </div>                   
            </div>
            <div class="col-md-3">
                
                <div style="margin: 0 -15px 0 -15px; border: 1px solid black; max-width: 100%; padding: 0.75rem; text-align: center;">{{result.completionDate}}</div>
                <div style="margin: 0 0 -15px 45px; color: #D8D8D8; font-weight: 1000; font-size: 20pt;">&#8613;</div>
                <div style="margin: 0; border: 1px solid #D8D8D8; background: #D8D8D8; max-width: 80%; font-style: italic; padding: 0.5rem; text-align: center;">
                    DD/MM/YYYY
                </div>
                
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-6" style="padding: 0;">
                        <div class="row">
                            <div 
                                style="margin: 0 0 0 -10px; border: 1px solid #D8D8D8; background: #D8D8D8; width: 90%; padding: 0.25rem; font-size: 8pt;">
                                    Name of lawyer or party authorizing filing of this form.
                            </div>
                            <div style="margin: 0 0 -15px -5px; color: #D8D8D8; font-weight: 1000; font-size: 18pt;">&#10145;</div>
                        </div> 
                    </div>
                    <div class="col-md-6" style="margin: 0; border: 1px solid black; max-width: 80%; padding: 0.5rem; text-align: center;">{{result.authorizedName}}</div>
                </div>
                
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