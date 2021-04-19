// @ts-check

/**
 * @template T
 */
export class TreeNode {
  /** @type {TreeNode|null} */
  parent = null;

  /** @type {TreeNode[]} */
  children = [];

  /**
   * @param {T} data
   */
  constructor(data) {
    this.data = data;
  }

  remove() {
    if (this.parent == null) return;

    const index = this.parent.children.indexOf(this);
    if (index !== -1) {
      this.parent.children.splice(index, 1);
    }
  }

  /**
   * @param {T} data
   */
  addChild(data) {
    const node = new TreeNode(data);
    node.parent = this;
    this.children.push(node);

    return node;
  }

  /**
   * @param {function(T):boolean} cb
   * @returns {TreeNode<T>|undefined}
   */
  findLeaf(cb) {
    // We first search for children instead of parent. Since we prefer leaf on
    // a root node
    for (let i = this.children.length - 1; i >= 0; i--) {
      const node = this.children[i].findLeaf(cb);
      if (node !== undefined) {
        return node;
      }
    }

    if (cb(this.data)) return this;
  }

  /**
   * @returns {T[]}
   */
  flatData() {
    /** @type {T[]} */
    const data = [];

    // We first search for children instead of parent. Since we prefer give
    // priority to leaf over root
    for (let i = this.children.length - 1; i >= 0; i--) {
      const node = this.children[i];
      data.push(...node.flatData());
    }

    data.push(this.data);

    return data;
  }
}
