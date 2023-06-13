<template>
  <div></div>
  </template>
  
  <script>
  import axios from "axios";
  import {
      reactive,
      ref
  } from "vue";
  import {
      routeLocationKey
  } from "vue-router";
  import router from "../router";
  
  export default {
      data() {
          return {
          
          };
      },
  
      beforeRouteEnter(to, from, next) {
          next((vm) => {
              let url = "http://127.0.0.1:3000/polls/";
              const postid = vm.$route.params.postid;
              vm.postid = postid;
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
          submitComment(postid) {
              const url = `/api/polls/${postid}/comments/new`
              const data = {
                  content: this.ruleForm.description
              }
              console.log(data)
              const config = {
                  headers: {
                      "Content-Type": "application/json",
                  },
              };
  
              axios
                  .post(url, data, config)
                  .then((response) => {
                      this.$message.success("comment success!!");
                      //refresh page
  
                      router.go(0);
                      router.push("/index");
  
                  })
                  .catch((error) => {
                      console.log(error);
                      this.$message.error("comment fail");
                  });
          },
          showComment(postid) {
             
              const url = `/api/polls/${postid}/comments`
              axios
                  .get(url)
                  .then((response) => {
                      this.showComments = true;
                      this.comments = response.data.data
                      console.log(response.data.data)
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },  
          turnToPageComment() {
              router.push({
                  name: "comment",
                  params: {
                      postid: this.postid
                  },
              })
          },
          submitopnion(question_id, option_id) {
  
              const questionIdToCheck = question_id; // The question_id you want to check
              const isQuestionIdExist = this.votedPosts.votes.some(vote => vote.question_id === questionIdToCheck);
  
              if (isQuestionIdExist) {
                  console.log(`Question ID ${questionIdToCheck} exists in the this.votedPosts.votes array.`);
                  //check option_id
                  const option_idToCheck = option_id;
                  const index = this.votedPosts.votes.findIndex(vote => vote.question_id === questionIdToCheck);
  
                  const isoption_idSame = this.votedPosts.votes[index].option_id === option_idToCheck;
                  if (isoption_idSame) {
                      console.log(`option_id ${option_idToCheck} is the same.`);
                  } else {
                      console.log(`option_id ${option_idToCheck} is not the same.`);
                      //change option_id
  
                      console.log(index)
                      if (index > -1) {
                          this.votedPosts.votes[index].option_id = option_idToCheck;
                      }
                  }
              } else {
                  console.log(`Question ID ${questionIdToCheck} does not exist in the votes array.`);
                  this.votedPosts.votes.push({
                      question_id: question_id,
                      option_id: option_id
                  })
              }
              console.log("check state")
              console.log(this.votedPosts.votes)
          },
          async submitResult(postid) {
              const url = `/api/polls/${postid}/vote`
  
              //sort this.votedPosts.votes by question_id
              this.votedPosts.votes.sort(function (a, b) {
                  return a.question_id - b.question_id;
              });
  
              const data = this.votedPosts
              console.log(data)
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
              // router.push("/index");
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
  
  .article-contents-message {
      font-size: 20px;
      line-height: 1.5;
      margin-bottom: 30px;
  }
  .card-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  .box-card {
      margin: 10 auto;
      width: 1100px;
      height: 600px;
      margin: 5px;
      padding: 20px;
  }
  
  .box-card-messagearea{
      margin:auto;
      width: 1100px;
      height: 100px;
   
      padding: 20px;
  }
  .box-card-summitarea {
      margin: 10 auto;
      width: 1100px;
      height: 300px;
      margin: 5px;
      padding: 20px;
  }
  
  .box-card-summit {
      margin: 10 auto;
      width: 1100px;
      height: 100px;
      margin: 5px;
      padding: 20px;
      /* set to center */
      display: flex;
      justify-content: center;
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
      width: 48%;
      /* 調整按鈕寬度 */
      text-align: center;
      padding: 0 50px;
  }
  
  .article-buttons button:first-child {
      margin-right: 2%;
      /* 調整左邊按鈕右邊距離 */
      text-align: center;
  }
  
  .article-buttons button:last-child {
      margin-left: 2%;
      /* 調整右邊按鈕左邊距離 */
      text-align: center;
  }
  
  .comment-area {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
  }
  </style>
  