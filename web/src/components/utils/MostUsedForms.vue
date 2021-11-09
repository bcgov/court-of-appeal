<template>
    <b-card border-variant="white">
        <h3>Most Used Forms</h3>
        <ol>
            <li>
                <a  class="link-button"
                    :href="form7"
                    target="_blank">
                    Notice of Appeal (Form 7)
                </a>
            </li>
            <li class="link-button" 
                @click="startNewDocument"
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

        form7 = ''

        public startNewDocument(){
            this.$router.push({name: "start" })
        }

    }

</script>

<style scoped lang="scss">

    @import "src/styles/common";

    .link-button {
        text-decoration: underline;
        background-color: transparent;
        color: $text-color-link;
        &:hover, &:focus {
            color: $text-color-link-hover;
        }
    }

</style>