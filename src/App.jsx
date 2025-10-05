import { Routes, Route } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import './App.css';

// Pages

// Components
import ToDoItem from './components/TodoItem';



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

  return (
    <>
      <h1>Jennifer's Page</h1> 
      <Routes>
        
      </Routes>
    </>
  );
}

export default App;
