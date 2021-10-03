import { pathwayTypeInfoType } from '@/types/Information';
import { caseJsonDataType, journeyJsonDataType, partiesDataJsonDataType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {
    
    public casesJson: caseJsonDataType[] = [];
    public journeyJson = {} as journeyJsonDataType;
    public pathType = {} as pathwayTypeInfoType;
    public partiesJson = {} as partiesDataJsonDataType;
    public fileNumber = "";    

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
    public setFileNumber(fileNumber: string): void {   
        this.fileNumber = fileNumber;
    }
    
    @Action
    public UpdateFileNumber(newFileNumber: string): void {
        this.context.commit('setFileNumber', newFileNumber);
    }
    
}

export default Information