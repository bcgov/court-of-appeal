<template>
    <b-card class="m-5 bg-light border-white">
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
                
        <b-card class="home-content border-white p-0 my-4"> 
            <h3 class="pt-2">Reports</h3>
            <b-row>
                <b-col cols="2" class="h4 text-primary"> 
                    Dates:
                </b-col>
                <b-col cols="6">
                    <date-range-picker :key="updateReport" :reportRange="reportDateRange" @datesAdded="addReportDateRanges"/>
                </b-col>
                <b-col cols="2"></b-col>
                <b-col cols="2">
                    <b-button
                        name="search"
                        style="margin-top: 0rem; padding: 0.25rem 2rem; width: 100%;" 
                        :disabled="searching"
                        v-on:keyup.enter="find()"
                        variant="primary"
                        @click="find()"
                        ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; height:2rem; transform:translate(0px,-24px);"/>
                        <span style="font-size: 20px;" v-else>Search</span>
                    </b-button>
                </b-col>                
            </b-row>
                   
        </b-card> 

        <loading-spinner color="#000" v-if="searching && !dataLoaded" waitingText="Loading ..." />     

        <b-card v-else-if="!searching && dataLoaded" id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="my-4 container" no-body>   
            <report :results="results"/>
        </b-card>

        

        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Report from "./Report.vue";
import DateRangePicker from './DateRangePicker.vue';
import Spinner from '@/components/utils/Spinner.vue'
import { dateRangeInfoType } from '@/types/Common';


@Component({
    components:{
        Report,
        DateRangePicker,
        Spinner
    }
})
export default class Statistics extends Vue {

    dataLoaded = false;    
    error = '';
    updated = 0;

    printReady = false;
    updateReport = 0;
    reportDateRange: dateRangeInfoType = {startDate:null, endDate:null};

    results;
    searching = false;

    mounted() {  
    
        this.searching = false;
        this.dataLoaded = false;         
    }

    public loadInfo (data) {
        

        this.results = {
            form1: 10,
            form2: 2

        }

        this.dataLoaded = true;
        this.searching = false;
        Vue.nextTick(()=> this.onPrint());  

    }

    public find(){   
       
        this.dataLoaded = false;
        this.searching = true;
        const body = {
            "dates":this.reportDateRange                    
        }

        this.$http.post('/statistics', body)
        .then((response) => {            
            if(response?.data){
                this.loadInfo(response.data);                    
            }
            
            
        },(err) => {
            this.searching = false;           
        });  
        
    }

    public addReportDateRanges(dateRange){
        this.reportDateRange = dateRange
        this.updateReport++;
    }
      
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "Report-" //;
        const el= document.getElementById("print");
        
        const topLeftText    = `"COURT OF APPEAL FOR BRITISH COLUMBIA      FORM 17: CERTIFICATE OF COSTS"`;
        const topRightText   = `"(Rule 77)"`;

        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA      FORM 17: CERTIFICATE OF COSTS (Rule 77)"`;
        const bottomRightText = `" "`;        
        const url = '/report/form-print/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText, topLeftText, topRightText);

        const body = {
            'html':pdfhtml,
            'json_data':this.results
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  

        this.$http.post(url,body, options)
        .then(res => {                       
            this.printReady = true;   
        },err => {
            console.error(err);        
        });
    }

    public savePdf(){        
        const pdfType = "FORM"
        const pdfName ="Report"
        const url = '/report/form-print/?pdf_type='+pdfType
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = pdfName+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);          

        },err => {
            console.error(err);
        });
    }
    


}
</script>

<style scoped lang="scss">

@import "src/styles/common";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

    .home-content {
        padding-bottom: 20px;
        padding-top: 0rem;
        width: 95%;
        color: black;
        margin: 0 auto;
    }

</style>