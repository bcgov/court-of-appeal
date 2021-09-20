<template>
    <div :style="{width: width}">
        <div v-bind:class="[
            className,{
            'completed-step-l1': completed,
            'completed-line-l1': lineCompleted
        }]"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Trail extends Vue {

    @Prop({required: false})
    width!: string;

    @Prop({required: false})
    className!: string;

    @Prop({required: false})
    completed!: boolean;

    @Prop({required: false})
    lineCompleted!: boolean;

    mounted(){
        //console.log(this.className)
    }

}
</script>
<style scoped>
@import './JourneyMap.css'
</style>