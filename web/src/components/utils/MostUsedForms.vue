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
            <li>Certificate of Readiness</li>
            <li>Affidavit</li>
            <li>Notice of Hearing Appeal</li>
        </ol>
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
   
    @Component
    export default class MostUsedForms extends Vue {        

        public startNewForm2Document(){
            this.$router.push({name: "start-form2" })
        }

        public startNewForm7Document(){
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