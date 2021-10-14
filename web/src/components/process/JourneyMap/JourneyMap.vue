<template>
<div>   

    <div>        
        <AppellantApplyForLeaveJourneyMap />
        <AppellantLeaveGrantedJourneyMap />
        <AppellantLeaveRefusedJourneyMap />
        <AppellantRightToAppealJourneyMap />
        
        <RespondToAppealJourneyMap />
        <RespondToLeaveGrantedJourneyMap />
        <RespondToLeaveJourneyMap />
        <RespondToLeaveRefusedFinalJourneyMap />
        <RespondToLeaveRefusedJourneyMap />
    </div>

    
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppellantApplyForLeaveJourneyMap from './JourneyPathways/AppellantApplyForLeaveJourneyMap.vue'
import AppellantLeaveGrantedJourneyMap from './JourneyPathways/AppellantLeaveGrantedJourneyMap.vue'
import AppellantLeaveRefusedJourneyMap from './JourneyPathways/AppellantLeaveRefusedJourneyMap.vue'
import AppellantRightToAppealJourneyMap from './JourneyPathways/AppellantRightToAppealJourneyMap.vue'

import RespondToAppealJourneyMap from './JourneyPathways/RespondToAppealJourneyMap.vue'
import RespondToLeaveGrantedJourneyMap from './JourneyPathways/RespondToLeaveGrantedJourneyMap.vue'
import RespondToLeaveJourneyMap from './JourneyPathways/RespondToLeaveJourneyMap.vue'
import RespondToLeaveRefusedFinalJourneyMap from './JourneyPathways/RespondToLeaveRefusedFinalJourneyMap.vue'
import RespondToLeaveRefusedJourneyMap from './JourneyPathways/RespondToLeaveRefusedJourneyMap.vue'


@Component({
    components:{        
       
        AppellantApplyForLeaveJourneyMap,
        AppellantLeaveGrantedJourneyMap,
        AppellantLeaveRefusedJourneyMap,
        AppellantRightToAppealJourneyMap,
        RespondToAppealJourneyMap,
        RespondToLeaveGrantedJourneyMap,
        RespondToLeaveJourneyMap,
        RespondToLeaveRefusedFinalJourneyMap,
        RespondToLeaveRefusedJourneyMap
    }
})
export default class JourneyMap extends Vue {

    trail1 = false 

}
</script>

<style scoped lang="scss">


</style>



