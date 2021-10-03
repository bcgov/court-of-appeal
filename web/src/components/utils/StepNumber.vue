<template> 
        <span class="fa-stack fa-2x" >
            <i :class="active?iconActiveClass:iconInActiveClass" ></i>
            <strong :class="active?numberActiveClass:numberInActiveClass">{{stepNumber}}</strong>
        </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StepNumber extends Vue {

    @Prop({required: true})
    stepNumber!: number;

    @Prop({required: true})
    active!: boolean;

    iconActiveClass = "fa fa-circle-thin text-dark fa-stack-2x"
    numberActiveClass = "fa-stack-1x text-dark"

    iconInActiveClass = "fa fa-circle-thin text-secondary fa-stack-2x"
    numberInActiveClass = "fa-stack-1x text-secondary"   

}

</script>

<style>

</style>