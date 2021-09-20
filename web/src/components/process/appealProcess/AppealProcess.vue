<template>
    <b-card border-variant="white">
        
        <h1>The Appeal Process</h1>
        <p>
            You are receiving the Notice of Appeal because a previous court case you were in is being appealed. 
            If you would like to be updated about the status of the appeal, and would like to participate in the 
            appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the 
            first form. As you progress through your appeal journey, check the box next to each step below to mark 
            it as complete.
        </p>
        <p>
            Every appeal process is unique. If you have any questions, please visit the 
            <a 
                href="https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal" 
                target="_blank">Online Guidebook
            </a> or 
            <a 
                href="mailto:courts.cso@gov.bc.ca">contact the registry
            </a>.
        </p>
        <JourneyMap />
    </b-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
   
    import JourneyMap from "../JourneyMap/JourneyMap.vue"

    @Component({
        components:{
           JourneyMap
        }
    })
    export default class AppealProcess extends Vue {

        

    }

</script>

<style>

</style>