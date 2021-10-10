import LandingPage from "@/components/home/LandingPage.vue";
import DashboardPage from "@/components/process/Dashboard.vue";
import MyDocuments from "@/components/process/MyDocuments/MyDocuments.vue";
import StartForm2 from "@/components/process/AppealProcess/StartForm2.vue";
import FillForm2 from "@/components/process/AppealProcess/FillForm2.vue";
import PreviewForm2 from "@/components/process/AppealProcess/PreviewForm2.vue";
import SubmitForm2 from "@/components/process/AppealProcess/SubmitForm2.vue";
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
      component: DashboardPage
    },
    {
      path: "/my-documents",
      name: "my-documents",
      // beforeEnter: authGuard,
      component: MyDocuments
    },
    {
      path: "/start",
      name: "start",
      // beforeEnter: authGuard,
      component: StartForm2
    },
    {
      path: "/fill",
      name: "fill",
      // beforeEnter: authGuard,
      component: FillForm2
    },
    {
      path: "/preview",
      name: "preview",
      // beforeEnter: authGuard,
      component: PreviewForm2,
      props: true
    },
    {
      path: "/proceed",
      name: "proceed",
      // beforeEnter: authGuard,
      component: SubmitForm2,
      props: true
    }
];

export default routes;
