import { form7DataInfoType, form7FormsJsonDataType } from '@/types/Information/Form7';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form7 extends VuexModule {

    public form7FormsJson: form7FormsJsonDataType[] = [];
    public form7Info = {} as form7DataInfoType; 
    public currentNoticeOfUrgentApplicationId = null; 

    @Mutation
    public setForm7FormsJson(form7FormsJson: form7FormsJsonDataType[]): void {   
        this.form7FormsJson = form7FormsJson;
    }    
    @Action
    public UpdateForm7FormsJson(newForm7FormsJson: form7FormsJsonDataType[]): void {
        this.context.commit('setForm7FormsJson', newForm7FormsJson);
    }
  
    @Mutation
    public setForm7Info(form7Info: form7DataInfoType): void {   
        this.form7Info = form7Info;
    }    
    @Action
    public UpdateForm7Info(newForm7Info: form7DataInfoType): void {
        this.context.commit('setForm7Info', newForm7Info);
    }

    @Mutation
    public setCurrentNoticeOfUrgentApplicationId(currentNoticeOfUrgentApplicationId: string): void {   
        this.currentNoticeOfUrgentApplicationId = currentNoticeOfUrgentApplicationId;
    }    
    @Action
    public UpdateCurrentNoticeOfUrgentApplicationId(newCurrentNoticeOfUrgentApplicationId: string): void {
        this.context.commit('setCurrentNoticeOfUrgentApplicationId', newCurrentNoticeOfUrgentApplicationId);
    }  
    
}

export default Form7