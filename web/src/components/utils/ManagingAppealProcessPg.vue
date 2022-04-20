<template>
    <b-card class="bg-white border-white w-90">               
        
        <b-row class="mt-1" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                I do not want to proceed with the appeal, or we have settled the matter.
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm6(!showForm6Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm6Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showForm6Info" class="mt-4" >
            If you wish to abandon an appeal or an application for leave to appeal, 
            the appellant must immediately file a Notice of Abandonment in Form 22 and serve it on each party.
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/appellant-guidebook/2.13-prepare-and-file-a-notice-of-hearing?ct=t(step-index-link)"
                                        target="_blank">Notice of Settlement or Abandonment
                                    </a>
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm6Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row>   

        <b-row :class="showForm6Info?'mt-3':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                I would like to submit a request
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm9(!showForm9Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm9Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm9Info" class="mt-4" >
            If you wish to submit a request:
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    Requisition
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm9Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showForm9Info?'mt-5':'mt-3'" :style="showForm9Info?'padding-top: 0.8rem;':'padding-top: 1.3rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                I would like to submit a Notice of Application
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm4(!showForm4Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm4Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm4Info" class="mt-4" >
            If you wish to submit a notice of application:
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    Notice of Application
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm4Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

@Component({
    components:{
        ExpandIcon
    }
})
export default class ManagingAppealProcessPg extends Vue {  

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form6State.Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    showForm6Info = true;  
    showForm9Info = false; 
    showForm4Info = false; 

    public showForm6(show: boolean){
        if (show) {
            this.showForm6Info = true;
            this.$emit('adjustHeights', 0, "14rem");
        } else {
            this.showForm6Info = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }   

    public showForm9(show: boolean){
        if (show) {
            this.showForm9Info = true;
            this.$emit('adjustHeights', 1, "14rem");
        } else {
            this.showForm9Info = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showForm4(show: boolean){
        if (show) {
            this.showForm4Info = true;
            this.$emit('adjustHeights', 2, "14rem");
        } else {
            this.showForm4Info = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public startNewForm6Document(){
        this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
        this.$router.push({name: "start-form6" })
    }

    public startNewForm9Document(){
        this.UpdateCurrentRequisitionId(null);
        this.$router.push({name: "start-form9" })
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" })
    }
    
}
</script>

<style scoped lang="scss">

</style>