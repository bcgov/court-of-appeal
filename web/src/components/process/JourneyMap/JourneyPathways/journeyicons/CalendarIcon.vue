<template>
    <div :class="{'journey-box': true, 'inactive': !active}">
        <StepCompletedCheckbox
            :style="{position: 'relative', top: '-7px', left: '-25%'}"
            @onChange="completed"
            :show="active"
            :disabled="!ready"
            :checked="status == 'completed'"
        />
        <span :style="{position: 'relative',top:'-1px',left: '-20%', zIndex: '9'}">{{order}}</span>
        <div class="cal-container" @click="action">
            <div class="journey-icon calendar-image">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 86 114" xmlSpace="preserve">
                    <g>
                        <g>
                            <path d="M85.7-0.1H0v5.2V109v5.2h85.7V-0.1z M80.5,109H5.2V5.1h49.3l26,26V109z"/>
                            <rect x="5.2" y="5.1" style="fill:#FFFFFF" width="75" height="104"/>
                        </g>
                    </g>
                    <g id="Layer_4">
                        <path style="fill:#616265" d="M14.5,29.1v8h55.9v-8H14.5z M14.5,45.1v39.2c0,0.4,0.3,0.7,0.7,0.7h54.4c0.4,0,0.7-0.3,0.7-0.7V45.1H14.5
                            L14.5,45.1z M22.4,53.1h8v8h-8V53.1z M38.4,53.1h8v8h-8V53.1z M54.4,53.1h8v8h-8V53.1z M22.4,69.1h8v8h-8V69.1z M38.4,69.1h8v8h-8
                            V69.1z"/>
                    </g>
                </svg>
            </div>
        </div>
        <div :class="['step-title-container', stepTitleClass]" @click="action">
            <div class="step-title" style="width:10rem; margin:0 auto; padding-left:1rem;">{{stepTitle}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import StepCompletedCheckbox from './StepCompletedCheckbox.vue';

@Component({
    components:{
        StepCompletedCheckbox,
    }
})

export default class  CalendarIcon extends Vue {

    @Prop({required: false})
    status!: string;

    @Prop({required: false})
    stepTitleClass!: string;

    @Prop({required: false})
    active!: boolean;

    @Prop({required: false})
    ready!: boolean;

    @Prop({required: true})
    order!: number;

    @Prop({required: false})
    stepTitle!: string;


    public action(){
        this.$emit('action')
    }
    public completed() {
        this.$emit('completed', this.order)
    }
}
</script>