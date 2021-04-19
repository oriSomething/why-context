<template inherit-attrs="false">
  <slot></slot>
</template>

<script setup>
import {
  provide,
  inject,
  useContext,
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  computed,
} from "vue";
import {
  keyboardManagement as manager,
  uniqueId,
} from "./keyboard-management-vue";

const id = uniqueId();
const { attrs } = useContext();
const { type = "global" } = attrs;
const nodeRef = ref();

//#region Provide / Inject
const { path, register } = inject("keyboard-management", {
  path: [],
  register: (path, id, type) => manager.register(path, id, type),
});

provide("keyboard-management", {
  path: [...path, id],
  register: (path_, id_, type_) => {
    if (nodeRef.value === undefined) {
      nodeRef.value = register(path, id, type);
    }

    return register(path_, id_, type_);
  },
});
//#endregion

const shortcutsAttrs = computed(() => {
  const { type, ...shortcutsAttrs } = attrs;
  return shortcutsAttrs;
});

function registerShortcuts() {
  if (nodeRef.value === undefined) {
    nodeRef.value = register(path, id, type);
  }

  const shortcuts = [];

  for (let [key, callback] of Object.entries(shortcutsAttrs.value)) {
    shortcuts.push({
      key: key.slice(2),
      callback,
    });
  }

  nodeRef.value.data.data = shortcuts;
}

onMounted(registerShortcuts);

onUpdated(registerShortcuts);

onUnmounted(() => {
  if (nodeRef.value !== undefined) {
    nodeRef.value.data.data = [];
    nodeRef.value.remove();
    nodeRef.value = undefined;
  }
});
</script>
