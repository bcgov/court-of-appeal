<template>
    <b-card no-body border-variant="white">

        <p>
            If you need to make an application on an urgent basis, 
            you may apply for permission to bring an application 
            on shorter notice than otherwise required under the 
            Court of Appeal Rules.
        </p>

        <b-row>
            <ol class="mt-1">
                <li>
                    Obtain an application hearing date from the registrar
                </li>
                <li>
                    Complete either the Online form or the .PDF. Click the 
                    document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1" style="width: 90%;">
                                <b-col class="font-weight-bold" cols="9">
                                    Notice of Application (Form 7)                                   
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm7Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>                        
                    </ul>
                </li>                
                <li>
                    File the document(s) with the registry.
                    <div style="font-style: italic;">
                        Note: A justice or registrar may at the hearing do the following: 
                        <ul>
                            <li>
                                Order that an application be heard on shorter notice than 
                                otherwise required under the rules 
                            </li>
                            <li>
                                Impose conditions or give directions related to the urgent 
                                application, including that notice be given to another 
                                party. 
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    If an order if made, you must serve notice of the order on each party.
                </li>
            </ol>
        </b-row>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

@Component
export default class Rule57ApplicationInstructions extends Vue {   

    @form7State.Action
    public UpdateCurrentNoticeOfUrgentApplicationId!: (newCurrentNoticeOfUrgentApplicationId: string) => void

    public startNewForm7Document(){
        this.UpdateCurrentNoticeOfUrgentApplicationId(null);
        this.$router.push({name: "start-form7" })
    }

}

</script>
