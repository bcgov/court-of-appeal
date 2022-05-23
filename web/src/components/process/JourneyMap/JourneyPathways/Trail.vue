<template>
    <div :style="{width: width}">
        <div v-bind:class="[
            className,{
            'completed-step-l1': stepCompleted,
            'completed-line-l1': lineCompleted
        }]"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

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

    @Prop({required: false, default:'0'})
    startDelay!: number;

    stepCompleted=false


    mounted(){
        // console.log(this.className)
        this.setStepCompleted()
    }

    @Watch('completed')    
    public setStepCompleted(){
        if(this.startDelay > 0){
            if(this.completed)
                window.setTimeout(()=>{
                    this.stepCompleted=this.completed
                },this.startDelay)
            else
                this.stepCompleted=false
        }else
            this.stepCompleted=this.completed
    }

}
</script>
