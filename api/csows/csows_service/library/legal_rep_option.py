class LegalRepOption:

    def __init__(
        self, 
        CommonName: str,
        DropDownLabel: str,
        AllowOrganization: bool,
        AllowIndividual: bool,
        Formatter: str,
        Hidden: bool,
        PluralFormatter: str= None
        ):        
        self.CommonName=CommonName
        self.DropDownLabel=DropDownLabel
        self.AllowOrganization=AllowOrganization
        self.AllowIndividual=AllowIndividual
        self.Formatter=Formatter
        self.Hidden=Hidden
        self.PluralFormatter=PluralFormatter

    def get(self):
        
        _pluralFormatter=self.Formatter
        if self.PluralFormatter is not None:
            _pluralFormatter=self.PluralFormatter

        return{
            "CommonName":self.CommonName,
            "DropDownLabel":self.DropDownLabel,
            "AllowOrganization":self.AllowOrganization,
            "AllowIndividual":self.AllowIndividual,
            "Formatter":self.Formatter,
            "Hidden":self.Hidden,
            "PluralFormatter":_pluralFormatter
        }