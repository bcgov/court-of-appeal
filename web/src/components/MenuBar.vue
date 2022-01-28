<template>
	<header name="menu-bar" class="app-header">
		<b-navbar toggleable="lg" class="navbar navbar-expand-lg navbar-dark" style="background-color: #38598a;">    
           
			<b-navbar-nav class="my-0 mx-5">
                <b-nav-item @click="resetCaseId" to="/dashboard" ><div style="display: inline-block; white-space: nowrap;">HOME</div></b-nav-item>
				<b-nav-item @click="resetCaseId" to="/my-submissions" ><div style="display: inline-block; white-space: nowrap;">MY SUBMISSIONS</div></b-nav-item>                        
			</b-navbar-nav>
		
		</b-navbar>    
	</header>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';	

import { namespace } from "vuex-class";

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

@Component
export default class MenuBar extends Vue {
	
	@form2State.Action
	public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

	@form5State.Action
	public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

	@form6State.Action
	public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

	@form7State.Action
	public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

	mounted() {
	
	}
	
	public resetCaseId(){
		this.UpdateCurrentCaseId(null);
		this.UpdateCurrentNoticeOfHearingOfAppealId(null);
		this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
		this.UpdateCurrentNoticeOfAppealId(null);
	}
}
</script>

<style scoped>   

    ul >>> .dropdown-menu {
        width: 250px !important;
    }
</style>