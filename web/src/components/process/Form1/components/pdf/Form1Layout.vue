<template>

<div v-if="dataReady">

    <!-- <header> -->
    <div style="margin-top:-1.25rem;">
        <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
            <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
        </div>   
        <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
            <div style="width:25%; font-size:20pt; background: black; color: white;"><b>FORM 1</b></div>
            <div v-if="result.amending" style="width:75%; font-size:14pt;"><b>
                AMENDED NOTICE OF APPEAL: RULE 6(1)
            </b></div>
            <div v-else style="width:75%; font-size:14pt;"><b>
                NOTICE OF APPEAL: RULE 6(1)
            </b></div>
        </div>         
    </div> 

<!-- <stamp-info-box> -->
    <div style="margin: 0.75rem -15px 0 -15px; text-align: center; border: 1px solid black; font-size: 10pt;">

        <div class="my-2 row" > 
            <div style="width:30%;">
                <div style="border: 1px solid #E8E8E8; width: 9rem; height: 9rem; margin: 2rem 2rem; text-align:center; line-height:8.5rem;">
                    [STAMP]
                </div>
            </div>

            <div style="width:70%;">

                <div class="row" >
                    <div style="width:45.5%; padding:0.5rem;">
                        <div style="text-align:right; margin-right:0.5rem;">
                            <div>Court of Appeal File No.</div>
                            <div style="display:block; font-size: 8pt; font-weight: 600; margin:-0.25rem 1rem;">(For Registry Use Only)</div>
                        </div>
                    </div>
                    <div class="coa-text-box" style="width:40%; background: #E8E8E8;" ></div>
                </div>

                <div class="row" style="margin-top: 0.5rem;">
                    <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Supreme Court File No.</div></div>
                    <div class="coa-text-box" style="width:40%;" v-if="manualTrib"></div>
                    <div class="coa-text-box" style="width:40%; font-weight: 700;" v-else>{{result.lowerCourtFileNo}}</div>
                </div>

                <div class="row" >
                    <div style="width:45.5%; padding:0.5rem;"></div>
                    <div style="width:40%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                        <div class="arrow-up-flash"></div>
                        <div class="arrow-up-box"></div>
                    </div>
                </div>

                <div class="row" >
                    <div style="width:45.5%; padding:0.5rem;"></div>
                    <div class="coa-help-box" style="width:40%;">
                        <i>The file number can be found on the upper right corner of the Supreme Court documents.</i>
                    </div>                        
                </div>

                <div class="row" style="margin-top: 0.5rem;">
                    <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Supreme Court Registry Location</div></div>
                    <div class="coa-text-box" style="width:40%; font-weight: 700;" v-if="manualTrib"></div>
                    <div class="coa-text-box" style="width:40%; font-weight: 700;" v-else> {{result.lowerCourtRegistryName}}</div>
                </div>

                
            </div>
        </div>

        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0.5rem; text-align: left; padding: 0.5rem;">
            <div style="margin-bottom: 0rem;">
                <b>To the respondent(s)</b><br>
                A court proceeding has been commenced against you in the Court of Appeal. See the final page 
                of this form for details on how to respond.
            </div>                
        </div>

    </div>

<!-- <1> -->
    <div class="row my-4" style="font-size: 12pt; font-weight: 600; margin: 0;"><b class="mr-3">1.</b> PARTIES TO THE APPEAL</div>

<!-- <Appellant(s)> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0rem;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.75rem 0px; height:8rem;">
            <div class="ml-2">
                <b>
                    Appellant(s)
                </b>    
                <i><br>
                    List the party(ies) appealing the Supreme Court or tribunal order. 
                    Identify their roles in the proceeding below in brackets. E.g., 
                    Jane Doe (plaintiff, petitioner, etc.)

                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-76"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="ml-2" style="font-weight: 700;">
                {{applicantNames.join(', ')}}
            </div>

            <!-- <div v-for="sop,inx in caseSop" :key="inx">
                <div v-if="sop.appealRole && sop.appealRole.toLowerCase() == 'appellant'" style="display: block; margin:0.5rem;">
                    <div class="my-0 row" style="line-height:1rem; padding:0.25rem;margin:0;font-weight: 700;display: block;">
                        <div>{{sop.conjunction}}:</div>
                    </div>

                    <div class="my-0 row" style="line-height:1rem; padding:0 0 0 1rem;margin:0">
                        <div style="text-align: center">
                            {{sop.partyName}}
                        </div>
                    </div>

                    <div class="my-0 row" style="font-weight: 700;">
                        <div style="line-height:1rem; padding:0 0 0 2rem;margin:0">
                            <div v-if="sop.lowerCourtRole == 'NONE (New Party)'">
                                {{sop.appealRole}}
                            </div>            
                            <div v-else>                        
                                {{sop.appealRole}}/<br> {{sop.lowerCourtRole}}
                            </div>
                        </div>
                    </div>    
                </div>  
            </div>  -->

        </div>                      

    </div> 

