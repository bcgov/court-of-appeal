<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Form 8: </div>
        <b-table            
            :items="form8_info"
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
export default class Form8Table extends Vue {

    @Prop({required:true})
    results!: any;
       
    dataReady = false; 
    
    fields = [
        {key:"completed", label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted", label:"Submitted (eFiled)",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"total", label:"Total Existing Users",               thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]

    form8_info =[]
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.form8_info = [this.results.form8];
    }
   
 
}
</script>