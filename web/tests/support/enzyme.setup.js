require('./fake.dom');

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

const rrd = require('react-router-dom');
rrd.BrowserRouter = ({children}) => <div>{children}</div>