<!-- <Respondent(s)> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.6rem 0px; height:8.75rem;">
            <div class="ml-2">
                <b>
                    Respondent(s)
                </b>    
                <i><br>
                    List the other party(ies) in the Supreme Court or tribunal order you 
                    are appealing who are affected by the appeal. Identify their roles 
                    in the proceeding below in brackets. E.g.: Jane Doe (defendant). 
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-80"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="ml-2" style="font-weight: 700;">
                {{respondentNames.join(', ')}}
            </div>

            <!-- <div v-for="sop,inx in caseSop" :key="inx">
                <div v-if="sop.appealRole && sop.appealRole.toLowerCase() == 'respondent'" style="display: block; margin:0.5rem;">
                    <div class="my-0 row" style="line-height:1rem; padding:0.25rem;margin:0;font-weight: 700;display: block;">
                        <div>{{sop.conjunction}}:</div>
                    </div>

                    <div class="my-0 row" style="line-height:1rem; padding:0 0 0 1rem;margin:0">
                        <div style="text-align: center">
                            {{sop.partyName}}
                        </div>
                    </div>

                    <div class="my-0 row" style="font-weight: 700;">
                        <div style="line-height:1rem; padding:0 0 0 2rem;margin:0">
                            <div v-if="sop.lowerCourtRole == 'NONE (New Party)'">
                                {{sop.appealRole}}
                            </div>            
                            <div v-else>                        
                                {{sop.appealRole}}/<br> {{sop.lowerCourtRole}}
                            </div>
                        </div>
                    </div>    
                </div>  
            </div>             -->
        </div>                      

    </div> 

<!-- <2> -->
    <div class="row my-4" style="font-size: 12pt; font-weight: 600; margin: 0;"><b class="mr-3">2.</b> THE ORDER YOU ARE APPEALING</div>

<!-- <leave required> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-left" style="width:32%; margin:.6rem 0px; height:5.5rem;">
            <div class="ml-2">
                <b>
                    Is leave to appeal required?
                </b>    
                <i><br>
                    Court of Appeal Rule 12 explains when you need leave to appeal. 
                    If you are unsure, check “Yes”. 
                </i> 
            </div> 
        </div>       

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: 1.75rem 0 0 1rem;" 
                :check="result.applyLeave?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 1.75rem .5rem 0 1rem;" 
                :check="!result.applyLeave?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

    </div> 

<!-- <Who made the order> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.6rem 0; height:5.5rem;">
            <div class="ml-2">
                <b>
                    Who made the order?
                </b>    
                <i><br>
                    Name the justice or other decision maker who pronounced the order you are appealing.
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" style="font-weight: 700;" v-if="!normalForm">{{result.tribunalOriginalDecisionMaker}}</div> 
            <div class="mx-2" style="font-weight: 700;" v-else>{{result.judgeFullName}}</div> 
        </div>                      

    </div> 

<!-- <What court tribunal pronounced> -->
    <div style="display:flex; font-size: 9pt;">  

        <div class="coa-arrow-box-left" style="width:35%; margin:.75rem 0px; height:3rem;">
            <div class="ml-2" ><b>What court and/or tribunal pronounced the order(s)?</b></div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .75rem 0 0 1.25rem;" 
                :check="!result.appealTribunal?'yes':''" 
                shiftmark="1" 
                marginLeft="0.25rem"
                text="Supreme Court"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .75rem .5rem 0 0rem;" 
                :check="result.appealTribunal?'yes':''"
                shiftmark="1" 
                marginLeft="0.25rem"
                text="Tribunal"/>
        </div>   

        <div style="width:31%;">
            <div style="height:3.5rem; margin:0.5rem 0; font-weight: 700;" class="coa-text-box-center" v-if="result.appealTribunal">{{result.tribunalType}}</div>   
            <div style="height:3.5rem; margin:0.5rem 0;" class="coa-text-box-center" v-else></div>
        </div>       
                            
    </div>

    <div style="display:flex; font-size: 9pt; margin:-0.25rem 0 -1rem 0;">
        <div style="width:70%;">
        </div>    
        <div style="width:30%; text-align:center;">
             <div>Name of tribunal</div>                      
        </div>
    </div>    

