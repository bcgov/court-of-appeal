<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Summary: </div>

        <div style="font-size:9pt;">
            <b-table-simple small class="border">
    
                <b-thead style="background:#e9ecef">                    
                    <b-tr  style="line-height: 1rem; height:2.5rem;">
                        <b-th>Form Name</b-th>
                        <b-th class="text-center border-right" >Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th class="text-center border-right">Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th class="text-center border-right">Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th class="text-center border-right">Number of Applications</b-th>                          
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>                        
                        <b-th>Form 1</b-th>
                        <b-td class="text-center border-right">{{results.form1.total}}</b-td>
                        <b-th>Form 2</b-th>
                        <b-td class="text-center border-right">{{results.form2.total}}</b-td>
                        <b-th>Form 3</b-th>
                        <b-td class="text-center border-right">{{results.form3.total}}</b-td>
                        <b-th>Form 4</b-th>
                        <b-td class="text-center">{{results.form4.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 5</b-th>
                        <b-td class="text-center border-right">{{results.form5.total}}</b-td>
                        <b-th>Form 6</b-th>
                        <b-td class="text-center border-right">{{results.form6.total}}</b-td>
                        <b-th>Form 7</b-th>
                        <b-td class="text-center border-right">{{results.form7.total}}</b-td>
                        <b-th>Form 8</b-th>
                        <b-td class="text-center">{{results.form8.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 9</b-th>
                        <b-td class="text-center border-right">{{results.form9.total}}</b-td>
                        <b-th>Form 10</b-th>
                        <b-td class="text-center border-right">{{results.form10.total}}</b-td>
                        <b-th>Form 11</b-th>
                        <b-td class="text-center border-right">{{results.form11.total}}</b-td>
                        <b-th>Form 12</b-th>
                        <b-td class="text-center">{{results.form12.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 13</b-th>
                        <b-td class="text-center border-right">{{results.form13.total}}</b-td>
                        <b-th>Form 14</b-th>
                        <b-td class="text-center border-right">{{results.form14.total}}</b-td>
                        <b-th>Form 15</b-th>
                        <b-td class="text-center border-right">{{results.form15.total}}</b-td>
                        <b-th>Form 16</b-th>
                        <b-td class="text-center">{{results.form16.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 17</b-th>
                        <b-td class="text-center border-right">{{results.form17.total}}</b-td>
                        <b-th>Form 18</b-th>
                        <b-td class="text-center border-right">{{results.form18.total}}</b-td>
                        <b-th>Form 19</b-th>
                        <b-td class="text-center border-right">{{results.form19.total}}</b-td>
                        <b-th>Form 20</b-th>
                        <b-td class="text-center">{{results.form20.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 21</b-th>
                        <b-td class="text-center border-right">0</b-td>
                        <b-th>Form 22</b-th>
                        <b-td class="text-center border-right">{{results.form22.total}}</b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                    </b-tr>
                </b-tbody>
                <!-- <b-tfoot>
                    <b-tr>
                        <b-td variant="secondary" class="text-right">
                        Total Applications: <b>5</b>
                        </b-td>
                    </b-tr>
                </b-tfoot> -->
            </b-table-simple>
        </div>


       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { reportInfoType } from '@/types/Common';

@Component
export default class SummaryTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false;
    form1_info = []; 
    
    fields = [
        {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted",    label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"drafted",      label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"unsuccessful", label:"Unsuccessful eFiling",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"users",        label:"Users filing form",      thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]; 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.form1_info = [this.results.form1];
    }   
 
}
</script>