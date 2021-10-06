export const PUBLIC_URL = process.env.PUBLIC_URL;
export const REACT_APP_COMMIT = process.env.REACT_APP_COMMIT;
export const REACT_APP_MAX_FILE_DOWNLOAD = process.env.REACT_APP_MAX_FILE_DOWNLOAD;

export const getBceidRegisterUrl = () => {
    const host = window.location.host;
    const DEV = ['0.0.0.0', 'localhost', 'dev.'];
    const TEST = ['test.'];

    if (DEV.indexOf(host) > -1) {
        return 'https://www.development.bceid.ca/os/?2201';
    } else if (TEST.indexOf(host) > -1) {
        return 'https://www.test.bceid.ca/os/?8601';
    } else {
        return 'https://www.bceid.ca/os/?7611';
    }
}
