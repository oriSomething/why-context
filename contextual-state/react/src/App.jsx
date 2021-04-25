// @ts-check

import * as React from "react";
import { TasksDraftProvider, useDraft, useTask } from "./TaskContext.jsx";

/**
 *
 * @param {Object} props
 * @param {string|undefined} [props.taskId]
 * @param {(taskId: string) => void} props.onTaskSelect
 * @param {React.ReactNode} [props.children]
 * @param {() => void} props.onTaskDeselect
 */
export function Task({ onTaskSelect, onTaskDeselect, taskId, children }) {
  /** @type {React.RefObject<HTMLInputElement>} */
  const inputRef = React.useRef(null);
  const { task, subtasks, createTask, toggleTask, deleteTask } = useTask(
    taskId
  );

  const {
    isDraft,
    isDraftable,
    applyDraft,
    cancelDraft,
    startDraft,
  } = useDraft();

  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (newTaskTitle) {
      createTask(newTaskTitle);
      setNewTaskTitle("");

      requestAnimationFrame(() => {
        inputRef.current?.scrollIntoView();
      });
    }
  }

  return (
    <React.Fragment>
      <article className={`Task ${isDraft ? "Task--isDraft" : ""}`}>
        <h2 className="Task__title">
          <div className="Task__title__text">{task?.title ?? "Root"}</div>
          {isDraftable ? (
            isDraft ? (
              <React.Fragment>
                <button
                  type="button"
                  onClick={cancelDraft}
                  className="Task__title__button"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={applyDraft}
                  className="Task__title__button"
                >
                  Apply
                </button>
              </React.Fragment>
            ) : (
              <button
                type="button"
                onClick={startDraft}
                className="Task__title__button"
              >
                Start Draft
              </button>
            )
          ) : null}
        </h2>
        <ul hidden={subtasks.length === 0} className="Task__subtasks">
          {subtasks.map((task) => {
            return (
              <li
                key={task.id}
                role="button"
                tabIndex={0}
                onKeyPress={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    event.key === "Enter" &&
                    event.metaKey === false &&
                    event.ctrlKey === false &&
                    event.shiftKey === false &&
                    event.altKey === false
                  ) {
                    onTaskSelect(task.id);
                  }
                }}
                onClick={() => onTaskSelect(task.id)}
                className="Task__subtask"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className="Task__subtask__button Task__subtask__button--check"
                >
                  {task.isChecked ? "✔︎" : ""}
                </button>
                <div
                  className={`Task__subtask__text ${
                    task.isChecked ? "Task__subtask__text--checked" : ""
                  }`}
                >
                  {task.title}
                </div>

                {task.isChecked ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      const { id } = task;
                      deleteTask(id);
                      onTaskDeselect();
                    }}
                    className="Task__subtask__button"
                  >
                    🗑
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit} className="Task__newTask">
          <input
            ref={inputRef}
            type="text"
            name="task"
            value={newTaskTitle}
            autoComplete="off"
            placeholder="New task"
            onChange={(event) => setNewTaskTitle(event.currentTarget.value)}
            className="Task__newTask__input"
          />
        </form>
      </article>
      {children}
    </React.Fragment>
  );
}

/**
 * @param {Object} props
 * @param {React.ReactNode[]} props.children
 * @returns
 */
function Recursive({ children: [current, ...rest] }) {
  return (
    <React.Fragment>
      {current}
      {rest.length === 0 ? null : <Recursive>{rest}</Recursive>}
    </React.Fragment>
  );
}

export function App() {
  const [taskIds, setTasksIds] = React.useState([]);

  /**
   * @param {number} index
   * @param {string} taskId
   */
  function selectTask(index, taskId) {
    setTasksIds((taskIds) => {
      if (taskIds.length === index) {
        return [...taskIds, taskId];
      } else {
        return taskIds.slice(0, index).concat(taskId);
      }
    });
  }

  /**
   * @param {number} index
   */
  function deselectTask(index) {
    setTasksIds((taskIds) => {
      if (index >= taskIds.length) return taskIds;
      return taskIds.slice(0, index);
    });
  }

  return (
    <div className="App">
      <h1 className="App__title">Contextual state</h1>
      <div className="App__tasks">
        <Task
          onTaskSelect={(taskId) => selectTask(0, taskId)}
          onTaskDeselect={() => deselectTask(0)}
        />
        <Recursive>
          {taskIds.map((taskId, index) => {
            return (
              <TasksDraftProvider key={taskId}>
                <Task
                  key={index}
                  taskId={taskId}
                  onTaskSelect={(taskId) => selectTask(index + 1, taskId)}
                  onTaskDeselect={() => deselectTask(index + 1)}
                />
              </TasksDraftProvider>
            );
          })}
        </Recursive>
      </div>
    </div>
  );
}
