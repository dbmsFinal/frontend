<template>
  <div class="app-container">
    <div class="topbar" :style="{ height: topbarHeight + 'px' }">
      <div class="topbar-text">VoteSystem</div>
    </div>
    <div class="top-section">
      <el-button class="create-button" type="info" @click="turnToCreatePage()"
        >create_poll</el-button
      >
      <el-button class="fixed-button" type="info"
        >Hello AAA{{ this.username }}</el-button
      >
    </div>
    <div class="banner">
      <div class="banner-text">
        <h1>"Don't let your opinion be buried in silence."</h1>
      </div>
    </div>
    <el-divider></el-divider>
    <el-card class="card-divider">
      <div class="card-content">
        <label class="card-title-divider">user list</label>
      </div>
    </el-card>
    <div v-for="(post, index) in posts" :key="index">
      <el-card class="card">
        <div class="card-content">
          <a class="card-title">{{ post.user_name }}</a>
        </div>
        <el-button @click="delete post.user_id" type="warning"
          >delete</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  data() {
    return {
      topbarHeight: 60, // 初始高度為 400px
      maxScroll: 50, // 滾動到多少距離後改變高度
      posts: [],
      token: localStorage.getItem("token"),
      username: "",
      onGoingPost: [],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    axios
      .get("http://127.0.0.1:3000/admin/userInfo")
      .then((response) => {
        let userInfo_arr = response.data.userInfo;

        this.posts = userInfo_arr;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    delete(poll_id) {
      const url = `http://127.0.0.1:3000/admin/ban_user`;
      const data = {
        user_id_to_disable: poll_id,
      };
      axios
        .post(url, data)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.$message.error("delete successful");
            // refresh
            router.go(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    turnToCreatePage() {
      router.push("/createPoll");
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.app-container {
  position: relative;
}

.banner {
  background-image: url(https://i.imgur.com/afHtVRj.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
  margin-top: -300px;
  transform: scale(1.5);
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: rgb(117, 113, 113);
  text-align: center;
}

.topbar {
  background-color: rgba(157, 149, 149, 0.5);

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  transition: height 0.3s ease-out;
}

.topbar-hidden {
  height: 0;
}

.top-section {
  height: calc(50vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 50px;
}

.topbar-text {
  position: absolute;
  font-weight: bold;
  font-family: PoorRichard;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: rgb(0, 0, 0);
  text-align: left;
}

.fixed-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.create-button {
  position: fixed;
  top: 20px;
  right: 150px;
  z-index: 9999;
}

.card-divider {
  /* create beatiful rectangle */
  width: 1100px;
  height: 200px;
  margin: auto;
  padding: 20px;
}

.card {
  margin: 10 auto;
  width: 1100px;
  height: 200px;
  margin: 50px;
  padding: 20px;
}

.card-title-divider {
  /* set to center */
  display: block;
  margin: auto;
  width: 100%;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #0c0a2b;
  text-decoration: none;
}

.card-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.card-title:hover {
  text-decoration: underline;
}

.card-author {
  font-size: 16px;
  color: #999;
}

.readmore-link {
  font-size: 14px;
  text-decoration: none;
  color: blue;
}
</style>
