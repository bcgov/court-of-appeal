import Common from '@/store/modules/information';
import Application from '@/store/modules/application';
import Information from '@/store/modules/information';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Common,
		Application,
		Information
	}
})

export default store