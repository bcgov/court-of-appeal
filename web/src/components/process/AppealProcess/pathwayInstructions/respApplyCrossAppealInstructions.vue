<template>
    <b-card no-body border-variant="white">
        
        <p> 
            If you do not have the right to appeal, and you would still 
            like to cross appeal your case, you must apply for leave to 
            appeal from the court. Follow the steps below to complete 
            the process.
        </p>
        <p>
            If you want to apply to put on hold a proceeding or a 
            process of execution pending the outcome of an appeal, 
            you will need to apply for a stay of proceedings or a 
            stay of execution. You may join a stay application with 
            an application for leave to appeal, but need to follow 
            the instructions under 
            <a  @click="startNewForm4Document"
                target="_blank"
                style="text-decoration: underline; color: blue; cursor:pointer;">
                Notice of Application
            </a> and 
            <a>
                Application Book – Leave and Stay
            </a>.
        </p>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class respApplyCrossAppealInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
