<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.tenantId"
        auto-complete="off"
        :placeholder="$t('login.tenantId')"
      >
        <i slot="prefix" class="icon-quanxian" />
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        :placeholder="$t('login.username')"
      >
        <i slot="prefix" class="icon-yonghu" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        type="password"
        show-password
        v-model="loginForm.password"
        auto-complete="off"
        :placeholder="$t('login.password')"
      >
        <i slot="prefix" class="icon-mima" />
      </el-input>
    </el-form-item>
    <el-form-item v-if="website.captchaMode" prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            size="small"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.code"
            auto-complete="off"
            :placeholder="$t('login.code')"
          >
            <i slot="prefix" class="icon-yanzhengma" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img
              :src="loginForm.image"
              class="login-code-img"
              @click="refreshCode"
            />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >{{ $t("login.submit") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { getCaptcha } from "@/api/user";
import website from '@/config/website';

export default {
  name: "userlogin",
  data() {
    return {
      website:website,
      tenantMode: website.tenantMode,
      loginForm: {
        //租户ID
        tenantId: "000000",
        //用户名
        username: "admin",
        //密码
        password: "admin",
        //账号类型
        type: "account",
        //验证码的值
        code: "",
        //验证码的索引
        key: "",
        //预加载白色背景
        image:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      },
      loginRules: {
        tenantId: [
          { required: false, message: "请输入租户ID", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.refreshCode();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    refreshCode() {
      if (this.website.captchaMode) {
        getCaptcha().then((res) => {
          const data = res.data;
          this.loginForm.key = data.key;
          this.loginForm.image = data.image;
        });
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
          });
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.$router.push('/');
              loading.close();
            })
            .catch(() => {
              loading.close();
              this.refreshCode();
            });
        }
      });
    },
  },
};
</script>

<style>
</style>