<!-- <Date of order> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.6rem 0px; height:5.5rem;">
            <div class="ml-2">
                <b>
                    Date the order was pronounced
                </b>    
                <i style="font-size:8.5pt;"><br>
                    Include the day, month and year that the order being appealed
                    was pronounced (not the date the order was entered).
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->
        <div style="width:20%">
            <div class="coa-text-box-center" style="height:3rem; margin:1.25rem 0 0 0; ">
                <div class="mx-2" style="font-weight: 700;" v-if="!normalForm">{{result.tribunalDateOfOrder | beautify-date-dd/mm/yyyy}}</div> 
                <div class="mx-2" style="font-weight: 700;" v-else>{{result.dateOfJudgement | beautify-date-dd/mm/yyyy}}</div> 
            </div> 
            <div >
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>
        </div>                    

    </div> 

<!-- <City of Order> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:3.5rem;">
            <div class="ml-2" >
                <b>
                    City where the order was pronounced
                </b>
            </div>                       
        </div>

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" style="font-weight: 700;">{{result.cityOfOrder}}</div> 
          
        </div>                      

    </div> 

<!-- <Length of hearing> -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:8.5rem;">
            <div class="ml-2">
                <b>
                    Length of lower court hearing
                </b>    
                <i><br>
                    Indicate in days or hours the length of the hearing that led to
                    the order you are appealing from. For example, if you are
                    appealing a judgment from a trial that took two hours, enter
                    “two hours.”
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-76"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" style="font-weight: 700;">{{result.trialDurationDays}}</div>             
        </div>                      

    </div> 

<!-- <Type of proceeding> -->
    <div style="display:flex; font-size: 9pt; margin-top: 2rem;">                      
        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:3.5rem;">
            <div class="ml-2" >
                <b>What type of proceeding are you appealing from?</b>
                <i><br>
                    Check one only.    
                </i>
            </div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 0; width:34%;">              
            <check-box 
                style="margin: 0.75rem 0 0 1rem;" 
                :check="result.appealFrom == 'Trial Judgment'?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Trial Judgment"/> 
            <check-box 
                style="margin: 0.5rem 0 0 1rem;" 
                :check="result.appealFrom == 'Summary Trial Judgment'?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Summary Trial Judgment"/>  
             
        </div>
        <div style="margin-top: 0; width:24%;">              
            <check-box                    
                style="padding: 0; margin: 0.75rem .5rem 0 1rem;" 
                :check="result.appealFrom == 'Order of a Tribunal'?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Order of a Tribunal"/>
            <check-box                    
                style="padding: 0; margin: 0.5rem .5rem 0 1rem;" 
                :check="result.appealFrom == 'Chambers Judgment'?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Chambers Judgment"/>
        </div>
                            
    </div>
    <div class="mt-5">
    </div>

<!-- <3>  -->
<!-- <relief sought>-->
    <div class="row my-0" style="font-size: 12pt; font-weight: 600; margin: 0;"><b class="mr-3">3.</b> RELIEF SOUGHT</div>

    <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding: 0.5rem;">
        <div style="margin-bottom: rem;">           
            If leave to appeal is not required, fill out Part A. If you are seeking leave to appeal, fill out Part B.
        </div>                
    </div>

<!-- <Part A> -->           

    <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
        <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 600;"><b class="mr-3">PART A:</b> LEAVE NOT REQUIRED</div>     
