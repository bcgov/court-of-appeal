<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">


        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">
            <div  style="float: right;">
                <b-icon-x-circle-fill class="icon-complete mt-2" variant="danger"/>
                <span style="font-size: 2rem;" class="step-complete text-danger mr-4 ml-4 mb-2">Error in E-Filing Submission</span>                
            </div>


            <b-card no-body class="border-white bg-white mx-4"> 
                <b-row class="ml-5 my-3" style="font-size: 14px;">
                    <b-col cols="10">
                        <div class="h3 text-white bg-dark p-3 text-center" style="margin: 0.5rem 0; width:60rem; border-radius:10px; "> 
                            <div class="my-3">There has been an error while attempting to E-File your Application For Order that No Fees are Payable.</div>
                            <div class="text-warning my-5">Error Message: {{errMsg}}</div>                                                
                            <div class="my-3">
                                Please try again. If this error persists contact 
                                <span style="color:#39C; cursor:pointer;" @click="contactUs();" >support</span>.
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="2">
                        <div style="position: absolute; top: 45%; left:30% " >
                            <b-button
                                variant="success"
                                @click="done()"
                                >
                                Done
                        </b-button> 
                        </div>
                    </b-col>                           
                </b-row>
            </b-card>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';


@Component({
    components:{
    }
})
export default class ErrorSubmitManualForm extends Vue {
    
    @Prop({required: true, default:" "})
    errMsg!: string;
 
    mountedData = false;     

    mounted() {
        this.mountedData = false;        
        this.deleteApplication()       
        this.mountedData = true;                   
    }
    
    public deleteApplication() {

        const caseId = this.$route.params?.id
        const data ={
            data:{
                ids:[caseId]
            }
        }

        const url = '/manual-submissions/forms';
        this.$http.delete(url, data)
        .then(response => {
        }, err => {            
        })
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

    .step-complete {
        font-size: 20px; 
        font-weight: 700; 
        display: inline-block; 
        transform:translate(10px,-22px);
    }

    .icon-complete {
        width: 82px;
        height: 82px;
        transform:translate(15px,7px);
    }

</style>
