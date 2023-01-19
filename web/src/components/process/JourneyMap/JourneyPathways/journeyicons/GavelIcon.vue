<template>
    <div :class="{'journey-box': true, 'inactive': !active}"
        :style="{marginTop: '21px', zIndex: '13'}"
    >
        <StepCompletedCheckbox
            :style="{position: 'relative', marginTop: '0', left: '-35%'}"
            @onChange="completed"
            :show="active"
            :disabled="!ready"
            :checked="status == 'completed'"
        />
        <span :style="{position: 'relative', top: '5px', left: active ? '-28%' : '-28%', zIndex: '9'}">{{order}}</span>
        <div class="file-container" @click="action">
            <div :class="{'journey-icon': active, 'file-main': true, 'inactive': !active}">                
                <gavel-icon-svg-checked v-if="status == 'completed'" />
                <gavel-icon-svg v-else/>
            </div>
        </div>
        <div class="step-title-container" :style="{top:'73px'}" @click="action">
            <div v-if="stepTitle" :class="{'step-title': active, 'step-title-optional': !active}">{{stepTitle}}</div>
            <div v-if="stepTitleOptional" class="step-title-optional">{{stepTitleOptional}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import StepCompletedCheckbox from './StepCompletedCheckbox.vue';
import GavelIconSvg from '@/iconSVG/GavelIconSvg.vue'
import GavelIconSvgChecked from '@/iconSVG/GavelIconSvgChecked.vue'

@Component({
    components:{
        StepCompletedCheckbox,
        GavelIconSvg,
        GavelIconSvgChecked
    }
})

export default class GavelIcon extends Vue {


    @Prop({required: false})
    active!: boolean;

    @Prop({required: false})
    status!: string;

    @Prop({required: false})
    stepTitleOptional!: string;

    @Prop({required: true})
    stepTitle!: string;  

    @Prop({required: false})
    ready!: boolean;

    @Prop({required: true})
    order!: number;    

    @Prop({required: false})
    stepTitleClass!: string;

    public action(){
        this.$emit('action')
    }
    public completed(checked) {
        this.$emit('completed', this.order-1, checked)
    }

}
</script>
