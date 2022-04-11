<template>
    <div>

<!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 8</b></div>
                <div style="width:75%; font-size:14pt;"><b>NOTICE OF APPLICATION TO VARY AN ORDER OF A JUSTICE: RULE 62(2)</b></div>
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
                </div>
            </div>

            <div class="row" style="display: block; text-align: left; margin-left: 1rem;">
                <div style="font-size:14pt; font-weight: 700;">PARTIES TO THE APPEAL</div>                
            </div>
                   
    <!-- <name-of-appellants> -->
            <div class="row mt-3" style="font-size: 9pt; margin-left: 1rem;">

                <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">                    
                    <div class="ml-2">
                        <b> Appellant(s)</b>
                        <i>
                            <br>List the name(s) of the appellant(s) named on Form 1: Notice of Appeal
                        </i>
                    </div> 
                </div>

                <div class="arrow-right-flash-36"></div>
                        
                <div class="coa-text-box-left" style="width:60%;">
                    <div class="ml-2" style="font-weight: 700;">{{result.appellantNames}}</div>                       
                </div> 
            </div>

    <!-- <name-of-respondents> -->
            <div class="row mt-3" style="font-size: 9pt; margin-left: 1rem;">

                <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                    <div class="ml-2">
                        <b> Respondent(s)</b>
                        <i>
                            <br>List the name(s) of the respondent(s) named on Form 1: Notice of Appeal
                        </i>
                    </div>  
                </div>

                <div class="arrow-right-flash-36"></div>
                        
                <div class="coa-text-box-left" style="width:60%;">
                    <div class="ml-2" style="font-weight: 700;">{{result.respondentNames}}</div>                       
                </div> 
            </div> 

            <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0.5rem; text-align: left; padding: 0.5rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">
                    To the party(ies) filing the application
                </div>
                <div style="margin-bottom: 0.75rem;">
                    An application to vary is heard by a division of the court. 
                    Contact the court scheduler to obtain an application hearing 
                    date and time.
                </div>
                <div>
                    Communicate with the other party or parties to ensure they 
                    are available on the requested date. Applications to vary 
                    are to be no more than 30 minutes.
                </div>
            </div>

        </div>

<!-- <name-of-parties> -->
        <div class="row mt-3" style="font-size: 9pt;">          

            <div class="coa-arrow-box-left" style="width:28%; line-height:1rem; margin:.5rem 0; height:3.5rem;">
                <div class="ml-2">
                    <b> Name of the party(ies) bringing the application.</b>
                    <i>
                        <br>Include name of law firm if represented.
                    </i>
                </div>  
            </div>

            <div class="arrow-right-flash-36"></div>
                    
            <div class="coa-text-box-left" style="width:64%;">
                <div class="ml-2" style="font-weight: 700;">{{result.filingParties.join(', ')}}</div>                       
            </div> 
        </div>

<!-- <date-pronounced> -->
        <div class="row mt-3" style="font-size: 9pt;">
            
            <div class="coa-arrow-box-left" style="width:28%; margin:.5rem 0; line-height:1rem; height:3.5rem;">
                <div class="ml-2">
                    <b>Date the order you are seeking to vary was pronounced</b>
                    <i style="font-size:8.5pt;"><br>Not the date the order was entered.</i>
                </div>                
            </div>
            <div class="arrow-right-flash-36"></div>       

            <div class="coa-text-box-center" style="width:15%; font-weight: 700;">{{result.orderDate | beautify-date-dd/mm/yyyy}}</div>           
                
            <div class="coa-arrow-box-left" style="width:20%; margin:.5rem 0 0 0.5rem; height:3.5rem;">
                <div class="ml-2">
                    <b>Name of justice who pronounced the order</b>                    
                </div>
            </div>
            <div class="arrow-right-flash-36"></div> 

            <div class="coa-text-box-left" style="width:20%;">
                <div class="ml-2" style="font-weight: 700;">{{result.judgeName}}</div>                       
            </div>      
       
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

        <div class="row" style="display: block; text-align: left;">
            <div style="font-size:10pt; font-weight: 700;">
                 Application hearing date and time to be set by the Associate Registrar
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
                <div class="ml-2">Name of lawyer or party authorizing filing of this form.</div>
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
import { form8DataInfoType } from '@/types/Information/Form8';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form8Layout extends Vue {

    @Prop({required:true})
    result!: form8DataInfoType;
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>