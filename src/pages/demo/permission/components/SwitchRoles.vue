<script lang="ts" setup>
import { useUserStore } from "@/pinia/stores/user"

const userStore = useUserStore()

const switchRoles = ref(userStore.roles[0])

watch(switchRoles, (value) => {
  userStore.changeRoles(value)
})
</script>

<template>
  <a-card>
    <div>
      <span>你的角色：</span>
      <a-tag v-for="(role, index) in userStore.roles" :key="index" size="large" color="processing">
        {{ role }}
      </a-tag>
    </div>
    <div class="switch-roles">
      <span>切换用户：</span>
      <a-radio-group
        v-model:value="switchRoles" :options="[
          { label: 'editor', value: 'editor' },
          { label: 'admin', value: 'admin' },
        ]" option-type="button" button-style="solid"
      />
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
