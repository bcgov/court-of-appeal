import { form10DataInfoType, form10FormsJsonDataType } from '@/types/Information/Form10';
import { previousCourtJsonInfoType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form10 extends VuexModule {

    public form10FormsJson: form10FormsJsonDataType[] = [];
    public form10Info = {} as form10DataInfoType; 
    public currentOrderSingleJusticeId = null; 
    public currentOrder = {} as previousCourtJsonInfoType;

    @Mutation
    public setForm10FormsJson(form10FormsJson: form10FormsJsonDataType[]): void {   
        this.form10FormsJson = form10FormsJson;
    }    
    @Action
    public UpdateForm10FormsJson(newForm10FormsJson: form10FormsJsonDataType[]): void {
        this.context.commit('setForm10FormsJson', newForm10FormsJson);
    }
  
    @Mutation
    public setForm10Info(form10Info: form10DataInfoType): void {   
        this.form10Info = form10Info;
    }    
    @Action
    public UpdateForm10Info(newForm10Info: form10DataInfoType): void {
        this.context.commit('setForm10Info', newForm10Info);
    }

    @Mutation
    public setCurrentOrderSingleJusticeId(currentOrderSingleJusticeId: string): void {   
        this.currentOrderSingleJusticeId = currentOrderSingleJusticeId;
    }    
    @Action
    public UpdateCurrentOrderSingleJusticeId(newCurrentOrderSingleJusticeId: string): void {
        this.context.commit('setCurrentOrderSingleJusticeId', newCurrentOrderSingleJusticeId);
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

export default Form10