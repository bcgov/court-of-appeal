<template>
    <b-card :style="{height:getHeight}" bg-variant="light" border-variant="white">   

        <b-card no-body v-if="dataLoaded" class="home-content border-white p-0">       
            
            <my-documents-table @reload="loadForms()" v-bind:enableActions="true" v-bind:title="'My Submissions'"></my-documents-table>
            
        </b-card>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";

import { caseJsonDataType } from '@/types/Information/json';
import { form7SubmissionDataInfoType } from '@/types/Information/Form7';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
import { form6FormsJsonDataType } from '@/types/Information/Form6';
import { form9FormsJsonDataType } from '@/types/Information/Form9';

@Component({
    components:{
        MyDocumentsTable
    }
})
export default class MyDocuments extends Vue {

    @form2State.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @form5State.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @form6State.Action
    public UpdateForm6FormsJson!: (newForm6FormsJson: form6FormsJsonDataType[])=> void

    @form7State.Action
    public UpdateForm7FormsJson!: (newForm7FormsJson: form7SubmissionDataInfoType[])=> void

    @form9State.Action
    public UpdateForm9FormsJson!: (newForm9FormsJson: form9FormsJsonDataType[])=> void
    
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
        this.loadForms ()
    }

    public loadForms () {
        this.dataLoaded = false;
        const calls =[]
        calls.push(this.$http.get('/case/'));
        calls.push(this.$http.get('/form5/forms'));
        calls.push(this.$http.get('/form6/forms')); 
        calls.push(this.$http.get('/form7/forms')); 
        calls.push(this.$http.get('/form9/forms'));

        Promise.all(calls).then(values => { 

            if(values[0]?.data) this.UpdateCasesJson(values[0]?.data)
            if(values[1]?.data) this.UpdateForm5FormsJson(values[1]?.data)
            if(values[2]?.data) this.UpdateForm6FormsJson(values[2]?.data)
            if(values[3]?.data) this.UpdateForm7FormsJson(values[3]?.data)
            if(values[4]?.data) this.UpdateForm9FormsJson(values[4]?.data)
            
            this.dataLoaded = true;
        })
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