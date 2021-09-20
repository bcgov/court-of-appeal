<template>
    <b-card border-variant="white">
        
        <h1>Start E-Filing</h1>
        <p>
            To start e-filing, answer the questions below.
        </p>
        <p>
            Are you starting or responding to an appeal?
        </p>

        <b-row>
            <b-col>
                <b-button 
                    block
                    @click="startAppeal" 
                    variant="outline-primary bg-success text-white" 
                    >
                    Starting an Appeal
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
            <b-col>
                <b-button 
                    block
                    @click="respondToAppeal" 
                    variant="outline-primary bg-success text-white" 
                   >Responding to an Appeal
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
        </b-row>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StartEfiling extends Vue {

    startAppeal = false;
    respondToAppeal = false;

    public startAppealPath() {
        this.startAppeal = true;
        this.respondToAppeal = false;
    }

    public respondToAppealPath() {
        
        this.respondToAppeal = true;
        this.startAppeal = false;
    }

    

    }

</script>

<style>

</style>