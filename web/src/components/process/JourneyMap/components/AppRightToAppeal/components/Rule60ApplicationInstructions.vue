<template>
    <b-card no-body border-variant="white">
       
          <b>Quashing an appeal or raising a preliminary objection:</b>
                <p>
                    This would be used when trying to do one or more of the following:
                </p>
                <ul>
                    <li>
                        strike part of a factum
                    </li>
                    <li>
                        raise a preliminary objection to an appeal
                    </li>
                    <li>
                        quash an appeal before it is heard
                    </li>                    
                </ul>
                <p>
                    At least 7 days before the application hearing 
                    date you must complete and serve the following:
                </p>
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 115%;">
                            <b-col cols="10">
                                Notice of Application
                                <!-- <a 
                                    href=""
                                    target="_blank">Requisition
                                </a> -->
                            </b-col>                                
                            <b-col cols="2" class="p-0" >
                                <b-button
                                    @click="startNewForm4Document"
                                    target="_blank"                                                                                
                                    class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                </b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li>
                        the party’s supporting affidavits, if any, in Form X;
                    </li>
                    <li>
                        the party’s written argument, if any, and 
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
export default class Rule60ApplicationInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
