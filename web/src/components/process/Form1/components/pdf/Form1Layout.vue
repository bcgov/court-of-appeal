<template>

<div v-if="dataReady">

    <!-- <header> -->
    <div style="margin-top:-1.25rem;">
        <div style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;"><b>i</b></div>
        <div class="row" style="display: block; text-align: center; border: 1px solid black; background: black; color: white;">
            <div style="font-size:18pt; font-weight: 700;">COURT OF APPEAL FOR BRITISH COLUMBIA</div>                
        </div>   
        <div class="row" style="margin-top: 0.75rem; text-align: center; border: 1px solid black; line-height: 3rem;">
            <div style="width:25%; font-size:20pt; background: black; color: white; display:flex; align-items:center; justify-content:center;"><b>FORM 1</b></div>
            <div style="width:75%; font-size:14pt; line-height:2rem;"><b>
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
                        <div style="display:block; font-size: 8pt; font-weight: 700; margin-right: 1rem;">(For Registry Use Only)</div>
                        </div>
                    </div>
                    <div class="coa-text-box" style="width:40%;background: #E8E8E8;" ></div>
                </div>

                <div class="row" style="margin-top: 0.5rem;">
                    <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Supreme Court File No.</div></div>
                    <div class="coa-text-box" style="width:40%;" v-if="result.appealTribunal"></div>
                    <div class="coa-text-box" style="width:40%;" v-else>{{result.lowerCourtFileNo}}</div>
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
                    <div class="coa-text-box" style="width:40%;" v-if="result.appealTribunal"></div>
                    <div class="coa-text-box" style="width:40%;" v-else>{{caseLocation.name}}</div>
                </div>

                
            </div>
        </div>

        <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0.5rem; text-align: left; padding: 0.5rem;">
            <div style="margin-bottom: 0.75rem;">
                <b>To the respondent(s)</b><br>
                A court proceeding has been commenced against you in the Court of Appeal. See the final page 
                of this form for details on how to respond.
            </div>                
        </div>

    </div>

    <div class="row my-4" style="font-weight: 700;">1. PARTIES TO THE APPEAL</div>

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Appellant(s)
                </b>    
                <i><br>
                    List the party(ies) appealing the Supreme Court or tribunal order. 
                    Identify their roles in the proceeding below in brackets. E.g.: 
                    Jane Doe (plaintiff, petitioner, etc.)

                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
           <div class="mx-2">{{applicantNames.toString()}}</div>
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
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

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{respondentNames.toString()}}</div> 
        </div>                      

    </div> 

    <div class="row my-4" style="font-weight: 700;">2. THE ORDER YOU ARE APPEALING</div>

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:6.5rem;">
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

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="true?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="true?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

    </div> 

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Who made the order?
                </b>    
                <i><br>
                    Name the justice or other decision maker who pronounced the order you are appealing.
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" v-if="result.appealTribunal">{{result.tribunalOriginalDecisionMaker}}</div> 
            <div class="mx-2">{{result.judgeFullName}}</div> 
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt;">                      
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">
            <div style="margin-left:4.5rem" ><b>What court and/or tribunal pronounced the order(s)?</b></div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="!result.appealTribunal?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Supreme Court"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="result.appealTribunal?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Tribunal"/>
        </div>   

        <div class="coa-text-box-center" style="width:31%;" v-if="result.appealTribunal">{{result.tribunalType}}</div>   
        <div class="coa-text-box-center" style="width:31%;" v-else></div>       
                            
    </div>

    <div style="display:flex; font-size: 9pt;">
        <div style="width:69%;">
        </div>    
        <div style="width:31%; text-align:center;">
             <div>Name of tribunal</div>                      
        </div>
    </div>    

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Date the order was pronounced
                </b>    
                <i><br>
                    Include the day, month and year that the order being appealed
                    was pronounced (not the date the order was entered).
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" v-if="result.appealTribunal">{{result.tribunalDateOfOrder | beautify-date-dd/mm/yyyy}}</div> 
            <div class="mx-2">{{result.dateOfJudgement | beautify-date-dd/mm/yyyy}}</div> 
        </div>                      

    </div> 

