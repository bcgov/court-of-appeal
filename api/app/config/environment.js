const DEVELOPMENT_ENV = 'development';
const TEST_ENV = 'test';
const PRODUCTION_ENV = 'production';
const NODE_ENV = process.env.NODE_ENV;
const SM_LOGOUT_URL_PREFIX = process.env.SM_LOGOUT_URL_PREFIX;

// TODO:// we should really throw all process.env usages into this one place, for now using it to determine NODE_ENV,
//  and SM_LOGOUT_URL_PREFIX

const getEnvironmentName = () => {
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

module.exports = {
    DEVELOPMENT_ENV, TEST_ENV, PRODUCTION_ENV, NODE_ENV, SM_LOGOUT_URL_PREFIX, getEnvironmentName
}
