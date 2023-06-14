<template>
<div>
    <el-card class="card-divider">
        <div class="card-content">
            <label class="card-title-divider">投票結果</label>
        </div>
    </el-card>

    <div v-for="(questions, index) in  poll_results" :key="index">
        <el-card class="card">
            <div class="card-content">
                <div class="descri">
                    <el-text class="mx-1">{{ questions.text}}</el-text>
                </div>

                <el-divider></el-divider>
                <el-divider></el-divider>
                <div class="card-title-divider">voting data</div>
                <div class="data-section">
                    <el-button type="success">support: {{ questions.options[0].vote_cnt}}</el-button>
                    <el-button type="danger">oppose: {{ questions.options[1].vote_cnt}}</el-button>
                </div>

                <el-divider></el-divider>
                <el-divider></el-divider>
                <div class="card-title-divider">result</div>
                <div class="data-section">

                    <el-button type="info">{{ questions.result}}</el-button>
                </div>

            </div>

        </el-card>
    </div>
    <div class="article-container">

        <el-card class="box-card-summit">

            <el-button type="primary" @click="showComment(this.postid)">展開留言</el-button>

        </el-card>
        <div v-if="showComments">
            <!-- Create a message area-->
            <div class="comment-area">
                <div v-for="(comment, index) in comments" :key="index">
                    <el-card class="box-card-messagearea">
                        <div class="article-contents-message">{{ index+1 }}F: {{ comment.content || "" }}</div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>

</div>
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
            showComments: false,
            comments: [],
            postid: "",
            poll_results: [],
        };
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            let url = "http://127.0.0.1:3000/poll_results/";
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
                    console.log(response.data.results)
                    vm.poll_results = response.data.results;

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
    }
};
</script>

<style scoped>
.descri {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.card-data {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.data-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.card-title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.card-divider {
    /* create beatiful rectangle */
    width: 1100px;
    height: 150px;
    margin: auto;
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

.card {
    margin: 10 auto;
    width: 1100px;
    height: 500px;
    margin: 50px;
    padding: 20px;
}
.box-card-summit {
    margin: 10 auto;
    width: 1100px;
    height: 100px;
    margin: auto;
    padding: 20px;
    /* set to center */
    display: flex;
    justify-content: center;
}
.comment-area {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
}
.box-card-messagearea{
    margin:auto;
    width: 1100px;
    height: 100px;
 
    padding: 20px;
}
.article-contents-message {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 30px;
}
</style>
