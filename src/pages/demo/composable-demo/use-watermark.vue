<script lang="ts" setup>
import { useWatermark } from "@@/composables/useWatermark"

const localRef = useTemplateRef("localRef")

const { setWatermark, clearWatermark } = useWatermark(localRef)

const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <a-alert
      message="示例说明"
      description="通过调用 composable 开启或关闭水印，支持局部、全局、自定义样式（颜色、透明度、字体大小、字体、倾斜角度等），并自带防御（防删、防隐藏）和自适应功能" show-icon
    />
    <a-card title="示例">
      <div ref="localRef" class="local" />
      <template #actions>
        <a-button-group>
          <a-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })">
            创建局部水印
          </a-button>
          <a-button @click="setWatermark('没有防御功能的局部水印', { color: '#e6a23c', defense: false })">
            创建无防御局部水印
          </a-button>
          <a-button type="primary" danger @click="clearWatermark">
            清除局部水印
          </a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="primary" @click="setGlobalWatermark('全局水印', { color: '#409eff' })">
            创建全局水印
          </a-button>
          <a-button @click="setGlobalWatermark('没有防御功能的全局水印', { color: '#e6a23c', defense: false })">
            创建无防御全局水印
          </a-button>
          <a-button type="primary" danger @click="clearGlobalWatermark">
            清除全局水印
          </a-button>
        </a-button-group>
      </template>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.local {
  height: 35vh;
  border: 2px dashed var(--color-primary);
}
</style>
