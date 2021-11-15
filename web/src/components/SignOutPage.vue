<template>
	<b-card border-variant="white">
		<b-button size="lg" variant="danger" class="ml-5" @click="signout()">
				<b-icon-box-arrow-left class="mr-2"/><b>Logout</b>
		</b-button>
	
	</b-card>
</template>

<script lang="ts">
	import { Component, Vue} from 'vue-property-decorator';	
	import { SessionManager } from "@/components/utils/utils";

	@Component
	export default class SignOutPage extends Vue {

		public signout(){
			Vue.nextTick().then(() => {            
                SessionManager.logoutAndRedirect(this.$store);
        	});
		}		
	}
</script>