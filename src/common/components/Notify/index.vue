<script lang="ts" setup>
import type { NotifyItem } from "./type"
import { messageData, notifyData, todoData } from "./data"
import List from "./List.vue"
import { BellOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

type TabName = "通知" | "消息" | "待办"

interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: NotifyItem[]
}

/** 角标当前值 */
const badgeValue = computed(() => data.value.reduce((sum, item) => sum + item.list.length, 0))

/** 角标最大值 */
const badgeMax = 99

/** 面板宽度 */
const popoverWidth = 350

/** 当前 Tab */
const activeName = ref<TabName>("通知")

/** 所有数据 */
const data = ref<DataItem[]>([
  // 通知数据
  {
    name: "通知",
    type: "primary",
    list: notifyData
  },
  // 消息数据
  {
    name: "消息",
    type: "danger",
    list: messageData
  },
  // 待办数据
  {
    name: "待办",
    type: "warning",
    list: todoData
  }
])

function handleHistory() {
  message.success(`跳转到${activeName.value}历史页面`)
}
</script>

<template>
  <div class="notify">
    <a-popover placement="bottom" :width="popoverWidth" trigger="click" overlayClassName="notify-width">
      <a-badge :count="badgeValue" :overflowCount="badgeMax">
        <a-tooltip effect="dark" content="消息通知" placement="bottom">
          <template #title>
            消息通知
          </template>
          <BellOutlined />
        </a-tooltip>
      </a-badge>
      <template #content>
        <a-tabs v-model="activeName" class="demo-tabs" stretch>
          <a-tab-pane v-for="(item, index) in data" :key="index" :tab="item.name">
            <template #tab>
              {{ item.name }}
              <a-badge :count="item.list.length" :overflowCount="badgeMax" />
            </template>
            <div style="height: 400px; overflow-y: auto;">
              <List :data="item.list" />
            </div>
          </a-tab-pane>
        </a-tabs>
        <div class="notify-history">
          <a-button link @click="handleHistory">
            查看{{ activeName }}历史
          </a-button>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);


}

.ant-badge {
  font-size: 20px;
}
</style>
<style>
.notify-width {
  width: 400px;
}
</style>