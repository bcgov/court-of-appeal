import { supportingDocumentInfoType } from '@/types/Common';
import { form5DataInfoType, form5FormsJsonDataType } from '@/types/Information/Form5';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form5 extends VuexModule {

    public form5FormsJson: form5FormsJsonDataType[] = [];
    public form5Info = {} as form5DataInfoType; 
    public currentNoticeOfHearingOfAppealId = null; 
    public supportingDocuments: supportingDocumentInfoType[] = [];

    
    @Mutation
    public setForm5FormsJson(form5FormsJson: form5FormsJsonDataType[]): void {   
        this.form5FormsJson = form5FormsJson;
    }    
    @Action
    public UpdateForm5FormsJson(newForm5FormsJson: form5FormsJsonDataType[]): void {
        this.context.commit('setForm5FormsJson', newForm5FormsJson);
    }
  
    @Mutation
    public setForm5Info(form5Info: form5DataInfoType): void {   
        this.form5Info = form5Info;
    }    
    @Action
    public UpdateForm5Info(newForm5Info: form5DataInfoType): void {
        this.context.commit('setForm5Info', newForm5Info);
    }

    @Mutation
    public setCurrentNoticeOfHearingOfAppealId(currentNoticeOfHearingOfAppealId: string): void {   
        this.currentNoticeOfHearingOfAppealId = currentNoticeOfHearingOfAppealId;
    }    
    @Action
    public UpdateCurrentNoticeOfHearingOfAppealId(newCurrentNoticeOfHearingOfAppealId: string): void {
        this.context.commit('setCurrentNoticeOfHearingOfAppealId', newCurrentNoticeOfHearingOfAppealId);
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

export default Form5