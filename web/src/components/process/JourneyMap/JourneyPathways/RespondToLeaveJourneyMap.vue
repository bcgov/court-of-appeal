<template>
<div>
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '79%',
                position: 'absolute',
                top: '41.5%',
                zIndex: '1'}"
        />         

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='18%'
            level=1
        />
        
         <FormIcon 
            :style="{left: '20%'}"
            :twoPages="false"
            stepTitle="Notice of Appearance"
            action="this.iconClicked.bind(this, 'appearance')"
            :active="true"                       
            order=1
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(1, this.state.steps)"
            :ready="true"
        />
        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='21%'
            level=1
        />
        
        <FormIcon 
            :style="{left: '42%'}"
            :twoPages="false"
            stepTitle="Reply Book"
            action="this.iconClicked.bind(this, 'replybook')"
            :active="true"                       
            order=2
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(1, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='21%'
            level=1
        />

        <GavelIcon 
            :style="{left: '64%', top:'15%'}"
            stepTitle="The Hearing"
            class="journey-box"             
            action="this.iconClicked.bind(this, 'respondentleavetoappealhearing')"
            :active="true"
            order=3
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(6, this.state.steps)"
            :ready="true"
        />
       <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='25%'
            level=1
        />
        <ClockEndCircle 
            :style="{position: 'absolute', left: '84%', top: '22%'}"
            stepTitle="Decision on Leave to Appeal"
            :titleStyle="{position: 'absolute', top: '97px', width: '150px', left: '-22px'}"
            :active="true"
            :completed="trail1"
        />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Trail from './Trail.vue'
import FormIcon from './journeyicons/FormIcon.vue'

import GavelIcon from './journeyicons/GavelIcon.vue'
import ClockEndCircle from './journeyicons/ClockEndCircle.vue'

@Component({
    components:{
        Trail,
        FormIcon,
        GavelIcon,
        ClockEndCircle
    }
})
export default class RespondToLeaveJourneyMap extends Vue {

trail1 = false

}
</script>
<style scoped>
@import './journeyStyles/JourneyMap.css';
@import "./journeyStyles/ReturnTrail.css";
@import './journeyStyles/JourneyIcons.css';
@import './journeyStyles/PageeIcon.css';
</style>

