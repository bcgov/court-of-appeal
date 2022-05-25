<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        
        <b-card class="ml-2 mt-2 border-white" >
        
            <p style="font-size: 1.25rem; ">Court of Appeal Case Information</p>

            <p class="mt-3">
                Find the Court of Appeal case that you are wanting to create a Notice of 
                Application to Vary an Order of a Justice form for by entered the following case information:
            </p>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Level of Court" 
                label-for="level-of-court">
                <b-form-input 
                    id="level-of-court"
                    style="max-width:75%" 
                    :disabled="true"
                    v-model="levelOfCourt">
                </b-form-input>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Court of Appeal File no." 
                label-for="court-of-appeal-file-no">
                <b-form-input 
                    id="court-of-appeal-file-no"
                    style="max-width:75%" 
                    :state="fileNumberState? null:false"
                    v-model="searchParams.file">
                </b-form-input>
                <span 
                    style="font-size: 0.75rem;" 
                    class="text-secondary ml-2">ex. CA12345
                </span>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Party" 
                label-for="party">
                <b-form-radio-group
                    id="party"
                    style="max-width:75%" 
                    :state="partyState? null:false"
                    v-model="searchParams.searchBy"
                    :options="partyOptions"                
                ></b-form-radio-group>
            
            </b-form-group>

            <b-form-group
                v-if="searchParams.searchBy=='Organization'"
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Organization Name" 
                label-for="organization-name">
                <b-form-input 
                    id="organization-name"
                    style="width:150%" 
                    v-model="searchParams.organizationName">
                </b-form-input>
            </b-form-group>

            <div v-else>

                <b-form-group
                    class="mx-1" 
                    label-cols-sm="3"
                    content-cols-sm="3"
                    label="First Name" 
                    label-for="first-name">
                    <b-form-input 
                        id="first-name"
                        style="max-width:75%" 
                        v-model="searchParams.firstName">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    class="mx-1" 
                    label-cols-sm="3"
                    content-cols-sm="3"
                    label="Last Name" 
                    label-for="last-name">
                    <b-form-input 
                        id="last-name"
                        style="max-width:75%" 
                        v-model="searchParams.lastName">
                    </b-form-input>
                </b-form-group>            
            </div>
            <!-- <div>
                <h2 v-if="notFound" style="float:left" class="mt-4"><b-badge variant="danger">No such Court of Appeal document found</b-badge></h2>           
            </div> -->


            <b-button 
                style="float: right;  width: 80px; height: 50px; opacity:1;" 
                :disabled="searching"
                variant="success"
                @click="findFile()"
                ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
                <span style="font-size: 20px;" v-else>Find</span>
            </b-button>   
        </b-card> 

        <b-card v-if="resultsReady && !searching" class="ml-2 mt-2 border-white">
            <hr class="mb-4">
            <h2 class="text-primary mx-3">Results</h2>
            <p v-if="notFound">
                No such Court of Appeal document found.
            </p>
            <b-card 
                v-else
                no-body 
                class="mx-3 mb-5 border-white">                
                <div v-if="orders.length > 0">
                    <b-table
                        :items="orders"
                        :fields="orderFields" 
                        striped                   
                        small
                        responsive="sm">

                        <template v-slot:cell(ScheduleDate)="data">
                            {{data.value | beautify-date}}
                        </template>

                        
                        <template v-slot:cell(edit)="data">                            
                            <b-button 
                                size="sm" 
                                variant="primary" 
                                @click="selectOrder(data.item)">
                                Select Order
                            </b-button>                       
                        </template>  

                        <template v-slot:cell(JudgmentDate)="data" >
                            <span style="font-size: 16px;">
                                {{data.value | beautify-date}}</span>
                        </template>
                    </b-table>
                    
                </div>

                <hr class="my-4 text-primary">

                <b-row class="text-primary">
                    <b-col class="mx-2" cols="8">
                        <p v-if="orders.length>0">
                            If the order is not listed in the table above,
                            you may enter the data manually. 
                        </p>
                        <p v-else>
                            There are no orders on file,
                            you may enter the data manually. 
                        </p>
                    </b-col>
                    <b-col>
                        <b-button
                            class="bg-transparent border-primary text-primary ml-4"                        
                            @click="otherOrder"
                            >Enter Order Information
                            <b-icon-pencil-square class="ml-1 mr-0" variant="primary" scale="1" />
                        </b-button>
                    </b-col>
                </b-row>
               
                
            </b-card> 

        </b-card>           
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import { form8SearchInfoType, orderInfoDataType } from '@/types/Information/Form8';
import { chambersHearingJsonInfoType, partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form8CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @form8State.Action
    public UpdateCurrentOrder!: (newCurrentOrder: chambersHearingJsonInfoType) => void
    
    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void
    
    levelOfCourt = "Court of Appeal";

    fileNumberState = true;
    partyState = true;

    dataReady = false;
    resultsReady = false;
    searching = false;

    searchParams = {} as form8SearchInfoType;
    notFound = false;
    orders: chambersHearingJsonInfoType[] = [];

    orderFields =  
    [
        {
            key:'ScheduleDate',          
            label:'Judgment Date',                  
            thClass: 'text-white bg-court',
            thStyle: 'font-size: 1rem;',            
            sortable:false            
        }, 
        {
            key:'JudgeFullName',          
            label:'Judge Full Name',   
            thClass: 'text-white bg-court', 
            thStyle: 'font-size: 1rem;',          
            sortable:false            
        }, 
        {
            key:'edit',          
            label:'',   
            thClass: 'text-white bg-court',           
            sortable:false            
        }     
    ];
    partyOptions = [
        {text: 'Individual', value: 'Individual'},
        {text: 'Organization', value: 'Organization'}
    ];

    mounted(){
        this.fileNumberState = true;
        this.partyState = true;
        this.dataReady = false;
        this.resultsReady = false;
        this.orders = [];
        this.searching = false;
        this.dataReady = true; 
    }

    public selectOrder(courtOrder: chambersHearingJsonInfoType){
        this.UpdateCurrentOrder(courtOrder);
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);            
        this.$router.push({name: "fill-form8"});
    }

    public otherOrder(){
        this.UpdateCurrentOrder(null);
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);            
        this.$router.push({name: "fill-form8"});
    }

    public extractInfo(courtOrders: chambersHearingJsonInfoType[]){

        let orders: orderInfoDataType[] = [];
        orders = courtOrders;

        for(const orderInx in orders){
            //console.log(orderInx)
            orders[orderInx].JudgeFullName = orders[orderInx].JudgeLastName? 
                ('The Honourable ' +  
                (orders[orderInx].JudgeSalutation? orders[orderInx].JudgeSalutation + ' ':'Justice ') + 
                (orders[orderInx].JudgeFirstName? orders[orderInx].JudgeFirstName + ' ':'' )+ 
                (orders[orderInx].JudgeLastName? orders[orderInx].JudgeLastName:''))
                :'UNKNOWN';
        }

        return orders;        
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        this.fileNumberState = true;
        this.partyState = true;

        if(!this.searchParams.file){
            this.fileNumberState = false;
            this.searching = false;
            return
        }

        if(!this.searchParams.searchBy){
            this.partyState = false;
            this.searching = false;
            return
        }
        
        const url = '/form7s/?'+
            'caseNumber='+(this.searchParams.file?this.searchParams.file:'')+
            '&firstName='+(this.searchParams.firstName?this.searchParams.firstName:'')+
            '&lastName='+(this.searchParams.lastName?this.searchParams.lastName:'')+
            '&searchBy='+(this.searchParams.searchBy?this.searchParams.searchBy:'')+
            '&organizationName='+(this.searchParams.organizationName?this.searchParams.organizationName:'')+
            '&addChambersHearing=True'; 
        
        this.$http.get(url)
        .then(res => {
            if (res.data){

                if(res.data?.parties){
                    this.UpdatePartiesJson(res.data.parties);
                    this.UpdateFileNumber(this.searchParams.file)                
                }

                if(res.data?.chambersHearing){
                    this.orders = this.extractInfo(res.data?.chambersHearing);                    
                } 
                //console.log(this.orders)
                
                this.notFound = false;

            } else {
                this.notFound = true;
            }
            this.searching = false;
            this.resultsReady = true;
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;     
        });
    }
}
</script>

<style scoped lang="scss">



</style>