<!-- <date-help>-->
    <div class="row" style="font-size: 9pt;">
        <div style="width:40%;"></div>
        <div style="width:15%">
            <div class="arrow-up-flash"></div>
            <div class="arrow-up-box"></div>               
            <div class="coa-help-box" style="text-align:center; line-height:0.25rem"><i>DD/MM/YYYY</i></div>                 
        </div>
    </div>

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">
            <div style="margin-left:4.5rem" >
                <b>
                    City where the order was pronounced
                </b>
            </div>                       
        </div>

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2" v-if="result.appealTribunal">{{result.tribunalLocationOfOrder}}</div> 
            <div class="mx-2">{{result.lowerCourtRegistryName}}</div> 
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

        <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
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

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.trialDurationDays}}</div>             
        </div>                      

    </div> 

    <div style="display:flex; font-size: 9pt;">                      
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:3.5rem;">
            <div style="margin-left:4.5rem" >
                <b>What type of proceeding are you appealing from?</b>
                <i><br>
                    Check one only.    
                </i>
            </div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 0; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="!result.appealTribunal?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Trial Judgment"/>  
        </div>
        <div style="margin-top: 0; width:24%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="result.appealTribunal?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Order of a Tribunal"/>
        </div>
                            
    </div>

    <div class="row" style="font-size: 9pt;">
        <div style="width:33%;"></div>
        <div style="margin-top: -1rem; width:24%;">              
            <check-box 
                style="margin: 0 0 0 1rem;" 
                :check="!result.appealTribunal?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Summary Trial Judgment"/>  
        </div>
        <div style="margin-top: -1rem; width:24%;">              
            <check-box                    
                style="padding: 0; margin: 0 .5rem 0 1rem;" 
                :check="result.appealTribunal?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Chambers Judgment"/>
        </div>
    </div>
<!-- <relief sought>-->
    <div class="row my-4" style="font-weight: 700;">3. RELIEF SOUGHT</div>

    <div style="border: 1px solid #E8E8E8; background: #E8E8E8; font-size: 10pt; margin: 1.5rem 0; text-align: left; padding: 0.5rem;">
        <div style="margin-bottom: 0.75rem;">           
            If leave to appeal is not required, fill out Part A. If you are seeking leave to appeal, fill out Part B.
        </div>                
    </div>

<!--  < Part A >   ____________________________________________________________         -->           

    <div class="mt-4" style="border: 1px solid #BABABA; background: #BABABA; font-size: 10pt; margin: 1.5rem 0; text-align: left; padding: 0.5rem;">
        
        <div class="row my-4" style="font-weight: 700;">PART A: LEAVE NOT REQUIRED</div>
               
        <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
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

            <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="!result.applyLeave" class="mx-2">{{result.partOfJudgment}}</div>             
            </div>                      

        </div>

        <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
                <div class="ml-2">
                    <b>
                        Order you are seeking on appeal
                    </b>    
                    <i><br>
                        Briefly list the order(s) you will ask this Court to make on appeal.
                        For example: “Set aside the trial judgment and order a new trial”.
                        Include any order as to costs.
                    </i> 
                </div>                       
            </div>

            <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="!result.applyLeave" class="mx-2">{{result.orderSought}}</div>             
            </div>                      

        </div>         
       
    </div>

