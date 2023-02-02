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
        
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Current Users In the System: </div>
        <b-table            
            :items="current_users"
            :fields="currentUsersfields"
            bordered            
            small 
            head-variant="light" 
            responsive="sm">
             
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

    current_users = []
    dataReady = false; 
    
    fields = [
        {key:"active_in_period", label:"Active Users", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"joined_in_period", label:"New Users",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"total", label:"Total Existing Users",               thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]

    currentUsersfields = [
        {key:"loggedInUsers", label:"Users Logged In Today", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"recentUsers",   label:"Users Active within the Last Hour",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"workingForms",  label:"Froms Worked on within the Last Hour",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]

    users_info =[]
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.users_info = [this.results.users_info]

        this.current_users[0]= {
            loggedInUsers:this.results.logged_in_users.length, 
            recentUsers:0, 
            workingForms:"" 
        }
        for(const usr of this.results.logged_in_users){
            let usrIsActive = false
            for(const key of Object.keys(usr)){
                if(usr[key]){
                    usrIsActive = true
                    if(!this.current_users[0].workingForms.includes(key))
                        this.current_users[0].workingForms += (key+', ')
                }
            }

            if(usrIsActive) this.current_users[0].recentUsers ++;
        }

    }
   
 
}
</script>