// @ts-check

let id = 0;

export function uniqueId() {
  return `id-${++id}`;
}
