require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Journey  from "../../src/components/Journey.js";
jest.mock('react-router-dom');

describe('Journey', ()=> {


    test.only('Journey builds', () => {

        let wrapper = mount(
            <MemoryRouter
                initialEntries={[ '/' ]}
                component={Journey}
            />
        );
        expect(wrapper).toMatchSnapshot();

    });

});