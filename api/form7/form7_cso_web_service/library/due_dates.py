from .holidays import Holidays
import datetime

class DueDates:
    
    def GetDateDue(self, judgementDate, courtClassCode):

        if (judgementDate is None or courtClassCode is None):            
            return None
            

        # Bankruptcy cases have 10 days to appeal.  All other cases have 30 days
        maxDays = 30
        if courtClassCode.upper() == "B": 
            maxDays = 10
        
        dateDue = judgementDate + datetime.timedelta(days=maxDays) 
        year = dateDue.year
        statutoryHolidays = Holidays().BcStats(year)

        # EC May 1, 2018 - clients get an extra business day to file the appeal when the due date falls on weekends or stat holidays
        # Count forwards from the calculated date until we find a day when the registry is open
        while (dateDue.weekday() == 5 #DayOfWeek.Saturday
                or dateDue.weekday() == 6 #DayOfWeek.Sunday
                or any([value for key,value in statutoryHolidays.items() if value==dateDue.strftime("%Y-%m-%d")])
        ):
        
            dateDue = dateDue + datetime.timedelta(days=1)

            # if we've counted forward into january of the next year, refresh the statutory holidays
            if dateDue.year > year:            
                year = dateDue.year;
                statutoryHolidays = Holidays().BcStats(year)
            
        return dateDue + datetime.timedelta(hours=16)
       