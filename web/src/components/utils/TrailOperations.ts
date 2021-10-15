import { togglePage, pageStatus, prevPageStatus, nextPageStatus } from '@/components/utils/StepsPagesFunctions';

export function activatePage(order, checked, currentStep)
{
    if(  checked && prevPageStatus(order, currentStep) && !nextPageStatus(order, currentStep)||
        !checked && prevPageStatus(order, currentStep) && !nextPageStatus(order, currentStep)
    ){
        togglePage(order, checked, currentStep);        
    }
}

export function  evaluateCompletedTrails(numOfPages, currentStep){
    const completedTrail = []
    for(let pageNum=0; pageNum<numOfPages; pageNum++){
        completedTrail.push(pageStatus(pageNum, currentStep))
    }
    return completedTrail;
}

export function evaluatePageState(numOfPages, currentStep){
    const pageState = [];
    for(let pageNum=0; pageNum<=numOfPages; pageNum++){

        const active = pageStatus(pageNum, currentStep)
        const ready = prevPageStatus(pageNum, currentStep) && !nextPageStatus(pageNum, currentStep)
        const status = active?"completed":"new";
        pageState.push({active:active, status:status, ready:ready})
    }
    return pageState
}