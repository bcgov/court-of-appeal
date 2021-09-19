<template>
    <div>
        <journey-map/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JourneyMap from "./JourneyMap.vue"


@Component({
    components:{
        JourneyMap
    }
})
export default class DashboardPage extends Vue {
}
</script>