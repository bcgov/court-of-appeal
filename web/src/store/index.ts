import Common from '@/store/modules/common';
import Application from '@/store/modules/application';
import Information from '@/store/modules/information';
import Form1 from '@/store/modules/forms/form1';
import Form2 from '@/store/modules/forms/form2';
import Form3 from '@/store/modules/forms/form3';
import Form4 from '@/store/modules/forms/form4';
import Form5 from '@/store/modules/forms/form5';
import Form6 from '@/store/modules/forms/form6';
import Form7 from '@/store/modules/forms/form7';
import Form8 from '@/store/modules/forms/form8';
import Form9 from '@/store/modules/forms/form9';
import Form12 from '@/store/modules/forms/form12';
import Form16 from '@/store/modules/forms/form16';
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
		Form1,
		Form2,
		Form3,
		Form4,
		Form5,
		Form6,
		Form7,
		Form8,
		Form9,
		Form12,
		Form16,
		Form18,
		Form19,
		Form20
	}
})

export default store