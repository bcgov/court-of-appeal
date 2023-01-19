
<template>
    <!-- <div :class="{'journey-box': !active,'any-icon':true, 'action-end-point':true}" @click="action"> -->
    <div :class="{'action-end-point': completed, 'journey-end-circle': true, 'any-icon': completed, 'completed-step': completed}" @click="action">    
        <!-- <div  :class="{'journey-end-circle':true, className:true, 'completed-step': completed }" > -->
            <img style="margin-top:-1.2rem;" src='../../../../../../public/icons/icon_pending.svg' class="leave-hearing" alt=""/>
        <!-- </div> -->
        <!-- <div v-if="stepTitle" :class="{'end-step-title':true,'step-title-optional':!active}" :style="titleStyle">
            {{stepTitle}}
        </div> -->

        <div class="end-step-title end-step-title-l2">
            <!-- <div class="end-step-title" :style="titleStyle">{{stepTitle}}</div> -->
            <div :class="{'end-step-title': completed , 'step-title-optional' : !completed}"  :style="titleStyle">{{stepTitle}}</div>
        </div>

    </div>    
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component
export default class ClockEndCircle extends Vue {

    @Prop({required: false})
    active!: boolean;

    @Prop({required: false})
    className!: string;

    @Prop({required: false})
    stepTitle!: string;

    @Prop({required: false})
    titleStyle!: string;

    @Prop({required: false})
    completed!: boolean;

    public action(){
        this.$emit('action')
    }

    mounted(){
        
    }

}
</script>