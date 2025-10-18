<script lang="ts" setup>
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { getSelectDataApi } from "./apis/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <a-select v-model:value="value" :options="options" placeholder="请输入手机号" style="width: 200px;" />
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style>
