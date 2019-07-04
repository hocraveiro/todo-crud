import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

class Form extends Component {
  constructor(props){
    super(props);
    
    const todo = props.todo||{done: false}; 
    this.state = {
      todo,
    }

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.todo !== this.state.todo){
      this.setState({ todo: nextProps.todo })
    }
  }

  onSubmitForm(evt){
    evt.preventDefault();
    this.props.handleOnSaveTodo(this.state.todo);
    this.props.handleOnClose();
  }

  handleChangeValue(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const newTodo = {...this.state.todo};
    newTodo[name] = value;
    this.setState({todo: newTodo});
  }

  render() {
    const {isOpen, handleOnClose} = this.props;
    const title = (this.state.todo._id) ? `Tarefa #${this.state.todo._id}`  : 'Nova tarefa'
    return (
      <ReactModal 
        isOpen={isOpen}
        contentLabel="Minimal Modal Example"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={{ overlay: {zIndex: 2, width: '100%'}, content: {maxWidth: '800px', margin: 'auto'} }}
        onRequestClose={handleOnClose}
      >
        <div className="container">
          <form className="form-todo" onSubmit={this.onSubmitForm}>
            <h1 className="h3 mb-3 font-weight-normal">{title}</h1>        
            <div className="form-group">
              <label htmlFor="inputDescription">Descrição</label>
              <input type="text" name="description" value={this.state.todo.description} onChange={this.handleChangeValue} className="form-control" placeholder="Descrição" required autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="inputDone">Feito?</label>
              <select name="done" id="select" value={this.state.todo.done} onChange={this.handleChangeValue} className="form-control">
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
            
            <button className="btn btn-primary" type="submit">Salvar</button>
          </form>
        </div>
      </ReactModal>
    );
    }
}

Form.propTypes = {
  todo: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  handleOnSaveTodo: PropTypes.func.isRequired,
};
export default Form;
