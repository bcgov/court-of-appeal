require('./support/fake.dom');
import React from 'react';
import Footer from '../src/Footer';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('source code displayed', ()=>{
    process.env.REACT_APP_COMMIT = '123456789'
    const footer = mount(<Footer />);    
    let instance = footer.instance();
    
    expect(instance.state.commit).toEqual('1234567');  
});
test('resists unknown commit', ()=>{
    var map = {};
    for (var key in process.env) {
        if (key != 'REACT_APP_COMMIT') {
            map[key] = process.env[key];
        }
    }
    process.env = map;
    const footer = mount(<Footer />);    
    let instance = footer.instance();
    
    expect(instance.state.commit).toEqual('Unknown');  
});