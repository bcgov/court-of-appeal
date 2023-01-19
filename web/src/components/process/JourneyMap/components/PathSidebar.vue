<template>
    <b-card class="bg-white border-white">

        <b-card
            no-body
            class="bg-white border-white"
            v-for="pathType,index in pathTypes"
            :key="index">

            <b-row class="ml-0">
                <img v-if="pathType == 'share'" class="bg-success"
                    src="../../../../../public/icons/icon-share.svg"
                    style="width: 4rem; height: 4rem; border-radius: 2rem; padding: 0.75rem 0.5rem 0.75rem 0.25rem;"
                    />
                <img v-else-if="pathType == 'gavel'" class="bg-success"
                    src="../../../../../public/icons/icon-gavel.svg"
                    style="width: 4rem; height: 4rem; border-radius: 2rem; padding: 0.75rem 0.5rem 0.75rem 0.25rem;"
                    />
                <img v-else-if="pathType == 'info'" class="bg-success"
                    src="../../../../../public/icons/icon-info.svg"
                    style="width: 4rem; height: 4rem; border-radius: 2rem; padding: 0.75rem 0.5rem 0.75rem 0.25rem;"
                    />
                <img v-else-if="pathType == 'calendar'" class="bg-success"
                    src="../../../../../public/icons/icon-calendar.svg"
                    style="width: 4rem; height: 4rem; border-radius: 2rem; padding: 0.75rem 0.5rem 0.75rem 0.25rem;"
                    />
                <b-icon-question v-else-if="pathType == 'question'" class="text-white bg-success" scale="1.75"
                    style="width: 4rem; height: 4rem; border-radius: 2rem; padding: 0.75rem 0.5rem 0.75rem 0.5rem;"
                    />
            </b-row>       

            <b-row class="ml-4 mt-2 bg-light mb-1" :style="'width: 0.65rem; height: ' + pathHeights[index] + ';'">
                <b-col  cols="12" >               
                    
                </b-col>
            </b-row> 
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class PathSidebar extends Vue {
    
    @Prop({required: true})
    pathTypes!: string[];

    @Prop({required: true})
    pathHeights!: string[]; 

}
</script>

<style scoped lang="scss">



</style>