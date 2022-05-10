import { supportingDocumentInfoType } from '@/types/Common';
import { userAccessInfoType, form1StatesInfoType, form1DataInfoType, form1FormsJsonDataType} from '@/types/Information/Form1';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {    

    public form1FormsJson: form1FormsJsonDataType[] = [];
    public form1Info = {} as form1DataInfoType;
    public form1AccessInfo: userAccessInfoType[] = [];
    public form1InfoStates = {} as form1StatesInfoType;   
    public currentNoticeOfAppealId = null;    
    public form1ManualSopOrder: number[] = [];
    public supportingDocuments: supportingDocumentInfoType[] = [];

    @Mutation
    public setForm1FormsJson(form1FormsJson: form1FormsJsonDataType[]): void {   
        this.form1FormsJson = form1FormsJson;
    }    
    @Action
    public UpdateForm1FormsJson(newForm1FormsJson: form1FormsJsonDataType[]): void {
        this.context.commit('setForm1FormsJson', newForm1FormsJson);
    } 

    @Mutation
    public setForm1Info(form1Info: form1DataInfoType): void {   
        this.form1Info = form1Info;
    }    
    @Action
    public UpdateForm1Info(newForm1Info: form1DataInfoType): void {
        this.context.commit('setForm1Info', newForm1Info);
    }

    @Mutation
    public setForm1AccessInfo(form1AccessInfo: userAccessInfoType[]): void {   
        this.form1AccessInfo = form1AccessInfo;
    }    
    @Action
    public UpdateForm1AccessInfo(newForm1AccessInfo: userAccessInfoType[]): void {
        this.context.commit('setForm1AccessInfo', newForm1AccessInfo);
    }   

    @Mutation
    public setForm1InfoStates(form1InfoStates: form1StatesInfoType): void {   
        this.form1InfoStates = form1InfoStates;
    }    
    @Action
    public UpdateForm1InfoStates(newForm1InfoStates: form1StatesInfoType): void {
        this.context.commit('setForm1InfoStates', newForm1InfoStates);
    }   

    @Mutation
    public setCurrentNoticeOfAppealId(currentNoticeOfAppealId: string): void {   
        this.currentNoticeOfAppealId = currentNoticeOfAppealId;
    }    
    @Action
    public UpdateCurrentNoticeOfAppealId(newCurrentNoticeOfAppealId: string): void {
        this.context.commit('setCurrentNoticeOfAppealId', newCurrentNoticeOfAppealId);
    }  
    
    @Mutation
    public setForm1ManualSopOrder(form1ManualSopOrder: number[]): void {   
        this.form1ManualSopOrder = form1ManualSopOrder;
    }    
    @Action
    public UpdateForm1ManualSopOrder(newForm1ManualSopOrder: number[]): void {
        this.context.commit('setForm1ManualSopOrder', newForm1ManualSopOrder);
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

export default Information