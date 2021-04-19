// @ts-check
/**
 * This is a demo to show the benefints of making tree based keyboard
 * management. It doesn't contains performance optimizations, nor many needed
 * features, nor needed edge cases handling.
 */

import { TreeNodeData, TreeNodeType } from "./tree-node-data.js";
import { TreeNode } from "./tree-node.js";

//#region Types
/**
 * @typedef {Object} KeyboardShortcut
 * @property {string} key
 * @property {boolean} [altKey]
 * @property {boolean} [ctrlKey]
 * @property {boolean} [shiftKey]
 * @property {boolean} [metaKey]
 * @property {() => void} callback
 */
//#endregion

//#region Helpers
/**
 * @template T
 * @param {TreeNode<TreeNodeData<T>>} node
 * @param {readonly number[]} path
 * @returns {TreeNode<TreeNodeData<T>>|undefined}
 */
function findNode(node, path) {
  if (path.length === 0) return node;

  const [id, ...nextPath] = path;

  for (let child of node.children) {
    if (child.data.id === id) {
      return findNode(child, nextPath);
    }
  }
}

/**
 *
 * @param {KeyboardEvent} event
 * @param {KeyboardShortcut} shortcut
 * @returns {boolean}
 */
function doesEventContainShortcut(event, shortcut) {
  return (
    (event.key.toLowerCase() === shortcut.key.toLowerCase() ||
      event.code.toLowerCase() === shortcut.key.toLowerCase()) &&
    event.altKey === (shortcut.altKey || false) &&
    event.ctrlKey === (shortcut.ctrlKey || false) &&
    event.shiftKey === (shortcut.shiftKey || false) &&
    event.metaKey === (shortcut.metaKey || false)
  );
}
//#endregion

export class KeyboardManagement {
  /**
   * The most "leafest" and "latest" added `ROOT` typed node
   * @private
   */
  get _currentRoot() {
    return this._root.findLeaf((node) => node.type === TreeNodeType.ROOT);
  }

  constructor() {
    /**
     * @private
     * @type {TreeNode<TreeNodeData<KeyboardShortcut[]>>}
     */
    this._root = new TreeNode(new TreeNodeData(-1, TreeNodeType.ROOT));
    this._root.data.data = [];

    window.addEventListener("keydown", this._onKeyDown);
  }

  /**
   * @private
   * @param {KeyboardEvent} event
   */
  _onKeyDown = (event) => {
    if (event.defaultPrevented) return;
    if (event.repeat) return;
    if (event.isComposing) return;
    if (!(event instanceof KeyboardEvent)) return;

    const shortcuts = this._currentRoot
      .flatData()
      .flatMap((nodeData) => nodeData.data);

    for (const shortcut of shortcuts) {
      if (doesEventContainShortcut(event, shortcut)) {
        shortcut.callback();
        break;
      }
    }
  };

  /**
   * @param {readonly number[]} path
   * @param {number} id
   * @param {TreeNodeType} type
   */
  register(path, id, type) {
    return findNode(this._root, path).addChild(new TreeNodeData(id, type));
  }
}
