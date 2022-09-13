<template>
    <div :class="{'action-end-point': completed, 'journey-end-circle': true, 'any-icon': completed}" @click="action">
        <!-- <div :class="{'action-end-point': completed, 'journey-end-circle': true, 'any-icon': completed, 'completed-step': completed}" @click="action"> -->
        <!-- <div class="oi oi-check journey-final-check"/> -->        
        <div>
             <!-- style="margin:-0.5rem 0 0 0.9rem; width:100%; height:100%;"> -->
            <end-circle-svg-checked v-if="completed" />
            <end-circle-svg style="margin-bottom:1.65rem;" v-else/>
        </div>

        <div class="end-step-title end-step-title-l2">
            <!-- <div class="end-step-title" :style="titleStyle">{{stepTitle}}</div> -->
            <div :class="{'end-step-title': completed , 'step-title-optional' : !completed}"  :style="titleStyle">{{stepTitle}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EndCircleSvg from '@/iconSVG/EndCircleSvg.vue'
import EndCircleSvgChecked from '@/iconSVG/EndCircleSvgChecked.vue'

@Component({
    components:{
        EndCircleSvg,
        EndCircleSvgChecked
    }
})
export default class EndCircle extends Vue {


    @Prop({required: false})
    titleStyle!: any;

    @Prop({required: false})
    completed!: boolean;

    @Prop({required: false})
    stepTitle!: string;

    public action(){
        this.$emit('action')
    }

}
</script>



