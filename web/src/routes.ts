import LandingPage from "@/components/home/LandingPage.vue";
import DashboardPage from "@/components/process/Dashboard.vue";
import MyDocuments from "@/components/process/MyDocuments/MyDocuments.vue";

import StartForm2 from "@/components/process/Form2/StartForm2.vue";
import FillForm2 from "@/components/process/Form2/FillForm2.vue";
import PreviewForm2 from "@/components/process/Form2/PreviewForm2.vue";
import SubmitForm2 from "@/components/process/Form2/SubmitForm2.vue";

import StartForm5 from "@/components/process/Form5/StartForm5.vue";
import FillForm5 from "@/components/process/Form5/FillForm5.vue";
import PreviewForm5 from "@/components/process/Form5/PreviewForm5.vue";
import SubmitForm5 from "@/components/process/Form5/SubmitForm5.vue";

import StartForm6 from "@/components/process/Form6/StartForm6.vue";
import FillForm6 from "@/components/process/Form6/FillForm6.vue";
import PreviewForm6 from "@/components/process/Form6/PreviewForm6.vue";
import SubmitForm6 from "@/components/process/Form6/SubmitForm6.vue";

import ChecklistForm7 from "@/components/process/Form7/ChecklistForm7.vue";
import AccessForm7 from "@/components/process/Form7/AccessForm7.vue";
import StartForm7 from "@/components/process/Form7/StartForm7.vue";
import PreviewForm7 from "@/components/process/Form7/PreviewForm7.vue";
import SubmitForm7 from "@/components/process/Form7/SubmitForm7.vue";

import StartForm9 from "@/components/process/Form9/StartForm9.vue";
import FillForm9 from "@/components/process/Form9/FillForm9.vue";
import PreviewForm9 from "@/components/process/Form9/PreviewForm9.vue";
import SubmitForm9 from "@/components/process/Form9/SubmitForm9.vue";

import StartForm18 from "@/components/process/Form18/StartForm18.vue";
import FillForm18 from "@/components/process/Form18/FillForm18.vue";
import PreviewForm18 from "@/components/process/Form18/PreviewForm18.vue";
import SubmitForm18 from "@/components/process/Form18/SubmitForm18.vue";

import SubmittedResults from "@/components/process/Submit/SubmittedResults.vue"
import SignOutPage from "@/components/SignOutPage.vue"
import { SessionManager } from "@/components/utils/utils";
import VueResource from 'vue-resource';
import store from "@/store";


async function authGuard(to: any, from: any, next: any) {
  var result = await SessionManager.getUserInfo(store);
  if (result.userId)
    next();
  else if (result.loginUrl)
    location.replace(result.loginUrl);
}

const routes = [
    {
      path: "/",
      component: LandingPage
    },
    {
      path: "/court-of-appeal",
      component: LandingPage
    },
    {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter: authGuard,
      component: DashboardPage
    },
    {
      path: "/my-submissions",
      name: "my-submissions",
      beforeEnter: authGuard,
      component: MyDocuments
    },
    {
      path: "/start-form2",
      name: "start-form2",
      beforeEnter: authGuard,
      component: StartForm2
    },
    {
      path: "/fill-form2",
      name: "fill-form2",
      beforeEnter: authGuard,
      component: FillForm2
    },
    {
      path: "/preview-form2",
      name: "preview-form2",
      beforeEnter: authGuard,
      component: PreviewForm2
    },
    {
      path: "/proceed-form2",
      name: "proceed-form2",
      beforeEnter: authGuard,
      component: SubmitForm2
    },
    {
      path: "/start-form5",
      name: "start-form5",
      beforeEnter: authGuard,
      component: StartForm5
    },
    {
      path: "/fill-form5",
      name: "fill-form5",
      beforeEnter: authGuard,
      component: FillForm5
    },
    {
      path: "/preview-form5",
      name: "preview-form5",
      beforeEnter: authGuard,
      component: PreviewForm5
    },
    {
      path: "/proceed-form5",
      name: "proceed-form5",
      beforeEnter: authGuard,
      component: SubmitForm5
    },
    {
      path: "/start-form6",
      name: "start-form6",
      beforeEnter: authGuard,
      component: StartForm6
    },
    {
      path: "/fill-form6",
      name: "fill-form6",
      beforeEnter: authGuard,
      component: FillForm6
    },
    {
      path: "/preview-form6",
      name: "preview-form6",
      beforeEnter: authGuard,
      component: PreviewForm6
    },
    {
      path: "/proceed-form6",
      name: "proceed-form6",
      beforeEnter: authGuard,
      component: SubmitForm6
    },
    {
      path: "/checklist-form7",
      name: "checklist-form7",
      beforeEnter: authGuard,
      component: ChecklistForm7
    },
    {
      path: "/access-form7",
      name: "access-form7",
      beforeEnter: authGuard,
      component: AccessForm7
    },
    {
      path: "/start-form7",
      name: "start-form7",
      beforeEnter: authGuard,
      component: StartForm7
    },
    {
      path: "/preview-form7",
      name: "preview-form7",
      beforeEnter: authGuard,
      component: PreviewForm7
    },
    {
      path: "/proceed-form7",
      name: "proceed-form7",
      beforeEnter: authGuard,
      component: SubmitForm7
    },
    {
      path: "/start-form9",
      name: "start-form9",
      beforeEnter: authGuard,
      component: StartForm9
    },
    {
      path: "/fill-form9",
      name: "fill-form9",
      beforeEnter: authGuard,
      component: FillForm9
    },
    {
      path: "/preview-form9",
      name: "preview-form9",
      beforeEnter: authGuard,
      component: PreviewForm9
    },
    {
      path: "/proceed-form9",
      name: "proceed-form9",
      beforeEnter: authGuard,
      component: SubmitForm9
    },
    {
      path: "/start-form18",
      name: "start-form18",
      beforeEnter: authGuard,
      component: StartForm18
    },
    {
      path: "/fill-form18",
      name: "fill-form18",
      beforeEnter: authGuard,
      component: FillForm18
    },
    {
      path: "/preview-form18",
      name: "preview-form18",
      beforeEnter: authGuard,
      component: PreviewForm18
    },
    {
      path: "/proceed-form18",
      name: "proceed-form18",
      beforeEnter: authGuard,
      component: SubmitForm18
    },
    {
      path: "/submitted/:id/:result/:formType",
      name: "submitted",
      beforeEnter: authGuard,
      component: SubmittedResults,
      props: true
    },
    {
      path: "/signout",
      name: "signout",
      beforeEnter: authGuard,
      component: SignOutPage,
      props: true
    },
];

export default routes;
