<template>
    <div>
        <b-row no-gutters>

            <b-col cols="1">
                <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
            </b-col>
            <b-col cols="11" style="padding: 0 0 0 2rem;">
                <managing-appeal-process-pg @adjustHeights="adjustHeights"/>
            </b-col>

        </b-row>    
        
        <instruction-window-footer/>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManagingAppealProcessPg from './ManagingAppealProcessPg.vue';
import InstructionWindowFooter from '../InstructionWindowFooter.vue';
import PathSidebar from '../PathSidebar.vue';

@Component({
    components:{
        ManagingAppealProcessPg,
        InstructionWindowFooter,
        PathSidebar
    }
})
export default class ApplicationsProcessModal extends Vue {  

    pathTypes = [] as string[];
    pathHeights = [] as string[];

    updated=0;

    public adjustHeights(index: number, pathHeight: string) {        
        this.pathHeights[index] = pathHeight;
        this.updated++;
    }

    mounted(){        
        this.pathTypes = ["info", "share", "share", "share", "share", "share", "share", "share", "share", "share"];
        this.pathHeights = ['33rem', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    }
    
}
</script>

<style scoped lang="scss">

</style>