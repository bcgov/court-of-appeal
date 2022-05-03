<template>
    <b-card no-body border-variant="white">
       
          <b>Varying or cancelling an order of the registrar:</b>
                <p>
                    If you wish to apply to a justice to vary or cancel 
                    an order or direction of the registrar.
                </p>
                <p>
                    You must within 7 days after the order was made or 
                    direction given by the registrar file and serve 
                    the following:
                </p>                
                <ol>
                    <li>
                        Obtain an application hearing date from the registrar
                    </li>
                    <li>
                        <b-row class="my-1" style="width: 95%;">
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
                        Supporting affidavit (if any)
                    </li>   
                    <li>
                        Written argument  (if any)                                                
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
export default class Rule63ApplicationInstructions extends Vue {   

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void
        
    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" });
    }

}

</script>
