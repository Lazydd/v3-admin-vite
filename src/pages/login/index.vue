<script lang="ts" setup>
import type { FormProps } from "ant-design-vue"
import type { LoginRequestData } from "./apis/type"
import ThemeSwitch from "@@/components/ThemeSwitch/index.vue"
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { useSettingsStore } from "@/pinia/stores/settings"
import { useUserStore } from "@/pinia/stores/user"
import { getCaptchaApi, loginApi } from "./apis"
import Owl from "./components/Owl.vue"
import { useFocus } from "./composables/useFocus"

const route = useRoute()

const router = useRouter()

const userStore = useUserStore()

const settingsStore = useSettingsStore()

const { isFocus, handleBlur, handleFocus } = useFocus()

/** 登录表单元素的引用 */
const loginFormRef = useTemplateRef("loginFormRef")

/** 登录按钮 Loading */
const loading = ref(false)

/** 验证码图片 URL */
const codeUrl = ref("")

/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "12345678",
  code: ""
})

/** 登录表单校验规则 */
const loginFormRules: FormProps["rules"] = {
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

/** 登录 */
function onFinish(values: any) {
  loading.value = true
  loginApi(values).then(({ data }) => {
    userStore.setToken(data.token)
    router.push(route.query.redirect ? decodeURIComponent(route.query.redirect as string) : "/")
  }).catch(() => {
    createCode()
    loginFormData.password = ""
  }).finally(() => {
    loading.value = false
  })
}
function onFinishFailed() {
  message.error("表单校验不通过")
}

/** 创建验证码 */
function createCode() {
  // 清空已输入的验证码
  loginFormData.code = ""
  // 清空验证图片
  codeUrl.value = ""
  // 获取验证码图片
  getCaptchaApi().then((res) => {
    codeUrl.value = res.data
  })
}

// 初始化验证码
createCode()
</script>

<template>
  <div class="login-container">
    <ThemeSwitch v-if="settingsStore.showThemeSwitch" class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@@/assets/images/layouts/logo-text-2.png">
      </div>
      <div class="content">
        <a-form
          ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <a-form-item name="username">
            <a-input v-model:value="loginFormData.username" placeholder="用户名" tabindex="1" size="large">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input-password
              v-model:value="loginFormData.password" placeholder="密码" type="password" tabindex="2"
              size="large" show-password @blur="handleBlur" @focus="handleFocus"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- <el-form-item prop="code">
            <el-input
              v-model.trim="loginFormData.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
              @blur="handleBlur"
              @focus="handleFocus"
            >
              <template #append>
                <el-image :src="codeUrl" draggable="false" @click="createCode">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item> -->
          <!-- <a-button block :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </a-button> -->
          <a-form-item>
            <a-button block :loading="loading" type="primary" html-type="submit" size="large">
              登 录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--color-bg);
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      padding: 20px 50px 50px 50px;
    }
  }
}
</style>
