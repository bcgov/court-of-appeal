import LandingPage from "@/components/home/LandingPage.vue";
import DashboardPage from "@/components/process/Dashboard.vue";
import MyDocuments from "@/components/process/MyDocuments/MyDocuments.vue";
import StartForm2 from "@/components/process/Form2/StartForm2.vue";
import FillForm2 from "@/components/process/Form2/FillForm2.vue";
import PreviewForm2 from "@/components/process/Form2/PreviewForm2.vue";
import SubmitForm2 from "@/components/process/Form2/SubmitForm2.vue";
import CancelSubmitForm2 from "@/components/process/Form2/CancelSubmitForm2.vue";
import SuccessSubmitForm2 from "@/components/process/Form2/SuccessSubmitForm2.vue";
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
      path: "/start",
      name: "start",
      beforeEnter: authGuard,
      component: StartForm2
    },
    {
      path: "/fill",
      name: "fill",
      beforeEnter: authGuard,
      component: FillForm2
    },
    {
      path: "/preview",
      name: "preview",
      beforeEnter: authGuard,
      component: PreviewForm2,
      props: true
    },
    {
      path: "/proceed",
      name: "proceed",
      beforeEnter: authGuard,
      component: SubmitForm2,
      props: true
    },
    {
      path: "/submitted/cancel",
      name: "cancel-submitted",
      beforeEnter: authGuard,
      component: CancelSubmitForm2,
      props: true
    },
    {
      path: "/submitted/success",
      name: "success-submitted",
      beforeEnter: authGuard,
      component: SuccessSubmitForm2,
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
