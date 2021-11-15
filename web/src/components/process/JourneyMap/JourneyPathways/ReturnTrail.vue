<template>
    <div :style="{position: 'relative', top: top || '84px', width:'100%', height: '169px', marginBottom: '80px'}">
        <LeftTurn
            :style="{
                position: 'absolute',
                top: '56px',
                left: '27px',
                zIndex: '10'
            }"
            :circling="status == 'completed'"
        />
        <Trail
            :style="{
                width: '52%',
                left: '21%',
                position: 'absolute',
                top: '13.5px',
                zIndex: '11'
            }"
            className="journey-return-trail"
            :completed="status == 'completed'"
            width='75%'
            :circling="status == 'completed'"
        />
        <Trail
            :style="{
                width: '52%',
                left: '21%',
                position: 'absolute',
                top: '13.5px',
                zIndex: '10'
            }"
            className="journey-return-trail"
            :completed="false"
            width='75%'
            :circling="false"
        />
        <RightTurn
            :style="{position: 'absolute',
                left: startpoint || '73%',
                top: '-115px'}"
            :circling="status == 'completed'"
        />

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Trail from './Trail.vue'
import RightTurn from './RightTurn.vue'
import LeftTurn from './LeftTurn.vue'

@Component({
    components:{
        Trail,
        RightTurn,
        LeftTurn
    }
})
export default class ReturnTrail extends Vue {

    @Prop({required: false})
    status!: string;

    @Prop({required: false})
    startpoint!: string;

    @Prop({required: false})
    top!: string;



}
</script>

