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

export const isDevelopmentEnviromment = () => {
    return getEnvironmentName() === DEVELOPMENT_ENV;
}

export const BCEID_REGISTER_URL = process.env.BCEID_REGISTER_URL || (getEnvironmentName() === TEST_ENV || isDevelopmentEnviromment() ? 'https://www.test.bceid.ca/register/basic/account_details.aspx?type=regular&eServiceType=basic' : null);

/*
TODO:// these go above into BCEID_
https://www.bceid.ca/os/?7611
https://www.test.bceid.ca/os/?8601
https://www.development.bceid.ca/os/?2201
 */
