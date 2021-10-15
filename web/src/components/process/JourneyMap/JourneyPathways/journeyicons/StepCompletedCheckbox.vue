<template>
    <input  type= "checkbox"            
            class= "checkbox-toggle"
            @change= "onChange"
            :disabled= "disabled"
            :checked= "checked"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class StepCompletedCheckbox extends Vue {    

    @Prop({required: false})
    disabled!: boolean;

    @Prop({required: false})
    checked!: boolean;

    public onChange(event) {        
        Vue.nextTick(()=>{
            
            this.$emit('onChange', event?.target?.checked)
        })
    }

}
</script>