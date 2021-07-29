require('./support/enzyme.setup');
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import App from '../src/App';
import Dashboard from '../src/pages/Dashboard.js';
import Notifications from '../src/pages/Notifications.js';
import MyDocuments from '../src/pages/MyDocuments.js';

describe('App', ()=>{

    test('loads Dashboard', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App fetch="false" service={ {
                    getPersonInfo:(callback)=>{ callback({}) },
                    getMyJourney:(form, callback)=>{ callback({}) }
                }}/>
            </MemoryRouter>
        );

        expect(app.find(Dashboard)).toHaveLength(1);
    });

    test('can load Notifications', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/notifications.html' ]}>
                <App fetch="false"/>
            </MemoryRouter>
        );

        expect(app.find(Notifications)).toHaveLength(1);
    });

    test('can load MyDocuments', ()=>{
        const app = mount(
            <MemoryRouter initialEntries={[ '/my-documents' ]}>
                <App fetch="false" service={ {getPersonInfo:(callback)=>{ callback({}) } }}/>
            </MemoryRouter>
        );

        expect(app.find(MyDocuments)).toHaveLength(1);
    });
});
