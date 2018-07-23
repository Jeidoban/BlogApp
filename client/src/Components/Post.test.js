import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Post", () => {
    it("should render Post", () => {
        const wrapper = shallow(<Post />);
        expect(wrapper).toBeTruthy();
    });  
});