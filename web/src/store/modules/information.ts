import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {
    
    public casesJson = [];

    public journeyJson = {};

    @Mutation
    public setCasesJson(casesJson: any[]): void {   
        this.casesJson = casesJson;
    }
    
    @Action
    public UpdateCasesJson(newCasesJson: any[]): void {
        this.context.commit('setCasesJson', newCasesJson)
    }

    @Mutation
    public setJourneyJson(journeyJson: {}): void {   
        this.journeyJson = journeyJson;
    }
    
    @Action
    public UpdateJourneyJson(newJourneyJson: {}): void {
        this.context.commit('setJourneyJson', newJourneyJson)
    }
    
    
}

export default Information