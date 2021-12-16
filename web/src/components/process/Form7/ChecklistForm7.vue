<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
            Notice of Appeal Checklist
        </b-card-header>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-7-did-you-know/>            
        </b-card>  

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-7-qualify-questions @disableContinue="disableNavigateForm7"/>
        </b-card>

        <div
            style="width: 30%; height: 3rem; padding:0;"
            class="mt-4 p-0"
            v-b-tooltip.hover.top.v-warning
            :title="disableContinue?'In order to proceed, you must answer No to the first five questions above.':''">

        <b-button 
            :class="(disableContinue?inactiveButtonClass:activeButtonClass) + ' ml-4 '"
            style="opacity:1;"
             
            :disabled="disableContinue"            
            @click="navigateToForm7()"
            >
            <span style="font-size: 20px;">Continue to Notice of Appeal</span>
        </b-button> 
        </div>     
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import Form7DidYouKnow from "@/components/process/Form7/components/Form7DidYouKnow.vue";
import Form7QualifyQuestions from "@/components/process/Form7/components/Form7QualifyQuestions.vue";

@Component({
    components:{
        Form7DidYouKnow,
        Form7QualifyQuestions
    }
})
export default class ChecklistForm7 extends Vue {    
   
    disableContinue = true;
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white";  

    public disableNavigateForm7(disable: boolean) {
        
        this.disableContinue = disable;
        console.log(disable);
    }

    public navigateToForm7() {        
        this.$router.push({name: "start-form7", params: {orderSelected: 'no'}});        
    }

}
</script>

<style scoped lang="scss">

</style>