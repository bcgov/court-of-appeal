<template>
    <b-card class="bg-white border-white w-90">


        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                Book of Authorities
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showBookOfAuthorities(!showBookOfAuthoritiesInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showBookOfAuthoritiesInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>



        <b-row v-if="showBookOfAuthoritiesInfo" class="mt-4">
            You must prepare a book of authorities that includes each authority referred to 
            in your factum and each authority that you intend to refer to in court at the hearing.
        </b-row>
        
        
        <b-row v-if="showBookOfAuthoritiesInfo" class="mt-4 bg-warning warning-message-row">
            
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="margin-top: 2.25rem;" class="ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                <p>
                    You must file and serve a book of authorities at least 
                    <span class="text-danger font-weight-bold">30 days</span> 
                    before an appeal hearing date.
                </p>
                <p class="mb-0">
                    If you agree with the other party to file a joint book of 
                    authorities, if must be filed at least <span class="text-danger font-weight-bold">30 days</span>
                     before the appeal hearing date.
                </p>

            </b-col>           
        </b-row>

        <b-row v-if="showBookOfAuthoritiesInfo" class="mt-4" >
            <ol>
                <li>
                    Prepare the Book of Authorities in accordance with the Completion Instructions.
                    <ul>                       
                        <li>
                            <b>Book of Authorities</b>                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-auth-book')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                     
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            Paper Completion Instructions                                                                       
                                        </b-col>
                                        <b-col cols="2"></b-col>                               
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('paper-auth-book')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                    
                                        </b-col>
                                    </b-row>
                                </li>
                                
                            </ul>
                        </li> 
                        
                    </ul>
                </li>                
                <li>
                    File with the registry.
                </li>
                <li>
                    Serve one copy on each respondent.
                </li>
            </ol>
        </b-row>   
        
        <b-row :class="showBookOfAuthoritiesInfo?'mt-2': 'mt-4'" :style="showBookOfAuthoritiesInfo?'padding-top: 0.15rem;':'padding-top: 0.75rem;'" >           
                    
            <b-col cols="11" class="step-title-column pl-0">
                Points of law and authorities not cited in factum
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showPoints(!showPointsInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showPointsInfo"></expand-icon>
                </b-button>
            </b-col>           
        </b-row>

        <b-row v-if="showPointsInfo" class="mt-4" >             
            <p>
                The court may permit a party to use arguments, raise 
                points of law or cite authorities that were not used, 
                raised or cited in a party’s factum.
            </p>
            <p>
                You may submit a condensed book of authorities or a 
                condensed book of evidence or both to the court at 
                the hearing of an appeal provided a copy is able 
                to be provided to each justice and each other party 
                at the hearing of the appeal.
            </p>            
            <p>
                Prepare a condensed book of authorities and/or a 
                condensed book of evidence in accordance with the 
                Completion Instructions.
            </p>
            <ul class="w-100">
                <li>
                    <b>Condensed Book of Authorities</b>                                    
                    <ul>                        
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    Paper Completion Instructions                                                                       
                                </b-col>
                                <b-col cols="2"></b-col>                               
                                <b-col cols="1">
                                    <b-button
                                        @click="downloadInstructions('paper-condensed-auth-book')"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        
                    </ul>
                </li>
                <li>
                    <b>Condensed Book of Evidence</b>                                    
                    <ul>                        
                        <li>
                            <b-row class="my-1 w-100">
                                <b-col cols="8" style="font-weight: 700;">
                                    Paper Completion Instructions                                                                       
                                </b-col>
                                <b-col cols="2"></b-col>                               
                                <b-col cols="1">
                                    <b-button
                                        @click="downloadInstructions('paper-condensed-evidence-book')"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                    </b-button>                                    
                                </b-col>
                            </b-row>
                        </li>
                        
                    </ul>
                </li>         
            </ul>
        </b-row>

        <b-row v-if="showPointsInfo" class="mt-3">            
                 
            <p>
                You may wish to review information about 
                your hearing and what will happen after your hearing by clicking on the links below.
            </p>       

            <ul class="mt-1 ml-3" >     
                <li>       
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/what-happens-at-hearing"
                        target="_blank">What will happen at my hearing?
                    </a>                               
                </li>
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                        target="_blank">What can I expect after my hearing?
                    </a>   
                </li>    
                <li class="mt-1" >            
                    <a 
                        href="https://www.courtofappealbc.ca/civil-family-law/guidebook-appellants/getting-judgment"
                        target="_blank">Getting Judgment
                    </a>   
                </li>                         
            </ul>
        </b-row>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ExpandIcon from "@/components/utils/ExpandIcon.vue";
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

@Component({
    components:{
        ExpandIcon
    }
})
export default class BookOfAuthoritiesAppRightToAppealPg extends Vue {

   
    showBookOfAuthoritiesInfo = true;
    showPointsInfo = false;

    public showBookOfAuthorities(show: boolean){        
        if (show) {
            this.showBookOfAuthoritiesInfo = true;
            this.$emit('adjustHeights', 0, '26rem')
        } else {
            this.showBookOfAuthoritiesInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showPoints(show: boolean){        
        if (show) {
            this.showPointsInfo = true;
            this.$emit('adjustHeights', 1, '33rem')
        } else {
            this.showPointsInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }


    
    public downloadInstructions(pdf_name){
        GetInstructionFile(pdf_name);        
    }

}
</script>

<style scoped lang="scss">

</style>