<!--  < Part B >   ____________________________________________________________         -->
    
    <div class="mt-4" style="border: 1px solid #BABABA; background: #BABABA; font-size: 10pt; margin: 1.5rem 0; text-align: left; padding: 0.5rem;">
        
        <div class="row my-4" style="font-weight: 700;">PART B: SEEKING LEAVE TO APPEAL</div>
               
        <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
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

            <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="result.applyLeave" class="mx-2">{{result.partOfJudgment}}</div>             
            </div>                      

        </div>

        <div style="display:flex; font-size: 9pt; margin:1rem 0px;">

            <div class="coa-arrow-box-left" style="width:32%; margin:0.5rem 0px; height:6.5rem;">
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

            <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
            
            <div class="coa-text-box-left" style="width:60%; background: white;">
                <div v-if="result.applyLeave" class="mx-2">{{result.orderSought}}</div>             
            </div>                      

        </div>         
       
    </div>

    <div class="row my-4" style="font-weight: 700;">4. ADDITIONAL INFORMATION</div>
    <!--  < Sealing order >   ____________________________________________________________         -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:32%; margin:.5rem 0px; height:2.5rem;">
            <div class="ml-2">
                <b>
                    Sealing order
                </b>  
                <i><br>
                    Is there an order sealing any part of the trial court or tribunal file?
                    If yes, add date(s).
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.orderSealed?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:10%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.orderSealed?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

        <div style="margin-top: 0.5rem; width:40%;">
            <div class="row">
                <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Date</div></div>
                <div class="coa-text-box" style="width:48%;" v-if="result.orderSealed">{{result.dateSealed}}</div>
                <div class="coa-text-box" style="width:48%;" v-else></div>
            </div>

            <div class="row" >
                <div style="width:45.5%; padding:0.5rem;"></div>
                <div style="width:48%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                    <div class="arrow-up-flash"></div>
                    <div class="arrow-up-box"></div>
                </div>
            </div>

            <div class="row" >
                <div style="width:45.5%; padding:0.5rem;"></div>
                <div class="coa-help-box" style="width:48%;">
                    <i>DD/MM/YYYY</i>
                </div>                        
            </div>
        </div>
    </div>
    <!--  < Ban order >   ____________________________________________________________         -->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:32%; margin:.5rem 0px; height:4.5rem;">
            <div class="ml-2">
                <b>
                    Anonymity order/publication bans
                </b>  
                <i><br>
                    Are there orders that protect the identity of a party or parties?
                    If yes, add date(s).
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:10%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.orderBan?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:10%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.orderBan?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>

        <div style="margin-top: 0.5rem; width:40%;">
            <div class="row">
                <div style="width:45.5%; padding:0.5rem;"><div style="text-align:right; margin-right:0.5rem;">Date</div></div>
                <div class="coa-text-box" style="width:48%;" v-if="result.orderBan">{{result.dateBan}}</div>
                <div class="coa-text-box" style="width:48%;" v-else></div>
            </div>

            <div class="row" >
                <div style="width:45.5%; padding:0.5rem;"></div>
                <div style="width:48%; margin:0; padding:0rem 0.5rem; border: 0px solid white;">
                    <div class="arrow-up-flash"></div>
                    <div class="arrow-up-box"></div>
                </div>
            </div>

            <div class="row" >
                <div style="width:45.5%; padding:0.5rem;"></div>
                <div class="coa-help-box" style="width:48%;">
                    <i>DD/MM/YYYY</i>
                </div>                        
            </div>
        </div>
    </div>
<!-- <areas of law involved>-->
    <div style="display:flex; font-size: 9pt;">                      
        <div class="coa-arrow-box-right" style="width:32%; margin:.5rem 0px; height:8.5rem;">
            <div class="ml-2" >
                <b>Areas of law raised in the appeal</b>
                <i><br>
                    You may check more than one box if appropriate. For example,
                    you should check “motor vehicle accidents” and “torts” for a
                    personal injury claim involving a motor vehicle accident.    
                </i>
            </div>
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:30%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.involves.includes('Constitutional / Administrative')?'yes':''"  
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Constitutional/Administrative"/>  
        </div>
        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1.25rem;" 
                :check="result.involves.includes('Civil Procedure')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Civil Procedure"/>
        </div>

        <div style="margin-top: 1rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1.25rem;" 
                :check="result.involves.includes('Commercial')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Commercial"/>
        </div>
                            
    </div>

    <div class="row" style="font-size: 9pt;">
        <div style="width:40%;"></div>
        <div style="margin-top: -6rem; width:30%;">              
            <check-box 
                style="margin: 0 0 0 -0.25rem;" 
                :check="result.involves.includes('Motor Vehicle Accidents')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Motor Vehicle Accidents"/>  
        </div>
        <div style="margin-top: -6rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -1.5rem;" 
                :check="result.involves.includes('Municipal Law')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Municipal Law"/>
        </div>

        <div style="margin-top: -6rem; width:10%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -2.75rem;" 
                :check="result.involves.includes('Real Property')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Real Property"/>
        </div>
    </div>

    <div class="row" style="font-size: 9pt;">
        <div style="width:40%;"></div>
        <div style="margin-top: -4rem; width:30%;">              
            <check-box 
                style="margin: 0 0 0 -0.25rem;" 
                :check="result.involves.includes('Torts')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Torts"/>  
        </div>
        <div style="margin-top: -4rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -1.5rem;" 
                :check="result.involves.includes('Equity')?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Equity"/>
        </div>

        <div style="margin-top: -4rem; width:10%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -2.75rem;" 
                :check="result.involves.includes('Wills and Estate')?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Wills and Estates"/>
        </div>
    </div>

    <div class="row" style="font-size: 9pt;">
        <div style="width:40%;"></div>
        <div style="margin-top: -2rem; width:30%;">              
            <check-box 
                style="margin: 0 0 0 -0.25rem;" 
                :check="result.involves.includes('Divorce Act')?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Divorce Act"/>  
        </div>
        <div style="margin-top: -2rem; width:20%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -1.5rem;" 
                :check="result.involves.includes('Family Law Act')?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Family Law Act"/>
        </div>

        <div style="margin-top: -2rem; width:10%;">              
            <check-box                    
                style="padding: 0; margin: 0 0 0 -2.75rem;" 
                :check="result.involves.includes('Other')?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Other"/>
        </div>
    </div>
