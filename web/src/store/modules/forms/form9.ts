import { form9DataInfoType, form9FormsJsonDataType } from '@/types/Information/Form9';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form9 extends VuexModule {

    public form9FormsJson: form9FormsJsonDataType[] = [];
    public form9Info = {} as form9DataInfoType; 
    public currentRequisitionId = null; 

    @Mutation
    public setForm9FormsJson(form9FormsJson: form9FormsJsonDataType[]): void {   
        this.form9FormsJson = form9FormsJson;
    }    
    @Action
    public UpdateForm9FormsJson(newForm9FormsJson: form9FormsJsonDataType[]): void {
        this.context.commit('setForm9FormsJson', newForm9FormsJson);
    }
  
    @Mutation
    public setForm9Info(form9Info: form9DataInfoType): void {   
        this.form9Info = form9Info;
    }    
    @Action
    public UpdateForm9Info(newForm9Info: form9DataInfoType): void {
        this.context.commit('setForm9Info', newForm9Info);
    }

    @Mutation
    public setCurrentRequisitionId(currentRequisitionId: string): void {   
        this.currentRequisitionId = currentRequisitionId;
    }    
    @Action
    public UpdateCurrentRequisitionId(newCurrentRequisitionId: string): void {
        this.context.commit('setCurrentRequisitionId', newCurrentRequisitionId);
    }  
    
}

export default Form9