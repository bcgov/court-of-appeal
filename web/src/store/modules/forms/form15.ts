import { form15DataInfoType, form15FormsJsonDataType } from '@/types/Information/Form15';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form15 extends VuexModule {

    public form15FormsJson: form15FormsJsonDataType[] = [];
    public form15Info = {} as form15DataInfoType; 
    public currentConsentOrderId = null;

    @Mutation
    public setForm15FormsJson(form15FormsJson: form15FormsJsonDataType[]): void {   
        this.form15FormsJson = form15FormsJson;
    }    
    @Action
    public UpdateForm15FormsJson(newForm15FormsJson: form15FormsJsonDataType[]): void {
        this.context.commit('setForm15FormsJson', newForm15FormsJson);
    }
  
    @Mutation
    public setForm15Info(form15Info: form15DataInfoType): void {   
        this.form15Info = form15Info;
    }    
    @Action
    public UpdateForm15Info(newForm15Info: form15DataInfoType): void {
        this.context.commit('setForm15Info', newForm15Info);
    }

    @Mutation
    public setCurrentConsentOrderId(currentConsentOrderId: string): void {   
        this.currentConsentOrderId = currentConsentOrderId;
    }    
    @Action
    public UpdateCurrentConsentOrderId(newCurrentConsentOrderId: string): void {
        this.context.commit('setCurrentConsentOrderId', newCurrentConsentOrderId);
    }  
    
}

export default Form15