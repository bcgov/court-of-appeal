
class StaticLookup:

        NoLowerCourtRole = "NONE (New Party)";
        AppellantRole = "Appellant";
        ApplicantRole = "Applicant";
        BankruptRole = "Bankrupt";
        CaveatorRole = "Caveator";
        CitatorRole = "Citator";
        Claimant1Role = "Claimant 1";
        Claimant2Role = "Claimant 2";
        ClaimantRole = "Claimant";
        ClientRole = "Client";
        CreditorRole = "Creditor";
        DebtorRole = "Debtor";
        DeceasedRole = "Deceased";
        DefendantRole = "Defendant";
        DefendantByCounterclaimRole = "Defendant by Counterclaim";
        DisputantRole = "Disputant";
        IntervenerRole = "Intervener";
        PetitionerRole = "Petitioner";
        PlaintiffRole = "Plaintiff";
        RespondentRole = "Respondent";
        RespondentByCounterclaimRole = "Respondent by Counterclaim";
        SolicitorRole = "Solicitor";
        ThirdPartyRole = "Third Party";
        TrusteeRole = "Trustee";


        def PrimaryLowerCourtRoles(self):                  
            return [
                self.ApplicantRole.lower(),
                self.DefendantRole.lower(),
                self.PetitionerRole.lower(),
                self.PlaintiffRole.lower(),
                self.RespondentRole.lower()                           
            ]

        def LowerCourtRoles(self):        
            return [                
                {self.NoLowerCourtRole: self.NoLowerCourtRole},
                {self.AppellantRole: "Appellants"},
                {self.ApplicantRole: "Applicants"},
                {self.BankruptRole: "Bankrupt Parties"},
                {self.CitatorRole: "Citators"},
                {self.ClaimantRole: "Claimants"},
                {self.Claimant1Role: "Claimant 1s"},
                {self.Claimant2Role: "Claimant 2s"},
                {self.ClientRole: "Clients"},
                {self.CreditorRole: "Creditors"},
                {self.DebtorRole: "Debtors"},
                {self.DeceasedRole: "Deceased People"},
                {self.DefendantRole: "Defendants"},
                {self.DefendantByCounterclaimRole: "Defendants by Counterclaim"},
                {self.IntervenerRole: "Interveners"},
                {self.PetitionerRole: "Petitioners"},
                {self.PlaintiffRole: "Plaintiffs"},
                {self.RespondentRole: "Respondents"},
                {self.RespondentByCounterclaimRole: "Respondents by Counterclaim"},
                {self.SolicitorRole: "Solicitors"},
                {self.ThirdPartyRole: "Third Parties"},
                {self.TrusteeRole: "Trustees"}
            ]

        def LowerCourtRolesKeys(self):

            lower_court_roles_key = list()
            lower_court_roles = self.LowerCourtRoles()

            for lower_court_role in lower_court_roles:
                lower_court_roles_key.append(*lower_court_role)

            return lower_court_roles_key


        def LowerCourtRoleCode(self):        
            return [
                {self.NoLowerCourtRole, ""},
                {self.AppellantRole, "APL"},
                {self.ApplicantRole, "APP"},
                {self.BankruptRole, "BKP"},
                {self.CitatorRole, "CIT"},
                {self.ClaimantRole, "CLA"},
                {self.Claimant1Role, "CLA1"},
                {self.Claimant2Role, "CLA2"},
                {self.ClientRole, "CLI"},
                {self.CreditorRole, "CRD"},
                {self.DebtorRole, "DBT"},
                {self.DeceasedRole, "DEC"},
                {self.DefendantRole, "DEF"},
                {self.DefendantByCounterclaimRole, "DEO"},
                {self.IntervenerRole, "ITV"},
                {self.PetitionerRole, "PET"},
                {self.PlaintiffRole, "PLA"},
                {self.RespondentRole, "RES"},
                {self.RespondentByCounterclaimRole, "REO"},
                {self.SolicitorRole, "SOL"},
                {self.ThirdPartyRole, "THR"},
                {self.TrusteeRole, "TRU"}
            ]


        def AliasTypes(self):
            return [ 
                "also known as",
                "a subsidiary of",
                "and the said",
                "carrying on business as",
                "division of",
                "doing business as",
                "formerly known as",
                "now known as",
                "operating as",
                "otherwise known as",
                "previous",
                "previously known as",
                "trading as",
                "with assumed name of"
            ]
            

        # def PluralizeRole(self, lowerCourtRole):
        #     lower_court_roles = self.LowerCourtRoles()
        #     for lower_court_role in lower_court_roles:
        #         if *lower_court_role == lowerCourtRole:
        #             return lower_court_role[lowerCourtRole]
        #     return None
        






