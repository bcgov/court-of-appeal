require('./support/enzyme.setup');
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
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