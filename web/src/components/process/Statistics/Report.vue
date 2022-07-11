<template>
    <div v-if="dataReady">
        <div class="row mx-1">
            <div style="font-size:15pt;"><b>Court of Appeal Reports</b></div>
            <div class="font-italic ml-auto mt-2"><b class="mr-2">Between:</b><span class="mr-2">{{results.start_date|beautify-date}}</span> <b>-</b> <span class="ml-2">{{results.end_date|beautify-date}}</span></div>                
        </div>

        <users-info-table class="mt-5" :results="results" />

        <!-- <div style="text-indent:5px;">Form 1</div>
        <table class="fullsize">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Completed: <div class="answer"> {{results.form1}}</div></td>
                <td colspan="3">Submitted: <div class="answer"> {{results.form1}}</div></td>
                <td colspan="3">Drafted: <div class="answer"> {{results.form1}}</div></td>
            </tr>                
        </table>

        <div style="text-indent:5px;margin-top:1rem;">Manual Submissions</div>
        <table class="fullsize">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Submitted: <div class="answer"> {{results.form1}}</div></td>
                <td colspan="3">Affidavitt: <div class="answer"> {{results.form1}}</div></td>
                <td colspan="3">Order x <div class="answer"> {{results.form1}}</div></td>
            </tr>                
        </table>

        <div style="text-indent:5px;margin-top:1rem;">Total</div>
        <table class="fullsize">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Total applications submitted: <div class="answer"> {{results.form2}}</div></td>
                <td colspan="3">Total number of users using the application: <div class="answer"> {{results.form1}}</div></td>
                
            </tr>                
        </table> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersInfoTable from './PdfLayouts/UsersInfoTable.vue'

@Component({
    components:{       
        UsersInfoTable           
    }
})
export default class Report extends Vue {

    @Prop({required:true})
    results!: any;
   
    
    dataReady = false;    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       //console.log(this.results)       
    }
   
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>