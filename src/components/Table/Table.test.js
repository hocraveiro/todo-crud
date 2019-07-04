import React from 'react';
import { mount, shallow } from 'enzyme';
import Table from './Table';
import { expression } from '@babel/template';
import { wrap } from 'module';


describe('<Table.test />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Table todos={todos} handleEdit={jest.fn} handleRemove={jest.fn}/>);
  });

  it('should render without error', () => {
     expect(wrapper.find('tbody tr').length).toBe(todos.length);
  });

  it('should call handle for update', () => {
    const todoId = todos[0]._id;
    const handleOnUpdateMock = jest.fn();
    
    wrapper = shallow(<Table todos={todos} handleEdit={handleOnUpdateMock} handleRemove={jest.fn}/>);
    wrapper.find(`[data-id=${todoId}] .btn-edit`).simulate('click');
    expect(handleOnUpdateMock).toBeCalledWith(todoId);
  })

  it('should call handle for remove', () => {
    const todoId = todos[0]._id;
    const handleOnRemoveMock = jest.fn();
    global.confirm = jest.fn();
    wrapper = shallow(<Table todos={todos} handleEdit={jest.fn} handleRemove={handleOnRemoveMock}/>);
    wrapper.find(`[data-id=${todoId}] .btn-remove`).simulate('click');
    expect(global.confirm).toBeCalledWith('Are you sure?');
  })

  it('should render Não when done is false', () => {
    const todoId = todos[0]._id;
    const text = wrapper.find(`[data-id=${todoId}]`).childAt(3).text();
    expect(text).toBe('Não');
  })

  it('should render Sim when done is true', () => {
    const todoId = todos[1]._id;
    const text = wrapper.find(`[data-id=${todoId}]`).childAt(3).text();
    expect(text).toBe('Sim')
  })
});


const todos = [
  {
    _id: 123,
    description: 'My first todo',
    done: false,
    createdAt: '2019-05-27T13:44:42.862Z'
  },
  {
    _id: 124,
    description: 'My second todo',
    done: true,
    createdAt: '2019-05-28T13:44:42.862Z'
  },
  {
    _id: 125,
    description: 'My third todo',
    done: false,
    createdAt: '2019-05-29T13:44:42.862Z' 
  }
]