import store from '@/store/index'
import {stepInfoType, pageInfoType} from "@/types/Application"

export function   migrate(applicationData, currentVersion: string){

    const appVersion = applicationData.version
    let steps: stepInfoType[] = [];
    let version = "";

    //console.log(applicationData)
    
    if(appVersion == currentVersion){             
        console.log('Similar Version')                    
        steps = applicationData.steps;
        version = applicationData.version;
        
    }else{
        console.log('Old Version')
        steps = migrateSteps(applicationData.steps)            
        version = currentVersion;
    }
    
    store.commit("Application/setCurrentSteps", {steps:steps, version:version});
    store.dispatch("Application/UpdateStPgNo");
}

function migrateSteps(oldSteps: stepInfoType[]): stepInfoType[]{

    store.dispatch("Application/UpdateInit");
    const newSteps = store.state.Application.steps;

    for(const newStepIndex in newSteps){
        const newStep = newSteps[newStepIndex]         
        const correspondingStep = oldSteps.filter(oldstep=>oldstep.name == newStep.name)[0]
        
        if(correspondingStep){                
            newSteps[newStepIndex].active = correspondingStep.active                

            newSteps[newStepIndex].pages = migratePages(newStep.pages,  correspondingStep.pages)
        }
    }
    
    return newSteps
}

function migratePages(newPages: pageInfoType[] , oldPages: pageInfoType[]): pageInfoType[]{
        
    for(const newPageIndex in newPages){
        const newPage = newPages[newPageIndex]
        const correspondingPage = oldPages.filter(oldpage=>oldpage.name == newPage.name)[0]
        if(correspondingPage){
            newPages[newPageIndex].active = correspondingPage.active
        }
    }
    return newPages
}