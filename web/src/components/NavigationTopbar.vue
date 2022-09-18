<template>
    <header name="navigation-topbar" class="app-header">

        <nav class="navbar navbar-expand-lg navbar-dark">

            <div class="container-fluid">

                <a class="navbar-brand"
                    href="https://www2.gov.bc.ca"
                    style="max-width: 200px">
                    <img class="img-fluid d-none d-md-block"
                        src="../../public/images/bcid-logo-rev-en.svg"
                        width="177"
                        height="44"
                        alt="B.C. Government Logo"/>

                    <img class="img-fluid d-md-none"
                        src="../../public/images/bcid-symbol-rev.svg"
                        width="63"
                        height="44"
                        alt="B.C. Government Logo"/>

                </a>

                <div class="navbar-brand navbar-text" style="cursor:pointer;" @click="home()">
                    Court of Appeal Application                  
                </div>

                <div class="navbar-extra">
                    <div id="app-profile">
                        <div v-if="userName" style="padding-right: rem">
                            <b-dropdown id="profileDropdown"
                                        text="Profile"
                                        variant="primary btn-transparent"
                                        menu-class="w-10"
                                        >
                                <template #button-content style="background-color: #003366">
                                    <span class="fa fa-user"></span> {{ userName }}
                                </template>
                                <b-dropdown-item @click="logout()">
                                    <b-icon-box-arrow-left class="mr-2"/>Logout
                                </b-dropdown-item>
                                <b-dropdown-item v-if="userHasStatisticsAccess" @click="viewStats()">
                                    <b-icon-file-earmark-bar-graph class="mr-2"/>Reports
                                </b-dropdown-item>                                
                            </b-dropdown>
                        </div>
                    </div>
                </div>

                <button class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
            </div>

        </nav>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SessionManager } from "@/components/utils/utils";

import { namespace } from "vuex-class";   
import "@/store/modules/common";
const commonState = namespace("Common");

@Component
export default class NavigationTopbar extends Vue {
    
    @commonState.State
    public userName!: string;

    @commonState.State
    public userHasStatisticsAccess!: boolean;

    public logout() {
        SessionManager.logout(this.$store);
    }

    public viewStats() {
        this.$router.push({name: "statistics" })
    }

    public home() {
        console.log(this.$route.name)
        if(this.$route.name != "dashboard")
            this.$router.push({name: "dashboard" }) 
    }

}
</script>

<style>
.btn-transparent {
  background-color: transparent !important;
  border-color: #ccc !important;
}
</style>

<style scoped lang="scss">
@import "../styles/common";
.navbar {
  padding-right: 170px;
}
.navbar-brand:not(.logo) {
  flex: 1 1 auto;
}
.navbar-extra {
  display: inline-block;
  flex: 1 1 auto;
  text-align: right;
}
.navbar .navbar-extra {
  display: inline-block;
  flex: 1 1 auto;
  text-align: right;
}

#app-profile {
  color: $gov-white;
}
</style>