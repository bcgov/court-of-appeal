import { form14DataInfoType, form14FormsJsonDataType } from '@/types/Information/Form14';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form14 extends VuexModule {

    public form14FormsJson: form14FormsJsonDataType[] = [];
    public form14Info = {} as form14DataInfoType; 
    public currentConsentOrderRemoveInactiveId = null;

    @Mutation
    public setForm14FormsJson(form14FormsJson: form14FormsJsonDataType[]): void {   
        this.form14FormsJson = form14FormsJson;
    }    
    @Action
    public UpdateForm14FormsJson(newForm14FormsJson: form14FormsJsonDataType[]): void {
        this.context.commit('setForm14FormsJson', newForm14FormsJson);
    }
  
    @Mutation
    public setForm14Info(form14Info: form14DataInfoType): void {   
        this.form14Info = form14Info;
    }    
    @Action
    public UpdateForm14Info(newForm14Info: form14DataInfoType): void {
        this.context.commit('setForm14Info', newForm14Info);
    }

    @Mutation
    public setCurrentConsentOrderRemoveInactiveId(currentConsentOrderRemoveInactiveId: string): void {   
        this.currentConsentOrderRemoveInactiveId = currentConsentOrderRemoveInactiveId;
    }    
    @Action
    public UpdateCurrentConsentOrderRemoveInactiveId(newCurrentConsentOrderRemoveInactiveId: string): void {
        this.context.commit('setCurrentConsentOrderRemoveInactiveId', newCurrentConsentOrderRemoveInactiveId);
    }  
    
}

export default Form14