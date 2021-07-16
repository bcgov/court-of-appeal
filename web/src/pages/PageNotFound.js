import React from 'react';
import { Redirect } from "react-router-dom";

/**
 * simple page not found component, redirects to props.homePath
 * @param props
 * @returns {JSX.Element}
 */
export const PageNotFound = (props) => {
    const homePath = props.homePath;
    console.log(`${location.pathname} was not found, redirecting to ${homePath}`);
    return <Redirect to={homePath} />
};
