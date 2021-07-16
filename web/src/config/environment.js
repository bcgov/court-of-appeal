export const DEVELOPMENT_ENV = 'development';
export const TEST_ENV = 'test';
export const PRODUCTION_ENV = 'production';
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const REACT_APP_COMMIT = process.env.REACT_APP_COMMIT;
export const REACT_APP_MAX_FILE_DOWNLOAD = process.env.REACT_APP_MAX_FILE_DOWNLOAD;
export const NODE_ENV = process.env.NODE_ENV;

export const getEnvironmentName = () => {
    if (NODE_ENV === DEVELOPMENT_ENV || NODE_ENV == null) {
        return DEVELOPMENT_ENV;
    } else if (NODE_ENV === TEST_ENV)  {
        return TEST_ENV;
    } else if (NODE_ENV === PRODUCTION_ENV) {
        return PRODUCTION_ENV;
    } else {
        return DEVELOPMENT_ENV;
    }
}

export const BCEID_REGISTER_URL = process.env.BCEID_REGISTER_URL || (getEnvironmentName() === TEST_ENV || getEnvironmentName() === DEVELOPMENT_ENV ? 'https://www.test.bceid.ca/register/basic/account_details.aspx?type=regular&eServiceType=basic' : null);
export const BCEID_LOGIN_URL = process.env.BCEID_LOGIN_URL || (getEnvironmentName() === TEST_ENV || getEnvironmentName() === DEVELOPMENT_ENV ? 'https://logon7.gov.bc.ca/clp-cgi/capBceid/logon.cgi?flags=1111:1,7&TYPE=33554433&' +
    'REALMOID=06-32b0b444-93c9-4b00-ae7f-ff5419b54ad1&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=$SM$ZJfEgGO4ve5GoXRRH0AXxEl%2fJnlvTpF%2fy4K1ETG%2bIC1xF1RmEMM8pcIcHLyhiVSN&TARGET=$SM$HTTPS%3a%2f%2fwww%2etest%2ebceid%2eca%2flogon%2easpx' : null);

/*
TODO:// these go above into BCEID_
https://www.bceid.ca/os/?7611
https://www.test.bceid.ca/os/?8601
https://www.development.bceid.ca/os/?2201
 */
