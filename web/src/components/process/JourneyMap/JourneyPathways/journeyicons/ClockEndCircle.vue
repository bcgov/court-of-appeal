
<template>
    <div :class="{'journey-box inactive': !active,'action-end-point':true}" @click="action">
        <div  :class="{'journey-end-circle':true, className:true, 'completed-step': completed }" >
            <img style="margin-top:-1.2rem;" src='../../../../../../public/icons/icon_pending.svg' class="leave-hearing" alt=""/>
        </div>
        <div v-if="stepTitle" :class="{'end-step-title':true,'step-title-optional':!active}" :style="titleStyle">
            {{stepTitle}}
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