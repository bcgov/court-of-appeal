import store from '@/store/index';
import * as _ from 'underscore';
import Vue from 'vue'


export function GetDocumentTypes() {

    Vue.prototype.$http.get('/document-types/')
    .then(response => {
        if(response?.data && response?.data?.length>0){                
            const documentTypesInfo = response.data;
            store.dispatch('Common/UpdateDocumentTypesJson',documentTypesInfo); 
        }

    },err => {
        console.error(err);
    });
}