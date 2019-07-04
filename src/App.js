import React, {Component} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Table from './components/Table';
import Loading from './components/Loading';
import Form from './components/Form';

class App extends Component{
  constructor(){
    super();
    this.state = {
      todos: [],
      isLoading: true,
      showModal: false,
      todoEdit: {},
    }

    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleOnCloseModal = this.handleOnCloseModal.bind(this);
    this.handleOnSaveTodo = this.handleOnSaveTodo.bind(this);
  }

  componentWillMount(){
    axios
      .get('https://todowebservice.herokuapp.com/api/todos')
      .then(({data}) => {
        const state = {
          todos: data,
          isLoading: false
        }
        this.setState(state);
      });
  }

  updateTodo(id){
    this.setState({
      todoEdit: this.state.todos.find(todo => todo._id === id),
      showModal: true,
    })
  }

  async removeTodo(id){   
    this.setState({isLoading: true});
    axios.delete(`https://todowebservice.herokuapp.com/api/todos/${id}`)
    .then(() => {
      const updatedList = this.state.todos.filter(todo => todo._id !== id);
      this.setState({
        todos: updatedList,
        isLoading: false
      })
    })
  }

  handleOpenModal(todo) {
    this.setState({showModal: true, todoEdit: {}});
  }

  handleOnCloseModal(){
    this.setState({showModal: false, todoEdit: {}});
  }

  handleOnSaveTodo(todo){
    this.setState({isLoading: true});
    if(todo._id){
      axios
        .put(`https://todowebservice.herokuapp.com/api/todos/${todo._id}`, todo)
        .then(({data}) => {
          const todos = [...this.state.todos];
          const id = todo._id;
          const newTodos = todos.filter(t => t._id !==  id);
          newTodos.push(data);
          this.setState({todos: newTodos, isLoading: false});
        })
    }else{
      axios
        .post(`https://todowebservice.herokuapp.com/api/todos`, todo)
        .then(({data}) => {
          const todos = [...this.state.todos];
          todos.push(data);
          this.setState({todos, isLoading: false});
        })
    }
    
  }

  render(){
    return (
      <div className="app">
        <Header />
        {(this.state.isLoading) ? (
          <div className="row">
            <Loading />
          </div>
        ) : (
          <div className="container">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Minhas tarefas</span>
              <button className="btn btn-primary badge badge-primary badge-pill" onClick={this.handleOpenModal}>Novo +</button>
            </h4>
            <Table 
              todos={this.state.todos} 
              isLoading={this.state.isLoading}
              handleRemove={this.removeTodo}
              handleEdit={this.updateTodo}
              >
            </Table>
            <Form todo={this.state.todoEdit} isOpen={this.state.showModal} handleOnClose={this.handleOnCloseModal} handleOnSaveTodo={this.handleOnSaveTodo}/>
          </div>
        )}
      </div>
    );
  }
  
}

export default App;