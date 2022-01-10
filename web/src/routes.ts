import LandingPage from "@/components/home/LandingPage.vue";
import DashboardPage from "@/components/process/Dashboard.vue";
import MyDocuments from "@/components/process/MyDocuments/MyDocuments.vue";
import StartForm2 from "@/components/process/Form2/StartForm2.vue";
import FillForm2 from "@/components/process/Form2/FillForm2.vue";
import PreviewForm2 from "@/components/process/Form2/PreviewForm2.vue";
import SubmitForm2 from "@/components/process/Form2/SubmitForm2.vue";
import ChecklistForm7 from "@/components/process/Form7/ChecklistForm7.vue";
import AccessForm7 from "@/components/process/Form7/AccessForm7.vue";
import StartForm7 from "@/components/process/Form7/StartForm7.vue";
import PreviewForm7 from "@/components/process/Form7/PreviewForm7.vue";
import SubmitForm7 from "@/components/process/Form7/SubmitForm7.vue";
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
      component: PreviewForm2,
      props: true
    },
    {
      path: "/proceed-form2",
      name: "proceed-form2",
      beforeEnter: authGuard,
      component: SubmitForm2,
      props: true
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
      component: StartForm7,
      props: true
    },
    {
      path: "/preview-form7",
      name: "preview-form7",
      beforeEnter: authGuard,
      component: PreviewForm7,
      props: true
    },
    {
      path: "/proceed-form7",
      name: "proceed-form7",
      beforeEnter: authGuard,
      component: SubmitForm7,
      props: true
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
