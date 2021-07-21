import React from 'react';
import {PUBLIC_URL} from "../config/environment";
const USER_KEY = 'user';

/**
 * retrieves user login state
 * @return object
 * @example return {loggedIn: boolean, displayName: string}
 */
export function getUser() {
    const userJsonString = localStorage.getItem(USER_KEY);
    if (userJsonString == null) {
        return {loggedIn: false, displayName: ''};
    } else {
        return JSON.parse(userJsonString);
    }
};

/**
 * sets state based on the users current login status
 */
export function setUser(loggedIn, displayName) {
    localStorage.setItem(USER_KEY, JSON.stringify({loggedIn: loggedIn, displayName: displayName}));
};

/**
 * removes user from state
 */
export function clearUser() {
    localStorage.removeItem(USER_KEY);
};

/**
 * sets state based on the users current login status
 */
export function isUserLoggedIn(service) {
    service.isUserLoggedIn((res) => {
        setUser(res.loggedIn, res.displayName);
        if (window.location.href == `${window.location.origin}${PUBLIC_URL}`) {
            return;
        }
    });
};
