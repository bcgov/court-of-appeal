export function getBceidRegisterUrl()
{
    const host = window.location.host;
    const DEV = ['0.0.0.0', 'localhost', 'dev.'];
    const TEST = ['test.'];

    if (DEV.filter(s=>s.indexOf(host) > -1)) {
        return 'https://www.development.bceid.ca/os/?2201';
    } else if (TEST.filter(s=>s.indexOf(host) > -1)) {
        return 'https://www.test.bceid.ca/os/?8601';
    } else {
        return 'https://www.bceid.ca/os/?7611';
    }
}