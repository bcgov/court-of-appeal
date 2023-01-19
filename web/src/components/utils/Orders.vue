<template>
    <b-card border-variant="white">
        <h3>Orders</h3>
        <ol>            
            <li class="link-button" 
                @click="startNewForm10Document"
                target="_blank">
                Order of a single justice (Form 10)                
            </li>
            <li class="link-button" 
                @click="startNewForm11Document"
                target="_blank">
                Order of three or more justices (Form 11)                
            </li>
             <li class="link-button" 
                @click="startNewForm12Document"
                target="_blank">
                Order from an application to vary the order of a justice (Form 12)                
            </li>  
            <li class="link-button" 
                @click="startNewForm13Document"
                target="_blank">
                Consent order to extend time to file a document (Form 13)                
            </li>
            <li class="link-button" 
                @click="startNewForm14Document"
                target="_blank">
                Consent order to remove an appeal from the inactive list (Form 14)                
            </li>
            <li class="link-button" 
                @click="startNewForm15Document"
                target="_blank">
                Consent Order - General (Form 15)                
            </li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";    

    import "@/store/modules/forms/form10";
    const form10State = namespace("Form10");

    import "@/store/modules/forms/form11";
    const form11State = namespace("Form11");

    import "@/store/modules/forms/form12";
    const form12State = namespace("Form12");

    import "@/store/modules/forms/form13";
    const form13State = namespace("Form13");

    import "@/store/modules/forms/form14";
    const form14State = namespace("Form14");

    import "@/store/modules/forms/form15";
    const form15State = namespace("Form15");

    @Component
    export default class Orders extends Vue {       
        
        @form10State.Action
        public UpdateCurrentOrderSingleJusticeId!: (newCurrentOrderSingleJusticeId: string) => void
        
        @form11State.Action
        public UpdateCurrentOrderMultipleJusticesId!: (newCurrentOrderMultipleJusticesId: string) => void
        
        @form12State.Action
        public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void

        @form13State.Action
        public UpdateCurrentConsentOrderExtendTimeId!: (newCurrentConsentOrderExtendTimeId: string) => void

        @form14State.Action
        public UpdateCurrentConsentOrderRemoveInactiveId!: (newCurrentConsentOrderRemoveInactiveId: string) => void

        @form15State.Action
        public UpdateCurrentConsentOrderId!: (newCurrentConsentOrderId: string) => void

        public startNewForm10Document(){
            this.UpdateCurrentOrderSingleJusticeId(null);
            this.$router.push({name: "checklist-orders"})
        }          
        
        public startNewForm11Document(){
            this.UpdateCurrentOrderMultipleJusticesId(null);
            this.$router.push({name: "checklist-orders"})
        } 

        public startNewForm12Document(){
            this.UpdateCurrentOrderToVarySingleJusticeId(null);
            this.$router.push({name: "checklist-orders"})
        }  

        public startNewForm13Document(){
            this.UpdateCurrentConsentOrderExtendTimeId(null);
            this.$router.push({name: "checklist-orders"})
        }  

        public startNewForm14Document(){
            this.UpdateCurrentConsentOrderRemoveInactiveId(null);
            this.$router.push({name: "checklist-orders"})
        }  

        public startNewForm15Document(){
            this.UpdateCurrentConsentOrderId(null);
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