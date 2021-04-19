<template inherit-attrs="false">
  <KeyboardShortcuts @[shortcut]="$emit('shortcut')">
    <div
      v-bind:class="{
        FrameKey: true,
        'FrameKey--inverse': inverse,
      }"
    >
      <kbd class="FrameKey__kbd">{{ shortcutDisplay.toUpperCase() }}</kbd>
      <span>{{ description }}</span>
    </div>
  </KeyboardShortcuts>
</template>

<script setup>
import { useContext } from "vue";
import KeyboardShortcuts from "../keyboard/KeyboardShortcuts.vue";

const {
  shortcut,
  shortcutDisplay = shortcut,
  description,
  inverse = false,
} = useContext().attrs;
</script>

<style>
.FrameKey {
  height: 6rem;
  padding: 0.5rem;
  flex-basis: 6rem;
  flex-shrink: 1;
  flex-grow: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: var(--var-color-5);
  font-size: 0.8rem;
  list-style: 1.5;
  text-align: center;

  background: var(--var-color-4);
}

.FrameKey--inverse {
  background: var(--var-color-5);
  color: var(--var-color-4);
}

.FrameKey__kbd {
  font-size: 2rem;
  font-weight: bold;
  list-style: 1;
}
</style>
