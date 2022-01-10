<template>
    <b-card header-tag="header" style="width: 80rem;" class="mx-auto border-white bg-light">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-7-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card class="my-2 ml-4 bg-light border-light">

            <b-row style="font-size: 2rem;">
                Notice of Appeal Access
            </b-row>                       
           
        </b-card>

        <b-card v-if="dataReady" class="mt-3 mx-2 border-light bg-white">
            <p class="ml-2 mt-2">
                The following users will have access to the package in CSO containing this 
                Notice of Appeal once it has been submitted.
            </p>

            <b-table  
                :items="accessInfo"
                :fields="userFields"
                :key="updated" 
                class="mx-2"
                borderless
                sort-icon-left
                striped
                small 
                responsive="sm"
                >

                <template v-slot:cell(user)="row">                  
                    <span class="text-dark px-1">{{row.value.displayName}}</span>
                </template>

                <template v-slot:cell(readOnly)="row">
                     <b-button 
                        class="bg-transparent access-buttons ml-1"
                        v-if="!row.item.default"
                        :disabled="row.value"
                        @click="makeUserReadOnly(row.item.user)"
                        >
                        <b-icon-check-square scale="1.25" class="text-success" v-if="row.value"/> 
                        <b-icon-square scale="1.25" class="text-success" v-else/> 
                    </b-button>   
                    <b-button 
                        class="bg-transparent access-buttons ml-1"
                        v-else
                        disabled
                        >
                        <b-icon-check-square scale="1.25" class="text-success" v-if="row.value"/>
                    </b-button>                  
                </template>

                <template v-slot:cell(update)="row">  
                    <b-button 
                        class="bg-transparent access-buttons ml-1"
                        v-if="!row.item.default"
                        :disabled="row.value"
                        @click="makeUserReadWrite(row.item.user)"
                        >
                        <b-icon-check-square scale="1.25" class="text-success" v-if="row.value"/> 
                        <b-icon-square scale="1.25" class="text-success" v-else/>
                    </b-button>
                    <b-button 
                        class="bg-transparent access-buttons ml-1"
                        v-else
                        disabled
                        >
                        <b-icon-check-square scale="1.25" class="text-success" v-if="row.value"/>
                    </b-button>
                </template>

                <template v-slot:cell(remove)="row"> 
                    <b-button 
                        class="bg-transparent access-buttons ml-2"
                        v-if="!row.item.default"
                        @click="removeUser(row.item.user)"
                        v-b-tooltip.hover.noninteractive.v-danger
                        title="remove user access">
                        <b-icon-trash-fill variant="danger"/>
                    </b-button>  
                    <b-button 
                        class="bg-transparent ml-2 access-buttons"
                        disabled                        
                        v-else>
                    </b-button>         
                </template>
                        
            </b-table>

            <b-button 
                class="bg-primary text-white my-2 ml-4"
                style="opacity:1;"
                @click="showUserDropdown()">
                <span style="font-size: 18px;">Add User</span>
            </b-button> 

            <b-form-select
                class="ml-4 mt-2"
                style="max-width:25%; display: block;"
                v-if="enableAddUser"
                @change="addUser()"                                                                                                        
                v-model="selectedUser">
                    <b-form-select-option
                        v-for="user in nonAdminUsers" 
                        :key="user.clientId"
                        :value="user">
                            {{user.fullName}}
                    </b-form-select-option>    
            </b-form-select>            

        </b-card>    

        <b-button 
            class="bg-success text-white mt-4 mr-2"
            style="opacity:1; float:right;"
            @click="navigateToForm7()"
            >
            <span style="font-size: 20px;">Fill Notice of Appeal Form</span>
        </b-button>   
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/information";
const informationState = namespace("Information");

import Form7ProcessHeader from "@/components/process/Form7/components/Form7ProcessHeader.vue";
import { accountInfoType, accountUserInfoType, form7StatusInfoType, userAccessInfoType } from '@/types/Information';

@Component({
    components:{
        Form7ProcessHeader
    }
})
export default class AccessForm7 extends Vue {

