import { form11DataInfoType, form11FormsJsonDataType } from '@/types/Information/Form11';
import { previousCourtJsonInfoType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form11 extends VuexModule {

    public form11FormsJson: form11FormsJsonDataType[] = [];
    public form11Info = {} as form11DataInfoType; 
    public currentOrderMultipleJusticesId = null; 
    public currentOrder = {} as previousCourtJsonInfoType;

    @Mutation
    public setForm11FormsJson(form11FormsJson: form11FormsJsonDataType[]): void {   
        this.form11FormsJson = form11FormsJson;
    }    
    @Action
    public UpdateForm11FormsJson(newForm11FormsJson: form11FormsJsonDataType[]): void {
        this.context.commit('setForm11FormsJson', newForm11FormsJson);
    }
  
    @Mutation
    public setForm11Info(form11Info: form11DataInfoType): void {   
        this.form11Info = form11Info;
    }    
    @Action
    public UpdateForm11Info(newForm11Info: form11DataInfoType): void {
        this.context.commit('setForm11Info', newForm11Info);
    }

    @Mutation
    public setCurrentOrderMultipleJusticesId(currentOrderMultipleJusticesId: string): void {   
        this.currentOrderMultipleJusticesId = currentOrderMultipleJusticesId;
    }    
    @Action
    public UpdateCurrentOrderMultipleJusticesId(newCurrentOrderMultipleJusticesId: string): void {
        this.context.commit('setCurrentOrderMultipleJusticesId', newCurrentOrderMultipleJusticesId);
    }  

    @Mutation
    public setCurrentOrder(currentOrder: previousCourtJsonInfoType): void {   
        this.currentOrder = currentOrder;
    }    
    @Action
    public UpdateCurrentOrder(newCurrentOrder: previousCourtJsonInfoType): void {
        this.context.commit('setCurrentOrder', newCurrentOrder);
    }
    
}

export default Form11