import Common from '@/store/modules/common';
import Application from '@/store/modules/application';
import Information from '@/store/modules/information';
import Form2 from '@/store/modules/forms/form2';
import Form5 from '@/store/modules/forms/form5';
import Form7 from '@/store/modules/forms/form7';
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
		Form7

	}
})

export default store