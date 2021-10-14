<template>
     <div v-bind:class="{'journey-box': true, 'inactive': !active}">       
        <step-completed-checkbox
            :style="{position: 'relative', marginTop: 0, left: '-35%'}"
            @onChange="completed"
            :show="active"
            :disabled="!ready"
            :checked="status == 'completed'"
        />
        <span :style="{position: 'relative', top: (twoPages ? '11px' : '5px'), left: '-28%', zIndex: '9'}">{{order}}</span>
        <div :class="{'journey-icon': active, 'file-main': true, 'inactive': !active}" @click="action">
            <two-page-icon v-if="twoPages || status=='twoPages'"/>
            <single-page-icon v-else-if="status=='new'"/>
            <draft-page-icon v-else-if="status=='draft'"/>
            <approved-form-icon v-else-if="status=='approved'"/>
            <approved-form-icon v-else-if="status=='completed'"/>

            <div class="file-corner-r" :style="twoPages? 'top: -15px':''"/>
        </div>
        <div :class="['step-title-container', stepTitleClass]" @click="action">            
            <div v-if="stepTitle">
                <span :class="{'step-title': active , 'step-title-optional' : !active}">
                    {{stepTitle}}
                </span>
                <br/>
                <span v-if="stepTitleOptional" class="step-title-optional">{{stepTitleOptional}}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import StepCompletedCheckbox from './StepCompletedCheckbox.vue';
import TwoPageIcon from '@/iconSVG/TwoPageIcon.vue';
import SinglePageIcon from '@/iconSVG/SinglePageIcon.vue';
import DraftPageIcon from '@/iconSVG/DraftPageIcon.vue';
import ApprovedFormIcon from '@/iconSVG/ApprovedFormIcon.vue';

@Component({
    components:{
        StepCompletedCheckbox,
        TwoPageIcon,
        SinglePageIcon,
        DraftPageIcon,
        ApprovedFormIcon
    }
})

export default class FormIcon extends Vue {


    @Prop({required: false})
    active!: boolean;
    
    @Prop({required: false})
    twoPages!: boolean;

    @Prop({required: false})
    status!: string;

    @Prop({required: false})
    stepTitleOptional!: string;

    @Prop({required: true})
    stepTitle!: string;  

    @Prop({required: false})
    ready!: boolean;

    @Prop({required: true})
    order!: number;    

    @Prop({required: false})
    stepTitleClass!: string;

    
    // mounted(){
    //     console.log(this.stepTitle)
    // }

    public action(){
        this.$emit('action')
    }
    public completed() {
        this.$emit('completed', this.order)
    }

}
</script>