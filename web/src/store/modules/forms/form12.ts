import { form12DataInfoType, form12FormsJsonDataType } from '@/types/Information/Form12';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form12 extends VuexModule {

    public form12FormsJson: form12FormsJsonDataType[] = [];
    public form12Info = {} as form12DataInfoType; 
    public currentOrderToVarySingleJusticeId = null; 

    @Mutation
    public setForm12FormsJson(form12FormsJson: form12FormsJsonDataType[]): void {   
        this.form12FormsJson = form12FormsJson;
    }    
    @Action
    public UpdateForm12FormsJson(newForm12FormsJson: form12FormsJsonDataType[]): void {
        this.context.commit('setForm12FormsJson', newForm12FormsJson);
    }
  
    @Mutation
    public setForm12Info(form12Info: form12DataInfoType): void {   
        this.form12Info = form12Info;
    }    
    @Action
    public UpdateForm12Info(newForm12Info: form12DataInfoType): void {
        this.context.commit('setForm12Info', newForm12Info);
    }

    @Mutation
    public setCurrentOrderToVarySingleJusticeId(currentOrderToVarySingleJusticeId: string): void {   
        this.currentOrderToVarySingleJusticeId = currentOrderToVarySingleJusticeId;
    }    
    @Action
    public UpdateCurrentOrderToVarySingleJusticeId(newCurrentOrderToVarySingleJusticeId: string): void {
        this.context.commit('setCurrentOrderToVarySingleJusticeId', newCurrentOrderToVarySingleJusticeId);
    }  
    
}

export default Form12