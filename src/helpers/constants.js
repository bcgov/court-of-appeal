// ERROR MESSAGES:
export const INVALID_PHONE_MSG = "Must have a three-digit area code, followed by a seven-digit phone number. Country code optional.";
export const INVALID_EMAIL_MSG = "Please enter a valid email address";
export const INVALID_POSTAL_CODE_MSG = "Please enter a valid Canadian Postal Code e.g. A1A 1A1";
export const INVALID_ADDRESS_MSG = "Please make sure the address entered is a valid street address for serving documents in person";
export const GENERAL_ERROR_MSG = "Please fix all errors in the form !";

// Popup messages:
export const FILE_ONLINE_ONE_MSG = "Complete the online form below.  Click on the document name for more information.";
export const FILE_STEP_ONE_MSG = "Complete either the .DOCs or .PDFs below.  Click on the document names for more information.";
export const FILE_STEP_ONE_MSG_SINGULAR = "Complete either the .DOC or .PDF below.  Click on the document name for more information.";
export const FILE_STEP_TWO_MSG = "File the document with the registry.";
export const FILE_MULTIPLES_STEP_TWO_MSG = "File the indicated number of copies with the registry.";
export const FILE_STEP_THREE_MSG = "Serve one copy to each party.";
export const SERVE_EACH_RESPONDENT_MSG = "Serve one copy to each respondent.";

// Journey types:
export const JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_APPEAL = 'respondToNoticeOfAppeal';
export const JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_LEAVE = 'respondToNoticeOfApplicationForLeaveToAppeal';
export const JOURNEY_TYPE_RESPOND_TO_LEAVE_GRANTED = 'respondToLeaveGranted';
export const JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED = 'respondToLeaveRefused';
export const JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED_FINAL = 'respondToLeaveRefusedFinal';
export const JOURNEY_TYPE_APPELLANT_RIGHT_TO_APPEAL = 'appellantRightToAppeal';
export const JOURNEY_TYPE_APPELLANT_LEAVE_REQUIRED = 'leaveToAppealRequired';
export const JOURNEY_TYPE_APPELLANT_LEAVE_GRANTED = 'appellantLeaveGranted';
export const JOURNEY_TYPE_APPELLANT_LEAVE_REFUSED = 'appellantLeaveRefused';

export const INTROTEXT = {
    respondToNoticeOfAppeal: 
        `You are receiving the Notice of Appeal because a previous court case you were in is being appealed. If you 
        would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, 
        follow the instructions until the appeal process is complete. Start by clicking on the first form. 
        As you progress through your appeal journey, check the box next to each step below to mark it as complete.`,
    respondToNoticeOfApplicationForLeaveToAppeal:
        `The appellant's leave to appeal was refused. You are served with a Notice of Application to Vary an Order of Justice, 
        which means the appellant is asking three judges to review the previous judge's decision. Follow the steps below 
        if you would like to continue to participate in the appeal process. As you progress through your appeal journey, 
        check the box next to each step below to mark it as complete.`,
    respondToLeaveGranted:
        `The appellant's leave to appeal was granted. If you would like to be updated about the status of the appeal, 
        and would like to participate in the appeal hearing, follow the instructions until the appeal process is 
        complete. Start by clicking on the first form. As you progress through your appeal journey, check the box next 
        to each step below to mark it as complete.`,
    respondToLeaveRefused: 
        `The appellant's leave to appeal was refused. You are served with a Notice of Application to Vary an Order of 
        Justice, which means the appellant is asking three judges to review the previous judge's decision. Follow the 
        steps below if you would like to continue to participate in the appeal process. " + " As you progress through 
        your appeal journey, check the box next to each step below to mark it as complete.`,
    respondToLeaveRefusedFinal: 
        `The appellant's leave to appeal was refused, and their application for review was refused. The Court of 
        Appeal decision is final, unless the Supreme Court of Canada agrees to hear their case.`,
    appellantRightToAppeal: 
        `Follow the steps below to complete the appeal. Start by clicking on the first form. Follow the instructions 
        until your appeal process is complete. As you progress through your appeal journey, check the box next to each 
        step below to mark it as complete.`,
    leaveToAppealRequired: 
        `If you do not have the right to appeal, and you would still like to appeal your case, you must apply for 
        leave to appeal from the court. Follow the steps below to complete the process. As you progress through your 
        appeal journey, check the box next to each step below to mark it as complete.`,
    appellantLeaveGranted:
        `Now that the court has granted you the right to appeal, follow the steps below to complete the appeal. Start by 
        clicking on the first form. As you progress through your appeal journey, check the box next to each step below 
        to mark it as complete.`,
    appellantLeaveRefused: 
        `Your leave to appeal was refused, and your application for review was refused. The Court of Appeal decision 
        is final, unless the Supreme Court of Canada agrees to hear your case.`,
};
