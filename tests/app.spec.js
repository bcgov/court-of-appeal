require('./support/fake.dom');
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const rrd = require('react-router-dom');
rrd.BrowserRouter = ({children}) => <div>{children}</div>

import App from '../src/App';
import Dashboard from '../src/Dashboard.js';

describe('App', ()=>{
    
    test('loads Dashboard', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App />
            </MemoryRouter>
        );    
        
        expect(app.find(Dashboard)).toHaveLength(1);
    });    
});