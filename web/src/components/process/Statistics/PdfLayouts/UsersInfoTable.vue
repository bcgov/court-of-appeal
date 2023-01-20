<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Users: </div>
        <b-table            
            :items="users_info"
            :fields="fields"
            bordered            
            small 
            head-variant="light" 
            responsive="sm">
             <template v-slot:head(joined_in_period)>
                New Users Joined 
                <div style="font-size:8pt; font-weight:300;">
                  ( between: {{results.start_date|beautify-date}} - {{results.end_date|beautify-date}} )
                </div>
            </template>
            <template v-slot:head(active_in_period)>
                Active Users 
                <div style="font-size:8pt; font-weight:300;">
                   ( between: {{results.start_date|beautify-date}} - {{results.end_date|beautify-date}} )
                </div>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { reportInfoType } from '@/types/Common';

@Component
export default class UsersInfoTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false; 
    
    fields = [
        {key:"active_in_period", label:"Active Users", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"joined_in_period", label:"New Users",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"total", label:"Total Existing Users",               thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]

    users_info =[]
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.users_info = [this.results.users_info]
    }
   
 
}
</script>