from django.db import connection
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from django.db.models.functions import Length
from django.utils import timezone as django_timezone
import collections

from form22.models.order_nofees_payable import OrderNofeesPayable
from form20.models.objection_withdraw import ObjectionWithdraw
from form19.models.withdraw_lawyer import WithdrawLawyer
from form18.models.change_address import ChangeOfAddress
from form17.models.certificate_of_costs import CertificateOfCosts
from form16.models.offer_to_settle_costs import OfferToSettleCosts
from form15.models.consent_order_general import ConsentOrderGeneral
from form14.models.consent_remove_inactive_appeal import ConsentRemoveInactiveAppeal
from form13.models.consent_extend_filing_time import ConsentExtendFilingTime
from form12.models.order_to_vary_order_of_justice import OrderToVaryOrderOfJustice
from form11.models.order_of_three_justices import OrderOfThreeJustices
from form10.models.order_of_single_justice import OrderOfSingleJustice
from form9.models.requisition import Requisition
from form8.models.notice_of_application_to_vary_order import NoticeOfApplicationToVaryOrder
from form7.models.notice_of_urgent_application import NoticeOfUrgentApplication
from form6.models.notice_of_settlement import NoticeOfSettlement
from form5.models.notice_of_hearing import NoticeOfHearing
from form4.models.notice_of_application import NoticeOfApplication
from form3.models.notice_of_cross_appeal import NoticeOfCrossAppeal
from api.models.case import Case
from form1.models.notice_of_appeal import NoticeOfAppeal

from api.models import User
from manual_submissions.models import ManualSubmission
from manual_submissions.manual_submissions_service.form_service import create_response



def statistics_info(start_date, end_date, tz):
    # print("___________")
    # print("___START___")
    # print("___________")
    
    start = datetime.fromisoformat(start_date)
    start_date = datetime(start.year, start.month, start.day, 0,0,0,0,timezone(timedelta(hours=tz/60)))
    
    end = datetime.fromisoformat(end_date)
    end_date = datetime(end.year, end.month, end.day, 23,59,0,0,timezone(timedelta(hours=tz/60)))

    report = {"start_date":start_date, "end_date":end_date}
    
    report["users_info"] = get_users_info(start_date, end_date)

    report["logged_in_users"] = get_logged_in_users()

    report["manual_submission_info"] = get_manual_submission_info(start_date, end_date)

    tables = connection.introspection.table_names()
    all_models = connection.introspection.installed_models(tables)

    for model in all_models:
        if (not "formpdf" in str(model._meta)  and "form" in str(model._meta)):
            model_name = str(model._meta).split('.')[0]
            # print("___________")
            # print(model_name)
            report[model_name] = model_stats(model, start_date, end_date)
        
        if "api.case" in str(model._meta):
            model_name = "form2"
            # print("___________")
            # print(model_name)
            report[model_name] = model_stats(model, start_date, end_date)

    return report


def model_stats(model, start_date, end_date):
    
    stats={}

    model = model.objects.filter()
    model_with_date = model.filter(
        modified__gte=start_date,
        modified__lte=end_date
    )

    stats["submitted"] = submitted_applications(model_with_date)
    stats["unsuccessful"] = unsuccessful_submissions(model, start_date, end_date)
    stats["completed"] = completed_applications(model_with_date)
    stats["drafted"] = drafted_applications(model_with_date)
    stats["started"] = started_applications(model, start_date, end_date)
    stats["total"] = total_applications(model_with_date)
    stats["users"] = users(model_with_date)
    stats["top_user"] = top_user(model_with_date, model, start_date, end_date)
    return stats


def submitted_applications(model_with_date, user_id=None):
    model_data = model_with_date.filter(
            status="Submitted"           
        ).exclude(
            package_number=None,
            package_url=None
        )
        
    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)       
    # for item in model_data:
    #     print(len(item.pdf_types))
    return model_data.count()


def unsuccessful_submissions(model, start_date, end_date, user_id=None):
    model_data = model.filter(
            status="Draft",
            last_filed__gte=start_date,
            last_filed__lte=end_date
        ).exclude(
            submission_id=None
        )
        
    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)       

    return model_data.count()


def completed_applications(model_with_date, user_id=None):
    model_data = model_with_date.annotate(pdf_types_len=Length('pdf_types')
        ).filter(
            status="Draft",            
            pdf_types_len__gt=0
        )

    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)

    return model_data.count()


def drafted_applications(model_with_date, user_id=None):
    model_data = model_with_date.annotate(pdf_types_len=Length('pdf_types')
        ).filter(
            status="Draft",           
            pdf_types_len=0
        )
        
    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)

    return model_data.count()


def started_applications(model, start_date, end_date, user_id=None):
    model_data = model.annotate(pdf_types_len=Length('pdf_types')
        ).filter(
            status="Draft",
            created_date__gte=start_date,
            created_date__lte=end_date,
            pdf_types_len=0
        )
        
    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)

    return model_data.count()


