<script lang="ts" setup>
import screenfull from "screenfull"

interface Props {
  /** 全屏的元素，默认是 html */
  element?: string
  /** 打开全屏提示语 */
  openTips?: string
  /** 关闭全屏提示语 */
  exitTips?: string
  /** 是否只针对内容区 */
  content?: boolean
}

const { element = "html", openTips = "全屏", exitTips = "退出全屏", content = false } = defineProps<Props>()

const CONTENT_LARGE = "content-large"

const CONTENT_FULL = "content-full"

const classList = document.body.classList

// #region 全屏
const isEnabled = screenfull.isEnabled

const isFullscreen = ref<boolean>(false)

const fullscreenTips = computed(() => (isFullscreen.value ? exitTips : openTips))

const fullscreenSvgName = computed(() => (isFullscreen.value ? "fullscreen-exit" : "fullscreen"))

function handleFullscreenClick() {
  const dom = document.querySelector(element) || undefined
  isEnabled ? screenfull.toggle(dom) : ElMessage.warning("您的浏览器无法工作")
}

function handleFullscreenChange() {
  isFullscreen.value = screenfull.isFullscreen
  // 退出全屏时清除相关的 class
  isFullscreen.value || classList.remove(CONTENT_LARGE, CONTENT_FULL)
}

watchEffect(() => {
  if (isEnabled) {
    // 挂载组件时自动执行
    screenfull.on("change", handleFullscreenChange)
    // 卸载组件时自动执行
    onWatcherCleanup(() => {
      screenfull.off("change", handleFullscreenChange)
    })
  }
})
// #endregion

// #region 内容区
const isContentLarge = ref<boolean>(false)

const contentLargeTips = computed(() => (isContentLarge.value ? "内容区复原" : "内容区放大"))

const contentLargeSvgName = computed(() => (isContentLarge.value ? "fullscreen-exit" : "fullscreen"))

function handleContentLargeClick() {
  isContentLarge.value = !isContentLarge.value
  // 内容区放大时，将不需要的组件隐藏
  classList.toggle(CONTENT_LARGE, isContentLarge.value)
}

function handleContentFullClick() {
  // 取消内容区放大
  isContentLarge.value && handleContentLargeClick()
  // 内容区全屏时，将不需要的组件隐藏
  classList.add(CONTENT_FULL)
  // 开启全屏
  handleFullscreenClick()
}
// #endregion
</script>

<template>
  <div>
    <!-- 全屏 -->
    <a-tooltip v-if="!content" placement="bottom">
      <template #title>
        {{ fullscreenTips }}
      </template>
      <SvgIcon :name="fullscreenSvgName" @click="handleFullscreenClick" class="svg-icon" />
    </a-tooltip>
    <!-- 内容区 -->
    <a-dropdown v-else :disabled="isFullscreen">
      <SvgIcon :name="contentLargeSvgName" class="svg-icon" />
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <div @click="handleContentLargeClick">
              {{ contentLargeTips }}
            </div>
          </a-menu-item>
          <a-menu-item key="1">
            <div @click="handleContentFullClick">
              内容区全屏
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
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
