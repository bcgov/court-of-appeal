import { form2DataInfoType, pathwayTypeInfoType } from '@/types/Information';
import { caseJsonDataType, journeyJsonDataType, partiesDataJsonDataType, supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {
    
    public casesJson: caseJsonDataType[] = [];
    public journeyJson = {} as journeyJsonDataType;
    public pathType = {} as pathwayTypeInfoType;
    public partiesJson = {} as partiesDataJsonDataType;
    public form2Info = {} as form2DataInfoType;
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;
    public fileNumber = "";  
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
    public setJourneyJson(journeyJson: journeyJsonDataType): void {   
        this.journeyJson = journeyJson;
    }    
    @Action
    public UpdateJourneyJson(newJourneyJson: journeyJsonDataType): void {
        this.context.commit('setJourneyJson', newJourneyJson);
    }

    @Mutation
    public setPathType(pathType: pathwayTypeInfoType): void {   
        this.pathType = pathType;
    }    
    @Action
    public UpdatePathType(newPathType: pathwayTypeInfoType): void {
        this.context.commit('setPathType', newPathType);
    } 
    
    @Mutation
    public setPartiesJson(partiesJson: partiesDataJsonDataType): void {   
        this.partiesJson = partiesJson;
    }    
    @Action
    public UpdatePartiesJson(newPartiesJson: partiesDataJsonDataType): void {
        this.context.commit('setPartiesJson', newPartiesJson);
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
    public setSupremeCourtCaseJson(supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType): void {   
        this.supremeCourtCaseJson = supremeCourtCaseJson;
    }    
    @Action
    public UpdateSupremeCourtCaseJson(newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType): void {
        this.context.commit('setSupremeCourtCaseJson', newSupremeCourtCaseJson);
    }

    @Mutation
    public setSupremeCourtOrderJson(supremeCourtOrderJson: supremeCourtOrdersJsonInfoType): void {   
        this.supremeCourtOrderJson = supremeCourtOrderJson;
    }    
    @Action
    public UpdateSupremeCourtOrderJson(newSupremeCourtOrderJson: supremeCourtOrdersJsonInfoType): void {
        this.context.commit('setSupremeCourtOrderJson', newSupremeCourtOrderJson);
    }

    @Mutation
    public setFileNumber(fileNumber: string): void {   
        this.fileNumber = fileNumber;
    }    
    @Action
    public UpdateFileNumber(newFileNumber: string): void {
        this.context.commit('setFileNumber', newFileNumber);
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

export default Information