import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';
import toJson from 'enzyme-to-json';
test('shoul', () => {
  const wrapper = shallow(<Header/>);
  expect(toJson(wrapper)).toMatchSnapshot();

})