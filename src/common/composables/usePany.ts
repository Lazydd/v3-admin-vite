import { notification } from "ant-design-vue"

function initStarNotification() {
  setTimeout(() => {
    notification.open({
      message: "为爱发电！",
      type: "success",
      description: h(
        "div",
        null,
        [
          h("div", null, "所有源码均免费开源，如果对你有帮助，欢迎点个 Star 支持一下！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" }, "点击传送")
        ]
      ),
      placement: "bottomRight"
    })
  }, 0)
}

function initStoreNotification() {
  setTimeout(() => {
    notification.open({
      message: "懒人服务？",
      type: "warning",
      description: h(
        "div",
        null,
        [
          h("div", null, "不想自己动手，但想移除 TS 或其他模块？也有懒人套餐！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite/issues/225" }, "点击获取")
        ]
      ),
      placement: "bottomRight"
    })
  }, 500)
}

function initMobileNotification() {
  setTimeout(() => {
    notification.open({
      message: "移动端",
      type: "info",
      description: h(
        "div",
        null,
        [
          h("div", null, "如果你有移动端 H5 需求，试试新的开源模板 MobVue！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite/issues/225" }, "点击查看")
        ]
      ),
      placement: "bottomRight"
    })
  }, 1000)
}

/** 作者的小心思 */
export function usePany() {
  return { initStarNotification, initStoreNotification, initMobileNotification }
}
