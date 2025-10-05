function ToDoItem({ todo, dispatch, ACTIONS }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() =>
          dispatch({ type: ACTIONS.TOGGLE, payload: { id: todo.id } })
        }
      />

      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={todo.editValue}
            onChange={e =>
              dispatch({
                type: ACTIONS.EDIT_CHANGE,
                payload: { id: todo.id, value: e.target.value },
              })
            }
          />
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.SAVE_EDIT, payload: { id: todo.id } })
            }
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.complete ? 'line-through' : 'none',
              flex: 1,
            }}
          >
            {todo.name}
          </span>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.START_EDIT, payload: { id: todo.id } })
            }
          >
            Edit
          </button>
          <button
            disabled={!todo.complete}
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE, payload: { id: todo.id } })
            }
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ToDoItem;