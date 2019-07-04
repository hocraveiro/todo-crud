import React from 'react';
import { mount } from 'enzyme';
import Form from './Form';

const todo = {
  _id: '123',
  description: 'To buy beer',
  done: 'false',
}

describe('<Form.test />', () => {
  it('should render form using as a root body', () => {
    const wrapper = mount(<Form isOpen={true} handleOnClose={jest.fn} todo={todo}/>);
  });

  it('should render id and description when todo is passed as a prop', () => {
    const wrapper = mount(<Form isOpen={true} handleOnClose={jest.fn} todo={todo}/>);
    const text = wrapper.find('h1').text();
    expect(text).toContain('#123 - To buy beer');
  });

  it('should render Nova Tarefa when todo is not passed as a prop', () => {
    const wrapper = mount(<Form isOpen={true} handleOnClose={jest.fn}/>);
    const text = wrapper.find('h1').text();
    expect(text).toContain('Nova tarefa');
  });


  it('should call handleOnClose when clicked on catchclicker', () => {
    const mockOnClose =  jest.fn();
    const wrapper = mount(<Form isOpen={true} handleOnClose={mockOnClose}/>);
    wrapper.find('.ReactModal__Overlay').simulate('click');
    expect(mockOnClose).toBeCalled();
  })

});
