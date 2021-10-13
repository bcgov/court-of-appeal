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
            width='28%'
            level=1                
        />

       <FormIcon   
            style="left: 28%"
            :twoPages="false"
            stepTitle="Initial Documents"
            action="this.iconClicked.bind(this, 'applyforleave')"
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
            width='30%'
            level=1
        />

        <FormIcon 
            style="left: 58%"
            :twoPages="true"
            stepTitle="Hearing Documents"
            stepTitleClass="step-title-wide"
            action="this.iconClicked.bind(this, 'leavehearingdocs')"
            :active="true"
            order=2
            status="twoPages"
            :ready="true"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(2,this.state.steps)"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='25%'
            level=1
        />

        <GavelEndCircle
            stepTitle="Decision on Leave to Appeal"
            action="this.iconClicked.bind(this,'decision')"
            :active="true"
            :completed="trail1"
            :style="{position: 'absolute', left: '82%'}"
            :titleStyle="{position: 'absolute', top:'97px', width: '150px', left: '-17px'}"            
        />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Trail from './Trail.vue'
import FormIcon from './journeyicons/FormIcon.vue'
import ReturnTrail from './ReturnTrail.vue'
import CalendarIcon from './journeyicons/CalendarIcon.vue'
import GavelIcon from './journeyicons/GavelIcon.vue'
import GavelEndCircle from './journeyicons/GavelEndCircle.vue'

@Component({
    components:{
        Trail,
        FormIcon,
        GavelEndCircle
    }
})
export default class AppellantApplyForLeaveJourneyMap extends Vue {

trail1 = false

}
</script>
<style scoped>
@import './journeyStyles/JourneyMap.css';
@import "./journeyStyles/ReturnTrail.css";
@import './journeyStyles/JourneyIcons.css';
@import './journeyStyles/PageeIcon.css';
</style>
