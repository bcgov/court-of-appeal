<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-20-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mt-2 mb-4" style="font-size: 2rem;">
                Error in E-Filing
            </b-row>

            <b-card no-body class="border-white bg-white mx-4"> 
                <b-row class="ml-5 my-3" style="font-size: 14px;">
                    <b-col cols="10">
                        <div class="h3 text-white bg-dark p-3 text-center" style="margin: 0.5rem 0; width:60rem; border-radius:10px; "> 
                            <div class="my-3">There has been an error while attempting to E-File your Notice of Objection to Withdrawal.</div>
                            <div class="text-warning my-5">Error Message: {{errMsg}}</div>                                                
                            <div class="my-3">
                                Please try again. If this error persists contact 
                                <span style="color:#39C; cursor:pointer;" @click="contactUs();" >support</span>.
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="2">
                        <b-button                         
                            style="margin: 1rem 2rem; float: right;" 
                            variant="success"
                            @click="done()"
                            >
                            Done
                        </b-button> 
                    </b-col>                           
                </b-row>
            </b-card>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import Form20ProcessHeader from "@/components/process/Form20/components/Form20ProcessHeader.vue";
import { form20StatusInfoType } from '@/types/Information/Form20';

@Component({
    components:{
        Form20ProcessHeader
    }
})
export default class ErrorSubmitForm20 extends Vue {
    
    @Prop({required: true, default:" "})
    errMsg!: string;

    stepsCompleted = {} as form20StatusInfoType;  
    mountedData = false;     

    mounted() {
        this.mountedData = false;        

        this.stepsCompleted = {
            first: true,
            second: true,
            third: false,
            thirdError:true
        }
        this.mountedData = true;                   
    }    

    public done() {
        this.$router.push({name: "dashboard" }) 
    }

    public contactUs(){
        const ContactButton = document.getElementsByName("contact-us");
        if(ContactButton[0]) ContactButton[0].click()
    }
}
</script>

<style scoped lang="scss">



</style>