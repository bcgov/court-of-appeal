import re

class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)

class Form7CaseBasicsParsing:

    def getName(self, name):       
        if name:
            return name
        else:
            return ""


    def getFullName(self, person):        
        return self.getName(person.FirstName) + ' ' + self.getName(person.LastName)

   
    def cleanName(self, name):
        if name:
            return re.sub("/\s*\(.*?\)\s*/g", "",name).replace(",", "").strip().lower()
        else:
            return " "
      

    def getPriviousCourt(self, data):
        if data.ViewCaseBasicsResult and data.ViewCaseBasicsResult.PreviousCourts and data.ViewCaseBasicsResult.PreviousCourts.PreviousCourt:
            return  data.ViewCaseBasicsResult.PreviousCourts.PreviousCourt
        else:
            return None


    def getInitiatingDocuments(self, data):
        if data.ViewCaseBasicsResult and data.ViewCaseBasicsResult.InitiatingDocuments and data.ViewCaseBasicsResult.InitiatingDocuments.InitiatingDocument:
            return  data.ViewCaseBasicsResult.InitiatingDocuments
        else:
            return None


    def parse(self, result, response):
        
        data = Struct(**result) 
        

        
        if response is not None:

            response['previousCourts'] = self.getPriviousCourt(data)   
            response['initiatingDocuments'] = self.getInitiatingDocuments(data)

            return response
        else:
            return None
