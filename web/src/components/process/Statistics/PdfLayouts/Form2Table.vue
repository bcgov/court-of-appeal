<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Form 2: </div>
        <b-table            
            :items="form2_info"
            :fields="fields"
            bordered            
            small 
            responsive="sm">

        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Form2Table extends Vue {

    @Prop({required:true})
    results!: any;
       
    dataReady = false; 
    
    fields = [
        {key:"completed", label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted", label:"Submitted (eFiled)",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"total", label:"Total Existing Users",               thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]

    form2_info =[]
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.form2_info = [this.results.form2];
    }
   
 
}
</script>