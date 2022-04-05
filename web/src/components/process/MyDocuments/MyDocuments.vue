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

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";

import { caseJsonDataType } from '@/types/Information/json';
import { form3FormsJsonDataType } from '@/types/Information/Form3';
import { form1DataInfoType } from '@/types/Information/Form1';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
import { form6FormsJsonDataType } from '@/types/Information/Form6';
import { form9FormsJsonDataType } from '@/types/Information/Form9';
import { form18FormsJsonDataType } from '@/types/Information/Form18';
import { form19FormsJsonDataType } from '@/types/Information/Form19';
import { form20FormsJsonDataType } from '@/types/Information/Form20';

@Component({
    components:{
        MyDocumentsTable
    }
})
export default class MyDocuments extends Vue {

    @form2State.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @form3State.Action
    public UpdateForm3FormsJson!: (newForm3FormsJson: form3FormsJsonDataType[])=> void

    @form5State.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @form6State.Action
    public UpdateForm6FormsJson!: (newForm6FormsJson: form6FormsJsonDataType[])=> void

    @form1State.Action
    public UpdateForm1FormsJson!: (newForm1FormsJson: form1DataInfoType[])=> void

    @form9State.Action
    public UpdateForm9FormsJson!: (newForm9FormsJson: form9FormsJsonDataType[])=> void

    @form18State.Action
    public UpdateForm18FormsJson!: (newForm18FormsJson: form18FormsJsonDataType[])=> void

    @form19State.Action
    public UpdateForm19FormsJson!: (newForm19FormsJson: form19FormsJsonDataType[])=> void

    @form20State.Action
    public UpdateForm20FormsJson!: (newForm20FormsJson: form20FormsJsonDataType[])=> void
    
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
        calls.push(this.$http.get('/form9/forms'));
        calls.push(this.$http.get('/form18/forms'));
        calls.push(this.$http.get('/form19/forms'));
        calls.push(this.$http.get('/form20/forms')); 
        calls.push(this.$http.get('/form1/forms'));       
        calls.push(this.$http.get('/form3/forms'));

        Promise.all(calls).then(values => { 

            if(values[0]?.data) this.UpdateCasesJson(values[0]?.data)
            
           
            if(values[1]?.data) this.UpdateForm5FormsJson(values[1]?.data)
            if(values[2]?.data) this.UpdateForm6FormsJson(values[2]?.data)            
            if(values[3]?.data) this.UpdateForm9FormsJson(values[3]?.data)
            if(values[4]?.data) this.UpdateForm18FormsJson(values[4]?.data)
            if(values[5]?.data) this.UpdateForm19FormsJson(values[5]?.data)
            if(values[6]?.data) this.UpdateForm20FormsJson(values[6]?.data)
            if(values[7]?.data) this.UpdateForm1FormsJson(values[7]?.data)
            if(values[8]?.data) this.UpdateForm3FormsJson(values[8]?.data)

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