<template>
  <div class="card-container">
    <el-card class="box-card">
      <h1>Create Poll</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-position="top"
        label-width="150px"
        :rules="rules"
        :size="formSize"
        status-icon
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="ruleForm.title" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            v-model="ruleForm.description"
            :rows="4"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Question 1" prop="question1">
          <el-input v-model="ruleForm.question1" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Question 2 " prop="question2">
          <el-input
            v-model="ruleForm.question2"
            placeholder="(This field is optional)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm(ruleFormRef)"
            >Create</el-button
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
  description: "",
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
  description: [
    {
      required: true,
      message: "Please input your description",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please input correct email",
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
  const start = new Date();
  const start_year = start.getFullYear();
  const start_month = start.getMonth() + 1;
  const start_day = start.getDate();
  const start_date = `${start_year}-${start_month < 10 ? '0' + start_month : start_month}-${start_day < 10 ? '0' + start_day : start_day}`;
  const end = new Date();
  const end_year = end.getFullYear();
  const end_month = end.getMonth() + 1;
  const end_day = end.getDate()+7;
  const end_date = `${end_year}-${end_month < 10 ? '0' + end_month : end_month}-${end_day < 10 ? '0' + end_day : end_day}`;
  const questions = [
    {
        text:ruleForm.question1
    },
    {
        text:ruleForm.question2
    }
  ];
  const url = "http://127.0.0.1:3000/create_poll";
  const data = {
    title: ruleForm.title,
    start_date: start_date,
    end_date: end_date,
    questions: questions
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(url, data, config)
    .then((response) => {
      console.log(response);
      if (response.status == 201) {
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
  router.push("index");
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
