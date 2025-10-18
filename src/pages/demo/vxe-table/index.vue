<script lang="ts" setup>
import { getTableDataApi } from "@@/apis/tables"
import { usePagination } from "@@/composables/usePagination"
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { h, useTemplateRef } from "vue"
import { VxeColumn, VxeTable } from "vxe-table"

defineOptions({
  name: "VxeTable"
})

const formRef = useTemplateRef("formRef")
const tableRef = useTemplateRef("tableRef")

const { paginationData, handleCurrentChange } = usePagination()
const searchForm = reactive({
  username: "",
  phone: "",
  date: undefined
})
const tableData = ref([])
const loading = ref(false)
function getData() {
  loading.value = true
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchForm.username,
    phone: searchForm.phone
  }).then((res) => {
    tableData.value = res.data.list as any
    paginationData.total = res.data.total
  }).finally(() => {
    loading.value = false
  })
}

function search() {
  if (paginationData.currentPage === 1) {
    getData()
    return
  }
  handleCurrentChange(1)
}
function resetSearch() {
  searchForm.username = ""
  searchForm.phone = ""
  searchForm.date = undefined
  search()
}

function onShowModal(row: any) {
  open.value = true
  formState.value = JSON.parse(JSON.stringify(row))
}

function onDelete(row: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(row)
      message.success("删除成功")
      resolve(true)
    }, 3000)
  })
}
function deleteAll() {
  // const list = tableRef.value?.getCheckboxRecords()
  // const list2 = tableRef.value?.getCheckboxReserveRecords()
  // tableRef.value?.clearCheckboxRow()
}

const formState = ref({
  username: "",
  password: "",
  remember: true
})

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" }
  ]
}

const open = ref(false)
const confirmLoading = ref(false)
function handleOk() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
  })
}

function cancel() {
  confirmLoading.value = false
  formRef.value.resetFields()
}
watch([() => paginationData.currentPage, () => paginationData.pageSize], getData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <div class="header">
      <div class="left">
        <a-button type="primary" :icon="h(PlusOutlined)" @click="open = true">
          新增
        </a-button>
        <a-button type="primary" :icon="h(DeleteOutlined)" danger @click="deleteAll">
          批量删除
        </a-button>
      </div>
      <div class="right">
        <a-input v-model:value.trim="searchForm.username" placeholder="请输入用户名" style="width: 200px;" />
        <a-input v-model:value.trim="searchForm.phone" placeholder="请输入手机号" style="width: 200px;" />
        <a-select v-model:value="searchForm.date" placeholder="请输入手机号" :options="[{ value: 10000 }]"
          style="width: 200px;" />
        <a-button type="primary" @click="search">
          查询
        </a-button>
        <a-button :icon="h(RedoOutlined)" @click="resetSearch" title="重置" />
      </div>
    </div>
    <VxeTable ref="tableRef" :data="tableData" align="center"
      :row-config="{ keyField: 'id', isCurrent: true, isHover: true }" :checkbox-config="{ reserve: true }"
      :loading="loading">
      <VxeColumn type="checkbox" width="70" />
      <VxeColumn field="id" title="id" />
      <VxeColumn field="username" title="Name" />
      <VxeColumn field="phone" title="Sex" />
      <VxeColumn field="email" title="Age">
        <template #default="{ row }">
          <a-button type="link" @click="onShowModal(row)">
            编辑
          </a-button>
          <a-popconfirm title="确认删除?" ok-text="确认" cancel-text="取消" placement="topRight" @confirm="onDelete(row)">
            <a-button type="link" danger>
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </VxeColumn>
    </VxeTable>
    <div class="pagination">
      <a-pagination v-model:current="paginationData.currentPage" v-model:page-size="paginationData.pageSize"
        :total="paginationData.total" show-size-changer :page-size-options="['20', '50', '100', '200']"
        :show-total="(total: number) => `共 ${total} 条`" show-quick-jumper @change="handleCurrentChange" />
    </div>
    <a-modal v-model:open="open" centered :confirm-loading="confirmLoading" @ok="handleOk" @cancel="cancel">
      <a-form :model="formState" ref="formRef" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        :rules="rules">
        <a-form-item label="Username" name="username">
          <a-input v-model:value="formState.username" placeholder="请选择日期" />
        </a-form-item>
        <a-form-item label="Password" name="password">
          <a-input-password v-model:value="formState.password" placeholder="请选择日期" />
        </a-form-item>
        <a-form-item label="date" name="date">
          <a-date-picker v-model:value="searchForm.date" placeholder="请选择日期" style="width: 100%;" />
        </a-form-item>
      </a-form>
      <template #title>
        <div>Draggable Modal</div>
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped></style>
