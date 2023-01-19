import { form6DataInfoType, form6FormsJsonDataType } from '@/types/Information/Form6';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form6 extends VuexModule {

    public form6FormsJson: form6FormsJsonDataType[] = [];
    public form6Info = {} as form6DataInfoType; 
    public currentNoticeOfSettlementOrAbandonmentId = null; 

    @Mutation
    public setForm6FormsJson(form6FormsJson: form6FormsJsonDataType[]): void {   
        this.form6FormsJson = form6FormsJson;
    }    
    @Action
    public UpdateForm6FormsJson(newForm6FormsJson: form6FormsJsonDataType[]): void {
        this.context.commit('setForm6FormsJson', newForm6FormsJson);
    }
  
    @Mutation
    public setForm6Info(form6Info: form6DataInfoType): void {   
        this.form6Info = form6Info;
    }    
    @Action
    public UpdateForm6Info(newForm6Info: form6DataInfoType): void {
        this.context.commit('setForm6Info', newForm6Info);
    }

    @Mutation
    public setCurrentNoticeOfSettlementOrAbandonmentId(currentNoticeOfSettlementOrAbandonmentId: string): void {   
        this.currentNoticeOfSettlementOrAbandonmentId = currentNoticeOfSettlementOrAbandonmentId;
    }    
    @Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId(newCurrentNoticeOfSettlementOrAbandonmentId: string): void {
        this.context.commit('setCurrentNoticeOfSettlementOrAbandonmentId', newCurrentNoticeOfSettlementOrAbandonmentId);
    }  
    
}

export default Form6