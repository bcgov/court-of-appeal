<template>
    <b-card v-if="dataReady" no-body border-variant="white">

        <b-card class="border-primary bg-primary text-white my-4 mr-5" v-if="selfRep">                    

            <p>
                If you are representing yourself in the Court of Appeal, you will need 
                to learn about the court system and specific procedures in the Court 
                of Appeal. The following link will provide you access to information 
                on the Court of Appeal processes and how you can prepare case:  
                <a  href="https://www.courtofappealbc.ca/?ct=t(primary-menu)"
                    target="_blank"
                    class= "text-white"
                    style="display: block;">Court of Appeal information
                </a>
            </p>                    

        </b-card> 
       
        <p>
            Follow the steps below to complete the appeal process. 
            Follow the instructions until your appeal process is 
            complete. As you progress through your appeal, 
            check the box next to each step below to mark it as complete.            
        </p>

        <p>
            You have indicated that you are responding to an appeal, 
            so you would start by clicking on the Notice of Appearance 
            to complete the Notice of Appearance form.             
        </p>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class rspToAppealInstructions extends Vue {  
    
    selfRep = false;
    dataReady = false;

    mounted() {
        this.dataReady = false;
        this.selfRep = this.$store.state.Common.userSelfRepresented;
        this.dataReady = true;
	}

}

</script>
