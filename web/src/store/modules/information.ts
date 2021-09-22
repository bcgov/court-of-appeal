import { pathwayTypeInfoType } from '@/types/Information';
import { caseJsonDataType, journeyJsonDataType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {
    
    public casesJson = [];
    public journeyJson = {} as journeyJsonDataType;
    public pathType = {} as pathwayTypeInfoType;
    

    @Mutation
    public setCasesJson(casesJson: caseJsonDataType[]): void {   
        this.casesJson = casesJson;
    }
    
    @Action
    public UpdateCasesJson(newCasesJson: caseJsonDataType[]): void {
        this.context.commit('setCasesJson', newCasesJson)
    }

    @Mutation
    public setJourneyJson(journeyJson: journeyJsonDataType): void {   
        this.journeyJson = journeyJson;
    }
    
    @Action
    public UpdateJourneyJson(newJourneyJson: journeyJsonDataType): void {
        this.context.commit('setJourneyJson', newJourneyJson)
    }

    @Mutation
    public setPathType(pathType: pathwayTypeInfoType): void {   
        this.pathType = pathType;
    }
    
    @Action
    public UpdatePathType(newPathType: pathwayTypeInfoType): void {
        this.context.commit('setPathType', newPathType)
    }    
    
}

export default Information