<!-- <involves-children>-->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:2.5rem;">
            <div class="ml-2">
                <b>
                    Appeals involving children
                </b>  
                <i><br>
                    Does this appeal involve the rights or interests of a child?
                    E.g., parenting order
                </i>  
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.appealInvolvesChild?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.appealInvolvesChild?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>
    </div>
<!-- <service>-->
    <div class="row my-4" style="font-weight: 700;">5. SERVICE</div>
<!-- <representation>-->
    <div style="display:flex; font-size: 9pt; margin:1rem 0px;">
                        
        <div class="coa-arrow-box-right" style="width:25%; margin:.5rem 0px; height:2.5rem;">
            <div class="ml-2">
                <b>
                    Are you representing yourself?
                </b>    
               
            </div> 
        </div>       

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->                

        <div style="margin-top: 1rem; width:24%;">              
            <check-box 
                style="margin: .5rem 0 0 1rem;" 
                :check="result.selfRepresenting?'yes':''" 
                shiftmark="1" 
                marginLeft="0.5rem"
                text="Yes"/>  
        </div>
        <div style="margin-top: 1rem; width:12%;">              
            <check-box                    
                style="padding: 0; margin: .5rem .5rem 0 1rem;" 
                :check="!result.selfRepresenting?'yes':''"
                shiftmark="1" 
                marginLeft="0.5rem"
                text="No"/>
        </div>
    </div>
 <!-- ROW <service-addresses> -->
    <div style="display:flex; font-size: 9pt;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0px; height:6.5rem;">
            <div class="ml-2">
                <b>
                    Name(s) and address(es) within BC for service of the appellant(s).
                </b>    
                <i><br>
                    If you have a lawyer, include the law firm’s address. Otherwise 
                    provide your own residential address.
                </i> 
            </div>                       
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.appealingFirmAddress}}</div> 
        </div>                      

    </div> 
        

<!-- ROW <phone-number> -->
    <div class="mt-4" style="display:flex; font-size: 9pt;">

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0; height:3.5rem;">
            <div class="ml-2" style="font-weight: 700;">
                Phone number(s) of appellant(s)
            </div>               
        </div>

        <div class="arrow-right-flash-36"></div> <!-- < width ~ 8% > -->
        
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.phoneNumbers}}</div>
        </div>                       

    </div> 


<!-- <email> -->
    <div class="mt-4" style="display:flex; font-size: 9pt;">       

        <div class="coa-arrow-box-left" style="width:32%; margin:.5rem 0;  height:6.5rem;">
            <div class="ml-2">
                <b>Email address(es)</b><b style="font-size:8pt;"> for service of appellant(s)</b>
                <i><br>
                    If you provide an email address, you consent to have documents
                    served on you by email.
                </i>      
            </div>
        </div>

        <div class="arrow-right-flash-62"></div> <!-- < width ~ 8% > -->
                
        <div class="coa-text-box-left" style="width:60%;">
            <div class="mx-2">{{result.emails}}</div> 
        </div>                      

    </div> 

        
<!-- <____________________________________________________________________________________> -->

