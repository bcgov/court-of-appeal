<template>
    <div v-if="dataReady">

        <!-- <header> -->
        <div style="margin-top:-1.25rem;">
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
            <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
                <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
            </div>   
            <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
                <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 18</b></div>
                <div style="width:75%; font-size:14pt;"><b>
                    NOTICE OF CHANGE OF REPRESENTATION/CHANGE OF ADDRESS FOR SERVICE: RULE 86
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
                <div style="margin-bottom: 0.75rem;">
                    If you are changing representation, complete Part A and Part B. If you are only changing 
                    your address for service, complete Part B only. If you are a lawyer seeking to withdraw 
                    from the record without your client's permission, use Form 19.
                </div>                
            </div>

        </div>        

<!-- <current-status> -->
        <div class="row" style="font-size: 9pt; margin:0.5rem -1rem 0.5rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:3.5rem;">
                <b>Current status:</b>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>

            <div class="row" style="margin-top: 0.35rem; width:67%;">              
                <check-box 
                    style="margin: .5rem 0 0 2rem;" 
                    :check="(result.currentRepresentation == 'Self-represented')?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Self-represented"/>                
                <check-box                    
                    style="padding: 0; margin: .5rem .5rem 0 5rem;" 
                    :check="(result.currentRepresentation == 'Lawyer')?'yes':''"
                    shiftmark="10" 
                    marginLeft="0.5rem"
                    text="Lawyer"/>   
                <div class="coa-text-box text-box" style="width:42%; display:inline;">{{result.currentLawyerName}}</div>
            </div>                

        </div>
        <div class="row" style="font-size: 9pt; margin:0;"> 
            <div class="mg-lf-32" style="margin-left:31.25rem; padding:0rem 0rem; border: 0px solid white;">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box mg-lf-0" style="padding-top:0.3rem; margin-left:1rem; width:11.75rem;height:1.75rem;text-align:center; line-height:1rem"><i>Name of lawyer and firm name</i></div>                 
            </div>
        </div>

<!-- <new-status> -->
        <div class="row" style="font-size: 9pt; margin:0.5rem -1rem 0.5rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:3.5rem;">
                <b>New:</b>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>

            <div class="row" style="margin-top: 0.35rem; width:67%;">              
                <check-box 
                    style="margin: .5rem 0 0 2rem;" 
                    :check="(result.currentRepresentation == 'Self-represented')?'yes':''" 
                    shiftmark="1" 
                    marginLeft="0.5rem"
                    text="Self-represented"/>                
                <check-box                    
                    style="padding: 0; margin: .5rem .5rem 0 5rem;" 
                    :check="(result.currentRepresentation == 'Lawyer')?'yes':''"
                    shiftmark="10" 
                    marginLeft="0.5rem"
                    text="Lawyer"/>   
                <div class="coa-text-box text-box" style="width:42%; display:inline;">{{result.newLawyerName}}</div>
            </div>                

        </div>
        <div class="row" style="font-size: 9pt; margin:0;"> 
            <div class="mg-lf-32" style="margin-left:31.25rem; padding:0rem 0rem; border: 0px solid white;">
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box mg-lf-0" style="padding-top:0.3rem; margin-left:1rem; width:11.75rem;height:1.75rem;text-align:center; line-height:1rem"><i>Name of lawyer and firm name</i></div>                 
            </div>
        </div>

<!-- <service-address> -->
        <div class="row" style="font-size: 9pt; margin:0.5rem -1rem 1rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:6.5rem;">
                <div style="font-weight: 700;">
                    Name(s) and residential or business address(es) within B.C. for service of party(ies) completing this form
                </div>
                <div style="font-style: italic;">
                    Include law firm if represented.
                </div>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>
                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{address}}</div>                       

        </div> 

<!-- <phone-number> -->
        <div class="row" style="font-size: 9pt; margin:0.5rem -1rem 1rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:3.5rem;">
                <div style="font-weight: 700;">
                    Phone number(s) of the party(ies) completing this form
                </div>               
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>
                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{phone}}</div>                       

        </div> 

<!-- <email> -->
        <div class="row" style="font-size: 9pt; margin:0.5rem -1rem 1rem 0">

            <div class="coa-help-box pd-est" style="margin:.5rem 0 0.5rem -0.5rem; width:28%; height:6.5rem;">
                <div style="font-weight: 700;">
                    Email address(es) for service of the party(ies) completing this form
                </div>
                <div style="font-style: italic;">
                    If you provide an email address you consent to have .....
                </div>
            </div>

            <div class="arrow-right-flash-36" style="width:0.05%;"></div>
                    
            <div class="coa-text-box text-box-65-5" style="width:59.5%;">{{result.serviceInformation.email}}</div>                       

        </div> 


<!-- <Sign-Date> -->
        <div class="row" style="font-size: 9pt; margin: 1rem -1rem 0rem 0;">
            
            <div class="coa-help-box pd-est-sm w-18-5" style="width:17.5%; margin:0.55rem 0 0rem -0.5rem; line-height:0.75rem;  height:2rem;">
                Date form completed
            </div>
            <div class="arrow-right-flash-25 mg-rg-3" style="width:3.5%;"></div>       

            <div class="coa-text-box w-18-5" style="width:15%; margin-left:-2.5rem; padding:0rem 0.5rem; display:flex; align-items:center; justify-content:center; text-align:center;">{{result.completionDate}}</div> 

            
            <div class="coa-help-box w-25-5" style="width:24.5%;padding:0.1rem 0.2rem; margin:0.42rem 0 0rem 0.5rem; line-height:0.85rem;  height:2.15rem;">
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
import { form18DataInfoType } from '@/types/Information/Form18';

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form18Layout extends Vue {

    @Prop({required:true})
    result!: form18DataInfoType;

    dataReady = false;
    phone = '';
    address = '';

    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo(){

        const serviceInfo = this.result.serviceInformation;
        const address = serviceInfo.addressLine1 + ', ' 
                        + (serviceInfo.addressLine2? (serviceInfo.addressLine2 + ', '):'') 
                        + serviceInfo.city + ', '
                        + serviceInfo.province + ', '
                        + serviceInfo.country + ', '
                        + serviceInfo.postalCode;

        if (!this.result.selfRepresented){
            this.address = serviceInfo.firmName + ', ' + address;
            this.phone = serviceInfo.firmPhone;
        } else {
            this.address = address;
            this.phone = serviceInfo.phone;
        }
           
    }

    
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>