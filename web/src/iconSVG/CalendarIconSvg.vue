<template>
    <!-- <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 56 55.9" xmlSpace="preserve">
        <path fill="white" d="M0.1,0v8H56V0H0.1z M0.1,16v39.2c0,0.4,0.3,0.7,0.7,0.7h54.4c0.4,0,0.7-0.3,0.7-0.7V16H0.1L0.1,16z M8.1,24h8v8
        h-8V24z M24,24h8v8h-8V24z M40,24h8v8h-8V24z M8.1,39.9h8v8h-8V39.9z M24,39.9h8v8h-8V39.9z"/>
    </svg> -->
    <!-- <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 86 114" xmlSpace="preserve">
        <g>
            <g>
                <path d="M85.7-0.1H0v5.2V109v5.2h85.7V-0.1z M80.5,109H5.2V5.1h49.3l26,26V109z"/>
                <rect v-if="status == 'completed'" x="5.2" y="5.1" style="fill:#00A651" width="75" height="104"/>
                <rect v-else x="5.2" y="5.1" style="fill:#FFFFFF" width="75" height="104"/>
                                            
            </g>
        </g>
        <g id="Layer_4">
            <path style="fill:#616265" d="M14.5,29.1v8h55.9v-8H14.5z M14.5,45.1v39.2c0,0.4,0.3,0.7,0.7,0.7h54.4c0.4,0,0.7-0.3,0.7-0.7V45.1H14.5
                L14.5,45.1z M22.4,53.1h8v8h-8V53.1z M38.4,53.1h8v8h-8V53.1z M54.4,53.1h8v8h-8V53.1z M22.4,69.1h8v8h-8V69.1z M38.4,69.1h8v8h-8
                V69.1z"/>
            <path v-if="status == 'completed'" style="fill: #FFFFFF" d="M56.5,49.5l-3.9,4.1L36.8,69.4L32.2,65l-4.1-4.1l-8,8l4.1,4.1l8.5,8.5l3.9,4.1l4.1-4.1l19.9-19.9l4.1-4.1 L56.5,49.5z"/>
        </g>
    </svg> -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 86 114" xmlSpace="preserve">
        
        <!-- <polygon style="fill: #FFFFFF" points="60.6,8.8 60.6,26 77.8,26 		"/> -->
        <g>
            <path d="M85.7-0.1H0v5.2V109v5.2h85.7V-0.1z M80.5,109H5.2V5.1h49.3l26,26V109z"/>                        
            <rect x="5.2" y="5.1" style="fill:#FFFFFF" width="75" height="104"/>
            <!-- <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
                L76.9,26z"/> -->
            <polygon style="fill: #FFFFFF" points="60.6,8.8 60.6,26 77.8,26 		"/>                                        
        </g>
        
        <g id="Layer_4" style="margin-top:1rem;">
            <path style="fill:#616265; transform:translate(0, 10px);" d="M14.5,29.1v8h55.9v-8H14.5z M14.5,45.1v39.2c0,0.4,0.3,0.7,0.7,0.7h54.4c0.4,0,0.7-0.3,0.7-0.7V45.1H14.5
                L14.5,45.1z M22.4,53.1h8v8h-8V53.1z M38.4,53.1h8v8h-8V53.1z M54.4,53.1h8v8h-8V53.1z M22.4,69.1h8v8h-8V69.1z M38.4,69.1h8v8h-8 V69.1z"/>                
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class CalendarIconSvg extends Vue {

}
</script>