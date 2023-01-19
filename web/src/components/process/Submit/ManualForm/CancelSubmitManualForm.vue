<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">
            
            <div  style="float: right;">
                <b-icon-x-circle-fill class="icon-complete mt-2" variant="secondary"/>
                <span style="font-size: 2rem;" class="step-complete text-secondary mr-4 ml-4 mb-2">E-Filing Cancelled</span>               
            </div>

            <b-card no-body class="border-white bg-white mx-4"> 
                <b-row class="ml-5 my-3" style="font-size: 14px;">
                    <b-col cols="10">
                        <div class="h3 text-white bg-secondary p-3 text-center" style="margin: 0.5rem 0; width:22rem; border-radius:10px; "> E-Filing has been cancelled. </div>
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
import { Component, Vue } from 'vue-property-decorator';


@Component({
    components:{
    }
})
export default class CancelSubmitManualForm extends Vue {

 
    mountedData = false;     

    mounted() {
        this.mountedData = false;
        this.deleteApplication();
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
