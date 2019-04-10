
import ShallowRenderer from 'react-test-renderer/shallow';
require('../support/enzyme.setup');
import React from 'react';
import Form2 from '../../src/forms/Form2';

describe('Form 2 snapshot', ()=>{

    test('snapshot', () => {

        const renderer = new ShallowRenderer();
        const tree = renderer.render(<Form2 homePath={"/"}/>);
        expect(tree).toMatchSnapshot();
    })

});
