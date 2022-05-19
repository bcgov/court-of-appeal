import store from '@/store/index';
import Axios from "axios";
import * as _ from 'underscore';

export async function GetInstructionFile(pdf_name: string) {

    const url = '/print-fillable-pdf?name='+pdf_name
    const options = {
        responseType: "blob",
        headers: {
        "Content-Type": "application/json",
        }
    }
    this.$http.get(url, options)
    .then(res => {
        const blob = res.data;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.download = pdf_name+".pdf";
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);  
        return true;           

    },err => {
        console.error(err);
        return false;
    });



    // var response = await Axios.get('/locations/?supreme=true');
    
    // if(response?.data){     

    //     const locationsInfo = response.data;

    //     const sortedLocationsInfo = _.sortBy(locationsInfo, 'name');

    //     store.dispatch('Common/UpdateLocationsInfo',sortedLocationsInfo); 
    //     return true;
    // }
    // else 
    //     return false;    
}