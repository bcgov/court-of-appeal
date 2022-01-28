import store from '@/store/index';
import Axios from "axios";
import * as _ from 'underscore';

export async function GetFilingLocations() {

    var response = await Axios.get('/locations/?supreme=true');
    
    if(response?.data){     

        const locationsInfo = response.data;

        const sortedLocationsInfo = _.sortBy(locationsInfo, 'name');

        store.dispatch('Common/UpdateLocationsInfo',sortedLocationsInfo); 
        return true;
    }
    else 
        return false;    
}