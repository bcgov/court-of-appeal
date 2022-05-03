<template>
    <b-card no-body border-variant="white">
       
        <b>Intervener status:</b>
                <p>
                    A person, other than a party, interested in an 
                    appeal may apply to a judge for leave to intervene 
                    in the appeal.
                </p>
                <p>
                    You must complete the following documents and, file 
                    and serve no later than 14 days after the appellant 
                    has filed their factum.
                </p>                
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 100%;">
                            <b-col cols="8">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="3" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        Memorandum of argument in Form 10, not exceeding 10 pages
                    </li>                    
                </ol>
        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class Rule61ApplicationInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
