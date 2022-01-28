import { DirectiveOptions } from  'vue';
import Sortable from 'sortablejs';
import store from "@/store"; 

const sortStyleOfProceeding: DirectiveOptions = {
    bind(el,  binding, vnode) {
        const tableRows = el.querySelector('tbody');
         Sortable.create(tableRows, {        
            animation: 50,
            handle: '.handle', 
            chosenClass: 'is-selected',
            sort: true,

            onEnd: function(evt: any) {                
                changeOrder(evt.oldIndex, evt.newIndex)                
            }
        })
    }
}

export default sortStyleOfProceeding;

function changeOrder(oldIndex, newIndex){

    const msops = store.state.Information.form7ManualSopOrder
      
    const movingSop = msops[oldIndex]
    msops.splice(oldIndex, 1);
    msops.splice(newIndex,0, movingSop);    

    store.commit('Information/setForm7ManualSopOrder',msops)   
}