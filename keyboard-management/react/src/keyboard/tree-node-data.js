// @ts-check

/** @enum {number} */
export const TreeNodeType = {
  /** Check shortcuts from this leaf, and ignore everything from parent nodes */
  ROOT: 0,
  /** Add all keyboad shortcuts listeners to `window` */
  GLOBAL: 1,
};

/**
 * @template T
 */
export class TreeNodeData {
  /** @type {T} */
  data;

  /**
   * @param {number} id
   * @param {TreeNodeType} type
   */
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
}
