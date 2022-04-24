
class AppealFromOptions:

        TrialJudgment = "Trial Judgment";
        TrialJudgmentHelp = "A final order made after a full hearing where witnesses were called and oral evidence given.";
        
        SummaryTrialJudgment = "Summary Trial Judgment";
        SummaryTrialJudgmentHelp = "A trial conducted in a summary manner by way of affidavit or transcript rather than oral testimony.  See Supreme Court Civil Rule 9-7.";
        
        OrderOfAStatutoryBody = "Order of a Statutory Body";
        OrderOfAStatutoryBodyHelp = "";

        OrderOfTribunal = "Order of a Tribunal";
        OrderOfTribunalHelp = "";
        
        ChambersJudgment = "Chambers Judgment";
        ChambersJudgmentHelp = "An application made to a Supreme Court Judge or Master where evidence is presented in the form of affidavits.  See Supreme Court Civil Rule 8-1.";


        def Options(self):                  
            return [
                self.TrialJudgment,
                self.SummaryTrialJudgment,
                self.ChambersJudgment,
                self.OrderOfTribunal

                #  self.OrderOfAStatutoryBody, /* Temporarily disabled.  Beta is supreme court only */                                
            ]


        def OptionsHelp(self):       
            return [
                self.TrialJudgmentHelp,
                self.SummaryTrialJudgmentHelp,
                self.ChambersJudgmentHelp,
                self.OrderOfTribunalHelp
            ]

          
        def OptionsDictionary(self):
            options = self.Options()
            options_help = self.OptionsHelp()
            options_dict = list()
            
            for inx in range(len(options)):                
                options_dict.append({
                    "name":options[inx],
                    "help":options_help[inx]
                })

            return options_dict


