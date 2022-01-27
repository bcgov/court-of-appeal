import { form2DataInfoType } from '@/types/Information/Form2';

import { caseJsonDataType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Form2 extends VuexModule {
    
    public casesJson: caseJsonDataType[] = [];   
    public form2Info = {} as form2DataInfoType;  
    public currentCaseId = null;
    

    @Mutation
    public setCasesJson(casesJson: caseJsonDataType[]): void {   
        this.casesJson = casesJson;
    }    
    @Action
    public UpdateCasesJson(newCasesJson: caseJsonDataType[]): void {
        this.context.commit('setCasesJson', newCasesJson);
    } 

    @Mutation
    public setForm2Info(form2Info: form2DataInfoType): void {   
        this.form2Info = form2Info;
    }    
    @Action
    public UpdateForm2Info(newForm2Info: form2DataInfoType): void {
        this.context.commit('setForm2Info', newForm2Info);
    }

    @Mutation
    public setCurrentCaseId(currentCaseId: string): void {   
        this.currentCaseId = currentCaseId;
    }    
    @Action
    public UpdateCurrentCaseId(newCurrentCaseId: string): void {
        this.context.commit('setCurrentCaseId', newCurrentCaseId);
    }
    
}

export default Form2