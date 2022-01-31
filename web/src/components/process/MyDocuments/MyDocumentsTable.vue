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
        
        <table-form-2 class="mt-0 mx-0" :enableActions="enableActions" @reload="reload"/>
        <table-form-5 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
        <table-form-7 :class="enableActions?'mt-5 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>

        <new-form-modal :showSelectFormToFill="showSelectFormToFill" @closeModal="CloseModal" />
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


import TableForm2 from './Tables/TableForm2.vue'
import TableForm5 from './Tables/TableForm5.vue'
import TableForm7 from './Tables/TableForm7.vue'

import NewFormModal from './NewFormModal.vue'

@Component({
    components:{
        TableForm2,
        TableForm5,
        TableForm7,
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