    @commonState.State
    public accountInfo!: accountInfoType;

    @informationState.State
    public form7AccessInfo!: userAccessInfoType[];

    @informationState.Action
    public UpdateForm7AccessInfo!: (newForm7AccessInfo: userAccessInfoType[]) => void;

    stepsCompleted = {} as form7StatusInfoType;
    selectedUser = {} as accountUserInfoType;
    accessInfo: userAccessInfoType[] = [];
    nonAdminUsers: accountUserInfoType[] = [];
    enableAddUser = false;
    dataReady = false; 
    updated = 0;
    
    userFields = [
        {
            key:'user',          
            label:'User',                  
            thClass: 'border-dark border-bottom text-primary bg-light',            
            sortable:false            
        },
        {
            key:'readOnly',          
            label:'Read Only Access',                  
            thClass: 'border-dark border-bottom text-primary bg-light',            
            sortable:false            
        },
        {
            key:'update',          
            label:'Read/Write Access',                  
            thClass: 'border-dark border-bottom text-primary bg-light',
            sortable:false            
        },
        {
            key:'remove',          
            label:'',  
            thClass: 'border-dark border-bottom text-primary bg-light', 
            sortable:false            
        }
    ]   

    mounted() {  
        this.dataReady = false;

        if (this.form7AccessInfo && this.form7AccessInfo.length > 0){
            this.accessInfo = this.form7AccessInfo;
        } else {
            this.extractAccessInfo();
        }

        this.dataReady = true;       
    }

    public extractAccessInfo(){

        for (const userInfo of this.accountInfo.accountUsers){
            if(userInfo.isAdmin){
                const userAccessInfo = {user: userInfo, readOnly: false, update: true, default: true}
                userAccessInfo.user.displayName = userInfo.fullName + ((userInfo.clientId == this.accountInfo.clientId)?' (yourself)':' (account admin)');
                this.accessInfo.push(userAccessInfo)
            } else if(userInfo.clientId == this.accountInfo.clientId){

                const userAccessInfo = {user: userInfo, readOnly: true, update: false, default: true}
                userAccessInfo.user.displayName = userInfo.fullName + ((userInfo.clientId == this.accountInfo.clientId)?' (yourself)':''); 
                this.accessInfo.push(userAccessInfo)

            } else {
                this.nonAdminUsers.push(userInfo);
            }
        }

    }

    public showUserDropdown() {
        this.enableAddUser = true;        
    }

    public addUser() {
        
        const userIndex = this.accessInfo.findIndex(info => info.user.clientId == this.selectedUser.clientId);        
        if (userIndex == -1){
            const addedUser = this.accountInfo.accountUsers.filter(user => user.clientId == this.selectedUser.clientId)[0]
            addedUser.displayName = addedUser.fullName;            
            this.accessInfo.push({user: addedUser, readOnly: false, update: true, default: false});              
        }
        
        this.selectedUser = {} as accountUserInfoType;     
    }

    public removeUser(userToRemove) {        
        const userIndex = this.accessInfo.findIndex(info => info.user.clientId == userToRemove.clientId)       
        this.accessInfo.splice(userIndex, 1);        
    }

    public makeUserReadOnly(userInfo){
        const userIndex = this.accessInfo.findIndex(info => info.user.clientId == userInfo.clientId)        
        this.accessInfo[userIndex].readOnly = true;
        this.accessInfo[userIndex].update = false;
        this.updated++;
    }

    public makeUserReadWrite(userInfo){
        const userIndex = this.accessInfo.findIndex(info => info.user.clientId == userInfo.clientId)
        this.accessInfo[userIndex].readOnly = false;
        this.accessInfo[userIndex].update = true;
        this.updated ++;
    }

    public navigateToForm7() {
        this.UpdateForm7AccessInfo(this.accessInfo);
        this.$router.push({name: "start-form7", params: {orderSelected: 'no'}});
    } 

}
</script>

<style scoped lang="scss">

    .access-buttons {
        border: none;
    }

</style>