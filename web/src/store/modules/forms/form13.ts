import { form13DataInfoType, form13FormsJsonDataType } from '@/types/Information/Form13';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form13 extends VuexModule {

    public form13FormsJson: form13FormsJsonDataType[] = [];
    public form13Info = {} as form13DataInfoType; 
    public currentConsentOrderExtendTimeId = null;

    @Mutation
    public setForm13FormsJson(form13FormsJson: form13FormsJsonDataType[]): void {   
        this.form13FormsJson = form13FormsJson;
    }    
    @Action
    public UpdateForm13FormsJson(newForm13FormsJson: form13FormsJsonDataType[]): void {
        this.context.commit('setForm13FormsJson', newForm13FormsJson);
    }
  
    @Mutation
    public setForm13Info(form13Info: form13DataInfoType): void {   
        this.form13Info = form13Info;
    }    
    @Action
    public UpdateForm13Info(newForm13Info: form13DataInfoType): void {
        this.context.commit('setForm13Info', newForm13Info);
    }

    @Mutation
    public setCurrentConsentOrderExtendTimeId(currentConsentOrderExtendTimeId: string): void {   
        this.currentConsentOrderExtendTimeId = currentConsentOrderExtendTimeId;
    }    
    @Action
    public UpdateCurrentConsentOrderExtendTimeId(newCurrentConsentOrderExtendTimeId: string): void {
        this.context.commit('setCurrentConsentOrderExtendTimeId', newCurrentConsentOrderExtendTimeId);
    }  
    
}

export default Form13