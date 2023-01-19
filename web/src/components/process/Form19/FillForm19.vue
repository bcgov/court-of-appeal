<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-19-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Withdrawal of Lawyer
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 19 (RULE 86)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Withdrawal Of Lawyer (Form 19)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If your lawyer is no longer acting on your behalf and you do 
                not file a Notice of Change of Representation/Change of 
                Address for Service, the lawyer may withdraw from the 
                appeal by filing a notice of intention to withdraw and service 
                each party a copy of the document.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                If you are served with a notice of intention to withdraw, you 
                may object to the withdrawal by filing an 
                <a style="color: blue; margin-left: 0.25rem; text-decoration: underline; display: inline;"
                    @click="startNewForm20Document"
                    target="_blank"                                                                                
                    > objection form
                </a> and serving it on the lawyer who filed the notice of 
                withdrawal within 7 days of being served with the Notice 
                of Withdrawal of Lawyer.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-19-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import Form19ProcessHeader from "@/components/process/Form19/components/Form19ProcessHeader.vue";
import Form19StyleOfProceeding from "@/components/process/Form19/components/Form19StyleOfProceeding.vue";
import { form19StatusInfoType } from '@/types/Information/Form19';

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

@Component({
    components:{
        Form19ProcessHeader,        
        Form19StyleOfProceeding
    }
})
export default class FillForm19 extends Vue {

    @form20State.Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void


    stepsCompleted = {} as form19StatusInfoType;   

    mounted() {  
        this.stepsCompleted = {
            first: false,
            second: false,
            third: false
        }       
    }

    public startNewForm20Document(){
        this.UpdateCurrentNoticeOfObjectionToWithdrawalId(null)
        this.$router.push({name: "start-form20" });
    }
}
</script>

<style scoped lang="scss">



</style>