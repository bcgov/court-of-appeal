import { form20DataInfoType, form20FormsJsonDataType } from '@/types/Information/Form20';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form20 extends VuexModule {

    public form20FormsJson: form20FormsJsonDataType[] = [];
    public form20Info = {} as form20DataInfoType; 
    public currentNoticeOfObjectionToWithdrawalId = null; 

    @Mutation
    public setForm20FormsJson(form20FormsJson: form20FormsJsonDataType[]): void {   
        this.form20FormsJson = form20FormsJson;
    }    
    @Action
    public UpdateForm20FormsJson(newForm20FormsJson: form20FormsJsonDataType[]): void {
        this.context.commit('setForm20FormsJson', newForm20FormsJson);
    }
  
    @Mutation
    public setForm20Info(form20Info: form20DataInfoType): void {   
        this.form20Info = form20Info;
    }    
    @Action
    public UpdateForm20Info(newForm20Info: form20DataInfoType): void {
        this.context.commit('setForm20Info', newForm20Info);
    }

    @Mutation
    public setCurrentNoticeOfObjectionToWithdrawalId(currentNoticeOfObjectionToWithdrawalId: string): void {   
        this.currentNoticeOfObjectionToWithdrawalId = currentNoticeOfObjectionToWithdrawalId;
    }    
    @Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId(newCurrentNoticeOfObjectionToWithdrawalId: string): void {
        this.context.commit('setCurrentNoticeOfObjectionToWithdrawalId', newCurrentNoticeOfObjectionToWithdrawalId);
    }  
    
}

export default Form20