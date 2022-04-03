<template>
    <b-card no-body class="bg-white border-white">
        <b-card bg-variant="light" v-if= "!dataReady">
            <b-overlay :show= "true"> 
                <b-card  style="min-height: 100px;"/>                   
                <template v-slot:overlay>               
                <div> 
                    <loading-spinner waitingText="Loading ..." />                        
                </div>                
                </template> 
            </b-overlay> 
        </b-card>

        <b-table
            v-else  
            :items="orderList"
            :fields="orderFields"
            class="mx-2"                        
            sort-by="orderDate"
            :sort-desc="true"
            borderless            
            striped
            small 
            responsive="sm"
            >            

            <template v-slot:cell(action)="row">
                <span v-if="row.item.isPastDeadline" class="text-secondary">Past 30-day deadline</span>
                <b-button v-else 
                    variant="bg-transparent" 
                    class="text-primary" 
                    style="padding-top:0;"
                    @click="selectOrder(row.item)">
                    Appeal this Order                    
                </b-button>                                     
            </template>
            
            <template v-slot:cell(orderDate)="row" >                  
                <span
                    :class="row.item.isPastDeadline?'text-secondary':'text-dark'">
                    {{ row.item.orderDate | beautify-date}}
                </span>
            </template>

            <template v-slot:cell(appealSubmissionDeadline)="row">                  
                <span 
                    :class="row.item.isPastDeadline?'text-secondary':'text-dark'">
                    {{ row.item.appealSubmissionDeadline | beautify-date-weekday}}
                </span>
            </template>
            
        </b-table>    
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';

@Component
export default class Form1SearchOrderDetails extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void

    @informationState.Action
    public UpdateSupremeCourtOrderJson!: (newSupremeCourtOrderJson: supremeCourtOrdersJsonInfoType) => void

    dataReady = false;
    orderList: supremeCourtOrdersJsonInfoType[] = [];

    orderFields = [
              
        {
            key: "judgeDisplayName",
            label: "Name of Judge",
            sortable: false
        },
        {
            key: "orderDate",
            label: "Date of Order",
            sortable: true
        },
        {
            key: "appealSubmissionDeadline",
            label: "Deadline to File and Serve",
            sortable: false
        },        
        {
            key: "action",
            label: "",
            sortable: false
        }
    ];

    mounted(){
        this.dataReady = false;
        Vue.nextTick().then(() => { 
            this.extractCaseOrders();
        });
    }

    public extractCaseOrders(){
        
        this.orderList = [];
        for (const order of this.supremeCourtCaseJson.orders){            
            order.judgeDisplayName = order.honorificTitle + ' ' + order.judgeSurname;            
            this.orderList.push(order)
        }
       
        this.dataReady = true;
    }


    public selectOrder(selectedOrder: supremeCourtOrdersJsonInfoType){
        const caseInfo = this.supremeCourtCaseJson
        const url = '/file-detail/parties/'+ caseInfo.fileId; 
        this.dataReady = false;
        this.$http.get(url)
        .then(res => {            
            if(res.data){ 
                caseInfo.parties = res.data
            }

            this.UpdateSupremeCourtCaseJson(caseInfo);
            this.UpdateSupremeCourtOrderJson(selectedOrder);
            this.dataReady = true;
            this.$emit('selectOrder');
            
        }, error =>{
            caseInfo.parties =[]
            this.UpdateSupremeCourtCaseJson(caseInfo);
            this.UpdateSupremeCourtOrderJson(selectedOrder);
            this.dataReady = true;
            this.$emit('selectOrder');
        })

        
    }
    
}
</script>