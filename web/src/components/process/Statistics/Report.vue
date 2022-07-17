<template>
    <div v-if="dataReady">
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div class="row mx-1">
            <!-- <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b> -->
            <div style="font-size:15pt;"><b>Court of Appeal Reports</b></div>
            <div class="font-italic ml-auto mt-2"><b class="mr-2">Between:</b><span class="mr-2">{{results.start_date|beautify-date}}</span> <b>-</b> <span class="ml-2">{{results.end_date|beautify-date}}</span></div>                
        </div>

        <users-info-table class="mt-5" :results="results" />
        <summary-table class="mt-5" :results="results" />
        <manual-submission-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-1-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-2-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-3-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-4-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-5-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-6-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-7-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-8-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-9-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-10-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-11-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-12-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-13-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-14-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-15-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-16-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-17-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-18-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-19-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-20-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <!-- <form-21-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/> -->
        <form-22-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersInfoTable from './PdfLayouts/UsersInfoTable.vue';
import SummaryTable from './PdfLayouts/SummaryTable.vue';
import ManualSubmissionTable from './PdfLayouts/ManualSubmissionTable.vue';
import Form1Table from './PdfLayouts/Form1Table.vue';
import Form2Table from './PdfLayouts/Form2Table.vue';
import Form3Table from './PdfLayouts/Form3Table.vue';
import Form4Table from './PdfLayouts/Form4Table.vue';
import Form5Table from './PdfLayouts/Form5Table.vue';
import Form6Table from './PdfLayouts/Form6Table.vue';
import Form7Table from './PdfLayouts/Form7Table.vue';
import Form8Table from './PdfLayouts/Form8Table.vue';
import Form9Table from './PdfLayouts/Form9Table.vue';
import Form10Table from './PdfLayouts/Form10Table.vue';
import Form11Table from './PdfLayouts/Form11Table.vue';
import Form12Table from './PdfLayouts/Form12Table.vue';
import Form13Table from './PdfLayouts/Form13Table.vue';
import Form14Table from './PdfLayouts/Form14Table.vue';
import Form15Table from './PdfLayouts/Form15Table.vue';
import Form16Table from './PdfLayouts/Form16Table.vue';
import Form17Table from './PdfLayouts/Form17Table.vue';
import Form18Table from './PdfLayouts/Form18Table.vue';
import Form19Table from './PdfLayouts/Form19Table.vue';
import Form20Table from './PdfLayouts/Form20Table.vue';
import Form21Table from './PdfLayouts/Form21Table.vue';
import Form22Table from './PdfLayouts/Form22Table.vue';
import { reportInfoType } from '@/types/Common';

@Component({
    components:{       
        UsersInfoTable,
        SummaryTable,
        ManualSubmissionTable,
        Form1Table,
        Form2Table,
        Form3Table,
        Form4Table,
        Form5Table,
        Form6Table,
        Form7Table,
        Form8Table,
        Form9Table,
        Form10Table,
        Form11Table,
        Form12Table,
        Form13Table,
        Form14Table,
        Form15Table,
        Form16Table,
        Form17Table,
        Form18Table,
        Form19Table,
        Form20Table,
        Form21Table,
        Form22Table
    }
})
export default class Report extends Vue {

    @Prop({required:true})
    results!: reportInfoType;

    @Prop({required:true})
    displayTopUser!: boolean;
       
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