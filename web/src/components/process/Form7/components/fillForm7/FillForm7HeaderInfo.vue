<template>
    <b-card no-body class="bg-warning border-warning text-white" >

        <p style="padding-bottom:0; margin: 1rem 1rem 0 1rem; font-size: 16px;">            
            Information on this form has been pre-filled with data from the selected order 
            and account information on file. Review the information on the form for accuracy 
            and fill in anything that may be missing.
        </p>
        <b-button 
            @click="displayResults"
            class="bg-warning border-warning text-white"
            size="sm"
            style="float: left; width: 11rem; padding:0; margin: 0 0 1rem 0.5rem; text-decoration: underline; font-size: 16px;">
            Back to search results
        </b-button>           
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class FillForm7HeaderInfo extends Vue {
   
    public displayResults(){
        this.$emit('displayResults');
    }
}
</script>

<style scoped lang="scss">
</style>