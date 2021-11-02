<template>
    <div class="left-turn">
        <div :style="{position:'relative'}" >
            <div :class="{'journey-circle-left': true, 'circling-back': circling}" />
            <div :class="{'journey-circle-left': true, 'circling-back-inside': circling}" />
            <div class="left-square"/>
            <div class="bend-top-left-border"/>
            <div class="bend-bottom-left-border"/>
            <div :class="{'bend-top-left-border': true,    'top-left-completed': circling}"/>
            <div :class="{'bend-bottom-left-border': true, 'bottom-left-completed': circling}"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class LeftTurn extends Vue {

    @Prop({required: false})
    circling!: boolean;

}
</script>
