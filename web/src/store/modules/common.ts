
import { documentTypesJsonInfoType, hearingLocationsInfoType, locationsInfoType } from '@/types/Common';
import { accountInfoType, lookupsInfoType } from '@/types/Information/Form1';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Common extends VuexModule {

    public userName = ""
    public userId = ""
    public userLocation = '';
    public documentTypesJson = [];
    public userSelfRepresented = false;
    public locationsInfo: locationsInfoType[] = [];
    public lookups = {} as lookupsInfoType;
    public accountInfo = {} as accountInfoType;
    public hearingLocationsInfo: hearingLocationsInfoType[] = [];
    public userHasStatisticsAccess = false;

    @Mutation
    public  setUserName(userName: string): void {
        this.userName = userName;
    }
    @Action
    public UpdateUserName(newUserName: string) {
        this.context.commit("setUserName", newUserName);
    }
    
    @Mutation
    public setUserHasStatisticsAccess(userHasStatisticsAccess: boolean): void {   
        this.userHasStatisticsAccess = userHasStatisticsAccess
    }
    @Action
    public UpdateUserHasStatisticsAccess(newUserHasStatisticsAccess: boolean): void {
        this.context.commit('setUserHasStatisticsAccess', newUserHasStatisticsAccess)
    }

    @Mutation
    public setUserLocation(userLocation: string): void {   
        this.userLocation = userLocation
    }
    @Action
    public UpdateUserLocation(newUserLocation: string): void {
        this.context.commit('setUserLocation', newUserLocation)
    }

    @Mutation
    public setUserId(userId: string): void {   
        this.userId = userId
    }
    @Action
    public UpdateUserId(newUserId: string): void {
        this.context.commit('setUserId', newUserId)
    }

    @Mutation
    public setLocationsInfo(locationsInfo: locationsInfoType[]): void {   
        this.locationsInfo = locationsInfo
    }
    @Action
    public UpdateLocationsInfo(newLocationsInfo: locationsInfoType[]): void {
        this.context.commit('setLocationsInfo', newLocationsInfo)
    }

    @Mutation
    public setHearingLocationsInfo(hearingLocationsInfo: hearingLocationsInfoType[]): void {   
        this.hearingLocationsInfo = hearingLocationsInfo
    }
    @Action
    public UpdateHearingLocationsInfo(newhearingLocationsInfo: hearingLocationsInfoType[]): void {
        this.context.commit('setHearingLocationsInfo', newhearingLocationsInfo)
    }

    @Mutation
    public setLookups(lookups: lookupsInfoType): void {   
        this.lookups = lookups;
    }
    @Action
    public UpdateLookups(newLookups: lookupsInfoType): void {
        this.context.commit('setLookups', newLookups);
    }

    @Mutation
    public setAccountInfo(accountInfo: accountInfoType): void {   
        this.accountInfo = accountInfo;
    }
    @Action
    public UpdateAccountInfo(newAccountInfo: accountInfoType): void {
        this.context.commit('setAccountInfo', newAccountInfo);
    }

    @Mutation
    public setUserSelfRepresented(userSelfRepresented: boolean): void {   
        this.userSelfRepresented = userSelfRepresented;
    }
    @Action
    public UpdateUserSelfRepresented(newUserSelfRepresented: boolean): void {
        this.context.commit('setUserSelfRepresented', newUserSelfRepresented);
    }

    @Mutation
    public setDocumentTypesJson(documentTypesJson: documentTypesJsonInfoType[]): void {
        this.documentTypesJson = documentTypesJson;
    }
    @Action
    public UpdateDocumentTypesJson(newDocumentTypesJson: documentTypesJsonInfoType[]) {
        this.context.commit("setDocumentTypesJson", newDocumentTypesJson);
    }

}

export default Common