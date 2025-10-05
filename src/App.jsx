import { useState } from 'react';
import { useImmerReducer } from 'use-immer';
import './App.css';

// Components
import ToDoItem from './components/TodoItem';

const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete',
  START_EDIT: 'start_edit',
  EDIT_CHANGE: 'edit_change',
  SAVE_EDIT: 'save_edit',
};

function reducer(draft, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      draft.unshift({
        id: Date.now(),
        name: action.payload.name,
        complete: false,
        isEditing: false,
        editValue: action.payload.name,
      });
      break;

    case ACTIONS.TOGGLE:
      const todo = draft.find(t => t.id === action.payload.id);
      if (todo) todo.complete = !todo.complete;
      break;

    case ACTIONS.DELETE:
      return draft.filter(t => t.id !== action.payload.id);

    case ACTIONS.START_EDIT:
      const todoEdit = draft.find(t => t.id === action.payload.id);
      if (todoEdit) todoEdit.isEditing = true;
      break;

    case ACTIONS.EDIT_CHANGE:
      const todoChange = draft.find(t => t.id === action.payload.id);
      if (todoChange) todoChange.editValue = action.payload.value;
      break;


    case ACTIONS.SAVE_EDIT:
      const todoSave = draft.find(t => t.id === action.payload.id);
      if (todoSave) {
        todoSave.name = todoSave.editValue;
        todoSave.isEditing = false;
      }
      break;

    default:
      break;
  }
}

function App() {
  const [todos, dispatch] = useImmerReducer(reducer, []);
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === '') return;
    dispatch({ type: ACTIONS.ADD, payload: { name } });
    setName('');
  }

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Todo</button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
        ))}
      </div>
    </div>
  );
}

export default App;