<!-- <part-of-judgment>-->               
        <div style="display:flex; font-size: 9pt; margin:0.2rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.6rem 0px; height:6.5rem; background:#FFF;">
                <div class="ml-2">
                    <b>
                        Part of the order being appealed
                    </b>    
                    <i><br>
                        If you only want to appeal one part of an order, enter the part
                        that is being appealed.
                    </i> 
                </div>                       
            </div>

            <div class="arrow-right-flash-62" style="border-left-color: #FFF;"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="!result.applyLeave" class="mx-2" style="font-weight: 700;">{{result.partOfJudgment}}</div>             
            </div>                      

        </div>
<!-- <order-sought>-->  
        <div style="display:flex; font-size: 9pt; margin:0.5rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.7rem 0px; height:8rem; background:#FFF;">
                <div class="ml-2">
                    <b>
                        Order(s) you are seeking on appeal
                    </b>    
                    <i><br>
                        Briefly list the order(s) you will ask this Court to make on appeal.
                        For example: “Set aside the trial judgment and order a new trial”.         
                        Include any order as to costs.               
                    </i> 
                </div>                       
            </div>

            <div class="arrow-right-flash-76" style="border-left-color: #FFF;"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="!result.applyLeave" class="mx-2" style="font-weight: 700;">{{result.orderSought}}</div>             
            </div>                      

        </div>         
       
    </div>


<!-- <PART B> -->
    <div style="border: 1px solid #E8E8E8; background:#E8E8E8; font-size: 10pt; margin: 0.5rem 0; text-align: left; padding:0 0.5rem;">
        <div class="row" style="font-size: 12pt; margin: 0 0.5rem; font-weight: 700;"><b class="mr-3">PART B:</b> SEEKING LEAVE TO APPEAL</div>
<!-- <part-of-judgment>-->                 
        <div style="display:flex; font-size: 9pt; margin:0.2rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.6rem 0px; height:6.5rem; background:#FFF;">
                <div class="ml-2">
                    <b>
                        Part of the order being appealed
                    </b>    
                    <i><br>
                        If you are only seeking leave to appeal one part of an order,
                        enter the part that you are seeking leave to appeal.
                    </i> 
                </div>                       
            </div>

            <div class="arrow-right-flash-62" style="border-left-color: #FFF;"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="result.applyLeave" class="mx-2" style="font-weight: 700;">{{result.partOfJudgment}}</div>             
            </div>                      

        </div>
<!-- <order-sought>-->  
        <div style="display:flex; font-size: 9pt; margin:0.5rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.7rem 0px; height:8rem; background:#FFF;">
                <div class="ml-2">
                    <b>
                        Grounds for leave to appeal
                    </b>    
                    <i><br>
                        Be as specific as possible. For example, if you believe the trial
                        judge used an incorrect legal test or otherwise misapplied
                        the law, indicate that here.
                    </i> 
                </div>                       
            </div>

            <div class="arrow-right-flash-76" style="border-left-color: #FFF;"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="result.applyLeave" class="mx-2" style="font-weight: 700;">{{result.orderSought}}</div>             
            </div>                      

        </div>         
       
    </div>

<!-- <4> -->
    <div class="row mt-4" style="font-size: 12pt; font-weight: 600; margin: 0;"><b class="mr-3">4.</b> ADDITIONAL INFORMATION</div>

<!-- <Sealing order> -->
    <div style="display:flex; font-size: 9pt; margin:0.5rem 0px;">
                        
        <div class="coa-arrow-box-left" style="width:32%; margin:.6rem 0px; height:5.5rem;">
            <div class="ml-2">
                <b>
                    Sealing order
                </b>  
                <i><br>
                    Is there an order sealing any part of the trial court or tribunal file?
                    <br>If yes, add date(s).
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: 1.25rem 0 0 1rem;" 
                :check="result.orderSealed?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 1.25rem .5rem 0 1rem;" 
                :check="!result.orderSealed?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

        
        <div style="margin-top: 2.15rem; width:10%">
            <div style="text-align:right; margin-right:0.5rem;">Date</div>
        </div>     

        <div style="width:20%;">           
                
            <div class="coa-text-box-center" style="height:3rem; margin:1.25rem 0 0 0; ">
                <div class="mx-2" style="height:3rem; margin:1.25rem 0 0 0; font-weight: 700;" v-if="result.orderSealed">{{result.dateSealed}}</div>
                <div class="mx-2" style="height:3rem; margin:1.25rem 0 0 0;" v-else></div>
            </div>
            <div >
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div> 

        </div>
    </div>

    <div style="display:flex; font-size: 9pt; margin:0rem 0px;">
    </div>

