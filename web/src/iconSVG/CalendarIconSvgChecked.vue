<template>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 86 114" xmlSpace="preserve">
                
        <g> 
            <path d="M85.7-0.1H0v5.2V109v5.2h85.7V-0.1z M80.5,109H5.2V5.1h49.3l26,26V109z"/>
            <rect x="5.2" y="5.1" style="fill:#00A651" width="75" height="104"/>
            <!-- <rect x="61" y="0" style="fill:#FFFFFF" width="22" height="22"/>             -->
            <!-- <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
                L76.9,26z"/> -->
            <!-- <polygon style="fill: #FFFFFF" points="60.6,8.8 60.6,26 77.8,26 "/>                                         -->
        </g>
        
        <g id="Layer_4" style="margin-top:1rem;">
            <path style="fill:#404040; transform:translate(0, 10px);" d="M14.5,29.1v8h55.9v-8H14.5z M14.5,45.1v39.2c0,0.4,0.3,0.7,0.7,0.7h54.4c0.4,0,0.7-0.3,0.7-0.7V45.1H14.5
                L14.5,45.1z M22.4,53.1h8v8h-8V53.1z M38.4,53.1h8v8h-8V53.1z M54.4,53.1h8v8h-8V53.1z M22.4,69.1h8v8h-8V69.1z M38.4,69.1h8v8h-8 V69.1z"/>                
        </g>

        <g fill="none" stroke="#22AE73" stroke-width="2">             
            <polyline class="animation" stroke="#FFFFFF" stroke-width="10" points="24.5,65.8 38.7,78.9 60.2,50.4 " style="stroke-dasharray:200%, 200%; stroke-dashoffset: 0; opacity:0.95;"/>   
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class CalendarIconSvgChecked extends Vue {

}
</script>

<style scoped>
    @-ms-keyframes checkmark {
        0% {stroke-dashoffset: 200%}
        100% {stroke-dashoffset: 200%}
    }

    @keyframes checkmark {
        0% {stroke-dashoffset: 200%}
        100% {stroke-dashoffset: 0%}
    }

    svg polyline.animation {
        -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
        animation: checkmark .5s ease-in-out 0.1s backwards
    }
</style>