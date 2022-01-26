
from .library.involes_options import InvolvesOptions
from .library.appeal_from_options import AppealFromOptions
from .library.legal_rep_options import LegalRepOptions
from .library.static_lookup import StaticLookup
from .library.holidays import Holidays
import datetime


def get_form7_static_list():
    
    result = {}

    result['involvesFamilyList']=InvolvesOptions().FamilyOptions() 
    result['involvesOtherList']=InvolvesOptions().OtherOptionsDictionary()

    result['appealFromOptionsList']=AppealFromOptions().OptionsDictionary()

    result['individualLegalReps']=LegalRepOptions().IndividualLegalReps()
    result['organizationLegalReps']=LegalRepOptions().OrganizationLegalReps()
    result['legalRepFormatters']=LegalRepOptions().LegalRepFormatters()


    #todo: Lists stored in StaticLookup are candidates for later refactoring so we get the data from a web service
    result['lowerCourtRoles'] = StaticLookup().LowerCourtRolesKeys()
    result['aliasTypes'] = StaticLookup().AliasTypes()

    result['holidays'] = Holidays().BcStats(datetime.date.today().year)

    return result


def get_form7_holidays_list(year):
    
    result = {}
    result['holidays'] = Holidays().BcStats(datetime.datetime(int(year), 1, 1).year)
    
    return result