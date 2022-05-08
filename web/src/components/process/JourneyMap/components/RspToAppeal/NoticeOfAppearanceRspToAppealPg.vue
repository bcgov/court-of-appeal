<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div style="text-align: left; font-weight: bold;">
                Were you served with a Notice of Appeal?
            </div>            
        </b-row>

        <b-row class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger font-weight-bold">10 days</span> to file and serve your Notice of Appearance.
            </b-col>           
        </b-row>

        <b-row class="mt-4">
            <ol>
                <li>
                    Complete the online form below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-125">
                                <b-col cols="9">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)"
                                        target="_blank">Notice of Appearance
                                    </a>
                                </b-col>
                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewDocument"
                                        target="_blank"                                       
                                        class="p-1 bg-white text-primary border-primary  online-form-button">Online form
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
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row>

        <b-row class="mt-4 bg-warning warning-message-row">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-1 ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" class="warning-message-column pl-0">
                You have <span class="text-danger font-weight-bold">10 days</span> 
                to file and serve your Affidavit of Service, after you served the Notice of Appearance.
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-115">
                                <b-col cols="8">
                                    <a 
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)"
                                        target="_blank">Affidavit of Service
                                    </a>                                    
                                </b-col>
                                <b-col cols="2">
                                    1 copy
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.docx"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.pdf"
                                        target="_blank"
                                        class="form-download-button p-1 bg-white text-primary border-primary">PDF
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>
                <li>
                    File the indicated number of copies with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row> 
                
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

@Component
export default class NoticeOfAppearanceRspToLeavePg extends Vue {
    
    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void        
        
    public startNewDocument(){
        this.UpdateCurrentCaseId(null);
        this.$router.push({name: "start-form2" })
    }

}
</script>

<style scoped lang="scss">



</style>