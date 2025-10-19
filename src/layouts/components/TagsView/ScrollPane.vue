<script lang="ts" setup>
import type { RouterLink } from "vue-router"
import Screenfull from "@@/components/Screenfull/index.vue"
import { useRouteListener } from "@@/composables/useRouteListener"
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import { useSettingsStore } from "@/pinia/stores/settings"

interface Props {
  tagRefs: InstanceType<typeof RouterLink>[] | null
}

const props = defineProps<Props>()

const route = useRoute()

const settingsStore = useSettingsStore()

const { listenerRouteChange } = useRouteListener()

/** 滚动容器元素的引用 */
const scrollContainerRef = useTemplateRef("scrollContainerRef")

/** 滚动内容元素的引用 */
const scrollContentRef = useTemplateRef("scrollContentRef")

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0

/** 每次滚动距离 */
const translateDistance = 200

/** 滚动时触发 */
function scroll(event: Event) {
  const target = event.target as HTMLElement
  currentScrollLeft = target.scrollLeft
}

/** 鼠标滚轮滚动时触发 */
function wheelScroll(event: WheelEvent) {
  event.preventDefault()
  const { deltaY } = event
  if (deltaY.toString().startsWith("-")) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}

/** 获取可能需要的宽度 */
function getWidth() {
  // 可滚动内容的长度
  const scrollContentWidth = scrollContentRef.value!.scrollWidth
  // 滚动可视区宽度
  const scrollContainerWidth = scrollContainerRef.value!.clientWidth
  // 最后剩余可滚动的宽度
  const lastDistance = scrollContentWidth - scrollContainerWidth - currentScrollLeft

  return { scrollContentWidth, scrollContainerWidth, lastDistance }
}

/** 左右滚动 */
function scrollTo(direction: "left" | "right", distance: number = translateDistance) {
  let scrollLeft = 0
  const { scrollContentWidth, scrollContainerWidth, lastDistance } = getWidth()
  // 没有横向滚动条，直接结束
  if (scrollContainerWidth > scrollContentWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
  }
  scrollContainerRef.value!.scrollLeft = scrollLeft
}

/** 移动到目标位置 */
function moveTo() {
  const tagRefs = props.tagRefs!
  for (let i = 0; i < tagRefs.length; i++) {
    // @ts-expect-error ignore
    if (route.path === tagRefs[i].$props.to.path) {
      // @ts-expect-error ignore
      const el: HTMLElement = tagRefs[i].$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft
      const { scrollContainerWidth } = getWidth()
      // 当前 tag 在可视区域左边时
      if (offsetLeft < currentScrollLeft) {
        const distance = currentScrollLeft - offsetLeft
        scrollTo("left", distance)
        return
      }
      // 当前 tag 在可视区域右边时
      const width = scrollContainerWidth + currentScrollLeft - offsetWidth
      if (offsetLeft > width) {
        const distance = offsetLeft - width
        scrollTo("right", distance)
        return
      }
    }
  }
}

// 监听路由变化，移动到目标位置
listenerRouteChange(() => {
  nextTick(moveTo)
})
</script>

<template>
  <div class="scroll-container">
    <a-tooltip placement="right">
      <template #title>
        <span>向左滚动标签（超出最大宽度可点击）</span>
      </template>
      <LeftOutlined class="arrow left" @click="scrollTo('left')" />
    </a-tooltip>
    <div ref="scrollContainerRef" class="scroll-container-native" @wheel="wheelScroll" @scroll="scroll">
      <div ref="scrollContentRef" class="scroll-content">
        <slot />
      </div>
    </div>
    <a-tooltip placement="left">
      <template #title>
        <span>向右滚动标签（超出最大宽度可点击）</span>
      </template>
      <RightOutlined class="arrow right" @click="scrollTo('right')" />
    </a-tooltip>
    <Screenfull v-if="settingsStore.showScreenfull" :content="true" class="screenfull" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    font-size: 18px;
    cursor: pointer;

    &.left {
      box-shadow: 5px 0 5px -6px var(--color-border-darker);
    }

    &.right {
      box-shadow: -5px 0 5px -6px var(--color-border-darker);
    }
  }

  .scroll-container-native {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
  }

  .screenfull {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
