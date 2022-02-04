import Common from '@/store/modules/common';
import Application from '@/store/modules/application';
import Information from '@/store/modules/information';
import Form2 from '@/store/modules/forms/form2';
import Form5 from '@/store/modules/forms/form5';
import Form6 from '@/store/modules/forms/form6';
import Form7 from '@/store/modules/forms/form7';
import Form9 from '@/store/modules/forms/form9';
import Form18 from '@/store/modules/forms/form18';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Common,
		Application,
		Information,
		Form2,
		Form5,
		Form6,
		Form7,
		Form9,
		Form18

	}
})

export default store