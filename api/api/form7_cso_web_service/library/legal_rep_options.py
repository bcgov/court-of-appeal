from .legal_rep_option import LegalRepOption

class LegalRepOptions:

    def IndividualLegalReps(self):
        individual_legal_reps = list()
        options = self.Options()
        for option in options:
            if not option["Hidden"] and option["AllowIndividual"]:
                individual_legal_reps.append(option["DropDownLabel"])
        
        return individual_legal_reps


    def OrganizationLegalReps(self):
        organization_legal_reps = list()
        options = self.Options()
        for option in options:
            if not option["Hidden"] and option["AllowOrganization"]:
                organization_legal_reps.append(option["DropDownLabel"])
        
        return organization_legal_reps

    
    def LegalRepFormatters(self):
        options = self.Options()
        legal_rep_formatters = {option["DropDownLabel"] : option["Formatter"] for option in options}
        return legal_rep_formatters


    def Options(self):
        return [
            LegalRepOption(                    
                CommonName = "Administrator",
                DropDownLabel = "administrator (estate)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, administrator for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Administrator",
                DropDownLabel = "administrator",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, administrator for {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Administratrix",
                DropDownLabel = "administratrix (estate)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, administratrix for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Administratrix",
                DropDownLabel = "administratrix",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, administratrix for {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Caveator",
                DropDownLabel = "caveator",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, caveator for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Committee",
                DropDownLabel = "committee (estate)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, committee for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Committee",
                DropDownLabel = "committee",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, committee for {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Executor",
                DropDownLabel = "executor",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, executor for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Executrix",
                DropDownLabel = "executrix",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{0}, executrix for the Estate of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Intervener",
                DropDownLabel = "intervener",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, intervener on behalf of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Litigation Guardian",
                DropDownLabel = "litigation guardian",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{1} by way of their litigation guardian, {0}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Litigation Guardian",
                DropDownLabel = "litigation guardian (child)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{1}, a child, by way of their litigation guardian, {0}",
                PluralFormatter = "{1}, minor children, by way of their litigation guardian, {0}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Litigation Guardian",
                DropDownLabel = "litigation guardian (infant)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{1}, an infant, by way of their litigation guardian, {0}",
                PluralFormatter = "{1}, infants, by way of their litigation guardian, {0}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Litigation Guardian",
                DropDownLabel = "litigation guardian (disability)",
                AllowOrganization = False,
                AllowIndividual = True,
                Formatter = "{1}, a person under disability, by way of their litigation guardian, {0}",
                PluralFormatter = "{1}, persons under disability, by way of their litigation guardian, {0}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Receiver Manager",
                DropDownLabel = "receiver manager",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, receiver manager on behalf of {1}",
                Hidden = False
            ).get(),
            LegalRepOption(
                CommonName = "Trustee",
                DropDownLabel = "trustee",
                AllowOrganization = True,
                AllowIndividual = True,
                Formatter = "{0}, trustee on behalf of {1}",
                Hidden = False
            ).get(),
        ]

    
   