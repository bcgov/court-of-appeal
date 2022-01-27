import { userAccessInfoType, form7StatesInfoType, form7SubmissionDataInfoType } from '@/types/Information/Form7';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {    

    public form7FormsJson: form7SubmissionDataInfoType[] = [];
    public form7SubmissionInfo = {} as form7SubmissionDataInfoType;
    public form7AccessInfo: userAccessInfoType[] = [];
    public form7InfoStates = {} as form7StatesInfoType;   
    public currentNoticeOfAppealId = null;    

    @Mutation
    public setForm7FormsJson(form7FormsJson: form7SubmissionDataInfoType[]): void {   
        this.form7FormsJson = form7FormsJson;
    }    
    @Action
    public UpdateForm7FormsJson(newForm7FormsJson: form7SubmissionDataInfoType[]): void {
        this.context.commit('setForm7FormsJson', newForm7FormsJson);
    } 

    @Mutation
    public setForm7SubmissionInfo(form7SubmissionInfo: form7SubmissionDataInfoType): void {   
        this.form7SubmissionInfo = form7SubmissionInfo;
    }    
    @Action
    public UpdateForm7SubmissionInfo(newForm7SubmissionInfo: form7SubmissionDataInfoType): void {
        this.context.commit('setForm7SubmissionInfo', newForm7SubmissionInfo);
    }

    @Mutation
    public setForm7AccessInfo(form7AccessInfo: userAccessInfoType[]): void {   
        this.form7AccessInfo = form7AccessInfo;
    }    
    @Action
    public UpdateForm7AccessInfo(newForm7AccessInfo: userAccessInfoType[]): void {
        this.context.commit('setForm7AccessInfo', newForm7AccessInfo);
    }   

    @Mutation
    public setForm7InfoStates(form7InfoStates: form7StatesInfoType): void {   
        this.form7InfoStates = form7InfoStates;
    }    
    @Action
    public UpdateForm7InfoStates(newForm7InfoStates: form7StatesInfoType): void {
        this.context.commit('setForm7InfoStates', newForm7InfoStates);
    }   

    @Mutation
    public setCurrentNoticeOfAppealId(currentNoticeOfAppealId: string): void {   
        this.currentNoticeOfAppealId = currentNoticeOfAppealId;
    }    
    @Action
    public UpdateCurrentNoticeOfAppealId(newCurrentNoticeOfAppealId: string): void {
        this.context.commit('setCurrentNoticeOfAppealId', newCurrentNoticeOfAppealId);
    }    
    
}

export default Information