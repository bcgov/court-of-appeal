<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-4">            
            <div style="text-align: left; font-weight: bold;">
                Were you served with a Notice of Appeal?
            </div>            
        </b-row>

        <b-row class="mt-4 ml-1 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                You have <span class="text-danger" style="font-weight: bold;">10 days</span> to file and serve your Notice of Appearance.
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
                                        href="https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)"
                                        target="_blank">Notice of Appearance
                                    </a>
                                </b-col>
                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewDocument"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold; float: right;"                                        
                                        class="p-1 bg-white text-primary border-primary">Online form
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

        <b-row class="mt-4 ml-1 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 2rem;">
                You have <span class="text-danger" style="font-weight: bold;">10 days</span> 
                to file and serve your Affidavit of Service, after you served the Notice of Appearance.
            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 125%;" class="my-1">
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
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">PDF
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


@Component
export default class NoticeOfAppearanceRspToLeavePg extends Vue {


    public startNewDocument(){
        this.$router.push({name: "start" })
    }

}
</script>

<style scoped lang="scss">



</style>