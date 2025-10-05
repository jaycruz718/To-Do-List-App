
function ToDoItem({ todo, dispatch, ACTIONS }) {
  function handleToggle() {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todo.id } });
  }

  function handleDelete() {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todo.id } });
  }

  function handleEditToggle() {
    dispatch({ type: ACTIONS.START_EDIT, payload: { id: todo.id } });
  }

  function handleEditChange(e) {
    dispatch({
      type: ACTIONS.EDIT_CHANGE,
      payload: { id: todo.id, value: e.target.value },
    });
  }

  function handleSave() {
    dispatch({ type: ACTIONS.SAVE_EDIT, payload: { id: todo.id } });
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleToggle}
      />

      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={todo.editValue}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.complete ? 'line-through' : 'none',
              marginLeft: '10px',
              flexGrow: 1,
            }}
          >
            {todo.name}
          </span>
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDelete} disabled={!todo.complete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ToDoItem;
