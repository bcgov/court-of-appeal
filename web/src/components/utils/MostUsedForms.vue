<template>
    <b-card border-variant="white">
        <h3>Most Used Forms</h3>
        <ol>
            <li class="link-button" 
                @click="startNewForm1Document"
                target="_blank">
                Notice of Appeal (Form 1)            
            </li>
            <li class="link-button" 
                @click="startNewForm2Document"
                target="_blank">
                Notice of Appearance (Form 2)                
            </li>
            <li class="link-button" 
                @click="startNewForm3Document"
                target="_blank">
                Notice of Cross Appeal (Form 3)                
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
            <li>Certificate of Readiness</li>
            <li>Affidavit</li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';    
    import { namespace } from "vuex-class";

    import "@/store/modules/forms/form1";
    const form1State = namespace("Form1"); 

    import "@/store/modules/forms/form2";
    const form2State = namespace("Form2");

    import "@/store/modules/forms/form3";
    const form3State = namespace("Form3");

    import "@/store/modules/forms/form5";
    const form5State = namespace("Form5");

    import "@/store/modules/forms/form6";
    const form6State = namespace("Form6");  

    @Component
    export default class MostUsedForms extends Vue {     
        
        @form1State.Action
        public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void
        
        @form2State.Action
        public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void        
      
        @form5State.Action
	    public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void 
        
        @form3State.Action
	    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void            
        
        @form6State.Action
        public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void                
        
        public startNewForm1Document(){
            this.UpdateCurrentNoticeOfAppealId(null);
            this.$router.push({name: "checklist-form1" })
        }  
        
        public startNewForm2Document(){
            this.UpdateCurrentCaseId(null);
            this.$router.push({name: "start-form2" })
        }

        public startNewForm3Document(){
            this.UpdateCurrentNoticeOfCrossAppealId(null);
            this.$router.push({name: "checklist-form3" })
        }

        public startNewForm5Document(){
            this.UpdateCurrentNoticeOfHearingOfAppealId(null);
            this.$router.push({name: "start-form5" })
        }

        public startNewForm6Document(){
            this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
            this.$router.push({name: "start-form6" })
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