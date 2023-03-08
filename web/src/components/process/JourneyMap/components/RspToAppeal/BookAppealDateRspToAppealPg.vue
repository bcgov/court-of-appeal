<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <b-col cols="11" class="step-title-column pl-0">
                When is an appeal ready for hearing?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showAppealReady(!showAppealReadyInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppealReadyInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row>
        
        <b-row v-if="showAppealReadyInfo" class="mt-3">
            <p>
                An appeal is ready for hearing on the date when 
                the appellant has filed both:
                <ul>
                    <li>the appellant’s factum and</li>
                    <li>
                        a copy of each order being appealed, in 
                        the form that the order was entered in 
                        the court appealed from, or
                    </li>
                    <li>on the date specified by a justice or registrar</li>
                </ul>                
            </p>       
        </b-row> 

        <b-row :class="showAppealReadyInfo?'mt-0': 'mt-4'" :style="showAppealReadyInfo?'padding-top: 0.15rem;':'padding-top: 0.85rem;'">
            <b-col cols="11" class="step-title-column pl-0">
                How is a hearing date set?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showObtain(!showObtainInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showObtainInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row> 

        <b-row v-if="showObtainInfo" class="mt-0">
            <p>
                When an appeal is ready for hearing, under 
                <a 
                    href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section33"
                    target="_blank"> Rule 33
                </a> 
                of the Court of Appeal Rules, an appellant 
                must without delay obtain a hearing date and 
                inform the registrar if the parties disagree 
                on the length of time for the hearing.
            </p>   
            <p>
                Once a hearing date is obtained, the appellant must 
                without delay, file and serve a Notice of Hearing.                
            </p>    
        </b-row> 

        <b-row :class="showObtainInfo?'mt-0': 'mt-4'" :style="showObtainInfo?'padding-top: 0.15rem;':'padding-top: 0.85rem;'">
                   
            <b-col cols="11" class="step-title-column pl-0">
                Can I as the respondent obtain a hearing date?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showRespObtain(!showRespObtainInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespObtainInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row> 

        <b-row v-if="showRespObtainInfo" class="mt-2">
            <p>
                You may obtain a hearing date for an appeal if you have:
                <ul>
                    <li>filed a a respondent’s factum or respondent’s cross appeal factum, and</li>
                    <li>the appellant has not complied with 
                        <a 
                            href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a#section33"
                            target="_blank"> Rule 33(1) or (2)
                        </a>                         
                        of the Court of Appeal rules.
                    </li>
                                     
                </ul>
                After an appeal is ready for hearing, you must, without delay,
                <ul>
                    <li>obtain a hearing date for the appeal by 
                        contacting the 
                        <a 
                            href="https://www.bccourts.ca/Court_of_Appeal/scheduling/"
                            target="_blank"> registrar
                        </a>.
                        You should communicate with the other parties to find a date that works for everyone.
                    </li>
                    <li>
                        inform the registrar if the parties disagree 
                        on the length of time required for the hearing of the appeal.
                    </li>                    
                </ul>
                Once you have obtained a hearing date, you must, not more than 5 
                days after obtaining the hearing date, file and serve a notice 
                of hearing in Form 5 that has attached a copy of each order 
                being appealed.                                
            </p>       
        </b-row>  
        
        <!-- <b-row :class="showRespObtainInfo?'mt-1': 'mt-4'" :style="showRespObtainInfo?'padding-top: 0.75rem;':'padding-top: 0.85rem;'">
                   
            <b-col cols="11" class="step-title-column pl-0">
                Can I expedite the hearing of the appeal?
            </b-col> 
            <b-col cols="1">
                <b-button
                    @click="showExpedite(!showExpediteInfo)"
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showExpediteInfo"></expand-icon>
                </b-button>
                
            </b-col>           
        </b-row> 

        <b-row v-if="showExpediteInfo" class="mt-2">
            <p>
                You may request to expedite an appeal by filing and 
                serving a written request which must state the following:
                <ul>
                    <li>the nature of the appeal</li>
                    <li>the reason for the request</li>
                    <li>whether the other parties consent to expediting the appeal</li>
                    <li>
                        the proposed terms for expediting the hearing of the appeal including
                        <ul>
                            <li>schedule for the steps required to bring the appeal to hearing</li>
                            <li>estimate of the time required for the hearing of the appeal</li>
                        </ul>
                    </li>
                    <li>a list of proposed dates for the hearing of the appeal</li>                    
                </ul>
                                
            </p>       
        </b-row>        
         -->
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

@Component({
    components:{
        ExpandIcon
    }
})
export default class BookAppealDateRspToAppealPg extends Vue { 

    showAppealReadyInfo = true;
    showObtainInfo = false;
    showRespObtainInfo = false;
    showExpediteInfo = false;

    public showAppealReady(show: boolean){
        if (show) {
            this.showAppealReadyInfo = true;
            this.$emit('adjustHeights', 0, "7rem")
        } else {
            this.showAppealReadyInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    }

    public showObtain(show: boolean){
        if (show) {
            this.showObtainInfo = true;
            this.$emit('adjustHeights', 1, "5rem")
        } else {
            this.showObtainInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    }

    public showRespObtain(show: boolean){
        if (show) {
            this.showRespObtainInfo = true;
            this.$emit('adjustHeights', 2, "16.5rem")
        } else {
            this.showRespObtainInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    }

    public showExpedite(show: boolean){
        if (show) {
            this.showExpediteInfo = true;
            this.$emit('adjustHeights', 3, "13rem")
        } else {
            this.showExpediteInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    }

}
</script>

<style scoped lang="scss">

</style>