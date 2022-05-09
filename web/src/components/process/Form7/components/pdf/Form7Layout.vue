<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 7</b></div>
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF URGENT APPLICATION: <i>(RULE 57(2))</i></b></div>
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

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the person(s) filing the notice of urgent application (the applicant):
                </div>
                <div>
                    In cases of urgency you may apply for permission to bring an application on shorter notice than is otherwise required under
                    the Court of Appeal Rules. You must obtain an urgent application hearing date from the registrar. Even in cases of urgency, you
                    must give notice and attempt to serve the application material on all parties.
                </div>
            </div>

        </div>

<!-- <name-of-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <b class="ml-2">Name of the person(s) bringing the urgent application</b>
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.filingParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <hearing-location-address> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.6rem 0; height:5.5rem;">
                <div class="ml-2">
                    <b>Location where the application will be heard</b>
                    <i>
                        <br>Enter the address of the courthouse. 
                    </i>
                </div>
            </div>           

            <div class="arrow-right-flash-54"></div>
                    
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
            
            <div class="coa-arrow-box-left" style="width:28%; margin:0.3rem 0; line-height:1.25rem; height:2.5rem;">
                <b class="ml-2">Date the application will be heard</b>
            </div>

            <div class="arrow-right-flash-25"></div>

            <div style="width:1.6%;"></div>

            <div class="coa-text-box-center" style="width:15%; font-weight: 700; text-align:center">{{result.hearingDate | beautify-date-dd/mm/yyyy}}</div>           
            
            <div style="width:2.3%;"></div>

            <div class="coa-arrow-box-left" style="width:28%; margin:0.3rem 0 0.25rem 0.5rem; line-height:1.25rem; height:2.5rem;">
                <b class="ml-2">Time the application will be heard</b>
            </div>

            <div class="arrow-right-flash-25"></div>

            
            
            <div class="coa-text-box-center" style="width:11%; font-weight: 700; text-align:center;">{{result.hearingTime | beautify-time-am-pm}}</div>
            
            <div style="width:14.25%;"></div>  

        </div>
<!-- <date-help>-->
        <div class="row" style="font-size: 9pt;">
            <div style="width:36%;"></div>
            <div style="width:15%">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div>

<!-- <affidavits> -->
        <div class="row mt-3" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.65rem 0; height:5.5rem;">
                <div class="ml-2">
                    <b>List any affidavits being filed.</b>
                    <i>
                        <br>An affidavit explaining the need for urgency is 
                        not required, but may be provided.  
                    </i>
                </div>
            </div>  

            <div class="arrow-right-flash-54"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.affidavits}}</div>                       
            </div> 
        </div>

<!-- <filed-material> -->
        <div class="row mt-4" style="font-size: 9pt;">

            <div class="coa-arrow-box-left" style="width:28%; margin:.4rem 0; height:6rem;">
                <div class="ml-2">
                    <b>Have you filed materials in support of the main application?</b>
                    <i>
                        <br>If yes, list the material you have filed.  
                    </i>
                </div>
            </div> 

            <div class="arrow-right-flash-54"></div>           
            
            

            <div style="width:14%; margin-top:2.75rem;">                  
                <check-box 
                    style="margin-left:1rem;"
                    :check="(result.filedMaterial)?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Yes"/> 
            </div>
            
            <div style="width:14%;margin-top:2.75rem;">
                <check-box 
                    style="margin:0;" 
                    :check="(!result.filedMaterial)?'yes':''"
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="No"/> 
            </div> 

            <div 
                class="coa-text-box-center" 
                style="width:36%; font-weight: 700; text-align:center;">
                <div v-if="result.filedMaterial">{{result.materialList}}</div>
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
import { form7DataInfoType } from '@/types/Information/Form7';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form7Layout extends Vue {

    @Prop({required:true})
    result!: form7DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>