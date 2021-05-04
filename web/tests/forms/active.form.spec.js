require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import ActiveFormList from '../../src/components/ActiveFormList';
let DefaultService = require('../../src/service/default.service');

describe('Active forms section', function() {

    // tests must be moved to Dashboard component
    test('default service', ()=>{
        let instance = mount(<ActiveFormList fetch="false" cases={[]}/>).instance();

        expect(instance.props.cases).toEqual([]);
    });
});
