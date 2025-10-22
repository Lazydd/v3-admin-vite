<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue"

interface Props {
  isActive?: boolean
}

const { isActive = false } = defineProps<Props>()

const emit = defineEmits<{
  toggleClick: []
}>()

function toggleClick() {
  emit("toggleClick")
}
</script>

<template>
  <div class="icon" @click="toggleClick">
    <MenuFoldOutlined v-if="isActive" />
    <MenuUnfoldOutlined v-else />
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  color: var(--color-bg);
  font-size: 20px;
}
</style>
