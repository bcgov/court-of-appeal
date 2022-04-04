<template>
    <div>

        <b-row 
            v-if="expiredDeadline && !textBelow" 
            style="font-size: 0.75rem;" 
            class="text-danger ml-auto mr-0 mt-1">The deadline for submission has expired.
        </b-row>
        <b-row>
            <b-col cols="12" style="padding-right: 0;">
                <b-button
                    style="float: right; margin-right:1rem;" 
                    variant="primary"
                    @click="saveForm1(false)"
                    >Preview Form
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
                <b-button 
                    style="float: right; margin-right:1rem;" 
                    variant="primary"
                    @click="saveForm1(true)"
                    >
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
            </b-col>            
        </b-row> 
        <b-row 
            v-if="expiredDeadline && textBelow" 
            style="font-size: 0.75rem;" 
            class="text-danger ml-auto mr-0 mt-1">The deadline for submission has expired.
        </b-row>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SaveOrPreviewButtons extends Vue {    

    @Prop({required: false, default:true})
    textBelow!: boolean;

    @Prop({required: true})
    expiredDeadline!: boolean;

    mounted() {
                       
    }  

    public saveForm1(state){
        this.$emit('saveForm1',state);
    }
}
</script>