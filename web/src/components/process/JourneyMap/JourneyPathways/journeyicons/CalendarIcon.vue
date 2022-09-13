<template>
    <div :class="{'journey-box': true, 'inactive': !active}">
        <StepCompletedCheckbox
            :style="{position: 'relative', top: '-5px', left: '-25%'}"
            @onChange="completed"
            :show="active"
            :disabled="!ready"
            :checked="status == 'completed'"
        />
        <span :style="{position: 'relative',top:'-1px',left: '-20%', zIndex: '9'}">{{order}}</span>
        <div class="cal-container" @click="action">
            <div :class="{'journey-icon': active, 'calendar-image': true, 'inactive': !active}" @click="action">                   
                <!-- <div class="journey-icon calendar-image"> -->                 
                <calendar-icon-svg-checked v-if="status == 'completed'"/>
                <calendar-icon-svg v-else/>                
            </div>
        </div>
        <div :class="['step-title-container', stepTitleClass]" @click="action">
            <div :class="{'step-title': active , 'step-title-optional' : !active}" style="width:10rem; margin:0 auto; padding-left:1rem;">
                <!-- <div class="step-title" style="width:10rem; margin:0 auto; padding-left:1rem;"> -->
                {{stepTitle}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import StepCompletedCheckbox from './StepCompletedCheckbox.vue';
import CalendarIconSvg from '@/iconSVG/CalendarIconSvg.vue'
import CalendarIconSvgChecked from '@/iconSVG/CalendarIconSvgChecked.vue'

@Component({
    components:{
        StepCompletedCheckbox,
        CalendarIconSvg,
        CalendarIconSvgChecked
    }
})

export default class  CalendarIcon extends Vue {

    @Prop({required: false})
    status!: string;

    @Prop({required: false})
    stepTitleClass!: string;

    @Prop({required: false})
    active!: boolean;

    @Prop({required: false})
    ready!: boolean;

    @Prop({required: true})
    order!: number;

    @Prop({required: false})
    stepTitle!: string;


    public action(){
        this.$emit('action')
    }
    public completed(checked) {
        this.$emit('completed', this.order-1, checked)
    }
}
</script>