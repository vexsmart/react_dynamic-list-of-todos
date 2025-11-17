import React from 'react';
import { todoContext } from '../../contexts/TodoContext';

export const TodoList: React.FC = () => {
  const { visibleTodos, modalOpen, userTodo, handleOpenUserModal } =
    React.useContext(todoContext);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p
                  className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  onClick={() => {
                    handleOpenUserModal(todo);
                  }}
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${todo.id === userTodo.id && modalOpen ? '-slash' : ''}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
