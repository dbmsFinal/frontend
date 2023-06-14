<template>
    <div class="card-container">
      <el-card class="box-card">
        <h1>resetPassword</h1>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          label-position="top"
          label-width="150px"
          :rules="rules"
          :size="formSize"
          status-icon
        >
          <el-form-item label="old password" prop="title">
            <el-input v-model="ruleForm.title" placeholder="Please input" />
          </el-form-item>
          
          <el-form-item label="new password" prop="question1">
            <el-input v-model="ruleForm.question1" placeholder="Please input" />
          </el-form-item>
         
          <el-form-item>
            <el-button type="danger" @click="submitForm(ruleFormRef)"
              >submmit</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  const formSize = ref("default");
  const ruleFormRef = ref();
  
  const ruleForm = reactive({
    title: "",
    
    question1: "",
    question2: "",
  });
  
  const rules = reactive({
    title: [
      {
        required: true,
        message: "Please input your title",
        trigger: "blur",
      },
    ],
   
    question1: [
      {
        required: true,
        message: "Please input your question1",
        trigger: "blur",
      },
    ],
  });
  
  const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log("submit!");
        createPoll();
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  
  const createPoll = function () {
  
  
    const data = {
        old_password: ruleForm.title,
        new_password: ruleForm.question1,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      
      },
    };
    console.log(data);
    axios
      .post("/api/user/reset_passwords", data, config)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          navigateToIndex();
        }
      })
      .catch((error) => {
      
        console.log(error);
      });
  };
  const route = useRoute();
  const router = useRouter();
  
  const navigateToIndex = function () {
    router.push("login");
  };
  </script>
  
  <style scoped>
  .text {
    font-size: 14px;
  }
  
  .item {
    padding: 18px 0;
  }
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-18.5%, -10%);
    width: 800px;
    height: 520px;
  }
  
  h1 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
  }
  </style>
  