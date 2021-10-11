<template>
    <b-card border-variant="white">
        
        <h3>The Appeal Process</h3>
        <has-right-to-appeal-instructions v-if="processType == 'hasRightToAppeal'"/>
        <no-right-to-appeal-instructions v-if="processType == 'noRightToAppeal'" />
        <notice-of-appeal-response-instructions v-if="processType == 'noticeOfAppealResponse'" />
        <notice-of-application-response-instructions v-if="processType == 'noticeOfApplicationResponse'" />
        
        <p>
            Every appeal process is unique. If you have any questions, please visit the 
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal" 
                target="_blank">Online Guidebook
            </a> or 
            <a 
                href="mailto:courts.cso@gov.bc.ca">contact the registry
            </a>.
        </p>
        <journey-map />
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import JourneyMap from "../JourneyMap/JourneyMap.vue";
import hasRightToAppealInstructions from "./components/pathwayInstructions/hasRightToAppealInstructions.vue";
import noRightToAppealInstructions from "./components/pathwayInstructions/noRightToAppealInstructions.vue";
import noticeOfAppealResponseInstructions from "./components/pathwayInstructions/noticeOfAppealResponseInstructions.vue";
import noticeOfApplicationResponseInstructions from "./components/pathwayInstructions/noticeOfApplicationResponseInstructions.vue";

@Component({
    components:{
        JourneyMap,
        hasRightToAppealInstructions,
        noRightToAppealInstructions,
        noticeOfAppealResponseInstructions,
        noticeOfApplicationResponseInstructions
    }
})
export default class AppealProcess extends Vue {

    @Prop({required: true})
    processType!: string;

    

}

</script>

<style>

</style>