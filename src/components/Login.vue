<template>
  <div class="cards-container">
    <el-card>
      <h1>Login</h1>
      <el-form
        ref="ruleFormRef"
        :model="form"
        label-width="80px"
        label-position="top"
        :rules="rules"
        status-icon
      >
        <el-form-item label="email" prop="email">
          <el-input id="email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password" label-position="top">
          <el-input
            id="password"
            type="password"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="login">Login</el-button>
        </el-form-item>
        <el-form-item>
          <h4>Don't have account?</h4>
          <div class="flex justify-space-between mb-4 flex-wrap gap-4">
            <el-button :key="success" type="success" link @click="goToSignUp"
              >SignUp
            </el-button>
          </div>
          <el-divider></el-divider>
          <h4>You are admin?</h4>
          <el-button :key="success" type="warning" link @click="goToAdmin"
            >Login as admin
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import axios from "axios";
import router from "@/router";
export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      token: "",

      error: { message: "" },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      this.$refs.ruleFormRef
        .validate()
        .then(() => {
          this.submitForm();
          console.log("success");
        })
        .catch(() => {
          this.$message.error("login unsuccessful");
        });
    },
    async submitForm() {
      const url = "/api/login";
      const data = {
        email: this.form.email,
        password: this.form.password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      axios
        .post(url, data, config)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            this.token = response.data.authorization;

            router.push("/index");
          }
        })
        .catch((error) => {
          console.log(url);
          this.error.message = error.message;
          console.log(error);
        });
    },
    async goToSignUp() {
      router.push("/signUp");
    },

    async goToAdmin() {
      router.push("/admin_login");
    },
  },
};
</script>
<style>
.el-form {
  font-size: 16px;
}
.el-card {
  width: 480px;
  height: 440px;
  margin: -250px;
}
.logo {
  width: 100px; /* 設置元素寬度 */
  height: 100px; /* 設置元素高度 */
  border-radius: 50%; /* 設置邊框半徑為50% */
  margin-left: 170px;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}
</style>
