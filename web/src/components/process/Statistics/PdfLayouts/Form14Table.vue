<template>
    <div v-if="dataReady" class="print-block">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Form 14: </div>
        <b-table            
            :items="form14_info"
            :fields="fields"
            bordered            
            small
            head-variant="light" 
            responsive="sm">
        </b-table>
        <div style="font-size:10pt; margin-bottom: 0.5rem;">
            <b>Total Number of Form 14 Applications:</b> {{results.form14.total}} 
        </div>
        <div 
            v-if="displayTopUser" 
            style="font-size:10pt;  margin-bottom: 0.25rem;" >
            Top User: 
        </div>
        <b-table   
            style="font-size:8pt; margin: 0 1rem;"
            v-if="displayTopUser"         
            :items="topUser_info"
            :fields="topUserFields"
            head-variant="light"
            bordered                       
            small 
            responsive="sm">
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { reportInfoType } from '@/types/Common';

@Component
export default class Form14Table extends Vue {

    @Prop({required:true})
    results!: reportInfoType;

    @Prop({required:true})
    displayTopUser!: boolean;
       
    dataReady = false; 
    form14_info = [];
    topUser_info = []; 
    
    fields = [
        {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted",    label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"drafted",      label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"unsuccessful", label:"Unsuccessful eFiling",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"users",        label:"Users filing form",      thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ];  

    topUserFields = [
        {key:"display_name", label:"Full Name", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted",    label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"drafted",      label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"unsuccessful", label:"Unsuccessful eFiling",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"total",        label:"Total Form 14 Applications", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]; 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.form14_info = [this.results.form14];
       this.topUser_info = [this.results.form14.top_user];
    }
 
}
</script>