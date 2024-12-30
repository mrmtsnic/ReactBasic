import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") {
      return todo.status === "pending";
    }
    if (filter === "completed") {
      return todo.status === "completed";
    }
    return true;
  });

  const addTodo = () => {
    if (todo === "") {
      setError("TODOを入力してください。");
      return;
    }
    setError("");
    const newTodo = { id: generateId(), text: todo, status: "pending" };
    const _todos = [...todos, newTodo];
    setTodos(_todos);
    setTodo("");
  };

  const deleteTodo = (id) => {
    console.log(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const changeStatus = (id) => {
    console.log(id);
    setTodos((prev) =>
      prev.map((todo) => {
        console.log(todo);
        if (id === todo.id) {
          if (todo.status === "completed") {
            return { ...todo, status: "pending" };
          } else {
            return { ...todo, status: "completed" };
          }
        }
        return todo;
      })
    );
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const editTodo = (text, id) => {
    setEditText(text);
    setEditingId(id);
  };
  const saveEditTodo = () => {
    console.log(editingId, editText);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditText("");
    setEditingId("");
  };

  const cancelEditTodo = () => {
    setEditText("");
    setEditingId("");
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>現在タスクはありません</p>
      ) : (
        <div>
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                {todo.id === editingId ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></input>
                    <button onClick={() => saveEditTodo()}>保存</button>
                    <button onClick={() => cancelEditTodo()}>キャンセル</button>
                  </>
                ) : (
                  <>
                    <span className={todo.status === "completed" ? "done" : ""}>
                      {todo.text}
                    </span>
                    <button onClick={() => changeStatus(todo.id)}>
                      {todo.status === "pending" ? "完了" : "未完了に戻す"}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>delete</button>
                    <button onClick={() => editTodo(todo.text, todo.id)}>
                      edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button onClick={clearTodos}>全て削除</button>
        </div>
      )}
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      ></input>

      <button onClick={addTodo}>add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{ fontWeight: filter === "pending" ? "bold" : "normal" }}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
          完了
        </button>
      </div>
    </div>
  );
};

export default Todo;
