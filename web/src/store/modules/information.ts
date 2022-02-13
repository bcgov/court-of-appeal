import { locationsInfoType } from '@/types/Common';
import { pathwayTypeInfoType } from '@/types/Information';
import { initiatingDocumentJsonInfoType, journeyJsonDataType, partiesDataJsonDataType, previousCourtJsonInfoType, supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Information extends VuexModule {    
  
    public journeyJson = {} as journeyJsonDataType;
    public pathType = {} as pathwayTypeInfoType;
    public partiesJson = {} as partiesDataJsonDataType;
    
    public previousCourts: previousCourtJsonInfoType[] = []
    public initiatingDocuments: initiatingDocumentJsonInfoType[] = []

    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;
    
    public fileNumber = "";
    public caseLocation: locationsInfoType;   

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
    public setCaseLocation(caseLocation: locationsInfoType): void {   
        this.caseLocation = caseLocation;
    }    
    @Action
    public UpdateCaseLocation(newCaseLocation: locationsInfoType): void {
        this.context.commit('setCaseLocation', newCaseLocation);
    }

    @Mutation
    public setPreviousCourts(previousCourts: previousCourtJsonInfoType[]): void {   
        this.previousCourts = previousCourts;
    }    
    @Action
    public UpdatePreviousCourts(newPreviousCourts: previousCourtJsonInfoType[]): void {
        this.context.commit('setPreviousCourts', newPreviousCourts);
    }

    @Mutation
    public setInitiatingDocuments(initiatingDocuments: initiatingDocumentJsonInfoType[]): void {   
        this.initiatingDocuments = initiatingDocuments;
    }    
    @Action
    public UpdateInitiatingDocuments(newInitiatingDocuments: initiatingDocumentJsonInfoType[]): void {
        this.context.commit('setInitiatingDocuments', newInitiatingDocuments);
    }

}

export default Information