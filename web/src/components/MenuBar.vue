<template>
	<header name="menu-bar" class="app-header">
		<b-navbar toggleable="lg" class="navbar navbar-expand-lg navbar-dark" style="background-color: #38598a;">    
			
            
			<b-navbar-nav class="my-0 mx-5">
                <b-nav-item to="/dashboard" ><div style="display: inline-block; white-space: nowrap;">HOME</div></b-nav-item>
				<b-nav-item to="/my-documents" ><div style="display: inline-block; white-space: nowrap;">MY DOCUMENTS</div></b-nav-item>         
                
			</b-navbar-nav>
		
		</b-navbar>    
	</header>
</template>

<script lang="ts">
	import { Component, Vue} from 'vue-property-decorator';	

	@Component
	export default class MenuBar extends Vue {
        
        mounted() {
        
        }
	}
</script>

<style scoped>   

    ul >>> .dropdown-menu {
        width: 250px !important;
    }
</style>