<template>

  <div   v-for="(post, index) in posts" :key="index" class="article-container">
    <el-card class="box-card">
      <div class="article-title">{{ "question_id:"+post.question_id || "" }}</div>
      <!-- <div class="article-author">By {{ post.initiator || "" }}</div> -->
      <div class="article-content">{{ post.text || "" }}</div>
      <div class="article-buttons">
        <el-button type="primary" icon="el-icon-thumb-up" @click="subitSupport"
          >Support</el-button
        >
        <el-button type="danger" icon="el-icon-thumb-down" @click="submitOppose"
          >Oppose</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

import { routeLocationKey } from "vue-router";
import router from "../router";
export default {
  data() {
    return {
      posts: [],
      token: localStorage.getItem("token"),
      votedPosts: [],
      username: "",
      
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let url = "http://127.0.0.1:3000/polls/";
      const postid = vm.$route.params.postid;
      url = url + postid;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.message.questions)
          vm.posts = response.data.message.questions;
          
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  mounted() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: this.token,
      },
    };    
  },
  methods: {
    async subitSupport() {
      const url = "http://127.0.0.1:3000/index/submitSupport";
      const title = this.post.title;
      const username = this.username;
      const data = {
        title: title,
        username: username,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(url, data, config)
        .then((response) => {
          this.$message.success("vote success!!");
          router.push("/index");
          
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("you have voted");
        });
      router.push("/index");
    },
    async submitOppose() {
      const url = "http://127.0.0.1:3000/index/submitOppose";
      const username = this.username;
      const title = this.post.title;
      const data = {
        title: title,
        username: username,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(url, data, config)
        .then((response) => {
          this.$message.success("vote success!!");
          router.push("/index");
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("you have voted");
        });
      router.push("/index");
    },
  },
};
</script>

<style scoped>
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.box-card {
  margin: 10 auto;
  width: 1100px;
  height: 600px;
  margin: 5px;
  padding: 20px;
}

.article-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-author {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}

.article-content {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.article-buttons {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -120%;
  left: 50%;
  transform: translateX(-50%) scale(2);
  text-align: center;
}
.el-button {
  text-align: center;
}
.article-buttons button {
  width: 48%; /* 調整按鈕寬度 */
  text-align: center;
  padding: 0 50px;
}
.article-buttons button:first-child {
  margin-right: 2%; /* 調整左邊按鈕右邊距離 */
  text-align: center;
}
.article-buttons button:last-child {
  margin-left: 2%; /* 調整右邊按鈕左邊距離 */
  text-align: center;
}
</style>