<!-- <Ban order> -->
    <div style="display:flex; font-size: 9pt; margin:0;">
                        
        <div class="coa-arrow-box-left" style="width:32%; margin:.6rem 0px; height:5.5rem;">
            <div class="ml-2">
                <b>
                    Anonymity order/publication bans
                </b>  
                <i>
                    Are there orders that protect the identity of a party or parties?
                    <br>If yes, add date(s).
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: 1.25rem 0 0 1rem;" 
                :check="result.orderBan?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 1.25rem .5rem 0 1rem;" 
                :check="!result.orderBan?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

        <div style="margin-top: 2.15rem; width:10%">
            <div style="text-align:right; margin-right:0.5rem;">Date</div>
        </div>     

        <div style="width:20%;">           
                
            <div class="coa-text-box-center" style="height:3rem; margin:1.25rem 0 0 0; ">                
                <div class="mx-2" style="height:3rem; margin:1.25rem 0 0 0; font-weight: 700;" v-if="result.orderBan">{{result.dateBan}}</div>
                <div class="mx-2" style="height:3rem; margin:1.25rem 0 0 0;" v-else></div>
            </div>
            <div >
                <div class="arrow-up-flash"></div>
                <div class="arrow-up-box"></div>               
                <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
            </div>             
              
        </div>
    </div>


<!-- <Areas of law>-->
    <div style="display:flex; font-size: 9pt;">                      
        <div class="coa-arrow-box-left" style="width:37%; margin:.35rem 0px; height:7.5rem;">
            <div class="ml-2" >
                <b style="font-size:8.95pt;">Areas of law raised in the appeal</b>
                <i style="font-size:8.5pt;"><br>
                    You may check more than one box if appropriate. For example,
                    you should check “motor vehicle accidents” and “torts” for a
                    personal injury claim involving a motor vehicle accident.    
                </i>
            </div>
        </div>       

        <div class="arrow-right-flash-66"></div> <!-- < width ~ 8% > -->                

        <div style="font-size:8.75pt; margin-top: 1rem; width:35%;">              
            <check-box 
                style="margin: 0rem 0 0 1rem;" 
                :check="result.involves.includes('Constitutional / Administrative')?'yes':''"  
                shiftmark="1" 
                marginLeft="0rem"
                text="Constitutional/Administrative"/> 
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.involves.includes('Motor Vehicle Accidents')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Motor Vehicle Accidents"/> 

            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.involves.includes('Torts')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Torts"/>
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.involves.includes('Divorce Act')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Divorce Act (Canada)"/>  
        </div>

        <div style="font-size:8.75pt; margin-top: 1rem; width:19.5%;">              
            <check-box                    
                style="padding: 0; margin: 0rem .5rem 0 0rem;" 
                :check="result.involves.includes('Civil Procedure')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Civil Procedure"/>
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Municipal Law')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Municipal Law"/>
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Equity')?'yes':''"
                shiftmark="1" 
                marginLeft="0rem"
                text="Equity"/>
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Family Law Act')?'yes':''"
                shiftmark="1" 
                marginLeft="0rem"
                text="Family Law Act"/>
        </div>

        <div style="font-size:8.75pt; margin-top: 1rem; width:17%;">              
            <check-box                    
                style="padding: 0; margin: 0rem .5rem 0 0rem;" 
                :check="result.involves.includes('Commercial')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Commercial"/>                     
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Real Property')?'yes':''" 
                shiftmark="1" 
                marginLeft="0rem"
                text="Real Property"/>           
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Wills and Estate')?'yes':''"
                shiftmark="1" 
                marginLeft="0rem"
                text="Wills and Estates"/>             
            <check-box                    
                style="padding: 0; margin: .5rem 0 0 0rem;" 
                :check="result.involves.includes('Other')?'yes':''"
                shiftmark="1" 
                marginLeft="0rem"
                text="Other"/>
        </div>
    </div>

