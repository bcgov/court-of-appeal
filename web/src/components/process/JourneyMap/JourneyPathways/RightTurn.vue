<template>
    <div class="right-turn-scoped">        
        <div :style="{position:'relative'}" >            
            <div :class="{'journey-circle-right-scoped': true, 'circling-scoped': circling}" />
            <div :class="{'journey-circle-right-scoped': true, 'circling-inside-scoped': circling}" />
            <div class="square-scoped"/>            
            <div class="bend-top-border-scoped"/>
            <div class="bend-bottom-border-scoped"/>
            <div :class="{'bend-top-border-scoped': true,    'top-completed-scoped': circling}"/>
            <div :class="{'bend-bottom-border-scoped': true, 'bottom-completed-scoped': circling}"/>            
            <div :id="'extended-trail-top-'+returnLevel" :class="{'bend-top-border-scoped': true, 'top-completed-extension-scoped': circling }"/>            
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class RightTurn extends Vue {

    @Prop({required: false})
    circling!: boolean;

    @Prop({required: false})
    extendBegin!: boolean;

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
        if(this.extendBegin) fraction = 10
        this.pageWidth = (document.documentElement.clientWidth-1700)/fraction
        var extendedTrail = document.getElementById('extended-trail-top-'+this.returnLevel);
        if(extendedTrail)
            extendedTrail.style.setProperty('--extendedtraillength', this.pageWidth +'px')
    }

    mounted(){
        this.windowEventHandler()
    }


}
</script>
<style scoped>

    .right-turn-scoped {
        position:absolute;
    }

    .journey-circle-right-scoped {
        border: 9px solid;
        border-color: #9fbfe2 #9fbfe2 #377d22 #377d22;
        border-radius: 180px;
        transform: rotate(45deg);
        width: 180px;
        height: 180px;
        margin-top:6%;
        z-index: 1;
        fill-opacity: 0;
        position:absolute;
    }

    @keyframes rightturnouterglowscoped {
        50% { box-shadow: 0 0 0 #3c763d; transform: rotate(225deg) }
        70% { box-shadow: 0 0 8px #3c763d; }
        89% { box-shadow: 0 0 8px #3c763d; }
        100% { box-shadow: 0 0 0 #3c763d; transform: rotate(225deg)}
    }
    .circling-scoped {
        animation: rightturnouterglowscoped 2000ms linear forwards;
    }

    @keyframes rightturnrotateinnerglowscoped {
        0% { transform: rotate(45deg)}
        6% { transform: rotate(45deg)}
        15% {transform: rotate(225deg)}
        50% { box-shadow: 0 0 0 #3c763d inset; transform: rotate(225deg) }
        70% { box-shadow: 0 0 8px #3c763d inset; }
        89% { box-shadow: 0 0 8px #3c763d inset; }
        100% { box-shadow: 0 0 0 #3c763d; transform: rotate(225deg)}
    }
    .circling-inside-scoped {
        animation: rightturnrotateinnerglowscoped 2000ms linear forwards;
    }

    .square-scoped {
        width: 100px;
        position: absolute;
        z-index: 2;
        height: 162px;
        background-color: white;
        left: -10px;
        top: 9px;
    }

    .bend-top-border-scoped {
        position: absolute;
        height: 0px;
        width:90px;
        border-top: 9px solid #9fbfe2;
        top: 5%;
        z-index:3;
    }

    .bend-bottom-border-scoped {
        position: absolute;
        height: 0px;
        width:90px;
        border-top: 9px solid #9fbfe2;
        top: 171px;
        z-index:3;
    }

    @keyframes expandtoptorightscoped {
        0% {    width: 0;}
        6% {   width: 90px; }
        50% { box-shadow: 0 0 0   #3c763d;  width: 90px; }
        70% { box-shadow: 0 0 8px #3c763d;   }
        89% { box-shadow: 0 0 8px #3c763d;   }
        100% { box-shadow: 0 0 0  #3c763d; width: 90px;}
    }
    .top-completed-scoped {
        position: absolute;
        height: 0;
        width: 0;
        border-top: 9px solid #377d22;        
        top: 5%;
        z-index:4;
        animation: expandtoptorightscoped 2000ms linear forwards;
    }

    @keyframes expandtoptoleftscoped {
        0% {width: 0; left: 90px;}
        15%{ width: 0; left: 90px;}
        19%{width: 90px; left: 0px;}
        50% { box-shadow: 0 0 0 #3c763d;  width: 90px; left: 0 }
        70% { box-shadow: 0 0 8px #3c763d;     }
        89% { box-shadow: 0 0 8px #3c763d;     }
        100% { box-shadow: 0 0 0 #3c763d;  width: 90px; left: 0;}
    }
    .bottom-completed-scoped {
        position: absolute;
        height: 0px;
        width: 0;
        left: 0px;
        border-top: 9px solid #377d22;
        top: 171px;
        z-index:4;
        animation: expandtoptoleftscoped 2000ms linear forwards;
    }

    @keyframes expandupperleftensionscoped{
        0% {width: 0; }        
        1% {width: var(--extendedtraillength);}        
        50% { box-shadow: 0 0 0 #3c763d;  width: var(--extendedtraillength);}
        70% { box-shadow: 0 0 8px #3c763d; }
        85% { box-shadow: 0 0 8px #3c763d; }
        100% { box-shadow: 0 0 0 #3c763d;  width: var(--extendedtraillength);}
    }
    .top-completed-extension-scoped {
        position: absolute;
        height: 0;
        width: 0;
        /* border-top: 9px solid #22427d !important; */
        border-top: 9px solid #377d22;
        top: 5%;
        z-index:4;        
        right: 0px;
        animation: expandupperleftensionscoped 2000ms linear forwards;
    }
    
</style>




       
