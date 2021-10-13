<template>
    <b-card style="width: 90%;" class="bg-white border-white">

        <b-row class="mt-3 ml-4">            
            <div style="text-align: left; font-weight: bold;">
                Contact your registry to reserve a date and time for your appeal.
            </div>            
        </b-row>        

        <b-row class="mt-4 ml-4" >            
            <a 
                href="http://www.courts.gov.bc.ca/court_of_appeal/court_locations_and_contacts.aspx"
                target="_blank">BC Court of Appeal locations and contacts
            </a>                               
        </b-row>        
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BookAppealDateWindowContent extends Vue { 


}
</script>

<style scoped lang="scss">

</style>