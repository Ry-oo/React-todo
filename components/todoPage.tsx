import Image from "next/image";
import styles from "../src/styles/Home.module.css";
import { FC, useState, Dispatch, SetStateAction } from "react";
import { TaskType } from "../src/pages/index";

type submitType = React.FormEvent<HTMLFormElement>;
type changeType = React.ChangeEvent<HTMLInputElement>;
type clickType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type stateType = {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const MainPage: FC<stateType> = ({ taskList, setTaskList }) => {
  const [inputText, setInputText] = useState("");
  const addTask = (e: submitType | clickType) => {
    e.preventDefault();
    if (inputText == "") {
      return;
    }
    setTaskList([
      ...taskList,
      {
        id: taskList.length,
        text: inputText,
        completed: false,
      },
    ]);
    setInputText("");
  };

  const handleChange = (e: changeType) => {
    setInputText(e.target.value);
  };
  return (
    <div className={styles.mainPage}>
      <h3>Your personal productivity tool</h3>

      <form onSubmit={(e: submitType) => addTask(e)}>
        <input
          type="text"
          onChange={(e: changeType) => handleChange(e)}
          placeholder="What is your todo?"
          value={inputText}
        />
        <button onClick={(e: clickType) => addTask(e)} type="submit">
          <Image alt="completed" src="/plus.png" width={30} height={30} />
        </button>
      </form>
      <h4>[ To Do List ]</h4>
    </div>
  );
};
