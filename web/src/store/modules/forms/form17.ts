import { form17DataInfoType, form17FormsJsonDataType } from '@/types/Information/Form17';
import { previousCourtJsonInfoType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form17 extends VuexModule {

    public form17FormsJson: form17FormsJsonDataType[] = [];
    public form17Info = {} as form17DataInfoType; 
    public currentCertificateOfCostsId = null; 
    public currentOrder = {} as previousCourtJsonInfoType;

    @Mutation
    public setForm17FormsJson(form17FormsJson: form17FormsJsonDataType[]): void {   
        this.form17FormsJson = form17FormsJson;
    }    
    @Action
    public UpdateForm17FormsJson(newForm17FormsJson: form17FormsJsonDataType[]): void {
        this.context.commit('setForm17FormsJson', newForm17FormsJson);
    }
  
    @Mutation
    public setForm17Info(form17Info: form17DataInfoType): void {   
        this.form17Info = form17Info;
    }    
    @Action
    public UpdateForm17Info(newForm17Info: form17DataInfoType): void {
        this.context.commit('setForm17Info', newForm17Info);
    }

    @Mutation
    public setCurrentCertificateOfCostsId(currentCertificateOfCostsId: string): void {   
        this.currentCertificateOfCostsId = currentCertificateOfCostsId;
    }    
    @Action
    public UpdateCurrentCertificateOfCostsId(newCurrentCertificateOfCostsId: string): void {
        this.context.commit('setCurrentCertificateOfCostsId', newCurrentCertificateOfCostsId);
    }  

    @Mutation
    public setCurrentOrder(currentOrder: previousCourtJsonInfoType): void {   
        this.currentOrder = currentOrder;
    }    
    @Action
    public UpdateCurrentOrder(newCurrentOrder: previousCourtJsonInfoType): void {
        this.context.commit('setCurrentOrder', newCurrentOrder);
    }
    
}

export default Form17