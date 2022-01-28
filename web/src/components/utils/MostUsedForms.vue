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
                @click="startNewForm6Document"
                target="_blank">
                Notice of Settlement or Abandonment (Form 6)                
            </li>
            <li class="link-button" 
                @click="startNewForm9Document"
                target="_blank">
                Requisition (Form 9)                
            </li>
            <li>Certificate of Readiness</li>
            <li>Affidavit</li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    
    import { namespace } from "vuex-class";
    import "@/store/modules/information";
    const informationState = namespace("Information");

    import "@/store/modules/forms/form9";
    const form9State = namespace("Form9");

    @Component
    export default class MostUsedForms extends Vue {        
        
        @informationState.Action
        public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

        @informationState.Action
        public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

        @form9State.Action
        public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void
                
        public startNewForm2Document(){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" })
        }

        public startNewForm5Document(){
            this.$router.push({name: "start-form5" })
        }

        public startNewForm6Document(){
            this.$router.push({name: "start-form6" })
        }

        public startNewForm7Document(){
            this.UpdateCurrentNoticeOfAppealId(null);
            this.$router.push({name: "checklist-form7" })
        }

        public startNewForm9Document(){
            this.UpdateCurrentRequisitionId(null);
            this.$router.push({name: "start-form9" })
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