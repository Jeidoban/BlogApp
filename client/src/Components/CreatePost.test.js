import React from 'react';
import { shallow } from 'enzyme';
import CreatePost from './CreatePost';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("CreatePost", () => {
    it("should render CreatePost", () => {
        const wrapper = shallow(<CreatePost />);
        expect(wrapper).toBeTruthy();
    });  
});