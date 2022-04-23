
def convert_full_address(address_line1, address_line2, address_line3):
    full_address = ""
    if address_line1 is not None and address_line1.lower()!="unknown":
        full_address = full_address + address_line1 + ", "
    if address_line2 is not None and address_line2.lower()!="unknown":
        full_address = full_address + address_line2 + ", "
    if address_line3 is not None and address_line3.lower()!="unknown":
        full_address = full_address + address_line3 + ", "
    if len(full_address)>2:                
        full_address = full_address[:-2]
        
    return full_address


def convert_full_name(first, middle, last):
    full_name = " "
    if first is not None and first.lower()!="unknown":
        full_name = full_name + first.capitalize() + " "
    if middle is not None and middle.lower()!="unknown":
        full_name = full_name + middle.capitalize() + " "
    if last is not None and last.lower()!="unknown":
        full_name = full_name + last.capitalize() + " "
    
    full_name = full_name.strip()
        
    return full_name