export function getForm7Url()
{
    const host = window.location.host;
    const DEV = ['0.0.0.0', 'localhost', 'dev.'];
    const TEST = ['test.'];

    if (DEV.some(s=>host.indexOf(s) > -1)) {
        return 'https://dev.justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=f90vwa'; //DEV
    } else if (TEST.some(s=>host.indexOf(s) > -1)) {
        return 'https://test.justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=5tdvk9'; //TEST
    } else {
        return 'https://justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=4ua752'; //PROD
    }
}