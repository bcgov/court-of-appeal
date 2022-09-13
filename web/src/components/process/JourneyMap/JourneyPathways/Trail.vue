<template>
    <div :style="{width: width}">
        
        <div :class="[
            className,{
            'completed-step-l1-scoped': stepCompleted,
            'completed-line-l1-scoped': lineCompleted
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

<style scoped>
    .journey-return-trail-scoped {
        border-top: 9px solid #9fbfe2;
        height:0;
        position: relative;
        margin-top:42.5px;
    }

    @keyframes expandtrailleftscoped {
        0%{width:0;left:100%}
        19%{width:0;left:100%}
        33%{width:100%;left:0}
        50% { box-shadow: 0 0 0 #3c763d; width: 100%; left: 0; }
        70% { box-shadow: 0 0 8px #3c763d;    }
        89% { box-shadow: 0 0 8px #3c763d;    }
        100% { box-shadow: 0 0 0 #3c763d; width: 100%; left: 0;}
    }
    .journey-return-trail-scoped.completed-step-l1-scoped {
        animation: expandtrailleftscoped 2000ms linear forwards;
    }


    .journey-trail-l1-moveable-scoped {
        border-top: 9px solid #9fbfe2;
        height:0;
        position: relative;
        margin-top:42.5px;
    }

    @keyframes glowingscoped {
        0% {width: 0;}
        25% { box-shadow: 0 0 0     #3c763d;  width: 100%; }
        70% { box-shadow: 0 0 10px  #3c763d;  }
        80% { box-shadow: 0 0 10px  #3c763d;  }
        100% { box-shadow: 0 0 0    #3c763d; width: 100%; }
    }
    .journey-trail-l1-moveable-scoped.completed-step-l1-scoped {
        animation: glowingscoped 1500ms;
    }

    .completed-step-l1-scoped {
        border-top: 9px solid #377d22 !important;
        z-index: 2;
    }

    .completed-line-l1-scoped {
        border: 9px solid;
        border-color: #377d22 transparent #377d22 transparent;
    }


</style>