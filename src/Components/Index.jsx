import { useState } from "react";

export default function Todo() {
  const [value, setvalue] = useState("");
  const [todos, settodos] = useState([]);
  const [getCurrentEditedId, setGetCurrentEditedId] = useState(null);

  function addtodo(gettitle) {
    const newtodo = {
      id: todos.length === 0 ? 1 : todos.length + 1,
      title: gettitle,
    };
    settodos([...todos, newtodo]);
    setvalue("");
  }

  function handleDeleteTodo(getid) {
    const filtertodo = todos.filter((item) => item.id !== getid);
    settodos(filtertodo);
  }

  function handleEditTodo() {
    const newtodo = todos;
    const checkid = newtodo.findIndex((item) => item.id === getCurrentEditedId);
    console.log(checkid);

    newtodo[checkid] = { ...newtodo[checkid], title: value };

    settodos(newtodo);
    setGetCurrentEditedId(null);
    setvalue("");
  }

  function handleUpdateTodo(getitem) {
    setGetCurrentEditedId(getitem.id);
    setvalue(getitem.title);
  }

  //   console.log(todos);
  console.log(getCurrentEditedId);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="please enter..."
          value={value}
          onChange={(event) => {
            setvalue(event.target.value);
          }}
        />
        <button
          onClick={
            getCurrentEditedId === null
              ? () => addtodo(value)
              : () => handleEditTodo()
          }
        >
          {getCurrentEditedId === null ? "Add Todo" : "Edit Todo"}
        </button>
      </div>
      <div>
        {todos && todos.length > 0
          ? todos.map((item) => (
              <ul key={item.id}>
                <p>
                  {item.title}
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdateTodo(item)}>Edit</button>
                </p>
              </ul>
            ))
          : null}
      </div>
    </div>
  );
}
