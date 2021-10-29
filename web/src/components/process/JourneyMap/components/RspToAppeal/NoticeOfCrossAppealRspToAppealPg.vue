<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-0">            
            <b-col cols="11" style="text-align: left; font-weight: bold; padding: 0;">
                The Notice of Appeal or the order granting leave to appeal
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showNoa(!showNoaInfo)"
                    style="border-radius: 0.5rem; float: right; border: none;"                                        
                    class="p-1 bg-white">
                    <img v-if="showNoaInfo" class="bg-white"
                        src="../../../../../../public/icons/icon-minus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                    <img v-else class="bg-white"
                        src="../../../../../../public/icons/icon-plus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showNoaInfo" class="mt-4 ml-1 bg-warning" style="border-radius: 0.5rem; padding: 1rem 0rem 1rem 0.5rem;">
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill class="mt-3" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0; padding-right: 1.5rem;">
                You have <span class="text-danger" style="font-weight: bold;">15 days</span> 
                to file and serve your documents, after receiving the Notice of Appeal or 
                the order granting leave to appeal.
            </b-col>           
        </b-row>

        <b-row v-if="showNoaInfo" class="mt-4" >
            <ol>
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row style="width: 110%;" class="my-1">
                                <b-col cols="8">
                                    <a 
                                        href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/297_2001a#part4"
                                        target="_blank">Notice of Cross Appeal
                                    </a>                                    
                                </b-col>
                                <b-col cols="2">
                                    1 copy
                                </b-col>
                                <b-col cols="1" >
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%208.docx"
                                        target="_blank"
                                        style="border-radius: 0.5rem; font-size: 14px; font-weight: bold;"                                        
                                        class="p-1 bg-white text-primary border-primary">DOC
                                    </b-button>
                                </b-col>
                                <b-col cols="1">
                                    <b-button
                                        href="https://www.bccourts.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form8.pdf"
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
                     File the document with the registry.
                </li>
                <li>
                    Serve one copy to each party.
                </li>
            </ol>
        </b-row> 

        <b-row :class="showNoaInfo?'mt-4 ml-0': 'mt-5 ml-0'">            
            <b-col cols="11" style="text-align: left; font-weight: bold; padding: 0;">
                The Appeal Record and Transcript
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealRecord(!showAppealRecordInfo)"
                    style="border-radius: 0.5rem; float: right;"                                        
                    class="p-1 bg-white border-white">
                    <img v-if="showAppealRecordInfo" class="bg-white"
                        src="../../../../../../public/icons/icon-minus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                    <img v-else class="bg-white"
                        src="../../../../../../public/icons/icon-plus.svg"
                        style="width: 2rem; height: 2rem; padding: 0;"
                    />
                </b-button>
                
            </b-col>           
        </b-row>

        <b-row v-if="showAppealRecordInfo" class="mt-3 ml-0" >

            <p style="padding: 0;">
                If you are served with a copy of the Appeal Record and Transcript, you do not have to respond to these documents.
            </p>
       
        </b-row> 
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class NoticeOfCrossAppealRspToAppealPg extends Vue {

    showNoaInfo = true;
    showAppealRecordInfo = false;

    public showNoa(show: boolean){
        if (show) {
            this.showNoaInfo = true;
            this.$emit('adjustHeights', 0, "15rem");
        } else {
            this.showNoaInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }        
    }

    public showAppealRecord(show: boolean){
        if (show) {
            this.showAppealRecordInfo = true;
            this.$emit('adjustHeights', 1, "3rem")
        } else {
            this.showAppealRecordInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }
}
</script>

<style scoped lang="scss">

</style>