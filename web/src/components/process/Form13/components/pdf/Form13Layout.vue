<template>
    <div>

        <div class="my-0">
            <div class="text-right">FORM 13 <i>(RULE 67(2)(a) )</i></div>
        </div>

        <div class="my-0">
            <div class="text-center"><b>COURT OF APPEAL FOR BRITISH COLUMBIA</b></div>
        </div>

        <div>
            <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        </div>

        <div class="my-0">
            <div class="text-right">Court of Appeal File No. <b class="ml-3" style="text-transform: uppercase">{{result.formSevenNumber}}</b></div>
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
        <div class="mt-3 mx-0 row" style="font-weight: 600;">
            <div style="width:11%;" />
            <div style="width:76%;">
                <div style="font-weight: 200;" class="text-center mx-3">{{respondentNamesFull}}</div>
            </div>
            <div style="width:13%;" class="text-center"> Respondent(s)</div>
        </div>

        <div class="my-0">
            <div class="text-center"><b>CONSENT ORDER TO EXTEND TIME TO FILE A DOCUMENT</b></div>
        </div>

        <!-- <ORDER-DATE> -->
        <div class="mt-4 mb-4 mx-0 row">
            <div>
                {{result.orderDate | beautify-date-full}}
            </div>
        </div>

        <!-- <WHEREAS:> -->
        <div class="mb-2 mt-2 mx-0 row" style="font-weight: 600;">
            <div>
                WHEREAS:
            </div>
        </div>

        <!-- <Description> -->
        <div class="my-2 ml-5 mr-0">
            <div class="mb-2 row">
                (a) all parties have consented to this order,
            </div>
            <div class="my-2 row">
                (b) no person involved is under any legal disability, and
            </div>
            <div class="my-2 row">
                (c) all parties have agreed to comply hereafter with the
                time limits set forth in the Court of Appeal Act and Court of
                Appeal Rules,
            </div>
        </div>

        <!-- <ORDERED> -->
        <div class="mt-4 mb-2 mx-0 row">
            <div>
                <b>IT IS ORDERED</b> that the time set for {{applyingParties}}
                to file and serve the {{applicationType}} is extended until
                {{extensionDate | beautify-date-full-no-weekday}}
            </div>
        </div>



        <!-- <APPROVED> -->
        <div class="mb-3 mt-5 mx-0 row">
            <div style="width:50%;">APPROVED AS TO FORM:</div>
            <div style="width:50%;">FOR THE COURT</div>
        </div>

        <!-- <Parties Signature> -->
        <div class="m-0 row print-block" v-for="party,inx in signingPartyList" :key="'party-sign-'+inx">
            <div style="width:50%;">
                <div style="height:3rem;" />
                <div style="border-top:1px dashed grey; width:94%; ">
                    Signature of {{party.name}}
                    <span v-if="party.responding">, Respondent</span>
                    <span v-else>, Appellant</span>
                </div>
            </div>
            <div v-if="inx==0" style="width:50%;">
                <div style="height:3rem;" />
                <div style="border-top:1px dashed grey;">
                    Deputy Registrar
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form13";
const form13State = namespace("Form13");

import { form13DataInfoType, form13PartiesInfoType } from '@/types/Information/Form13';
import {getPartyTitles} from '../PartyTitlesForm13'


@Component
export default class Form13Layout extends Vue {

    @Prop({required:true})
    result!: form13DataInfoType; 

    @form13State.Action
    public UpdateForm13Info!: (newForm13Info: form13DataInfoType) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    
    applicantNamesFull = '';
    respondentNamesFull = '';
    extensionDate = '';
    applicationType = '';
    applyingParties = '';   
    signingPartyList = [];    

    mounted(){
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

        this.extensionDate = this.result.extensionDate;
        this.extractFilingParties();
        this.extractSeekingTypes();        
        
        this.extractSigningParties();
    }  

    public extractSigningParties(){
        
        const signingAppellants = this.result.signingParties.filter(party=> !party.responding)
        const signingRespondents = this.result.signingParties.filter(party=> party.responding)       

        this.extractSigningPartyList(signingAppellants, signingRespondents)
       
    }

    public extractFilingParties(){
        
        const applyingAppellants = this.result.filingParties.filter(party=> !party.responding)
        const applyingRespondents = this.result.filingParties.filter(party=> party.responding)
                     
        const appellantnames = this.combineNames(applyingAppellants, 'name', null, ', the appellant')            
        const respondentnames = this.combineNames(applyingRespondents, 'name', null, ', the respondent')         

        this.applyingParties += appellantnames
        this.applyingParties += (appellantnames && respondentnames)?' and ':''
        this.applyingParties += respondentnames 
    }

    public extractSigningPartyList(appearingAppellants, appearingRespondents){
        const allParties: form13PartiesInfoType[] = [...appearingAppellants, ...appearingRespondents]        
        this.signingPartyList =[]
        for(const party of allParties){
            if(!party.isCounsel){
                const sameParty = allParties.filter(par => {
                    return(
                        (par.organization && par.isOrganization && par.organization==party.organization) ||
                        (par.firstName && par.lastName && par.firstName == party.firstName && par.lastName == party.lastName)
                    )
                })
                if(sameParty.length==1) this.signingPartyList.push(party)
            }else{
                this.signingPartyList.push(party)
            }
        }
    }

    public extractSeekingTypes(){

        const otherTypeIndex = this.result.seekingExtension.findIndex(item =>item=='other')
        if(otherTypeIndex>-1){
            const seekingExtension = JSON.parse(JSON.stringify(this.result.seekingExtension))
            seekingExtension.splice(otherTypeIndex,1)
            seekingExtension.push(this.result.seekingExtensionOther)

            this.applicationType = this.combineNames(seekingExtension)
        }
        else 
            this.applicationType = this.combineNames(this.result.seekingExtension)
    }


    
    public combineNames(names, nameField?, addingNameArray?, role?){
        let namesString = ''
        
        const numberOfNames = names.length       
        for(const index in names){
            
            let addingName = ''
            const partyRole = role?role:'';            

            if(addingNameArray?.length>0){
                addingName = addingNameArray[index] + partyRole
            }
            else if(nameField)
                addingName = names[index][nameField] + partyRole
            else
                addingName = names[index] + partyRole

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