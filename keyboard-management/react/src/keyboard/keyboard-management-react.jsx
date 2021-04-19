// @ts-check

import * as React from "react";
import { KeyboardManagement } from "./keyboard-management.js";
import { TreeNodeType } from "./tree-node-data.js";

const manager = new KeyboardManagement();

const KeyboardManagementContext = React.createContext({
  path: /** @type {readonly number[]} */ ([]),
  manager,
  /**
   * @param {readonly number[]} path
   * @param {number} id
   * @param {TreeNodeType} type
   */
  register: (path, id, type) => manager.register(path, id, type),
});

KeyboardManagementContext.displayName = "KeyboardManagementContext";

let idCounter = 0;

/**
 * @typedef {Object} KeyboardShortcutsProps
 * @property {React.ReactNode} children
 * @property {import("./keyboard-management").KeyboardShortcut[]} [shortcuts]
 */

/**
 * @param {TreeNodeType} type
 * @returns {React.FunctionComponent<KeyboardShortcutsProps>}
 */
function createKeyboardShortcutsComponent(type) {
  /** @type {[]} */
  const EMPTY_ARRAY = [];

  /**
   * @param {KeyboardShortcutsProps} props
   */
  function KeyboardShortcuts({ children, shortcuts = EMPTY_ARRAY }) {
    /** @type {React.MutableRefObject<number>} */
    const idRef = React.useRef(undefined);
    if (idRef.current === undefined) idRef.current = ++idCounter;

    /**
     * @type {React.MutableRefObject<import("./tree-node").TreeNode<import("./tree-node-data").TreeNodeData<import("./keyboard-management.js").KeyboardShortcut[]>>>}
     */
    const nodeRef = React.useRef();

    const { path, manager, register } = React.useContext(
      KeyboardManagementContext
    );

    const childContext = React.useMemo(() => {
      const currentPath = path;

      return {
        path: [...currentPath, idRef.current],
        manager,
        register: (path, id, type) => {
          if (nodeRef.current === undefined) {
            nodeRef.current = register(currentPath, idRef.current, type);
          }
          return register(path, id, type);
        },
      };
    }, [path, manager, register]);

    React.useEffect(() => {
      if (nodeRef.current === undefined) {
        nodeRef.current = register(path, idRef.current, type);
      }

      return () => {
        if (nodeRef.current !== undefined) {
          nodeRef.current.remove();
          nodeRef.current = undefined;
        }
      };
    }, [path, register]);

    React.useEffect(() => {
      const node = nodeRef.current;

      if (node) node.data.data = shortcuts;

      return () => {
        node.data.data = [];
      };
    });

    return (
      <KeyboardManagementContext.Provider value={childContext}>
        {children}
      </KeyboardManagementContext.Provider>
    );
  }

  return KeyboardShortcuts;
}

export const KeyboardShortcutsRoot = createKeyboardShortcutsComponent(
  TreeNodeType.ROOT
);
KeyboardShortcutsRoot.displayName = "KeyboardShortcutsRoot";

export const KeyboardShortcutsGlobal = createKeyboardShortcutsComponent(
  TreeNodeType.GLOBAL
);
KeyboardShortcutsGlobal.displayName = "KeyboardShortcutsGlobal";
