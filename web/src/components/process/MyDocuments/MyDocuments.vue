<template>
    <b-card border-variant="white">       
        
        <b-container class="container">
            
            <my-documents-table v-bind:enableActions="true" v-bind:title="'My Documents'"></my-documents-table>
            
        </b-container>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";


@Component({
    components:{
        MyDocumentsTable
    }
})
export default class MyDocuments extends Vue {
    
   
}
</script>

<style scoped lang="scss">

@import "src/styles/common";
@import "~@fortawesome/fontawesome-free/css/all.min.css";


</style>