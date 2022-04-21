import { form8DataInfoType, form8FormsJsonDataType } from '@/types/Information/Form8';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form8 extends VuexModule {

    public form8FormsJson: form8FormsJsonDataType[] = [];
    public form8Info = {} as form8DataInfoType; 
    public currentNoticeOfApplicationToVaryId = null; 

    @Mutation
    public setForm8FormsJson(form8FormsJson: form8FormsJsonDataType[]): void {   
        this.form8FormsJson = form8FormsJson;
    }    
    @Action
    public UpdateForm8FormsJson(newForm8FormsJson: form8FormsJsonDataType[]): void {
        this.context.commit('setForm8FormsJson', newForm8FormsJson);
    }
  
    @Mutation
    public setForm8Info(form8Info: form8DataInfoType): void {   
        this.form8Info = form8Info;
    }    
    @Action
    public UpdateForm8Info(newForm8Info: form8DataInfoType): void {
        this.context.commit('setForm8Info', newForm8Info);
    }

    @Mutation
    public setCurrentNoticeOfApplicationToVaryId(currentNoticeOfApplicationToVaryId: string): void {   
        this.currentNoticeOfApplicationToVaryId = currentNoticeOfApplicationToVaryId;
    }    
    @Action
    public UpdateCurrentNoticeOfApplicationToVaryId(newCurrentNoticeOfApplicationToVaryId: string): void {
        this.context.commit('setCurrentNoticeOfApplicationToVaryId', newCurrentNoticeOfApplicationToVaryId);
    }  
    
}

export default Form8