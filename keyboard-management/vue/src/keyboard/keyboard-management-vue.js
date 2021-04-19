import { KeyboardManagement } from "./keyboard-management";

let idCounter = 0;

export function uniqueId() {
  return ++idCounter;
}

export const CONTEXT_KEY = "keyboard-management";

export const keyboardManagement = new KeyboardManagement();
