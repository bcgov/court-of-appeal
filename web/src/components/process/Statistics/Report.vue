<template>
    <div v-if="dataReady">

        <div style="margin-top:1rem;"><b>Court of Application Reports</b></div>        
        <div style="text-indent:5px;">Form 1</div>
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
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
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

       console.log(this.results)       
        

    }
   
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>