import LandingPage from "@/components/home/LandingPage.vue";
import DashboardPage from "@/components/process/Dashboard.vue";
import MyDocuments from "@/components/process/MyDocuments/MyDocuments.vue";

import StartForm2 from "@/components/process/Form2/StartForm2.vue";
import FillForm2 from "@/components/process/Form2/FillForm2.vue";
import PreviewForm2 from "@/components/process/Form2/PreviewForm2.vue";
import SubmitForm2 from "@/components/process/Form2/SubmitForm2.vue";

import ChecklistForm3 from "@/components/process/Form3/ChecklistForm3.vue";
import StartForm3 from "@/components/process/Form3/StartForm3.vue";
import FillForm3 from "@/components/process/Form3/FillForm3.vue";
import PreviewForm3 from "@/components/process/Form3/PreviewForm3.vue";
import SubmitForm3 from "@/components/process/Form3/SubmitForm3.vue";

import StartForm4 from "@/components/process/Form4/StartForm4.vue";
import FillForm4 from "@/components/process/Form4/FillForm4.vue";
import PreviewForm4 from "@/components/process/Form4/PreviewForm4.vue";
import SubmitForm4 from "@/components/process/Form4/SubmitForm4.vue";

import StartForm5 from "@/components/process/Form5/StartForm5.vue";
import FillForm5 from "@/components/process/Form5/FillForm5.vue";
import PreviewForm5 from "@/components/process/Form5/PreviewForm5.vue";
import SubmitForm5 from "@/components/process/Form5/SubmitForm5.vue";

import StartForm6 from "@/components/process/Form6/StartForm6.vue";
import FillForm6 from "@/components/process/Form6/FillForm6.vue";
import PreviewForm6 from "@/components/process/Form6/PreviewForm6.vue";
import SubmitForm6 from "@/components/process/Form6/SubmitForm6.vue";

import ChecklistForm1 from "@/components/process/Form1/ChecklistForm1.vue";
import AccessForm1 from "@/components/process/Form1/AccessForm1.vue";
import StartForm1 from "@/components/process/Form1/StartForm1.vue";
import PreviewForm1 from "@/components/process/Form1/PreviewForm1.vue";
import SubmitForm1 from "@/components/process/Form1/SubmitForm1.vue";

import StartForm8 from "@/components/process/Form8/StartForm8.vue";
import FillForm8 from "@/components/process/Form8/FillForm8.vue";
import PreviewForm8 from "@/components/process/Form8/PreviewForm8.vue";
import SubmitForm8 from "@/components/process/Form8/SubmitForm8.vue";

import StartForm9 from "@/components/process/Form9/StartForm9.vue";
import FillForm9 from "@/components/process/Form9/FillForm9.vue";
import PreviewForm9 from "@/components/process/Form9/PreviewForm9.vue";
import SubmitForm9 from "@/components/process/Form9/SubmitForm9.vue";

import StartForm18 from "@/components/process/Form18/StartForm18.vue";
import FillForm18 from "@/components/process/Form18/FillForm18.vue";
import PreviewForm18 from "@/components/process/Form18/PreviewForm18.vue";
import SubmitForm18 from "@/components/process/Form18/SubmitForm18.vue";

import StartForm19 from "@/components/process/Form19/StartForm19.vue";
import FillForm19 from "@/components/process/Form19/FillForm19.vue";
import PreviewForm19 from "@/components/process/Form19/PreviewForm19.vue";
import SubmitForm19 from "@/components/process/Form19/SubmitForm19.vue";

import StartForm20 from "@/components/process/Form20/StartForm20.vue";
import FillForm20 from "@/components/process/Form20/FillForm20.vue";
import PreviewForm20 from "@/components/process/Form20/PreviewForm20.vue";
import SubmitForm20 from "@/components/process/Form20/SubmitForm20.vue";

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
      path: "/checklist-form3",
      name: "checklist-form3",
      beforeEnter: authGuard,
      component: ChecklistForm3
    },
    {
      path: "/start-form3",
      name: "start-form3",
      beforeEnter: authGuard,
      component: StartForm3
    },
    {
      path: "/fill-form3",
      name: "fill-form3",
      beforeEnter: authGuard,
      component: FillForm3
    },
    {
      path: "/preview-form3",
      name: "preview-form3",
      beforeEnter: authGuard,
      component: PreviewForm3
    },
    {
      path: "/proceed-form3",
      name: "proceed-form3",
      beforeEnter: authGuard,
      component: SubmitForm3
    },
    {
      path: "/start-form4",
      name: "start-form4",
      beforeEnter: authGuard,
      component: StartForm4
    },
    {
      path: "/fill-form4",
      name: "fill-form4",
      beforeEnter: authGuard,
      component: FillForm4
    },
    {
      path: "/preview-form4",
      name: "preview-form4",
      beforeEnter: authGuard,
      component: PreviewForm4
    },
    {
      path: "/proceed-form4",
      name: "proceed-form4",
      beforeEnter: authGuard,
      component: SubmitForm4
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
      path: "/checklist-form1",
      name: "checklist-form1",
      beforeEnter: authGuard,
      component: ChecklistForm1
    },
    {
      path: "/access-form1",
      name: "access-form1",
      beforeEnter: authGuard,
      component: AccessForm1
    },
    {
      path: "/start-form1",
      name: "start-form1",
      beforeEnter: authGuard,
      component: StartForm1
    },
    {
      path: "/preview-form1",
      name: "preview-form1",
      beforeEnter: authGuard,
      component: PreviewForm1
    },
    {
      path: "/proceed-form1",
      name: "proceed-form1",
      beforeEnter: authGuard,
      component: SubmitForm1
    },
    {
      path: "/start-form8",
      name: "start-form8",
      beforeEnter: authGuard,
      component: StartForm8
    },
    {
      path: "/fill-form8",
      name: "fill-form8",
      beforeEnter: authGuard,
      component: FillForm8
    },
    {
      path: "/preview-form8",
      name: "preview-form8",
      beforeEnter: authGuard,
      component: PreviewForm8
    },
    {
      path: "/proceed-form8",
      name: "proceed-form8",
      beforeEnter: authGuard,
      component: SubmitForm8
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
      path: "/start-form19",
      name: "start-form19",
      beforeEnter: authGuard,
      component: StartForm19
    },
    {
      path: "/fill-form19",
      name: "fill-form19",
      beforeEnter: authGuard,
      component: FillForm19
    },
    {
      path: "/preview-form19",
      name: "preview-form19",
      beforeEnter: authGuard,
      component: PreviewForm19
    },
    {
      path: "/proceed-form19",
      name: "proceed-form19",
      beforeEnter: authGuard,
      component: SubmitForm19
    },
    {
      path: "/start-form20",
      name: "start-form20",
      beforeEnter: authGuard,
      component: StartForm20
    },
    {
      path: "/fill-form20",
      name: "fill-form20",
      beforeEnter: authGuard,
      component: FillForm20
    },
    {
      path: "/preview-form20",
      name: "preview-form20",
      beforeEnter: authGuard,
      component: PreviewForm20
    },
    {
      path: "/proceed-form20",
      name: "proceed-form20",
      beforeEnter: authGuard,
      component: SubmitForm20
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
