<template>
    <b-card border-variant="white">
        
        <h3>Start E-Filing</h3>
        <p>
            To start e-filing, answer the questions below.
        </p>

        <b-card no-body border-variant="white">
            <p>Are you starting or responding to an appeal?</p>

            <b-row>
                <b-col>              
                    <b-button 
                        block
                        @click="startAppealPath" 
                        :variant="respondAppealPressed?inActiveVariant:activeVariant" 
                        :pressed="newAppealPressed"
                        >
                        Starting an Appeal
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
                <b-col>
                    <b-button 
                        block
                        @click="respondToAppealPath" 
                        :variant="newAppealPressed?inActiveVariant:activeVariant" 
                        :pressed="respondAppealPressed"
                    >Responding to an Appeal
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
            </b-row>
        </b-card>

        <b-card class="mt-3" v-if="startAppeal" no-body border-variant="white">
            <p>Do you have the <tooltip title="right to appeal" :index="0"/> your case?</p>

            <b-row>
                <b-col>              
                    <b-button 
                        block
                        @click="hasRightToAppealPath" 
                        variant="outline-primary bg-success text-white" 
                        >
                        Yes
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
                <b-col>
                    <b-button 
                        block
                        @click="noRightToAppealPath" 
                        variant="outline-primary bg-success text-white" 
                    >No
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
            </b-row>
        </b-card>

        <b-card class="mt-3" v-if="respondToAppeal" no-body border-variant="white">
            <p>Were you served with a Notice of Appeal form, or a Notice of Application for Leave to Appeal?</p>

            <b-row>
                <b-col>              
                    <b-button 
                        block
                        @click="noticeOfAppealPath" 
                        variant="outline-primary bg-success text-white" 
                        >
                        Notice of Appeal
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
                <b-col>
                    <b-button 
                        block
                        @click="noticeOfApplicationPath" 
                        variant="outline-primary bg-success text-white" 
                    >Notice of Application for Leave to Appeal
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
            </b-row>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tooltip from "@/components/survey/Tooltip.vue";

@Component({
    components:{        
        Tooltip
    }
})
export default class StartEfiling extends Vue {

    startAppeal = false;
    respondToAppeal = false;

    newAppealPressed = false;
    respondAppealPressed = false;
    

    activeVariant = 'outline-primary bg-success text-white';
    inActiveVariant = 'outline-dark bg-secondary text-white';

    public startAppealPath() {
        this.startAppeal = true;
        this.respondToAppeal = false;
        this.switchDisableRow(true);
    }

    public respondToAppealPath() {
        
        this.respondToAppeal = true;
        this.startAppeal = false;
        this.switchDisableRow(false);
    }

    public hasRightToAppealPath() {
        // emit to parent and display process component
    }

    public noRightToAppealPath() {
        // emit to parent and display process component
        
    }

    public noticeOfAppealPath() {
        // emit to parent and display process component
    }

    public noticeOfApplicationPath() {
        // emit to parent and display process component
        
    }

    public switchDisableRow(newAppeal: boolean){

        if (newAppeal){
            this.newAppealPressed = true;
            this.respondAppealPressed = false;

        } else {
            this.newAppealPressed = false;
            this.respondAppealPressed = true;
        }

    }    

}

</script>

<style scoped lang="scss">

    .btn {
        font-size: 14px;
    }

</style>