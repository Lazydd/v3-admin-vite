<script lang="ts" setup>
import { h, ref } from "vue"
import type { MenuProps } from "ant-design-vue"
import { useDevice } from "@@/composables/useDevice"
import { useLayoutMode } from "@@/composables/useLayoutMode"
import { useRoute, useRouter } from "vue-router"
import { useAppStore } from "@/pinia/stores/app"
import { usePermissionStore } from "@/pinia/stores/permission"
import { useSettingsStore } from "@/pinia/stores/settings"
import { Logo } from "../index"

// const v3SidebarMenuBgColor = getCssVar("--v3-sidebar-menu-bg-color")

// const v3SidebarMenuTextColor = getCssVar("--v3-sidebar-menu-text-color")

// const v3SidebarMenuActiveTextColor = getCssVar("--v3-sidebar-menu-active-text-color")

const { isMobile } = useDevice()

const { isLeft, isTop } = useLayoutMode()

const route = useRoute()

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const settingsStore = useSettingsStore()

const activeMenu = computed(() => route.meta.activeMenu || route.path)

const noHiddenRoutes = computed(() => route2menu(permissionStore.routes[0].children || []))

const isCollapse = computed(() => !appStore.sidebar.opened)

const isLogo = computed(() => isLeft.value && settingsStore.showLogo)

// const backgroundColor = computed(() => (isLeft.value ? v3SidebarMenuBgColor : undefined))

// const textColor = computed(() => (isLeft.value ? v3SidebarMenuTextColor : undefined))

// const activeTextColor = computed(() => (isLeft.value ? v3SidebarMenuActiveTextColor : undefined))

// const sidebarMenuItemHeight = computed(() => !isTop.value ? "var(--v3-sidebar-menu-item-height)" : "var(--v3-navigationbar-height)")

// const sidebarMenuHoverBgColor = computed(() => !isTop.value ? "var(--v3-sidebar-menu-hover-bg-color)" : "transparent")

const tipLineWidth = computed(() => !isTop.value ? "2px" : "0px")

const router = useRouter()

function route2menu(arr: any[]) {
  return arr.map((item) => {
    const newItem = {
      key: item.name,
      label: item.meta?.title,
      icon: item.meta?.icon ? h(item.meta?.icon) : undefined,
      children: null as any
    }
    if (item.children && item.children.length > 0) {
      newItem.children = route2menu(item.children)
    }
    return newItem
  })
}
const selectedKeys = ref<any[]>([activeMenu])

const handleClick: MenuProps["onClick"] = (e) => {
  router.push({ name: String(e.key) })
}
</script>

<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <a-menu v-model:selectedKeys="selectedKeys" :inline-collapsed="isCollapse && !isTop"
      :theme="isLeft ? 'dark' : 'light'" :mode="isTop && !isMobile ? 'horizontal' : 'inline'" :items="noHiddenRoutes"
      @click="handleClick" />
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}
</style>
