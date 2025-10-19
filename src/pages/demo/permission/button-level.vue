<script lang="ts" setup>
import { checkPermission } from "@@/utils/permission"
import SwitchRoles from "./components/SwitchRoles.vue"
</script>

<template>
  <div class="app-container">
    <SwitchRoles />
    <a-card title="权限指令 v-permission 示例" class="margin-top-20">
      <a-button v-permission="['admin']">
        admin
      </a-button>
      <a-button v-permission="['admin', 'editor']">
        admin 和 editor
      </a-button>
    </a-card>
    <a-card title="权限函数 checkPermission 示例" class="margin-top-20">
      a-tab-pane 和 a-table-column 以及其它动态渲染 DOM 的场景不适合使用 v-permission
      这种情况下你可以通过 v-if + checkPermission 来实现
      <a-tabs type="card" class="margin-top-20">
        <a-tab-pane key="1" v-if="checkPermission(['admin'])" tab="admin">
          <a-tag size="large" color="processing">
            v-if="checkPermission(['admin'])"
          </a-tag>
        </a-tab-pane>
        <a-tab-pane key="2" v-if="checkPermission(['admin', 'editor'])" tab="admin 和 editor">
          <a-tag size="large" color="processing">
            v-if="checkPermission(['admin', 'editor'])"
          </a-tag>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-20 {
  margin-top: 20px;
}
</style>
