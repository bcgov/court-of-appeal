<template> 
    <div class="fa-stack fa-3x" >
        <i :class="active?iconActiveClass:iconInActiveClass" ></i>
        <strong :class="active?numberActiveClass:numberInActiveClass">{{stepNumber}}</strong>
    </div>
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

    iconInActiveClass = "fa fa-circle-thin text-inactive fa-stack-2x"
    numberInActiveClass = "fa-stack-1x text-inactive"   

}

</script>

<style>

</style>