<!-- <Sign-Date> -->
    <div class="row mt-5" style="font-size: 9pt;">
        
        <div class="coa-arrow-box-left" style="width:19%; margin:0.5rem 0; line-height:0.75rem;  height:2rem;">
            <div class="ml-2"> Date form completed</div>
        </div>
        <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->      

        <div class="coa-text-box-center" style="width:15%;">{{result.completionDate}}</div> 
        
        <div style="width:3.28%;"></div>
        
        <div class="coa-arrow-box-left" style="width:25%; margin:0.5rem 0; line-height:0.95rem;  height:2.15rem;">
            <div class="ml-2">Name of lawyer or party authorizing filing of this form.</div>
        </div>
        <div class="arrow-right-flash-25"></div> <!-- < width ~ 6.64% > -->

        <div class="coa-text-box-center" style="width:25%;"> {{result.appealingFirm}}</div>
            
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

    <div style="margin:1rem 0 0 0;">
        <b>To the appellant(s):</b> 
        <p style="margin-top:0.45rem;">
            You must file and serve this form on each respondent named in this document within 
            the timelines required by the <i>Court of Appeal Act</i> and <i>Court of Appeal Rules</i>. 
            You must file a Notice of Hearing <b>not more than one year</b> after filing this Form 
            1 or your appeal will be placed on the inactive list (Rule 50(1)(a)).
        </p>
    </div>

    <div style="margin:1rem 0 0 0rem;">
        <b>To the respondent(s):</b> 
        <p style="margin-top:0.45rem;">
            <b>If you intend to participate</b> in this proceeding, <b>you must give notice</b> 
            of your intention by doing the following <b>not more than 10 days</b> after receiving
            this Notice of Appeal: (1) file a “Notice of Appearance” (Form 2 of the <i>Court of 
            Appeal Rules</i>) in a Court of Appeal registry and; (2) serve the Notice of 
            Appearance on the appellant.
        </p>
        <p>If you fail to file and serve a Notice of Appearance:</p>
        
        <p style="text-indent:1rem; margin:0.5rem 0 0 0;">
            (a) You are presumed to take no position on the appeal, or the 
            application for leave to appeal (if leave is required).
        </p>
        <p style="text-indent:1rem; margin:0.5rem 0 0 0;">
            (b) The parties are not obliged to serve you with any further 
            documents related to the appeal, including an order granting 
            leave to appeal (if leave is required).
        </p>
        
        <p style="margin-top:0.75rem;">
            <b>You are presumed to take no position if you fail to</b> file and serve a 
            Notice of Appearance within the time described above. The filing 
            registries for the British Columbia Court of Appeal are as follows.
        </p>    

        <div class="row" style="margin:0.25rem 0 0 0; padding:0" >
            <div style="width:40%; padding:0;">
                <div style="display:block; margin: 0 0 0.75rem 0;">Central Registry:</div>
                <div style="display:block;">B.C. Court of Appeal</div>
                <div style="display:block;">Suite 400, 800 Hornby Street</div>
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

    public getFullName(party){

        if(party.isOrganization || !party.surname){
            return (party.organizationName?party.organizationName:'')
        } else{
            return  (party.firstGivenName? party.firstGivenName+' ':'')+
                    (party.secondGivenName? party.secondGivenName+' ':'')+
                    (party.thirdGivenName? party.thirdGivenName+' ':'')+
                    (party.surname? party.surname+' ':'')
        }        
    }
   
    public extractInfo(){

        console.log(this.result)
        console.log(this.caseLocation)
        
        const parties = this.result.parties
        this.applicantNames = [];
        this.respondentNames = [];
        
        for(const party of parties){
            if(party.appealRole=="Appellant")
                this.applicantNames.push(this.getFullName(party) + '(' + party.lowerCourtRole + ')');
            else if(party.appealRole=="Respondent")
                this.respondentNames.push(this.getFullName(party) + '(' + party.lowerCourtRole + ')');
        }

        // if (this.result.manualSop?.length > 1){
        //     this.caseSop = this.result.manualSop;
        // } else {

        //     this.caseSop = [];
        //     this.noRolePartySop = [];  
        //     for(const party of parties)
        //         this.prePopulateSop(party);          


        //     if (this.noRolePartySop.length > 0){
        //         this.caseSop = this.caseSop.concat(this.noRolePartySop);
        //     }           

        // }

    }
    
    // public prePopulateSop(partyInfo: form1PartiesInfoType){

    //     let sop = {} as manualSopInfoType;            
    //     sop.plural = false;
    //     sop.appealRole = partyInfo.appealRole;
    //     sop.lowerCourtRole = partyInfo.lowerCourtRole;
        
    //     sop.partyName=this.getFullName(partyInfo)
    //     if (partyInfo.lowerCourtRole == 'NONE (New Party)'){
    //         sop.conjunction = 'And';
    //         this.noRolePartySop.push(sop);
    //     } else if (partyInfo.lowerCourtRole.toLowerCase() == 'plaintiff' || 
    //         partyInfo.lowerCourtRole.toLowerCase() == 'applicant' || 
    //         partyInfo.lowerCourtRole.toLowerCase() == 'petitioner'){
    //             sop.conjunction = 'Between';
    //             this.caseSop.unshift(sop);
    //     } else {
    //         sop.conjunction = 'And';
    //         this.caseSop.push(sop);
    //     }
    // }
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>