require('./support/enzyme.setup');
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import App from '../src/App';
import Dashboard from '../src/Dashboard.js';
import Form7 from '../src/forms/Form7.js';

describe('App', ()=>{
    
    test('loads Dashboard', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App />
            </MemoryRouter>
        );    
        
        expect(app.find(Dashboard)).toHaveLength(1);
    });  
    
    test('can load Form7', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/form.7.html' ]}>
                <App />
            </MemoryRouter>
        );    
        
        expect(app.find(Form7)).toHaveLength(1);
    });
});