<!-- <Involves-children>-->
    <div style="display:flex; font-size: 9pt; margin:0.5rem 0px;">
                        
        <div class="coa-arrow-box-left" style="width:32%; margin:.35rem 0px; height:3.75rem;">
            <div class="ml-2">
                <b>
                    Appeals involving children
                </b>  
                <i style="font-size:8.65pt;"><br>
                    Does this appeal involve the rights or interests of a child?
                    E.g., parenting order.
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.appealInvolvesChild?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.appealInvolvesChild?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>
    </div>

<!-- <5> -->
<!-- <service>-->
    <div class="row mt-4" style="font-size: 12pt; font-weight: 600; margin: 0;"><b class="mr-3">5.</b> SERVICE</div>

<!-- <representation>-->
    <div style="display:flex; font-size: 9pt; margin:0 0 0.25rem 0;">
                        
        <div class="coa-arrow-box-left" style="width:32%; margin:.7rem 0px; height:3rem;">
            <div class="ml-2">
                <b>
                    Are you representing yourself?
                </b>    
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.selfRepresenting?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.selfRepresenting?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>
    </div>

 <!-- <Service-Addresses> -->
    <div style="display:flex; font-size: 9pt;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.35rem 0px; height:6rem;">
            <div class="ml-2">
                <b>
                    Name(s) and address(es) within BC for service of the appellant(s)
                </b>    
                <i><br>
                    If you have a lawyer, include the law firm’s address; otherwise 
                    provide your own residential address.
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%; font-weight: 700;">
            <div class="mx-2" v-html="result.contactAddress"></div>
        </div>                      

    </div> 
        

<!-- <Phone-number> -->
    <div class="mt-2" style="display:flex; font-size: 9pt;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0; height:3.5rem;">
            <div class="ml-2" style="font-weight: 700;">
                Phone number(s) of appellant(s)
            </div>               
        </div>

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%; font-weight: 700;">
            <div class="mx-2" v-html="result.phones"></div>
        </div>                       

    </div> 


<!-- <Email> -->
    <div class="mt-2" style="display:flex; font-size: 9pt;">       

        <div class="coa-arrow-box-left" style="width:32%; margin:.35rem 0;  height:6rem;">
            <div class="ml-2">
                <b >Email address(es)</b><b style="font-size:8pt;"> for service of appellant(s)</b>
                <i ><br>
                    If you provide an email address, you consent to have documents
                    served on you by email.
                </i>      
            </div>
        </div>

        <div class="arrow-right-flash-54"></div> <!-- < width ~ 8% > -->
                
        <div class="coa-text-box-left" style="width:60%; font-weight: 700;">
            <div class="mx-2" v-html="result.emails"></div> 
        </div>                      

    </div> 

        
<!-- <____________________________________________________________________________________> -->

<!-- <Sign-Date> -->
    <div class="row mt-5" style="font-size: 9pt;">
        
        <div class="coa-arrow-box-left" style="width:19%; margin:0.5rem 0; line-height:0.75rem;  height:2rem;">
            <div class="ml-2"> Date form completed</div>
        </div>
        <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->      

        <div class="coa-text-box-center" style="width:15%; font-weight: 700;">{{result.completionDate}}</div> 
        
        <div style="width:3.28%;"></div>
        
        <div class="coa-arrow-box-left" style="width:25%; margin:0.5rem 0; line-height:0.95rem;  height:2.15rem;">
            <div class="ml-2">Name of lawyer or party authorizing filing of this form.</div>
        </div>
        <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->

        <div class="coa-text-box-center" style="width:25%; font-weight: 700;"> {{result.appealingFirm}}</div>
            
    </div>

<!-- <date-help>-->
    <div class="row" style="font-size: 9pt;">
        <div style="width:25.25%;"></div>
        <div style="width:15%">
            <div class="arrow-up-flash"></div>
            <div class="arrow-up-box"></div>               
            <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
        </div>
    </div>

<!-- <INS> -->

<!-- <To the appellant> -->
    <div style="margin:1rem 0 0 0;">
        <b>To the appellant(s):</b> 
        <p style="margin-top:0.45rem; text-align: justify;">
            You must file and serve this form on each respondent named in this document within 
            the timelines required by the <i>Court of Appeal Act</i> and <i>Court of Appeal Rules</i>. 
            You must file a Notice of Hearing <b>not more than one year</b> after filing this Form 
            1 or your appeal will be placed on the inactive list (Rule 50(1)(a)).
        </p>
    </div>

