import React, { useEffect } from 'react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { FilterType } from '../types/FilterType';
import { getTodos, getUser } from '../api';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedFilter: FilterType;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  visibleTodos: Todo[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userTodo: Todo;
  setUserTodo: React.Dispatch<React.SetStateAction<Todo>>;
  handleOpenUserModal: (todo: Todo) => void;
  handleCloseUserModal: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const todoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  selectedFilter: 'all',
  setSelectedFilter: () => {},
  visibleTodos: [],
  modalOpen: false,
  setModalOpen: () => {},
  searchTitle: '',
  setSearchTitle: () => {},
  user: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  setUser: () => {},
  userTodo: {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  },
  setUserTodo: () => {},
  handleOpenUserModal: () => {},
  handleCloseUserModal: () => {},
  handleSearchChange: () => {},
});

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>('all');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [searchTitle, setSearchTitle] = React.useState<string>('');
  const [userTodo, setUserTodo] = React.useState<Todo>({
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  });
  const [user, setUser] = React.useState<User>({} as User);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const activeTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

  const filteredTodos = React.useMemo(() => {
    switch (selectedFilter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default:
        return todos;
    }
  }, [todos, activeTodos, completedTodos, selectedFilter]);

  const handleOpenUserModal = (todo: Todo) => {
    getUser(todo.userId)
      .then(userPromise => setUser(userPromise))
      .then(() => setUserTodo(todo));
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setModalOpen(false);
    setUser({} as User);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const treatedSearch = searchTitle.toLowerCase().trim();
  const visibleTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(treatedSearch),
  );

  const contextValue = {
    todos,
    setTodos,
    selectedFilter,
    setSelectedFilter,
    visibleTodos,
    modalOpen,
    setModalOpen,
    searchTitle,
    setSearchTitle,
    user,
    setUser,
    userTodo,
    setUserTodo,
    handleOpenUserModal,
    handleCloseUserModal,
    handleSearchChange,
  };

  return (
    <todoContext.Provider value={contextValue}>{children}</todoContext.Provider>
  );
};
