<template>
    <b-card class="bg-white border-white w-90">

        <b-row class="mt-4" >
            You can prepare a book of authorities that includes each authority referred to 
            in your factum and each authority that you intend to refer to in court at the hearing.
        </b-row>
        
        
        <b-row class="mt-4 bg-warning warning-message-row">
            
            <b-col cols="1">
                <b-icon-exclamation-triangle-fill style="margin-top: 2.25rem;" class="ml-2" scale="2"/>
            </b-col>
            <b-col cols="11" style="padding-left: 0;">
                <p>
                    You must file and serve a book of authorities at least 
                    <span class="text-danger font-weight-bold">30 days</span> 
                    before an appeal hearing date.
                </p>
                <p class="mb-0">
                    If you agree with the other party to file a joint book of 
                    authorities, if must be filed at least <span class="text-danger font-weight-bold">30 days</span>
                     before the appeal hearing date.
                </p>

            </b-col>           
        </b-row>

        <b-row class="mt-4" >
            <ol>
                <li>
                    Prepare the Book of Authorities in accordance with the Completion Instructions.
                    <ul>                       
                        <li>
                            <b>Book of Authorities</b>                                    
                            <ul>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            E-Completion Instructions                                           
                                        </b-col>
                                        <b-col cols="2"></b-col>                                
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('e-auth-book')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                     
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row class="my-1 w-100">
                                        <b-col cols="8" style="font-weight: 700;">
                                            Paper Completion Instructions                                                                       
                                        </b-col>
                                        <b-col cols="2"></b-col>                               
                                        <b-col cols="1">
                                            <b-button
                                                @click="downloadInstructions('paper-auth-book')"
                                                target="_blank"                                                                                
                                                class="p-1 bg-white text-primary border-primary online-form-button">DOC
                                            </b-button>                                    
                                        </b-col>
                                    </b-row>
                                </li>
                                
                            </ul>
                        </li> 
                        
                    </ul>
                </li>                
                <li>
                    File with the registry.
                </li>
                <li>
                    Serve one copy on each respondent.
                </li>
            </ol>
        </b-row>           
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

@Component
export default class BookOfAuthoritiesRspToAppealPg extends Vue {
    
    public downloadInstructions(pdf_name){
        GetInstructionFile(pdf_name);        
    }

}
</script>

<style scoped lang="scss">

</style>