<template>
    <b-card no-body border-variant="white">
       
        <p>
            Your leave to appeal was refused, and your application for review was 
            refused. The Court of Appeal decision is final, unless the Supreme 
            Court of Canada agrees to hear your case.  For more information about 
            the process, please visit the 
            <a href="https://www.scc-csc.ca/court-cour/role-eng.aspx#"
               target="_blank">Supreme Court website</a> or  
            <a href="mailto:courts.cso@gov.bc.ca"
               target="_blank">contact the registry</a>. 
            
        </p>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class appLeaveRefusedInstructions extends Vue {     

}

</script>
