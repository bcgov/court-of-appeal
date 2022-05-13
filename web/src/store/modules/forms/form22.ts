import { form22DataInfoType, form22FormsJsonDataType } from '@/types/Information/Form22';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form22 extends VuexModule {

    public form22FormsJson: form22FormsJsonDataType[] = [];
    public form22Info = {} as form22DataInfoType; 
    public currentNoFeesPayableId = null; 

    @Mutation
    public setForm22FormsJson(form22FormsJson: form22FormsJsonDataType[]): void {   
        this.form22FormsJson = form22FormsJson;
    }    
    @Action
    public UpdateForm22FormsJson(newForm22FormsJson: form22FormsJsonDataType[]): void {
        this.context.commit('setForm22FormsJson', newForm22FormsJson);
    }
  
    @Mutation
    public setForm22Info(form22Info: form22DataInfoType): void {   
        this.form22Info = form22Info;
    }    
    @Action
    public UpdateForm22Info(newForm22Info: form22DataInfoType): void {
        this.context.commit('setForm22Info', newForm22Info);
    }

    @Mutation
    public setCurrentNoFeesPayableId(currentNoFeesPayableId: string): void {   
        this.currentNoFeesPayableId = currentNoFeesPayableId;
    }    
    @Action
    public UpdateCurrentNoFeesPayableId(newCurrentNoFeesPayableId: string): void {
        this.context.commit('setCurrentNoFeesPayableId', newCurrentNoFeesPayableId);
    }  
    
}

export default Form22