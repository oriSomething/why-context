<template inherit-attrs="false">
  <Frame></Frame>
</template>

<script setup>
import Frame from "./components/Frame.vue";
</script>

<style>
:root {
  /* From https://color.adobe.com/explore */
  --var-color-1: #353d40;
  --var-color-2: #d9d9d9;
  --var-color-3: #a1a5a6;
  --var-color-4: #f2b138;
  --var-color-5: #003f63;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background: var(--var-color-3);
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

kbd {
  font: inherit;
}
</style>