import { form3DataInfoType, form3FormsJsonDataType } from '@/types/Information/Form3';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form3 extends VuexModule {

    public form3FormsJson: form3FormsJsonDataType[] = [];
    public form3Info = {} as form3DataInfoType; 
    public currentNoticeOfCrossAppealId = null; 

    @Mutation
    public setForm3FormsJson(form3FormsJson: form3FormsJsonDataType[]): void {   
        this.form3FormsJson = form3FormsJson;
    }    
    @Action
    public UpdateForm3FormsJson(newForm3FormsJson: form3FormsJsonDataType[]): void {
        this.context.commit('setForm3FormsJson', newForm3FormsJson);
    }
  
    @Mutation
    public setForm3Info(form3Info: form3DataInfoType): void {   
        this.form3Info = form3Info;
    }    
    @Action
    public UpdateForm3Info(newForm3Info: form3DataInfoType): void {
        this.context.commit('setForm3Info', newForm3Info);
    }

    @Mutation
    public setCurrentNoticeOfCrossAppealId(currentNoticeOfCrossAppealId: string): void {   
        this.currentNoticeOfCrossAppealId = currentNoticeOfCrossAppealId;
    }    
    @Action
    public UpdateCurrentNoticeOfCrossAppealId(newCurrentNoticeOfCrossAppealId: string): void {
        this.context.commit('setCurrentNoticeOfCrossAppealId', newCurrentNoticeOfCrossAppealId);
    }  
    
}

export default Form3