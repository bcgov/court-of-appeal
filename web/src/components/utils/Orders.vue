<template>
    <b-card border-variant="white">
        <h3>Orders</h3>
        <ol>           
            <li class="link-button" 
                @click="startNewForm12Document"
                target="_blank">
                Order from an application to vary the order of a justice (Form 12)                
            </li>  
            <li class="link-button" 
                @click="startNewForm10Document"
                target="_blank">
                Order of a single justice (Form 10)                
            </li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";

    import "@/store/modules/forms/form12";
    const form12State = namespace("Form12");

    import "@/store/modules/forms/form10";
    const form10State = namespace("Form10");

    @Component
    export default class Orders extends Vue {        

        @form12State.Action
        public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void

        @form10State.Action
        public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void
                 
        public startNewForm12Document(){
            this.UpdateCurrentOrderToVarySingleJusticeId(null);
            this.$router.push({name: "checklist-orders"})
        }     

        public startNewForm10Document(){
            this.UpdateCurrentOrderSingleJusticeId(null);
            this.$router.push({name: "checklist-orders"})
        } 

    }

</script>

<style scoped lang="scss">

    @import "src/styles/common";

    .link-button {
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
        color: $text-color-link;
        &:hover, &:focus {
            color: $text-color-link-hover;
        }
    }

</style>