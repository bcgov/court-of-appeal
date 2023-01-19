
class InvolvesOptions:

        CivilProcedure = "Civil Procedure"
        CivilProcedureHelp = "Appeal from a decision that applies the Supreme Court rules or processes to a private dispute about people, relationships or property."
        # CivilProcedureHelp = "Civil Procedure – appeal from a decision that applies the Supreme Court rules or processes to a private dispute about people, relationships or property."
        
        Commercial = "Commercial"
        CommercialHelp = "Appeal from a decision regarding business and commercial transactions."
        
        ConstitutionalAdministrative = "Constitutional / Administrative"
        ConstitutionalAdministrativeHelp = "Appeal from decisions involving the relationship between the government and its citizens, including the Charter of Rights and Freedoms and tribunal decisions."
        
        CorollaryReliefInADivorceProceeding = "Corollary Relief in a Divorce Proceeding"
        CorollaryReliefInADivorceProceedingHelp = ""
        
        Divorce = "Divorce Act"
        DivorceHelp = "Appeals from decisions made under the Divorce Act relating to divorce, division of property, parenting arrangements, parenting responsibilities, maintenance."
        
        Equity = "Equity"
        EquityHelp = "Appeal from decisions based on the application of fairness and other principles of equity."
        
        FamilyLawAct = "Family Law Act"
        FamilyLawActHelp = "Appeals from decisions made under the Family Law Act relating to parenting arrangements, maintenance."
        
        MotorVehicleAccidents = "Motor Vehicle Accidents"
        MotorVehicleAccidentsHelp = "Appeal from a decision of someone being found at fault or for damages as a result of a motor vehicle accident."
        
        MunicipalLaw = "Municipal Law"
        MunicipalLawHelp = "Appeal from a decision of legal issues relating to municipal (towns or city) governments."
        
        Other = "Other"
        OtherHelp = "Appeals from decisions not listed in any other category."
        
        OtherFamily = "Other Family"
        OtherFamilyHelp = ""
        
        RealProperty = "Real Property"
        RealPropertyHelp = "Appeal from a decision relating to the use and rights of ownership of land or whatever grows on it or is built on it."
        
        Torts = "Torts"
        TortsHelp = "Appeal from a decision that provides compensation for people who have been injured or whose property has been damaged by the actions or inactions of others."
        
        WillsAndEstate = "Wills and Estate"
        WillsAndEstateHelp = "Appeal from a decision relating to the drafting or execution of wills or distribution of real property of a deceased person."


        def FamilyOptions(self):                  
            return [
                self.Divorce,
                self.FamilyLawAct,
                self.OtherFamily,
                self.CorollaryReliefInADivorceProceeding
            ]


        def OtherOptions(self):       
            return [
                self.ConstitutionalAdministrative,
                self.CivilProcedure,
                self.Commercial,
                self.MotorVehicleAccidents,
                self.MunicipalLaw,
                self.RealProperty,
                self.Torts,
                self.Equity,
                self.WillsAndEstate,
                #self.Other
                self.FamilyLawAct,
                self.Divorce,
                self.Other
            ]

          
        def OtherOptionsHelp(self):
            return [
                self.ConstitutionalAdministrativeHelp,
                self.CivilProcedureHelp,
                self.CommercialHelp,
                self.MotorVehicleAccidentsHelp,
                self.MunicipalLawHelp,
                self.RealPropertyHelp,
                self.TortsHelp,
                self.EquityHelp,
                self.WillsAndEstateHelp,
                # self.OtherHelp
                self.FamilyLawActHelp,
                self.DivorceHelp,
                self.OtherHelp
            ]

        def OtherOptionsDictionary(self):
            other_options = self.OtherOptions()
            other_options_help = self.OtherOptionsHelp()
            other_options_dict = list()
            
            for inx in range(len(other_options)):                
                other_options_dict.append({
                    "name":other_options[inx],
                    "help":other_options_help[inx]
                })

            return other_options_dict


