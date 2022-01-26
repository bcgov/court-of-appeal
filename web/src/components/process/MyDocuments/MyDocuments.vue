<template>
    <b-card :style="{height:getHeight}" bg-variant="light" border-variant="white">   

        <b-card no-body v-if="dataLoaded" class="home-content border-white p-0">       
            
            <my-documents-table @reload="loadCases()" v-bind:enableActions="true" v-bind:title="'My Submissions'"></my-documents-table>
            
        </b-card>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";
import { caseJsonDataType } from '@/types/Information/json';

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { form7SubmissionDataInfoType } from '@/types/Information/Form7';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
const informationState = namespace("Information");

@Component({
    components:{
        MyDocumentsTable
    }
})
export default class MyDocuments extends Vue {

    @informationState.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @informationState.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @informationState.Action
    public UpdateForm7FormsJson!: (newForm7FormsJson: form7SubmissionDataInfoType[])=> void
    
    windowHeight = 0;
    footerHeight = 0;
    headerHeight = 0;
    menubarHeight = 0;

    dataLoaded = false;

    mounted()
    {
        this.dataLoaded = false;     
        window.addEventListener('resize', this.getWindowHeight);
        this.getWindowHeight()
        this.loadCases ();
    }

    public loadCases () {
        this.dataLoaded = false;
        this.$http.get('/case/')
        .then((response) => {
            if(response?.data){            
                this.UpdateCasesJson(response.data)
            }

            this.loadForm7Forms()
        },(err) => {
            this.dataLoaded = true;       
        });
    }

    public loadForm7Forms () {
        this.$http.get('/form7/forms')
        .then((response) => {

            if(response?.data){
                this.UpdateForm7FormsJson(response.data)
                //TODO: call load form5
            }

            this.dataLoaded = true;       
        },(err) => {
            this.dataLoaded = true;   
        });
    }

     //TODO: placeholder
    public loadForm5Forms () {
   
        this.$http.get('/form5/forms')
        .then((response) => {

            if(response?.data){
                const forms = response.data;
                this.UpdateForm5FormsJson(forms)
            }

            this.dataLoaded = true;       
        },(err) => {
            this.dataLoaded = true;
             
        });
    }

    public getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight;
        this.footerHeight = (document.getElementsByName("navigation-footer")[0] as HTMLElement)?.clientHeight;
        this.headerHeight = (document.getElementsByName("navigation-topbar")[0] as HTMLElement)?.clientHeight;
        this.menubarHeight = (document.getElementsByName("menu-bar")[0] as HTMLElement)?.clientHeight;
    }
    
    get getHeight() {        
        return this.windowHeight-this.footerHeight-this.headerHeight-this.menubarHeight-1 + 'px'
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