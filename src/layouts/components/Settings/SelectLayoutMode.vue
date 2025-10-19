<script lang="ts" setup>
import { useLayoutMode } from "@@/composables/useLayoutMode"
import { LayoutModeEnum } from "@@/constants/app-key"

const { isLeft, isTop, isLeftTop, setLayoutMode } = useLayoutMode()
</script>

<template>
  <div class="select-layout-mode">
    <a-tooltip>
      <template #title>
        <span>左侧模式</span>
      </template>
      <a-layout class="layout-mode left" :class="{ active: isLeft }" @click="setLayoutMode(LayoutModeEnum.Left)">
        <a-layout-sider />
        <a-layout>
          <a-layout-header />
          <a-layout-content />
        </a-layout>
      </a-layout>
    </a-tooltip>
    <a-tooltip>
      <template #title>
        <span>顶部模式</span>
      </template>
      <a-layout class="layout-mode top" :class="{ active: isTop }" @click="setLayoutMode(LayoutModeEnum.Top)">
        <a-layout-header />
        <a-layout-content />
      </a-layout>
    </a-tooltip>
    <a-tooltip>
      <template #title>
        <span>混合模式</span>
      </template>
      <a-layout class="layout-mode left-top" :class="{ active: isLeftTop }"
        @click="setLayoutMode(LayoutModeEnum.LeftTop)">
        <a-layout-header />
        <a-layout>
          <a-layout-sider />
          <a-layout-content />
        </a-layout>
      </a-layout>
    </a-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.layout-mode {
  width: 60px;
  height: 56px;
  flex-grow: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid var(--color-primary);
  }
}

.active {
  border: 2px solid var(--color-primary);
}

.ant-layout-header {
  height: 12px;
  padding-inline: unset;
}

.ant-layout-sider {
  width: 16px !important;
  flex: unset !important;
  max-width: unset !important;
  min-width: unset !important;
}

.left {
  .ant-layout-header {
    background-color: #e6e8eb;
  }

  .ant-layout-sider {
    background-color: var(--color-primary);
  }

  .ant-layout-content {
    background-color: #fafafa;
  }
}

.top {
  .ant-layout-header {
    background-color: var(--color-primary);
  }

  .ant-layout-content {
    background-color: #fafafa;
  }
}

.left-top {
  .ant-layout-header {
    background-color: #e6e8eb;
  }

  .ant-layout-sider {
    background-color: var(--color-primary);
  }

  .ant-layout-content {
    background-color: #fafafa;
  }
}
</style>
