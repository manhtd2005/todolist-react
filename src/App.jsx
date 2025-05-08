import TodoList from "./assets/components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    // Lấy danh sách todoList từ localStorage
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    () => {
      // Thêm textInput vào danh sách todoList
      setTodoList([
        ...todoList,
        { id: v4(), name: textInput, isCompleted: false },
      ]);

      // Reset lại textInput
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      })
    );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Nhập công việc cần làm"
        elemAfterInput={
          <Button
            appearance="primary"
            isDisabled={!textInput}
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
