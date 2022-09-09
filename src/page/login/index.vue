<template>
  <div class="login-container" ref="login" @keyup.enter.native="handleLogin">
    <div class="login-weaper animated bounceInDown">
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">子应用-开发环境-模拟登录</h4>
          <userLogin></userLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from "./userlogin";
export default {
  name: "login",
  components: {
    userLogin,
  },
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-image: url("~@/assets/img/bg/bg.jpg");
  background-size: 100% 100%;
}

.login-weaper {
  margin: 0 auto;
  width: 500px;
  box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);

  .el-input-group__append {
    border: none;
  }
}

.login-border {
  position: relative;
  min-height: 500px;
  align-items: center;
  display: flex;
}

.login-border {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  background-color: #fff;
  width: 100%;
  float: left;
  box-sizing: border-box;
}

.login-main {
  margin: 0 auto;
  width: 65%;
  box-sizing: border-box;
}

.login-main > h3 {
  margin-bottom: 20px;
}

.login-main > p {
  color: #76838f;
}

.login-title {
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}

.login-menu {
  margin-top: 40px;
  width: 100%;
  text-align: center;

  a {
    color: #999;
    font-size: 12px;
    margin: 0px 8px;
  }
}

.login-submit {
  width: 100%;
  height: 45px;
  border: 1px solid #409eff;
  background: none;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 300;
  color: #409eff;
  cursor: pointer;
  margin-top: 30px;
  font-family: "neo";
  transition: 0.25s;
}

.login-form {
  margin: 10px 0;

  i {
    color: #333;
  }

  .el-form-item__content {
    width: 100%;
  }

  .el-form-item {
    margin-bottom: 12px;
  }

  .el-input {
    input {
      padding-bottom: 10px;
      text-indent: 5px;
      background: transparent;
      border: none;
      border-radius: 0;
      color: #333;
      border-bottom: 1px solid rgb(235, 237, 242);
    }

    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}

.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}

.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
  cursor: pointer !important;
}
</style>
