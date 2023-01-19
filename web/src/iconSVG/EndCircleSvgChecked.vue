<template>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px">
        <g fill="none" stroke="#000" stroke-width="3"> 
            <circle cx="47" cy="47" r="45" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
            <circle id="colored" fill="#00A651" cx="47" cy="47" r="44" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
            <polyline class="st0" stroke="#fff" stroke-width="9" points="28.5,47.8 40.7,60.9 64.2,32.4 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px; opacity:0.95;"/>   
        </g> 
    </svg>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class EndCircleSvgChecked extends Vue {

}
</script>

<style scoped>

@-webkit-keyframes checkmark {
    0% {stroke-dashoffset: 100px}
    100% {stroke-dashoffset: 200px}
}

@-ms-keyframes checkmark {
    0% {stroke-dashoffset: 100px}
    100% {stroke-dashoffset: 200px}
}

@keyframes checkmark {
    0% {stroke-dashoffset: 100px}
    100% {stroke-dashoffset: 0px}
}

@-webkit-keyframes checkmark-circle {
    0% {stroke-dashoffset: 480px}
    100% {stroke-dashoffset: 960px}
}

@-ms-keyframes checkmark-circle {
    0% {stroke-dashoffset: 240px;}
    100% {stroke-dashoffset: 480px}
}

@keyframes checkmark-circle {
    0% {stroke-dashoffset: 480px;}
    100% {stroke-dashoffset: 960px}
}

@keyframes colored-circle { 
    0% {opacity:0;}
    100% {opacity:100;}
}

svg polyline {
    -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
    animation: checkmark 0.25s ease-in-out 0.7s backwards
}

svg circle {
    -webkit-animation: checkmark-circle 0.6s ease-in-out backwards;
    animation: checkmark-circle 0.6s ease-in-out 0.1s backwards;
}

svg circle#colored {
    -webkit-animation: colored-circle 0.6s ease-in-out 0.7s backwards;
    animation: colored-circle 0.6s ease-in-out 0.7s backwards;
} 

</style>