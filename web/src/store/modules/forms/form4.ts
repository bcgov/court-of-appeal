import { form4DataInfoType, form4FormsJsonDataType } from '@/types/Information/Form4';
import { supportingDocumentInfoType } from '@/types/Common';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form4 extends VuexModule {

    public form4FormsJson: form4FormsJsonDataType[] = [];
    public form4Info = {} as form4DataInfoType; 
    public currentNoticeOfApplicationId = null; 
    public supportingDocuments: supportingDocumentInfoType[] = [];

    @Mutation
    public setForm4FormsJson(form4FormsJson: form4FormsJsonDataType[]): void {   
        this.form4FormsJson = form4FormsJson;
    }    
    @Action
    public UpdateForm4FormsJson(newForm4FormsJson: form4FormsJsonDataType[]): void {
        this.context.commit('setForm4FormsJson', newForm4FormsJson);
    }
  
    @Mutation
    public setForm4Info(form4Info: form4DataInfoType): void {   
        this.form4Info = form4Info;
    }    
    @Action
    public UpdateForm4Info(newForm4Info: form4DataInfoType): void {
        this.context.commit('setForm4Info', newForm4Info);
    }

    @Mutation
    public setCurrentNoticeOfApplicationId(currentNoticeOfApplicationId: string): void {   
        this.currentNoticeOfApplicationId = currentNoticeOfApplicationId;
    }    
    @Action
    public UpdateCurrentNoticeOfApplicationId(newCurrentNoticeOfApplicationId: string): void {
        this.context.commit('setCurrentNoticeOfApplicationId', newCurrentNoticeOfApplicationId);
    }  

    @Mutation
    public setSupportingDocuments(supportingDocuments): void {
        this.supportingDocuments = supportingDocuments;
    }
    @Action
    public UpdateSupportingDocuments(newSupportingDocuments) {
        this.context.commit("setSupportingDocuments", newSupportingDocuments);
    }
    
}

export default Form4