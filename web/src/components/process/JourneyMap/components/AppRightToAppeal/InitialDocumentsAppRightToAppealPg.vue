<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Notice of Appeal
            </div>            
        </b-row>

        <b-row class="mt-4 mr-1 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-5 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                The time limit to file and serve a notice of appeal is 
                <span class="text-danger font-weight-bold">30 days</span> 
                starting on the day after the order is pronounced.
                <b-icon-question-circle-fill
                    style="color: #38598a;"
                    v-b-tooltip:hover.v-info.html="helpText('The date the decision maker made the order you want to appeal.').title"                               
                    />
                <p class="mt-1">
                    <b style="text-decoration: underline;">NOTE:</b> 
                    If another enactment specifies a time limit within which the appeal must be commenced, that time limit would apply.
                </p>
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Complete the online form below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 135%;" class="my-1">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-for-appellants/how-to-start-appeal"
                                        target="_blank">Notice of Appeal
                                    </a>
                                </b-col>
                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm1Document"
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
                    Serve one copy to each respondent.
                </li>
            </ol>
        </b-row>        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

@Component
export default class InitialDocumentsAppRightToAppealPg extends Vue { 
    
    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void
    
    public startNewForm1Document(){
        this.UpdateCurrentNoticeOfAppealId(null)
        this.$router.push({name: "checklist-form1" })
    }

    public helpText(content: string){
        return {title: "<div style='margin: 0;'>" +content+ "</div>"};
    }

}
</script>

<style scoped lang="scss">

</style>