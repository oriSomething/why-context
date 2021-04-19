<template inherit-attrs="false">
  <KeyboardShortcuts type="root">
    <div class="Frame">
      <div
        v-bind:class="{
          Frame__content: true,
          'Frame__content--hasFrame': hasInnerFrame,
        }"
      >
        <FrameKey
          v-if="onDelete"
          inverse="true"
          shortcut="Backspace"
          shortcutDisplay="⌫"
          description="Delete"
          @shortcut="onDelete()"
        ></FrameKey>

        <FrameKey
          shortcut="z"
          description="For new root"
          @shortcut="hasInnerFrame = true"
        ></FrameKey>

        <FrameKey
          v-bind:key="item.shortcut"
          v-for="item in addedShortcuts"
          :description="item.description"
          :shortcut="item.shortcut"
          @shortcut="counter = Math.min(LIMIT, counter + 1)"
        ></FrameKey>

        <FrameKeyEmpty v-if="counter === LIMIT"></FrameKeyEmpty>
      </div>

      <Frame v-if="hasInnerFrame" @delete="hasInnerFrame = false"></Frame>
    </div>
  </KeyboardShortcuts>
</template>

<script setup>
import { ref, useContext, computed, watchEffect } from "vue";
import KeyboardShortcuts from "../keyboard/KeyboardShortcuts.vue";
import FrameKey from "./FrameKey.vue";
import FrameKeyEmpty from "./FrameKeyEmpty.vue";

const KEYS_BY_INDEX = "xcvbnm,.".split("");
const LIMIT = 3;

const { onDelete } = useContext().attrs;

const hasInnerFrame = ref(false);
const counter = ref(1);

const addedShortcuts = computed(() => {
  return Array.from(Array(counter.value), (__, index) => {
    return {
      description: index === LIMIT ? "For new empty" : "For new shortcut",
      shortcut: KEYS_BY_INDEX[index],
    };
  }).slice(0, LIMIT - 1);
});
</script>

<style>
.Frame {
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  width: 100%;
}

.Frame__content {
  width: 100%;
  max-width: 36rem;
  height: 12rem;

  padding: 1rem;

  gap: 1rem;
  display: flex;
  position: relative;
  align-items: flex-end;

  background: var(--var-color-2);
  box-shadow: 1px 1px 0 0 var(--var-color-5);
}

.Frame__content--hasFrame {
  opacity: 0.5;
}
</style>