<template>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px" viewBox="0 0 85.7 114.3" xmlSpace="preserve">
        <polygon style="fill: #00A651" points="85.2,114.3 -0.5,114.3 -0.5,0 51.1,0 85.2,30.9 	"/>        
        <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
            L76.9,26z"/>
        <polygon style="fill: #FFFFFF" points="60.6,8.8 60.6,26 77.8,26 		"/>    
        <g fill="none" stroke="#22AE73" stroke-width="2">             
            <polyline class="animation" stroke="#FFFFFF" stroke-width="10" points="24.5,65.8 38.7,78.9 60.2,50.4 " style="stroke-dasharray:200%, 200%; stroke-dashoffset: 0; opacity:0.95;"/>   
        </g>     
    </svg>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class ApprovedFormIcon extends Vue {

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

    
