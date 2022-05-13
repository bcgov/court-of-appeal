<template>
    <b-card border-variant="white">
        <h3>Orders</h3>
        <ol>           
            <li class="link-button" 
                @click="startNewForm12Document"
                target="_blank">
                Order from an application to vary the order of a justice (Form 12)                
            </li>  
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";

    import "@/store/modules/forms/form12";
    const form12State = namespace("Form12");

    @Component
    export default class Orders extends Vue {        

        @form12State.Action
        public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
                 
        public startNewForm12Document(){
            this.UpdateCurrentOrderToVarySingleJusticeId(null);
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