
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Common extends VuexModule {

    public userName = ""
    public userId = ""
    public userLocation = '';

    public locationsInfo = [];

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
    public setLocationsInfo(locationsInfo): void {   
        this.locationsInfo = locationsInfo
    }
    @Action
    public UpdateLocationsInfo(newLocationsInfo): void {
        this.context.commit('setLocationsInfo', newLocationsInfo)
    }

}

export default Common