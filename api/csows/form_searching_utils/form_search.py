import logging

from .form_search_caller_base import FormSearchCallerBase

logger = logging.getLogger(__name__)

class FormSearch:    

    def __init__(self):
        FormSearchCallerBase.__init__(self)
    

    def _has_publication_ban(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag
            and any(
                x.Name == "Publication Ban"
                for x in case_basics.SecurityFlags.SecurityFlag
            )
        )

    def _has_restricted_files(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag
            and any(
                x.Name == "Family & Restricted Files"
                for x in case_basics.SecurityFlags.SecurityFlag
            )
        )


    def _has_family_law(self, case_basics):
        return case_basics.HighLevelCategory == "Family Law"


    def execute_search(self, case_number, add_chambers_hearing = False) -> {}:       
        search_by_case_number = self.client.service.SearchByCaseNumber(case_number)

        if search_by_case_number is None or search_by_case_number["CaseId"] == -1:
            return self.handle_not_found(case_number)
        elif search_by_case_number["CaseType"] == "Civil":
            return self.handle_civil_search(search_by_case_number["CaseId"], add_chambers_hearing)
        elif search_by_case_number["CaseType"] == "Criminal":
            return {"SearchByCaseNumberResult": search_by_case_number}


    def handle_not_found(self, case_number):
        logger.info("Case not found: " + case_number)
        return "NOT FOUND"


    def handle_civil_search(self, case_id, add_chambers_hearing) -> {}:
        case_basics = self.client.service.ViewCaseBasics(case_id)
        

        if self._has_publication_ban(case_basics):
            logger.info("Publication ban found.")
            return {"ViewCaseBasicsResult": case_basics, "ChambersHearing": None}
        elif self._has_restricted_files(case_basics):
            logger.info("Restricted files found.")
            return {"ViewCaseBasicsResult": case_basics, "ChambersHearing": None}
        elif self._has_family_law(case_basics):
            logger.info("Family Law found.")
            return {"ViewCaseBasicsResult": case_basics, "ChambersHearing": None}

        case_party = self.client.service.ViewCaseParty(case_id)
        chambers_hearing = self.handle_civil_hearing_chamber(case_id, add_chambers_hearing)        
        return {"ViewCasePartyResult": case_party, "ViewCaseBasicsResult": case_basics, "ChambersHearing": chambers_hearing}


    def handle_civil_hearing_chamber(self, case_id, add_chambers_hearing) -> {}:
        if not add_chambers_hearing: return None

        hearing = self.client.service.ViewCaseChambersHearing(case_id)
        if 'Hearings' in hearing and hearing['Hearings'] is not None and 'ChambersHearing' in hearing['Hearings']:            
            return hearing['Hearings']['ChambersHearing']
        else:
            return None