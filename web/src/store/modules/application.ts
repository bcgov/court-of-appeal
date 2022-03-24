import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { stepInfoType, pageInfoType } from "@/types/Application";

import { stepsAndPagesNumberInfoType } from "@/types/Application/StepsAndPages";

@Module({
  namespaced: true
})
class Application extends VuexModule {

    public id = ""
    public steps = new Array<stepInfoType>()

    public version = "1.0"

    public currentStep = 1    


    public allCompleted = false;
    public pathwayCompleted = { protectionOrder:false, familyLawMatter:false, caseMgmt:false, priorityParenting:false, childReloc:false, agreementEnfrc:false} //{Protection Order, Family Law Matters, Case management, Priority parenting, Relocation of a child, Enforcement of agreements}

    public stPgNo = {} as stepsAndPagesNumberInfoType;

    @Mutation
    public init(): void {

        this.currentStep = 0;
        this.steps = new Array<stepInfoType>();

        // Appellant Apply For Leave Journey Map
        let s = {} as stepInfoType;
    
        s.active = false;
        s.id = "0";
        s.name = "APP_APPLY_LEAVE";
        s.label = "Appellant Apply For Leave Journey Map";
        s.type = "AppellantApplyForLeaveJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        let p = {} as pageInfoType;
        p.key = "0";
        p.name = "InitialDocuments";
        p.label = "Initial Documents";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "HearingDocuments";
        p.label = "Hearing Documents";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "DecisionOnLeaveToAppeal";
        p.label = "Decision on Leave to Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        this.steps.push(s);
    
        // Appellant Leave Granted Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "1";
        s.name = "APP_LEAVE_GRANTED";
        s.label = "Appellant Leave Granted Journey Map";        
        s.type = "AppellantLeaveGrantedJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "AppealRecordAndTranscript";
        p.label = "Appeal Record and Transcript";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "FactumAppealBookAndCertificateOfReadiness";
        p.label = "Factum, Appeal Book and Certificate of Readiness";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "BookAppealDateWithRegistry";
        p.label = "Book Appeal Date with Registry";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "NoticeOfHearing";
        p.label = "Notice of Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "CourtOrder";
        p.label = "Court Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "AppealProcessComplete";
        p.label = "Appeal Process Complete";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p); 

        this.steps.push(s);
    
