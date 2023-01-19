import { form19DataInfoType, form19FormsJsonDataType } from '@/types/Information/Form19';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form19 extends VuexModule {

    public form19FormsJson: form19FormsJsonDataType[] = [];
    public form19Info = {} as form19DataInfoType; 
    public currentNoticeOfWithdrawalOfLawyerId = null; 

    @Mutation
    public setForm19FormsJson(form19FormsJson: form19FormsJsonDataType[]): void {   
        this.form19FormsJson = form19FormsJson;
    }    
    @Action
    public UpdateForm19FormsJson(newForm19FormsJson: form19FormsJsonDataType[]): void {
        this.context.commit('setForm19FormsJson', newForm19FormsJson);
    }
  
    @Mutation
    public setForm19Info(form19Info: form19DataInfoType): void {   
        this.form19Info = form19Info;
    }    
    @Action
    public UpdateForm19Info(newForm19Info: form19DataInfoType): void {
        this.context.commit('setForm19Info', newForm19Info);
    }

    @Mutation
    public setCurrentNoticeOfWithdrawalOfLawyerId(currentNoticeOfWithdrawalOfLawyerId: string): void {   
        this.currentNoticeOfWithdrawalOfLawyerId = currentNoticeOfWithdrawalOfLawyerId;
    }    
    @Action
    public UpdateCurrentNoticeOfWithdrawalOfLawyerId(newCurrentNoticeOfWithdrawalOfLawyerId: string): void {
        this.context.commit('setCurrentNoticeOfWithdrawalOfLawyerId', newCurrentNoticeOfWithdrawalOfLawyerId);
    }  
    
}

export default Form19