// @ts-check

import { uniqueId } from "./uniqueId";

/**
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title
 * @property {boolean} isChecked
 * @property {string[]} subtasksIds
 * @property {string} [parentId]
 */

/**
 * @param {string} title
 * @returns {Task}
 */
function createTask(title) {
  return {
    id: uniqueId(),
    title: title.toUpperCase(),
    isChecked: false,
    subtasksIds: [],
    parentId: undefined,
  };
}

/** @type {Record<string, Task>} */
const fixtures = {};

for (const title of ["A", "B", "C", "D"]) {
  const task = createTask(title);
  fixtures[task.id] = task;
}

export default fixtures;
