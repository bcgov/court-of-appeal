import { form18DataInfoType, form18FormsJsonDataType } from '@/types/Information/Form18';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form18 extends VuexModule {

    public form18FormsJson: form18FormsJsonDataType[] = [];
    public form18Info = {} as form18DataInfoType; 
    public currentNoticeOfRepChangeAddressId = null; 

    @Mutation
    public setForm18FormsJson(form18FormsJson: form18FormsJsonDataType[]): void {   
        this.form18FormsJson = form18FormsJson;
    }    
    @Action
    public UpdateForm18FormsJson(newForm18FormsJson: form18FormsJsonDataType[]): void {
        this.context.commit('setForm18FormsJson', newForm18FormsJson);
    }
  
    @Mutation
    public setForm18Info(form18Info: form18DataInfoType): void {   
        this.form18Info = form18Info;
    }    
    @Action
    public UpdateForm18Info(newForm18Info: form18DataInfoType): void {
        this.context.commit('setForm18Info', newForm18Info);
    }

    @Mutation
    public setCurrentNoticeOfRepChangeAddressId(currentNoticeOfRepChangeAddressId: string): void {   
        this.currentNoticeOfRepChangeAddressId = currentNoticeOfRepChangeAddressId;
    }    
    @Action
    public UpdateCurrentNoticeOfRepChangeAddressId(newCurrentNoticeOfRepChangeAddressId: string): void {
        this.context.commit('setCurrentNoticeOfRepChangeAddressId', newCurrentNoticeOfRepChangeAddressId);
    }  
    
}

export default Form18