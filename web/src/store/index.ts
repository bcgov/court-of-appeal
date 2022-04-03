import Common from '@/store/modules/common';
import Application from '@/store/modules/application';
import Information from '@/store/modules/information';
import Form2 from '@/store/modules/forms/form2';
import Form3 from '@/store/modules/forms/form3';
import Form5 from '@/store/modules/forms/form5';
import Form6 from '@/store/modules/forms/form6';
import Form1 from '@/store/modules/forms/form1';
import Form9 from '@/store/modules/forms/form9';
import Form18 from '@/store/modules/forms/form18';
import Form19 from '@/store/modules/forms/form19';
import Form20 from '@/store/modules/forms/form20';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Common,
		Application,
		Information,
		Form2,
		Form3,
		Form5,
		Form6,
		Form1,
		Form9,
		Form18,
		Form19,
		Form20
	}
})

export default store