<script lang="ts" setup>
import Modal from "./Modal.vue"

/** 控制 modal 显隐 */
const visible = ref<boolean>(false)

/** 打开 modal */
function handleOpen() {
  visible.value = true
}
</script>

<template>
  <div>
    <a-tooltip placement="bottom">
      <template #title>
        搜索菜单
      </template>
      <SvgIcon name="search" @click="handleOpen" class="svg-icon" />
    </a-tooltip>
    <Modal v-model="visible" />
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
