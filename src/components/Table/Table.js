import React from 'react';
import PropTypes from 'prop-types';

function Table ({todos, handleEdit, handleRemove}) {
  return (
    <div className="row">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>  
            <th>#</th>
            <th>Descrição</th>
            <th>Data de criação</th>
            <th>Feito</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>#{todos.length}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          {todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((todo, key) => {
            return <tr key={key} data-id={todo._id}>
              <td>{todo._id}</td>
              <td>{todo.description}</td>
              <td>{Intl.DateTimeFormat('pt-BR').format(new Date(todo.createdAt))}</td>
              <td>{(todo.done) ? 'Sim' : 'Não'}</td>
              <td>
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary btn-sm btn-edit" onClick={() => handleEdit(todo._id)}>Edit</button>
                  <button type="button" className="btn btn-danger btn-sm btn-remove" onClick={() => {
                    if(window.confirm('Are you sure?')) {
                      handleRemove(todo._id)
                    }
                  }}>Remove</button>
                </div>
              </td>

            </tr>
          })}
        </tbody>
      </table>  
    </div>
  );
}

Table.propTypes = {
  todos: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,  
};


export default Table;
