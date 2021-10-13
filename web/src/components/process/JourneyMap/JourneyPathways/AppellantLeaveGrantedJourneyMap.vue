<template>
<div>
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '75%',
                position: 'absolute',
                top: '19.6%',
                zIndex: '0'}"
        />

        <Trail                
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='15%'
            level=1                
        />

       <FormIcon   
            style="left: 20%"
            :twoPages="true"
            stepTitle="Appeal Record and Transcript"
            stepTitleClass="step-title-wide"
            action="this.iconClicked.bind(this, 'appealrecord')"
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
            width='28%'
            level=1
        />

        <FormIcon 
            style="left: 45%"
            :twoPages="true"
            stepTitle="Factum, Appeal Book and Certificate of Readiness"
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
            width='27%'
            level=1
        />

        <CalendarIcon 
            :style="{left: '69%', marginTop: '5px'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleClass="step-title-wide"
            action="this.iconClicked.bind(this, 'bookappeal')"
            :active="true"
            order=3
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(3, this.state.steps)"
            :ready="true"
        />

        <ReturnTrail
            :status="trail1?'completed':''"
            startpoint='73%'
        />

        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '70%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'
            }"
        />

        <FormIcon 
            :style="{top: '70%', left: '18%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            action="this.iconClicked.bind(this, 'noticeofhearing')"
            stepTitleClass="step-title-wide"
            :active="true"
            order=4
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(3, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='25%'
            :style="{position: 'absolute', marginLeft:'20%', top:'70.3%'}"
            level=2
        />

        <GavelIcon 
            :style="{left: '41%', top: '66%'}"
            class="journey-box" 
            stepTitle="The Hearing" 
            action="this.iconClicked.bind(this, 'appellanthearing')"
            :active="true"
            order=5
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(6, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='24%'
            :style="{position: 'absolute', left:'45%', top:'70.3%'}"
            level=2
        />

        <FormIcon 
            :style="{top: '70%', left: '64%'}"
            :twoPages="false"
            stepTitle="Court Order"
            stepTitleOptional="(if applicable)"
            action="this.iconClicked.bind(this, 'appellantcourtorder')"
            stepTitleClass="step-title-wide"
            :active="true"
            order=6
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(3, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='22%'
            :style="{position: 'absolute', left:'70%', top:'70.3%'}"
            level=2
        />

        <EndCircle
            stepTitle="Appeal Process Complete"
            action="this.iconClicked.bind(this,'appellantcomplete')"
            :active="true"
            :completed="trail1"
            :style="{top: '70%', left: '84%'}"
            titleStyle="margin-top: 1.5rem;"                       
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
import EndCircle from './journeyicons/EndCircle.vue'

@Component({
    components:{
        Trail,
        FormIcon,
        CalendarIcon,
        ReturnTrail,
        GavelIcon,
        EndCircle,
    }
})
export default class AppellantLeaveGrantedJourneyMap extends Vue {

trail1 = false

}
</script>
<style scoped>
@import './journeyStyles/JourneyMap.css';
@import "./journeyStyles/ReturnTrail.css";
@import './journeyStyles/JourneyIcons.css';
@import './journeyStyles/PageeIcon.css';
</style>


