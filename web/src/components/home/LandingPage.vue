<template>
    <div v-if="pageReady" class="background fill-body" id="landing-page">
        <b-container class="container home-content">
            <div class="row">
                <div class="col-md-12 info-section">
                    <div class="h1 text-center my-4">Welcome to Court of Appeal</div>
                    
                    <div class="text-center">This service will help you fill out Court of Appeal forms</div>
                    
                    <div class="intro mt-5">                        
                        <div class="row justify-content-center">
                            <p>How it Works?</p>
                        </div>
                        <b-row class="how-works-section my-4">
                            <b-col class="col-md-6" style="padding: 0rem 1rem 0rem 2rem;">
                                <div class="row">
                                    <div class="desc-number col-md-1">1</div>
                                    <div class="desc-step col-md-10">Answer Questions</div>
                                </div>
                            
                                <div class="desc-step-body">
                                    Our completely free and secure online application will assist you in completing 			                   
                                    required forms and you can save your work so, you can proceed at your own pace.
                                </div>                                    
                            </b-col>
                            <b-col class="col-md-6" style="padding: 0rem 1rem 0rem 2rem;">
                                <div class="row">
                                    <div class="desc-number col-md-1">2</div>
                                    <div class="desc-step col-md-8">Print or File Online</div>
                                </div>
                                    
                                <div class="desc-step-body">
                                    Once you’re done with the questions, you can print your papers and file at the court 
                                    registry or file them online.
                                </div>
                                
                            </b-col>                            
                        </b-row>
                        <b-row class="how-works-section my-4">
                            <b-col class="col-md-6" style="padding: 0rem 1rem 0rem 0rem;"> 
                                <b-row class="user-type">
                                    New Users
                                </b-row>
                                <div class="row justify-content-center">                       
                                    <a class="btn btn-primary text-white btn-lg register-button" @click="navigate('new')">
                                        Register for a <strong>BCeID</strong>
                                    </a>                        
                                </div>
                            </b-col>

                            <b-col class="col-md-6" style="padding: 0rem 1rem 0rem 0rem;">
                                <b-row class="user-type">
                                    Returning Users
                                </b-row>
                                <div class="row justify-content-center">
                                    <a class="btn btn-primary btn-lg bg-warning login-button" @click="navigate('returning')">
                                        Login with my <strong>BCeID</strong>                                                                               
                                    </a>
                                </div>
                            </b-col>
                        </b-row>
                        </div>
                    </div>
                
                <div class="landing-credit-div mb-4">
                    <a class="landing-credit-a" href="https://commons.wikimedia.org/wiki/File:Law_Courts_building_interior_2018.jpg" target="_blank">Background image created by Wpcpey</a>, <a class="landing-credit-a" href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank">CC BY-SA 4.0</a>, via Wikimedia Commons
                </div>
            </div>
        </b-container>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SessionManager } from "@/components/utils/utils";

import { namespace } from "vuex-class";   
import "@/store/modules/common";
import { documentTypesJsonInfoType, locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component
export default class LandingPage extends Vue {

    @commonState.Action
    public UpdateDocumentTypesJson!: (newDocumentTypesJson: documentTypesJsonInfoType[]) => void
    
    @commonState.Action
    public UpdateLocationsInfo!: (newLocationsInfo: locationsInfoType[]) => void

    isLoggedIn = false;
    pageReady = false;
    safetyInst = false;
      
    async mounted() {
        this.pageReady = false;
        this.safetyInst = false;
        await SessionManager.getUserInfo(this.$store);
        if(this.$store.state.Common.userId !== ""){
            this.isLoggedIn = true
            this.$router.push({ name: "applicant-status" });
        }else{
            this.isLoggedIn = false;
            this.pageReady = true;
        } 
    }
  
    public navigate(userType) {
        //console.log(new URL(location.href))
        //this.$store.commit("Application/setUserType", userType); 
        //this.$router.push({ name: "applicant-status" });       
        this.$router.push({ name: "dashboard" });
    }
  
}
</script>

<style scoped lang="scss">
@import "src/styles/common";

.background {
  background-image: url("../../images/bg-landing.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.home-content {
  padding-bottom: 20px;
  padding-top: 2rem;
  max-width: 950px;
  color: black;
}
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 0.5rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.how-works-section {
  font-size: 18px;
  p {
    margin: 0 0 0 0;
  }
}
.info-section {
  border: 2px solid rgba($gov-pale-grey, 0.3);
  border-radius: 18px;
  background-color: rgba(0,0,0,0.8);
  margin-top: 0.5rem;
  color: $gov-white;
}

.register-button {
  color: black;
  border: 2px solid rgba($gov-pale-grey, 0.3);
  margin-top: 1rem;
  &:hover,
  &:focus {
    color: rgb(247, 214, 126);
  }
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.login-button {
  //color: $gov-white !important;
  color: black;
  margin-top: 1rem;
  border: 2px solid rgb(231, 231, 231);
  &:hover,
  &:focus {
    color: blue;
    border-color: rgba(17, 60, 139, 0.904);

  }
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}


.landing-h2 {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: white;
    margin-bottom: 40px;
}

.user-type {
    justify-content: center;
    font-weight: 400;
    font-size: 24px;
}

.desc-number {
    font-weight: 800;
    font-size: 20px;
    line-height: 30px;
    color: white;
    margin: 0 0 0 1rem;    
    padding: 0.15rem 0.65rem;
    border: #ffffff 2px solid;
    border-radius: 20px;
    width: 1.35rem;
}
.desc-step {
    font-weight: 600;
    font-size: 20px;
    line-height: 36px;
    color: white;
    margin-bottom: 0px;
}

.landing-credit-div {
    bottom: 50px;
    right: 20px;
    position: absolute;
    color: white;
    font-size: 9px;
}
.landing-credit-a {
    color: white;
    text-decoration: none;
    &:hover,
    &:focus {
        color:#38598A;
        text-decoration: underline;
    }    
}

</style>
