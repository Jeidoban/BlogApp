import React from 'react';
import { shallow } from 'enzyme';
import PostList from './PostList';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("PostList", () => {
    it("should render PostList", () => {
        const wrapper = shallow(<PostList />);
        expect(wrapper).toBeTruthy();
    });  
});