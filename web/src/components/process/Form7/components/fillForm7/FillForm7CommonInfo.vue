<template>
    
    <b-card v-if="dataReady" no-body class="mx-auto mb-4 border-light bg-light">

        <b-card class="mb-4 border-white bg-white">                
                <b-form-group
                    class="mt-2 ml-4 labels"
                    label="Type Of Order" 
                    label-for="order-type">
                    <b-form-radio-group                
                        v-model="commonInfo.orderType"
                        @change="update"
                        id="order-type"
                        :options="typesOfOrders"
                        style="font-size: 1rem; font-weight:400;"                    
                    ></b-form-radio-group>
                </b-form-group>
                
                <b-form-group
                    class="ml-4 labels"
                    label="Was this matter already appealed in Supreme Court?" 
                    label-for="appealed-in-supreme-court">
                    <p class="content">
                        From a <b>Provincial Court Judge</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Court Civil Rules 18-3
                        </a>
                    </p>
                    <p class="content">
                        From a <b>Master, Registrar or Special Referee</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Civil Court Rules 23-6(8)
                        </a>
                    </p>
                    <p class="content">
                        From a <b>Tribunal</b> to a Supreme Court Judge - 
                        <a
                            href=""
                            target="_blank">
                            Supreme Court Civil Rules 18-3
                        </a>
                    </p>
                    <b-form-radio-group                
                        v-model="commonInfo.appealedInSupremeCourt"
                        @change="update"
                        id="appealed-in-supreme-court"
                        style="font-size: 1rem; font-weight:400;" 
                        :options="appealedInSupremeCourtOptions"
                    ></b-form-radio-group>
                </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Nature of the Appeal</p>            
            <b-form-group
                class="ml-4 mt-3 labels"
                label="Which of the following best describes what this appeal involves?" 
                label-for="appeal-nature">
                <span style="font-size: 1rem; font-weight:400;">CIVIL</span>
                <b-form-radio-group  
                    id="appeal-nature"     
                    style="font-size: 1rem; font-weight:500;"        
                    v-model="commonInfo.appealNature"
                    @change="update"
                    :options="appealNatureOptions"                
                    stacked                
                ></b-form-radio-group>
             </b-form-group>

            <b-form-group
                class="ml-4 mt-3 labels"                
                label="If the appeal is from a part of the judgement only, please specify the part:" 
                label-for="part-of-judgement">
                <b-form-input 
                    id="part-of-judgement"      
                    @change="update"              
                    v-model="commonInfo.partOfJudgement">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-card class="mb-4 border-white bg-white">
            <fill-form-7-sought-info/>
            <b-form-group
                class="ml-4 mt-3 labels font-italic"                
                label="And further take notice that the Court of Appeal will be moved at the hearing of this appeal for an order that:" 
                label-for="order-sought">
                <b-form-textarea 
                    id="order-sought"
                    rows="4" 
                    @change="update"                   
                    v-model="commonInfo.orderSought">
                </b-form-textarea>
            </b-form-group>
        </b-card>


        
    </b-card>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
const informationState = namespace("Information");
import FillForm7SoughtInfo from "@/components/process/Form7/components/fillForm7/FillForm7SoughtInfo.vue";
import { form7DataInfoType } from '@/types/Information';


@Component({
    components:{        
        FillForm7SoughtInfo        
    }
})
export default class FillForm7CommonInfo extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public caseLocation: string;

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    typesOfOrders = [
        { text: 'Trial Judgement', value: 'trial' },
        { text: 'Summary Trial Judgement', value: 'summaryTrial' },
        { text: 'Chambers Judgement', value: 'chambers' }
    ]

    appealedInSupremeCourtOptions = [
        { text: 'Yes', value: 'yes' },
        { text: 'Not Applicable', value: 'NA' }
    ]

    appealNatureOptions = [
        { text: 'Constitutional/Administrative', value: 'admin' },
        { text: 'Civil Procedure', value: 'civilPrcdr' },
        { text: 'Commercial', value: 'comm' },
        { text: 'Motor Vehicle Accidents', value: 'motorVhcl' },
        { text: 'Municipal Law', value: 'municipal' },
        { text: 'Real Property', value: 'realProp' },
        { text: 'Torts', value: 'torts' },
        { text: 'Equity', value: 'NA' },
        { text: 'Wills and estate', value: 'NA' }
    ]

    orderType = '';
    appealedInSupremeCourt = '';
    appealNature = '';
    partOfJudgement = '';
    orderSought = '';
    dataReady = false;
    commonInfo = {} as form7DataInfoType;

    mounted() { 
        this.dataReady = false;
        this.commonInfo = this.form7Info;
        this.dataReady = true;
                   
    }

    public displayResults(){
        this.$emit('displayResults');
    }

    public update(){        
        
        this.UpdateForm7Info(this.commonInfo);
    }

}
</script>

<style scoped lang="scss">

    .content {        
        margin-bottom: 0px !important; 
        font-size: 1rem; 
        font-weight:400;       
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }



</style>