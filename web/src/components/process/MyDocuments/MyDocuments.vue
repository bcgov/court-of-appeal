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

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";

import { form1DataInfoType } from '@/types/Information/Form1';
import { caseJsonDataType } from '@/types/Information/json';
import { form3FormsJsonDataType } from '@/types/Information/Form3';
import { form4FormsJsonDataType } from '@/types/Information/Form4';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
import { form6FormsJsonDataType } from '@/types/Information/Form6';
import { form7FormsJsonDataType } from '@/types/Information/Form7';
import { form8FormsJsonDataType } from '@/types/Information/Form8';
import { form9FormsJsonDataType } from '@/types/Information/Form9';
import { form10FormsJsonDataType } from '@/types/Information/Form10';
import { form11FormsJsonDataType } from '@/types/Information/Form11';
import { form12FormsJsonDataType } from '@/types/Information/Form12';
import { form16FormsJsonDataType } from '@/types/Information/Form16';
import { form17FormsJsonDataType } from '@/types/Information/Form17';
import { form18FormsJsonDataType } from '@/types/Information/Form18';
import { form19FormsJsonDataType } from '@/types/Information/Form19';
import { form20FormsJsonDataType } from '@/types/Information/Form20';
import { form22FormsJsonDataType } from '@/types/Information/Form22';

@Component({
    components:{
        MyDocumentsTable
    }
})
export default class MyDocuments extends Vue {

    @form1State.Action
    public UpdateForm1FormsJson!: (newForm1FormsJson: form1DataInfoType[])=> void
    
    @form2State.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @form3State.Action
    public UpdateForm3FormsJson!: (newForm3FormsJson: form3FormsJsonDataType[])=> void

    @form4State.Action
    public UpdateForm4FormsJson!: (newForm4FormsJson: form4FormsJsonDataType[])=> void

    @form5State.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @form6State.Action
    public UpdateForm6FormsJson!: (newForm6FormsJson: form6FormsJsonDataType[])=> void

    @form7State.Action
    public UpdateForm7FormsJson!: (newForm7FormsJson: form7FormsJsonDataType[])=> void

    @form8State.Action
    public UpdateForm8FormsJson!: (newForm8FormsJson: form8FormsJsonDataType[])=> void

    @form9State.Action
    public UpdateForm9FormsJson!: (newForm9FormsJson: form9FormsJsonDataType[])=> void

    @form10State.Action
    public UpdateForm10FormsJson!: (newForm10FormsJson: form10FormsJsonDataType[])=> void

    @form11State.Action
    public UpdateForm11FormsJson!: (newForm11FormsJson: form11FormsJsonDataType[])=> void

    @form12State.Action
    public UpdateForm12FormsJson!: (newForm12FormsJson: form12FormsJsonDataType[])=> void

    @form16State.Action
    public UpdateForm16FormsJson!: (newForm16FormsJson: form16FormsJsonDataType[])=> void

    @form17State.Action
    public UpdateForm17FormsJson!: (newForm17FormsJson: form17FormsJsonDataType[])=> void

    @form18State.Action
    public UpdateForm18FormsJson!: (newForm18FormsJson: form18FormsJsonDataType[])=> void

    @form19State.Action
    public UpdateForm19FormsJson!: (newForm19FormsJson: form19FormsJsonDataType[])=> void

    @form20State.Action
    public UpdateForm20FormsJson!: (newForm20FormsJson: form20FormsJsonDataType[])=> void

    @form22State.Action
    public UpdateForm22FormsJson!: (newForm22FormsJson: form22FormsJsonDataType[])=> void
    
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
        calls.push(this.$http.get('/form4/forms'));
        calls.push(this.$http.get('/form8/forms'));
        calls.push(this.$http.get('/form16/forms'));
        calls.push(this.$http.get('/form7/forms'));
        calls.push(this.$http.get('/form12/forms'));
        calls.push(this.$http.get('/form22/forms'));
        calls.push(this.$http.get('/form10/forms'));
        calls.push(this.$http.get('/form11/forms'));
        // calls.push(this.$http.get('/form17/forms'));

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
            if(values[9]?.data) this.UpdateForm4FormsJson(values[9]?.data)
            if(values[10]?.data) this.UpdateForm8FormsJson(values[10]?.data)
            if(values[11]?.data) this.UpdateForm16FormsJson(values[11]?.data)
            if(values[12]?.data) this.UpdateForm7FormsJson(values[12]?.data)
            if(values[13]?.data) this.UpdateForm12FormsJson(values[13]?.data)
            if(values[14]?.data) this.UpdateForm22FormsJson(values[14]?.data)
            if(values[15]?.data) this.UpdateForm10FormsJson(values[15]?.data)
            if(values[16]?.data) this.UpdateForm11FormsJson(values[16]?.data)
            // if(values[17]?.data) this.UpdateForm17FormsJson(values[17]?.data)

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