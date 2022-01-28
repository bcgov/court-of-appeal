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

    @Component
    export default class MostUsedForms extends Vue {        
        
        @informationState.Action
        public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

        @informationState.Action
        public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void
                
        public startNewForm2Document(){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" })
        }

        public startNewForm5Document(){
            this.$router.push({name: "start-form5" })
        }

        public startNewForm7Document(){
            this.UpdateCurrentNoticeOfAppealId(null);
            this.$router.push({name: "checklist-form7" })
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