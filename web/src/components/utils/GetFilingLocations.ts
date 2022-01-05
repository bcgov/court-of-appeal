import store from '@/store/index';
import Axios from "axios";

export async function GetFilingLocations() {

    var response = await Axios.get('/locations/?supreme=true');
    
    if(response?.data){     

        const locationsInfo = response.data;

        store.dispatch('Common/UpdateLocationsInfo',locationsInfo); 
        return true;
    }
    else 
        return false;    
}