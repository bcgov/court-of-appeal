<template>
    <div class="left-turn-scoped">
        <div :style="{position:'relative'}" >
            <div :class="{'journey-circle-left-scoped': true, 'circling-back-scoped': circling}" />
            <div :class="{'journey-circle-left-scoped': true, 'circling-back-inside-scoped': circling}" />
            <div class="left-square-scoped"/>
            <div class="bend-top-left-border-scoped"/>
            <div class="bend-bottom-left-border-scoped"/>
            <div :class="{'bend-top-left-border-scoped': true,    'top-left-completed-scoped': circling}"/>
            <div :class="{'bend-bottom-left-border-scoped': true, 'bottom-left-completed-scoped': circling}"/>
            <div :id="'extended-trail-'+returnLevel" :class="{'bend-bottom-left-border-scoped': true, 'bottom-left-completed-extension-scoped': circling }"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class LeftTurn extends Vue {

    @Prop({required: false})
    circling!: boolean;

    @Prop({required: false})
    extendEnd!: boolean;

    @Prop({required: false})
    returnLevel!: number;



    pageWidth = 0;
   
    created() {
        window.addEventListener("resize", this.windowEventHandler);
    }

    destroyed() {
        window.removeEventListener("resize", this.windowEventHandler);
    }

    public windowEventHandler() {
        let fraction = 20 
        if(this.extendEnd) fraction = 10
        this.pageWidth = (document.documentElement.clientWidth-1700)/fraction
        if(this.pageWidth<0)this.pageWidth=0;
        var extendedTrail = document.getElementById('extended-trail-'+this.returnLevel);
        if(extendedTrail)
            extendedTrail.style.setProperty('--extendedtraillength', this.pageWidth+'px')
    }

    mounted(){
        this.windowEventHandler()
    }

}
</script>
<style scoped>

    .left-turn-scoped {
        position:absolute;
    }

    .journey-circle-left-scoped {
        border: 9px solid;
        border-color: #377d22 #377d22 #9fbfe2 #9fbfe2 ;
        border-radius: 180px;
        transform: rotate(45deg);
        width: 120px;
        height: 120px;
        margin-top:6%;
        z-index: 1;
        fill-opacity: 0;
        position:absolute;
    }

    @keyframes leftturnouterglowscoped {
        50% { box-shadow: 0 0 0 #3c763d; transform: rotate(-135deg)}
        70% { box-shadow: 0 0 8px #3c763d; }
        85% { box-shadow: 0 0 8px #3c763d; }
        100% { box-shadow: 0 0 0 #3c763d;transform: rotate(-135deg)}
    }
    .circling-back-scoped {
        animation: leftturnouterglowscoped 2000ms linear forwards;
    }

    @keyframes leftturnrotateinnerglowscoped {
        0% { transform: rotate(45deg)}
        38% { transform: rotate(45deg)}
        45% {transform: rotate(-135deg)}
        50% { box-shadow: 0 0 0 #3c763d inset;transform: rotate(-135deg)}
        70% { box-shadow: 0 0 8px #3c763d inset; }
        85% { box-shadow: 0 0 8px #3c763d inset; }
        100% { box-shadow: 0 0 0 #3c763d inset;transform: rotate(-135deg)}
    }    
    .circling-back-inside-scoped {
        animation: leftturnrotateinnerglowscoped 2000ms linear forwards;
    }

    .left-square-scoped {
        width: 68px;
        left: 60px;
        position: absolute;
        z-index: 1;
        height: 111px;
        background-color: white;
    }

    .bend-top-left-border-scoped {
        position: absolute;
        left:60px;
        height: 0px;
        width:60px;
        border-top: 9px solid #9fbfe2;
        top: 5%;
        z-index:3;
    }

    .bend-bottom-left-border-scoped {
        position: absolute;
        left:60px;
        height: 0px;
        width:78px;
        border-top: 9px solid #9fbfe2;
        top: 111px;
        z-index:3;
    }

    @keyframes expandlowerleftscoped {
        0%{ width: 0; left: 120px;}
        33%{ width: 0; left: 120px;}
        38%{width: 60px; left: 60px;}
        50% { box-shadow: 0 0 0 #3c763d;  width: 60px; left: 60px;}
        70% { box-shadow: 0 0 8px #3c763d;     }
        89% { box-shadow: 0 0 8px #3c763d;     }
        100% { box-shadow: 0 0 0 #3c763d; width: 60px; left: 60px;}
    }
    .top-left-completed-scoped {
        position: absolute;
        left:120px;
        height: 0;
        width: 0;
        border-top: 9px solid #377d22;
        top: 5%;
        z-index:4;
        animation: expandlowerleftscoped 2000ms linear forwards;
    }

    @keyframes expandlowerrightscoped {
        0% {    width: 0;}
        45% {   width: 0px; }
        50% { box-shadow: 0 0 0 #3c763d;  width: 90px;}
        70% { box-shadow: 0 0 8px #3c763d; ;}
        85% { box-shadow: 0 0 8px #3c763d;  }
        100% { box-shadow: 0 0 0 #3c763d;  width: 90px;}
    }
    .bottom-left-completed-scoped {
        position: absolute;
        height: 0px;
        width: 0;
        left: 60px;
        border-top: 9px solid #377d22;
        top: 111px;
        z-index:4;
        animation: expandlowerrightscoped 2000ms linear forwards;
    }

    @keyframes expandlowerrightextensionscoped{
        0% {    width: 0;}
        45% {   width: 0px; }
        50% { box-shadow: 0 0 0 #3c763d;  width: var(--extendedtraillength);}
        70% { box-shadow: 0 0 8px #3c763d; ;}
        85% { box-shadow: 0 0 8px #3c763d;  }
        100% { box-shadow: 0 0 0 #3c763d;  width: var(--extendedtraillength);}
    }
    .bottom-left-completed-extension-scoped {
        position: absolute;
        height: 0px;
        width: 0;
        left: 150px;
        border-top: 9px solid #377d22;
        top: 111px;
        z-index:4;
        animation: expandlowerrightextensionscoped 2200ms linear forwards;
    }
</style>
