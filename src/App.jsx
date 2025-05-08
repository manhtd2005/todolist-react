import TodoList from "./assets/components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [todoList, setTodolist] = useState([]); //array
  const [textInput, setTextInput] = useState("");

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(() => {
    // Them text vao danh sach todolist
    setTodolist([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList,
    ]);

    setTextInput("a");
  }, [textInput, todoList]);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
