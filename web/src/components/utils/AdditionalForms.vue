<template>
    <b-card border-variant="white">
        <h3>Additional Forms</h3>
        <ul>
            <li class="link-button" 
                @click="displayWindow('Managing the Appeal Process')"
                target="_blank">
                Managing the Appeal Process            
            </li>
            <li class="link-button" 
                @click="startNewForm16Document"
                target="_blank">
                Offer To Settle Costs (Form 16)                
            </li>
        </ul>

        <b-modal size="xl" v-model="showWindow" header-class="bg-primary">

            <template v-slot:modal-title>
                <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
            </template>

            <b-row no-gutters>

                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 2rem;">
                
                    <managing-appeal-process-pg @adjustHeights="adjustHeights" v-if="managingAppealProcessContent"/>                    
                    
                </b-col>

            </b-row>
        
            <template v-slot:modal-footer>
                <instruction-window-footer/>
            </template>
            
            <template v-slot:modal-header-close>
                <b-button
                variant="outline-primary text-white"
                style="font-weight: bold; font-size: 1.25em;"
                class="closeButton"
                @click="showWindow = false"
                >&times;</b-button
                >
            </template>

        </b-modal>
            
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import ManagingAppealProcessPg from './ManagingAppealProcessPg.vue';
import InstructionWindowFooter from '../process/JourneyMap/components/InstructionWindowFooter.vue';
import PathSidebar from '../process/JourneyMap/components/PathSidebar.vue';

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

@Component({
    components:{
        ManagingAppealProcessPg,
        InstructionWindowFooter,
        PathSidebar
    }
})
export default class AdditionalForms extends Vue { 

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void
    
    showWindow = false;
    windowTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];
    managingAppealProcessContent = false;

    updated=0;

    public adjustHeights(index: number, pathHeight: string) {
        this.updated++;
        this.pathHeights[index] = pathHeight;
    }

    public displayWindow(contentType: string){

        this.managingAppealProcessContent = false;        

        if (contentType == "Managing the Appeal Process"){

            this.windowTitle = "Managing the Appeal Process";
            this.pathTypes = ["info", "share", "share", "share"];
            this.pathHeights = ['19rem', '0', '0', '0'];
            this.managingAppealProcessContent = true;
        }

        this.showWindow = true;

    }

    public startNewForm16Document(){
        this.UpdateCurrentOfferToSettleCostsId(null);
        this.$router.push({name: "start-form16" });
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