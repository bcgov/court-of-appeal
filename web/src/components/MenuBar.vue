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

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

@Component
export default class MenuBar extends Vue {
	
	@form1State.Action
	public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void
	
	@form2State.Action
	public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void

	@form3State.Action
	public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void

	@form4State.Action
	public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

	@form5State.Action
	public UpdateCurrentNoticeOfHearingOfAppealId!: (newCurrentNoticeOfHearingOfAppealId: string) => void

	@form6State.Action
	public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void

	@form7State.Action
	public UpdateCurrentNoticeOfUrgentApplicationId!: (newCurrentNoticeOfUrgentApplicationId: string) => void

	@form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

	@form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

	@form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void
	
	@form18State.Action
    public UpdateCurrentNoticeOfRepChangeAddressId!: (newCurrentNoticeOfRepChangeAddressId: string) => void

	@form19State.Action
    public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void

	@form20State.Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void
    
	mounted() {
	
	}
	
	public resetCaseId(){
		this.UpdateCurrentCaseId(null);
		this.UpdateCurrentNoticeOfHearingOfAppealId(null);
		this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(null);
		this.UpdateCurrentNoticeOfUrgentApplicationId(null);
		this.UpdateCurrentNoticeOfApplicationId(null);
		this.UpdateCurrentNoticeOfCrossAppealId(null);
		this.UpdateCurrentNoticeOfAppealId(null);
		this.UpdateCurrentNoticeOfApplicationToVaryId(null);
		this.UpdateCurrentRequisitionId(null);
		this.UpdateCurrentOfferToSettleCostsId(null);
		this.UpdateCurrentNoticeOfRepChangeAddressId(null);
		this.UpdateCurrentNoticeOfWithdrawalOfLawyerId(null);
		this.UpdateCurrentNoticeOfObjectionToWithdrawalId(null);
	}
}
</script>

<style scoped>   

    ul >>> .dropdown-menu {
        width: 250px !important;
    }
</style>