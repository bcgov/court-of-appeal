<template>
    <b-card header-tag="header" bg-variant="white" border-variant="white" class="mx-auto">

        <b-card-header header-bg-variant="warning" header-border-variant="white" header-text-variant="white"> 
            <fill-form-7-header-info @displayResults="displayResults"/>
        </b-card-header>        

        <fill-form-7-summary-info />

        

        

       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FillForm7HeaderInfo from "@/components/process/Form7/components/fillForm7/FillForm7HeaderInfo.vue";
import FillForm7SummaryInfo from "@/components/process/Form7/components/fillForm7/FillForm7SummaryInfo.vue";
import { form2StatusInfoType } from '@/types/Information';

@Component({
    components:{
        FillForm7HeaderInfo,
        FillForm7SummaryInfo
    }
})
export default class FillForm7 extends Vue {

      

    mounted() {  
             
    }

    public displayResults(){
        this.$emit('displayResults');
    }
}
</script>

<style scoped lang="scss">



</style>