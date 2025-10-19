<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@@/composables/useGreyAndColorWeakness"
// import { usePany } from "@@/composables/usePany"
import { useTheme } from "@@/composables/useTheme"
import zhCn from "ant-design-vue/es/locale/zh_CN"
import "dayjs/locale/zh-cn"

const { initTheme } = useTheme()

const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

// const { initStarNotification, initStoreNotification, initMobileNotification } = usePany()

// 初始化主题
initTheme()

// 初始化灰色模式和色弱模式
initGreyAndColorWeakness()

// #region 初始化通知
// initStarNotification()

// initStoreNotification()

// initMobileNotification()
// #endregion
</script>

<template>
  <a-config-provider :locale="zhCn">
    <router-view />
  </a-config-provider>
</template>
