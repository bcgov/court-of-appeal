import store from '@/store';
import _ from 'underscore';

export function toggleStep(stepId, activeIndicator) {       
    store.commit("Application/setStepActive", {
        currentStep: stepId,
        active: activeIndicator
    });
}

export function toggleAllSteps(activeIndicator) {  
    const stPgNo = store.state.Application.stPgNo
    const stepsArr = _.range(0, Object.keys(stPgNo).length)    
    
    for (const inx in stepsArr) {
        store.commit("Application/setStepActive", {
            currentStep: inx,
            active: activeIndicator
        });
    }
}

export function togglePages(pageArr, activeIndicator, currentStep) {  
          
    for (const inx in pageArr) {
        store.commit("Application/setPageActive", {
            currentStep: currentStep,
            currentPage: pageArr[inx],
            active: activeIndicator
        });
    } 
}

export function togglePage(currentPage, activeIndicator, currentStep) {
    
    store.commit("Application/setPageActive", {
        currentStep: currentStep,
        currentPage: currentPage,
        active: activeIndicator
    });
}

export function stepStatus( currentStep) {  

    return store.state.Application.steps[currentStep]?.active;
}

export function pageStatus(currentPage, currentStep) {  

    return  store.state.Application.steps[currentStep]?.pages[currentPage]?.active;
}

export function prevPageStatus(currentPage, currentStep) {  
    
    const prevPage = (currentPage-1);
    if(prevPage >= 0)
        return  store.state.Application.steps[currentStep]?.pages[prevPage]?.active;
    else 
        return true;
}

export function nextPageStatus(currentPage, currentStep) {  
    const numOfPages = store.state.Application.steps[currentStep]?.pages?.length;
    const nextPage = (currentPage+1);
    if(nextPage < numOfPages)
        return  store.state.Application.steps[currentStep]?.pages[nextPage]?.active;
    else 
        return false;
}