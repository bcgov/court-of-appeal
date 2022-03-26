<template>
    <b-card border-variant="white">
        <h3>Representation/Change of Address Forms</h3>
        <ol>           
            <li class="link-button" 
                @click="startNewForm18Document"
                target="_blank">
                Notice of Change of Representation/Change of Address for Service (Form 18)                
            </li>  
            <li class="link-button" 
                @click="startNewForm19Document"
                target="_blank">
                Notice of Withdrawal of Lawyer (Form 19)                
            </li> 
            <li class="link-button" 
                @click="startNewForm20Document"
                target="_blank">
                Notice of Objection to Withdrawal (Form 20)                
            </li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";

    import "@/store/modules/forms/form18";
    const form18State = namespace("Form18");

    import "@/store/modules/forms/form19";
    const form19State = namespace("Form19");

    import "@/store/modules/forms/form20";
    const form20State = namespace("Form20");

    @Component
    export default class RepresentationAddressForms extends Vue {        

        @form18State.Action
        public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void

        @form19State.Action
        public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void

        @form20State.Action
        public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void
                
        public startNewForm18Document(){
            this.UpdateCurrentNoticeOfRepChangeAddressId(null);
            this.$router.push({name: "start-form18" })
        }

        public startNewForm19Document(){
            this.UpdateCurrentNoticeOfWithdrawalOfLawyerId(null);
            this.$router.push({name: "start-form19" })
        }

        public startNewForm20Document(){
            this.UpdateCurrentNoticeOfObjectionToWithdrawalId(null);
            this.$router.push({name: "start-form20" })
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