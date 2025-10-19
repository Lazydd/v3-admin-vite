import type { SelectProps } from "ant-design-vue"
/** Select 需要的数据格式 */

/** 接口响应格式 */

/** 入参格式，暂时只需要传递 api 函数即可 */
interface FetchSelectProps {
  api: () => Promise<any>
}

/** 下拉选择器 Composable */
export function useFetchSelect(props: FetchSelectProps) {
  const { api } = props

  const loading = ref<boolean>(false)

  const options = ref<SelectProps["options"]>([])

  const value = ref(undefined)

  // 调用接口获取数据
  const loadData = () => {
    loading.value = true
    options.value = []
    api().then((res) => {
      options.value = res.data
    }).finally(() => {
      loading.value = false
    })
  }

  onMounted(() => {
    loadData()
  })

  return { loading, options, value }
}
