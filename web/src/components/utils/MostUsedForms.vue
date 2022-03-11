<template>
    <b-card border-variant="white">
        <h3>Most Used Forms</h3>
        <ol>
            <li class="link-button" 
                @click="startNewForm7Document"
                target="_blank">
                Notice of Appeal (Form 7)            
            </li>
            <li class="link-button" 
                @click="startNewForm2Document"
                target="_blank">
                Notice of Appearance (Form 2)                
            </li>
            <li class="link-button" 
                @click="startNewForm5Document"
                target="_blank">
                Notice of Hearing of Appeal (Form 5)                
            </li>            
            <li class="link-button" 
                @click="startNewForm9Document"
                target="_blank">
                Requisition (Form 9)                
            </li>
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
            <li>Certificate of Readiness</li>
            <li>Affidavit</li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";

    import "@/store/modules/forms/form2";
    const form2State = namespace("Form2");

    import "@/store/modules/forms/form5";
    const form5State = namespace("Form5");

    import "@/store/modules/forms/form7";
    const form7State = namespace("Form7");

    import "@/store/modules/forms/form9";
    const form9State = namespace("Form9");

    import "@/store/modules/forms/form18";
    const form18State = namespace("Form18");

    import "@/store/modules/forms/form19";
    const form19State = namespace("Form19");

    import "@/store/modules/forms/form20";
    const form20State = namespace("Form20");

    @Component
    export default class MostUsedForms extends Vue {        
        
        @form2State.Action
        public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void        
      
        @form5State.Action
	    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void        

        @form7State.Action
        public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

        @form9State.Action
        public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

        @form18State.Action
        public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void

        @form19State.Action
        public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void

        @form20State.Action
        public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void
                
        public startNewForm2Document(){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" })
        }

        public startNewForm5Document(){
            this.UpdateCurrentNoticeOfHearingOfAppealId(null);
            this.$router.push({name: "start-form5" })
        }

        public startNewForm7Document(){
            this.UpdateCurrentNoticeOfAppealId(null);
            this.$router.push({name: "checklist-form7" })
        }

        public startNewForm9Document(){
            this.UpdateCurrentRequisitionId(null);
            this.$router.push({name: "start-form9" })
        }

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