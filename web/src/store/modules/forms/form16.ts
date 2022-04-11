import { form16DataInfoType, form16FormsJsonDataType } from '@/types/Information/Form16';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form16 extends VuexModule {

    public form16FormsJson: form16FormsJsonDataType[] = [];
    public form16Info = {} as form16DataInfoType; 
    public currentOfferToSettleCostsId = null; 

    @Mutation
    public setForm16FormsJson(form16FormsJson: form16FormsJsonDataType[]): void {   
        this.form16FormsJson = form16FormsJson;
    }    
    @Action
    public UpdateForm16FormsJson(newForm16FormsJson: form16FormsJsonDataType[]): void {
        this.context.commit('setForm16FormsJson', newForm16FormsJson);
    }
  
    @Mutation
    public setForm16Info(form16Info: form16DataInfoType): void {   
        this.form16Info = form16Info;
    }    
    @Action
    public UpdateForm16Info(newForm16Info: form16DataInfoType): void {
        this.context.commit('setForm16Info', newForm16Info);
    }

    @Mutation
    public setCurrentOfferToSettleCostsId(currentOfferToSettleCostsId: string): void {   
        this.currentOfferToSettleCostsId = currentOfferToSettleCostsId;
    }    
    @Action
    public UpdateCurrentOfferToSettleCostsId(newCurrentOfferToSettleCostsId: string): void {
        this.context.commit('setCurrentOfferToSettleCostsId', newCurrentOfferToSettleCostsId);
    }  
    
}

export default Form16