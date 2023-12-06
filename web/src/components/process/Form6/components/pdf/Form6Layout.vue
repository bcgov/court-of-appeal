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
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF SETTLEMENT OR ABANDONMENT: <i>(RULE 46)</i></b></div>
            </div>
        </div>

        <!-- <stamp-info-box> -->
        <div style="margin: 0.75rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

            <div class="my-2 row">
                <div style="width:30%;">
                    <div style="border: 1px solid #E8E8E8; width: 9rem; height: 9rem; margin: 2rem 2rem; text-align:center; line-height:8.5rem;">
                        [STAMP]
                    </div>
                </div>

                <div style="width:70%;">
                    <div class="row">
                        <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Court of Appeal File No.</div></div>
                        <div class="coa-text-box" style="width:40%; font-weight: 700;">{{result.formSevenNumber}}</div>
                    </div>

                    <div class="row">
                        <div style="width:45.5%; padding:0.5rem;"></div>
                        <div style="width:40%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                            <div class="arrow-up-flash"></div>
                            <div class="arrow-up-box"></div>
                        </div>
                    </div>

                    <div class="row">
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


                    <div class="row">
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
                    A party who abandons an appeal may be liable for the costs associated with the appeal.
                </div>
            </div>

        </div>

        <!-- <name-of-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Name(s) of party(ies) wishing to abandon an appeal or cross appeal</b>
            </div>

            <div class="arrow-right-flash-36"></div>

            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.abandoningParties.join(', ')}}</div>
            </div>
        </div>

        <!-- <abandoning-type> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:0.5rem 0; line-height:0.25rem; height:1.5rem;">
                <b class="ml-2">The party is abandoning an ...</b>
            </div>

            <div class="arrow-right-flash-20"></div>

            <div style="width:2%;"></div>

            <div style="width:20%; margin:0.5rem 0;">
                <check-box style="margin-left:1rem;"
                           :check="(result.abandonType == 'Appeal')?'yes':''"
                           shiftmark="1"
                           marginLeft="0.5rem"
                           text="Appeal" />
            </div>

            <div style="width:15%;margin:0.5rem 0;"> or </div>

            <div style="width:25%;margin:0.5rem 0;">
                <check-box style="margin: 0 ;"
                           :check="(result.abandonType == 'Cross Appeal')?'yes':''"
                           shiftmark="1"
                           marginLeft="0.5rem"
                           text="Cross Appeal" />
            </div>

        </div>

        <!-- <full or partial> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin: 0.5rem 0; height: 3rem;">
                <b class="ml-2">Is it a full or partial abandonment?</b>
            </div>

            <div class="arrow-right-flash-36"></div>

            <div style="width:2%;"></div>

            <div style="width:20%; margin:0.5rem 0;">
                <check-box style="margin-left:1rem;"
                           :check="(result.fullOrPartial == 'Full')?'yes':''"
                           shiftmark="1"
                           marginLeft="0.5rem"
                           text="Full" />
            </div>

            <div style="width:15%;margin:0.5rem 0;"> or </div>

            <div style="width:25%;margin:0.5rem 0;">
                <check-box style="margin: 0 ;"
                           :check="(result.fullOrPartial == 'Partial')?'yes':''"
                           shiftmark="1"
                           marginLeft="0.5rem"
                           text="Partial" />
            </div>

        </div>

        <!-- <which-sections-are-you-abandoning> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:5.5rem;">
                <div class="ml-2">
                    <b>Which section(s) of the appeal are you abandoning?</b>
                    <i style="font-size:8.5pt;"><br />If partial abandonment, list the sections of the appeal that you are abandoning. E.g., grounds of appeal.</i>
                </div>
            </div>

            <div class="arrow-right-flash-54"></div>

            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.sectionsAbandoned}}</div>
            </div>
        </div>

        <!-- <name-of-parties-abandoning-against> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:5.5rem;">
                <div class="ml-2">
                    <b>Which party(ies) are you abandoning against?</b>
                    <i style="font-size:8.5pt;"><br />If partial abandonment, list the party(ies) of the appeal that you are abandoning against.</i>
                </div>
            </div>

            <div class="arrow-right-flash-54"></div>

            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.abandoningAgainstParties.join(', ')}}</div>
            </div>
        </div>

        <!-- <name-of-judge> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; height:5.5rem;">
                <div class="ml-2">
                    <b> Who made the order?</b>
                    <i>
                        <br>Name the justice or other decision maker who pronounced the order you are abandoning.
                    </i>
                </div>
            </div>
            <div class="arrow-right-flash-54"></div>

            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.judgeName}}</div>
            </div>

        </div>


        <!-- <date-pronounced> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; line-height:1rem; height:3.5rem;">
                <div class="ml-2">
                    <b>Date the order under appeal was pronounced</b>
                    <i style="font-size:8.5pt;"><br>Not the date the order was entered.</i>
                </div>
            </div>
            <div class="arrow-right-flash-36"></div>

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


        <!-- <date-initiating> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; line-height:1.1rem; height:5.75rem;">
                <div class="ml-2">
                    <b>Date initiating document in the appeal or cross appeal you are abandoning was filed </b>
                    <i><br>Notice of Appeal: Form 1 or Notice of Cross Appeal: Form 3.</i>
                </div>

            </div>
            <div class="arrow-right-flash-54"></div>

            <div class="coa-text-box-center" style="width:25%; font-weight: 700;">{{result.initiatingDocumentDate | beautify-date-dd/mm/yyyy}}</div>

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