def total_applications(model_data, user_id=None):    
        
    if user_id is not None:        
        model_data = model_data.filter(user_id=user_id)      
    
    return model_data.count()


def users(model_with_date):
    model_data = model_with_date.values_list('user_id',flat=True).distinct()

    return model_data.count()


def top_user(model_with_date, model, start_date, end_date, manual_submission=False):
    if model_with_date.count()==0:
        return None
    
    top_user_info = {}
    model_data = model_with_date.values_list('user_id', flat=True)          

    user_ids = [{"id":item, "repeat":count} for item, count in collections.Counter(model_data).items()]    
    sorted_users = sorted(user_ids, key=lambda x: x["repeat"], reverse=True)   
    top_user_id = sorted_users[0]["id"]
    
    if manual_submission==False:
        top_user_info["submitted"] = submitted_applications(model_with_date, top_user_id)
        top_user_info["unsuccessful"] = unsuccessful_submissions(model, start_date, end_date, top_user_id)
        top_user_info["completed"] = completed_applications(model_with_date, top_user_id)
        top_user_info["drafted"] = drafted_applications(model_with_date, top_user_id)
        top_user_info["started"] = started_applications(model, start_date, end_date, top_user_id)
    else:
        top_user_info["forms"] =  manual_submission_forms_info(model_with_date, top_user_id) 

    top_user_info["total"] = total_applications(model_with_date, top_user_id)
    
    top_user_query = User.objects.get(id=top_user_id)

    top_user_info["first_name"]=top_user_query.first_name
    top_user_info["last_name"]=top_user_query.last_name
    top_user_info["display_name"]=top_user_query.display_name
    # top_user_info["email"]=top_user_query.email

    
    return top_user_info


def get_users_info(start_date, end_date):
    users_info = {}
    model_data = User.objects.filter()

    users_info["total"] = model_data.count()
    users_info["active_in_period"] = model_data.filter(
            last_login__gte=start_date,
            last_login__lte=end_date            
        ).count()
    users_info["joined_in_period"] = model_data.filter(
            date_joined__gte=start_date,
            date_joined__lte=end_date            
        ).count()

    return users_info


def get_manual_submission_info(start_date, end_date):
    
    manual_submission_info = {}
    
    model_with_date = ManualSubmission.objects.filter(
        modified__gte=start_date,
        modified__lte=end_date,
        status="Submitted"
    )
    
    manual_submission_info["total"]=model_with_date.count()
    manual_submission_info["users"] = users(model_with_date)
    manual_submission_info["top_user"] = top_user(model_with_date, None, None, None, manual_submission=True)
    manual_submission_info["forms"] = manual_submission_forms_info(model_with_date)
    

    return manual_submission_info


def manual_submission_forms_info(model_with_date, user_id=None):
    forms = list()

    if user_id is not None:        
        model_with_date = model_with_date.filter(user_id=user_id)

    for model in model_with_date:
        manual_data = create_response(model)
        doc_types = manual_data["data"]["doc_type"]
        for doc_type in doc_types:
            # print(doc_type)
            if "type" in doc_type:
                forms.append(doc_type["type"])
    
    # print(forms)
    forms_info = [{"form_type":name, "submitted_count":count} for name, count in collections.Counter(forms).items()]
    # print(forms_info)
    return forms_info


def get_logged_in_users():
    users_info = list()
   
    max_login_date =  django_timezone.now()+ django_timezone.timedelta(hours=-8)
    print(max_login_date)

    recent_hours =  django_timezone.now()+ django_timezone.timedelta(hours=-1)
    print(recent_hours)
   
    users = User.objects.filter(
            last_login__gte=max_login_date
        ).all()
    
    for user in users:            
        usr = {}
    #____
        usr["Form1"] = NoticeOfAppeal.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()        
    #____
        usr["Form2"] = Case.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form3"] = NoticeOfCrossAppeal.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form4"] = NoticeOfApplication.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form5"] = NoticeOfHearing.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form6"] = NoticeOfSettlement.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form7"] = NoticeOfUrgentApplication.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form8"] = NoticeOfApplicationToVaryOrder.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form9"] = Requisition.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form10"] = OrderOfSingleJustice.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form11"] = OrderOfThreeJustices.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form12"] = OrderToVaryOrderOfJustice.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form13"] = ConsentExtendFilingTime.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form14"] = ConsentRemoveInactiveAppeal.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form15"] = ConsentOrderGeneral.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form16"] = OfferToSettleCosts.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form17"] = CertificateOfCosts.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form18"] = ChangeOfAddress.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form19"] = WithdrawLawyer.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form20"] = ObjectionWithdraw.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()
    #____
        usr["Form22"] = OrderNofeesPayable.objects.filter(
            user_id=user.id,
            modified__gte=recent_hours
        ).count()

        users_info.append(usr)

    return users_info