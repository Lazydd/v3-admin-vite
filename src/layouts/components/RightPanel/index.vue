<script lang="ts" setup>
import { SettingOutlined } from "@ant-design/icons-vue"

const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <SettingOutlined />
  </div>
  <a-drawer v-model:open="show" size="300px">
    <slot />
  </a-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--v3-rightpanel-button-bg-color);
  position: fixed;
  top: 45%;
  right: 0;
  border-radius: 6px 0 0 6px;
  z-index: 2000;
  cursor: pointer;
  pointer-events: auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    font-size: 24px;
  }
}
</style>
