<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-3">            
            <div class="mb-2" style="text-align: left; font-weight: bold;">
                When is an appeal ready for hearing?
            </div>     
            <p>
                An appeal is ready for hearing on the date when 
                the appellant has filed both:
                <ul>
                    <li>the appellant’s factum and</li>
                    <li>
                        a copy of each order being appealed, in 
                        the form that the order was entered in 
                        the court appealed from, or
                    </li>
                    <li>on the date specified by a justice or registrar</li>
                </ul>                
            </p>       
        </b-row>  

        <b-row class="mt-0">            
            <div class="mb-2" style="text-align: left; font-weight: bold;">
                How do I obtain an appeal hearing date?
            </div>     
            <p>
                After an appeal is ready for hearing, you must, without delay,
                <ul>
                    <li>obtain a hearing date for the appeal by 
                        contacting the court registry (hyperlink)
                    </li>
                    <li>
                        inform the registrar is the parties disagree 
                        on the length of time required for the hearing of the appeal.
                    </li>                    
                </ul>
                Once you have obtained a hearing date, you must, 
                without delay, file and serve a notice of hearing 
                that has attached a copy of each order being appealed.                
            </p>       
        </b-row> 

        <b-row class="mt-2">            
            <div class="mb-2" style="text-align: left; font-weight: bold;">
                Can I expedite the hearing of the appeal?
            </div>     
            <p>
                You may request to expedite an appeal by filing and 
                serving a written request which must state the following:
                <ul>
                    <li>the nature of the appeal</li>
                    <li>the reason for the request</li>
                    <li>whether the other parties consent to expediting the appeal</li>
                    <li>
                        the proposed terms for expediting the hearing of the appeal including
                        <ul>
                            <li>schedule for the steps required to bring the appeal to hearing</li>
                            <li>estimate of the time required for the hearing of the appeal</li>
                        </ul>
                    </li>
                    <li>a list of proposed dates for the hearing of the appeal</li>                    
                </ul>
                                
            </p>       
        </b-row>          

        <!-- <b-row class="mt-4 ml-3" >            
            <a 
                href="http://www.courts.gov.bc.ca/court_of_appeal/court_locations_and_contacts.aspx"
                target="_blank">BC Court of Appeal locations and contacts
            </a>                               
        </b-row>         -->
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BookAppealDateAppRightToAppealPg extends Vue { 


}
</script>

<style scoped lang="scss">

</style>