<!-- <To the respondent> -->
    <div style="margin:1.25rem 0 0 0rem;">
        <b>To the respondent(s):</b> 
        <p style="margin-top:0.45rem; text-align: justify;">
            <b>If you intend to participate</b> in this proceeding, <b>you must give notice</b> 
            of your intention by doing the following <b>not more than 10 days</b> after receiving
            this Notice of Appeal: (1) file a “Notice of Appearance” (Form 2 of the Court of 
            Appeal Rules) in a Court of Appeal registry and; (2) serve the Notice of 
            Appearance on the appellant.
        </p>
        <p class="mb-n1">If you fail to file and serve a Notice of Appearance:</p>
        
        <p style="text-indent:-1.5rem; margin:0.5rem 0 0 2.5rem;">
            <span class="mr-1">(a)</span> You are presumed to take no position on the appeal, or the 
            application for leave to appeal (if leave is required).
        </p>
        <p style="text-indent:-1.5rem; margin:0.5rem 0 0 2.5rem;">
            <span class="mr-1">(b)</span> The parties are not obliged to serve you with any further 
            documents related to the appeal, including an order granting 
            leave to appeal (if leave is required).
        </p>
        
        <p style="margin-top:0.75rem;">
            <b>You are presumed to take no position if you fail</b>  to file and serve a 
            Notice of Appearance within the time described above. The filing 
            registries for the British Columbia Court of Appeal are as follows.
        </p>    

        <div class="row" style="margin:2.25rem 0 0 0; padding:0" >
            <div style="width:40%; padding:0;">
                <div style="display:block; margin: 0 0 0.75rem 0;">Central Registry:</div>
                <div style="display:block;">B.C. Court of Appeal</div>
                <div style="display:block;">Suite 400, 800 Hornby St.</div>
                <div style="display:block;">Vancouver BC V6Z 2C5</div>
            </div>
        
                
            <div style="width:30%; padding:0">            
                <div style="display:block; margin: 0 0 0.75rem 0;">Other Registries:</div>
                <div style="display:block;">B.C. Court of Appeal</div>
                <div style="display:block;">The Law Courts</div>
                <div style="display:block;">P.O. Box 9248</div>
                <div style="display:block;">STN PROV GOVT</div>
                <div style="display:block;">850 Burdett Ave</div>
                <div style="display:block;">Victoria BC V8W 1B4</div>
            </div>

            <div style="width:30%;">   
                        
                <div style="display:block; margin-top:2.05rem;">B.C. Court of Appeal</div>
                <div style="display:block;">223 - 455 Columbia Street</div>
                <div style="display:block;">Kamloops BC V2C 6K4</div>               
        
            </div>
        </div>
        <div style="display:block; margin-top:1rem;">Inquiries should be addressed to (604) 660-2468</div>        
    </div>       


</div>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {getPartyTitles} from "../fillForm1/PartyTitles"
import { namespace } from "vuex-class";
import "@/store/modules/information";
import { locationsInfoType } from '@/types/Common';
const informationState = namespace("Information");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import { form1DataInfoType, manualSopInfoType, form1PartiesInfoType } from '@/types/Information/Form1';

@Component({
    components:{       
        CheckBox,
        UnderlineForm            
    }
})
export default class Form1Layout extends Vue {

    @Prop({required:true})
    result!: form1DataInfoType; 

    @Prop({required: true})
    manualNTrib!: boolean

    @Prop({required: true})
    manualTrib!: boolean

    @Prop({required: true})
    manualNorm!: boolean

    @Prop({required: true})
    normalForm!: boolean

    @informationState.State
    public caseLocation: locationsInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void
    
    dataReady = false;   
    applicantNames: string[] = [];
    respondentNames: string[] = [];

    // caseSop :manualSopInfoType[] = [];
    // noRolePartySop: manualSopInfoType[] = [];    

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }

   
    public extractInfo(){
        
        const parties = this.result.parties
        this.applicantNames = [];
        this.respondentNames = [];
        
        for(const party of parties){
            
            if(party.appealRole=="Appellant")
                this.applicantNames.push(getPartyTitles(party, ' ', true))
            else if(party.appealRole=="Respondent")
                this.respondentNames.push(getPartyTitles(party, ' ', true))
        }
    }    
   
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>