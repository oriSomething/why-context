// @ts-check

//#region Imports
import * as React from "react";
import { produce, enablePatches, applyPatches } from "immer";
import { uniqueId } from "./uniqueId.js";
import fixures from "./fixtures.js";
//#endregion

enablePatches();

//#region Types
/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title
 * @property {boolean} isChecked
 * @property {string[]} subtasksIds
 * @property {string} [parentId]
 */

/**
 * @typedef {object} TaskContextValue
 * @property {Record<string, Task>} tasks
 * @property {(id: string) => void} toggleTask
 * @property {(id: string) => void} deleteTask
 * @property {(title: string, parentId?: string) => void} createTask
 * @property {React.Dispatch<React.SetStateAction<Record<string, Task|undefined>>>} [setTasks]
 * @property {() => void} [cancelDraft]
 * @property {() => void} [applyDraft]
 * @property {() => void} [startDraft]
 * @property {boolean} [isDraft]
 */
//#endregion

//#region Helpers
/**
 * @param {Record<string, Task>} draft
 * @param {string} id
 */
function deleteTaskFromStore(draft, id) {
  const task = draft[id];
  if (task == null) return;

  for (let id of task.subtasksIds) {
    deleteTaskFromStore(draft, id);
  }

  if (task) {
    delete draft[id];

    if (task.parentId !== undefined && draft[task.parentId]) {
      const index = draft[task.parentId].subtasksIds.indexOf(id);

      if (index !== -1) draft[task.parentId].subtasksIds.splice(index, 1);
    }
  }
}
//#endregion

/**
 * @type {React.Context<TaskContextValue | undefined>}
 */
const TaskContext = React.createContext(undefined);
TaskContext.displayName = "TaskContext";

export function TasksProvider({ children }) {
  if (React.useContext(TaskContext)) {
    throw new Error("Can only be as single <TasksProvider>");
  }

  const [tasks, setTasks] = React.useState(fixures);

  /**
   * @type {(id: string) => void} id
   */
  const toggleTask = React.useCallback((id) => {
    setTasks(
      produce((draft) => {
        const task = draft[id];
        if (task != null) {
          task.isChecked = !task.isChecked;
        }
      })
    );
  }, []);

  /**
   * @type {(id: string) => void} id
   */
  const deleteTask = React.useCallback((id) => {
    setTasks(produce((draft) => deleteTaskFromStore(draft, id)));
  }, []);

  /**
   * @type {(title: string, parentId?: string) => void}
   */
  const createTask = React.useCallback((title, parentId) => {
    setTasks(
      produce((draft) => {
        /** @type {Task} */
        const task = {
          id: uniqueId(),
          title,
          isChecked: false,
          subtasksIds: [],
          parentId,
        };

        draft[task.id] = task;

        if (parentId !== undefined && draft[parentId]) {
          draft[parentId].subtasksIds.push(task.id);
        }
      })
    );
  }, []);

  const context = React.useMemo(() => {
    return {
      toggleTask,
      deleteTask,
      createTask,
      tasks,
      setTasks,
    };
  }, [toggleTask, deleteTask, createTask, tasks]);

  return (
    <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
  );
}

function TasksDraftProvider({ children }) {
  const context = React.useContext(TaskContext);

  const [isDraft, setIsDraft] = React.useState(false);
  const [patches, setPatches] = React.useState(
    /** @type {import("immer").Patch[]} */ ([])
  );
  const tasks = React.useMemo(() => {
    return isDraft ? applyPatches(context.tasks, patches) : context.tasks;
  }, [isDraft, context.tasks, patches]);

  /**
   * @param {string} id
   */
  function toggleTask(id) {
    produce(
      tasks,
      (draft) => {
        const task = draft[id];
        if (task != null) {
          task.isChecked = !task.isChecked;
        }
      },
      (patches) => setPatches((state) => [...state, ...patches])
    );
  }

  /**
   * @param {string} id
   */
  function deleteTask(id) {
    produce(
      tasks,
      (draft) => deleteTaskFromStore(draft, id),
      (patches) => setPatches((state) => [...state, ...patches])
    );
  }

  /**
   *
   * @param {string} title
   * @param {string} [parentId]
   */
  function createTask(title, parentId) {
    produce(
      tasks,
      (draft) => {
        /** @type {Task} */
        const task = {
          id: uniqueId(),
          title,
          isChecked: false,
          subtasksIds: [],
          parentId,
        };

        draft[task.id] = task;

        if (parentId !== undefined && draft[parentId]) {
          draft[parentId].subtasksIds.push(task.id);
        }
      },
      (patches) => setPatches((state) => [...state, ...patches])
    );
  }

  function cancelDraft() {
    setIsDraft(false);
    setPatches([]);
  }

  function applyDraft() {
    setIsDraft((state) => !state);
    setPatches([]);
    context.setTasks((tasks) => applyPatches(tasks, patches));
  }

  function startDraft() {
    if (!isDraft) {
      setIsDraft(true);
      setPatches([]);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        toggleTask: isDraft ? toggleTask : context.toggleTask,
        deleteTask: isDraft ? deleteTask : context.deleteTask,
        createTask: isDraft ? createTask : context.createTask,
        tasks,
        isDraft,
        cancelDraft,
        applyDraft,
        startDraft,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

const TasksDraftProvider_memo = React.memo(TasksDraftProvider);
export { TasksDraftProvider_memo as TasksDraftProvider };

/**
 *
 * @param {string} [id]
 */
export function useTask(id = undefined) {
  const { tasks, createTask, toggleTask, deleteTask } = React.useContext(
    TaskContext
  );

  const task = tasks[id];

  const subtasks = [];
  if (task == null) {
    for (const task of Object.values(tasks)) {
      if (task.parentId === undefined) {
        subtasks.push(task);
      }
    }
  } else {
    for (const id of task.subtasksIds) {
      if (tasks[id]) {
        subtasks.push(tasks[id]);
      }
    }
  }

  return {
    task,
    subtasks,
    deleteTask,
    createTask: (/** @type {string} */ title) => createTask(title, task?.id),
    toggleTask,
  };
}

export function useDraft() {
  const { isDraft, cancelDraft, applyDraft, startDraft } = React.useContext(
    TaskContext
  );

  const isDraftable =
    typeof isDraft === "boolean" &&
    cancelDraft &&
    applyDraft &&
    startDraft &&
    true;

  return {
    isDraft,
    isDraftable,
    cancelDraft,
    applyDraft,
    startDraft,
  };
}
