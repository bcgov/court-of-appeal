<template>
    <div>
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '65%',
                position: 'absolute',
                top: '92px',
                zIndex: '1'}"
        />

        <Trail                
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='15%'
            level=1                
        />

        <FormIcon   
            style="left: 20%"
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
            width='24%'
            level=1
        />

        <FormIcon 
            style="left: 44%"
            :twoPages="false"
            stepTitle="Notice of Cross Appeal"
            stepTitleOptional="(optional)"
            action="this.iconClicked.bind(this, 'crossappeal')"
            :active="true"
            order=2
            status="new"
            :ready="true"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(2,this.state.steps)"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='24%'
            level=1
        />

        <FormIcon 
            style="left: 68%"
            :twoPages="true"
            stepTitle="Factum and Appeal Book"
            action="this.iconClicked.bind(this, 'respondentfactum')"
            :active="true"
            order=3
            status="twoPages"
            :ready="true"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(2,this.state.steps)"
        />

        <ReturnTrail
            :status="trail1?'completed':''"
            startpoint='70%'
        />

        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '65%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <GavelIcon 
            :style="{left: '25%', top: '65%'}"
            class="journey-box" 
            stepTitle="The Hearing" 
            action="this.iconClicked.bind(this, 'respondenthearing')"
            :active="true"
            order=4
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(6, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            :style="{position: 'absolute', marginLeft:'30%', top:'70.3%',width: '30%'}"
            width='30%'
            level=2
        />

        <FormIcon 
            :style="{top: '69%', left: '54%'}"
            :twoPages="false"
            stepTitle="Court Order"
            stepTitleOptional="(if required)"
            action="this.iconClicked.bind(this, 'courtorder')"
            stepTitleClass="step-title-wide"
            :active="true"
            order=5
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(3, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='30%'
            :style="{position: 'absolute', width: '30%', left: '60%', top: '70.3%'}"
            level=2
        />

        <EndCircle
            stepTitle="Appeal Process Complete"
            action="this.iconClicked.bind(this,'respondentcomplete')"
            :active="true"
            :completed="trail1"
            :style="{top: '70%', left: '80%'}"
            titleStyle="margin-top: 1.5rem;"            
        />
    </div>

    <b-modal size="xl" v-model="showWindow" header-class="bg-primary">
        <template v-slot:modal-title>
            <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
        </template>

        <b-row no-gutters>
            <b-col cols="1">
                <path-sidebar v-bind:pathType="pathType" v-bind:pathHeight="pathHeight"/>
            </b-col>
            <b-col cols="11" style="padding: 0 0 0 2rem;">             
               
                
                
                <notice-of-appearance-window-content v-if="windowType.noticeOfAppearance"/>
            </b-col>

        </b-row>
      
      <template v-slot:modal-footer>
        <instruction-window-footer/>
      </template>
      <template v-slot:modal-header-close>
        <b-button
          variant="outline-primary text-white"
          style="font-weight: bold; font-size: 1.25em;"
          class="closeButton"
          @click="showWindow = false"
          >&times;</b-button
        >
      </template>
    </b-modal>






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

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';
import NoticeOfAppearanceWindowContent from '../components/RspToAppeal/NoticeOfAppearanceRspToAppealPg.vue';
import { journeyStepType } from '@/types/Information';


@Component({
    components:{
        Trail,
        FormIcon,
        ReturnTrail,
        CalendarIcon,
        GavelIcon,
        EndCircle,
        InstructionWindowFooter,
        PathSidebar,      
        NoticeOfAppearanceWindowContent,
    }
})
export default class RespondToAppealJourneyMap extends Vue {

    trail1 = false;

    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';

    
    noticeOfAppearanceHeight = '28rem';
    windowType = {theHearing: true} as journeyStepType;

    displayWindow(){

        if (this.windowType.noticeOfAppearance){
            this.windowTitle = "Notice of Appearance";
            this.pathType = "share";
            this.pathHeight = this.noticeOfAppearanceHeight;
        }        
        this.showWindow = true;
    }


}
</script>

<style scoped>
    @import './journeyStyles/JourneyMap.css';
    @import "./journeyStyles/ReturnTrail.css";
    @import './journeyStyles/JourneyIcons.css';
    @import './journeyStyles/PageeIcon.css';
</style>

