/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { todoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const { todos, modalOpen } = React.useContext(todoContext);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length === 0 ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TodoModal />}
    </>
  );
};