        // Appellant Leave Refused Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "2";
        s.name = "APP_LEAVE_REFUSED";
        s.label = "Appellant Leave Refused Journey Map";       
        s.type = "AppellantLeaveRefusedJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "ApplicationForReview";
        p.label = "Application for Review";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "1";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p); 

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "FinalDecisionOnLeaveToAppeal";
        p.label = "Final Decision on Leave to Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p); 

        this.steps.push(s);

        // Appellant Right To Appeal JourneyMap
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "3";
        s.name = "APP_RIGHT_TO_APPEAL";
        s.label = "Appellant Right To Appeal Journey Map";      
        s.type = "AppellantRightToAppealJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "InitialDocuments";
        p.label = "Initial Documents";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ApplyForLeaveToAppeal";
        p.label = "Apply For Leave To Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "Applications";
        p.label = "Applications";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "AppealRecordAndTranscript";
        p.label = "Appeal Record and Transcript";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "FactumAppealBookAndCertificateOfReadiness";
        p.label = "Factum, Appeal Book, and Certificate of Readiness";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "BookAppealDateWithRegistry";
        p.label = "Book Appeal Date with Registry";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "NoticeOfHearing";
        p.label = "Notice of Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "8";
        p.name = "CourtOrder";
        p.label = "Court Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "9";
        p.name = "AppealProcessComplete";
        p.label = "Appeal Process Complete";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);
        
        // Respond To Appeal Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "4";
        s.name = "RSP_TO_APPEAL";
        s.label = "Respond To Appeal Journey Map";
        s.type = "RespondToAppealJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeOfAppearance";
        p.label = "Notice of Appearance";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "NoticeOfCrossAppeal";
        p.label = "Notice of Cross Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "FactumAndAppealBook";
        p.label = "Factum and Appeal Book";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "NoticeOfHearing";
        p.label = "Notice of Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "CourtOrder";
        p.label = "Court Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "AppealProcessComplete";
        p.label = "Appeal Process Complete";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);
        
        //Respond To Leave Granted Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "5";
        s.name = "RSP_TO_LEAVE_GRANTED";
        s.label = "Respond To Leave Granted Journey Map";       
        s.type = "RespondToLeaveGrantedJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeOfAppearance";
        p.label = "Notice of Appearance";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "FactumAppealBookAndCertificateOfReadiness";
        p.label = "Factum, Appeal Book and Certificate of Readiness";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "CourtOrder";
        p.label = "Court Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "AppealProcessComplete";
        p.label = "Appeal Process Complete";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
       
        this.steps.push(s);

        // Respond To Leave Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "6";
        s.name = "RSP_TO_LEAVE";
        s.label = " Respond To Leave Journey Map";
        s.type = " RespondToLeaveJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeOfAppearance";
        p.label = "Notice of Appearance";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReplyBook";
        p.label = "Reply Book";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "DecisionOnLeaveToAppeal";
        p.label = "Decision on Leave to Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Respond To Leave Refused Final Journey Map
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "7";
        s.name = "RSP_TO_LEAVE_REFUSED_FINAL";
        s.label = "Respond To Leave Refused Final Journey Map";
        s.type = "RespondToLeaveRefusedFinalJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        this.steps.push(s);

        //Respond To Leave Refused Journey Map
        s = {} as stepInfoType;

        s.active = false;
        s.id = "8";
        s.name = "RSP_TO_LEAVE_REFUSED";
        s.label = "Respond To Leave Refused Journey Map";
        s.type = "RespondToLeaveRefusedJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "ApplicationForReview";
        p.label = "Application for Review";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "TheHearing";
        p.label = "The Hearing";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "FinalDecisionOnLeaveToAppeal";
        p.label = "Final Decision on Leave to Appeal";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        this.steps.push(s);

        //Appellant Leave Refused Final Journey Map
        s = {} as stepInfoType;

        s.active = false;
        s.id = "9";
        s.name = "APP_LEAVE_REFUSED_FINAL";
        s.label = "Appellant Leave Refused Final Journey Map";       
        s.type = "AppellantLeaveRefusedFinalJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        this.steps.push(s);

        //Appellant Leave Granted Final Journey Map
        s = {} as stepInfoType;

        s.active = false;
        s.id = "10";
        s.name = "APP_LEAVE_GRANTED_FINAL";
        s.label = "Appellant Leave Granted Final Journey Map";       
        s.type = "AppellantLeaveGrantedFinalJourneyMap";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        this.steps.push(s);

        //console.log(this.steps)
        
    }
    @Action
    public UpdateInit(newVersion: string) {
        this.context.commit("init");
        this.context.commit("setVersion", newVersion)
        this.context.dispatch("UpdateStPgNo");
    }

    @Mutation
    public setVersion(version: string): void {
        this.version = version;
    }
    @Action
    public UpdateVersion(newVersion: string) {
        this.context.commit("setVersion", newVersion);
    }    
    
    @Mutation
    public  setCurrentStep(currentStep): void {
        this.currentStep = currentStep;
    }
    @Action
    public UpdateCurrentStep(newCurrentStep) {
        this.context.commit("setCurrentStep", newCurrentStep);
    }
    
    @Mutation
      public setCurrentStepPage({ currentStep, currentPage }): void {
        this.steps[currentStep].currentPage = currentPage;
    }
    @Action
    public UpdateCurrentStepPage({ currentStep, currentPage }) {
        this.context.commit("setCurrentStepPage", { currentStep, currentPage });
    }
    
    @Mutation
    public setStepActive({ currentStep, active }): void {
        this.steps[currentStep].active = active;
    }
    @Action
    public UpdateStepActive({ currentStep, active }) {
        this.context.commit("setStepActive", { currentStep, active });
    }
   
    //     window.scrollTo(0, 0);
    
    @Mutation
    public setPageActive({ currentStep, currentPage, active }): void {
        this.steps[currentStep].pages[currentPage].active = active;
    }
    @Action
    public UpdatePageActive({ currentStep, currentPage, active }) {
        this.context.commit("setPageActive", { currentStep, currentPage, active });
    }

    @Mutation
    public setPageProgress({ currentStep, currentPage, progress }): void {
        this.steps[currentStep].pages[currentPage].progress = progress;
    }
    @Action
    public UpdatePageProgress({ currentStep, currentPage, progress }) {
        this.context.commit("setPageProgress", { currentStep, currentPage, progress });
    }

    @Mutation
    public resetStep(currentStep: number): void {
        this.steps[currentStep].result = {};
    }

    @Mutation
    public setStPgNo(stPgNo): void {
        this.stPgNo = stPgNo;
    }
    @Action
    public UpdateStPgNo() {
        const stepsAndPagesNumber = {             
            APP_RIGHT_TO_APPEAL: {},
            APP_APPLY_LEAVE: {},
            RSP_TO_APPEAL: {},
            RSP_TO_LEAVE: {},    
            APP_LEAVE_GRANTED: {},
            APP_LEAVE_REFUSED: {},
            APP_LEAVE_GRANTED_FINAL: {},
            APP_LEAVE_REFUSED_FINAL: {},
            RSP_TO_LEAVE_GRANTED: {},
            RSP_TO_LEAVE_REFUSED_FINAL: {},
            RSP_TO_LEAVE_REFUSED: {}
        } as stepsAndPagesNumberInfoType;

        const steps = this.steps
        for(const step of steps){
            stepsAndPagesNumber[step.name]._StepNo = Number(step.id)           
            for(const page of step.pages){
                stepsAndPagesNumber[step.name][page.name] = Number(page.key)
            }
        }
        this.context.commit("setStPgNo", stepsAndPagesNumber);
    }

   
    @Mutation
    public ResetStepsAndPages() {
        const steps = this.steps
        for(const step of steps){            
            steps[step.id].active = false;
            steps[step.id].currentPage = 0;
            for(const page of step.pages){
                steps[step.id].pages[page.key].active = false;
                steps[step.id].pages[page.key].progress = 0; 
            }
        }
    }

    @Mutation
    public setCurrentSteps({steps:steps, version:version}): void {        
        this.steps = steps;        
        this.version = version;
    }
    @Action
    public UpdateCurrentSteps(steps, version) {
        this.context.commit("setCurrentApplication", {steps:steps, version:version});
    }

}

export default Application