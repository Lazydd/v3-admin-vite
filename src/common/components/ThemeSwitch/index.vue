<script lang="ts" setup>
import { useTheme } from "@@/composables/useTheme"
import { BgColorsOutlined } from "@ant-design/icons-vue"

const { themeList, activeThemeName, setTheme } = useTheme()
</script>

<template>
  <a-dropdown trigger="click">
    <div>
      <a-tooltip placement="bottom">
        <template #title>
          主题模式
        </template>
        <BgColorsOutlined style="font-size: 20px;" />
      </a-tooltip>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(theme, index) in themeList" :key="index" :disabled="activeThemeName === theme.name"
          @click="(e: MouseEvent) => setTheme(e, theme.name)">
          <span>{{ theme.title }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
