export function getBceidRegisterUrl()
{
    const host = window.location.host;
    const DEV = ['0.0.0.0', 'localhost', 'dev.'];
    const TEST = ['test.'];

    if (DEV.some(s=>host.indexOf(s) > -1)) {
        return 'https://www.development.bceid.ca/os/?2201';
    } else if (TEST.some(s=>host.indexOf(s) > -1)) {
        return 'https://www.test.bceid.ca/os/?8601';
    } else {
        return 'https://www.bceid.ca/os/?7611';
    }
}