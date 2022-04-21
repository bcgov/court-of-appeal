<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 16</b></div>
                <div style="width:75%; font-size:14pt;"><b>OFFER TO SETTLE COSTS: RULE 76(1)</b></div>
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
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first appellant named on FORM 1: Notice of Appeal.</i></div> 
                        <div style="width:5.5%; padding: 0; margin:0.5rem 0 0 0;"></div>
                        <div class="coa-help-box" style="width:40%;"><i>Name of the first respondent named on FORM 1: Notice of Appeal.</i></div>
                    </div>
                    
                </div>
            </div>            

        </div>

        <div style="margin: 0.75rem -15px 0 -15px; border: 1px solid black; font-size: 10pt;">
            <div class="mx-3 mt-4">
                <underline-form 
                    style="display:inline-block;" 
                    textwidth="26rem" 
                    beforetext="To: " 
                    hint="party the offer to settle costs is addressed to" 
                    :italicHint="false" 
                    :text="result.offeringParties.join(', ')"/>
            </div>
            
            <div class="mx-3 mt-4">
                <underline-form 
                    style="display:inline-block;line-height:1rem;" 
                    textwidth="32rem" 
                    beforetext="The " 
                    hint="appellant/respondent, name of the party offering to settle costs" 
                    :italicHint="false" 
                    :text="result.receivingParties.join(', ')"
                />

                <div style="margin-left:0.25rem;;display:inline;line-height:2rem;" >
                    offers to settle costs in accordance 
                    with Schedule 1 of the Court of Appeal Rules in the amount of 
                </div>
                <underline-form 
                    style="display:inline-block;line-height:1rem;" 
                    textwidth="7rem" 
                    beforetext="$ " 
                    hint="" 
                    :italicHint="false" 
                    :text="result.amount"
                />
                .
            </div>
            
            <div class="mx-3 my-5">
                <underline-form 
                    style="display:inline-block;line-height:1rem;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="Date  (day / month / year) " 
                    :italicHint="false" 
                    :text="result.completionDate"
                />
            
                <underline-form 
                    style="margin-left:12rem; display:inline-block;line-height:1rem;" 
                    textwidth="20rem" 
                    beforetext="" 
                    hint="Party / Party’s Lawyer" 
                    :italicHint="false" 
                    :text="result.authorizedName"
                />
            </div>

        </div>       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { form16DataInfoType } from '@/types/Information/Form16';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox,
        UnderlineForm,          
    }
})
export default class Form16Layout extends Vue {

    @Prop({required:true})
    result!: form16DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>