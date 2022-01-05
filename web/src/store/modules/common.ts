
import { locationsInfoType } from '@/types/Common';
import { accountInfoType, lookupsInfoType } from '@/types/Information';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Common extends VuexModule {

    public userName = ""
    public userId = ""
    public userLocation = '';

    public locationsInfo: locationsInfoType[] = [];
    public lookups = {} as lookupsInfoType;
    public accountInfo = {} as accountInfoType;

    @Mutation
    public  setUserName(userName: string): void {
        this.userName = userName;
    }
    @Action
    public UpdateUserName(newUserName: string) {
        this.context.commit("setUserName", newUserName);
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
    public setUserLocation(userLocation: string): void {   
        this.userLocation = userLocation
    }
    @Action
    public UpdateUserLocation(newUserLocation: string): void {
        this.context.commit('setUserLocation', newUserLocation)
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

}

export default Common