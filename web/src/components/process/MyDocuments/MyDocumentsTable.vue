<template>
    <b-card border-variant="white" body-class="mx-0 px-3 py-0">
        <b-row v-if="enableActions">
            <b-col cols="6">
                <h3 :class="enableActions? 'pt-2' :'mt-1 mb-0'">{{title}}</h3>
            </b-col>
            <b-col cols="6">    
                <b-button 
                    style="float:right;"
                    size="sm" 
                    variant="success" 
                    @click="showSelectFormToFill=true">
                    New Form
                    <b-icon-plus scale="1.5" variant="white"/>
                </b-button>            
            </b-col> 
        </b-row>
        
        <table-form-1 :class="enableActions?'mt-1 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-2 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>        
        <table-form-3 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-4 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-5 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-6 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>  
        <table-form-7 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/> 
        <table-form-8 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>      
        <table-form-9 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-10 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-11 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-12 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-16 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-18 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-19 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-20 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-22 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>

        <new-form-modal :showSelectFormToFill="showSelectFormToFill" @closeModal="CloseModal" />
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TableForm1 from './Tables/TableForm1.vue'
import TableForm2 from './Tables/TableForm2.vue'
import TableForm3 from './Tables/TableForm3.vue'
import TableForm4 from './Tables/TableForm4.vue'
import TableForm5 from './Tables/TableForm5.vue'
import TableForm6 from './Tables/TableForm6.vue'
import TableForm7 from './Tables/TableForm7.vue'
import TableForm8 from './Tables/TableForm8.vue'
import TableForm9 from './Tables/TableForm9.vue'
import TableForm10 from './Tables/TableForm10.vue'
import TableForm11 from './Tables/TableForm11.vue'
import TableForm12 from './Tables/TableForm12.vue'
import TableForm16 from './Tables/TableForm16.vue'
import TableForm18 from './Tables/TableForm18.vue'
import TableForm19 from './Tables/TableForm19.vue'
import TableForm20 from './Tables/TableForm20.vue'
import TableForm22 from './Tables/TableForm22.vue'

import NewFormModal from './NewFormModal.vue'

@Component({
    components:{
        TableForm1,
        TableForm2,
        TableForm3,
        TableForm4,
        TableForm5,
        TableForm6,
        TableForm7,
        TableForm8, 
        TableForm9,  
        TableForm10,
        TableForm11,
        TableForm12,
        TableForm16,
        TableForm18, 
        TableForm19,
        TableForm20,  
        TableForm22,     
        NewFormModal
    }
})
export default class MyDocumentsTable extends Vue {

    @Prop({required: true})
    title!: string;

    @Prop({required: true})
    enableActions!: boolean;

    showSelectFormToFill=false
   
    mounted() {        
    }

    public reload(){
        this.$emit('reload')
    }

    public CloseModal(){
        this.showSelectFormToFill=false
    }

}
</script>
