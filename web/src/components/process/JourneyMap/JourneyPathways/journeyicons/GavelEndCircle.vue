<template>
    <div class="action-end-point" onClick="this.props.action" >
        <div :class="{'any-icon':true,'journey-end-circle':true, 'completed-step': completed}" >
            <svg class="appellant-leave-hearing" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 51.9 58.8" xmlSpace="preserve">
                <g>
                    <g>
                        <path fill="white" d="M13.1,19.3l15-15c1-1,1-2.6,0-3.5s-2.6-1-3.5,0l-15,15c-1,1-1,2.6,0,3.5C10.5,20.3,12.1,20.3,13.1,19.3z"/>
                        <path fill="white" d="M51.1,23.7c-1-1-2.6-1-3.5,0l-15,15c-1,1-1,2.6,0,3.5c1,1,2.6,1,3.5,0l15-15C52.1,26.3,52.1,24.7,51.1,23.7z"
                            />
                        <path fill="white" d="M45,22.8l-6.2-6.2l0.9-0.9c1-1,1-2.6,0-3.5l-0.9-0.9c-1-1-2.6-1-3.5,0l-0.9,0.9L29,6.9L15.8,20.2l5.3,5.3
                            L0.7,45.8c-1,1-1,2.6,0,3.5l0.9,0.9c1,1,2.6,1,3.5,0l20.3-20.3l6.2,6.2L45,22.8z"/>
                    </g>
                    <path fill="white" d="M49.4,55h-1.3v-1.3c0-1.4-1.1-2.5-2.5-2.5H19.4c-1.4,0-2.5,1.1-2.5,2.5V55h-1.3c-1.4,0-2.5,0.8-2.5,1.9
                        c0,1,1.1,1.9,2.5,1.9h3.8h26.3h3.8c1.4,0,2.5-0.8,2.5-1.9C51.9,55.9,50.7,55,49.4,55z"/>
                </g>
            </svg>
        </div>
        <div v-if="stepTitle" class="end-step-title" :style="titleStyle">{{stepTitle}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class GavelEndCircle extends Vue {

    @Prop({required: false})
    completed!: boolean;

    @Prop({required: false})
    stepTitle!: string;

    @Prop({required: false})
    titleStyle!: string;

}
</script>