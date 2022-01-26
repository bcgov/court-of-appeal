<template>
    <b-card border-variant="white" body-class="mx-0 px-3 py-0">
        <b-row>
            <b-col>
                <h3 :class="enableActions? 'pt-2' :'mt-1 mb-0'">{{title}}</h3>
            </b-col>            
        </b-row>
        
        <table-form-2 class="mt-0 mx-0" :enableActions="enableActions" @reload="reload"/>
        <table-form-7 :class="enableActions?'mt-4 mx-0':'mt-1 mx-0'" :enableActions="enableActions" @reload="reload"/>
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


import TableForm2 from './Tables/TableForm2.vue'
import TableForm7 from './Tables/TableForm7.vue'

@Component({
    components:{
        TableForm2,
        TableForm7
    }
})
export default class MyDocumentsTable extends Vue {

    @Prop({required: true})
    title!: string;

    @Prop({required: true})
    enableActions!: boolean;
   
    mounted() {        
    }

    public reload(){
        this.$emit('reload')
    }

}
</script>
