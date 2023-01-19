import store from '@/store/index';
import * as _ from 'underscore';

export function GetHearingLocations() {       

    const locationsInfo = [
        {
            name: 'Kamloops', 
            address: 'B.C. Court of Appeal<br>223 - 455 Columbia St.<br>Kamloops BC', 
            postalCode: 'V2C 6K4',
            other: true
        },
        {
            name: 'Kelowna', 
            address: 'B.C. Court of Appeal<br>1 - 1355 Water Street<br>Kelowna, BC', 
            postalCode: 'V1Y 9R3',
            other: true
        },
        {
            name: 'Vancouver', 
            address: 'B.C. Court of Appeal<br>Suite 400, 800 Hornby St.<br>Vancouver BC', 
            postalCode: 'V6Z 2C5',
            other: false
        },
        {
            name: 'Victoria', 
            address: 'B.C. Court of Appeal<br>The Law Courts<br>P.O. Box 9248<br>STN PROV GOVT<br>850 Burdett Ave.<br>Victoria BC', 
            postalCode: 'V8W 1B4',
            other: false
        }

    ]

    const sortedLocationsInfo = _.sortBy(locationsInfo, 'name');

    store.dispatch('Common/UpdateHearingLocationsInfo',sortedLocationsInfo); 
    return true;
    
}