<template>
    <div class="right-turn">
        <div :style="{position:'relative'}" >
            <div :class="{'journey-circle-right': true, 'circling': circling}" />
            <div :class="{'journey-circle-right': true, 'circling-inside': circling}" />
            <div class="square"/>
            <div class="bend-top-border"/>
            <div class="bend-bottom-border"/>
            <div :class="{'bend-top-border': true,    'top-completed': circling}"/>
            <div :class="{'bend-bottom-border': true, 'bottom-completed': circling}"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class RightTurn extends Vue {

    @Prop({required: false})
    circling!: boolean;

}
</script>





       
