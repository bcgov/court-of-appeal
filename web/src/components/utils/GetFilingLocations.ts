import store from '@/store/index';
import * as _ from 'underscore';
import Vue from 'vue'

// export async function GetFilingLocations() {

//     var response = await Axios.get('/locations/?supreme=true');
    
//     if(response?.data){     

//         const locationsInfo = response.data;

//         const sortedLocationsInfo = _.sortBy(locationsInfo, 'name');

//         store.dispatch('Common/UpdateLocationsInfo',sortedLocationsInfo); 
//         return true;
//     }
//     else 
//         return false;    
// }

export function GetFilingLocations() {

    Vue.prototype.$http.get('/locations/?supreme=true')
    .then(response => {
        if(response?.data){     

            const locationsInfo = response.data;

            const sortedLocationsInfo = _.sortBy(locationsInfo, 'name');

            store.dispatch('Common/UpdateLocationsInfo',sortedLocationsInfo); 
            return true;
        }
        else 
            return false;

    },err => {
        console.error(err);
        return false;
    });
}