<template>
    <b-card border-variant="white">
        <h3>Additional Forms</h3>
        <ul>            
            <li class="link-button" 
                @click="startNewForm16Document"
                target="_blank">
                Offer To Settle Costs (Form 16)                
            </li>
            <li class="link-button" 
                @click="startNewForm17Document"
                target="_blank">
                Certificate of Costs (Form 17)                
            </li>
            <li class="link-button" 
                @click="downloadInstructions('ca-cover-page')"
                target="_blank">
                CA Cover Page template                
            </li>

        </ul>       
            
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import { GetInstructionFile } from './GetInstructionFile';

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

@Component
export default class AdditionalForms extends Vue { 

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void

    @form17State.Action
    public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void
    
    updated=0;

    public startNewForm16Document(){
        this.UpdateCurrentOfferToSettleCostsId(null);
        this.$router.push({name: "start-form16" });
    }

    public startNewForm17Document(){
        this.UpdateCurrentCertificateOfCostsId(null);
        this.$router.push({name: "start-form17" });
    }

    public downloadInstructions(pdf_name){

        GetInstructionFile(pdf_name);
        
    }

}

</script>

<style scoped lang="scss">

    @import "src/styles/common";

    .link-button {
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
        color: $text-color-link;
        &:hover, &:focus {
            color: $text-color-link-hover;
        }
    }

</style>