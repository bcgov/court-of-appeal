<template>
    <div :class="{'action-end-point': true, 'journey-end-circle': true, 'any-icon': true, 'completed-step': completed}" onClick="this.props.action">
        <div class="oi oi-check journey-final-check"/>
        <div class="end-step-title end-step-title-l2">
            <div class="end-step-title" :style="titleStyle">{{stepTitle}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class EndCircle extends Vue {


    @Prop({required: false})
    titleStyle!: any;

    @Prop({required: false})
    completed!: boolean;

    @Prop({required: false})
    stepTitle!: string;

}
</script>
<style scoped>
@import './PageeIcon.css';
@import './JourneyIcons.css';
</style>


