<template>
    <div>

        <div class="my-0">
            <div class="text-right">FORM 17 <i>(RULE 77 )</i></div>
        </div>

        <div class="my-0">
            <div class="text-center"><b>COURT OF APPEAL FOR BRITISH COLUMBIA</b></div>
        </div>

        <div>
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        </div>

        <div class="my-0">
            <div class="text-right">Court of Appeal File No. <b class="ml-3">{{result.formSevenNumber}}</b></div>
        </div>

        <!-- <BETWEEN> -->
        <div class="mb-3 mx-0 row" style="font-weight: 700;">
            <div style="width:11%;">
                BETWEEN:
            </div>
        </div>
        <div class="my-3 mx-0 row" style="font-weight: 700;">
            <div style="width:11%;" />
            <div style="width:78%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{applicantNamesFull}}</div>
            </div>
            <div style="width:11%;" class="text-center">Appellant(s)</div>
        </div>

        <!-- <AND> -->
        <div class="my-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;">
                AND:
            </div>
        </div>
        <div class="my-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;" />
            <div style="width:76%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{respondentNamesFull}}</div>
            </div>
            <div style="width:13%;" class="text-center"> Respondent(s)</div>
        </div>

        <div class="my-0">
            <div class="text-center"><b>CERTIFICATE OF COSTS</b></div>
        </div>

        <!-- <THE APPEAL> -->
        <div class="my-5 mx-0 row">
            <div>
                <underline-form style="display:inline-block;line-height:1rem;"
                                textwidth="10rem"
                                beforetext="I CERTIFY that on"
                                hint=""
                                :italicHint="false"
                                text="" />
                , the costs of the {{allowedCostsParties}}
                have been allowed against the {{payingParties}} at $ {{result.amount}}.
            </div>
        </div>

        <!-- <Appellants Signature> -->
        <div class="my-5 mx-0 row">
            <div style="width:50%;">
                <div>....................................................................</div>
                <div>
                    Date
                </div>

            </div>

            <div style="width:50%;">
                <div>....................................................................</div>
                <div>Registrar</div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import { form17DataInfoType } from '@/types/Information/Form17';
import {getPartyTitles} from '../PartyTitlesForm17';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";

@Component({
    components:{       
        UnderlineForm         
    }
})
export default class Form17Layout extends Vue {

    @Prop({required:true})
    result!: form17DataInfoType; 

    @form17State.Action
    public UpdateForm17Info!: (newForm17Info: form17DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull='';
    respondentNamesFull='';
    allowedCostsParties='';
    payingParties = '';
    
    
    appearingAppellants =[]
    appearingRespondents =[]

    mounted(){
        // this.dataReady = false;
        //console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){        
       
        this.applicantNames = [];
        this.respondentNames = [];        

        for (const resInx in this.result.respondents){
            const fullTitle = getPartyTitles(this.result.respondents[resInx],' ')
            this.respondentNames.push(fullTitle);
        }
        this.respondentNamesFull = this.combineNames(this.result.respondents, '', this.respondentNames)
      

        for (const appInx in this.result.appellants){
            const fullTitle = getPartyTitles(this.result.appellants[appInx],' ')
            this.applicantNames.push(fullTitle);            
        }
        this.applicantNamesFull = this.combineNames(this.result.appellants, '', this.applicantNames)
        
        this.payingParties = this.result.payingCostsParties.join(', ')
        this.allowedCostsParties = this.result.allowedCostsParties.join(', ') 
    }
    

    public combineNames(names, nameField?, addingNameArray?){
        let namesString = ''
        const numberOfNames = names.length       
        for(const index in names){
            let addingName=''
            if(addingNameArray?.length>0){
                addingName=addingNameArray[index]
            }
            else if(nameField)
                addingName = names[index][nameField] 
            else
                addingName = names[index]

            if(Number(index)>0 && Number(index)+1 == numberOfNames)
                namesString += ' and '+addingName
            else if(Number(index)==0)
                namesString += addingName
            else
                namesString += ', '+addingName
        }
        return namesString
    }
    
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>