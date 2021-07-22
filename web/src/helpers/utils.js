import {isDevelopmentEnviromment} from '../config/environment';

/**
 * simple console logger that selectively logs messages when NODE_ENV===development
 * @param message
 */
export function console_debug_log(message) {
    if (isDevelopmentEnviromment()) {
        if(message != null && typeof(message) === 'object') {
            message = JSON.stringify(message);
        }
        console.log(message);
    }
}
