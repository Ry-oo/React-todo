import Image from "next/image";
import styles from "../src/styles/Home.module.css";
import { FC, Dispatch, SetStateAction } from "react";
import { TaskType } from "../src/pages/index";

type stateType = {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const TodoList: FC<stateType> = ({ taskList, setTaskList }) => {
  const handleDone = (id: number) => {
    setTaskList(
      taskList.map((task) => {
        if (id === task.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  return (
    <div className={styles.todoList}>
      <div className={styles.flex}>
        {taskList.map((task, index) => (
          <div
            key={index}
            className={`${styles.flex1} ${
              task.completed ? styles.completed : ""
            }`}
          >
            <div>
              <ul>
                <li>
                  <span>{task.text}</span>
                </li>
              </ul>
            </div>
            <div>
              <button type="button" onClick={() => handleDone(task.id)}>
                <Image alt="check" src="/check.png" width={25} height={25} />
              </button>
              <button type="button" onClick={() => handleDelete(task.id)}>
                <Image alt="trash" src="/trash.png" width={25} height={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
