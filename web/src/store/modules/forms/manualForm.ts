import { manualFormDataInfoType, manualFormsJsonDataType } from '@/types/Information/ManualForm';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class ManualForm extends VuexModule {

    public manualFormsJson: manualFormsJsonDataType[] = [];
    public manualFormInfo = {} as manualFormDataInfoType; 
    public currentManualFormsId = null; 

    @Mutation
    public setManualFormsJson(manualFormsJson: manualFormsJsonDataType[]): void {   
        this.manualFormsJson = manualFormsJson;
    }    
    @Action
    public UpdateManualFormsJson(newManualFormsJson: manualFormsJsonDataType[]): void {
        this.context.commit('setManualFormsJson', newManualFormsJson);
    }
  
    @Mutation
    public setManualFormInfo(manualFormInfo: manualFormDataInfoType): void {   
        this.manualFormInfo = manualFormInfo;
    }    
    @Action
    public UpdateManualFormInfo(newManualFormInfo: manualFormDataInfoType): void {
        this.context.commit('setManualFormInfo', newManualFormInfo);
    }

    @Mutation
    public setCurrentManualFormsId(currentManualFormsId: string): void {   
        this.currentManualFormsId = currentManualFormsId;
    }    
    @Action
    public UpdateCurrentManualFormsId(newCurrentManualFormsId: string): void {
        this.context.commit('setCurrentManualFormsId', newCurrentManualFormsId);
    }  
    
}

export default ManualForm